import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { SafetySection } from './components/SafetySection';
import { TestimonialsAndFaq } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';

export default function App() {
  // New Hugging Face direct APK download link provided by the user (app-release.apk)
  const HUGGINGFACE_NEW_APK_URL = 'https://huggingface.co/chatmateofficial/chatmateapp/resolve/main/app-release.apk?download=true';

  const handleInstallApp = () => {
    // 1-Click Direct Download Trigger
    const link = document.createElement('a');
    link.href = HUGGINGFACE_NEW_APK_URL;
    link.setAttribute('download', 'app-release.apk');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

    </div>
  );
}
