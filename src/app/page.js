'use client';

import { useState } from 'react';
import RedirectForm from './components/RedirectForm.js';
import AdBanner from './components/AdBanner.js';
import { CircleOff, DollarSign, X } from 'lucide-react';

export default function Home() {
  const [showAds, setShowAds] = useState(true);  // set to true to show ads
  const [showModal, setShowModal] = useState(false);

  // Handle the showAds button click - show modal instead of directly toggling
  const handleToggleAdsClick = () => {
    if (showAds) {
      setShowModal(true);
    } else {
      setShowAds(true);
    }
  };

  // Handle modal accept - toggle ads off and close modal
  const handleAccept = () => {
    setShowAds(false);
    setShowModal(false);
  };

  // Handle modal decline - show alert and close modal
  const handleDecline = () => {
    setShowModal(false);
    alert("Cheapass");
  };

  // Placeholder ad structure - you can replace this with your own creatives
  const sampleAds = {};
    

  return (
    <main className="min-h-screen bg-gray-50 py-8 relative pb-24">
      {/* Toggle Button - Fixed position */}
      <button
        onClick={handleToggleAdsClick}
        className="fixed top-4 right-4 z-50 hover:bg-red-700 text-black px-4 py-2 rounded-lg font-bold shadow-lg transition-colors"
      >
        {showAds ? <CircleOff /> : <DollarSign />}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Ad-Free Experience</h2>
            <p className="text-center mb-6">For an ad-free experience, pay Corey $10</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleAccept}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content with conditional ad layout */}
      {showAds ? (
        <div className="transition-opacity duration-500">
          {/* Top Section with Banner and Side Ads */}
          <div className="w-full mb-6">
            {/* Top Banner with 300x250 ads on sides */}
            <div className="flex justify-center items-start gap-4 mb-4">
              {/* Left 300x250 Ad */}
              <div>
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="left" />
              </div>
              
              {/* Center Banner Ad */}
              <div className="flex-shrink-0">
                <AdBanner ads={sampleAds.banner} type="banner" position="top" />
              </div>
              
              {/* Right 300x250 Ad */}
              <div>
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="right" />
              </div>
            </div>
          </div>
          
          {/* 728x90 Leaderboard Ad below top banner */}
          <AdBanner ads={sampleAds.leaderboard} type="leaderboard" position="below-top" />
          
          {/* Main Content Area with Side Ads */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <AdBanner ads={sampleAds.sidebar} type="sidebar" position="left" />
              {/* Left bottom 300x250 ad */}
              <div className="mt-4">
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-left" />
              </div>
            </div>
            <div className="mx-4">
              <RedirectForm />
            </div>
            <div className="flex flex-col items-center">
            <AdBanner ads={sampleAds.sidebar} type="sidebar" position="right" />
              {/* Right bottom 300x250 ad */}
              <div className="mt-4">
                <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-right" />
              </div>
            </div>
          </div>
          
          {/* 728x90 Leaderboard Ad above bottom banner */}
          <AdBanner ads={sampleAds.leaderboard} type="leaderboard" position="above-bottom" />
          
          {/* Bottom Banner Ad with 300x250 ads on sides */}
          <div className="flex justify-center items-center gap-4">
            {/* Left 300x250 Ad for bottom banner */}
            <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-banner-left" />
            
            {/* Bottom Banner Ad */}
            <AdBanner ads={sampleAds.banner} type="banner" position="bottom" />
            
            {/* Right 300x250 Ad for bottom banner */}
            <AdBanner ads={sampleAds.mediumRectangle} type="medium-rectangle" position="bottom-banner-right" />
          </div>
          
          {/* Sticky Footer Ad */}
          <AdBanner ads={sampleAds.stickyFooter} type="sticky-footer" position="bottom" />
        </div>
      ) : (
        /* RedirectForm without ads when hidden */
        <RedirectForm />
      )}
    </main>
  );
}
