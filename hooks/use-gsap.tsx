"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger, appleEase, smoothEase } from "@/lib/gsap-config"

export function useGSAP() {
    const animationsRef = useRef<gsap.core.Timeline[]>([])

    useEffect(() => {
        return () => {
            // Cleanup all animations on unmount
            animationsRef.current.forEach((tl) => tl.kill())
            animationsRef.current = []
        }
    }, [])

    const addAnimation = (timeline: gsap.core.Timeline) => {
        animationsRef.current.push(timeline)
    }

    return { gsap, ScrollTrigger, addAnimation, appleEase, smoothEase }
}

// Utility hook for fade-in animations
export function useFadeIn(
    triggerRef: React.RefObject<HTMLElement>,
    options: {
        delay?: number
        duration?: number
        y?: number
        stagger?: number
    } = {}
) {
    useEffect(() => {
        if (!triggerRef.current) return

        const { delay = 0, duration = 0.8, y = 30, stagger = 0 } = options

        const elements = triggerRef.current.children

        const tl = gsap.from(elements, {
            opacity: 0,
            y,
            duration,
            delay,
            stagger,
            ease: appleEase,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        })

        return () => {
            tl.kill()
        }
    }, [triggerRef, options])
}

// Utility hook for scroll-triggered animations
export function useScrollReveal(
    targetRef: React.RefObject<HTMLElement>,
    options: {
        delay?: number
        duration?: number
        y?: number
        x?: number
        scale?: number
    } = {}
) {
    useEffect(() => {
        if (!targetRef.current) return

        const { delay = 0, duration = 1, y = 50, x = 0, scale = 1 } = options

        const tl = gsap.from(targetRef.current, {
            opacity: 0,
            y,
            x,
            scale,
            duration,
            delay,
            ease: appleEase,
            scrollTrigger: {
                trigger: targetRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        })

        return () => {
            tl.kill()
        }
    }, [targetRef, options])
}
