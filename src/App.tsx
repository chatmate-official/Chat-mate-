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
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <FeaturesSection />

      {/* 3 Step Guide */}
      <HowItWorks />

      {/* Safety & Privacy */}
      <SafetySection />

      {/* Reviews & FAQ */}
      <TestimonialsAndFaq />

      {/* Final Call To Action */}
      <CtaBanner />

      {/* Footer */}
      <Footer />

    </div>
  );
}
