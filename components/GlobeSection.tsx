'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import AnimateInView from './AnimateInView'

const US_CITIES = [
  { name: 'New York', note: 'Top match in your area', lat: 40.71, lon: -74.01, score: 9.2 },
  { name: 'Los Angeles', note: 'Great specialty scene', lat: 34.05, lon: -118.24, score: 8.8 },
  { name: 'Chicago', note: 'High match density', lat: 41.85, lon: -87.65, score: 9.4 },
  { name: 'Miami', note: 'Trending near you', lat: 25.77, lon: -80.19, score: 8.6 },
  { name: 'Austin', note: 'Your best match city', lat: 30.27, lon: -97.74, score: 9.7 },
  { name: 'Seattle', note: 'Strong pour-over scene', lat: 47.61, lon: -122.33, score: 9.1 },
  { name: 'San Francisco', note: 'Match-heavy neighborhood', lat: 37.77, lon: -122.42, score: 8.9 },
  { name: 'Nashville', note: 'Rising coffee culture', lat: 36.17, lon: -86.78, score: 9.3 },
  { name: 'Denver', note: 'High altitude, great taste', lat: 39.74, lon: -104.98, score: 8.5 },
  { name: 'Portland', note: 'Legendary roast scene', lat: 45.52, lon: -122.68, score: 9.0 },
  { name: 'Boston', note: 'Historic shop culture', lat: 42.36, lon: -71.06, score: 8.7 },
  { name: 'Atlanta', note: 'Growing specialty market', lat: 33.75, lon: -84.39, score: 9.2 },
]

function latLonToVec(lat: number, lon: number, r = 1.03): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = lon * (Math.PI / 180)
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

export default function GlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const W = container.offsetWidth
    const H = container.offsetHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 1000)
    camera.position.z = 2.9

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const group = new THREE.Group()
    // Start oriented so US faces viewer
    group.rotation.y = 3.0
    group.rotation.x = 0.12
    scene.add(group)

    // Lighting — bright enough to see the sphere
    scene.add(new THREE.AmbientLight(0x8090b0, 1.0))
    const frontPt = new THREE.PointLight(0xc0d0ff, 2.5, 15)
    frontPt.position.set(0, 1, 4)
    scene.add(frontPt)
    const amberPt = new THREE.PointLight(0xD98E4A, 0.8, 12)
    amberPt.position.set(3, -1, 2)
    scene.add(amberPt)

    // Base sphere — dark ocean, slightly visible
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x060e1c,
      roughness: 0.5,
      metalness: 0.4,
    })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 64, 64), oceanMat))

    // Vertex dot cloud — the "bean" look
    const dotGeo = new THREE.SphereGeometry(1.001, 36, 36)
    group.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({
      color: 0x6080c0,
      size: 0.018,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.65,
    })))

    // Grid line materials
    const gridMat = new THREE.LineBasicMaterial({ color: 0x2a4a80, opacity: 0.45, transparent: true })
    const equatorMat = new THREE.LineBasicMaterial({ color: 0x3a6ab0, opacity: 0.7, transparent: true })

    const makeLine = (pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) => {
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat))
    }

    // Latitude rings
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 361; i++) {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = i * (Math.PI / 180)
        pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)))
      }
      makeLine(pts, lat === 0 ? equatorMat : gridMat)
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 20) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 180; i++) {
        const phi = i * (Math.PI / 180)
        const theta = lon * (Math.PI / 180)
        pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)))
      }
      makeLine(pts, gridMat)
    }

    // Outer atmosphere glow
    const atmMat = new THREE.MeshStandardMaterial({
      color: 0x1a3a6a,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1.12, 64, 64), atmMat))

    // US city pins — amber
    const pinPositions = US_CITIES.map(c => latLonToVec(c.lat, c.lon))
    const pinArr = new Float32Array(pinPositions.length * 3)
    pinPositions.forEach(([x, y, z], i) => {
      pinArr[i * 3] = x; pinArr[i * 3 + 1] = y; pinArr[i * 3 + 2] = z
    })
    const pinGeo = new THREE.BufferGeometry()
    pinGeo.setAttribute('position', new THREE.BufferAttribute(pinArr, 3))
    group.add(new THREE.Points(pinGeo, new THREE.PointsMaterial({
      color: 0xD98E4A,
      size: 0.055,
      sizeAttenuation: true,
    })))

    // Pulse rings around each pin
    const rings: { mesh: THREE.Line; phase: number }[] = []
    pinPositions.forEach(([x, y, z]) => {
      const normal = new THREE.Vector3(x, y, z).normalize()
      const up = Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)
      const right = new THREE.Vector3().crossVectors(normal, up).normalize()
      const fwd = new THREE.Vector3().crossVectors(right, normal).normalize()
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2
        pts.push(new THREE.Vector3(
          x + (Math.cos(a) * right.x + Math.sin(a) * fwd.x) * 0.09,
          y + (Math.cos(a) * right.y + Math.sin(a) * fwd.y) * 0.09,
          z + (Math.cos(a) * right.z + Math.sin(a) * fwd.z) * 0.09,
        ))
      }
      const rMat = new THREE.LineBasicMaterial({ color: 0xD98E4A, opacity: 0.3, transparent: true })
      const mesh = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), rMat)
      group.add(mesh)
      rings.push({ mesh, phase: Math.random() * Math.PI * 2 })
    })

    // Interaction
    const AUTO_ROT = 0.0014
    let dragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0

    const onDown = (x: number, y: number) => { dragging = true; prevX = x; prevY = y; velX = 0; velY = 0 }
    const onMove = (x: number, y: number) => {
      if (!dragging) return
      velY = (x - prevX) * 0.005; velX = (y - prevY) * 0.005
      group.rotation.y += velY; group.rotation.x += velX
      prevX = x; prevY = y
    }
    const onUp = () => { dragging = false }

    canvas.addEventListener('mousedown', e => onDown(e.clientX, e.clientY))
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY))
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', e => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
    window.addEventListener('touchmove', e => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
    window.addEventListener('touchend', onUp)

    const regionTimer = setInterval(() => {
      setActiveIdx(i => (i + 1) % US_CITIES.length)
    }, 2500)

    let t = 0
    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.016
      if (!dragging) {
        velX *= 0.90; velY *= 0.90
        group.rotation.y += velY + AUTO_ROT
        group.rotation.x += velX
        group.rotation.x = Math.max(-0.4, Math.min(0.4, group.rotation.x))
      }
      rings.forEach(({ mesh, phase }) => {
        const pulse = 0.93 + 0.1 * Math.sin(t * 1.6 + phase)
        mesh.scale.setScalar(pulse)
        ;(mesh.material as THREE.LineBasicMaterial).opacity = 0.08 + 0.25 * Math.abs(Math.sin(t * 1.6 + phase))
      })
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const w = container.offsetWidth, h = container.offsetHeight
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(regionTimer)
      window.removeEventListener('mousemove', e => onMove(e.clientX, e.clientY))
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  const city = US_CITIES[activeIdx]

  return (
    <section id="globe" className="relative bg-black overflow-hidden" style={{ minHeight: '100vh' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(20,35,80,0.25) 0%, transparent 70%)' }}
      />

      <div className="absolute top-0 inset-x-0 z-10 pt-24 text-center px-6">
        <AnimateInView>
          <h2 className="font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            every shop.<br />your score.
          </h2>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <p className="text-white/28 text-sm max-w-sm mx-auto">
            Drag to explore — every amber pin is a coffee shop scored specifically for you.
          </p>
        </AnimateInView>
      </div>

      <div ref={containerRef} className="w-full" style={{ height: '100vh' }}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ cursor: 'grab' }} />
      </div>

      {/* City score card */}
      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-7 py-4 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          minWidth: 260,
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: '#D98E4A', boxShadow: '0 0 10px rgba(217,142,74,0.9)' }}
        />
        <div className="flex-1">
          <div className="text-white text-sm font-semibold">{city.name}</div>
          <div className="text-white/35 text-xs mt-0.5">{city.note}</div>
        </div>
        <div className="pl-4 border-l border-white/10 text-right">
          <div className="text-amber font-bold text-xl leading-none">{city.score}</div>
          <div className="text-white/25 text-[10px] mt-0.5">your match</div>
        </div>
      </div>
    </section>
  )
}
