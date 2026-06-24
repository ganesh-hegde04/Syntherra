import { motion } from "framer-motion";

export default function EventFeed({ events }) {

    return (

        <div className="bg-slate-800 rounded-xl p-5 shadow-lg">

            <h2 className="text-xl font-bold mb-4">
                🌍 World Events
            </h2>

            <div className="space-y-3">

                {events.slice(0, 8).map((event, index) => (

                    <motion.div

                        key={`${event.title}-${index}`}

                        initial={{
                            opacity: 0,
                            x: 50,
                            scale: 0.9
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1
                        }}

                        transition={{
                            duration: 0.4
                        }}

                        whileHover={{
                            scale: 1.03
                        }}

                        className="
                            bg-slate-700
                            rounded-xl
                            p-4
                            border-l-4
                            border-cyan-400
                            shadow-lg
                        "
                    >

                        <div className="font-bold text-white">
                            {event.title}
                        </div>

                        <div className="text-sm text-slate-300 mt-1">
                            {event.description}
                        </div>

                    </motion.div>

                ))}

            </div>

        </div>

    );
}