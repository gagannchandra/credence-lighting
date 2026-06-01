import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function GlobalPresence() {
  const globeRef = useRef();
  const containerRef = useRef(null);
  const [globeSize, setGlobeSize] = useState({ width: 560, height: 560 });

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.5;
    globeRef.current.controls().enableZoom = false;
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      const size = Math.min(width, 560);

      setGlobeSize({ width: size, height: size });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const points = [
    { lat: 25.2048, lng: 55.2708, name: "Dubai" },
    { lat: 20.5937, lng: 78.9629, name: "India" },
    { lat: 23.8859, lng: 45.0792, name: "Saudi Arabia" },
    { lat: 26.0667, lng: 50.5577, name: "Bahrain" },
    { lat: 56.1304, lng: -106.3468, name: "Canada" },
  ];

  return (
    <section className="relative bg-black py-20 overflow-hidden">

      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[220px] bg-[#c8a96b]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="order-2 lg:order-1">

            <p className="uppercase tracking-[0.4em] text-xs text-[#c8a96b] mb-5">
              Worldwide Reach
            </p>

            <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight mb-2">
              Global
              <span className="italic text-[#c8a96b]"> Presence</span>
            </h2>

            <p className="text-white/50 max-w-xl leading-8 mb-10">
              Delivering premium lighting experiences across
              commercial, hospitality, retail, and entertainment
              projects worldwide.
            </p>

            <div className="space-y-5">
              {points.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b border-white/10 pb-4"
                >
                  <div className="w-3 h-3 rounded-full bg-[#c8a96b] shrink-0" />

                  <h3 className="text-white text-lg tracking-wide">
                    {country.name}
                  </h3>
                </div>
              ))}
            </div>

          </div>

          <div className="order-1 lg:order-2 flex items-center justify-center w-full">

            <div
              ref={containerRef}
              className="relative w-full max-w-[560px] aspect-square flex items-center justify-center mx-auto"
            >
              <div className="relative w-full h-full border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-[32px] overflow-hidden flex items-center justify-center">

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10 pointer-events-none" />

                <div className="flex items-center justify-center w-full h-full">
                  <Globe
                    ref={globeRef}
                    globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    globeCloudsUrl="https://unpkg.com/three-globe/example/img/earth-clouds.png"
                    bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                    bumpScale={0.5}
                    backgroundColor="rgba(0,0,0,0)"
                    pointsData={points}
                    pointAltitude={0.06}
                    pointRadius={0.75}
                    pointColor={() => "#f7e1a0"}
                    pointLabel={(d) => d.name}
                    pointTransitionDuration={2000}
                    atmosphereColor="#c8a96b"
                    atmosphereAltitude={0.12}
                    labelsData={points}
                    labelLat={(d) => d.lat}
                    labelLng={(d) => d.lng}
                    labelText={(d) => d.name}
                    labelSize={1.4}
                    labelDotRadius={0.5}
                    labelColor={() => "#ffffff"}
                    labelResolution={2}
                    width={globeSize.width}
                    height={globeSize.height}
                  />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
