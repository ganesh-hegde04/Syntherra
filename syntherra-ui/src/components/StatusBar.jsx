export default function StatusBar({

  activeUsers = 0,

  civilizationCount = 0,

  aiActive = false

}) {

  return (

    <section

      className="
        bg-slate-900/90
        backdrop-blur-md
        border-b
        border-slate-800
        px-6
        py-4
        flex
        flex-wrap
        justify-between
        items-center
        gap-4
        select-none
      "

    >

      <div

        className="
          flex
          flex-wrap
          items-center
          gap-8
          text-sm
          font-medium
        "

      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span

            className={

              aiActive

                ? "w-3 h-3 rounded-full bg-green-400 animate-pulse"

                : "w-3 h-3 rounded-full bg-red-500"

            }

          />

          <span>

            {

              aiActive

                ? "AI Active"

                : "AI Idle"

            }

          </span>

        </div>

        <div>

          👥 Active Devices

          {" "}

          <span className="text-cyan-400">

            {activeUsers}

          </span>

        </div>

        <div>

          🌎 Civilizations

          {" "}

          <span className="text-cyan-400">

            {civilizationCount}

          </span>

        </div>

      </div>

    </section>

  );

}