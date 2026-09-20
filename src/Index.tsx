import { InstagramIcon, TwitterIcon } from './components/icons'
import { Globe } from 'lucide-react'
import CrossfadeVideo from './components/CrossfadeVideo'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import PhilosophySection from './components/PhilosophySection'
import ServicesSection from './components/ServicesSection'

const HERO_VIDEO_URL = '/videos/hero.mp4'

function Hero() {
  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col bg-black">
      <CrossfadeVideo src={HERO_VIDEO_URL} className="absolute inset-0 w-full h-full object-cover object-bottom" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-8"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Hi, I'm Alan.
        </h1>

        <p className="text-white text-sm leading-relaxed px-4 max-w-xl mb-8">
          A Computer Science student exploring AI and machine learning through hands-on projects.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="bg-white rounded-full px-8 py-3 text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            View My Work
          </button>
          <button
            type="button"
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Get in touch
          </button>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button
          type="button"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <InstagramIcon size={20} />
        </button>
        <button
          type="button"
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <TwitterIcon size={20} />
        </button>
        <button
          type="button"
          aria-label="Website"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe size={20} />
        </button>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <div className="bg-black">
      <Hero />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  )
}
