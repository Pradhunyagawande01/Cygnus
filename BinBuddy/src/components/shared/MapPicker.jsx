import React, { useState } from 'react';
import { MapIcon, Search, Navigation } from 'lucide-react';

export default function MapPicker({ onLocationSelect, initialLocation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || {
    lat: 40.7831,
    lng: -73.9712,
    address: ''
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude}, ${position.coords.longitude}`
          };
          handleLocationSelect(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const searchLocation = () => {
    if (searchQuery.trim()) {
      // Simulate geocoding - in real app, use Google Maps Geocoding API
      const mockLocation = {
        lat: 40.7589 + (Math.random() - 0.5) * 0.01,
        lng: -73.9851 + (Math.random() - 0.5) * 0.01,
        address: searchQuery
      };
      handleLocationSelect(mockLocation);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <MapIcon className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Select Location</h3>
      </div>
      
      {/* Search Bar */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an address..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
        />
        <button
          onClick={searchLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Search className="w-4 h-4" />
        </button>
        <button
          onClick={getCurrentLocation}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          title="Use current location"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>
      
      {/* Mock Map Display */}
      <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Interactive map would display here</p>
          {selectedLocation.address && (
            <div className="mt-2 p-2 bg-white rounded shadow text-sm">
              📍 {selectedLocation.address}
            </div>
          )}
        </div>
      </div>
      
      {/* Selected Location Info */}
      {selectedLocation.address && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800">Selected Location:</p>
          <p className="text-sm text-blue-600">{selectedLocation.address}</p>
          <p className="text-xs text-blue-500 mt-1">
            Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
}