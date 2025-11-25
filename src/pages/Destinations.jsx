import React, { useState } from 'react'

const items = [
  {
    id:'goa',
    title:'Goa',
    img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Beautiful beaches, vibrant nightlife, and Portuguese colonial architecture.',
    fullDesc: 'Goa, India\'s smallest state, is located on the western coast along the Arabian Sea. Known for its pristine beaches, vibrant nightlife, and unique blend of Indian and Portuguese cultures. The state offers golden sandy beaches, historic churches, spice plantations, and a laid-back atmosphere that attracts visitors from around the world.',
    attractions: ['Baga Beach', 'Calangute Beach', 'Basilica of Bom Jesus', 'Fort Aguada', 'Anjuna Beach', 'Dudhsagar Waterfalls'],
    bestTime: 'November to February',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    climate: 'Tropical climate with hot summers and pleasant winters'
  },
  {
    id:'rajasthan',
    title:'Rajasthan',
    img:'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Royal palaces, desert landscapes, and rich cultural heritage.',
    fullDesc: 'Rajasthan, the "Land of Kings," is India\'s largest state by area. Famous for its magnificent palaces, imposing forts, vibrant culture, and the vast Thar Desert. The state showcases royal heritage through its architecture, folk music, dance, and colorful festivals. Cities like Jaipur, Udaipur, and Jodhpur offer glimpses into India\'s royal past.',
    attractions: ['City Palace Udaipur', 'Hawa Mahal Jaipur', 'Mehrangarh Fort Jodhpur', 'Jaisalmer Fort', 'Lake Pichola', 'Amber Palace'],
    bestTime: 'October to March',
    coordinates: { lat: 27.0238, lng: 74.2179 },
    climate: 'Arid climate with hot summers and cool winters'
  },
  {
    id:'kerala',
    title:'Kerala',
    img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Backwaters, hill stations, and spice gardens in God\'s Own Country.',
    fullDesc: 'Kerala, known as "God\'s Own Country," is a tropical paradise on India\'s southwestern coast. Famous for its backwaters, hill stations, Ayurvedic treatments, and spice plantations. The state offers unique experiences from houseboat cruises in Alleppey to tea garden visits in Munnar, making it a perfect destination for nature lovers and wellness seekers.',
    attractions: ['Alleppey Backwaters', 'Munnar Hill Station', 'Kochi Fort', 'Periyar Wildlife Sanctuary', 'Wayanad', 'Thekkady'],
    bestTime: 'September to March',
    coordinates: { lat: 10.8505, lng: 76.2711 },
    climate: 'Tropical climate with monsoons and pleasant winters'
  },
  {
    id:'agra',
    title:'Agra',
    img:'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Home to the iconic Taj Mahal and Mughal architectural wonders.',
    fullDesc: 'Agra, located on the banks of Yamuna river, is home to the world-famous Taj Mahal, one of the Seven Wonders of the World. The city was the capital of the Mughal Empire and showcases the finest examples of Mughal architecture. Besides the Taj Mahal, Agra Fort and Fatehpur Sikri are UNESCO World Heritage sites that attract millions of visitors.',
    attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Itmad-ud-Daulah Tomb', 'Mehtab Bagh', 'Jama Masjid'],
    bestTime: 'October to March',
    coordinates: { lat: 27.1767, lng: 78.0081 },
    climate: 'Semi-arid climate with hot summers and cool winters'
  },
  {
    id:'himachal',
    title:'Himachal Pradesh',
    img:'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Snow-capped mountains, adventure sports, and hill station retreats.',
    fullDesc: 'Himachal Pradesh, nestled in the Himalayas, is known for its scenic beauty, snow-capped mountains, and adventure activities. The state offers excellent opportunities for trekking, skiing, paragliding, and mountaineering. Popular destinations like Shimla, Manali, and Dharamshala provide relief from heat and showcase beautiful landscapes.',
    attractions: ['Shimla', 'Manali', 'Dharamshala', 'Kasol', 'Spiti Valley', 'Rohtang Pass'],
    bestTime: 'March to June, October to February',
    coordinates: { lat: 31.1048, lng: 77.1734 },
    climate: 'Temperate climate with cold winters and pleasant summers'
  },
  {
    id:'mumbai',
    title:'Mumbai',
    img:'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Bollywood capital, bustling markets, and the Gateway of India.',
    fullDesc: 'Mumbai, the financial capital of India, is a cosmopolitan metropolis that never sleeps. Known as the entertainment capital and home to Bollywood, the city offers a unique blend of colonial architecture, modern skyscrapers, street food, and vibrant culture. From the iconic Gateway of India to the bustling markets, Mumbai represents the spirit of modern India.',
    attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Chhatrapati Shivaji Terminus', 'Bollywood Studios', 'Crawford Market'],
    bestTime: 'November to February',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    climate: 'Tropical climate with distinct wet and dry seasons'
  },
  {
    id:'kashmir',
    title:'Kashmir',
    img:'https://images.unsplash.com/photo-1604935867839-e8e6f8c9a0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Paradise on earth with pristine lakes, valleys, and snow-capped peaks.',
    fullDesc: 'Kashmir, often called "Paradise on Earth," is renowned for its breathtaking natural beauty. The Kashmir Valley features pristine lakes, snow-capped mountains, Mughal gardens, and houseboats on Dal Lake. The region offers spectacular landscapes, from the meadows of Gulmarg to the valleys of Pahalgam, making it a favorite destination for nature lovers and peace seekers.',
    attractions: ['Dal Lake', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Srinagar Gardens', 'Amarnath Cave'],
    bestTime: 'March to October',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    climate: 'Temperate climate with mild summers and cold winters'
  },
  {
    id:'uttarakhand',
    title:'Uttarakhand',
    img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Spiritual destinations, yoga retreats, and Himalayan adventures.',
    fullDesc: 'Uttarakhand, known as "Land of the Gods," is famous for its spiritual significance, yoga ashrams, and Himalayan adventures. Home to the sacred cities of Rishikesh and Haridwar, the state attracts pilgrims and spiritual seekers. The region also offers excellent trekking opportunities, including routes to Valley of Flowers and Char Dham temples.',
    attractions: ['Rishikesh', 'Haridwar', 'Nainital', 'Mussoorie', 'Valley of Flowers', 'Kedarnath'],
    bestTime: 'March to June, September to November',
    coordinates: { lat: 30.0668, lng: 79.0193 },
    climate: 'Varies from subtropical to alpine based on altitude'
  },
  {
    id:'andaman',
    title:'Andaman Islands',
    img:'https://images.unsplash.com/photo-1583237804738-f5d60a5b4b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Pristine beaches, crystal clear waters, and tropical paradise vibes.',
    fullDesc: 'The Andaman and Nicobar Islands are a group of tropical islands in the Bay of Bengal, known for pristine beaches, crystal-clear waters, and rich marine life. The islands offer excellent opportunities for water sports, scuba diving, and snorkeling. With their unspoiled beaches and coral reefs, they provide a perfect tropical getaway.',
    attractions: ['Radhanagar Beach', 'Cellular Jail', 'Ross Island', 'Havelock Island', 'Neil Island', 'Baratang Island'],
    bestTime: 'October to May',
    coordinates: { lat: 11.7401, lng: 92.6586 },
    climate: 'Tropical climate with high humidity year-round'
  },
  {
    id:'ladakh',
    title:'Ladakh',
    img:'https://images.unsplash.com/photo-1589308078059-be1415eab4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'High-altitude desert, Buddhist monasteries, and adventure motorcycling.',
    fullDesc: 'Ladakh, the "Land of High Passes," is known for its rugged landscapes, Buddhist culture, and adventure tourism. Located in the high-altitude desert, the region offers dramatic scenery with barren mountains, pristine lakes like Pangong Tso, and ancient Buddhist monasteries. It\'s a popular destination for adventure enthusiasts and spiritual seekers.',
    attractions: ['Leh Palace', 'Pangong Lake', 'Nubra Valley', 'Khardung La Pass', 'Hemis Monastery', 'Magnetic Hill'],
    bestTime: 'May to September',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    climate: 'High-altitude desert climate with extreme temperature variations'
  },
  {
    id:'bangalore',
    title:'Bangalore',
    img:'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Silicon Valley of India, pleasant climate, and vibrant pub culture.',
    fullDesc: 'Bangalore, known as the "Silicon Valley of India," is the technology capital with a pleasant climate year-round. The city combines modern IT infrastructure with beautiful parks, colonial architecture, and vibrant nightlife. Known for its gardens, the city offers a perfect blend of traditional and contemporary culture.',
    attractions: ['Bangalore Palace', 'Lalbagh Botanical Garden', 'Cubbon Park', 'ISKCON Temple', 'Commercial Street', 'UB City Mall'],
    bestTime: 'October to February',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    climate: 'Pleasant moderate climate throughout the year'
  },
  {
    id:'pondicherry',
    title:'Pondicherry',
    img:'https://images.unsplash.com/photo-1582736722047-a90dc9cd1c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'French colonial charm, spiritual ashrams, and serene beaches.',
    fullDesc: 'Pondicherry, a former French colony, retains its European charm with French architecture, cuisine, and culture. The city is known for the Sri Aurobindo Ashram and the experimental township of Auroville. With its tree-lined streets, colorful buildings, and serene beaches, Pondicherry offers a unique blend of Indian and French cultures.',
    attractions: ['French Quarter', 'Auroville', 'Paradise Beach', 'Sri Aurobindo Ashram', 'Promenade Beach', 'Chunnambar Boat House'],
    bestTime: 'October to March',
    coordinates: { lat: 11.9416, lng: 79.8083 },
    climate: 'Tropical climate with sea breezes moderating temperature'
  },
  {
    id:'darjeeling',
    title:'Darjeeling',
    img:'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Tea gardens, toy train, and stunning views of Mount Kanchenjunga.',
    fullDesc: 'Darjeeling, located in the foothills of the Himalayas, is famous for its tea gardens, toy train, and spectacular views of Mount Kanchenjunga. The hill station offers a cool climate, colonial architecture, and rich cultural heritage. The UNESCO World Heritage Darjeeling Himalayan Railway adds to its charm.',
    attractions: ['Tiger Hill', 'Darjeeling Himalayan Railway', 'Tea Gardens', 'Batasia Loop', 'Peace Pagoda', 'Himalayan Mountaineering Institute'],
    bestTime: 'April to June, September to November',
    coordinates: { lat: 27.0410, lng: 88.2663 },
    climate: 'Subtropical highland climate with cool temperatures'
  },
  {
    id:'varanasi',
    title:'Varanasi',
    img:'https://images.unsplash.com/photo-1632484119135-555ca0a37d9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Spiritual capital, ancient ghats, and timeless cultural traditions.',
    fullDesc: 'Varanasi, one of the world\'s oldest continuously inhabited cities, is the spiritual capital of India. Located on the banks of the sacred Ganges River, the city is famous for its ghats, temples, and spiritual significance. Pilgrims from around the world come here to experience the ancient rituals and cultural traditions that have continued for millennia.',
    attractions: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Sarnath', 'Assi Ghat', 'Ramnagar Fort', 'Banaras Hindu University'],
    bestTime: 'October to March',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    climate: 'Subtropical climate with hot summers and pleasant winters'
  },
  {
    id:'mysore',
    title:'Mysore',
    img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    desc:'Royal heritage, magnificent palaces, and traditional silk weaving.',
    fullDesc: 'Mysore, the former capital of the Kingdom of Mysore, is known for its royal heritage, magnificent palaces, and cultural significance. The city is famous for Mysore Palace, silk sarees, sandalwood products, and the grand Dasara festival. With its rich history and architectural marvels, Mysore represents the royal grandeur of South India.',
    attractions: ['Mysore Palace', 'Chamundi Hills', 'St. Philomena\'s Cathedral', 'Brindavan Gardens', 'Mysore Zoo', 'Karanji Lake'],
    bestTime: 'October to February',
    coordinates: { lat: 12.2958, lng: 76.6394 },
    climate: 'Tropical savanna climate with pleasant weather'
  }
]

export default function Destinations(){
  const [selectedDestination, setSelectedDestination] = useState(null)

  const openModal = (destination) => {
    setSelectedDestination(destination)
  }

  const closeModal = () => {
    setSelectedDestination(null)
  }

  const openGoogleMaps = (coordinates, title) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}&query_place_id=${encodeURIComponent(title)}`
    window.open(url, '_blank')
  }

  return (
    <div className="container">
      <h1>Discover Destinations</h1>
      <p className="lead">A curated grid of inspiring places to visit.</p>

      <div className="grid grid-3 dest-grid">
        {items.map(item => (
          <article 
            id={item.id} 
            className="card destination-card" 
            key={item.id}
            onClick={() => openModal(item)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.img} alt={item.title} />
            <div className="card-body">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Modal for Destination Details */}
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
              <div className="modal-section">
                <p className="destination-summary">
                  {selectedDestination.desc} Some of the most popular places to visit here include {selectedDestination.attractions.slice(0, 4).join(', ')}. 
                  The best time to visit {selectedDestination.title} is during {selectedDestination.bestTime} when you can enjoy {selectedDestination.climate.toLowerCase()}.
                </p>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-location" 
                  onClick={() => openGoogleMaps(selectedDestination.coordinates, selectedDestination.title)}
                >
                  📍 View Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
