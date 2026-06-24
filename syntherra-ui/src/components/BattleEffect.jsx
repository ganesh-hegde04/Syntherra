import {
  AnimatePresence,
  motion
} from "framer-motion";

export default function BattleEffect({
  event
}) {

  if (
    !event ||
    !event.title ||
    !event.title.includes("War")
  ) {

    return null;

  }

  return (

    <AnimatePresence mode="wait">

      <motion.div

        key={event.id}

        initial={{
          scale: 0,
          opacity: 0
        }}

        animate={{
          scale: [1, 1.6, 1],
          opacity: [1, 1, 0]
        }}

        exit={{
          opacity: 0
        }}

        transition={{
          duration: 2
        }}

        className="
          fixed
          bottom-10
          right-10
          z-[9998]
          text-8xl
          pointer-events-none
          select-none
        "

      >

        💥

      </motion.div>

    </AnimatePresence>

  );

}