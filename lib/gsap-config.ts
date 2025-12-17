"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Apple-inspired easing functions
export const appleEase = "power4.out"
export const appleEaseInOut = "power4.inOut"
export const smoothEase = "power2.out"

// Default GSAP configuration
gsap.defaults({
  ease: appleEase,
  duration: 0.8,
})

// Smooth scrolling configuration
export const smoothScrollConfig = {
  ease: "power4.inOut",
  duration: 1.2,
}

export { gsap, ScrollTrigger }
