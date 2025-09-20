import React from 'react';
import { MapPin, Users, BarChart3, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to CleanCity
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A community-driven platform that empowers citizens to report sanitation issues, 
          helps authorities manage cleaning efforts efficiently, and creates cleaner, 
          healthier communities for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
            Report an Issue
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Reporting</h3>
          <p className="text-gray-600">
            Report sanitation issues with photos, location, and description in just a few clicks.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Tracking</h3>
          <p className="text-gray-600">
            Track the status of your reports from submission to resolution with live updates.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Driven</h3>
          <p className="text-gray-600">
            Join a community of engaged citizens working together for cleaner neighborhoods.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Insights</h3>
          <p className="text-gray-600">
            Authorities get powerful analytics to optimize cleaning efforts and resource allocation.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Report Issues</h3>
            <p className="text-gray-600">
              Citizens spot and report sanitation problems in their community with photos and location details.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Assign & Track</h3>
            <p className="text-gray-600">
              Authorities review reports, assign tasks to field workers, and track progress in real-time.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Resolve & Update</h3>
            <p className="text-gray-600">
              Field workers resolve issues and update status, keeping everyone informed of progress.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">1,247</div>
          <div className="text-blue-100">Issues Reported</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">1,089</div>
          <div className="text-green-100">Issues Resolved</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">87%</div>
          <div className="text-purple-100">Resolution Rate</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">2.1</div>
          <div className="text-orange-100">Avg Days to Resolve</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-6 text-blue-100">
          Join thousands of citizens making their communities cleaner and healthier.
        </p>
        <p className="text-sm text-blue-200 mb-4">
          Please select a user role from the dropdown in the navigation to get started.
        </p>
      </div>
    </div>
  );
}