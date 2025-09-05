"use client"

import Link from 'next/link'
import { Button } from '@/components/button'
import { Wrench, Store, Scissors, Briefcase, MapPin, Users } from 'lucide-react'

export default function SolutionsPage() {
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
              <Link href="/solutions" className="text-blue-600 font-semibold">Solutions</Link>
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
            Solutions for Every Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're a local service provider, restaurant owner, or consultant, 
            Naveeg has the perfect solution to get your business online and growing.
          </p>
        </div>
      </section>

      {/* Local Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Wrench className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">For Local Services</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                <strong>Be the go-to pro in your area.</strong> When someone in your city searches for a plumber, 
                electrician, or contractor, make sure they find <strong>you</strong> first. Naveeg creates a clean, 
                informative website that showcases your services and credentials.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We'll help you get listed on Google search/maps and capture inquiries through your site's contact form – 
                so potential clients can reach you instantly for quotes or emergencies. No need to know anything about SEO or web design; 
                we've optimized everything for local search.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                <strong>You just get more calls and bookings, without the hassle.</strong>
              </p>
              <Link href="https://app.naveeg.com/signup">
                <Button size="lg">Get Started for Local Services</Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">🔧</div>
                <p className="text-xl text-gray-700">Perfect for:</p>
                <ul className="text-lg text-gray-600 mt-4 space-y-2">
                  <li>• Plumbers & Electricians</li>
                  <li>• Contractors & Builders</li>
                  <li>• HVAC Technicians</li>
                  <li>• Landscapers</li>
                  <li>• Handymen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retail & Restaurants */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-green-600 mb-4">🍽️</div>
                  <p className="text-xl text-gray-700">Perfect for:</p>
                  <ul className="text-lg text-gray-600 mt-4 space-y-2">
                    <li>• Restaurants & Cafés</li>
                    <li>• Boutiques & Shops</li>
                    <li>• Food Trucks</li>
                    <li>• Bakeries</li>
                    <li>• Retail Stores</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Store className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">For Retail & Restaurants</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                <strong>Attract more diners & shoppers.</strong> Whether you run a cozy café, a trendy boutique, 
                or a family restaurant, Naveeg helps you put your best foot forward online. Show off your menu or products 
                with a beautiful gallery on your site.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Share your opening hours, location (with an integrated Google Map), and allow customers to contact or reserve easily. 
                We can even integrate basic online ordering or booking if you need (through simple plugins).
              </p>
              <p className="text-lg text-gray-600 mb-8">
                <strong>Most importantly, we ensure your business appears on Google when locals search for your cuisine or products. 
                Naveeg's all-in-one platform means you don't have to juggle Yelp, Facebook, and a dozen apps – manage your online presence in one place.</strong>
              </p>
              <Link href="https://app.naveeg.com/signup">
                <Button size="lg">Get Started for Retail</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Health & Beauty */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <Scissors className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">For Health & Beauty</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                <strong>Let your brand shine online.</strong> In the beauty and wellness industry, first impressions matter. 
                Naveeg will create a stunning website that reflects the style and vibe of your salon, spa, or fitness studio.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Upload photos of your work or facility, and our AI can generate engaging descriptions for your services. 
                We'll help you integrate a booking widget or contact form so clients can easily book appointments or consultations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                <strong>Busy running your shop? Naveeg ensures your site stays up-to-date and can even greet visitors with an AI chatbot 
                to answer FAQs (like "Do you accept walk-ins?" or "What are your prices?") while you're with clients. 
                It's like having a virtual receptionist on your website 24/7.</strong>
              </p>
              <Link href="https://app.naveeg.com/signup">
                <Button size="lg">Get Started for Beauty</Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-pink-600 mb-4">💄</div>
                <p className="text-xl text-gray-700">Perfect for:</p>
                <ul className="text-lg text-gray-600 mt-4 space-y-2">
                  <li>• Hair Salons</li>
                  <li>• Spas & Wellness</li>
                  <li>• Fitness Studios</li>
                  <li>• Nail Salons</li>
                  <li>• Massage Therapists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals & Consultants */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-600 mb-4">💼</div>
                  <p className="text-xl text-gray-700">Perfect for:</p>
                  <ul className="text-lg text-gray-600 mt-4 space-y-2">
                    <li>• Consultants</li>
                    <li>• Accountants</li>
                    <li>• Lawyers</li>
                    <li>• Coaches</li>
                    <li>• Freelancers</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">For Professionals & Consultants</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                <strong>Build credibility and get leads.</strong> If you're an independent consultant, accountant, or any professional service provider, 
                a solid website is your digital business card. Naveeg will create a clean, modern site where you can showcase your expertise, 
                testimonials, and services.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Position yourself as the expert in your field with blog posts – don't worry, our AI can help draft articles or insights to keep your site active and insightful. 
                With built-in SEO, potential clients will find you via Google when searching for the services you offer.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                <strong>When they do, your site's contact form and AI chatbot ensure you capture their inquiry and respond with information even while you're busy working. 
                It's like having a personal marketing assistant that works around the clock.</strong>
              </p>
              <Link href="https://app.naveeg.com/signup">
                <Button size="lg">Get Started for Professionals</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get your business online?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            No matter what type of business you run, Naveeg has the perfect solution to help you succeed online. 
            Start your free trial today – no credit card required.
          </p>
          <Link href="https://app.naveeg.com/signup">
            <Button size="lg" variant="secondary">
              Start Your 7-Day Free Trial
            </Button>
          </Link>
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
                <li><Link href="/solutions" className="text-gray-400 hover:text-white">Solutions</Link></li>
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
