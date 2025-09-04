/**
 * Privacy Policy Manager
 * Handles privacy policy creation, updates, and versioning
 */

import { createClient } from '@supabase/supabase-js'
import { PrivacyPolicy } from './types'

export class PrivacyPolicyManager {
  private supabase: any

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  /**
   * Create a new privacy policy
   */
  async createPrivacyPolicy(policy: Omit<PrivacyPolicy, 'id' | 'created_at' | 'updated_at'>): Promise<PrivacyPolicy | null> {
    try {
      // Deactivate existing policies
      await this.supabase
        .from('privacy_policies')
        .update({ is_active: false })
        .eq('is_active', true)

      // Create new policy
      const policyData = {
        ...policy,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await this.supabase
        .from('privacy_policies')
        .insert(policyData)
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error creating privacy policy:', error)
      return null
    }
  }

  /**
   * Get active privacy policy
   */
  async getActivePrivacyPolicy(language: string = 'en'): Promise<PrivacyPolicy | null> {
    try {
      const { data, error } = await this.supabase
        .from('privacy_policies')
        .select('*')
        .eq('is_active', true)
        .eq('language', language)
        .order('effective_date', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching active privacy policy:', error)
      return null
    }
  }

  /**
   * Get privacy policy by version
   */
  async getPrivacyPolicyByVersion(version: string, language: string = 'en'): Promise<PrivacyPolicy | null> {
    try {
      const { data, error } = await this.supabase
        .from('privacy_policies')
        .select('*')
        .eq('version', version)
        .eq('language', language)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching privacy policy by version:', error)
      return null
    }
  }

  /**
   * Get all privacy policy versions
   */
  async getAllPrivacyPolicyVersions(language: string = 'en'): Promise<PrivacyPolicy[]> {
    try {
      const { data, error } = await this.supabase
        .from('privacy_policies')
        .select('*')
        .eq('language', language)
        .order('effective_date', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching privacy policy versions:', error)
      return []
    }
  }

  /**
   * Update privacy policy
   */
  async updatePrivacyPolicy(
    policyId: string,
    updates: Partial<PrivacyPolicy>
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('privacy_policies')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', policyId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error updating privacy policy:', error)
      return false
    }
  }

  /**
   * Deactivate privacy policy
   */
  async deactivatePrivacyPolicy(policyId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('privacy_policies')
        .update({
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', policyId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deactivating privacy policy:', error)
      return false
    }
  }

  /**
   * Delete privacy policy
   */
  async deletePrivacyPolicy(policyId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('privacy_policies')
        .delete()
        .eq('id', policyId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting privacy policy:', error)
      return false
    }
  }

  /**
   * Generate default privacy policy content
   */
  generateDefaultPrivacyPolicy(language: string = 'en'): string {
    const templates = {
      en: `
# Privacy Policy

**Effective Date:** [DATE]
**Last Updated:** [DATE]

## 1. Introduction

Naveeg ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.

## 2. Information We Collect

### 2.1 Personal Information
- Name and contact information
- Email address
- Account credentials
- Payment information
- Website preferences and settings

### 2.2 Usage Information
- Website usage data
- Analytics data
- Device information
- IP address and location data

### 2.3 Cookies and Tracking
- Essential cookies for website functionality
- Analytics cookies for performance monitoring
- Marketing cookies for advertising
- Personalization cookies for user experience

## 3. How We Use Your Information

We use your information to:
- Provide and maintain our services
- Process payments and subscriptions
- Communicate with you
- Improve our services
- Comply with legal obligations
- Protect against fraud and abuse

## 4. Information Sharing

We may share your information with:
- Service providers and partners
- Legal authorities when required
- Business transfers or acquisitions
- With your explicit consent

## 5. Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## 6. Your Rights

Under GDPR, you have the right to:
- Access your personal data
- Rectify inaccurate data
- Erase your data
- Restrict processing
- Data portability
- Object to processing
- Withdraw consent

## 7. Data Retention

We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law.

## 8. International Transfers

Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place.

## 9. Children's Privacy

Our services are not intended for children under 16. We do not knowingly collect personal information from children.

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## 11. Contact Us

If you have any questions about this Privacy Policy, please contact us at:
- Email: privacy@naveeg.com
- Address: [COMPANY_ADDRESS]
      `,
      es: `
# Política de Privacidad

**Fecha de Efecto:** [DATE]
**Última Actualización:** [DATE]

## 1. Introducción

Naveeg ("nosotros," "nuestro," o "nos") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestro sitio web y servicios.

## 2. Información que Recopilamos

### 2.1 Información Personal
- Nombre e información de contacto
- Dirección de correo electrónico
- Credenciales de cuenta
- Información de pago
- Preferencias y configuraciones del sitio web

### 2.2 Información de Uso
- Datos de uso del sitio web
- Datos de análisis
- Información del dispositivo
- Dirección IP y datos de ubicación

### 2.3 Cookies y Seguimiento
- Cookies esenciales para la funcionalidad del sitio web
- Cookies de análisis para monitoreo de rendimiento
- Cookies de marketing para publicidad
- Cookies de personalización para la experiencia del usuario

## 3. Cómo Usamos Su Información

Usamos su información para:
- Proporcionar y mantener nuestros servicios
- Procesar pagos y suscripciones
- Comunicarnos con usted
- Mejorar nuestros servicios
- Cumplir con obligaciones legales
- Proteger contra fraudes y abusos

## 4. Compartir Información

Podemos compartir su información con:
- Proveedores de servicios y socios
- Autoridades legales cuando sea requerido
- Transferencias o adquisiciones comerciales
- Con su consentimiento explícito

## 5. Seguridad de Datos

Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.

## 6. Sus Derechos

Bajo el GDPR, usted tiene el derecho a:
- Acceder a sus datos personales
- Rectificar datos inexactos
- Borrar sus datos
- Restringir el procesamiento
- Portabilidad de datos
- Oponerse al procesamiento
- Retirar el consentimiento

## 7. Retención de Datos

Conservamos sus datos personales solo el tiempo necesario para los propósitos descritos en esta política o según lo requiera la ley.

## 8. Transferencias Internacionales

Sus datos pueden ser transferidos y procesados en países distintos al suyo. Aseguramos que existan las salvaguardas apropiadas.

## 9. Privacidad de Menores

Nuestros servicios no están destinados a menores de 16 años. No recopilamos conscientemente información personal de menores.

## 10. Cambios a Esta Política

Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos de cualquier cambio publicando la nueva política en esta página.

## 11. Contáctenos

Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en:
- Email: privacy@naveeg.com
- Dirección: [COMPANY_ADDRESS]
      `,
      fr: `
# Politique de Confidentialité

**Date d'Entrée en Vigueur:** [DATE]
**Dernière Mise à Jour:** [DATE]

## 1. Introduction

Naveeg ("nous," "notre," ou "nos") s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web et nos services.

## 2. Informations que Nous Collectons

### 2.1 Informations Personnelles
- Nom et informations de contact
- Adresse e-mail
- Identifiants de compte
- Informations de paiement
- Préférences et paramètres du site web

### 2.2 Informations d'Utilisation
- Données d'utilisation du site web
- Données d'analyse
- Informations sur l'appareil
- Adresse IP et données de localisation

### 2.3 Cookies et Suivi
- Cookies essentiels pour la fonctionnalité du site web
- Cookies d'analyse pour le monitoring des performances
- Cookies marketing pour la publicité
- Cookies de personnalisation pour l'expérience utilisateur

## 3. Comment Nous Utilisons Vos Informations

Nous utilisons vos informations pour:
- Fournir et maintenir nos services
- Traiter les paiements et abonnements
- Communiquer avec vous
- Améliorer nos services
- Respecter les obligations légales
- Protéger contre la fraude et les abus

## 4. Partage d'Informations

Nous pouvons partager vos informations avec:
- Prestataires de services et partenaires
- Autorités légales lorsque requis
- Transferts ou acquisitions d'entreprise
- Avec votre consentement explicite

## 5. Sécurité des Données

Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction.

## 6. Vos Droits

Sous le RGPD, vous avez le droit de:
- Accéder à vos données personnelles
- Rectifier les données inexactes
- Effacer vos données
- Restreindre le traitement
- Portabilité des données
- Vous opposer au traitement
- Retirer le consentement

## 7. Rétention des Données

Nous conservons vos données personnelles seulement aussi longtemps que nécessaire pour les objectifs décrits dans cette politique ou selon la loi.

## 8. Transferts Internationaux

Vos données peuvent être transférées et traitées dans des pays autres que le vôtre. Nous nous assurons que des garanties appropriées sont en place.

## 9. Confidentialité des Enfants

Nos services ne sont pas destinés aux enfants de moins de 16 ans. Nous ne collectons pas sciemment d'informations personnelles d'enfants.

## 10. Modifications de Cette Politique

Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.

## 11. Nous Contacter

Si vous avez des questions sur cette Politique de Confidentialité, contactez-nous à:
- Email: privacy@naveeg.com
- Adresse: [COMPANY_ADDRESS]
      `
    }

    return templates[language as keyof typeof templates] || templates.en
  }

  /**
   * Create default privacy policy
   */
  async createDefaultPrivacyPolicy(language: string = 'en'): Promise<PrivacyPolicy | null> {
    const content = this.generateDefaultPrivacyPolicy(language)
    const version = '1.0.0'
    const effectiveDate = new Date().toISOString()

    return await this.createPrivacyPolicy({
      version,
      effective_date: effectiveDate,
      content,
      language,
      is_active: true
    })
  }

  /**
   * Get privacy policy statistics
   */
  async getPrivacyPolicyStatistics(): Promise<{
    total_policies: number
    active_policies: number
    languages: string[]
    latest_version: string | null
    last_updated: string | null
  }> {
    try {
      const { data: policies } = await this.supabase
        .from('privacy_policies')
        .select('version, language, is_active, updated_at')

      const stats = {
        total_policies: policies?.length || 0,
        active_policies: policies?.filter(p => p.is_active).length || 0,
        languages: [...new Set(policies?.map(p => p.language) || [])],
        latest_version: null as string | null,
        last_updated: null as string | null
      }

      if (policies && policies.length > 0) {
        const sortedPolicies = policies.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        
        stats.latest_version = sortedPolicies[0].version
        stats.last_updated = sortedPolicies[0].updated_at
      }

      return stats
    } catch (error) {
      console.error('Error getting privacy policy statistics:', error)
      return {
        total_policies: 0,
        active_policies: 0,
        languages: [],
        latest_version: null,
        last_updated: null
      }
    }
  }

  /**
   * Check if privacy policy needs update
   */
  async checkPrivacyPolicyUpdateNeeded(): Promise<{
    needs_update: boolean
    last_updated: string | null
    days_since_update: number | null
    recommended_update: boolean
  }> {
    try {
      const { data: activePolicy } = await this.supabase
        .from('privacy_policies')
        .select('updated_at')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()

      if (!activePolicy) {
        return {
          needs_update: true,
          last_updated: null,
          days_since_update: null,
          recommended_update: true
        }
      }

      const lastUpdated = new Date(activePolicy.updated_at)
      const now = new Date()
      const daysSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24))

      // Recommend update if policy is older than 1 year
      const recommendedUpdate = daysSinceUpdate > 365

      return {
        needs_update: false,
        last_updated: activePolicy.updated_at,
        days_since_update: daysSinceUpdate,
        recommended_update: recommendedUpdate
      }
    } catch (error) {
      console.error('Error checking privacy policy update:', error)
      return {
        needs_update: true,
        last_updated: null,
        days_since_update: null,
        recommended_update: true
      }
    }
  }
}
