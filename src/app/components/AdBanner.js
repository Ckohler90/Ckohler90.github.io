'use client';

import { useState, useEffect } from 'react';

export default function AdBanner({ ads = [], type, position }) {
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return nothing if no ads provided or not yet hydrated
  if (!ads || ads.length === 0 || !isClient) {
    return null;
  }

  const getContainerStyles = () => {
    switch (type) {
      case 'banner':
        return position === 'top' 
          ? "w-full mb-4 flex justify-center flex-wrap gap-4" 
          : "w-full mt-4 flex justify-center flex-wrap gap-4";
      case 'medium-rectangle':
        // 300x250 ads for top section sides
        return "flex justify-center items-center flex-wrap gap-4";
      case 'sidebar':
        return "w-64 mx-2 space-y-4";
      case 'sticky-footer':
        // For sticky footer, we might want to display ads side by side
        return "fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 bg-white border border-gray-300 shadow-lg flex gap-2 p-2";
      default:
        return "flex justify-center flex-wrap gap-4";
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
      {ads.map((ad, index) => (
        ad.html && (
          <div 
            key={index}
            className={getAdStyles()}
            dangerouslySetInnerHTML={{ __html: ad.html }} 
          />
        )
      ))}
    </div>
  );
} 