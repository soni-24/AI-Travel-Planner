import React from 'react'

const items = [
  {id:'paris',title:'Paris, France',img:'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1000&q=60',desc:'From the Eiffel Tower to cozy boulangeries — timeless art and romance.'},
  {id:'bali',title:'Bali, Indonesia',img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=60',desc:'Beaches, rice terraces, and a relaxed island culture perfect for unwinding.'},
  {id:'tokyo',title:'Tokyo, Japan',img:'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1000&q=60',desc:'A dazzling mix of futuristic neighborhoods and serene shrines.'},
  {id:'newyork',title:'New York, USA',img:'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=60',desc:'Iconic skyline, diverse neighborhoods and endless cultural attractions.'},
  {id:'rome',title:'Rome, Italy',img:'https://images.unsplash.com/photo-1505765052266-5f7f5eb0d2c3?auto=format&fit=crop&w=1000&q=60',desc:'Ancient ruins, world-class cuisine and vibrant piazzas.'},
  {id:'capetown',title:'Cape Town, South Africa',img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=60',desc:'Stunning coastlines, wine regions and dramatic Table Mountain views.'}
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
