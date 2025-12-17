"use client"

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps {
    end: number
    duration?: number
    label: string
    suffix?: string
}

export function StatCounter({ end, duration = 2000, label, suffix = '' }: StatCounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return

        let startTime: number | null = null
        const startValue = 0

        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const currentCount = Math.floor(easeOut * (end - startValue) + startValue)

            setCount(currentCount)

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                setCount(end)
            }
        }

        requestAnimationFrame(animate)
    }, [isInView, end, duration])

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {count}{suffix}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">{label}</div>
        </div>
    )
}

export function StatsSection() {
    const stats = [
        { end: 5, suffix: '+', label: 'Années d\'Expérience' },
        { end: 20, suffix: '+', label: 'Projets Réalisés' },
        { end: 15, suffix: '+', label: 'Technologies Maîtrisées' },
        { end: 100, suffix: '%', label: 'Satisfaction Client' },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {stats.map((stat, index) => (
                <StatCounter key={index} {...stat} />
            ))}
        </div>
    )
}
