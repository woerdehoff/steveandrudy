import { useState, useRef, useEffect } from 'react'
import steveRudyPhoto from './assets/steve-rudy.jpg'
import steveRudyPhoto3 from './assets/steve-rudy-3.jpg'
import sittingPhoto from './assets/sitting.JPG'
import stevePhoto from '../Images/curly hair.jpg'
import rudyPhoto from '../Images/Rudy Irish.jpg'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isSteveSongPlaying, setIsSteveSongPlaying] = useState(false)
  const [isRudySongPlaying, setIsRudySongPlaying] = useState(false)
  const audioRef = useRef(null)
  const steveSongRef = useRef(null)
  const rudySongRef = useRef(null)

  useEffect(() => {
    if (activeTab === 'steve') {
      if (!steveSongRef.current) {
        steveSongRef.current = new Audio('/sounds/Galveston Salt.mp3')
      }
      steveSongRef.current.currentTime = 0
      steveSongRef.current.play().catch(err => console.log('Audio play failed:', err))
      setIsSteveSongPlaying(true)
      if (rudySongRef.current) {
        rudySongRef.current.pause()
        setIsRudySongPlaying(false)
      }
    } else if (activeTab === 'rudy') {
      if (!rudySongRef.current) {
        rudySongRef.current = new Audio('/sounds/Galveston Oil-Slick.mp3')
      }
      rudySongRef.current.currentTime = 0
      rudySongRef.current.play().catch(err => console.log('Audio play failed:', err))
      setIsRudySongPlaying(true)
      if (steveSongRef.current) {
        steveSongRef.current.pause()
        setIsSteveSongPlaying(false)
      }
    } else {
      if (steveSongRef.current) {
        steveSongRef.current.pause()
        setIsSteveSongPlaying(false)
      }
      if (rudySongRef.current) {
        rudySongRef.current.pause()
        setIsRudySongPlaying(false)
      }
    }
  }, [activeTab])

  const stopSteveSong = () => {
    if (steveSongRef.current) {
      steveSongRef.current.pause()
      steveSongRef.current.currentTime = 0
      setIsSteveSongPlaying(false)
    }
  }

  const stopRudySong = () => {
    if (rudySongRef.current) {
      rudySongRef.current.pause()
      rudySongRef.current.currentTime = 0
      setIsRudySongPlaying(false)
    }
  }

  const playLaugh = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/steves-laugh.mp3')
    }
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(err => console.log('Audio play failed:', err))
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Steve & Rudy</div>
          <ul className="nav-links">
            <li><button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>Home</button></li>
            <li><button onClick={() => setActiveTab('steve')} className={activeTab === 'steve' ? 'active' : ''}>Steve</button></li>
            <li><button onClick={() => setActiveTab('rudy')} className={activeTab === 'rudy' ? 'active' : ''}>Rudy</button></li>
            <li><button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>About</button></li>
            <li><button onClick={() => setActiveTab('memories')} className={activeTab === 'memories' ? 'active' : ''}>Memories</button></li>
            <li><button onClick={() => setActiveTab('contact')} className={activeTab === 'contact' ? 'active' : ''}>Contact</button></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Home Section */}
        {activeTab === 'home' && (
          <section className="section hero-section">
            <div className="hero-content">
              <h1>Steve & Rudy</h1>
              <p className="subtitle">The 2 Best Friends</p>
              <p className="tagline">A celebration of friendship, adventure, and unforgettable moments</p>
              <div className="hero-gallery">
                <div className="hero-photo-container clickable" onClick={playLaugh} style={{ cursor: 'pointer' }}>
                  <img src={steveRudyPhoto} alt="Steve and Rudy at Wrigley Field" className="hero-photo" />
                  <div className="tap-hint">👆 Tap Steve!</div>
                </div>
                <div className="hero-photo-container clickable" onClick={playLaugh} style={{ cursor: 'pointer' }}>
                  <img src={steveRudyPhoto3} alt="Steve and Rudy together" className="hero-photo" />
                  <div className="tap-hint">👆 Tap Steve!</div>
                </div>
                <div className="hero-photo-container clickable" onClick={playLaugh} style={{ cursor: 'pointer' }}>
                  <img src={sittingPhoto} alt="Steve sitting" className="hero-photo" />
                  <div className="tap-hint">👆 Tap Steve!</div>
                </div>
              </div>
              <button className="cta-button" onClick={() => setActiveTab('about')}>Learn Our Story</button>
            </div>
          </section>
        )}

        {/* Steve Section */}
        {activeTab === 'steve' && (
          <section className="section profile-section">
            <div className="section-content">
              <div className="profile-container">
                <div className="profile-image">
                  <img src={stevePhoto} alt="Steve" className="profile-photo" />
                </div>
                <div className="profile-info">
                  <h1>Steve</h1>
                  <p className="profile-subtitle">The Heart of Friendship</p>
                  <div className="profile-details">
                    <div className="detail-card">
                      <h3>🎯 Passion</h3>
                      <p>Steve brings an infectious energy and enthusiasm to everything he does. His laugh is legendary, and his joy is contagious.</p>
                    </div>
                    <div className="detail-card">
                      <h3>💙 Loyalty</h3>
                      <p>A true friend through and through, Steve is the kind of person who shows up when it matters most. His dedication to those he cares about is unwavering.</p>
                    </div>
                    <div className="detail-card">
                      <h3>🌟 Spirit</h3>
                      <p>Life with Steve is never boring. Whether it's spontaneous adventures or thoughtful conversations, he makes every moment memorable.</p>
                    </div>
                  </div>
                  <div className="button-group">
                    <button className="cta-button" onClick={() => setActiveTab('about')}>Our Story Together</button>
                    <button className="stop-button" onClick={stopSteveSong}>Stop Song</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Rudy Section */}
        {activeTab === 'rudy' && (
          <section className="section profile-section">
            <div className="section-content">
              <div className="profile-container reverse">
                <div className="profile-info">
                  <h1>Rudy</h1>
                  <p className="profile-subtitle">The Soul of Friendship</p>
                  <div className="profile-details">
                    <div className="detail-card">
                      <h3>🎯 Wisdom</h3>
                      <p>Rudy brings thoughtfulness and depth to the friendship. His insights and perspective make him an invaluable companion through life's journey.</p>
                    </div>
                    <div className="detail-card">
                      <h3>💙 Compassion</h3>
                      <p>With a big heart and genuine care for others, Rudy is always there to listen, support, and encourage those around him.</p>
                    </div>
                    <div className="detail-card">
                      <h3>🌟 Presence</h3>
                      <p>Rudy has a calm, grounding presence that makes everyone feel valued. His friendship is a gift that keeps on giving.</p>
                    </div>
                  </div>
                  <div className="button-group">
                    <button className="cta-button" onClick={() => setActiveTab('about')}>Our Story Together</button>
                    <button className="stop-button" onClick={stopRudySong}>Stop Song</button>
                  </div>
                </div>
                <div className="profile-image">
                  <img src={rudyPhoto} alt="Rudy" className="profile-photo" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeTab === 'about' && (
          <section className="section about-section">
            <div className="section-content">
              <h2>Our Story</h2>
              <div className="story-grid">
                <div className="story-card">
                  <h3>🤝 The Beginning</h3>
                  <p>Steve and Rudy's friendship began with a single moment that changed everything. Through thick and thin, they've been there for each other, building a bond that grows stronger every day.</p>
                </div>
                <div className="story-card">
                  <h3>🌟 Adventures</h3>
                  <p>From wild road trips to quiet moments at home, Steve and Rudy have experienced it all together. Every adventure is a memory, and every memory is a treasure.</p>
                </div>
                <div className="story-card">
                  <h3>💪 Support</h3>
                  <p>True friendship means being there through the challenges. Steve and Rudy have always had each other's backs, celebrating victories and supporting through difficulties.</p>
                </div>
                <div className="story-card">
                  <h3>😄 Fun</h3>
                  <p>Life with a best friend means constant laughter and joy. Whether it's inside jokes, spontaneous plans, or lazy afternoons, they make every moment count.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Memories Section */}
        {activeTab === 'memories' && (
          <section className="section memories-section">
            <div className="section-content">
              <h2>Our Favorite Memories</h2>
              <div className="memories-timeline">
                <div className="memory">
                  <h3>Summer Road Trip</h3>
                  <p>Epic journey across the country with unforgettable sunsets and good conversations.</p>
                </div>
                <div className="memory">
                  <h3>Game Night Champion</h3>
                  <p>Legendary board game night that ended with friendly competition and countless laughs.</p>
                </div>
                <div className="memory">
                  <h3>Midnight Pizza Run</h3>
                  <p>2 AM pizza runs that became a tradition, discussing life's big questions.</p>
                </div>
                <div className="memory">
                  <h3>Concert Adventure</h3>
                  <p>First time seeing their favorite band live, an experience they'll never forget.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <section className="section contact-section">
            <div className="section-content">
              <h2>Get In Touch</h2>
              <div className="contact-form">
                <input type="text" placeholder="Your Name" className="form-input" />
                <input type="email" placeholder="Your Email" className="form-input" />
                <textarea placeholder="Send us a message..." className="form-textarea"></textarea>
                <button className="submit-button">Send Message</button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Steve & Rudy. The 2 Best Friends. Built with React & Vite.</p>
      </footer>
    </div>
  )
}

export default App
