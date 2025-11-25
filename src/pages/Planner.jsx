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

  function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1) }
  function escapeHtml(s){ if(!s && s!==0) return ''; return String(s).replace(/[&<>\"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  async function onSubmit(e){
    e.preventDefault()
    if(!start || !destination || !budget || !days){ 
      setStatus('Please complete the form fields.'); 
      return 
    }

    setLoading(true)
    setStatus('Generating AI travel plan...')
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
        <h1 className="planner-title">AI Travel Planner</h1>
        <p className="planner-subtitle">Tell us a few details and get an AI-powered trip plan instantly with real-time suggestions.</p>
      </div>

      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Starting Location</label>
              <input 
                value={start} 
                onChange={e=>setStart(e.target.value)} 
                type="text" 
                placeholder="e.g., Mumbai, India" 
                required 
              />
            </div>
            
            <div className="input-group">
              <label>Destination</label>
              <input 
                value={destination} 
                onChange={e=>setDestination(e.target.value)} 
                type="text" 
                placeholder="e.g., Paris, France" 
                required 
              />
            </div>
            
            <div className="input-group">
              <label>Budget (USD)</label>
              <input 
                value={budget} 
                onChange={e=>setBudget(e.target.value)} 
                type="number" 
                min="50" 
                placeholder="e.g., 1500" 
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
                <option value="Budget">💰 Budget Travel</option>
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
                  Generating AI Plan...
                </>
              ) : (
                'Generate AI Plan'
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
            <h3 className="result-title">Your AI travel plan will appear here</h3>
            <p className="result-description">Fill the form and click <strong>Generate AI Plan</strong> to see AI-powered suggestions.</p>
          </div>
        )}

        {loading && (
          <div className="result-section">
            <div className="loading-spinner" style={{fontSize: '3rem', marginBottom: '1rem'}}>🤖</div>
            <h3 className="result-title">AI is creating your travel plan...</h3>
            <p className="result-description">Please wait while we generate personalized recommendations for your trip.</p>
          </div>
        )}

        {plan && !plan.error && (
            <div className="plan-results">
              <div className="plan-header">
                <h2>🤖 AI Generated Plan: {escapeHtml(plan.start)} → {escapeHtml(plan.destination)}</h2>
                <p className="muted plan-meta">
                  {plan.days} days • {plan.type} travel • Estimated budget: ${plan.budget}
                </p>
              </div>

              {plan.itinerary && plan.itinerary.length > 0 && (
                <section className="itinerary-section">
                  <h3 className="section-title">📅 Day-by-Day Itinerary</h3>
                  <div className="itinerary">
                    {plan.itinerary.map(d=> (
                      <div className="day-card" key={d.day}>
                        <div className="day-header">
                          <strong>Day {d.day}</strong>
                        </div>
                        <div className="day-activities">
                          <p>{Array.isArray(d.activities) ? d.activities.join(' • ') : d.activities}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {plan.breakdown && (
                <section className="budget-section">
                  <h3 className="section-title">💰 Estimated Budget Breakdown</h3>
                  <div className="budget-list">
                    {Object.entries(plan.breakdown).map(([k,v])=> (
                      <div className="budget-item" key={k}>
                        <span className="budget-category">{capitalize(k)}</span>
                        <span className="budget-amount">${v}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {plan.attractions && plan.attractions.length > 0 && (
                <section className="attractions-section">
                  <h3 className="section-title">🏛️ Must-Visit Places</h3>
                  <div className="grid">
                    {plan.attractions.slice(0,6).map((a, index)=> (
                      <div className="card-body attraction-card" key={index}>
                        <strong>{a}</strong>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {plan.food && plan.food.length > 0 && (
                <section className="food-section">
                  <h3 className="section-title">🍽️ Food Recommendations</h3>
                  <div className="card-body food-card">
                    <p>{Array.isArray(plan.food) ? plan.food.join(', ') : plan.food}</p>
                  </div>
                </section>
              )}

              {plan.tips && plan.tips.length > 0 && (
                <section className="tips-section">
                  <h3 className="section-title">💡 AI Travel Tips</h3>
                  <div className="card-body tips-card">
                    <ul className="tips-list">
                      {plan.tips.map((t, index)=> <li className="muted" key={index}>{t}</li>)}
                    </ul>
                  </div>
                </section>
              )}
            </div>
          )}

          {plan && plan.error && (
            <div className="placeholder error">
              <h3>⚠️ Error generating plan</h3>
              <p>Sorry, there was an issue with AI generation. Please try again.</p>
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
