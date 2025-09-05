"use client"

import Link from 'next/link'
import { Button } from '@/components/button'
import { CheckCircle, Zap, Shield, Globe, Users, BarChart3, Headphones, Lock, Star } from 'lucide-react'

export default function HomePage() {
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
              <Link href="/solutions" className="text-gray-600 hover:text-gray-900">Solutions</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900">Demo</Link>
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
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
      <section className="relative bg-gradient-primary-bg section-padding overflow-hidden">
        <div className="container-custom">
          <div className="text-center relative z-10">
            <div className="kicker mb-4">The Future of Website Creation</div>
            <h1 className="mb-6">
              Get Your Business Online
              <span className="bg-gradient-main bg-clip-text text-transparent block">in Minutes</span>
            </h1>
            <p className="text-xl text-muted mb-8 max-w-3xl mx-auto">
              Naveeg's AI-powered platform builds and manages your website, 
              so you can focus on your business. No tech skills needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="https://app.naveeg.com/signup">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Start Your 7-Day Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="kicker mb-4">Simple Process</div>
            <h2 className="mb-4">
              How Naveeg Works
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Get your website live in just 3 simple steps. No technical knowledge required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-starter rounded-brand flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                <span className="text-2xl font-bold text-ink-light">1</span>
              </div>
              <h3 className="mb-4">Sign Up & Tell Us About Your Business</h3>
              <p className="text-muted">
                Create your free account and answer a few simple questions 
                (like your business name and industry).
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-pro rounded-brand flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                <span className="text-2xl font-bold text-ink-light">2</span>
              </div>
              <h3 className="mb-4">AI Builds Your Website</h3>
              <p className="text-muted">
                Our platform instantly generates a customized WordPress website 
                with design, images, and text just for you. No coding needed.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-trial rounded-brand flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                <span className="text-2xl font-bold text-ink-light">3</span>
              </div>
              <h3 className="mb-4">You're Live & Growing</h3>
              <p className="text-muted">
                Your site goes live on a free domain (e.g. mybusiness.naveeg.online). 
                View your site, tweak anything if needed, or connect your own domain when ready.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/demo">
              <Button variant="outline" size="lg">
                See a Live Example
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-primary-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="kicker mb-4">Why Choose Naveeg?</div>
            <h2 className="mb-4">
              Everything you need to succeed online, without the complexity.
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Built for business owners who want results, not technical headaches.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-starter rounded-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-7 h-7 text-ink-light" />
              </div>
              <h3 className="mb-4">Website in Minutes</h3>
              <p className="text-muted">
                Launch a professional WordPress website faster than making a cup of coffee. 
                No design skills needed.
              </p>
            </div>
            
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-pro rounded-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <Globe className="w-7 h-7 text-ink-light" />
              </div>
              <h3 className="mb-4">More Customers, Less Effort</h3>
              <p className="text-muted">
                Attract new clients online without any marketing expertise – 
                we handle the tech so you can focus on serving customers.
              </p>
            </div>
            
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-trial rounded-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <BarChart3 className="w-7 h-7 text-ink-light" />
              </div>
              <h3 className="mb-4">All-in-One Management</h3>
              <p className="text-muted">
                Your website, SEO, leads, and even AI chat support – 
                all managed from one simple dashboard.
              </p>
            </div>
            
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-pricing rounded-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <Users className="w-7 h-7 text-ink-light" />
              </div>
              <h3 className="mb-4">Team Collaboration</h3>
              <p className="text-muted">
                Invite team members to help manage your website. 
                Perfect for growing businesses and agencies.
              </p>
            </div>
            
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-background rounded-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-7 h-7 text-ink-light" />
              </div>
              <h3 className="mb-4">Secure & Reliable</h3>
              <p className="text-muted">
                Enterprise-grade security and hosting. Your data stays safe in Europe 
                with full GDPR compliance.
              </p>
            </div>
            
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="w-14 h-14 bg-gradient-main rounded-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <Headphones className="w-7 h-7 text-ink-light" />
              </div>
              <h3 className="mb-4">Always Here to Help</h3>
              <p className="text-muted">
                Get help when you need it with our AI chatbot and dedicated support team. 
                We're your partner in success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="kicker mb-4">Simple Pricing</div>
            <h2 className="mb-4">
              Choose the plan that fits your needs
            </h2>
            <p className="text-xl text-muted">
              All plans include VAT and can be cancelled anytime
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trial Plan */}
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="text-center">
                <h3 className="mb-2">7-Day Trial</h3>
                <div className="text-4xl font-bold text-ink mb-4">Free</div>
                <p className="text-muted mb-6">Try Naveeg risk-free</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">1 WordPress site</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Free Naveeg subdomain</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">AI website builder</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Basic support</span>
                  </li>
                </ul>
                <Link href="https://app.naveeg.com/signup">
                  <Button variant="outline" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="card group hover:shadow-card-hover transition-all duration-200 relative border-2 border-accent-blue">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent-blue text-ink-light px-4 py-1 rounded-brand text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="mb-2">Starter</h3>
                <div className="text-4xl font-bold text-ink mb-4">€49<span className="text-lg text-muted">/month</span></div>
                <p className="text-muted mb-6">Perfect for getting started</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">1 WordPress site</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Free Naveeg subdomain</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">AI website builder</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">SEO basics & mobile-friendly</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Contact form & lead collection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Email support</span>
                  </li>
                </ul>
                <Link href="https://app.naveeg.com/signup">
                  <Button variant="primary" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="card group hover:shadow-card-hover transition-all duration-200">
              <div className="text-center">
                <h3 className="mb-2">Pro</h3>
                <div className="text-4xl font-bold text-ink mb-4">€99<span className="text-lg text-muted">/month</span></div>
                <p className="text-muted mb-6">For growing businesses</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Up to 5 websites</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Custom domains</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">AI chatbot</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">E-commerce ready</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                    <span className="text-muted">Priority support</span>
                  </li>
                </ul>
                <Link href="https://app.naveeg.com/signup">
                  <Button variant="gradient" className="w-full">
                    Go Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                View Detailed Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding bg-gradient-primary-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="kicker mb-4">Customer Success</div>
            <h2 className="mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-accent-yellow fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-ink mb-6 italic font-medium">
                "I always delayed making a website because I'm not tech-savvy. 
                Naveeg got my salon online in a day! Now I'm getting more bookings than ever."
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-starter rounded-brand flex items-center justify-center mr-4">
                  <span className="text-ink-light font-semibold text-lg">S</span>
                </div>
                <div>
                  <p className="font-semibold text-ink">Sofia</p>
                  <p className="text-muted">Salon Owner</p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-muted mt-8">
              Join hundreds of business owners who trust Naveeg to power their online presence.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-main">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-ink-light">
            Ready to get your business online?
          </h2>
          <p className="text-xl text-ink-light/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of business owners who trust Naveeg to power their online presence. 
            Start your free trial today – no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.naveeg.com/signup">
              <Button variant="secondary" size="lg">
                Start Your 7-Day Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-ink-light text-ink-light hover:bg-ink-light hover:text-ink">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-ink-light py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Naveeg</h3>
              <p className="text-muted">
                The easiest way to create and manage WordPress sites for European businesses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-muted hover:text-ink-light transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-muted hover:text-ink-light transition-colors">Pricing</Link></li>
                <li><Link href="/solutions" className="text-muted hover:text-ink-light transition-colors">Solutions</Link></li>
                <li><Link href="/demo" className="text-muted hover:text-ink-light transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted hover:text-ink-light transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-muted hover:text-ink-light transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-muted hover:text-ink-light transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-muted hover:text-ink-light transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-muted hover:text-ink-light transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="text-muted hover:text-ink-light transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="text-muted hover:text-ink-light transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-muted">
            <p>&copy; 2024 Naveeg. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
