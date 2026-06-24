import {
  AnimatePresence,
  motion
} from "framer-motion";

export default function WarAlert({
  event
}) {

  return (

    <AnimatePresence mode="wait">

      {event &&
       event.title &&
       event.title.includes("War") && (

        <motion.div

          key={event.id}

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          exit={{
            opacity: 0
          }}

          transition={{
            duration: 0.3
          }}

          className="
            fixed
            inset-0
            z-[9999]
            bg-black/80
            flex
            items-center
            justify-center
            pointer-events-none
            select-none
          "

        >

          <motion.div

            initial={{
              scale: 0.5,
              opacity: 0
            }}

            animate={{
              scale: 1,
              opacity: 1
            }}

            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12
            }}

            className="
              text-center
              px-6
              max-w-3xl
            "

          >

            <div
              className="
                text-7xl
                mb-6
                animate-pulse
              "
            >

              ⚔

            </div>

            <h1
              className="
                text-6xl
                font-bold
                text-red-500
                mb-6
                tracking-wider
              "
            >

              WAR DECLARED

            </h1>

            <p
              className="
                text-2xl
                text-white
                leading-relaxed
              "
            >

              {event.description ?? ""}

            </p>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}