'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@naveeg/lib'
import { 
  OnboardingStep, 
  OnboardingProgress, 
  SiteForm, 
  DomainForm,
  SiteFormData,
  DomainFormData
} from '@naveeg/ui'
import { createBrowserClient } from '@naveeg/lib'

const ONBOARDING_STEPS = [
  { id: 'welcome', title: 'Welcome', completed: false },
  { id: 'create-site', title: 'Create Website', completed: false },
  { id: 'connect-domain', title: 'Connect Domain', completed: false },
  { id: 'complete', title: 'Complete Setup', completed: false },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, loading: userLoading } = useUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [steps, setSteps] = useState(ONBOARDING_STEPS)
  const [siteData, setSiteData] = useState<SiteFormData | null>(null)
  const [domainData, setDomainData] = useState<DomainFormData | null>(null)
  const [isCreatingSite, setIsCreatingSite] = useState(false)
  const [isConnectingDomain, setIsConnectingDomain] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createBrowserClient()

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/signin')
    }
  }, [user, userLoading, router])

  const updateStep = (stepIndex: number, completed: boolean = false) => {
    setSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, completed } : step
    ))
  }

  const handleCreateSite = async (data: SiteFormData): Promise<{ error?: string }> => {
    setIsCreatingSite(true)
    setError(null)

    try {
      // Call the provision-site Edge Function
      const { data: result, error } = await supabase.functions.invoke('provision-site', {
        body: {
          name: data.name,
          subdomain: data.subdomain,
          template: data.template,
          description: data.description,
        }
      })

      if (error) {
        throw new Error(error.message || 'Failed to create site')
      }

      if (result?.error) {
        throw new Error(result.error)
      }

      setSiteData(data)
      updateStep(1, true)
      setCurrentStep(2)
      return {}
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create site'
      setError(errorMessage)
      return { error: errorMessage }
    } finally {
      setIsCreatingSite(false)
    }
  }

  const handleConnectDomain = async (data: DomainFormData): Promise<{ error?: string }> => {
    if (!siteData) return { error: 'No site data available' }

    setIsConnectingDomain(true)
    setError(null)

    try {
      // Call the manage-domain Edge Function
      const { data: result, error } = await supabase.functions.invoke('manage-domain', {
        body: {
          site_id: siteData.subdomain, // Using subdomain as site identifier
          domain: data.domain,
        }
      })

      if (error) {
        throw new Error(error.message || 'Failed to connect domain')
      }

      if (result?.error) {
        throw new Error(result.error)
      }

      setDomainData(data)
      updateStep(2, true)
      setCurrentStep(3)
      return {}
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect domain'
      setError(errorMessage)
      return { error: errorMessage }
    } finally {
      setIsConnectingDomain(false)
    }
  }

  const handleSkipDomain = () => {
    updateStep(2, true)
    setCurrentStep(3)
  }

  const handleComplete = () => {
    updateStep(3, true)
    router.push('/dashboard')
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Naveeg!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Let&apos;s get your website up and running in just a few steps.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps}
          />
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {/* Step 1: Welcome */}
          <OnboardingStep
            step={1}
            totalSteps={steps.length}
            title="Welcome to Naveeg"
            description="Let&apos;s create your first website"
            isActive={currentStep === 1}
            isCompleted={steps[0].completed}
          >
            <div className="text-center space-y-6">
              <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to build something amazing?
                </h3>
                <p className="text-gray-600 mb-6">
                  We&apos;ll help you create a professional WordPress website in minutes. 
                  Choose from our templates and get started right away.
                </p>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Let&apos;s Get Started
                </button>
              </div>
            </div>
          </OnboardingStep>

          {/* Step 2: Create Site */}
          <OnboardingStep
            step={2}
            totalSteps={steps.length}
            title="Create Your Website"
            description="Choose a name, subdomain, and template"
            isActive={currentStep === 2}
            isCompleted={steps[1].completed}
          >
            <SiteForm
              onSubmit={handleCreateSite}
              loading={isCreatingSite}
            />
            {error && (
              <div className="text-center">
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md inline-block">
                  {error}
                </div>
              </div>
            )}
          </OnboardingStep>

          {/* Step 3: Connect Domain */}
          <OnboardingStep
            step={3}
            totalSteps={steps.length}
            title="Connect Your Domain"
            description="Add a custom domain or skip for now"
            isActive={currentStep === 3}
            isCompleted={steps[2].completed}
          >
            {siteData && (
              <DomainForm
                siteUrl={`https://${siteData.subdomain}.naveeg.com`}
                onSubmit={handleConnectDomain}
                onSkip={handleSkipDomain}
                loading={isConnectingDomain}
              />
            )}
            {error && (
              <div className="text-center">
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md inline-block">
                  {error}
                </div>
              </div>
            )}
          </OnboardingStep>

          {/* Step 4: Complete */}
          <OnboardingStep
            step={4}
            totalSteps={steps.length}
            title="Setup Complete!"
            description="Your website is ready to go"
            isActive={currentStep === 4}
            isCompleted={steps[3].completed}
          >
            <div className="text-center space-y-6">
              <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Congratulations! 🎉
                </h3>
                <p className="text-gray-600 mb-6">
                  Your website has been created successfully. You can now access your dashboard 
                  to manage your site, add content, and customize your design.
                </p>
                {siteData && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-blue-900 mb-2">Your Website Details</h4>
                    <p className="text-sm text-blue-700">
                      <strong>Name:</strong> {siteData.name}<br />
                      <strong>URL:</strong> <a href={`https://${siteData.subdomain}.naveeg.com`} target="_blank" rel="noopener noreferrer" className="underline">https://{siteData.subdomain}.naveeg.com</a>
                      {domainData && (
                        <>
                          <br />
                          <strong>Custom Domain:</strong> {domainData.domain}
                        </>
                      )}
                    </p>
                  </div>
                )}
                <button
                  onClick={handleComplete}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </OnboardingStep>
        </div>
      </div>
    </div>
  )
}