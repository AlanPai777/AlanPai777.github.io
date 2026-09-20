import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import CrossfadeVideo from './components/CrossfadeVideo'
import Navbar from './components/Navbar'

const HERO_VIDEO_URL = '/videos/hero.mp4'

interface Work {
  title: string
  description: string
  url: string
}

const WORKS: Work[] = [
  {
    title: 'NCCU Agentic RAG',
    description:
      'An agentic QA system that answers cross-office administrative questions using keyword search and tool-calling instead of dense retrieval — deployable locally on an open-weight model.',
    url: '/projects/agentic-rag/',
  },
  {
    title: 'Quantum Error Bursts',
    description:
      'Stim + PyMatching simulations showing that a burst\'s size relative to the code, and its orientation, predict logical failure better than its absolute size.',
    url: '/projects/qec-burst-scaling/',
  },
  {
    title: 'Shallow ResNet',
    description:
      'A parameter-matched, three-seed CIFAR-10 ablation: removing skip connections has no detectable effect at 8 layers but costs about 2.5 points at 20.',
    url: '/projects/shallow-resnet/',
  },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col bg-black">
      <CrossfadeVideo src={HERO_VIDEO_URL} className="absolute inset-0 w-full h-full object-cover object-bottom" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-4"
        >
          Selected Work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-white text-5xl md:text-6xl tracking-tight mb-12 text-center"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Things I've built.
        </motion.h1>

        <div className="w-full max-w-3xl flex flex-col gap-4">
          {WORKS.map((work, index) => (
            <motion.a
              key={work.title}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="liquid-glass rounded-2xl px-6 py-6 md:px-10 md:py-8 flex items-center justify-between gap-6 hover:bg-white/5 transition-colors group"
            >
              <div>
                <h2
                  className="text-white text-2xl md:text-4xl tracking-tight mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {work.title}
                </h2>
                <p className="text-white/50 text-sm md:text-base">{work.description}</p>
              </div>
              <ArrowUpRight
                size={28}
                className="text-white/50 group-hover:text-white transition-colors flex-shrink-0"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
