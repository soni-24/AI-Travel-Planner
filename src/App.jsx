import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Planner from './pages/Planner'
import Destinations from './pages/Destinations'
import About from './pages/About'
import Contact from './pages/Contact'
import './index.css'

// Simple hash router: maps '#/planner' -> Planner etc.
const routes = {
  '/': <Home />,
  '/planner': <Planner />,
  '/destinations': <Destinations />,
  '/about': <About />,
  '/contact': <Contact />,
}

function App(){
  const [route, setRoute] = useState(window.location.hash.replace('#','') || '/')

  useEffect(()=>{
    const onHash = ()=> setRoute(window.location.hash.replace('#','') || '/')
    window.addEventListener('hashchange', onHash)
    return ()=> window.removeEventListener('hashchange', onHash)
  },[])

  return (
    <div className="app-root">
      <Header currentRoute={route} />
      <main>
        {routes[route] || <Home />}
      </main>
      <Footer />
    </div>
  )
}

export default App
