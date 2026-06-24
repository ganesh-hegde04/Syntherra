import { motion } from "framer-motion";

function StatBar({
  label,
  value
}) {

  const danger =
    value < 30;

  return (

    <div className="mb-4">

      <div className="flex justify-between text-sm mb-1">

        <span className="text-slate-300">

          {label}

        </span>

        <span className="text-white font-medium">

          {value}

        </span>

      </div>

      <div className="w-full h-2 bg-slate-800 rounded-full">

        <div

          className="
            h-2
            rounded-full
            transition-all
            duration-1000
          "

          style={{

            width:
              `${Math.min(value, 100)}%`,

            backgroundColor:

              danger
                ? "#ef4444"
                : "#38bdf8"

          }}

        />

      </div>

    </div>

  );

}

export default function CivilizationCard({ civ }) {

  const icons = {

    "Eastern Republic": "🏛",

    "Iron Dominion": "⚔",

    "Solaris Union": "✷",

    "Crimson Empire": "♛",

    "Northern Coalition": "◆",

    "Desert Caliphate": "◈"

  };

  const powerScore =

    civ.economy +

    civ.military +

    civ.happiness;

  let tier =
    "Developing Nation";

  if (
    powerScore > 500
  ) {

    tier =
      "Global Superpower";

  }

  else if (
    powerScore > 300
  ) {

    tier =
      "Major Power";

  }

  else if (
    powerScore > 200
  ) {

    tier =
      "Regional Power";

  }

  return (

    <motion.div

      whileHover={{

        y: -6,

        scale: 1.02

      }}

      transition={{

        duration: 0.2

      }}

      className="
        relative
        rounded-2xl
        p-6
        border
        border-slate-800
        backdrop-blur-md
        shadow-xl
        overflow-hidden
        bg-slate-900/70
      "

    >

      <div className="mb-5">

        <h2

          className="
            text-xl
            font-semibold
            text-white
          "

        >

          {icons[civ.name]}
          {" "}
          {civ.name}

        </h2>

        <div

          className="
            text-xs
            text-cyan-400
            mt-1
          "

        >

          {tier}

        </div>

      </div>

      <StatBar

        label="Economy"

        value={civ.economy}

      />

      <StatBar

        label="Military"

        value={civ.military}

      />

      <StatBar

        label="Food"

        value={civ.food}

      />

      <StatBar

        label="Happiness"

        value={civ.happiness}

      />

      <div

        className="
          mt-6
          pt-4
          border-t
          border-slate-800
          flex
          justify-between
          items-center
        "

      >

        <span

          className="
            text-slate-400
            text-sm
          "

        >

          Population

        </span>

        <span

          className="
            text-white
            font-semibold
          "

        >

          {civ.population?.toLocaleString()}

        </span>

      </div>

      <div

        className="
          mt-3
          text-xs
          text-slate-500
        "

      >

        AI Controlled Civilization

      </div>

    </motion.div>

  );

}