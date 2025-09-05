"use client"

import Link from 'next/link'
import { Button } from '@/components/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      question: "What is Naveeg?",
      answer: "Naveeg is an automated WordPress site creation platform designed specifically for European businesses. We help you create professional websites in minutes using AI-powered templates, automated hosting, and management tools."
    },
    {
      question: "How does the free trial work?",
      answer: "Our free trial gives you 14 days to explore all features of Naveeg. You can create one WordPress site with a free subdomain (yoursite.naveeg.online) and test all our tools. No credit card required to start."
    },
    {
      question: "What happens after my trial ends?",
      answer: "After your 14-day trial, you'll need to choose a paid plan to continue using Naveeg. Your site will remain accessible, but some features may be limited until you upgrade. We'll send you reminders before your trial expires."
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes! Both our Starter and Pro plans include custom domain support. You can connect your existing domain or purchase a new one through our platform. We'll handle the DNS setup and SSL certificate automatically."
    },
    {
      question: "What's included in hosting?",
      answer: "All plans include fast, secure WordPress hosting with automatic backups, SSL certificates, and CDN. We use European data centers to ensure fast loading times for your European visitors and GDPR compliance."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! You can cancel your subscription at any time from your dashboard. Your sites will remain active until the end of your current billing period. No long-term contracts or cancellation fees."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact us within 30 days for a full refund, no questions asked."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All prices include VAT for European customers. We use Stripe for secure payment processing."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All data is stored in European data centers (GDPR compliant), we use SSL encryption everywhere, and follow industry best practices for security. We never share your data with third parties."
    },
    {
      question: "Can I get help if I need it?",
      answer: "Of course! We offer email support for all users, with priority support for paid plans. We also have a comprehensive help center with guides, tutorials, and best practices to help you succeed."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time from your dashboard. Upgrades take effect immediately, and downgrades take effect at the end of your current billing period. We'll prorate any billing differences."
    },
    {
      question: "Do you offer team collaboration?",
      answer: "Yes! Our Pro plan includes team collaboration features, allowing you to invite team members with different permission levels. Perfect for agencies and growing businesses that need multiple people working on their sites."
    },
    {
      question: "What's the difference between Starter and Pro?",
      answer: "Starter (€49/month) includes 3 websites, custom domains, and basic analytics. Pro (€99/month) includes 10 websites, team collaboration, advanced analytics, AI chatbot integration, and priority support."
    },
    {
      question: "Can I migrate my existing WordPress site?",
      answer: "Yes! We provide migration tools to help you move your existing WordPress site to Naveeg. Our support team can also assist with the migration process to ensure everything transfers smoothly."
    },
    {
      question: "Do you offer white-label solutions?",
      answer: "Yes, our Pro plan includes white-label options, allowing you to rebrand the platform for your clients. This is perfect for agencies and freelancers who want to offer website creation as a service."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Naveeg
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://app.naveeg.com/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="https://app.naveeg.com/signup">
                <Button>Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to know about Naveeg. Can't find what you're looking for? 
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 ml-1">
              Contact us
            </Link> and we'll help you out.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Get in touch and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Contact Support
              </Button>
            </Link>
            <Link href="https://app.naveeg.com/signup">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Naveeg</h3>
              <p className="text-gray-400">
                The easiest way to create and manage WordPress sites for European businesses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/templates" className="text-gray-400 hover:text-white">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link href="/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
                <li><Link href="/status" className="text-gray-400 hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Naveeg. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
