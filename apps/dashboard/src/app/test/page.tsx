'use client'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Dashboard Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Basic Rendering Test
          </h2>
          <p className="text-gray-600 mb-4">
            If you can see this page with proper styling, the basic Next.js setup is working.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Test Button
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Another Button
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tailwind CSS Test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-red-100 p-4 rounded">
              <h3 className="font-semibold text-red-800">Red Card</h3>
              <p className="text-red-600">This should be red</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-semibold text-green-800">Green Card</h3>
              <p className="text-green-600">This should be green</p>
            </div>
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-semibold text-blue-800">Blue Card</h3>
              <p className="text-blue-600">This should be blue</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Environment Variables Test
          </h2>
          <div className="space-y-2">
            <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
            <p><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
