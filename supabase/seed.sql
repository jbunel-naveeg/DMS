-- Seed data for Naveeg platform
-- This file contains initial data for plans and default settings

-- Insert plans
INSERT INTO plans (id, name, price_eur, stripe_price_id, features) VALUES
('trial', 'Free Trial', 0, NULL, '{
  "woocommerce": true,
  "stripe_checkout": true,
  "analytics_pro": true,
  "automations": true,
  "chatbot": true,
  "team_editors": true,
  "custom_domain": false,
  "duration_days": 7
}'),
('starter', 'Starter', 4900, 'price_starter_monthly', '{
  "woocommerce": false,
  "stripe_checkout": false,
  "analytics_pro": false,
  "automations": false,
  "chatbot": false,
  "team_editors": false,
  "custom_domain": false,
  "max_sites": 1
}'),
('pro', 'Pro', 9900, 'price_pro_monthly', '{
  "woocommerce": true,
  "stripe_checkout": true,
  "analytics_pro": true,
  "automations": true,
  "chatbot": true,
  "team_editors": true,
  "custom_domain": true,
  "max_sites": 5
}');

-- Insert global settings
INSERT INTO settings (website_id, key, value) VALUES
(NULL, 'platform_name', '"Naveeg"'),
(NULL, 'trial_duration_days', '7'),
(NULL, 'max_trial_sites_per_user', '1'),
(NULL, 'default_region', '"europe-west3"'),
(NULL, 'support_email', '"support@naveeg.com"'),
(NULL, 'marketing_url', '"https://naveeg.com"'),
(NULL, 'app_url', '"https://app.naveeg.com"');