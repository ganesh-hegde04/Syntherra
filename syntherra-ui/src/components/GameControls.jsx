import { useState } from "react";
import Swal from "sweetalert2";

export default function GameControls({
  onPlayerAction
}) {

  const civilizations = [

    "Eastern Republic",
    "Iron Dominion",
    "Solaris Union",
    "Crimson Empire",
    "Northern Coalition",
    "Desert Caliphate"

  ];

  const allowedActions = [
    "WAR",
    "ALLIANCE"
  ];

  const [source, setSource] =
    useState("");

  const [target, setTarget] =
    useState("");

  const [action, setAction] =
    useState("WAR");

  const [loading, setLoading] =
    useState(false);

  const executeAction = () => {

    if (loading) {

      return;

    }

    if (!source) {

      Swal.fire({
  icon: "warning",
  title: "Source Nation Required",
  text: "Please select a source nation.",
  background: "#0f172a",
  color: "#ffffff",
  confirmButtonColor: "#06b6d4"
});

      return;

    }

    if (!target) {

      Swal.fire({
  icon: "warning",
  title: "Target Nation Required",
  text: "Please select a target nation.",
  background: "#0f172a",
  color: "#ffffff",
  confirmButtonColor: "#06b6d4"
});

      return;

    }

    if (source === target) {

      Swal.fire({
  icon: "error",
  title: "Invalid Selection",
  text: "A nation cannot target itself.",
  background: "#0f172a",
  color: "#ffffff",
  confirmButtonColor: "#06b6d4"
});

      return;

    }

    if (
      !allowedActions.includes(action)
    ) {

     Swal.fire({
  icon: "error",
  title: "Invalid Action",
  text: "Please choose a valid action.",
  background: "#0f172a",
  color: "#ffffff",
  confirmButtonColor: "#06b6d4"
});

      return;

    }

    setLoading(true);

    let title = "";
    let description = "";

    switch (action) {

      case "WAR":

        title =
          "War Declared";

        description =
          `${source} declared war on ${target}`;

        break;

      case "ALLIANCE":

        title =
          "Alliance Formed";

        description =
          `${source} formed alliance with ${target}`;

        break;

      default:

        setLoading(false);

        return;

    }

    const event = {

      id: Date.now(),

      title,

      description,

      type: action,

      severity: 8,

      timestamp:
        new Date()
          .toISOString()

    };

    if (
      onPlayerAction
    ) {

      onPlayerAction(
        event
      );

    }

    Swal.fire({
  icon: "success",
  title,
  text: description,
  background: "#0f172a",
  color: "#ffffff",
  confirmButtonColor: "#06b6d4",
  timer: 1800,
  showConfirmButton: false
});

    setSource("");

    setTarget("");

    setAction("WAR");

    setTimeout(() => {

      setLoading(false);

    }, 1500);

  };

  return (

    <div
      className="
        bg-slate-900/70
        border
        border-slate-800
        rounded-2xl
        p-5
        mb-6
        backdrop-blur-md
      "
    >

      <h2
        className="
          text-xl
          font-semibold
          mb-4
        "
      >

        🎮 World Control Panel

      </h2>

      <div
        className="
          grid
          md:grid-cols-3
          gap-3
        "
      >

        <select

          value={source}

          onChange={(e) =>
            setSource(
              e.target.value
            )
          }

          disabled={loading}

          className="
            bg-slate-800
            p-3
            rounded-lg
            border
            border-slate-700
            disabled:opacity-50
          "

        >

          <option value="">

            Attacking Nation

          </option>

          {civilizations.map(c => (

            <option
              key={c}
              value={c}
            >

              {c}

            </option>

          ))}

        </select>

        <select

          value={target}

          onChange={(e) =>
            setTarget(
              e.target.value
            )
          }

          disabled={loading}

          className="
            bg-slate-800
            p-3
            rounded-lg
            border
            border-slate-700
            disabled:opacity-50
          "

        >

          <option value="">

            Target Nation

          </option>

          {civilizations.map(c => (

            <option
              key={c}
              value={c}
            >

              {c}

            </option>

          ))}

        </select>

        <select

          value={action}

          onChange={(e) =>
            setAction(
              e.target.value
            )
          }

          disabled={loading}

          className="
            bg-slate-800
            p-3
            rounded-lg
            border
            border-slate-700
            disabled:opacity-50
          "

        >

          <option value="WAR">

            ⚔ Declare War

          </option>

          <option value="ALLIANCE">

            🤝 Form Alliance

          </option>

        </select>

      </div>

      <button

        onClick={executeAction}

        disabled={
          !source ||
          !target ||
          loading
        }

        className="
          mt-4
          px-6
          py-3
          bg-cyan-500
          hover:bg-cyan-400
          disabled:bg-slate-700
          disabled:cursor-not-allowed
          rounded-lg
          font-semibold
          transition
        "

      >

        {

          loading

            ? "Executing..."

            : "Execute Action"

        }

      </button>

    </div>

  );

}