-- Vector search functionality for FAQ chatbot
-- This migration adds vector similarity search capabilities

-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a function to match FAQ docs by vector similarity
CREATE OR REPLACE FUNCTION match_faq_docs(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  website_id uuid
)
RETURNS TABLE(
  id uuid,
  content_text text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    faq_docs.id,
    faq_docs.content_text,
    1 - (faq_docs.embedding <=> query_embedding) AS similarity
  FROM faq_docs
  WHERE faq_docs.website_id = match_faq_docs.website_id
    AND faq_docs.status = 'ready'
    AND 1 - (faq_docs.embedding <=> query_embedding) > match_threshold
  ORDER BY faq_docs.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create an index for vector similarity search
CREATE INDEX ON faq_docs USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Add a function to get website analytics
CREATE OR REPLACE FUNCTION get_website_analytics(website_id uuid)
RETURNS TABLE(
  total_leads bigint,
  total_faq_docs bigint,
  total_domains bigint,
  plan_name text,
  trial_ends_at timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM leads WHERE leads.website_id = get_website_analytics.website_id) as total_leads,
    (SELECT COUNT(*) FROM faq_docs WHERE faq_docs.website_id = get_website_analytics.website_id) as total_faq_docs,
    (SELECT COUNT(*) FROM domains WHERE domains.website_id = get_website_analytics.website_id) as total_domains,
    plans.name as plan_name,
    websites.trial_ends_at
  FROM websites
  LEFT JOIN plans ON websites.plan_id = plans.id
  WHERE websites.id = get_website_analytics.website_id;
END;
$$;

-- Add a function to check user permissions
CREATE OR REPLACE FUNCTION check_user_permission(
  user_id uuid,
  website_id uuid,
  required_role text DEFAULT 'editor'
)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  user_role text;
BEGIN
  -- Check if user is the owner
  IF EXISTS (
    SELECT 1 FROM websites 
    WHERE websites.id = check_user_permission.website_id 
    AND websites.owner_id = check_user_permission.user_id
  ) THEN
    RETURN true;
  END IF;

  -- Check team member role
  SELECT team_members.role INTO user_role
  FROM team_members
  WHERE team_members.website_id = check_user_permission.website_id
    AND team_members.user_id = check_user_permission.user_id
    AND team_members.accepted = true;

  IF user_role IS NULL THEN
    RETURN false;
  END IF;

  -- Check role hierarchy
  IF required_role = 'admin' THEN
    RETURN user_role = 'admin';
  ELSIF required_role = 'editor' THEN
    RETURN user_role IN ('admin', 'editor');
  END IF;

  RETURN false;
END;
$$;
