import React, {useState} from 'react'

export default function Header({currentRoute}){
  const [open,setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50" style={{
      background: 'rgba(15, 23, 36, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 0'
    }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <a href="#/" className="flex items-center gap-4" onClick={()=>setOpen(false)}>
            <img src="/images/logo.svg" alt="logo" style={{width: '36px', height: '36px'}} />
            <span style={{fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.125rem', color: 'white'}}>
              AI Travel Planner
            </span>
          </a>

          <nav className={open ? 'nav-mobile' : 'mobile-hidden'}>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
              gap: '0.5rem'
            }}>
              {[
                {href: '#/', label: 'Home', route: '/'},
                {href: '#/destinations', label: 'Destinations', route: '/destinations'},
                {href: '#/planner', label: 'Planner', route: '/planner'},
                {href: '#/about', label: 'About', route: '/about'},
                {href: '#/contact', label: 'Contact', route: '/contact'}
              ].map(item => (
                <li key={item.route}>
                  <a 
                    href={item.href} 
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      background: currentRoute === item.route 
                        ? 'linear-gradient(90deg, #7c3aed, #06b6d4)' 
                        : 'transparent',
                      color: currentRoute === item.route ? 'white' : '#94a3b8'
                    }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            onClick={()=>setOpen(o=>!o)}
            className="mobile-block"
            style={{
              background: 'transparent',
              border: 0,
              color: '#94a3b8',
              fontSize: '1.25rem',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
            aria-label="Open menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
