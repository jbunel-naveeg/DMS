"use client"

import Link from 'next/link'
import { Button } from '@/components/button'
import { Play, CheckCircle, ArrowRight } from 'lucide-react'

export default function DemoPage() {
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
              <Link href="/demo" className="text-blue-600 font-semibold">Demo</Link>
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
            See Naveeg in Action
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            In under 2 minutes, see how Naveeg takes you from sign-up to a live website. 
            Watch as a site for 'Jane's Bakery' is created using our platform.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Demo Video Coming Soon</h3>
                <p className="text-blue-100">
                  Watch Jane's Bakery website come to life in just 60 seconds
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              <strong>What you'll see in the demo:</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Jane fills in her bakery details
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                AI suggests a perfect template
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Site generates with photos & text
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Live website in 60 seconds
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See What You'll Get
            </h2>
            <p className="text-xl text-gray-600">
              A glimpse of the Naveeg experience and the beautiful websites we create
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dashboard Screenshot */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">📊</span>
                  </div>
                  <p className="text-gray-600 font-semibold">Your Simple Dashboard</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Interface</h3>
                <p className="text-gray-600 text-sm">
                  Manage everything from one simple dashboard. Create sites, view analytics, 
                  and manage your online presence with ease.
                </p>
              </div>
            </div>

            {/* Sample Website */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">🌐</span>
                  </div>
                  <p className="text-gray-600 font-semibold">Live Website</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sample Website</h3>
                <p className="text-gray-600 text-sm">
                  A live website created by Naveeg's AI – customize it or use it as-is. 
                  Professional design that converts visitors into customers.
                </p>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">📈</span>
                  </div>
                  <p className="text-gray-600 font-semibold">Analytics & Insights</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Tracking</h3>
                <p className="text-gray-600 text-sm">
                  Get insights and leads without extra setup. See how many people visit your site 
                  and where they come from (Pro plan shown).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Example Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Try It Yourself
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Don't just watch – experience Naveeg for yourself. Create your own website 
            in minutes and see the magic happen.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Jane's Bakery Live Example
            </h3>
            <p className="text-gray-600 mb-6">
              This is a real website created with Naveeg. See how professional it looks 
              and how easy it was to create.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://janes-bakery.naveeg.online" target="_blank">
                <Button size="lg" className="w-full sm:w-auto">
                  View Live Website
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="https://app.naveeg.com/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Create Your Own
                </Button>
              </Link>
            </div>
          </div>
          
          <p className="text-gray-600">
            <strong>Impressed? You can do it too.</strong> In fact, why not try it free for 7 days 
            and see your own website come to life?
          </p>
        </div>
      </section>

      {/* Personal Demo CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Want a Personal Demo?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're happy to do a personal demo for you – contact us to schedule a walkthrough. 
            We'll show you exactly how Naveeg can help your specific business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Schedule a Demo
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
                <li><Link href="/demo" className="text-gray-400 hover:text-white">Demo</Link></li>
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
