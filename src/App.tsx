import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { SafetySection } from './components/SafetySection';
import { TestimonialsAndFaq } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { LaunchAppModal } from './components/LaunchAppModal';

export default function App() {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [customApkUrl, setCustomApkUrl] = useState('/ChatMate.apk');

  const handleInstallApp = () => {
    const downloadUrl = customApkUrl || '/ChatMate.apk';
    
    // Direct file download from public/ChatMate.apk
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'ChatMate.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowInstallModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar onInstallApp={handleInstallApp} />

      {/* Hero Section */}
      <HeroSection onInstallApp={handleInstallApp} />

      {/* Features Grid */}
      <FeaturesSection />

      {/* 3 Step Guide */}
      <HowItWorks onLaunchApp={handleInstallApp} />

      {/* Safety & Privacy */}
      <SafetySection />

      {/* Reviews & FAQ */}
      <TestimonialsAndFaq />

      {/* Final Call To Action */}
      <CtaBanner onInstallApp={handleInstallApp} />

      {/* Footer */}
      <Footer />

      {/* Install App Modal */}
      {showInstallModal && (
        <LaunchAppModal
          onClose={() => setShowInstallModal(false)}
          customApkUrl={customApkUrl}
          setCustomApkUrl={setCustomApkUrl}
        />
      )}

    </div>
  );
}
