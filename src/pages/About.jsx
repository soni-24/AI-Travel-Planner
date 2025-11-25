import React from 'react'

export default function About(){
  return (
    <div className="container">
      <h1>About Smart Travel Planner</h1>
      <p className="lead">Your smart companion for planning unforgettable journeys</p>

      <section className="about-grid">
        <div>
          <h3> Smart Suggestions</h3>
          <p>Our planner uses advanced algorithms to generate personalized travel suggestions based on your preferences. It combines curated destination data, local insights, and travel heuristics to create plausible, helpful itineraries and local tips.</p>
        </div>

        <div>
          <h3>✨ What you'll get</h3>
          <ul>
            <li>Daily itineraries (Day 1, Day 2 ...)</li>
            <li>Estimated budget allocation</li>
            <li>Top places to visit and where to eat</li>
            <li>Travel tips tailored to your travel type</li>
            <li>Hidden gems and local recommendations</li>
          </ul>
        </div>

        <div>
          <h3>🔒 Privacy-first</h3>
          <p>Everything runs securely in your browser. Your travel preferences and personal data never leave your device, ensuring maximum privacy and security.</p>
        </div>
      </section>

      <section className="about-features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h4>Global Coverage</h4>
            <p>Access travel guides and recommendations for 200+ destinations worldwide, from exotic beaches to mountain retreats.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h4>Budget Smart</h4>
            <p>Get detailed budget breakdowns for accommodations, food, activities, and transportation tailored to your budget.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Instant Planning</h4>
            <p>Generate complete travel itineraries in seconds. No waiting, no complexity — just your perfect trip plan.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h4>Personalized</h4>
            <p>Whether you're a budget backpacker, luxury traveler, or adventure seeker, we customize plans for your style.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h4>Easy to Use</h4>
            <p>Simple, intuitive interface. Just enter your destination, budget, and travel dates to get started.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h4>Real-time Updates</h4>
            <p>Weather forecasts, currency converters, and local events integrated to keep your plans current.</p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>We believe travel should be accessible, affordable, and stress-free for everyone. Our mission is to empower travelers with intelligent planning tools that help them explore the world confidently, discover hidden gems, and create unforgettable memories without breaking the bank.</p>
        
        <div className="mission-stats">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Happy Travelers</p>
          </div>
          <div className="stat-item">
            <h3>200+</h3>
            <p>Destinations</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Private & Secure</p>
          </div>
          <div className="stat-item">
            <h3>0ms</h3>
            <p>Processing Time</p>
          </div>
        </div>
      </section>

      <section className="about-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h4>How accurate are the travel recommendations?</h4>
            <p>Our recommendations are based on real traveler data, destination characteristics, and your specific requirements. They're designed to give you great starting points for your journey planning.</p>
          </div>

          <div className="faq-item">
            <h4>Can I customize the itinerary?</h4>
            <p>Absolutely! Use our planner to generate an initial itinerary, then modify it according to your preferences and interests.</p>
          </div>

          <div className="faq-item">
            <h4>Is my data safe?</h4>
            <p>Yes! All processing happens locally in your browser. We don't store, track, or share any of your personal information.</p>
          </div>

          <div className="faq-item">
            <h4>Do I need to create an account?</h4>
            <p>No account needed! Start planning your trip immediately without any registration or sign-up process.</p>
          </div>

          <div className="faq-item">
            <h4>Can I save my travel plans?</h4>
            <p>Yes! You can screenshot or download your itinerary directly from your browser for future reference.</p>
          </div>

          <div className="faq-item">
            <h4>What if I need help?</h4>
            <p>Contact us anytime through our Contact page. We're here to help make your travel planning experience amazing!</p>
          </div>
        </div>
      </section>
    </div>
  )
}
