import { useEffect, useRef } from 'react'

function animateOpacity(
  el: HTMLVideoElement,
  from: number,
  to: number,
  duration: number,
  onComplete?: () => void,
) {
  const start = performance.now()

  const step = (now: number) => {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)
    el.style.opacity = String(from + (to - from) * t)
    if (t < 1) {
      requestAnimationFrame(step)
    } else {
      onComplete?.()
    }
  }

  requestAnimationFrame(step)
}

interface CrossfadeVideoProps {
  src: string
  className?: string
}

export default function CrossfadeVideo({ src, className }: CrossfadeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      video.play().catch(() => {})
      animateOpacity(video, 0, 1, 500)
    }

    const handleTimeUpdate = () => {
      if (fadingOutRef.current || Number.isNaN(video.duration)) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55) {
        fadingOutRef.current = true
        const currentOpacity = Number.parseFloat(video.style.opacity || '1')
        animateOpacity(video, currentOpacity, 0, 500)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        fadingOutRef.current = false
        animateOpacity(video, 0, 1, 500)
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ opacity: 0 }}
      src={src}
      muted
      autoPlay
      playsInline
      preload="auto"
    />
  )
}
