'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import AnimateInView from './AnimateInView'

const COFFEE_REGIONS = [
  { name: 'Ethiopia', note: 'Birthplace of coffee', lat: 9, lon: 38 },
  { name: 'Colombia', note: 'Smooth, caramel sweetness', lat: 4, lon: -74 },
  { name: 'Brazil', note: "World's top producer", lat: -10, lon: -51 },
  { name: 'Vietnam', note: 'Bold robusta blends', lat: 16, lon: 108 },
  { name: 'Guatemala', note: 'Dark chocolate & spice', lat: 15, lon: -90 },
  { name: 'Kenya', note: 'Berry-bright acidity', lat: -1, lon: 37 },
  { name: 'Indonesia', note: 'Earthy, full body', lat: -8, lon: 115 },
  { name: 'Mexico', note: 'Mild, nutty finish', lat: 17, lon: -92 },
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
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 1000)
    camera.position.z = 3.0

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const group = new THREE.Group()
    scene.add(group)

    // Lighting
    scene.add(new THREE.AmbientLight(0x0a1525, 1.2))
    const bluePt = new THREE.PointLight(0x1a4a8a, 1.8, 12)
    bluePt.position.set(-2.5, 1.5, 2)
    scene.add(bluePt)
    const amberPt = new THREE.PointLight(0xD98E4A, 0.6, 12)
    amberPt.position.set(3, -1, 1)
    scene.add(amberPt)

    // Ocean sphere base
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x020c1a,
      roughness: 0.6,
      metalness: 0.3,
    })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(0.99, 64, 64), oceanMat))

    // Grid line materials
    const gridMat = new THREE.LineBasicMaterial({ color: 0x1a3a60, opacity: 0.3, transparent: true })
    const equatorMat = new THREE.LineBasicMaterial({ color: 0x2a5a90, opacity: 0.55, transparent: true })
    const beltMat = new THREE.LineBasicMaterial({ color: 0x4a2808, opacity: 0.4, transparent: true })

    const makeLine = (points: THREE.Vector3[], mat: THREE.LineBasicMaterial) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      group.add(new THREE.Line(geo, mat))
    }

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 361; i++) {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = i * (Math.PI / 180)
        pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)))
      }
      makeLine(pts, lat === 0 ? equatorMat : gridMat)
    }

    // Coffee belt (tropics) in amber
    for (const lat of [23.5, -23.5]) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 361; i++) {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = i * (Math.PI / 180)
        pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)))
      }
      makeLine(pts, beltMat)
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

    // Atmosphere glow ring
    const atmosphereGeo = new THREE.SphereGeometry(1.08, 64, 64)
    const atmosphereMat = new THREE.MeshStandardMaterial({
      color: 0x0a1e3a,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    })
    group.add(new THREE.Mesh(atmosphereGeo, atmosphereMat))

    // Coffee region pins
    const pinPositions = COFFEE_REGIONS.map(r => latLonToVec(r.lat, r.lon))
    const pinArr = new Float32Array(pinPositions.length * 3)
    pinPositions.forEach(([x, y, z], i) => {
      pinArr[i * 3] = x; pinArr[i * 3 + 1] = y; pinArr[i * 3 + 2] = z
    })
    const pinGeo = new THREE.BufferGeometry()
    pinGeo.setAttribute('position', new THREE.BufferAttribute(pinArr, 3))
    group.add(new THREE.Points(pinGeo, new THREE.PointsMaterial({ color: 0xD98E4A, size: 0.07, sizeAttenuation: true })))

    // Pulse rings around each coffee region
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
          x + (Math.cos(a) * right.x + Math.sin(a) * fwd.x) * 0.1,
          y + (Math.cos(a) * right.y + Math.sin(a) * fwd.y) * 0.1,
          z + (Math.cos(a) * right.z + Math.sin(a) * fwd.z) * 0.1,
        ))
      }
      const rGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const rMat = new THREE.LineBasicMaterial({ color: 0xD98E4A, opacity: 0.25, transparent: true })
      const mesh = new THREE.Line(rGeo, rMat)
      group.add(mesh)
      rings.push({ mesh, phase: Math.random() * Math.PI * 2 })
    })

    // Interaction
    const AUTO_ROT = 0.0016
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

    // Cycle active region
    const regionTimer = setInterval(() => {
      setActiveIdx(i => (i + 1) % COFFEE_REGIONS.length)
    }, 3000)

    let t = 0
    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.016
      if (!dragging) {
        velX *= 0.90; velY *= 0.90
        group.rotation.y += velY + AUTO_ROT
        group.rotation.x += velX
        group.rotation.x = Math.max(-0.42, Math.min(0.42, group.rotation.x))
      }
      rings.forEach(({ mesh, phase }) => {
        const pulse = 0.92 + 0.12 * Math.sin(t * 1.8 + phase)
        mesh.scale.setScalar(pulse)
        ;(mesh.material as THREE.LineBasicMaterial).opacity = 0.1 + 0.22 * Math.abs(Math.sin(t * 1.8 + phase))
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

  const region = COFFEE_REGIONS[activeIdx]

  return (
    <section id="globe" className="relative bg-black overflow-hidden" style={{ minHeight: '100vh' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(18,7,2,0.55) 0%, transparent 70%)' }}
      />

      <div className="absolute top-0 inset-x-0 z-10 pt-24 text-center px-6">
        <AnimateInView>
          <h2 className="font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            coffee, everywhere.<br />scored for you.
          </h2>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <p className="text-white/28 text-sm max-w-sm mx-auto">
            Drag to explore — amber points mark the world's great coffee origins. Your match score travels with you.
          </p>
        </AnimateInView>
      </div>

      <div ref={containerRef} className="w-full" style={{ height: '100vh' }}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ cursor: 'grab' }} />
      </div>

      {/* Coffee belt legend */}
      <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-10 flex flex-col items-end gap-3">
        <div className="flex items-center gap-2">
          <span className="text-white/20 text-[10px] tracking-widest uppercase">coffee belt</span>
          <div className="w-6 h-px" style={{ background: 'rgba(100,45,12,0.7)' }} />
        </div>
      </div>

      {/* Active region card */}
      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-7 py-4 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          minWidth: 240,
          transition: 'opacity 0.4s',
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: '#D98E4A', boxShadow: '0 0 10px rgba(217,142,74,0.9)' }}
        />
        <div>
          <div className="text-white text-sm font-semibold">{region.name}</div>
          <div className="text-white/35 text-xs mt-0.5">{region.note}</div>
        </div>
        <div className="ml-auto pl-4 border-l border-white/10 text-right">
          <div className="text-amber font-bold text-lg leading-none">9.{(activeIdx * 3 + 1) % 9 + 1}</div>
          <div className="text-white/25 text-[10px] mt-0.5">your match</div>
        </div>
      </div>
    </section>
  )
}
