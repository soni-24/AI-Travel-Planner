import React from 'react'

export default function About(){
  return (
    <div className="container">
      <h1>About AI Travel Planner</h1>
      <p className="lead">How this AI-style planner works</p>

      <section className="about-grid">
        <div>
          <h3>Smart suggestions without APIs</h3>
          <p>Our planner uses a client-side algorithm to generate travel suggestions based on the information you provide. It mixes curated destination data and heuristics to create plausible, helpful itineraries, budget breakdowns and local tips — all without sending your data to external services.</p>
        </div>

        <div>
          <h3>What you’ll get</h3>
          <ul>
            <li>Daily itineraries (Day 1, Day 2 ...)</li>
            <li>Estimated budget allocation</li>
            <li>Top places to visit and where to eat</li>
            <li>Travel tips tailored to your travel type</li>
          </ul>
        </div>

        <div>
          <h3>Privacy-first</h3>
          <p>No network calls or external AI services are required. Everything runs in your browser so your inputs stay on your device.</p>
        </div>
      </section>
    </div>
  )
}
