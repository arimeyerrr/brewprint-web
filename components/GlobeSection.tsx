'use client'
import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateInView from './AnimateInView'

const GEO_URL = '/us-states.json'

// FIPS code → terrain zone
const TERRAIN: Record<string, string> = {
  // Pacific Coast — coastal evergreen
  '53': '#122414', '41': '#102212', '06': '#0e2010',
  // Northern Rockies — conifer/alpine
  '16': '#1c1e0c', '30': '#1a1c0a', '56': '#1e200c',
  // Southern Rockies — mixed mountain
  '08': '#221e0e', '49': '#201c0c', '32': '#201e0c',
  // Desert Southwest
  '04': '#2e2210', '35': '#2c200e',
  // Great Plains
  '38': '#1e1e08', '46': '#1c1e08', '31': '#1e1e08',
  '20': '#1e1e08', '48': '#201e0a', '40': '#1e1c08',
  '19': '#181e08', '27': '#161e08',
  // Great Lakes / Midwest forest
  '26': '#122010', '55': '#102010', '17': '#121e0c',
  '18': '#121e0c', '39': '#121e0c', '29': '#141e0c',
  // Southeast — humid subtropical
  '22': '#0e200e', '28': '#0e1e0c', '01': '#0e200c',
  '12': '#0c1e0a', '13': '#0e2010', '45': '#0e200e',
  '05': '#101e0c', '37': '#101e0a', '47': '#121e0c',
  '21': '#121e0c', '54': '#142010', '51': '#122010',
  // Mid-Atlantic / Northeast
  '24': '#121e0c', '10': '#121e0c', '34': '#101e0a',
  '42': '#121e0c', '11': '#121e0c', '36': '#101c0a',
  '09': '#0e1e0a', '44': '#0e1c08', '25': '#0e1c08',
  '50': '#0e1c08', '33': '#0e1c08', '23': '#0e1c0a',
}

function getTerrainFill(id: string) {
  return TERRAIN[id] || '#101e0a'
}
function getTerrainHover(id: string) {
  const base = TERRAIN[id] || '#101e0a'
  return base.replace(
    /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i,
    (_, r, g, b) => {
      const bump = (v: string) => Math.min(255, parseInt(v, 16) + 18).toString(16).padStart(2, '0')
      return `#${bump(r)}${bump(g)}${bump(b)}`
    }
  )
}

const CITIES = [
  { name: 'New York',      note: 'Top match in your area',      lon: -74.01,  lat: 40.71, score: 9.2 },
  { name: 'Los Angeles',   note: 'Great specialty scene',        lon: -118.24, lat: 34.05, score: 8.8 },
  { name: 'Chicago',       note: 'High match density',           lon: -87.65,  lat: 41.85, score: 9.4 },
  { name: 'Miami',         note: 'Trending near you',            lon: -80.19,  lat: 25.77, score: 8.6 },
  { name: 'Austin',        note: 'Your best match city',         lon: -97.74,  lat: 30.27, score: 9.7 },
  { name: 'Seattle',       note: 'Strong pour-over scene',       lon: -122.33, lat: 47.61, score: 9.1 },
  { name: 'San Francisco', note: 'Match-heavy neighborhood',     lon: -122.42, lat: 37.77, score: 8.9 },
  { name: 'Nashville',     note: 'Rising coffee culture',        lon: -86.78,  lat: 36.17, score: 9.3 },
  { name: 'Denver',        note: 'High altitude, great taste',   lon: -104.98, lat: 39.74, score: 8.5 },
  { name: 'Portland',      note: 'Legendary roast scene',        lon: -122.68, lat: 45.52, score: 9.0 },
  { name: 'Boston',        note: 'Historic shop culture',        lon: -71.06,  lat: 42.36, score: 8.7 },
  { name: 'Atlanta',       note: 'Growing specialty market',     lon: -84.39,  lat: 33.75, score: 9.2 },
]

export default function GlobeSection() {
  const [activeCity, setActiveCity] = useState(CITIES[4])
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveCity(c => {
      const i = CITIES.indexOf(c)
      return CITIES[(i + 1) % CITIES.length]
    }), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="globe" className="relative overflow-hidden bg-black" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0" style={{ background: '#07101e' }} />

      {/* Heading */}
      <div className="absolute top-0 inset-x-0 z-10 pt-20 text-center px-6">
        <AnimateInView>
          <h2 className="font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Every Shop. Your Score.
          </h2>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <p className="text-white/30 text-sm max-w-sm mx-auto">
            Click any city to see your personal match score.
          </p>
        </AnimateInView>
      </div>

      {/* Map */}
      <motion.div
        className="w-full"
        style={{ paddingTop: 100 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 900 }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo, i) => {
                const id = geo.id as string
                const fill = hoveredState === id ? getTerrainHover(id) : getTerrainFill(id)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        outline: 'none',
                        opacity: revealed ? 1 : 0,
                        transition: `opacity ${0.5 + i * 0.012}s ease, fill 0.25s ease`,
                      },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => setHoveredState(id)}
                    onMouseLeave={() => setHoveredState(null)}
                  />
                )
              })
            }
          </Geographies>

          {/* City markers */}
          {CITIES.map((city) => {
            const isActive = activeCity.name === city.name
            return (
              <Marker
                key={city.name}
                coordinates={[city.lon, city.lat]}
                onClick={() => setActiveCity(city)}
              >
                {/* Pulse ring */}
                {isActive && (
                  <motion.circle
                    r={10}
                    fill="none"
                    stroke="#D98E4A"
                    strokeWidth={1}
                    animate={{ r: [8, 16], opacity: [0.7, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                {/* Dot */}
                <motion.circle
                  r={isActive ? 5 : 3.5}
                  fill="#D98E4A"
                  stroke={isActive ? 'rgba(217,142,74,0.35)' : 'rgba(0,0,0,0.5)'}
                  strokeWidth={isActive ? 3 : 1}
                  style={{
                    cursor: 'pointer',
                    filter: isActive
                      ? 'drop-shadow(0 0 6px rgba(217,142,74,1))'
                      : 'drop-shadow(0 0 3px rgba(217,142,74,0.6))',
                    transition: 'r 0.3s ease, filter 0.3s ease',
                  }}
                />
              </Marker>
            )
          })}
        </ComposableMap>
      </motion.div>

      {/* City info card */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCity.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-4 px-7 py-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              minWidth: 260,
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: '#D98E4A', boxShadow: '0 0 10px rgba(217,142,74,0.9)' }} />
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">{activeCity.name}</div>
              <div className="text-white/35 text-xs mt-0.5">{activeCity.note}</div>
            </div>
            <div className="pl-4 border-l border-white/10 text-right">
              <div className="font-bold text-xl leading-none" style={{ color: '#D98E4A' }}>{activeCity.score}</div>
              <div className="text-white/25 text-[10px] mt-0.5">your match</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
