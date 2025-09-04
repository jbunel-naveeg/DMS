-- GDPR RLS Policies Migration
-- This migration creates Row Level Security policies for GDPR compliance tables

-- Enable RLS on all GDPR tables
ALTER TABLE consent_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_subject_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_retention_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_deletion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_breaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_processing_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_protection_officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_impact_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Consent Preferences Policies
CREATE POLICY "Users can view their own consent preferences" ON consent_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consent preferences" ON consent_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consent preferences" ON consent_preferences
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all consent preferences" ON consent_preferences
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Cookie Consent Policies
CREATE POLICY "Users can view their own cookie consent" ON cookie_consent
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cookie consent" ON cookie_consent
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all cookie consent" ON cookie_consent
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Data Subject Requests Policies
CREATE POLICY "Users can view their own data subject requests" ON data_subject_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data subject requests" ON data_subject_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all data subject requests" ON data_subject_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update data subject requests" ON data_subject_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Privacy Policies Policies (Public read, Admin write)
CREATE POLICY "Anyone can view active privacy policies" ON privacy_policies
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can view all privacy policies" ON privacy_policies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert privacy policies" ON privacy_policies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update privacy policies" ON privacy_policies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Data Retention Policies Policies (Admin only)
CREATE POLICY "Admins can view data retention policies" ON data_retention_policies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert data retention policies" ON data_retention_policies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update data retention policies" ON data_retention_policies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete data retention policies" ON data_retention_policies
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Audit Logs Policies (Admin only, with user access to their own logs)
CREATE POLICY "Users can view their own audit logs" ON audit_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "System can insert audit logs" ON audit_logs
    FOR INSERT WITH CHECK (true);

-- Data Exports Policies
CREATE POLICY "Users can view their own data exports" ON data_exports
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data exports" ON data_exports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all data exports" ON data_exports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "System can update data exports" ON data_exports
    FOR UPDATE USING (true);

-- Data Deletion Requests Policies
CREATE POLICY "Users can view their own deletion requests" ON data_deletion_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own deletion requests" ON data_deletion_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all deletion requests" ON data_deletion_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update deletion requests" ON data_deletion_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Data Breaches Policies (Admin only)
CREATE POLICY "Admins can view data breaches" ON data_breaches
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert data breaches" ON data_breaches
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update data breaches" ON data_breaches
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Data Processing Activities Policies (Admin only)
CREATE POLICY "Admins can view data processing activities" ON data_processing_activities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert data processing activities" ON data_processing_activities
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update data processing activities" ON data_processing_activities
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete data processing activities" ON data_processing_activities
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Data Protection Officers Policies (Admin only)
CREATE POLICY "Admins can view data protection officers" ON data_protection_officers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert data protection officers" ON data_protection_officers
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update data protection officers" ON data_protection_officers
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete data protection officers" ON data_protection_officers
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Privacy Impact Assessments Policies (Admin only)
CREATE POLICY "Admins can view privacy impact assessments" ON privacy_impact_assessments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert privacy impact assessments" ON privacy_impact_assessments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update privacy impact assessments" ON privacy_impact_assessments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete privacy impact assessments" ON privacy_impact_assessments
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Compliance Reports Policies (Admin only)
CREATE POLICY "Admins can view compliance reports" ON compliance_reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert compliance reports" ON compliance_reports
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- User Notifications Policies
CREATE POLICY "Users can view their own notifications" ON user_notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON user_notifications
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert user notifications" ON user_notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all user notifications" ON user_notifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Admin Notifications Policies (Admin only)
CREATE POLICY "Admins can view admin notifications" ON admin_notifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update admin notifications" ON admin_notifications
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "System can insert admin notifications" ON admin_notifications
    FOR INSERT WITH CHECK (true);

-- User Sessions Policies
CREATE POLICY "Users can view their own sessions" ON user_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON user_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" ON user_sessions
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions" ON user_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Notification Logs Policies (Admin only)
CREATE POLICY "Admins can view notification logs" ON notification_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "System can insert notification logs" ON notification_logs
    FOR INSERT WITH CHECK (true);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is admin or owner
CREATE OR REPLACE FUNCTION is_admin_or_owner(resource_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.uid() = resource_user_id OR is_admin();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user's consent preferences
CREATE OR REPLACE FUNCTION get_user_consent_preferences(user_uuid UUID)
RETURNS TABLE (
    essential BOOLEAN,
    analytics BOOLEAN,
    marketing BOOLEAN,
    personalization BOOLEAN,
    third_party BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cp.essential,
        cp.analytics,
        cp.marketing,
        cp.personalization,
        cp.third_party
    FROM consent_preferences cp
    WHERE cp.user_id = user_uuid
    ORDER BY cp.created_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to log data access
CREATE OR REPLACE FUNCTION log_data_access(
    p_user_id UUID,
    p_action TEXT,
    p_resource_type TEXT,
    p_resource_id TEXT,
    p_metadata JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO audit_logs (
        user_id,
        action,
        resource_type,
        resource_id,
        metadata,
        timestamp
    ) VALUES (
        p_user_id,
        p_action,
        p_resource_type,
        p_resource_id,
        p_metadata,
        NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check data retention
CREATE OR REPLACE FUNCTION check_data_retention(
    p_data_type TEXT,
    p_created_at TIMESTAMP WITH TIME ZONE
)
RETURNS BOOLEAN AS $$
DECLARE
    retention_days INTEGER;
    cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Get retention period for data type
    SELECT retention_period_days INTO retention_days
    FROM data_retention_policies
    WHERE data_type = p_data_type
    AND auto_delete = true
    LIMIT 1;
    
    -- If no policy found, use default (1 year)
    IF retention_days IS NULL THEN
        retention_days := 365;
    END IF;
    
    -- Calculate cutoff date
    cutoff_date := NOW() - INTERVAL '1 day' * retention_days;
    
    -- Return true if data should be retained
    RETURN p_created_at > cutoff_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
