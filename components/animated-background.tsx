"use client"

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        setCanvasSize()
        window.addEventListener('resize', setCanvasSize)

        // Gradient colors (theme-aware would be ideal, but keeping it simple)
        const colors = [
            { r: 59, g: 130, b: 246 },   // blue-500
            { r: 139, g: 92, b: 246 },   // violet-500
            { r: 236, g: 72, b: 153 },   // pink-500
        ]

        let time = 0

        const animate = () => {
            time += 0.002

            // Create animated gradient
            const gradient = ctx.createLinearGradient(
                0,
                0,
                canvas.width,
                canvas.height
            )

            const color1 = colors[0]
            const color2 = colors[1]
            const color3 = colors[2]

            // Animate color positions
            const offset1 = (Math.sin(time) + 1) / 2
            const offset2 = (Math.sin(time + 2) + 1) / 2
            const offset3 = (Math.sin(time + 4) + 1) / 2

            gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.1)`)
            gradient.addColorStop(offset1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.15)`)
            gradient.addColorStop(offset2, `rgba(${color3.r}, ${color3.g}, ${color3.b}, 0.1)`)
            gradient.addColorStop(1, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.05)`)

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', setCanvasSize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 opacity-50"
            aria-hidden="true"
        />
    )
}
