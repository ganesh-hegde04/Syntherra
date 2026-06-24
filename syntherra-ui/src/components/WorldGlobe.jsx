import Globe from "react-globe.gl";
import {
  useRef,
  useEffect,
  useState
} from "react";

export default function WorldGlobe({ event }) {

  const globeRef = useRef();

  const [attackPoints, setAttackPoints] =
    useState([]);

  const [explosions, setExplosions] =
    useState([]);

  const civilizations = [

    {
      name: "Eastern Republic",
      lat: 22,
      lng: 78,
      color: "#00FFFF",
      altitude: 0.03
    },

    {
      name: "Iron Dominion",
      lat: 50,
      lng: 10,
      color: "#FF3333",
      altitude: 0.03
    },

    {
      name: "Solaris Union",
      lat: -25,
      lng: 135,
      color: "#FFD700",
      altitude: 0.03
    },

    {
      name: "Crimson Empire",
      lat: 40,
      lng: -100,
      color: "#FF6600",
      altitude: 0.03
    },

    {
      name: "Northern Coalition",
      lat: 65,
      lng: 90,
      color: "#00FF66",
      altitude: 0.03
    },

    {
      name: "Desert Caliphate",
      lat: 25,
      lng: 45,
      color: "#CC00FF",
      altitude: 0.03
    }

  ];

  useEffect(() => {

    if (!globeRef.current)
      return;

    const controls =
      globeRef.current.controls();

    controls.autoRotate = true;

    controls.autoRotateSpeed = 0.35;

    controls.enableZoom = true;

  }, []);

  useEffect(() => {

    if (
      !event ||
      !event.description
    ) {
      return;
    }

    const matched =
      civilizations.filter(c =>

        event.description
          ?.toLowerCase()
          .includes(
            c.name.toLowerCase()
          )

      );

    if (
      matched.length < 2
    ) {
      return;
    }

    const target =
      matched[1];

    if (
      globeRef.current
    ) {

      globeRef.current.pointOfView(

        {
          lat: target.lat,
          lng: target.lng,
          altitude: 1.5
        },

        2500

      );

    }

    if (
      event.title?.includes("War")
    ) {

      setAttackPoints([

        {
          lat: target.lat,
          lng: target.lng
        }

      ]);

      setExplosions([

        {
          lat: target.lat,
          lng: target.lng
        }

      ]);

      setTimeout(() => {

        setAttackPoints([]);

        setExplosions([]);

      }, 5000);

    }

  }, [event]);

  const arcs = [];

  if (
    event &&
    event.description
  ) {

    const matched =
      civilizations.filter(c =>

        event.description
          .toLowerCase()
          .includes(
            c.name.toLowerCase()
          )

      );

    if (
      matched.length >= 2
    ) {

      if (
        event.title.includes("War")
      ) {

        arcs.push({

          startLat:
            matched[0].lat,

          startLng:
            matched[0].lng,

          endLat:
            matched[1].lat,

          endLng:
            matched[1].lng,

          color: [
            "#ff0000",
            "#ff0000"
          ]

        });

      }

      if (
        event.title.includes("Alliance")
      ) {

        arcs.push({

          startLat:
            matched[0].lat,

          startLng:
            matched[0].lng,

          endLat:
            matched[1].lat,

          endLng:
            matched[1].lng,

          color: [
            "#00ffff",
            "#00ffff"
          ]

        });

      }

    }

  }

  return (

    <div
      className="
        h-[750px]
        rounded-2xl
        overflow-hidden
        border
        border-slate-700
        bg-black
        shadow-2xl
      "
    >

      <Globe

        ref={globeRef}

        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        backgroundColor="#000000"

        width={window.innerWidth - 60}

        height={750}

        showAtmosphere={true}

        atmosphereColor="#4fc3f7"

        atmosphereAltitude={0.18}

        pointsData={civilizations}

        pointLat="lat"

        pointLng="lng"

        pointColor="color"

        pointAltitude="altitude"

        pointRadius={0.15}

        labelsData={civilizations}

        labelLat="lat"

        labelLng="lng"

        labelText={(d) => d.name}

        labelSize={1.4}

        labelDotRadius={0.4}

        labelColor={() => "white"}

        arcsData={arcs}

        arcStartLat="startLat"

        arcStartLng="startLng"

        arcEndLat="endLat"

        arcEndLng="endLng"

        arcColor="color"

        arcStroke={4}

        arcDashLength={0.8}

        arcDashGap={0.1}

        arcDashAnimateTime={1200}

        ringsData={attackPoints}

        ringLat="lat"

        ringLng="lng"

        ringColor={() => "#ff0000"}

        ringMaxRadius={12}

        ringPropagationSpeed={4}

        ringRepeatPeriod={800}

        htmlElementsData={explosions}

        htmlLat="lat"

        htmlLng="lng"

        htmlElement={() => {

          const el =
            document.createElement("div");

          el.innerHTML = "💥";

          el.style.fontSize =
            "42px";

          el.style.pointerEvents =
            "none";

          return el;

        }}

      />

    </div>

  );

}