import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 py-8" style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
      <div className="container">
        <div className="flex items-center justify-between" style={{
          flexDirection: window.innerWidth <= 640 ? 'column' : 'row',
          gap: '1rem'
        }}>
          <p className="text-muted" style={{fontSize: '0.875rem', margin: 0}}>
            © 2025 Smart Travel Planner.
          </p>
          <nav className="flex gap-4">
            <a 
              href="#/about" 
              className="text-muted"
              style={{
                fontSize: '0.875rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              About
            </a>
            <a 
              href="#/contact" 
              className="text-muted"
              style={{
                fontSize: '0.875rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
