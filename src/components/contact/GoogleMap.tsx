'use client';

// ============================================
// Vav Yapı - Google Map Component
// Interactive map with company location
// ============================================

import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface GoogleMapProps {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: string;
  showDirections?: boolean;
}

// TODO: Add your Google Maps API key to .env.local
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

export function GoogleMap({
  address = 'İstanbul, Turkey',
  lat = 41.0082,
  lng = 28.9784,
  zoom = 15,
  height = '400px',
  showDirections = true,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // If no API key, show fallback
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      return;
    }

    // Check if Google Maps script is already loaded
    if (window.google?.maps) {
      initMap();
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      initMap();
    };
    
    script.onerror = () => {
      setError('Google Maps yüklenemedi');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, [apiKey, lat, lng, zoom]);

  const initMap = () => {
    if (!mapRef.current || !window.google?.maps) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
      });

      // Add marker
      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Vav Yapı',
        animation: window.google.maps.Animation.DROP,
      });

      setMapLoaded(true);
    } catch (err) {
      setError('Harita yüklenirken bir hata oluştu');
    }
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  // Fallback: Static map or embed
  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="relative" style={{ height }}>
        {/* Static Map Fallback with OpenStreetMap */}
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
        
        {/* Overlay with address and actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-sm">{address}</span>
            </div>
            {showDirections && (
              <div className="flex gap-2">
                <button
                  onClick={getDirections}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Yol Tarifi
                </button>
                <button
                  onClick={openInGoogleMaps}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Loading State */}
      {!mapLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Actions Overlay */}
      {mapLoaded && showDirections && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-sm truncate">{address}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={getDirections}
                className="flex items-center gap-1 px-3 py-1 bg-primary hover:bg-primary/90 text-white rounded text-sm transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Yol Tarifi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Type declaration for Google Maps
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: object) => {
          setCenter: (center: { lat: number; lng: number }) => void;
        };
        Marker: new (options: object) => object;
        Animation: {
          DROP: number;
          BOUNCE: number;
        };
      };
    };
  }
}
