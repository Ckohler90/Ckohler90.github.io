'use client';

import { useState, useEffect } from 'react';

export default function AdBanner({ ads = [], type, position }) {
  const [selectedAd, setSelectedAd] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Select random ad only after client-side hydration
  useEffect(() => {
    if (isClient && ads && ads.length > 0) {
      const randomAd = ads[Math.floor(Math.random() * ads.length)];
      setSelectedAd(randomAd);
    }
  }, [isClient, ads]);

  // Return nothing if no ads provided or not yet hydrated
  if (!ads || ads.length === 0 || !isClient || !selectedAd) {
    return null;
  }

  const getContainerStyles = () => {
    switch (type) {
      case 'banner':
        return position === 'top' 
          ? "w-full mb-4 flex justify-center" 
          : "w-full mt-4 flex justify-center";
      case 'medium-rectangle':
        // 300x250 ads for top section sides
        return "w-[300px] h-[250px] flex justify-center items-center";
      case 'sidebar':
        return "w-64 mx-2";
      case 'sticky-footer':
        // 300x600 sticky footer
        return "fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[728px] h-[90px] z-40 bg-white border border-gray-300 shadow-lg";
      default:
        return "flex justify-center";
    }
  };

  const getAdStyles = () => {
    switch (type) {
      case 'medium-rectangle':
        return "w-[300px] h-[250px]";
      case 'sticky-footer':
        return "w-[728px] h-[90px]";
      default:
        return "";
    }
  };

  return (
    <div className={getContainerStyles()}>
      {selectedAd.html && (
        <div 
          className={getAdStyles()}
          dangerouslySetInnerHTML={{ __html: selectedAd.html }} 
        />
      )}
    </div>
  );
} 