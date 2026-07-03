import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

export default function GlobalPresence() {
  const globeRef = useRef();
  const containerRef = useRef(null);
  const [globeSize, setGlobeSize] = useState({ width: 1000, height: 1000 });
  const [hexData, setHexData] = useState([]);

  // Fetch GeoJSON for the dotted continents
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries => {
        setHexData(countries.features);
      });
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    let animationFrameId;
    let time = 0;

    const initCinematicRender = () => {
      if (!globeRef.current) return;

      const renderer = globeRef.current.renderer();
      if (renderer) {
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3; // Slightly brighter exposure
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }

      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5; // Smoother, slightly faster
      controls.enableZoom = false;
      controls.enablePan = false;
      
      // Cinematic angle
      globeRef.current.pointOfView({ lat: 25, lng: 55, altitude: 2.1 });

      const scene = globeRef.current.scene();
      
      // Base Globe Material (Transparent, Dark)
      const globeMaterial = globeRef.current.globeMaterial();
      globeMaterial.color = new THREE.Color('#030408'); // Deepest void
      globeMaterial.transparent = true;
      globeMaterial.opacity = 0.9; // Hide the back dots slightly for depth
      globeMaterial.shininess = 1; 

      // Clear default lighting
      scene.children = scene.children.filter(obj => !(obj.isLight));

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
    setTimeout(initCinematicRender, 150);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const size = Math.min(width * 1.3, 1200); // Larger visual scale
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
    <section className="relative bg-[#050505] py-32 overflow-hidden flex items-center min-h-[90vh]">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(200,164,106,0.08)_0%,rgba(0,0,0,0)_60%)] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-12 gap-8 items-center">

          {/* LEFT */}
          <div className="md:col-span-5 relative z-20 xl:pl-8">
            <p className="uppercase tracking-[0.4em] text-xs text-[#C8A46A] mb-6 font-medium">
              Worldwide Reach
            </p>

            <h2 className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif text-[#F3F1EC] leading-[1.05] tracking-tight mb-2">
              Global<br/>
              <span className="italic text-[#C8A46A]">Presence</span>
            </h2>
            
            <div className="w-16 h-[1px] bg-[#C8A46A]/30 my-8"></div>

            <p className="text-[#F3F1EC]/60 max-w-[420px] leading-relaxed font-light text-base md:text-lg mb-10">
              We engineer bespoke architectural lighting solutions and deliver transformative visual experiences for the world's most exclusive commercial and hospitality destinations.
            </p>
            
            <p className="text-[11px] md:text-xs tracking-[0.25em] leading-[2.2] text-[#C8A46A]/90 uppercase font-medium max-w-[420px]">
              UAE &nbsp;&bull;&nbsp; Saudi Arabia &nbsp;&bull;&nbsp; Bahrain &nbsp;&bull;&nbsp; Qatar &nbsp;&bull;&nbsp; Kuwait &nbsp;&bull;&nbsp; Oman &nbsp;&bull;&nbsp; India &nbsp;&bull;&nbsp; Italy &nbsp;&bull;&nbsp; Canada
            </p>
            
            <a href="/projects" className="inline-flex items-center gap-6 text-[11px] tracking-[0.2em] text-[#C8A46A] border-b border-[#C8A46A]/30 pb-3 mt-14 uppercase hover:text-white transition-all font-medium group">
              Explore Our Projects
              <span className="text-sm leading-none font-light group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7 flex items-center justify-center w-full relative z-10 translate-x-[5%]">
            <div
              ref={containerRef}
              className="relative w-full aspect-square flex items-center justify-center cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Globe
                  ref={globeRef}
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
                  
                  htmlElementsData={points}
                  htmlElement={d => {
                    const el = document.createElement('div');
                    el.style.pointerEvents = 'none';
                    
                    const isRight = d.dx > 0;
                    const angleX = isRight ? 35 : -35;
                    
                    el.innerHTML = `
                      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                        <div style="position: relative; width: 4px; height: 4px; display: flex; align-items: center; justify-content: center; mix-blend-mode: screen;">
                          <div style="position: absolute; width: 2px; height: 2px; background: #FFF; border-radius: 50%;"></div>
                          <style>
                            @keyframes luxuryBreatheScale {
                              0% { transform: scale(1); opacity: 0.15; }
                              50% { transform: scale(2.8); opacity: 0.7; }
                              100% { transform: scale(1); opacity: 0.15; }
                            }
                          </style>
                          <div style="position: absolute; width: 6px; height: 6px; background: #C8A46A; border-radius: 50%; box-shadow: 0 0 12px 2px rgba(200, 164, 106, 0.8); animation: luxuryBreatheScale 3s ease-in-out infinite;"></div>
                        </div>

                        <svg width="0" height="0" style="position: absolute; top: 0; left: 0; overflow: visible;">
                          <polyline points="0,0 ${angleX},${d.dy} ${d.dx},${d.dy}" fill="none" stroke="rgba(0,0,0,0.6)" stroke-width="1.5" />
                          <polyline points="0,0 ${angleX},${d.dy} ${d.dx},${d.dy}" fill="none" stroke="rgba(200, 164, 106, 0.5)" stroke-width="0.5" />
                        </svg>
                        
                        <div style="position: absolute; left: ${isRight ? d.dx + 10 + 'px' : 'auto'}; right: ${!isRight ? Math.abs(d.dx) + 10 + 'px' : 'auto'}; top: ${d.dy}px; transform: translate3d(0, -50%, 0); display: flex; flex-direction: column; align-items: ${isRight ? 'flex-start' : 'flex-end'}; gap: 2px; background: rgba(10, 10, 15, 0.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(200, 164, 106, 0.2); border-radius: 4px; padding: 5px 10px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
                          <div style="color: #FFF; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.25em; white-space: nowrap;">
                            ${d.city}
                          </div>
                          <div style="color: rgba(200, 164, 106, 0.9); font-family: 'Inter', sans-serif; font-size: 7px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; white-space: nowrap;">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


