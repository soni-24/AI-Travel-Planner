import React, {useState} from 'react'

// API base URL
const API_BASE_URL = 'http://localhost:3000'

export default function Planner(){
  const [start,setStart] = useState('')
  const [destination,setDestination] = useState('')
  const [budget,setBudget] = useState('')
  const [days,setDays] = useState('')
  const [type,setType] = useState('Adventure')
  const [plan,setPlan] = useState(null)
  const [status,setStatus] = useState('')
  const [loading,setLoading] = useState(false)
  const [startSuggestions, setStartSuggestions] = useState([])
  const [destSuggestions, setDestSuggestions] = useState([])
  const [showStartSuggestions, setShowStartSuggestions] = useState(false)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)

  // Close suggestions when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowStartSuggestions(false)
      setShowDestSuggestions(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Popular Indian destinations for autocomplete
  const popularPlaces = [
    'Mumbai, Maharashtra', 'Delhi, India', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
    'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan', 'Surat, Gujarat', 'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra', 'Visakhapatnam, Andhra Pradesh', 'Bhopal, Madhya Pradesh',
    'Patna, Bihar', 'Ludhiana, Punjab', 'Agra, Uttar Pradesh', 'Nashik, Maharashtra',
    'Vadodara, Gujarat', 'Goa, India', 'Kerala, India', 'Rajasthan, India', 'Himachal Pradesh, India',
    'Uttarakhand, India', 'Kashmir, India', 'Gulmarg, Kashmir', 'Manali, Himachal Pradesh',
    'Shimla, Himachal Pradesh', 'Darjeeling, West Bengal', 'Ooty, Tamil Nadu', 'Kodaikanal, Tamil Nadu',
    'Munnar, Kerala', 'Alleppey, Kerala', 'Kochi, Kerala', 'Thiruvananthapuram, Kerala',
    'Mysore, Karnataka', 'Hampi, Karnataka', 'Coorg, Karnataka', 'Rishikesh, Uttarakhand',
    'Haridwar, Uttarakhand', 'Dehradun, Uttarakhand', 'Mussoorie, Uttarakhand', 'Nainital, Uttarakhand',
    'Mount Abu, Rajasthan', 'Udaipur, Rajasthan', 'Jodhpur, Rajasthan', 'Pushkar, Rajasthan',
    'Ranthambore, Rajasthan', 'Ajmer, Rajasthan', 'Bikaner, Rajasthan', 'Jaisalmer, Rajasthan'
  ]

  // Handle location input and suggestions
  const handleLocationInput = (value, isStart = true) => {
    if (isStart) {
      setStart(value)
      if (value.length > 0) {
        const filtered = popularPlaces.filter(place => 
          place.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5)
        setStartSuggestions(filtered)
        setShowStartSuggestions(true)
      } else {
        setShowStartSuggestions(false)
      }
    } else {
      setDestination(value)
      if (value.length > 0) {
        const filtered = popularPlaces.filter(place => 
          place.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5)
        setDestSuggestions(filtered)
        setShowDestSuggestions(true)
      } else {
        setShowDestSuggestions(false)
      }
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion, isStart = true) => {
    if (isStart) {
      setStart(suggestion)
      setShowStartSuggestions(false)
    } else {
      setDestination(suggestion)
      setShowDestSuggestions(false)
    }
  }

  // Function to call API for travel plan
  async function fetchTravelPlan(planData) {
    try {
      const response = await fetch(`${API_BASE_URL}/travel-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching travel plan:', error);
      throw error;
    }
  }

  // Handle opening location in maps
  const openLocation = (locationName) => {
    const encodedLocation = encodeURIComponent(locationName);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(url, '_blank');
  };

  function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1) }
  function escapeHtml(s){ if(!s && s!==0) return ''; return String(s).replace(/[&<>\"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  async function onSubmit(e){
    e.preventDefault()
    if(!start || !destination || !budget || !days){ 
      setStatus('Please complete the form fields.'); 
      return 
    }

    setLoading(true)
    setStatus('Generating your travel plan...')
    setPlan(null)

    try {
      const planData = {
        start,
        destination,
        days: parseInt(days, 10),
        budget: Number(budget),
        type
      };

      const apiPlan = await fetchTravelPlan(planData);
      
      if (apiPlan.error) {
        setStatus('Error generating plan. Please try again.');
        console.error('API Error:', apiPlan);
      } else {
        setPlan(apiPlan);
        setStatus('');
      }
    } catch (error) {
      setStatus('Failed to connect to server. Please check if server is running.');
      console.error('Network Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="planner-container">
      <div className="planner-header">
        <h1 className="planner-title">Smart Travel Planner</h1>
        <p className="planner-subtitle">Tell us a few details and get a personalized trip plan instantly with real-time suggestions.</p>
      </div>

      <div className="form-container" style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '16px',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <form onSubmit={onSubmit}>
          <div className="form-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div className="input-group" style={{position: 'relative', zIndex: showStartSuggestions ? 1001 : 'auto'}}>
              <label>Starting Location</label>
              <input 
                value={start} 
                onChange={e=>handleLocationInput(e.target.value, true)} 
                onFocus={() => start.length > 0 && setShowStartSuggestions(true)}
                onClick={(e) => e.stopPropagation()}
                type="text" 
                placeholder="e.g., Your current city" 
                required 
                style={{
                  position: 'relative',
                  zIndex: 1
                }}
              />
              {showStartSuggestions && startSuggestions.length > 0 && (
                <div className="suggestions-dropdown" style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1002,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}>
                  {startSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion, true);
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom: index < startSuggestions.length - 1 ? '1px solid #475569' : 'none',
                        transition: 'all 0.2s ease',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        userSelect: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#334155';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      📍 {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="input-group" style={{position: 'relative', zIndex: showDestSuggestions ? 1001 : 'auto'}}>
              <label>Destination</label>
              <input 
                value={destination} 
                onChange={e=>handleLocationInput(e.target.value, false)} 
                onFocus={() => destination.length > 0 && setShowDestSuggestions(true)}
                onClick={(e) => e.stopPropagation()}
                type="text" 
                placeholder="e.g., Your dream destination" 
                required 
                style={{
                  position: 'relative',
                  zIndex: 1
                }}
              />
              {showDestSuggestions && destSuggestions.length > 0 && (
                <div className="suggestions-dropdown" style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1002,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}>
                  {destSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion, false);
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom: index < destSuggestions.length - 1 ? '1px solid #475569' : 'none',
                        transition: 'all 0.2s ease',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        userSelect: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#334155';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      🎯 {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="input-group">
              <label>Budget (₹)</label>
              <input 
                value={budget} 
                onChange={e=>setBudget(e.target.value)} 
                type="number" 
                min="1" 
                placeholder="Enter your budget in ₹" 
                required 
              />
            </div>
            
            <div className="input-group">
              <label>Number of Days</label>
              <input 
                value={days} 
                onChange={e=>setDays(e.target.value)} 
                type="number" 
                min="1" 
                max="30" 
                required 
              />
            </div>
            
            <div className="input-group">
              <label>Travel Type</label>
              <select value={type} onChange={e=>setType(e.target.value)}>
                <option value="Adventure">🎒 Adventure Travel</option>
                <option value="Family">👨‍👩‍👧‍👦 Family Trip</option>
                <option value="Solo">🚶‍♂️ Solo Journey</option>
                <option value="Luxury">💎 Luxury Experience</option>
                <option value="Budget"> Budget Travel</option>
              </select>
            </div> 
          </div>
          
          <div className="button-group">
            <button 
              type="submit" 
              className="generate-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading"></span>
                  Generating Plan...
                </>
              ) : (
                'Generate Travel Plan'
              )}
            </button>
            <button 
              type="button" 
              className="reset-btn"
              onClick={()=>{setStart('');setDestination('');setBudget('');setDays(3);setType('Adventure');setPlan(null);setStatus('')}}
              disabled={loading}
            >
              Reset
            </button>
          </div>
          
          {status && (
            <div className="status-message" style={{marginTop: '20px', textAlign: 'center'}}>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>{status}</p>
            </div>
          )}
        </form>
      </div>

      <section className="results">
        {!plan && !loading && (
          <div className="result-section">
            <h3 className="result-title">Your travel plan will appear here</h3>
            <p className="result-description">Fill the form and click <strong>Generate Travel Plan</strong> to see personalized suggestions.</p>
          </div>
        )}

        {loading && (
          <div className="result-section">
            <div className="loading-spinner" style={{fontSize: '3rem', marginBottom: '1rem'}}>�</div>
            <h3 className="result-title">Creating your travel plan...</h3>
            <p className="result-description">Please wait while we generate personalized recommendations for your trip.</p>
          </div>
        )}

        {plan && !plan.error && (
            <div className="plan-results">
              <div className="plan-header" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <h2 style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  🌟 {escapeHtml(plan.start)} → {escapeHtml(plan.destination)}
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1.1rem',
                  margin: 0
                }}>
                  {plan.days} days • {plan.type} travel • Budget: ₹{plan.budget}
                </p>
              </div>

              {plan.itinerary && plan.itinerary.length > 0 && (
                <section className="itinerary-section">
                  <h3 className="section-title" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #EFF9F0 0%, #D4F1D9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem'
                  }}>📅 Day-by-Day Itinerary</h3>
                  <div className="itinerary" style={{
                    background: 'linear-gradient(135deg, #EFF9F0 0%, #E8F5E8 100%)',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    boxShadow: '0 10px 30px rgba(239, 249, 240, 0.4)',
                    border: '1px solid rgba(212, 241, 217, 0.5)'
                  }}>
                    {plan.itinerary.map((d, index)=> (
                      <div className="day-item" key={d.day} style={{
                        marginBottom: index < plan.itinerary.length - 1 ? '2rem' : '0',
                        paddingBottom: index < plan.itinerary.length - 1 ? '2rem' : '0',
                        borderBottom: index < plan.itinerary.length - 1 ? '2px solid rgba(34, 139, 34, 0.3)' : 'none'
                      }}>
                        <div className="day-header" style={{
                          marginBottom: '1.5rem',
                          textAlign: 'left'
                        }}>
                          <h4 style={{
                            color: '#2D5D31', 
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            margin: 0,
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            🌅 Day {d.day}
                          </h4>
                        </div>
                        <div className="day-activities">
                          {Array.isArray(d.activities) ? (
                            <div>
                              {d.activities.map((activity, idx) => (
                                <p key={idx} style={{
                                  color: '#1B4A1F',
                                  fontSize: '1rem',
                                  lineHeight: '1.6',
                                  margin: '0 0 0.8rem 0',
                                  fontWeight: '400',
                                  paddingLeft: '1rem',
                                  position: 'relative'
                                }}>
                                  <span style={{
                                    position: 'absolute',
                                    left: 0,
                                    color: '#2D5D31'
                                  }}>•</span>
                                  {activity}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p style={{
                              color: '#1B4A1F',
                              fontSize: '1rem',
                              lineHeight: '1.6',
                              margin: 0,
                              fontWeight: '400'
                            }}>
                              {d.activities}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {plan.breakdown && (
                <section className="budget-section">
                  <h3 className="section-title" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #EFF9F0 0%, #D4F1D9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem'
                  }}>💰 Budget Breakdown</h3>
                  <div className="budget-list" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    {Object.entries(plan.breakdown).map(([k,v], index)=> (
                      <div className="budget-item" key={k} style={{
                        background: 'linear-gradient(135deg, #EFF9F0 0%, #E8F5E8 100%)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        textAlign: 'center',
                        color: '#1B4A1F',
                        boxShadow: '0 4px 15px rgba(239, 249, 240, 0.4)',
                        transition: 'transform 0.3s ease',
                        border: '1px solid rgba(212, 241, 217, 0.5)'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                        <div className="budget-category" style={{
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          marginBottom: '0.5rem',
                          opacity: '0.9'
                        }}>
                          {capitalize(k)}
                        </div>
                        <div className="budget-amount" style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}>
                          ₹{v}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {plan.attractions && plan.attractions.length > 0 && (
                <section className="attractions-section">
                  <h3 className="section-title" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #EFF9F0 0%, #D4F1D9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem'
                  }}>🏛️ Must-Visit Places</h3>
                  <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {plan.attractions.slice(0,6).map((attraction, index)=> (
                      <div 
                        className="card-body attraction-card" 
                        key={index} 
                        onClick={() => typeof attraction === 'object' && attraction.location ? 
                          openLocation(attraction.location) : 
                          openLocation(attraction)
                        }
                        style={{
                          background: 'linear-gradient(135deg, #EFF9F0 0%, #E8F5E8 100%)',
                          borderRadius: '16px',
                          padding: '2rem',
                          border: '1px solid rgba(212, 241, 217, 0.5)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          transform: 'translateY(0)',
                          boxShadow: '0 4px 15px rgba(239, 249, 240, 0.4)',
                          color: '#1B4A1F'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-8px) scale(1.02)';
                          e.target.style.boxShadow = '0 15px 35px rgba(239, 249, 240, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 4px 15px rgba(239, 249, 240, 0.4)';
                        }}
                      >
                        {typeof attraction === 'object' ? (
                          <>
                            <h4 style={{
                              color: '#2D5D31',
                              marginBottom: '1rem', 
                              fontSize: '1.3rem',
                              fontWeight: 'bold',
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}>
                              🎯 {attraction.name}
                            </h4>
                            <div style={{
                              background: 'rgba(34, 139, 34, 0.1)',
                              padding: '1rem',
                              borderRadius: '10px',
                              marginBottom: '1rem',
                              backdropFilter: 'blur(10px)'
                            }}>
                              <p style={{
                                color: '#1B4A1F', 
                                fontSize: '1rem', 
                                marginBottom: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '500'
                              }}>
                                📍 <span style={{fontWeight: '600'}}>{attraction.location}</span>
                              </p>
                            </div>
                            <p style={{
                              marginBottom: '1rem', 
                              fontSize: '1rem',
                              lineHeight: '1.6',
                              color: '#1B4A1F',
                              fontWeight: '400'
                            }}>
                              {attraction.description}
                            </p>
                            {attraction.bestTime && (
                              <div style={{
                                background: 'rgba(34, 139, 34, 0.15)',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '1rem'
                              }}>
                                <span style={{color: '#2D5D31', fontSize: '0.95rem', fontWeight: '600'}}>
                                  ⏰ {attraction.bestTime}
                                </span>
                              </div>
                            )}
                            <div style={{
                              textAlign: 'center',
                              padding: '0.8rem',
                              background: 'rgba(34, 139, 34, 0.1)',
                              borderRadius: '8px',
                              fontSize: '0.9rem',
                              color: '#2D5D31',
                              fontWeight: '500',
                              backdropFilter: 'blur(10px)'
                            }}>
                              🗺️ Click to view on map
                            </div>
                          </>
                        ) : (
                          <>
                            <h4 style={{
                              color: '#2D5D31',
                              fontSize: '1.2rem',
                              marginBottom: '1rem',
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}>
                              🎯 {attraction}
                            </h4>
                            <div style={{
                              textAlign: 'center',
                              padding: '0.8rem',
                              background: 'rgba(34, 139, 34, 0.1)',
                              borderRadius: '8px',
                              fontSize: '0.9rem',
                              color: '#2D5D31',
                              fontWeight: '500'
                            }}>
                              🗺️ Click to search on map
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {plan.food && plan.food.length > 0 && (
                <section className="food-section">
                  <h3 className="section-title" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #EFF9F0 0%, #D4F1D9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem'
                  }}>🍽️ Food Recommendations</h3>
                  <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {Array.isArray(plan.food) ? plan.food.map((food, index) => (
                      <div 
                        key={index} 
                        className="card-body food-card" 
                        onClick={() => typeof food === 'object' && food.location ? 
                          openLocation(food.restaurant + ' ' + food.location) : null
                        }
                        style={{
                          background: 'linear-gradient(135deg, #EFF9F0 0%, #E8F5E8 100%)',
                          borderRadius: '16px',
                          padding: '2rem',
                          border: '1px solid rgba(212, 241, 217, 0.5)',
                          cursor: typeof food === 'object' && food.location ? 'pointer' : 'default',
                          transition: 'all 0.3s ease',
                          transform: 'translateY(0)',
                          boxShadow: '0 4px 15px rgba(239, 249, 240, 0.4)',
                          color: '#1B4A1F'
                        }}
                        onMouseEnter={(e) => {
                          if (typeof food === 'object' && food.location) {
                            e.target.style.transform = 'translateY(-5px) scale(1.02)';
                            e.target.style.boxShadow = '0 8px 25px rgba(239, 249, 240, 0.5)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (typeof food === 'object' && food.location) {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(239, 249, 240, 0.4)';
                          }
                        }}
                      >
                        {typeof food === 'object' ? (
                          <>
                            <h4 style={{
                              color: '#2D5D31',
                              marginBottom: '1rem', 
                              fontSize: '1.4rem',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}>
                              🍴 {food.dish}
                            </h4>
                            
                            <div style={{
                              background: 'rgba(34, 139, 34, 0.1)',
                              padding: '1.2rem',
                              borderRadius: '12px',
                              marginBottom: '1rem',
                              backdropFilter: 'blur(10px)'
                            }}>
                              <p style={{
                                color: '#1B4A1F', 
                                fontSize: '1.1rem', 
                                marginBottom: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '600'
                              }}>
                                🏪 {food.restaurant}
                              </p>
                              
                              <p style={{
                                color: '#1B4A1F', 
                                fontSize: '0.95rem', 
                                marginBottom: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                📍 {food.location}
                              </p>
                              
                              {food.price && (
                                <div style={{
                                  background: 'rgba(34, 139, 34, 0.15)',
                                  padding: '0.8rem',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.5rem'
                                }}>
                                  <span style={{
                                    color: '#2D5D31', 
                                    fontSize: '1.1rem', 
                                    fontWeight: '700',
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                                  }}>
                                    ₹ {food.price}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {food.location && (
                              <div style={{
                                textAlign: 'center',
                                padding: '0.8rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                color: 'white',
                                fontWeight: '500',
                                backdropFilter: 'blur(10px)'
                              }}>
                                🗺️ Click to find on map
                              </div>
                            )}
                          </>
                        ) : (
                          <p style={{
                            textAlign: 'center',
                            fontSize: '1.1rem',
                            color: 'white',
                            fontWeight: '500'
                          }}>{food}</p>
                        )}
                      </div>
                    )) : (
                      <div className="card-body food-card" style={{
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        borderRadius: '16px',
                        padding: '2rem',
                        border: 'none',
                        color: 'white'
                      }}>
                        <p style={{textAlign: 'center', fontSize: '1.1rem', fontWeight: '500'}}>
                          {plan.food}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {plan.tips && plan.tips.length > 0 && (
                <section className="tips-section">
                  <h3 className="section-title" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #EFF9F0 0%, #D4F1D9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem'
                  }}>💡 Pro Travel Tips</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {plan.tips.map((tip, index)=> (
                      <div key={index} className="tip-card" style={{
                        background: 'linear-gradient(135deg, #EFF9F0 0%, #E8F5E8 100%)',
                        borderRadius: '16px',
                        padding: '2rem',
                        color: '#1B4A1F',
                        border: '1px solid rgba(212, 241, 217, 0.5)',
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)',
                        boxShadow: '0 4px 15px rgba(239, 249, 240, 0.4)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-5px) scale(1.02)';
                        e.target.style.boxShadow = '0 10px 25px rgba(239, 249, 240, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 4px 15px rgba(239, 249, 240, 0.4)';
                      }}>
                        <div style={{
                          background: 'rgba(34, 139, 34, 0.2)',
                          padding: '0.8rem',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          marginBottom: '1.5rem',
                          margin: '0 auto 1.5rem auto',
                          backdropFilter: 'blur(10px)'
                        }}>
                          {index % 5 === 0 ? '🎯' : 
                           index % 5 === 1 ? '✈️' : 
                           index % 5 === 2 ? '🎒' :
                           index % 5 === 3 ? '🗺️' : '💫'}
                        </div>
                        <div style={{
                          background: 'rgba(34, 139, 34, 0.1)',
                          padding: '1.5rem',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)',
                          textAlign: 'center'
                        }}>
                          <h4 style={{
                            color: '#2D5D31',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                          }}>
                            Tip #{index + 1}
                          </h4>
                          <p style={{
                            color: '#1B4A1F',
                            lineHeight: '1.7',
                            fontSize: '1rem',
                            margin: 0,
                            fontWeight: '400'
                          }}>
                            {tip}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {plan && plan.error && (
            <div className="placeholder error">
              <h3>⚠️ Error generating plan</h3>
              <p>Sorry, there was an issue generating your plan. Please try again.</p>
              {plan.raw && (
                <details style={{marginTop: '1rem', textAlign: 'left'}}>
                  <summary style={{cursor: 'pointer', color: '#94a3b8'}}>View Error Details</summary>
                  <pre style={{fontSize: '12px', color: '#666', marginTop: '0.5rem', whiteSpace: 'pre-wrap'}}>
                    {plan.raw.substring(0, 500)}...
                  </pre>
                </details>
              )}
            </div>
          )}
        </section>
    </div>
  )
}
