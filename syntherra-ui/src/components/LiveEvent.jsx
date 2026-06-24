import {
  AnimatePresence,
  motion
} from "framer-motion";

export default function LiveEvent({
  event
}) {

  return (

    <AnimatePresence mode="wait">

      {event && (

        <motion.div

          key={event.id}

          initial={{
            y: -100,
            opacity: 0
          }}

          animate={{
            y: 0,
            opacity: 1
          }}

          exit={{
            y: -100,
            opacity: 0
          }}

          transition={{
            duration: 0.35
          }}

          className="
            fixed
            top-10
            left-1/2
            -translate-x-1/2
            bg-cyan-600
            text-white
            px-8
            py-4
            rounded-xl
            shadow-2xl
            z-50
            pointer-events-none
            select-none
            max-w-xl
            text-center
          "

        >

          <h2
            className="
              font-bold
              text-lg
            "
          >

            {event.title ?? "World Event"}

          </h2>

          <p
            className="
              mt-1
              text-sm
            "
          >

            {event.description ?? ""}

          </p>

        </motion.div>

      )}

    </AnimatePresence>

  );

}