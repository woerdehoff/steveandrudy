import { useState, useRef, useEffect } from 'react'
import steveRudyPhoto from './assets/steve-rudy.jpg'
import steveRudyPhoto3 from './assets/steve-rudy-3.jpg'
import sittingPhoto from './assets/sitting.JPG'
import stevePhoto from '../Images/curly hair.jpg'
import rudyPhoto from '../Images/Rudy Irish.jpg'
import './App.css'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     icon: '🏠' },
  { id: 'steve',    label: 'Steve',    icon: '⭐' },
  { id: 'rudy',     label: 'Rudy',     icon: '🎸' },
  { id: 'memories', label: 'Memories', icon: '📸' },
  { id: 'about',    label: 'About',    icon: '💙' },
  { id: 'contact',  label: 'Contact',  icon: '✉️' },
]

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const audioRef = useRef(null)
  const steveSongRef = useRef(null)
  const rudySongRef = useRef(null)

  useEffect(() => {
    if (activeTab === 'steve') {
      if (!steveSongRef.current) steveSongRef.current = new Audio('/sounds/Galveston Salt.mp3')
      steveSongRef.current.currentTime = 0
      steveSongRef.current.play().catch(() => {})
      if (rudySongRef.current) rudySongRef.current.pause()
    } else if (activeTab === 'rudy') {
      if (!rudySongRef.current) rudySongRef.current = new Audio('/sounds/Galveston Oil-Slick.mp3')
      rudySongRef.current.currentTime = 0
      rudySongRef.current.play().catch(() => {})
      if (steveSongRef.current) steveSongRef.current.pause()
    } else {
      if (steveSongRef.current) steveSongRef.current.pause()
      if (rudySongRef.current) rudySongRef.current.pause()
    }
  }, [activeTab])

  const stopSteveSong = () => {
    if (steveSongRef.current) {
      steveSongRef.current.pause()
      steveSongRef.current.currentTime = 0
    }
  }

  const stopRudySong = () => {
    if (rudySongRef.current) {
      rudySongRef.current.pause()
      rudySongRef.current.currentTime = 0
    }
  }

  const playLaugh = () => {
    if (!audioRef.current) audioRef.current = new Audio('/sounds/steves-laugh.mp3')
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }

  return (
    <div className="app">

      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => setActiveTab('home')}>Steve &amp; Rudy</div>
          <ul className="nav-links">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={activeTab === item.id ? 'active' : ''}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="main-content">

        {activeTab === 'home' && (
          <section className="section hero-section">
            <div className="hero-text">
              <p className="hero-eyebrow">The 2 Best Friends</p>
              <h1>Steve <span className="accent">&amp;</span> Rudy</h1>
              <p className="tagline">A celebration of friendship, adventure, and unforgettable moments</p>
              <button className="cta-button" onClick={() => setActiveTab('about')}>
                Our Story →
              </button>
            </div>
            <div className="hero-gallery">
              <button className="photo-card photo-card--tall" onClick={playLaugh} aria-label="Tap to hear Steve laugh">
                <img src={steveRudyPhoto} alt="Steve and Rudy at Wrigley Field" />
                <span className="photo-hint">👆 Tap!</span>
              </button>
              <div className="photo-card-col">
                <button className="photo-card" onClick={playLaugh} aria-label="Tap to hear Steve laugh">
                  <img src={steveRudyPhoto3} alt="Steve and Rudy together" />
                  <span className="photo-hint">👆 Tap!</span>
                </button>
                <button className="photo-card" onClick={playLaugh} aria-label="Tap to hear Steve laugh">
                  <img src={sittingPhoto} alt="Steve and Rudy sitting" />
                  <span className="photo-hint">👆 Tap!</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'steve' && (
          <section className="section profile-section">
            <div className="profile-card">
              <div className="profile-photo-wrap">
                <img src={stevePhoto} alt="Steve" className="profile-photo" />
              </div>
              <div className="profile-body">
                <h1>Steve</h1>
                <p className="profile-subtitle">The Heart of Friendship</p>
                <div className="trait-list">
                  <div className="trait">
                    <span className="trait-icon">🎯</span>
                    <div><strong>Passion</strong><p>Steve brings infectious energy to everything he does. His laugh is legendary and his joy is contagious.</p></div>
                  </div>
                  <div className="trait">
                    <span className="trait-icon">💙</span>
                    <div><strong>Loyalty</strong><p>A true friend through and through — the kind who shows up when it matters most.</p></div>
                  </div>
                  <div className="trait">
                    <span className="trait-icon">🌟</span>
                    <div><strong>Spirit</strong><p>Whether spontaneous adventures or deep conversations, Steve makes every moment memorable.</p></div>
                  </div>
                </div>
                <div className="button-group">
                  <button className="cta-button" onClick={() => setActiveTab('about')}>Our Story Together</button>
                  <button className="stop-button" onClick={stopSteveSong}>⏹ Stop Song</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'rudy' && (
          <section className="section profile-section">
            <div className="profile-card profile-card--reverse">
              <div className="profile-photo-wrap">
                <img src={rudyPhoto} alt="Rudy" className="profile-photo" />
              </div>
              <div className="profile-body">
                <h1>Rudy</h1>
                <p className="profile-subtitle">The Soul of Friendship</p>
                <div className="trait-list">
                  <div className="trait">
                    <span className="trait-icon">🎯</span>
                    <div><strong>Wisdom</strong><p>Rudy brings thoughtfulness and depth — an invaluable companion through life's journey.</p></div>
                  </div>
                  <div className="trait">
                    <span className="trait-icon">💙</span>
                    <div><strong>Compassion</strong><p>With a big heart, Rudy is always there to listen, support, and lift up those around him.</p></div>
                  </div>
                  <div className="trait">
                    <span className="trait-icon">🌟</span>
                    <div><strong>Presence</strong><p>Rudy's calm, grounding presence makes everyone feel valued. His friendship keeps giving.</p></div>
                  </div>
                </div>
                <div className="button-group">
                  <button className="cta-button" onClick={() => setActiveTab('about')}>Our Story Together</button>
                  <button className="stop-button" onClick={stopRudySong}>⏹ Stop Song</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'about' && (
          <section className="section about-section">
            <div className="section-header">
              <h2>Our Story</h2>
              <p>A friendship built on trust, laughter, and adventure</p>
            </div>
            <div className="story-grid">
              <div className="story-card"><div className="story-icon">🤝</div><h3>The Beginning</h3><p>Steve and Rudy's friendship began with a single moment that changed everything. Through thick and thin, they've built a bond that grows stronger every day.</p></div>
              <div className="story-card"><div className="story-icon">🌟</div><h3>Adventures</h3><p>From wild road trips to quiet moments at home, Steve and Rudy have experienced it all. Every adventure is a memory, every memory a treasure.</p></div>
              <div className="story-card"><div className="story-icon">💪</div><h3>Support</h3><p>True friendship means being there through the challenges. They've always had each other's backs, celebrating victories and supporting through difficulties.</p></div>
              <div className="story-card"><div className="story-icon">😄</div><h3>Fun</h3><p>Life with a best friend means constant laughter and joy. Whether inside jokes, spontaneous plans, or lazy afternoons, every moment counts.</p></div>
            </div>
          </section>
        )}

        {activeTab === 'memories' && (
          <section className="section memories-section">
            <div className="section-header">
              <h2>Favorite Memories</h2>
              <p>The moments that define a friendship</p>
            </div>
            <div className="memories-grid">
              <div className="memory-card"><div className="memory-emoji">🚗</div><h3>Summer Road Trip</h3><p>Epic journey across the country with unforgettable sunsets and the best conversations.</p></div>
              <div className="memory-card"><div className="memory-emoji">🎲</div><h3>Game Night Champion</h3><p>Legendary board game night that ended with friendly competition and countless laughs.</p></div>
              <div className="memory-card"><div className="memory-emoji">🍕</div><h3>Midnight Pizza Run</h3><p>2 AM pizza runs that became a tradition — discussing life's big questions over a slice.</p></div>
              <div className="memory-card"><div className="memory-emoji">🎵</div><h3>Concert Adventure</h3><p>First time seeing their favorite band live — an experience they'll never forget.</p></div>
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="section contact-section">
            <div className="section-header">
              <h2>Get In Touch</h2>
              <p>Send Steve and Rudy a message</p>
            </div>
            <div className="contact-form">
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
              <textarea placeholder="Write your message..." className="form-textarea"></textarea>
              <button className="submit-button">Send Message</button>
            </div>
          </section>
        )}

      </main>

      <footer className="footer">
        <p>© 2024 Steve &amp; Rudy · The 2 Best Friends</p>
      </footer>

      <nav className="bottom-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={activeTab === item.id ? 'active' : ''}
          >
            <span className="bnav-icon">{item.icon}</span>
            <span className="bnav-label">{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}

export default App
