export default function Header() {

  return (

    <header
      className="
        border-b
        border-slate-800
        bg-slate-950/80
        backdrop-blur-md
        sticky
        top-0
        z-50
      "
    >

      <div
        className="
          w-full
          px-4
          sm:px-6
          py-4
          sm:py-5
        "
      >

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-bold
            tracking-wide
            text-white
            select-none
          "
        >
          Syntherra
        </h1>

        <p
          className="
            mt-2
            text-slate-400
            text-sm
            sm:text-base
          "
        >
          AI-Powered Civilization Simulation Platform
        </p>

        {/* Mobile Notice */}
        <p
          className="
            mt-2
            text-xs
            text-amber-300
            sm:hidden
          "
        >
          📱 For the best experience, enable <strong>Desktop Site</strong> in your mobile browser.
        </p>

      </div>

    </header>

  );

}