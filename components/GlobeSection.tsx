'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import AnimateInView from './AnimateInView'

export default function GlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const W = container.offsetWidth
    const H = container.offsetHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 1000)
    camera.position.z = 2.8

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const group = new THREE.Group()
    scene.add(group)

    // Wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(1, 48, 48)
    const wireGeo = new THREE.WireframeGeometry(sphereGeo)
    const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.07, transparent: true })
    group.add(new THREE.LineSegments(wireGeo, wireMat))

    // White dots at vertices
    const dotMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.016, sizeAttenuation: true })
    group.add(new THREE.Points(sphereGeo, dotMat))

    // Glass inner sphere
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a12,
      transparent: true,
      opacity: 0.18,
      roughness: 0,
      metalness: 0.1,
    })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(0.98, 48, 48), glassMat))

    // Ambient + point lights for glass effect
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const pt = new THREE.PointLight(0xD98E4A, 1.2, 10)
    pt.position.set(2, 2, 2)
    scene.add(pt)

    // Amber coffee pins on surface
    const pinCoords: [number, number, number][] = [
      [0.62, 0.68, 0.39],
      [-0.51, 0.28, 0.82],
      [0.12, -0.58, 0.81],
      [0.79, -0.22, 0.57],
      [-0.72, 0.62, 0.31],
      [0.28, 0.88, 0.38],
      [0.45, 0.1, -0.89],
      [-0.3, -0.7, 0.65],
    ]
    const pinArr = new Float32Array(pinCoords.length * 3)
    pinCoords.forEach(([x, y, z], i) => {
      const l = Math.sqrt(x * x + y * y + z * z)
      pinArr[i * 3] = x / l
      pinArr[i * 3 + 1] = y / l
      pinArr[i * 3 + 2] = z / l
    })
    const pinGeo = new THREE.BufferGeometry()
    pinGeo.setAttribute('position', new THREE.BufferAttribute(pinArr, 3))
    group.add(new THREE.Points(pinGeo, new THREE.PointsMaterial({ color: 0xD98E4A, size: 0.05, sizeAttenuation: true })))

    // Interaction
    let dragging = false
    let prevX = 0, prevY = 0
    let velX = 0.0025, velY = 0

    const onDown = (x: number, y: number) => { dragging = true; prevX = x; prevY = y; velX = 0; velY = 0 }
    const onMove = (x: number, y: number) => {
      if (!dragging) return
      const dx = (x - prevX) * 0.006
      const dy = (y - prevY) * 0.006
      group.rotation.y += dx
      group.rotation.x += dy
      velX = dx * 0.6; velY = dy * 0.6
      prevX = x; prevY = y
    }
    const onUp = () => { dragging = false }

    canvas.addEventListener('mousedown', e => onDown(e.clientX, e.clientY))
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY))
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', e => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
    window.addEventListener('touchmove', e => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
    window.addEventListener('touchend', onUp)

    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!dragging) {
        group.rotation.y += velX
        group.rotation.x += velY
        velX = velX * 0.98 + 0.0018
        velY *= 0.97
      }
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const w = container.offsetWidth, h = container.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousedown', e => onDown(e.clientX, e.clientY))
      window.removeEventListener('mousemove', e => onMove(e.clientX, e.clientY))
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative bg-black overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Warm center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(61,31,8,0.22) 0%, transparent 70%)' }}
      />

      {/* Heading */}
      <div className="absolute top-0 inset-x-0 z-10 pt-20 pb-6 text-center px-6">
        <AnimateInView>
          <h2
            className="font-bold text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            every shop.<br />your score.
          </h2>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <p className="text-white/30 text-sm max-w-xs mx-auto">
            Drag to explore — each amber point is a coffee shop scored just for you.
          </p>
        </AnimateInView>
      </div>

      {/* Globe */}
      <div ref={containerRef} className="w-full" style={{ height: '100vh' }}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ cursor: 'grab' }} />
      </div>

      {/* Glass score card */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5 px-6 py-4 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          whiteSpace: 'nowrap',
        }}
      >
        <div className="text-center">
          <div className="text-amber font-bold text-2xl leading-none">9.2</div>
          <div className="text-white/25 text-xs mt-1">your match</div>
        </div>
        <div className="w-px h-8 bg-white/8" />
        <div>
          <div className="text-white text-sm font-medium">Onyx Coffee Lab</div>
          <div className="text-white/25 text-xs">top match near you</div>
        </div>
      </div>
    </section>
  )
}
