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
  return [r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)]
}

const VERT = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAG = `
varying vec3 vNormal;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y);
}
float fbm(vec2 p) {
  return noise(p)*0.50 + noise(p*2.1+1.3)*0.25 + noise(p*4.5+2.7)*0.125 + noise(p*9.1+0.9)*0.0625;
}

void main() {
  float n  = fbm(vUv * 3.6 + 0.5);
  float n2 = fbm(vUv * 7.2 + 2.1);
  float lat01 = vUv.y;

  // Terrain colors — natural Earth palette
  vec3 abyssOcean = vec3(0.010, 0.040, 0.130);
  vec3 deepOcean  = vec3(0.022, 0.072, 0.200);
  vec3 midOcean   = vec3(0.032, 0.105, 0.260);
  vec3 coastal    = vec3(0.040, 0.148, 0.310);
  vec3 lowland    = vec3(0.120, 0.250, 0.095);
  vec3 forest     = vec3(0.085, 0.200, 0.075);
  vec3 savanna    = vec3(0.240, 0.290, 0.110);
  vec3 highland   = vec3(0.300, 0.260, 0.165);
  vec3 mountain   = vec3(0.380, 0.340, 0.260);
  vec3 snowPeak   = vec3(0.820, 0.840, 0.860);
  vec3 desert     = vec3(0.460, 0.360, 0.165);
  vec3 iceCap     = vec3(0.800, 0.830, 0.870);

  // Classify terrain
  float isLand    = smoothstep(0.440, 0.520, n);
  float isHighl   = smoothstep(0.640, 0.760, n);
  float isMtn     = smoothstep(0.780, 0.900, n);
  float isSnow    = smoothstep(0.890, 0.960, n);
  float isDesert  = smoothstep(0.18, 0.38, lat01) * (1.0 - smoothstep(0.52, 0.72, lat01))
                  * smoothstep(0.50, 0.62, n) * (1.0 - isHighl);
  float polar     = smoothstep(0.72, 0.94, abs(lat01 * 2.0 - 1.0));
  float coastal_t = smoothstep(0.36, 0.44, n);

  // Ocean gradient by depth
  vec3 oceanColor = abyssOcean;
  oceanColor = mix(oceanColor, deepOcean,  smoothstep(0.10, 0.26, n));
  oceanColor = mix(oceanColor, midOcean,   smoothstep(0.26, 0.36, n));
  oceanColor = mix(oceanColor, coastal,    coastal_t * 0.6);

  // Land gradient by elevation
  vec3 baseLand = mix(lowland, savanna, n2 * 0.5);
  baseLand = mix(baseLand, forest, smoothstep(0.3, 0.6, n2) * (1.0 - isDesert));
  vec3 landColor = baseLand;
  landColor = mix(landColor, highland, isHighl * 0.8);
  landColor = mix(landColor, mountain, isMtn * 0.9);
  landColor = mix(landColor, snowPeak, isSnow);
  landColor = mix(landColor, desert,   isDesert * 0.75);

  vec3 color = mix(oceanColor, landColor, isLand);
  color = mix(color, iceCap, polar * 0.92);

  // Directional sunlight
  vec3 lightDir = normalize(vec3(2.0, 0.6, 2.2));
  float diff = max(dot(vNormal, lightDir), 0.0);
  float ambient = 0.22;
  color *= (ambient + (1.0 - ambient) * diff);

  // Atmospheric rim glow (blue haze at edge)
  float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 4.0);
  color += vec3(0.05, 0.18, 0.48) * rim * 0.85;

  // Ocean specular highlight
  vec3 refl = reflect(-lightDir, vNormal);
  float spec = pow(max(dot(refl, vec3(0.0, 0.0, 1.0)), 0.0), 40.0);
  color += vec3(0.15, 0.28, 0.55) * spec * (1.0 - isLand) * 0.55;

  gl_FragColor = vec4(color, 1.0);
}
`

export default function GlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const W = container.offsetWidth, H = container.offsetHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 1000)
    camera.position.z = 2.9

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const group = new THREE.Group()
    group.rotation.y = 3.0
    group.rotation.x = 0.1
    scene.add(group)

    // Terrain sphere via GLSL shader
    const earthMat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1.0, 96, 96), earthMat))

    // Subtle cloud layer
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, transparent: true, opacity: 0.06, roughness: 1
    })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1.015, 32, 32), cloudMat))

    // Grid overlay — very subtle
    const gridMat = new THREE.LineBasicMaterial({ color: 0x6090c0, opacity: 0.18, transparent: true })
    const makeLine = (pts: THREE.Vector3[]) =>
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat))

    for (let lat = -80; lat <= 80; lat += 30) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 361; i++) {
        const phi = (90 - lat) * (Math.PI / 180), theta = i * (Math.PI / 180)
        pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)))
      }
      makeLine(pts)
    }
    for (let lon = 0; lon < 360; lon += 30) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 180; i++) {
        const phi = i * (Math.PI / 180), theta = lon * (Math.PI / 180)
        pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)))
      }
      makeLine(pts)
    }

    // Atmosphere
    scene.add(new THREE.AmbientLight(0x334466, 0.6))
    const atmMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x1a3a7a, transparent: true, opacity: 0.15, side: THREE.BackSide })
    )
    group.add(atmMesh)

    // US city pins — small spheres so they render as circles not squares
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xD98E4A })
    const pinGeo = new THREE.SphereGeometry(0.020, 10, 10)
    const pinPositions = US_CITIES.map(c => latLonToVec(c.lat, c.lon, 1.04))
    pinPositions.forEach(([x, y, z]) => {
      const pin = new THREE.Mesh(pinGeo, pinMat)
      pin.position.set(x, y, z)
      group.add(pin)
    })

    // Pulse rings — positioned at surface (1.03) just below sphere pins
    const rings: { mesh: THREE.Line; phase: number }[] = []
    const ringPositions = US_CITIES.map(c => latLonToVec(c.lat, c.lon, 1.03))
    ringPositions.forEach(([x, y, z]) => {
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

    const AUTO_ROT = 0.0013
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

    const regionTimer = setInterval(() => setActiveIdx(i => (i + 1) % US_CITIES.length), 2500)

    let t = 0, raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick); t += 0.016
      if (!dragging) {
        velX *= 0.90; velY *= 0.90
        group.rotation.y += velY + AUTO_ROT; group.rotation.x += velX
        group.rotation.x = Math.max(-0.4, Math.min(0.4, group.rotation.x))
      }
      rings.forEach(({ mesh, phase }) => {
        const p = 0.93 + 0.1 * Math.sin(t * 1.6 + phase)
        mesh.scale.setScalar(p)
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
      cancelAnimationFrame(raf); clearInterval(regionTimer)
      window.removeEventListener('mousemove', e => onMove(e.clientX, e.clientY))
      window.removeEventListener('mouseup', onUp); window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  const city = US_CITIES[activeIdx]

  return (
    <section id="globe" className="relative bg-black overflow-hidden" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(15,30,70,0.3) 0%, transparent 70%)' }} />

      <div className="absolute top-0 inset-x-0 z-10 pt-24 text-center px-6">
        <AnimateInView>
          <h2 className="font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Every Shop. Your Score.
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

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-7 py-4 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', minWidth: 260 }}>
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: '#D98E4A', boxShadow: '0 0 10px rgba(217,142,74,0.9)' }} />
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
