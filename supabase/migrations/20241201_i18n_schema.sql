-- i18n Schema Migration
-- This migration creates tables for internationalization support

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Translations Table
CREATE TABLE IF NOT EXISTS translations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    locale TEXT NOT NULL,
    namespace TEXT NOT NULL,
    context TEXT,
    plural JSONB,
    variables JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(key, locale, namespace)
);

-- Locales Table
CREATE TABLE IF NOT EXISTS locales (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    native_name TEXT NOT NULL,
    flag TEXT NOT NULL,
    currency TEXT NOT NULL,
    date_format TEXT NOT NULL,
    time_format TEXT NOT NULL,
    number_format JSONB NOT NULL,
    rtl BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Translation Namespaces Table
CREATE TABLE IF NOT EXISTS translation_namespaces (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Locale Preferences Table
CREATE TABLE IF NOT EXISTS user_locale_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    timezone TEXT,
    currency TEXT,
    date_format TEXT,
    time_format TEXT,
    number_format JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Translation Statistics Table
CREATE TABLE IF NOT EXISTS translation_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    locale TEXT NOT NULL,
    namespace TEXT NOT NULL,
    total_keys INTEGER NOT NULL DEFAULT 0,
    translated_keys INTEGER NOT NULL DEFAULT 0,
    completion_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(locale, namespace)
);

-- Translation History Table (for audit trail)
CREATE TABLE IF NOT EXISTS translation_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    translation_id UUID REFERENCES translations(id) ON DELETE CASCADE,
    old_value TEXT,
    new_value TEXT,
    changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    change_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(key);
CREATE INDEX IF NOT EXISTS idx_translations_locale ON translations(locale);
CREATE INDEX IF NOT EXISTS idx_translations_namespace ON translations(namespace);
CREATE INDEX IF NOT EXISTS idx_translations_locale_namespace ON translations(locale, namespace);
CREATE INDEX IF NOT EXISTS idx_locales_code ON locales(code);
CREATE INDEX IF NOT EXISTS idx_locales_active ON locales(is_active);
CREATE INDEX IF NOT EXISTS idx_user_locale_preferences_user_id ON user_locale_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_translation_stats_locale_namespace ON translation_stats(locale, namespace);
CREATE INDEX IF NOT EXISTS idx_translation_history_translation_id ON translation_history(translation_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_translations_updated_at BEFORE UPDATE ON translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locales_updated_at BEFORE UPDATE ON locales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_translation_namespaces_updated_at BEFORE UPDATE ON translation_namespaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_locale_preferences_updated_at BEFORE UPDATE ON user_locale_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default locales
INSERT INTO locales (code, name, native_name, flag, currency, date_format, time_format, number_format, rtl) VALUES
('en', 'English', 'English', '🇺🇸', 'USD', 'MM/DD/YYYY', 'HH:mm', '{"decimal": ".", "thousands": ","}', false),
('es', 'Spanish', 'Español', '🇪🇸', 'EUR', 'DD/MM/YYYY', 'HH:mm', '{"decimal": ",", "thousands": "."}', false),
('fr', 'French', 'Français', '🇫🇷', 'EUR', 'DD/MM/YYYY', 'HH:mm', '{"decimal": ",", "thousands": " "}', false),
('de', 'German', 'Deutsch', '🇩🇪', 'EUR', 'DD.MM.YYYY', 'HH:mm', '{"decimal": ",", "thousands": "."}', false),
('it', 'Italian', 'Italiano', '🇮🇹', 'EUR', 'DD/MM/YYYY', 'HH:mm', '{"decimal": ",", "thousands": "."}', false),
('pt', 'Portuguese', 'Português', '🇵🇹', 'EUR', 'DD/MM/YYYY', 'HH:mm', '{"decimal": ",", "thousands": " "}', false),
('ru', 'Russian', 'Русский', '🇷🇺', 'RUB', 'DD.MM.YYYY', 'HH:mm', '{"decimal": ",", "thousands": " "}', false),
('ja', 'Japanese', '日本語', '🇯🇵', 'JPY', 'YYYY/MM/DD', 'HH:mm', '{"decimal": ".", "thousands": ","}', false),
('ko', 'Korean', '한국어', '🇰🇷', 'KRW', 'YYYY.MM.DD', 'HH:mm', '{"decimal": ".", "thousands": ","}', false),
('zh', 'Chinese', '中文', '🇨🇳', 'CNY', 'YYYY/MM/DD', 'HH:mm', '{"decimal": ".", "thousands": ","}', false),
('ar', 'Arabic', 'العربية', '🇸🇦', 'SAR', 'DD/MM/YYYY', 'HH:mm', '{"decimal": ".", "thousands": ","}', true),
('hi', 'Hindi', 'हिन्दी', '🇮🇳', 'INR', 'DD/MM/YYYY', 'HH:mm', '{"decimal": ".", "thousands": ","}', false);

-- Insert default namespaces
INSERT INTO translation_namespaces (name, description) VALUES
('common', 'Common translations used across the application'),
('auth', 'Authentication and authorization related translations'),
('dashboard', 'Dashboard specific translations'),
('marketing', 'Marketing site translations'),
('errors', 'Error messages and validation messages'),
('validation', 'Form validation messages'),
('gdpr', 'GDPR and privacy related translations'),
('billing', 'Billing and subscription related translations'),
('onboarding', 'User onboarding flow translations');

-- Create function to get translation
CREATE OR REPLACE FUNCTION get_translation(
    p_key TEXT,
    p_locale TEXT,
    p_namespace TEXT DEFAULT 'common'
)
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    SELECT value INTO result
    FROM translations
    WHERE key = p_key
    AND locale = p_locale
    AND namespace = p_namespace;
    
    IF result IS NULL THEN
        -- Try fallback to English
        SELECT value INTO result
        FROM translations
        WHERE key = p_key
        AND locale = 'en'
        AND namespace = p_namespace;
    END IF;
    
    RETURN COALESCE(result, p_key);
END;
$$ LANGUAGE plpgsql;

-- Create function to update translation statistics
CREATE OR REPLACE FUNCTION update_translation_stats()
RETURNS TRIGGER AS $$
DECLARE
    total_count INTEGER;
    translated_count INTEGER;
    completion_percentage DECIMAL(5,2);
BEGIN
    -- Count total keys for the namespace
    SELECT COUNT(DISTINCT key) INTO total_count
    FROM translations
    WHERE namespace = COALESCE(NEW.namespace, OLD.namespace);
    
    -- Count translated keys for the locale and namespace
    SELECT COUNT(*) INTO translated_count
    FROM translations
    WHERE locale = COALESCE(NEW.locale, OLD.locale)
    AND namespace = COALESCE(NEW.namespace, OLD.namespace);
    
    -- Calculate completion percentage
    completion_percentage := CASE 
        WHEN total_count > 0 THEN (translated_count::DECIMAL / total_count::DECIMAL) * 100
        ELSE 0
    END;
    
    -- Insert or update statistics
    INSERT INTO translation_stats (locale, namespace, total_keys, translated_keys, completion_percentage)
    VALUES (COALESCE(NEW.locale, OLD.locale), COALESCE(NEW.namespace, OLD.namespace), total_count, translated_count, completion_percentage)
    ON CONFLICT (locale, namespace) 
    DO UPDATE SET 
        total_keys = EXCLUDED.total_keys,
        translated_keys = EXCLUDED.translated_keys,
        completion_percentage = EXCLUDED.completion_percentage,
        last_updated = NOW();
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update translation statistics
CREATE TRIGGER update_translation_stats_trigger
    AFTER INSERT OR UPDATE OR DELETE ON translations
    FOR EACH ROW EXECUTE FUNCTION update_translation_stats();

-- Create function to log translation changes
CREATE OR REPLACE FUNCTION log_translation_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO translation_history (translation_id, old_value, new_value, changed_by)
        VALUES (NEW.id, OLD.value, NEW.value, auth.uid());
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO translation_history (translation_id, old_value, new_value, changed_by)
        VALUES (NEW.id, NULL, NEW.value, auth.uid());
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO translation_history (translation_id, old_value, new_value, changed_by)
        VALUES (OLD.id, OLD.value, NULL, auth.uid());
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to log translation changes
CREATE TRIGGER log_translation_change_trigger
    AFTER INSERT OR UPDATE OR DELETE ON translations
    FOR EACH ROW EXECUTE FUNCTION log_translation_change();
