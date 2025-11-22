// Client-side AI-style planner logic and UI helpers
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const navToggle = document.querySelectorAll('.nav-toggle');
  navToggle.forEach(btn=>btn.addEventListener('click', toggleNav));

  function toggleNav(){
    const nav = document.querySelector('.nav');
    if(!nav) return;
    nav.style.display = (nav.style.display === 'block') ? '' : 'block';
  }

  // Planner form logic
  const form = document.getElementById('planner-form');
  const results = document.getElementById('results');
  const resetBtn = document.getElementById('reset-btn');

  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const start = document.getElementById('start').value.trim();
      const destination = document.getElementById('destination').value.trim();
      const budget = Number(document.getElementById('budget').value);
      const days = parseInt(document.getElementById('days').value,10);
      const type = document.getElementById('type').value;
      if(!start || !destination || !budget || !days){
        showMessage('Please complete the form fields.');
        return;
      }
      // generate plan
      const plan = generatePlan({start,destination,budget,days,type});
      renderPlan(plan);
    });
  }

  if(resetBtn){
    resetBtn.addEventListener('click', ()=>{
      form.reset();
      results.innerHTML = `\n        <div class="placeholder">\n          <h3>Your plan will appear here</h3>\n          <p>Fill the form and click <strong>Generate Plan</strong> to see suggestions.</p>\n        </div>`;
    });
  }

  // Contact form submission (client-only simulation)
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('contact-status').textContent = 'Thanks! Your message is noted (demo).';
      contactForm.reset();
    });
  }

  // Utility: show a small status message
  function showMessage(msg){
    results.innerHTML = `<div class="placeholder"><h4>${escapeHtml(msg)}</h4></div>`;
  }

  // Generate an AI-like plan (client-side heuristics)
  function generatePlan({start,destination,budget,days,type}){
    // simple heuristics for budget distribution by travel type
    const typeProfiles = {
      'Adventure': {accommodation:0.25,food:0.15,transport:0.2,activities:0.35,misc:0.05},
      'Family': {accommodation:0.28,food:0.2,transport:0.2,activities:0.25,misc:0.07},
      'Solo': {accommodation:0.22,food:0.18,transport:0.2,activities:0.3,misc:0.1},
      'Luxury': {accommodation:0.45,food:0.15,transport:0.15,activities:0.18,misc:0.07},
      'Budget': {accommodation:0.18,food:0.18,transport:0.24,activities:0.28,misc:0.12}
    };
    const profile = typeProfiles[type] || typeProfiles['Solo'];

    const breakdown = {};
    Object.keys(profile).forEach(k => breakdown[k] = Math.round(budget * profile[k]));

    // mock attractions database for a few places
    const attractionsDB = {
      'paris':['Eiffel Tower','Louvre Museum','Montmartre','Seine River Walk'],
      'bali':['Uluwatu Temple','Tegallalang Rice Terraces','Kuta Beach','Ubud Market'],
      'tokyo':['Senso-ji Temple','Shibuya Crossing','Tokyo Skytree','Tsukiji Outer Market'],
      'new york':['Statue of Liberty','Central Park','Times Square','Metropolitan Museum of Art'],
      'rome':['Colosseum','Vatican Museums','Trevi Fountain','Pantheon'],
      'cape town':['Table Mountain','V&A Waterfront','Cape Point','Kirstenbosch Gardens']
    };

    const key = destination.toLowerCase().split(',')[0].trim();
    const known = Object.keys(attractionsDB).find(k=>key.includes(k)) || null;
    const attractions = known ? attractionsDB[known] : [
      `Top museum in ${destination}`,
      `Popular viewpoint in ${destination}`,
      `Historic area of ${destination}`,
      `Local market in ${destination}`
    ];

    // Build day-by-day itinerary
    const itinerary = [];
    for(let d=1; d<=days; d++){
      const activity = pickActivityForType(type, d, destination, attractions);
      itinerary.push({day:d, activities:activity});
    }

    // Food recommendations (simple)
    const food = suggestFood(destination, type);

    // Travel tips
    const tips = generateTips(type, destination);

    return {start,destination,budget,days,type,breakdown,itinerary,attractions,food,tips};
  }

  function renderPlan(plan){
    let html = '';
    html += `<h2>Plan from ${escapeHtml(plan.start)} → ${escapeHtml(plan.destination)}</h2>`;
    html += `<p class="muted">${escapeHtml(plan.days)} days • ${escapeHtml(plan.type)} travel • Estimated budget: $${plan.budget}</p>`;

    // Itinerary
    html += `<section class="itinerary">`;
    plan.itinerary.forEach(day => {
      html += `<div class="day-card"><strong>Day ${day.day}</strong><p>${escapeHtml(day.activities.join(' • '))}</p></div>`;
    });
    html += `</section>`;

    // Budget
    html += `<h3 style="margin-top:1rem">Estimated Budget Breakdown</h3><div class="budget-list">`;
    Object.entries(plan.breakdown).forEach(([k,v])=>{
      html += `<div class="budget-item">${escapeHtml(capitalize(k))}: $${v}</div>`;
    });
    html += `</div>`;

    // Attractions
    html += `<h3 style="margin-top:1rem">Best Places to Visit</h3><div class="grid">`;
    plan.attractions.slice(0,6).forEach(a=>{ html += `<div class="card-body"><strong>${escapeHtml(a)}</strong></div>` });
    html += `</div>`;

    // Food
    html += `<h3 style="margin-top:1rem">Food Recommendations</h3><div class="card-body"><p>${escapeHtml(plan.food.join(', '))}</p></div>`;

    // Tips
    html += `<h3 style="margin-top:1rem">Travel Tips</h3><div class="card-body"><ul>`;
    plan.tips.forEach(t=> html += `<li class="muted">${escapeHtml(t)}</li>`);
    html += `</ul></div>`;

    results.innerHTML = html;
  }

  // Helper heuristics
  function pickActivityForType(type, day, dest, attractions){
    const templates = {
      'Adventure': ['Hike to a scenic viewpoint','Water sports or beach time','Local outdoor tour','Adventure activity (zipline, diving)'],
      'Family': ['Easy city tour','Kid-friendly museum','Park / beach day','Relaxed local experience'],
      'Solo': ['Cafe-hopping and walking tour','Meetup or group tour','Free time to explore','Local hidden gems off the beaten path'],
      'Luxury': ['Spa or premium dining','Private guided tour','Exclusive experience','Leisure & shopping day'],
      'Budget': ['Walking tour & free attractions','Street food & markets','Public transport exploration','Free parks and viewpoints']
    };
    const pool = templates[type] || templates['Solo'];

    const act = [];
    // Main attraction for the day
    if(attractions && attractions.length) act.push(attractions[(day-1) % attractions.length]);
    // Add two more suggestions
    act.push(pool[(day-1) % pool.length]);
    act.push(simpleLocalActivity(dest));
    return act;
  }

  function simpleLocalActivity(dest){
    return `Explore the popular neighborhood in ${dest}`;
  }

  function suggestFood(destination,type){
    const base = ['Local specialty','Popular street food','Well-known local restaurant'];
    if(type==='Luxury') base.unshift('Fine dining experience');
    if(type==='Budget') base.push('Affordable local favourites');
    return base;
  }

  function generateTips(type,destination){
    const tips = [];
    tips.push(`Check local transportation options in ${destination} and pre-book when needed.`);
    if(type==='Adventure') tips.push('Pack appropriate outdoor gear and check weather conditions.');
    if(type==='Luxury') tips.push('Consider booking experiences in advance to secure availability.');
    if(type==='Budget') tips.push('Use local markets and public transport to save money.');
    tips.push('Always carry a small first-aid kit and keep digital copies of important documents.');
    return tips;
  }

  // small helpers
  function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}
  function escapeHtml(s){ if(!s && s!==0) return ''; return String(s).replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }
});
