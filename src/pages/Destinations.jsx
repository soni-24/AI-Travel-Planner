import React from 'react'

const items = [
  {id:'goa',title:'Goa, India',img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=60',desc:'Beautiful beaches, vibrant nightlife, and Portuguese colonial architecture.'},
  {id:'rajasthan',title:'Rajasthan, India',img:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=60',desc:'Royal palaces, desert landscapes, and rich cultural heritage.'},
  {id:'kerala',title:'Kerala, India',img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=60',desc:'Backwaters, hill stations, and spice gardens in God\'s Own Country.'},
  {id:'agra',title:'Agra, India',img:'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=60',desc:'Home to the iconic Taj Mahal and Mughal architectural wonders.'},
  {id:'himachal',title:'Himachal Pradesh, India',img:'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1000&q=60',desc:'Snow-capped mountains, adventure sports, and hill station retreats.'},
  {id:'mumbai',title:'Mumbai, India',img:'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=60',desc:'Bollywood capital, bustling markets, and the Gateway of India.'},
  {id:'kashmir',title:'Kashmir, India',img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=60',desc:'Paradise on earth with pristine lakes, valleys, and snow-capped peaks.'},
  {id:'uttarakhand',title:'Uttarakhand, India',img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=60',desc:'Spiritual destinations, yoga retreats, and Himalayan adventures.'},
  {id:'andaman',title:'Andaman Islands, India',img:'https://images.unsplash.com/photo-1539650116574-75c0c6d73ad2?auto=format&fit=crop&w=1000&q=60',desc:'Pristine beaches, crystal clear waters, and tropical paradise vibes.'},
  {id:'ladakh',title:'Ladakh, India',img:'https://images.unsplash.com/photo-1506266331851-78dbc45a3e5c?auto=format&fit=crop&w=1000&q=60',desc:'High-altitude desert, Buddhist monasteries, and adventure motorcycling.'},
  {id:'bangalore',title:'Bangalore, India',img:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=60',desc:'Silicon Valley of India, pleasant climate, and vibrant pub culture.'},
  {id:'pondicherry',title:'Pondicherry, India',img:'https://images.unsplash.com/photo-1582652822066-ad229f844277?auto=format&fit=crop&w=1000&q=60',desc:'French colonial charm, spiritual ashrams, and serene beaches.'},
  {id:'darjeeling',title:'Darjeeling, India',img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=60',desc:'Tea gardens, toy train, and stunning views of Mount Kanchenjunga.'},
  {id:'varanasi',title:'Varanasi, India',img:'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=60',desc:'Spiritual capital, ancient ghats, and timeless cultural traditions.'},
  {id:'mysore',title:'Mysore, India',img:'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1000&q=60',desc:'Royal heritage, magnificent palaces, and traditional silk weaving.'}
]

export default function Destinations(){
  return (
    <div className="container">
      <h1>Discover Destinations</h1>
      <p className="lead">A curated grid of inspiring places to visit.</p>

      <div className="grid grid-3 dest-grid">
        {items.map(it=> (
          <article id={it.id} className="card" key={it.id}>
            <img src={it.img} alt={it.title} />
            <div className="card-body">
              <h4>{it.title}</h4>
              <p>{it.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
