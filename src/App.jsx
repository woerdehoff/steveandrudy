import { useState, useRef, useEffect } from 'react'
import steveRudyPhoto from './assets/steve-rudy.jpg'
import steveRudyPhoto3 from './assets/steve-rudy-3.jpg'
import sittingPhoto from './assets/sitting.JPG'
import stevePhoto from '../Images/curly hair.jpg'
import rudyPhoto from '../Images/Rudy Irish.jpg'
import rudyShellPhoto from '../Images/Rudy with a shell.JPG'
import huggingPhoto from '../Images/hugging.JPG'
import skyjackHeroPhoto from '../Images/skyjack-hero.JPG'
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
  const skyjackSongRef = useRef(null)

  useEffect(() => {
    if (activeTab === 'steve') {
      if (!steveSongRef.current) steveSongRef.current = new Audio('/sounds/Galveston Salt.mp3')
      steveSongRef.current.currentTime = 0
      steveSongRef.current.play().catch(() => {})
      if (rudySongRef.current) rudySongRef.current.pause()
      if (skyjackSongRef.current) skyjackSongRef.current.pause()
    } else if (activeTab === 'rudy') {
      if (!rudySongRef.current) rudySongRef.current = new Audio('/sounds/Galveston Oil-Slick.mp3')
      rudySongRef.current.currentTime = 0
      rudySongRef.current.play().catch(() => {})
      if (steveSongRef.current) steveSongRef.current.pause()
      if (skyjackSongRef.current) skyjackSongRef.current.pause()
    } else if (activeTab === 'memories-skyjack') {
      if (!skyjackSongRef.current) {
        skyjackSongRef.current = new Audio('/sounds/cloud-chimehum.mp3')
        skyjackSongRef.current.loop = true
      }
      skyjackSongRef.current.currentTime = 0
      skyjackSongRef.current.play().catch(() => {})
      if (steveSongRef.current) steveSongRef.current.pause()
      if (rudySongRef.current) rudySongRef.current.pause()
    } else {
      if (steveSongRef.current) steveSongRef.current.pause()
      if (rudySongRef.current) rudySongRef.current.pause()
      if (skyjackSongRef.current) skyjackSongRef.current.pause()
    }
  }, [activeTab])

  // Instagram-style video autoplay on scroll
  useEffect(() => {
    if (activeTab !== 'memories-skyjack') return

    const videos = document.querySelectorAll('.video-story-item video')
    let animationFrameId = null
    let intervalId = null
    
    // Aggressively keep music playing - call play() unconditionally
    const forceMusic = () => {
      if (skyjackSongRef.current) {
        skyjackSongRef.current.play().catch(() => {})
      }
    }
    
    // Continuous monitoring using BOTH requestAnimationFrame AND setInterval
    const keepMusicPlaying = () => {
      forceMusic()
      animationFrameId = requestAnimationFrame(keepMusicPlaying)
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          // Force music immediately
          forceMusic()
          // Lower video volume significantly
          video.volume = 0.4
          // Mute video initially
          video.muted = true
          video.play().catch(() => {})
          // Unmute after music is guaranteed playing
          setTimeout(() => {
            forceMusic()
            video.muted = false
            forceMusic()
          }, 100)
        } else {
          video.pause()
          video.volume = 1.0
        }
      })
    }, {
      threshold: [0, 0.5, 1]
    })

    videos.forEach(video => {
      observer.observe(video)
      // Add comprehensive event listeners
      video.addEventListener('play', forceMusic)
      video.addEventListener('playing', forceMusic)
      video.addEventListener('loadeddata', forceMusic)
      video.addEventListener('canplay', forceMusic)
      video.addEventListener('seeked', forceMusic)
      video.addEventListener('volumechange', forceMusic)
    })

    // Double redundancy: both 60fps requestAnimationFrame AND 50ms setInterval
    keepMusicPlaying()
    intervalId = setInterval(forceMusic, 50)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (intervalId) {
        clearInterval(intervalId)
      }
      videos.forEach(video => {
        observer.unobserve(video)
        video.removeEventListener('play', forceMusic)
        video.removeEventListener('playing', forceMusic)
        video.removeEventListener('loadeddata', forceMusic)
        video.removeEventListener('canplay', forceMusic)
        video.removeEventListener('seeked', forceMusic)
        video.removeEventListener('volumechange', forceMusic)
      })
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
              <div className="photo-card-col">
                <button className="photo-card" onClick={playLaugh} aria-label="Tap to hear Steve laugh">
                  <img src={rudyShellPhoto} alt="Rudy with a shell" />
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
              <div className="memory-card" onClick={() => setActiveTab('memories-skyjack')} style={{cursor: 'pointer'}}><div className="memory-emoji">🏗️</div><h3>Skyjack: Friendship at Full Height</h3><p>Click to view videos of their incredible skydiving adventure together.</p></div>
              <div className="memory-card"><div className="memory-emoji">🍕</div><h3>Midnight Pizza Run</h3><p>2 AM pizza runs that became a tradition — discussing life's big questions over a slice.</p></div>
              <div className="memory-card"><div className="memory-emoji">🎵</div><h3>Concert Adventure</h3><p>First time seeing their favorite band live — an experience they'll never forget.</p></div>
            </div>

            <div className="section-divider"></div>

            <div className="section-header">
              <h2>🎬 Skyjack Videos</h2>
              <p>Friendship at full height</p>
            </div>
            <div className="video-collection">
              {/* Videos will be added here */}
            </div>
          </section>
        )}

        {activeTab === 'memories-skyjack' && (
          <section className="section memories-section skyjack-story">
            <div className="section-header">
              <button className="back-button" onClick={() => setActiveTab('memories')}>← Back to Memories</button>
              <h2>🏗️ Skyjack: No Friend Left Above</h2>
              <p>The day a bee became a villain and Steve became a hero</p>
            </div>
            <div style={{maxWidth: '800px', margin: '2rem auto'}}>
              <h3 style={{textAlign: 'center', marginBottom: '1.5rem'}}>A Memory That Brings Tears</h3>
              <div className="hero-image-container" style={{borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', marginBottom: '2rem'}}>
                <img src={skyjackHeroPhoto} alt="Steve and Rudy's Skyjack Adventure" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <div className="story-intro" style={{textAlign: 'left'}}>
                <p>To this day, whenever Rudy thinks back on what happened that fateful afternoon, tears well up in his eyes. Not tears of fear or regret—but tears of overwhelming gratitude and love. Every single time he recalls those terrifying moments trapped high above the ground, helpless and alone, he's moved to emotion. Because what followed wasn't just a rescue. It was proof that true friendship knows no bounds, no heights, no limits.</p>
                <p>The image you see above? That's Rudy, overcome with emotion as he recounts the tale. Because some moments are so powerful, so defining, that they forever change how you see the world—and the people who would move heaven and earth to save you.</p>
                <p><strong>What follows is the courageous story of Steve's daring rescue of Rudy.</strong> A story of bravery, determination, and a bond so strong it could lift a friend from the highest heights. This is not just a tale of what happened—it's a testament to what it truly means to be there for someone when it matters most.</p>
                <p style={{textAlign: 'center', fontSize: '1.2em', fontStyle: 'italic', margin: '2rem 0', color: '#555'}}>Prepare yourself. This is a story of friendship at full height.</p>
              </div>
            </div>
            <div className="story-container">
              <div className="video-story-feed">
                <div className="video-story-item">
                  <div className="story-caption">
                    <h4>Chapter 1: Trapped at the Top</h4>
                    <p>It all started with a bee. One moment Rudy was on solid ground, the next he was sprinting up a construction site like his life depended on it. By the time he realized the bee had given up, Rudy found himself stuck high in the rafters of an unfinished building, too scared to climb down.</p>
                  </div>
                  <div className="video-wrapper">
                    <video controls playsInline loop>
                      <source src="/videos/rudy stuck.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="video-story-item">
                  <div className="story-caption">
                    <h4>Chapter 2: The Waiting Game</h4>
                    <p>Perched precariously among the steel beams, Rudy could only wait. The ground seemed impossibly far below. His heart raced as he gripped the rafters, hoping his best friend would know what to do.</p>
                  </div>
                  <div className="video-wrapper">
                    <video controls playsInline loop>
                      <source src="/videos/rudy waits.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="video-story-item">
                  <div className="story-caption">
                    <h4>Chapter 3: The Call for Help</h4>
                    <p>When Steve saw his friend trapped high above, he didn't hesitate. There was only one way to reach someone at that height. Steve immediately called for backup—not the fire department, but a Pig Boy who calls himself the Power Booster! (No one else calls him that)</p>
                  </div>
                  <div className="video-wrapper">
                    <video controls playsInline loop>
                      <source src="/videos/steve calls in help.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="video-story-item">
                  <div className="story-caption">
                    <h4>Chapter 4: A Crowd Gathers</h4>
                    <p>Word spread quickly. Soon, onlookers gathered below, watching with anticipation. Would Steve be able to reach his friend? The tension was palpable as everyone waited for the rescue to begin.</p>
                  </div>
                  <div className="video-wrapper">
                    <video controls playsInline loop>
                      <source src="/videos/people waiting.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="video-story-item">
                  <div className="story-caption">
                    <h4>Chapter 5: Rising to the Occasion</h4>
                    <p>With the skyjack fired up, Steve began his ascent. The powerful machine lifted him skyward, closing the distance between the ground and his stranded friend. This was the moment—Steve was coming to the rescue.</p>
                  </div>
                  <div className="video-wrapper">
                    <video controls playsInline loop>
                      <source src="/videos/steve to the rescue.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="video-story-item">
                  <div className="story-caption">
                    <h4>Chapter 6: The Dramatic Rescue</h4>
                    <p>Higher and higher Steve climbed, maneuvering the skyjack with precision. The crowd held their breath as he approached Rudy's position. Every movement mattered. Every second counted. This was friendship in action.</p>
                  </div>
                  <div className="video-wrapper">
                    <video controls playsInline loop>
                      <source src="/videos/the rescue.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="video-story-item">
                  <div className="story-caption">
                    <h4>Chapter 7: Safe and Sound</h4>
                    <p>Finally, Steve reached the top. With steady hands and a reassuring voice, he helped Rudy onto the platform. Relief washed over both of them. The descent was slow but safe, and as they touched ground, the crowd erupted in applause. No friend left above—mission accomplished.</p>
                  </div>
                  <div className="video-wrapper">
                    <img src={huggingPhoto} alt="Steve and Rudy reunited" style={{width: '100%', height: 'auto', borderRadius: '8px'}} />
                  </div>
                </div>

                <div className="story-epilogue">
                  <h4>💙 The Moral of the Story</h4>
                  <p>Some friendships are tested by distance, others by time. Steve and Rudy's friendship was tested by height—and it passed with flying colors. When a bee caused chaos and fear sent Rudy climbing, Steve didn't think twice. He grabbed a skyjack and went straight up to save his friend.</p>
                  <p><strong>Because that's what best friends do.</strong></p>
                </div>
              </div>
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
