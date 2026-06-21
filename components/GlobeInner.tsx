'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CITIES: [number, number][] = [
  [40.71, -74.01],   // New York
  [34.05, -118.24],  // Los Angeles
  [41.88, -87.63],   // Chicago
  [37.77, -122.42],  // San Francisco
  [29.76, -95.37],   // Houston
  [25.76, -80.19],   // Miami
  [47.61, -122.33],  // Seattle
  [33.45, -112.07],  // Phoenix
  [30.27, -97.74],   // Austin
  [38.91, -77.04],   // Washington D.C.
  [32.78, -96.80],   // Dallas
  [36.16, -86.78],   // Nashville
  [45.51, -122.68],  // Portland
  [29.95, -90.07],   // New Orleans
  [39.74, -104.98],  // Denver
  [42.36, -71.06],   // Boston
  [33.75, -84.39],   // Atlanta
  [35.23, -80.84],   // Charlotte
  [44.98, -93.27],   // Minneapolis
  [36.17, -115.14],  // Las Vegas
  [32.72, -117.16],  // San Diego
]

function latLonToVec3(lat: number, lon: number, r = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

export default function GlobeInner() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Scene & camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100)
    camera.position.z = 3.0

    // Group so everything rotates together
    const group = new THREE.Group()
    group.rotation.x = 0.22   // slight tilt to show US prominently
    scene.add(group)

    // Globe sphere
    group.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1, 72, 72),
        new THREE.MeshPhongMaterial({
          color: new THREE.Color('#060200'),
          emissive: new THREE.Color('#1C0900'),
          emissiveIntensity: 0.45,
          shininess: 8,
        })
      )
    )

    // Lat/lon grid
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x2E1106,
      transparent: true,
      opacity: 0.55,
    })
    for (let lat = -70; lat <= 70; lat += 20) {
      const pts: THREE.Vector3[] = []
      for (let lon = 0; lon <= 360; lon += 2) pts.push(latLonToVec3(lat, lon - 180, 1.004))
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat))
    }
    for (let lon = 0; lon < 360; lon += 20) {
      const pts: THREE.Vector3[] = []
      for (let lat = -90; lat <= 90; lat += 2) pts.push(latLonToVec3(lat, lon - 180, 1.004))
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat))
    }

    // City markers
    CITIES.forEach(([lat, lon]) => {
      const pos = latLonToVec3(lat, lon, 1.022)

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.013, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xD98E4A })
      )
      core.position.copy(pos)
      group.add(core)

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.020, 0.034, 20),
        new THREE.MeshBasicMaterial({
          color: 0xD98E4A, transparent: true, opacity: 0.28, side: THREE.DoubleSide,
        })
      )
      halo.position.copy(pos)
      halo.lookAt(pos.clone().multiplyScalar(3))
      group.add(halo)
    })

    // Atmosphere halo (stays in scene, not group)
    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.18, 32, 32),
        new THREE.MeshPhongMaterial({
          color: new THREE.Color('#5C2A08'),
          transparent: true, opacity: 0.06, side: THREE.BackSide,
        })
      )
    )

    // Lighting
    scene.add(new THREE.AmbientLight(0x0F0603, 3))
    const sun = new THREE.DirectionalLight(0xFFE0A0, 2.2)
    sun.position.set(5, 3, 5)
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0x3A1608, 0.6)
    fill.position.set(-5, -2, -5)
    scene.add(fill)

    // Interactive drag
    let isDragging = false
    let prevX = 0

    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevX = e.clientX }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      group.rotation.y += (e.clientX - prevX) * 0.006
      prevX = e.clientX
    }
    const onMouseUp = () => { isDragging = false }

    // Touch drag
    const onTouchStart = (e: TouchEvent) => { isDragging = true; prevX = e.touches[0].clientX }
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      group.rotation.y += (e.touches[0].clientX - prevX) * 0.006
      prevX = e.touches[0].clientX
    }

    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('mouseleave', onMouseUp)
    renderer.domElement.addEventListener('touchstart', onTouchStart)
    renderer.domElement.addEventListener('touchmove', onTouchMove)
    renderer.domElement.addEventListener('touchend', onMouseUp)
    renderer.domElement.style.cursor = 'grab'

    // Animate
    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!isDragging) group.rotation.y += 0.0025
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!mount) return
      const W = mount.clientWidth
      const H = mount.clientHeight
      renderer.setSize(W, H)
      camera.aspect = W / H
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('mousedown', onMouseDown)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('mouseup', onMouseUp)
      renderer.domElement.removeEventListener('mouseleave', onMouseUp)
      renderer.domElement.removeEventListener('touchstart', onTouchStart)
      renderer.domElement.removeEventListener('touchmove', onTouchMove)
      renderer.domElement.removeEventListener('touchend', onMouseUp)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
