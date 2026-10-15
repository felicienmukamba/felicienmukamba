/**
 * Moteur de Motion Design poussé pour Cartes Bancaires & Applications.
 * Fournit :
 * - Simulation interactive 3D (Retournement 3D, Tap-to-Pay NFC, Flottaison Parallaxe, Insertion TPE/POS)
 * - Générateur de code prêt à l'emploi : Framer Motion (React/Next.js), Flutter (Mobile Dart/AnimationController), et CSS Keyframes
 * - Export en SVG animé autonome (SMIL / CSS interne)
 */

export type MotionMode = "flip-3d" | "tap-nfc" | "parallax-float" | "pos-insert" | "hologram-glow"

export interface MotionConfig {
  mode: MotionMode
  durationMs: number
  springStiffness: number
  springDamping: number
  perspective: number
  autoPlay: boolean
  tiltIntensity: number
  hologramColor: string
}

export const DEFAULT_MOTION_CONFIG: MotionConfig = {
  mode: "flip-3d",
  durationMs: 1400,
  springStiffness: 260,
  springDamping: 20,
  perspective: 1200,
  autoPlay: true,
  tiltIntensity: 18,
  hologramColor: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 30%, #45B7D1 60%, #96CEB4 100%)",
}

/**
 * Génère le code Framer Motion (React)
 */
export function generateFramerMotionCode(config: MotionConfig, brandName: string = "SOSIDE"): string {
  switch (config.mode) {
    case "flip-3d":
      return `import { motion } from "framer-motion"
import { useState } from "react"

export function FlippingCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div style={{ perspective: ${config.perspective} }} className="w-80 h-52 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: ${config.springStiffness}, damping: ${config.springDamping} }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-2xl shadow-2xl"
      >
        {/* Face Avant */}
        <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-indigo-900 text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-bold tracking-widest text-lg">${brandName} PAY</span>
            <div className="w-9 h-7 rounded bg-amber-400 border border-amber-300" />
          </div>
          <div className="font-mono text-lg tracking-widest">•••• •••• •••• 4289</div>
          <div className="flex justify-between text-xs text-blue-200">
            <span>TITULAIRE DE CARTE</span>
            <span>12/28</span>
          </div>
        </div>

        {/* Face Arrière */}
        <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0 rounded-2xl bg-slate-900 text-white flex flex-col justify-between overflow-hidden">
          <div className="w-full h-11 bg-black mt-5" />
          <div className="px-6 flex items-center justify-end gap-3">
            <div className="h-7 flex-1 bg-white/90 rounded text-slate-800 text-right pr-2 text-xs font-mono flex items-center justify-end">
              CVV: 842
            </div>
          </div>
          <div className="px-6 pb-5 text-[10px] text-slate-400">
            Émise sous licence ${brandName}. Sécurité biométrique intégrée.
          </div>
        </div>
      </motion.div>
    </div>
  )
}`

    case "tap-nfc":
      return `import { motion } from "framer-motion"

export function NfcTapPayment() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      {/* Ondes sans-contact NFC */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-emerald-400"
          initial={{ width: 40, height: 40, opacity: 0.8 }}
          animate={{ width: 220, height: 220, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
        />
      ))}

      {/* Carte arrivant sur la borne */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="z-10 w-72 h-44 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-950 p-5 text-white shadow-2xl flex flex-col justify-between"
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm tracking-widest">${brandName}</span>
          <span className="text-xs bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">NFC ACTIF</span>
        </div>
        <div className="font-mono text-base tracking-widest">•••• 7719</div>
        <div className="text-[11px] text-blue-200">Sans contact vérifié</div>
      </motion.div>
    </div>
  )
}`

    case "parallax-float":
      return `import { motion, useMotionValue, useTransform } from "framer-motion"

export function ParallaxStackedCards() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])

  return (
    <div
      style={{ perspective: ${config.perspective} }}
      className="relative w-80 h-64 flex items-center justify-center cursor-pointer"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {/* Carte Arrière */}
      <motion.div
        style={{ rotateX, rotateY, z: -40, rotateZ: -12 }}
        className="absolute w-64 h-40 rounded-xl bg-blue-400/70 shadow-lg border border-white/20"
      />
      {/* Carte Avant Principale */}
      <motion.div
        style={{ rotateX, rotateY, z: 40 }}
        className="w-64 h-40 rounded-xl bg-white shadow-2xl p-4 flex flex-col justify-between border border-blue-100"
      >
        <div className="w-8 h-6 rounded bg-amber-400" />
        <div className="font-mono text-xs text-slate-800">4289 •••• •••• 9901</div>
      </motion.div>
    </div>
  )
}`

    default:
      return `/* Custom Motion */`
  }
}

/**
 * Génère le code Flutter / Dart
 */
export function generateFlutterCode(config: MotionConfig, brandName: string = "SOSIDE"): string {
  return `import 'dart:math' as math;
import 'package:flutter/material.dart';

class ${brandName}CardMotion extends StatefulWidget {
  const ${brandName}CardMotion({super.key});

  @override
  State<${brandName}CardMotion> createState() => _${brandName}CardMotionState();
}

class _${brandName}CardMotionState extends State<${brandName}CardMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  bool _isFlipped = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: ${config.durationMs}),
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.fastOutSlowIn,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _flip() {
    setState(() {
      if (_isFlipped) {
        _controller.reverse();
      } else {
        _controller.forward();
      }
      _isFlipped = !_isFlipped;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _flip,
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          final angle = _animation.value * math.pi;
          final isBack = angle > math.pi / 2;
          return Transform(
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001) // perspective
              ..rotateY(angle),
            alignment: Alignment.center,
            child: isBack
                ? Transform(
                    transform: Matrix4.identity()..rotateY(math.pi),
                    alignment: Alignment.center,
                    child: _buildBack(),
                  )
                : _buildFront(),
          );
        },
      ),
    );
  }

  Widget _buildFront() {
    return Container(
      width: 320,
      height: 200,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Color(0xFF347CEC), Color(0xFF0B3D91)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF031642).withOpacity(0.35),
            blurRadius: 24,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${brandName} PAY',
                  style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2)),
              Container(
                width: 38,
                height: 28,
                decoration: BoxDecoration(
                  color: const Color(0xFFFFCC00),
                  borderRadius: BorderRadius.circular(6),
                ),
              ),
            ],
          ),
          const Text('•••• •••• •••• 4289',
              style: TextStyle(
                  color: Colors.white,
                  fontFamily: 'monospace',
                  fontSize: 18,
                  letterSpacing: 4)),
          const Text('SECOURS & TECHNOLOGIE',
              style: TextStyle(color: Colors.white70, fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildBack() {
    return Container(
      width: 320,
      height: 200,
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          const SizedBox(height: 28),
          Container(height: 44, color: Colors.black),
          const SizedBox(height: 24),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Container(
              height: 32,
              color: Colors.white,
              alignment: Alignment.centerRight,
              padding: const EdgeInsets.only(right: 8),
              child: const Text('842',
                  style: TextStyle(
                      color: Colors.black,
                      fontFamily: 'monospace',
                      fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }
}`
}

/**
 * Génère le code CSS & Tailwind
 */
export function generateCssMotionCode(config: MotionConfig): string {
  return `/* CSS Keyframes pour Cartes Bancaires */
@keyframes card-flip {
  0% { transform: perspective(${config.perspective}px) rotateY(0deg); }
  50% { transform: perspective(${config.perspective}px) rotateY(90deg) scale(1.04); }
  100% { transform: perspective(${config.perspective}px) rotateY(180deg); }
}

@keyframes nfc-wave {
  0% { transform: scale(0.6); opacity: 0.9; }
  100% { transform: scale(2.4); opacity: 0; }
}

@keyframes card-hover-float {
  0%, 100% { transform: translateY(0px) rotate(-1deg); }
  50% { transform: translateY(-10px) rotate(1.5deg); }
}

.soside-card-animated {
  animation: card-hover-float 3.6s ease-in-out infinite;
  transform-style: preserve-3d;
}

/* Utilitaires Tailwind équivalents :
   - perspective: [${config.perspective}px]
   - animate-[card-hover-float_3.6s_ease-in-out_infinite]
   - transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
*/`
}

/**
 * Génère un SVG entièrement animé (SMIL / CSS interne) qui fonctionne partout
 */
export function generateAnimatedCardSvg(brandName: string = "SOSIDE"): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="card-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#347CEC" />
      <stop offset="100%" stop-color="#0B3D91" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#031642" flood-opacity="0.35" />
    </filter>
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-16px) rotate(-2deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.08); }
      }
      .card-group {
        animation: float 4s ease-in-out infinite;
        transform-origin: 400px 300px;
      }
      .wave {
        animation: pulse 2.4s ease-in-out infinite;
        transform-origin: 640px 180px;
      }
    </style>
  </defs>

  <!-- Fond subtil -->
  <rect width="100%" height="100%" fill="#0C0D14" rx="28" />

  <!-- Ondes NFC -->
  <circle class="wave" cx="640" cy="180" r="48" fill="none" stroke="#4C8DFF" stroke-width="4" />
  <circle class="wave" cx="640" cy="180" r="32" fill="none" stroke="#4C8DFF" stroke-width="3" style="animation-delay: 0.4s" />

  <!-- Groupe Carte Principale -->
  <g class="card-group">
    <!-- Carte Arrière Inclinée -->
    <rect x="220" y="160" width="400" height="250" rx="22" fill="#A8C8FF" transform="rotate(-10 400 300)" opacity="0.85" />
    
    <!-- Carte Avant Blanche -->
    <rect x="200" y="180" width="400" height="250" rx="22" fill="#FFFFFF" filter="url(#shadow)" />
    
    <!-- Puce EMV Jaune -->
    <rect x="240" y="220" width="60" height="48" rx="10" fill="#FFCC00" />
    
    <!-- Lignes de carte gaufrées -->
    <line x1="240" y1="340" x2="310" y2="340" stroke="#CDDDF7" stroke-width="16" stroke-linecap="round" />
    <line x1="330" y1="340" x2="400" y2="340" stroke="#CDDDF7" stroke-width="16" stroke-linecap="round" />
    <line x1="420" y1="340" x2="490" y2="340" stroke="#CDDDF7" stroke-width="16" stroke-linecap="round" />
    <line x1="510" y1="340" x2="560" y2="340" stroke="#CDDDF7" stroke-width="16" stroke-linecap="round" />
    
    <!-- Logo & Marque -->
    <text x="560" y="248" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0B3D91" text-anchor="end">${brandName} PAY</text>
  </g>
</svg>`
}
