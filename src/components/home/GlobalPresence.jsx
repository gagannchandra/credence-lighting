import { useEffect, useRef, useState, useMemo } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import TextReveal from "../ui/motion/TextReveal";
import FadeUp from "../ui/motion/FadeUp";

export default function GlobalPresence() {
  const globeRef = useRef();
  const containerRef = useRef(null);
  const [globeSize, setGlobeSize] = useState({ 
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1000) : 1000, 
    height: typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1000) : 1000 
  });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hexData, setHexData] = useState([]);

  const customGlobeMaterial = useMemo(() => {
    const mat = new THREE.MeshPhongMaterial();
    mat.color = new THREE.Color('#030408');
    mat.transparent = true;
    mat.opacity = 0.9;
    mat.shininess = 1;
    return mat;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson', { signal: controller.signal })
      .then(res => res.json())
      .then(countries => {
        setHexData(countries.features);
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const currentGlobe = globeRef.current;
    if (!currentGlobe) return;

    let animationFrameId;
    let time = 0;

    const initCinematicRender = () => {
      if (!globeRef.current) return;

      const renderer = globeRef.current.renderer();
      if (renderer) {
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3; // Slightly brighter exposure
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }

      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5; // Smoother, slightly faster
      controls.enableZoom = false;
      controls.enablePan = false;
      
      // Cinematic angle (adjusted for larger canvas scale to keep globe same visual size)
      const alt = window.innerWidth < 768 ? 3.8 : 2.9;
      globeRef.current.pointOfView({ lat: 25, lng: 55, altitude: alt });

      const scene = globeRef.current.scene();

      // Clear default lighting safely
      if (scene && scene.children) {
        const lights = scene.children.filter(obj => obj.isLight);
        lights.forEach(light => scene.remove(light));
      }

      // Studio Lighting
      const keyLight = new THREE.DirectionalLight('#D4AF37', 5); 
      keyLight.position.set(-200, 100, 200); 
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight('#3e4e68', 3); // Cool fill
      fillLight.position.set(200, -50, 100);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight('#F3E5AB', 8);
      rimLight.position.set(-200, 150, -250); 
      scene.add(rimLight);
      
      const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
      scene.add(ambientLight);

      // Bespoke Motion
      const animate = () => {
        time += 0.002;
        
        // Imperceptible floating
        scene.position.y = Math.sin(time) * 0.3;
        
        // Slow breathing
        const scale = 1.0 + Math.sin(time * 0.5) * 0.002;
        scene.scale.set(scale, scale, scale);

        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
    };

    // Small delay ensures textures and geometries are initialized
    const initTimer = setTimeout(() => {
      initCinematicRender();
      
      // Intercept pointer events to allow page scrolling on empty canvas corners
      if (globeRef.current) {
        const renderer = globeRef.current.renderer();
        if (renderer && renderer.domElement) {
          const canvas = renderer.domElement;
          
          const handleInteraction = (e) => {
            const rect = canvas.getBoundingClientRect();
            // For touch events, use the first touch point
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const x = clientX - rect.left - rect.width / 2;
            const y = clientY - rect.top - rect.height / 2;
            const distance = Math.sqrt(x*x + y*y);
            
            // The globe visually occupies about 35% to 40% of the canvas radius (due to scaling)
            const clickableRadius = rect.width * 0.35; 
            
            if (distance > clickableRadius) {
              // The user touched/clicked outside the circular globe.
              // Stop the event from reaching OrbitControls so it doesn't prevent page scrolling!
              e.stopPropagation();
            }
          };

          // We use capture phase (true) to intercept the event BEFORE OrbitControls gets it
          canvas.addEventListener('pointerdown', handleInteraction, true);
          canvas.addEventListener('touchstart', handleInteraction, true);
          canvas.addEventListener('wheel', handleInteraction, true);
          
          // Store it so we can clean it up later if needed, though the canvas gets destroyed on unmount anyway
          canvas._interactionHandler = handleInteraction;
        }
      }
    }, 150);

    return () => {
      clearTimeout(initTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      if (currentGlobe) {
        const scene = currentGlobe.scene();
        const renderer = currentGlobe.renderer();
        
        if (scene) {
          scene.traverse(object => {
            if (object.isMesh) {
              if (object.geometry) object.geometry.dispose();
              if (object.material) {
                if (Array.isArray(object.material)) {
                  object.material.forEach(m => m.dispose());
                } else {
                  object.material.dispose();
                }
              }
            }
            if (object.isLight && object.dispose) {
              object.dispose();
            }
          });
        }
        
        if (renderer) {
          renderer.dispose();
        }
      }
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const isMobile = window.innerWidth < 768;
      
      // Much larger canvas scale to prevent label clipping, altitude adjusted to match
      const scale = isMobile ? 1.6 : 1.8; 
      const size = Math.min(width * scale, 1800);
      setGlobeSize({ width: size, height: size });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseEnter = () => {
    if (globeRef.current) globeRef.current.controls().autoRotateSpeed = 0.05;
  };

  const handleMouseLeave = () => {
    if (globeRef.current) globeRef.current.controls().autoRotateSpeed = 0.5;
  };

  const points = [
    // --- RIGHT SIDE (dx > 0) ---
    { lat: 25.7895, lng: 55.9432, city: "Ras Al Khaimah", country: "UAE", dx: 140, dy: -135 },
    { lat: 25.5647, lng: 55.5552, city: "Umm Al Quwain", country: "UAE", dx: 180, dy: -90 },
    { lat: 25.4052, lng: 55.5136, city: "Ajman", country: "UAE", dx: 210, dy: -45 },
    { lat: 25.3573, lng: 55.4033, city: "Sharjah", country: "UAE", dx: 230, dy: 0 },
    { lat: 25.2048, lng: 55.2708, city: "Dubai", country: "UAE", dx: 210, dy: 45 },
    { lat: 25.1288, lng: 56.3265, city: "Fujairah", country: "UAE", dx: 180, dy: 90 },
    { lat: 23.5859, lng: 58.4059, city: "Muscat", country: "Oman", dx: 140, dy: 135 },
    { lat: 19.0760, lng: 72.8777, city: "Mumbai", country: "India", dx: 180, dy: 180 },

    // --- LEFT SIDE (dx < 0) ---
    { lat: 43.6532, lng: -79.3832, city: "Toronto", country: "Canada", dx: -220, dy: -135 },
    { lat: 41.9028, lng: 12.4964, city: "Rome", country: "Italy", dx: -180, dy: -90 },
    { lat: 29.3759, lng: 47.9774, city: "Kuwait City", country: "Kuwait", dx: -160, dy: -45 },
    { lat: 25.2854, lng: 51.5310, city: "Doha", country: "Qatar", dx: -120, dy: 0 },
    { lat: 26.2235, lng: 50.5822, city: "Manama", country: "Bahrain", dx: -160, dy: 45 },
    { lat: 24.4539, lng: 54.3773, city: "Abu Dhabi", country: "UAE", dx: -150, dy: 90 },
    { lat: 24.7136, lng: 46.6753, city: "Riyadh", country: "Saudi Arabia", dx: -180, dy: 135 },
  ];

  const isMobile = windowWidth < 768;
  const labelScale = isMobile ? Math.max(windowWidth / 768, 0.45) : 1;

  // Scale dx and dy to fit nicely on mobile screens
  const scaledPoints = points.map(p => ({
    ...p,
    scaledDx: p.dx * labelScale,
    scaledDy: p.dy * (isMobile ? 0.85 : 1) // Keep vertical spacing large enough to prevent overlap
  }));

  // Draw arcs from Dubai to all other locations
  const arcsData = points
    .filter(p => p.city !== "Dubai")
    .map(p => ({
      startLat: 25.2048,
      startLng: 55.2708,
      endLat: p.lat,
      endLng: p.lng
    }));

  return (
    <section className="relative bg-transparent z-10 py-20 md:py-32 overflow-hidden flex items-center min-h-screen md:min-h-[90vh]">
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-12 gap-8 items-center">

          {/* LEFT */}
          {/* LEFT */}
          <div className="md:col-span-5 relative z-20 xl:pl-8 flex flex-col items-center md:items-start text-center md:text-left mb-12 md:mb-0">
            <FadeUp delay={0}>
              <p className="uppercase tracking-[0.4em] text-xs text-brand-gold mb-6 font-medium">
                Worldwide Reach
              </p>
            </FadeUp>

            <h2 className="text-fluid-h1 font-serif text-content-primary leading-[1.05] tracking-tight mb-2 flex flex-col gap-2">
              <TextReveal text="Global" />
              <TextReveal text="Presence" delay={2} className="italic text-brand-gold" />
            </h2>
            
            <div className="w-16 h-[1px] bg-brand-gold/30 my-6 md:my-8"></div>

            <FadeUp delay={4}>
              <p className="text-content-primary/60 max-w-[420px] leading-relaxed font-light text-base md:text-lg mb-0 md:mb-10">
                We engineer bespoke architectural lighting solutions and deliver transformative visual experiences for the world's most exclusive commercial and hospitality destinations.
              </p>
            </FadeUp>
            
            {/* DESKTOP ONLY BOTTOM CONTENT */}
            <div className="hidden md:block w-full">
              <FadeUp delay={6}>
                <p className="text-xs md:text-xs tracking-[0.25em] leading-[2.2] text-brand-gold/90 uppercase font-medium max-w-[420px]">
                  UAE &nbsp;&bull;&nbsp; Saudi Arabia &nbsp;&bull;&nbsp; Bahrain &nbsp;&bull;&nbsp; Qatar &nbsp;&bull;&nbsp; Kuwait &nbsp;&bull;&nbsp; Oman &nbsp;&bull;&nbsp; India &nbsp;&bull;&nbsp; Italy &nbsp;&bull;&nbsp; Canada
                </p>
              </FadeUp>
              
              <FadeUp delay={8}>
                <a 
                  href="/projects" 
                  className="inline-flex items-center gap-6 text-xs tracking-[0.2em] text-brand-gold border-b border-brand-gold/30 pb-3 mt-10 md:mt-14 uppercase hover:text-white transition-all font-medium group"
                >
                  Explore Our Projects
                  <span className="text-sm leading-none font-light group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </FadeUp>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7 flex items-center justify-center w-full min-w-0 relative z-10 md:translate-x-[5%]">
            <div
              ref={containerRef}
              className="relative w-full aspect-square flex items-center justify-center cursor-pointer group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-[800ms] ease-out group-hover:scale-105">
                {typeof window !== 'undefined' && window.__PRERENDER_INJECTED ? null : (
                  <Globe
                    ref={globeRef}
                    globeMaterial={customGlobeMaterial}
                    backgroundColor="rgba(0,0,0,0)"
                    showGlobe={true}
                    showAtmosphere={true}
                    atmosphereColor="#C8A46A"
                    atmosphereAltitude={0.15}
                    
                    // Hex Polygons for Stripe's Dotted Continents
                    hexPolygonsData={hexData}
                    hexPolygonResolution={3} 
                    hexPolygonMargin={0.7} // Sharper, smaller dots
                    hexPolygonColor={() => 'rgba(230, 210, 180, 0.55)'} // Warmer, more visible dots
                    
                    arcsData={arcsData}
                    arcColor={() => ['rgba(200, 164, 106, 0.1)', 'rgba(212, 175, 55, 1)']} // Brighter gold finish
                    arcDashLength={0.6}
                    arcDashGap={2.5}
                    arcDashInitialGap={() => Math.random()}
                    arcDashAnimateTime={3000} // Faster energy
                    arcAltitude={0.12}
                    arcStroke={0.7}
                    
                    htmlElementsData={scaledPoints}
                    htmlElement={d => {
                      const el = document.createElement('div');
                      el.style.pointerEvents = 'none';
                      
                      const isRight = d.scaledDx > 0;
                      const angleX = isRight ? 35 * labelScale : -35 * labelScale;
                      
                      el.innerHTML = `
                        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                          <div style="position: relative; width: 4px; height: 4px; display: flex; align-items: center; justify-content: center; mix-blend-mode: screen;">
                            <div style="position: absolute; width: 2px; height: 2px; background: #FFF; border-radius: 50%;"></div>
                            <div style="position: absolute; width: 6px; height: 6px; background: #C8A46A; border-radius: 50%; box-shadow: 0 0 12px 2px rgba(200, 164, 106, 0.8); animation: luxuryBreatheScale 3s ease-in-out infinite;"></div>
                          </div>
  
                          <svg width="0" height="0" style="position: absolute; top: 0; left: 0; overflow: visible;">
                            <polyline points="0,0 ${angleX},${d.scaledDy} ${d.scaledDx},${d.scaledDy}" fill="none" stroke="rgba(0,0,0,0.6)" stroke-width="1.5" />
                            <polyline points="0,0 ${angleX},${d.scaledDy} ${d.scaledDx},${d.scaledDy}" fill="none" stroke="rgba(200, 164, 106, 0.5)" stroke-width="0.5" />
                          </svg>
                          
                          <div style="position: absolute; left: ${isRight ? d.scaledDx + 10 + 'px' : 'auto'}; right: ${!isRight ? Math.abs(d.scaledDx) + 10 + 'px' : 'auto'}; top: ${d.scaledDy}px; transform: translateY(-50%); display: flex; flex-direction: column; align-items: ${isRight ? 'flex-start' : 'flex-end'}; gap: 2px; background: rgba(10, 10, 15, 0.85); border: 1px solid rgba(200, 164, 106, 0.2); border-radius: 4px; padding: 4px 8px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
                            <div style="color: #FFF; font-family: 'Inter', sans-serif; font-size: ${isMobile ? '9px' : '11px'}; font-weight: 500; text-transform: uppercase; letter-spacing: 0.25em; white-space: nowrap;">
                              ${d.city}
                            </div>
                            <div style="color: rgba(200, 164, 106, 0.9); font-family: 'Inter', sans-serif; font-size: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; white-space: nowrap;">
                              ${d.country}
                            </div>
                          </div>
                        </div>
                      `;
                      return el;
                    }}
                    
                    width={globeSize.width}
                    height={globeSize.height}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CONTENT (MOBILE ONLY) */}
        <div className="md:hidden mt-12 flex flex-col items-center text-center relative z-20">
          <FadeUp delay={6}>
            <p className="text-xs md:text-xs tracking-[0.25em] leading-[2.2] text-brand-gold/90 uppercase font-medium max-w-[600px]">
              UAE &nbsp;&bull;&nbsp; Saudi Arabia &nbsp;&bull;&nbsp; Bahrain &nbsp;&bull;&nbsp; Qatar &nbsp;&bull;&nbsp; Kuwait &nbsp;&bull;&nbsp; Oman &nbsp;&bull;&nbsp; India &nbsp;&bull;&nbsp; Italy &nbsp;&bull;&nbsp; Canada
            </p>
          </FadeUp>
          
          <FadeUp delay={8}>
            <a 
              href="/projects" 
              className="inline-flex items-center justify-center gap-6 text-xs tracking-[0.2em] text-brand-gold border-b border-brand-gold/30 pb-3 mt-8 md:mt-10 uppercase hover:text-white transition-all font-medium group"
            >
              Explore Our Projects
              <span className="text-sm leading-none font-light group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
