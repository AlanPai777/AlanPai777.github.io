import { Globe } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="relative z-20 px-6 py-6">
      <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Globe size={24} className="text-white" />
          <span className="text-white font-semibold text-lg ml-2">Alan</span>
          <div className="hidden md:flex items-center gap-8 ml-8">
            <a href="/#about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              About
            </a>
            <a href="/work/" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Work
            </a>
            <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Blog
            </a>
            <a href="/#contact" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
