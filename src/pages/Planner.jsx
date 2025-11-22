import React, {useState} from 'react'

// Planner logic ported from previous app.js
const typeProfiles = {
  'Adventure': {accommodation:0.25,food:0.15,transport:0.2,activities:0.35,misc:0.05},
  'Family': {accommodation:0.28,food:0.2,transport:0.2,activities:0.25,misc:0.07},
  'Solo': {accommodation:0.22,food:0.18,transport:0.2,activities:0.3,misc:0.1},
  'Luxury': {accommodation:0.45,food:0.15,transport:0.15,activities:0.18,misc:0.07},
  'Budget': {accommodation:0.18,food:0.18,transport:0.24,activities:0.28,misc:0.12}
}

const attractionsDB = {
  'paris':['Eiffel Tower','Louvre Museum','Montmartre','Seine River Walk'],
  'bali':['Uluwatu Temple','Tegallalang Rice Terraces','Kuta Beach','Ubud Market'],
  'tokyo':['Senso-ji Temple','Shibuya Crossing','Tokyo Skytree','Tsukiji Outer Market'],
  'new york':['Statue of Liberty','Central Park','Times Square','Metropolitan Museum of Art'],
  'rome':['Colosseum','Vatican Museums','Trevi Fountain','Pantheon'],
  'cape town':['Table Mountain','V&A Waterfront','Cape Point','Kirstenbosch Gardens']
}

function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1) }
function escapeHtml(s){ if(!s && s!==0) return ''; return String(s).replace(/[&<>\"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

export default function Planner(){
  const [start,setStart] = useState('')
  const [destination,setDestination] = useState('')
  const [budget,setBudget] = useState('')
  const [days,setDays] = useState(3)
  const [type,setType] = useState('Adventure')
  const [plan,setPlan] = useState(null)
  const [status,setStatus] = useState('')

  function simpleLocalActivity(dest){ return `Explore the popular neighborhood in ${dest}` }
  function pickActivityForType(type, day, dest, attractions){
    const templates = {
      'Adventure': ['Hike to a scenic viewpoint','Water sports or beach time','Local outdoor tour','Adventure activity (zipline, diving)'],
      'Family': ['Easy city tour','Kid-friendly museum','Park / beach day','Relaxed local experience'],
      'Solo': ['Cafe-hopping and walking tour','Meetup or group tour','Free time to explore','Local hidden gems off the beaten path'],
      'Luxury': ['Spa or premium dining','Private guided tour','Exclusive experience','Leisure & shopping day'],
      'Budget': ['Walking tour & free attractions','Street food & markets','Public transport exploration','Free parks and viewpoints']
    }
    const pool = templates[type] || templates['Solo']
    const act = []
    if(attractions && attractions.length) act.push(attractions[(day-1) % attractions.length])
    act.push(pool[(day-1) % pool.length])
    act.push(simpleLocalActivity(dest))
    return act
  }

  function suggestFood(destination,type){
    const base = ['Local specialty','Popular street food','Well-known local restaurant']
    if(type==='Luxury') base.unshift('Fine dining experience')
    if(type==='Budget') base.push('Affordable local favourites')
    return base
  }

  function generateTips(type,destination){
    const tips = []
    tips.push(`Check local transportation options in ${destination} and pre-book when needed.`)
    if(type==='Adventure') tips.push('Pack appropriate outdoor gear and check weather conditions.')
    if(type==='Luxury') tips.push('Consider booking experiences in advance to secure availability.')
    if(type==='Budget') tips.push('Use local markets and public transport to save money.')
    tips.push('Always carry a small first-aid kit and keep digital copies of important documents.')
    return tips
  }

  function generatePlan({start,destination,budget,days,type}){
    const profile = typeProfiles[type] || typeProfiles['Solo']
    const breakdown = {}
    Object.keys(profile).forEach(k => breakdown[k] = Math.round(budget * profile[k]))
    const key = destination.toLowerCase().split(',')[0].trim()
    const known = Object.keys(attractionsDB).find(k=>key.includes(k)) || null
    const attractions = known ? attractionsDB[known] : [
      `Top museum in ${destination}`,
      `Popular viewpoint in ${destination}`,
      `Historic area of ${destination}`,
      `Local market in ${destination}`
    ]
    const itinerary = []
    for(let d=1; d<=days; d++){
      const activity = pickActivityForType(type, d, destination, attractions)
      itinerary.push({day:d, activities:activity})
    }
    const food = suggestFood(destination, type)
    const tips = generateTips(type, destination)
    return {start,destination,budget,days,type,breakdown,itinerary,attractions,food,tips}
  }

  function onSubmit(e){
    e.preventDefault()
    if(!start || !destination || !budget || !days){ setStatus('Please complete the form fields.'); return }
    setStatus('Generating plan...')
    setTimeout(()=>{
      const p = generatePlan({start,destination,days:parseInt(days,10),budget: Number(budget),type})
      setPlan(p)
      setStatus('')
    },400)
  }

  return (
    <div className="container planner-page">
      <h1>Travel Planner</h1>
      <p className="lead">Tell us a few details and get an AI-style trip plan instantly.</p>

      <section className="planner-grid">
        <form onSubmit={onSubmit} className="planner-form">
          <label>Starting Location
            <input value={start} onChange={e=>setStart(e.target.value)} type="text" placeholder="e.g., New York" required />
          </label>
          <label>Destination
            <input value={destination} onChange={e=>setDestination(e.target.value)} type="text" placeholder="e.g., Paris" required />
          </label>
          <label>Budget (USD)
            <input value={budget} onChange={e=>setBudget(e.target.value)} type="number" min="50" placeholder="e.g., 1500" required />
          </label>
          <label>Number of Days
            <input value={days} onChange={e=>setDays(e.target.value)} type="number" min="1" max="30" required />
          </label>
          <label>Travel Type
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option>Adventure</option>
              <option>Family</option>
              <option>Solo</option>
              <option>Luxury</option>
              <option>Budget</option>
            </select>
          </label>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Generate Plan</button>
            <button type="button" className="btn btn-ghost" onClick={()=>{setStart('');setDestination('');setBudget('');setDays(3);setType('Adventure');setPlan(null);setStatus('')}}>Reset</button>
          </div>
          {status && <p className="muted">{status}</p>}
        </form>

        <section className="results">
          {!plan && (
            <div className="placeholder">
              <h3>Your plan will appear here</h3>
              <p>Fill the form and click <strong>Generate Plan</strong> to see suggestions.</p>
            </div>
          )}

          {plan && (
            <div>
              <h2>Plan from {escapeHtml(plan.start)} → {escapeHtml(plan.destination)}</h2>
              <p className="muted">{plan.days} days • {plan.type} travel • Estimated budget: ${plan.budget}</p>

              <section className="itinerary">
                {plan.itinerary.map(d=> (
                  <div className="day-card" key={d.day}>
                    <strong>Day {d.day}</strong>
                    <p>{d.activities.join(' • ')}</p>
                  </div>
                ))}
              </section>

              <h3 style={{marginTop:'1rem'}}>Estimated Budget Breakdown</h3>
              <div className="budget-list">
                {Object.entries(plan.breakdown).map(([k,v])=> (
                  <div className="budget-item" key={k}>{capitalize(k)}: ${v}</div>
                ))}
              </div>

              <h3 style={{marginTop:'1rem'}}>Best Places to Visit</h3>
              <div className="grid">
                {plan.attractions.slice(0,6).map(a=> (<div className="card-body" key={a}><strong>{a}</strong></div>))}
              </div>

              <h3 style={{marginTop:'1rem'}}>Food Recommendations</h3>
              <div className="card-body"><p>{plan.food.join(', ')}</p></div>

              <h3 style={{marginTop:'1rem'}}>Travel Tips</h3>
              <div className="card-body">
                <ul>
                  {plan.tips.map(t=> <li className="muted" key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          )}
        </section>
      </section>
    </div>
  )
}
