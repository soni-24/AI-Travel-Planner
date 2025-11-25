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
              Smart Travel Planner
            </h1>
            <p className="text-muted mb-8" style={{fontSize: '1.125rem'}}>
              Intelligent travel ideas tailored to your budget and style.
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
              <p className="text-muted">Top places to visit, eating spots and travel tips curated by our travel experts.</p>
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
          <a className="card" href="#/destinations#goa" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=60" 
                alt="Goa"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Goa, India</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Golden beaches, vibrant nightlife, and Portuguese heritage.
              </p>
            </div>
          </a>
          
          <a className="card" href="#/destinations#kerala" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=60" 
                alt="Kerala"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Kerala, India</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Serene backwaters, lush greenery, and Ayurvedic retreats.
              </p>
            </div>
          </a>
          
          <a className="card" href="#/destinations#rajasthan" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=60" 
                alt="Rajasthan"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Rajasthan, India</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Royal palaces, desert safaris, and rich cultural heritage.
              </p>
            </div>
          </a>

          <a className="card" href="#/destinations#himachal" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=60" 
                alt="Himachal Pradesh"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Himachal Pradesh, India</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Snow-capped mountains, adventure sports, and hill stations.
              </p>
            </div>
          </a>

          <a className="card" href="#/destinations#uttarakhand" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=60" 
                alt="Uttarakhand"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Uttarakhand, India</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Sacred temples, yoga retreats, and breathtaking Himalayan views.
              </p>
            </div>
          </a>

          <a className="card" href="#/destinations#mumbai" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=60" 
                alt="Mumbai"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>Mumbai, India</h4>
              <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                Bollywood hub, bustling markets, and the Gateway of India.
              </p>
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}
