import React, { useState } from 'react'

const destinationsData = [
  {
    id:'goa',
    title:'Goa',
    img:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=60',
    desc:'Beautiful beaches, vibrant nightlife, and Portuguese colonial architecture.',
    fullDesc: 'Beautiful beaches, vibrant nightlife, and Portuguese colonial architecture.',
    attractions: 'Baga Beach, Calangute Beach, Basilica of Bom Jesus, Fort Aguada',
    bestTime: 'November to February',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    climate: 'tropical climate with hot summers and pleasant winters'
  },
  {
    id:'kerala',
    title:'Kerala',
    img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=60',
    desc:'Serene backwaters, lush greenery, and Ayurvedic retreats.',
    fullDesc: 'Kerala, known as "God\'s Own Country," is a tropical paradise on India\'s southwestern coast. Famous for its backwaters, hill stations, Ayurvedic treatments, and spice plantations. The state offers unique experiences from houseboat cruises in Alleppey to tea garden visits in Munnar, making it a perfect destination for nature lovers and wellness seekers.',
    attractions: 'Alleppey Backwaters, Munnar Hill Station, Kochi Fort, and Periyar Wildlife Sanctuary',
    bestTime: 'September to March',
    coordinates: { lat: 10.8505, lng: 76.2711 },
    climate: 'tropical climate with monsoons and pleasant winters'
  },
  {
    id:'rajasthan',
    title:'Rajasthan',
    img:'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=60',
    desc:'Royal palaces, desert safaris, and rich cultural heritage.',
    fullDesc: 'Rajasthan, the "Land of Kings," is India\'s largest state by area. Famous for its magnificent palaces, imposing forts, vibrant culture, and the vast Thar Desert. The state showcases royal heritage through its architecture, folk music, dance, and colorful festivals. Cities like Jaipur, Udaipur, and Jodhpur offer glimpses into India\'s royal past.',
    attractions: 'City Palace Udaipur, Hawa Mahal Jaipur, Mehrangarh Fort Jodhpur, and Jaisalmer Fort',
    bestTime: 'October to March',
    coordinates: { lat: 27.0238, lng: 74.2179 },
    climate: 'arid climate with hot summers and cool winters'
  },
  {
    id:'himachal',
    title:'Himachal Pradesh',
    img:'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=60',
    desc:'Snow-capped mountains, adventure sports, and hill stations.',
    fullDesc: 'Himachal Pradesh, nestled in the Himalayas, is known for its scenic beauty, snow-capped mountains, and adventure activities. The state offers excellent opportunities for trekking, skiing, paragliding, and mountaineering. Popular destinations like Shimla, Manali, and Dharamshala provide relief from heat and showcase beautiful landscapes.',
    attractions: 'Shimla, Manali, Dharamshala, and Kasol',
    bestTime: 'March to June, October to February',
    coordinates: { lat: 31.1048, lng: 77.1734 },
    climate: 'temperate climate with cold winters and pleasant summers'
  }
]

export default function Home(){
  const [selectedDestination, setSelectedDestination] = useState(null)

  const openModal = (destination) => {
    setSelectedDestination(destination)
  }

  const closeModal = () => {
    setSelectedDestination(null)
  }

  const openGoogleMaps = () => {
    if (selectedDestination) {
      const url = `https://www.google.com/maps/search/?api=1&query=${selectedDestination.coordinates.lat},${selectedDestination.coordinates.lng}&query_place_id=${encodeURIComponent(selectedDestination.title)}`
      window.open(url, '_blank')
    }
  }
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
              <p className="text-muted" style={{margin: 0}}>Get day-by-day plans tailored to your travel type and length of stay.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="mb-4" style={{color: '#06b6d4'}}>Budget Breakdown</h3>
              <p className="text-muted" style={{margin: 0}}>Clear estimates for accommodation, food, transport and activities.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <h3 className="mb-4" style={{color: '#7c3aed'}}>Local Recommendations</h3>
              <p className="text-muted" style={{margin: 0}}>Top places to visit, eating spots and travel tips curated by our travel experts.</p>
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
          {destinationsData.map((destination) => (
            <div 
              key={destination.id}
              className="card" 
              onClick={() => openModal(destination)}
              style={{cursor: 'pointer'}}
            >
              <div className="aspect-video">
                <img 
                  src={destination.img} 
                  alt={destination.title}
                />
              </div>
              <div className="card-body">
                <h4 className="mb-2" style={{fontWeight: '600', fontSize: '1.125rem'}}>{destination.title}</h4>
                <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
                  {destination.desc.split('.')[0]}.
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedDestination && (
          <div className="destination-modal-overlay" onClick={closeModal}>
            <div className="destination-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              <div className="modal-header">
                <img src={selectedDestination.img} alt={selectedDestination.title} className="modal-image" />
                <div className="modal-title-section">
                  <h2>{selectedDestination.title}</h2>
                  <p className="modal-short-desc">{selectedDestination.desc}</p>
                </div>
              </div>
              <div className="modal-content">
                <p className="destination-summary">
                  {selectedDestination.fullDesc} Some of the most popular places to visit here include {selectedDestination.attractions}. The best time to visit {selectedDestination.title} is during {selectedDestination.bestTime} when you can enjoy {selectedDestination.climate}.
                </p>
                <div className="modal-actions">
                  <button className="btn-location" onClick={openGoogleMaps}>
                    📍 View Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
