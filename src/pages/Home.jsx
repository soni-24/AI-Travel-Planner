import React from 'react'

export default function Home(){
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        minHeight: '60vh',
        backgroundImage: "linear-gradient(180deg, rgba(7,25,38,0.4), rgba(7,25,38,0.6)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div className="container relative" style={{zIndex: 10}}>
          <div className="text-center py-16" style={{maxWidth: '64rem', margin: '0 auto'}}>
            <h1 className="mb-4" style={{fontFamily: 'Poppins', fontWeight: 'bold'}}>
              AI Travel Planner
            </h1>
            <p className="text-muted mb-8" style={{fontSize: '1.125rem'}}>
              Smart, friendly travel ideas tailored to your budget and style.
            </p>
            <a href="#/planner" className="btn btn-primary" style={{fontSize: '1rem', padding: '0.75rem 2rem'}}>
              Start Planning
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="grid grid-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="mb-4" style={{color: '#7c3aed'}}>Personalized Itineraries</h3>
              <p className="text-muted">Get day-by-day plans tailored to your travel type and length of stay.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="mb-4" style={{color: '#06b6d4'}}>Budget Breakdown</h3>
              <p className="text-muted">Clear estimates for accommodation, food, transport and activities.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="mb-4" style={{color: '#7c3aed'}}>Local Recommendations</h3>
              <p className="text-muted">Top places to visit, eating spots and travel tips curated by our AI-simulator.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container py-16">
        <h2 className="text-center mb-8" style={{fontFamily: 'Poppins', fontWeight: 'bold'}}>
          Popular Destinations
        </h2>
        <div className="grid grid-3">
          <a className="card" href="#/destinations#paris" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60" 
                alt="Paris"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Paris, France</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Romantic streets, iconic museums and unforgettable cuisine.
              </p>
            </div>
          </a>
          
          <a className="card" href="#/destinations#bali" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60" 
                alt="Bali"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Bali, Indonesia</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Tropical beaches, rice terraces and vibrant culture.
              </p>
            </div>
          </a>
          
          <a className="card" href="#/destinations#tokyo" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=60" 
                alt="Tokyo"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Tokyo, Japan</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Futuristic cityscapes, amazing food, and historic temples.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="card rounded-2xl" style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.1))',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h3 className="mb-4" style={{fontSize: '1.5rem', fontWeight: '600'}}>
            Ready to craft your next trip?
          </h3>
          <a href="#/planner" className="btn btn-ghost" style={{fontSize: '1rem', padding: '0.75rem 2rem'}}>
            Open Planner
          </a>
        </div>
      </section>
    </div>
  )
}
