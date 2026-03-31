import React, { useEffect, useRef, useState } from 'react'

const FadeIn = ({ children, delay = 0, duration = 500, threshold = 0.1 }) => {
  const isObserverSupported =
    typeof window !== 'undefined' && 'IntersectionObserver' in window
  const [isVisible, setIsVisible] = useState(!isObserverSupported)
  const elementRef = useRef(null)

  useEffect(() => {
    // Fallback for environments where IntersectionObserver is unavailable.
    if (!isObserverSupported) {
      return
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        //Trigger animation when the element is in viewport
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px', //Trigger slightly before the element is fully in view
      },
    )

    // Safety net so the page never stays blank if observer doesn't fire.
    const revealTimer = window.setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true)
      }
    }, 700)

  
    if (element) {
      observer.observe(element)
    }

    return () => {
      window.clearTimeout(revealTimer)
      if (element) {
        observer.unobserve(element)
      }
    };
  }, [threshold, isVisible, isObserverSupported])

  return (
    <div
      ref={elementRef}
      className={isVisible ? 'animate-fadeIn' : 'opacity-0'}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        animationDuration: `${duration}ms`,
        animationFillMode: 'both',
      }}
    >
      {children}
    </div>
  )
}

export default FadeIn
