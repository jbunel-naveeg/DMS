-- Corrected seed data for Naveeg platform
-- Run this ONLY if you want to update the existing plans or add global settings

-- Update existing plans with more detailed features
UPDATE plans SET features = '{
  "woocommerce": true,
  "stripe_checkout": true,
  "analytics_pro": true,
  "automations": true,
  "chatbot": true,
  "team_editors": true,
  "custom_domain": false,
  "duration_days": 7
}' WHERE id = 'trial';

UPDATE plans SET features = '{
  "woocommerce": false,
  "stripe_checkout": false,
  "analytics_pro": false,
  "automations": false,
  "chatbot": false,
  "team_editors": false,
  "custom_domain": false,
  "max_sites": 1
}' WHERE id = 'starter';

UPDATE plans SET features = '{
  "woocommerce": true,
  "stripe_checkout": true,
  "analytics_pro": true,
  "automations": true,
  "chatbot": true,
  "team_editors": true,
  "custom_domain": true,
  "max_sites": 5
}' WHERE id = 'pro';

-- Insert global settings (only if settings table supports NULL website_id)
-- If this fails, you can skip this part
INSERT INTO settings (website_id, key, value) VALUES
(NULL, 'platform_name', '"Naveeg"'),
(NULL, 'trial_duration_days', '7'),
(NULL, 'max_trial_sites_per_user', '1'),
(NULL, 'default_region', '"europe-west3-b"'),
(NULL, 'support_email', '"support@naveeg.com"'),
(NULL, 'marketing_url', '"https://naveeg.com"'),
(NULL, 'app_url', '"https://app.naveeg.com"')
ON CONFLICT (website_id, key) DO NOTHING;
