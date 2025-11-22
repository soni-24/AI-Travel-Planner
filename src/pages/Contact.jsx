import React, {useState} from 'react'

export default function Contact(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const [status,setStatus] = useState('')

  function onSubmit(e){
    e.preventDefault()
    setStatus('Thanks! Your message is noted (demo).')
    setName('');setEmail('');setMessage('')
  }

  return (
    <div className="container contact-page">
      <h1>Contact Us</h1>
      <p className="lead">Have feedback or questions? Send us a message.</p>

      <form onSubmit={onSubmit} className="contact-form">
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} type="text" required placeholder="Your name" />
        </label>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@example.com" />
        </label>
        <label>Message
          <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={6} required placeholder="Tell us about your trip idea..."></textarea>
        </label>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Send Message</button>
        </div>
        <p className="muted">{status}</p>
      </form>
    </div>
  )
}
