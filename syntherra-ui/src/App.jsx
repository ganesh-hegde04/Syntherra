import { useEffect, useState } from "react";

import Header from "./components/Header";
import ActiveUsers from "./components/ActiveUsers";
import GameControls from "./components/GameControls";
import CivilizationCard from "./components/CivilizationCard";
import EventFeed from "./components/EventFeed";
import WorldGlobe from "./components/WorldGlobe";
import LiveEvent from "./components/LiveEvent";
import WarAlert from "./components/WarAlert";
import BattleEffect from "./components/BattleEffect";
import WelcomeModal from "./components/WelcomeModal";

import api from "./services/api";

import {
  connectWorldSocket,
  disconnectWorldSocket
} from "./services/websocket";

import {
  Toaster,
  toast
} from "react-hot-toast";

import {
  playEventSound
} from "./utils/sound";

function App() {

  const [civilizations, setCivilizations] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [liveEvent, setLiveEvent] =
    useState(null);

  const [globeEvent, setGlobeEvent] =
    useState(null);

  const [warAlert, setWarAlert] =
    useState(null);

  const [battleEffect, setBattleEffect] =
    useState(null);

  const [showWelcome, setShowWelcome] =
    useState(true);

  const [worldStarted, setWorldStarted] =
    useState(false);

  const updateCivilizationsForEvent = (
    event
  ) => {

    setCivilizations(prev =>

      prev.map(civ => {

        const involved =
          event.description
            ?.includes(
              civ.name
            );

        if (!involved) {

          return civ;

        }

        if (
          event.title.includes(
            "War"
          )
        ) {

          return {

            ...civ,

            military:
              Math.max(
                0,
                civ.military - 15
              ),

            economy:
              Math.max(
                0,
                civ.economy - 5
              ),

            food:
              Math.max(
                0,
                civ.food - 5
              ),

            happiness:
              Math.max(
                0,
                civ.happiness - 10
              ),

            population:
              Math.max(
                0,
                civ.population - 5000
              ),

            aggression:
              Math.min(
                100,
                civ.aggression + 5
              )

          };

        }

        if (
          event.title.includes(
            "Alliance"
          )
        ) {

          return {

            ...civ,

            economy:
              Math.min(
                100,
                civ.economy + 10
              ),

            food:
              Math.min(
                100,
                civ.food + 10
              ),

            oil:
              Math.min(
                100,
                civ.oil + 10
              ),

            military:
              Math.min(
                100,
                civ.military + 5
              ),

            happiness:
              Math.min(
                100,
                civ.happiness + 10
              ),

            population:
              civ.population + 2000

          };

        }

        return civ;

      })

    );

  };

  const processEvent = (event) => {

    if (event?.title) {
      toast.success(event.title);
    }

    playEventSound(
      event.title
    );

    updateCivilizationsForEvent(
      event
    );

    setLiveEvent(
      event
    );

    setGlobeEvent(
      event
    );

    if (
      event.title &&
      event.title.includes("War")
    ) {

      setWarAlert(
        event
      );

      setBattleEffect(
        event
      );

      const warTimer = setTimeout(() => {

        setWarAlert(null);

        setBattleEffect(null);

      }, 5000);

    }

    setTimeout(() => {

      setLiveEvent(
        null
      );

      setGlobeEvent(
        null
      );

    }, 10000);

    setEvents((prev) => {

      const updated = [

        event,

        ...prev

      ];

      return updated.slice(
        0,
        10
      );

    });

  };

  const loadCivilizations = async () => {

    try {

      const response =
        await api.get(
          "/civilizations"
        );

      setCivilizations(
        response.data
      );

    } catch (error) {

      toast.error("Unable to load world data.");

    }

  };

  // Effect 1: Initialize world when user enters
  useEffect(() => {

    if (!worldStarted) {

      return;

    }

    loadCivilizations();

    connectWorldSocket(

      setCivilizations,

      processEvent

    );

    return () => {

      disconnectWorldSocket();

    };

  }, [worldStarted]);

  // Effect 2: Activity tracking and heartbeat
  useEffect(() => {

    const deviceId =

      localStorage.getItem(
        "syntherra_device_id"
      ) ||

      crypto.randomUUID();

    localStorage.setItem(
      "syntherra_device_id",
      deviceId
    );

    let lastActivity =
      Date.now();

    const markActivity = () => {

      lastActivity =
        Date.now();

    };

    const sendHeartbeat =
      async () => {

        try {

          await fetch(

            `${import.meta.env.VITE_API_URL}/api/activity/heartbeat/${deviceId}`,

            {
              method: "POST"
            }

          );

        } catch {}

      };

    const disconnect =
      () => {

        navigator.sendBeacon(

          `${import.meta.env.VITE_API_URL}/api/activity/disconnect/${deviceId}`

        );

      };

    const activityEvents = [

      "mousemove",
      "mousedown",
      "click",
      "keydown",
      "keyup",
      "scroll",
      "touchstart",
      "touchmove"

    ];

    activityEvents.forEach(event =>

      window.addEventListener(
        event,
        markActivity
      )

    );

    document.addEventListener(

      "visibilitychange",

      () => {

        if (!document.hidden) {

          markActivity();

        }

      }

    );

    window.addEventListener(
      "beforeunload",
      disconnect
    );

    // Send initial heartbeat
    sendHeartbeat();

    // Set up regular heartbeat interval
    const heartbeatInterval = setInterval(() => {

      if (

        document.hidden

      ) {

        return;

      }

      if (

        Date.now() - lastActivity <= 30000

      ) {

        sendHeartbeat();

      }

    }, 10000);

    return () => {

      clearInterval(
        heartbeatInterval
      );

      activityEvents.forEach(event =>

        window.removeEventListener(
          event,
          markActivity
        )

      );

      window.removeEventListener(
        "beforeunload",
        disconnect
      );

      disconnect();

    };

  }, []);

  return (

    <div
      className="
        min-h-screen
        bg-slate-950
        text-white
      "
    >

      {

        showWelcome && (

          <WelcomeModal

            onClose={() => {

              setShowWelcome(
                false
              );

              setWorldStarted(true);

            }}

          />

        )

      }

      {/* Only render main app content when welcome is closed */}
      {!showWelcome && (
        <>
          <Header />

          <div className="px-3 sm:px-4 md:px-6 pt-4">

            <ActiveUsers />

          </div>

          <div className="px-3 sm:px-4 md:px-6 pt-4">

            <GameControls

              onPlayerAction={(event) => {

                processEvent(
                  event
                );

              }}

            />

          </div>

          <WarAlert
            event={warAlert}
          />

          <BattleEffect
            event={battleEffect}
          />

          <LiveEvent
            event={liveEvent}
          />

          <Toaster
            position="top-right"
          />

          <div className="px-6 pt-6">

            <WorldGlobe
              event={globeEvent}
            />

          </div>

          <div
  className="
    grid
    grid-cols-1
    xl:grid-cols-4
    gap-4
    md:gap-6
    px-3
    sm:px-4
    md:px-6
    pb-6
  "
>

            <div
              className="
                lg:col-span-3
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >

              {

                civilizations.map((civ) => (

                  <CivilizationCard
                    key={civ.id}
                    civ={civ}
                  />

                ))

              }

            </div>

            <EventFeed
              events={events}
            />

          </div>
        </>
      )}

    </div>

  );

}

export default App;