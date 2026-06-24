import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, useRef } from "react";

export default function WelcomeModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef(null);
  const speechStarted = useRef(false);

  const features = [
    { icon: "🤖", title: "Autonomous AI", text: "Every nation independently makes decisions." },
    { icon: "⚔️", title: "Dynamic Warfare", text: "Wars begin naturally based on world conditions." },
    { icon: "🤝", title: "Diplomacy", text: "Countries negotiate alliances and peace." },
    { icon: "📈", title: "Economy", text: "Trade and resources influence global power." },
    { icon: "🌍", title: "3D Globe", text: "Watch every event on a live globe." },
    { icon: "📡", title: "Realtime", text: "Events stream instantly through WebSockets." }
  ];

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, []);

const particles = useMemo(
  () =>
    Array.from(
      { length: isMobile ? 18 : 50 },
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: 8 + Math.random() * 12,
      })
    ),
  [isMobile]
);

  // Narration text
  const narrationText = `Welcome Commander. Welcome to Syntherra.

    Syntherra is a living digital world where Artificial Intelligence controls every nation. 
    Each country has its own AI brain that thinks, makes decisions, and adapts to changing situations in real time.

    Watch as nations build their economies, trade resources, form powerful alliances, 
    and sometimes go to war. Every action affects the global balance of power.

    You can actually step in and shape the story. Start a war or form an alliance. 
    Your decisions change the course of history.

    Every time you run the simulation, a completely different story emerges. 
    New alliances form, different wars break out, and unique civilizations rise and fall.

    The future of this world is in your hands. Welcome to Syntherra.`;

  // Function to start speech with female voice
  const startSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    if (speechStarted.current || isSpeaking) {
      console.error('Speech already started or in progress');
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(narrationText);
      speech.rate = 0.9;
      speech.pitch = 1.3;
      speech.volume = 1;
      speech.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          setVoiceAndSpeak(updatedVoices, speech);
        };
        return;
      }

      setVoiceAndSpeak(voices, speech);
      
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
    }
  };

  // Helper function to set voice and speak
  const setVoiceAndSpeak = (voices, speech) => {
    const femaleVoiceNames = [
      'Samantha',
      'Victoria', 
      'Google UK English Female',
      'Microsoft Zira',
      'Karen',
      'Ellen',
      'Tessa',
      'Siri',
      'Alice',
      'Martha',
      'Serena',
      'Vicki',
      'Zira',
      'Moira',
      'Rosa'
    ];
    
    let femaleVoice = null;
    
    for (const name of femaleVoiceNames) {
      const found = voices.find(voice => voice.name.includes(name));
      if (found) {
        femaleVoice = found;
        break;
      }
    }
    
    if (!femaleVoice) {
      femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('girl') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria') ||
        voice.name.toLowerCase().includes('zira')
      );
    }

    if (femaleVoice) {
      speech.voice = femaleVoice;

    } else {
      speech.pitch = 1.6;

    }

    speechStarted.current = true;
    setIsSpeaking(true);
    
    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
      speechStarted.current = false;
    };

    speech.onerror = (event) => {
      setIsSpeaking(false);
      speechStarted.current = false;
    };

    setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, 100);
  };

  // Handle scroll or click to reveal content
  const handleUserInteraction = () => {
    if (!showContent) {
      setShowContent(true);
      setShowScrollHint(false);
      // Start speech when user interacts
      setTimeout(() => {
        startSpeech();
      }, 500);
    }
  };

  const enter = async () => {

  setLoading(true);

  try {

    await fetch(

      `${import.meta.env.VITE_API_URL}/api/simulation/start`,

      {

        method: "POST"

      }

    );

  } catch {}

  if (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {

    window.speechSynthesis.cancel();

    speechStarted.current = false;

    setIsSpeaking(false);

  }

  const timer = setTimeout(() => {

    if (onClose) {

      onClose();

    }

  }, 2200);

  return () => clearTimeout(timer);

};

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#020617] text-white">
      {/* Animated background - fixed position */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(34,211,238,.15), transparent 40%)",
              "radial-gradient(circle at 80% 40%, rgba(59,130,246,.15), transparent 40%)",
              "radial-gradient(circle at 30% 80%, rgba(168,85,247,.15), transparent 40%)",
              "radial-gradient(circle at 20% 20%, rgba(34,211,238,.15), transparent 40%)"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size
            }}
            animate={{ 
              y: [0, -120, 0], 
              opacity: [0.2, 1, 0.2] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: p.duration,
              ease: "easeInOut" 
            }}
          />
        ))}

        {/* Rotating ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
        />
      </div>

      {/* Scrollable content */}
      <div className="relative min-h-screen flex items-start justify-center p-6 pt-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl rounded-[32px] border border-cyan-500/20 bg-slate-900/60 p-8 backdrop-blur-3xl my-8"
        >
          {/* FADE IN TITLE - Initial View */}
          <AnimatePresence>
            {!showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.5 }}
                className="text-center py-20"
              >
                <motion.div
  animate={{
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0]
  }}
  transition={{
    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  }}
  className="text-9xl mb-8"
>
  🌍
</motion.div>

{/* Mobile Desktop Site Recommendation */}
<div
  className="
    mb-6
    sm:hidden
    flex
    justify-center
  "
>
  <div
    className="
      rounded-xl
      border
      border-amber-400/30
      bg-amber-500/10
      px-4
      py-3
      max-w-sm
    "
  >
    <p
      className="
        text-xs
        text-amber-200
        leading-relaxed
      "
    >
      For the <strong>smoothest and best experience</strong>,
      enable <strong>Desktop Site</strong> in your mobile browser.
    </p>
  </div>
</div>

<motion.h1
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="text-7xl md:text-8xl font-black text-white mb-4 tracking-wider"
>
  SYNTHERRA
</motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl text-cyan-300 font-light tracking-[0.3em] mb-6"
                >
                  ARTIFICIAL INTELLIGENCE CIVILIZATION
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-8"
                />

                {/* Scroll Down Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="mt-12"
                >
                  <motion.button
                    onClick={handleUserInteraction}
                    animate={{
                      y: [0, 10, 0]
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer mx-auto"
                  >
                    <span className="text-sm tracking-wider uppercase">Scroll Down</span>
                    <motion.div
                      animate={{
                        y: [0, 8, 0]
                      }}
                      transition={{
                        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/60 transition-colors"
                    >
                      <motion.div
                        animate={{
                          y: [4, 20, 4]
                        }}
                        transition={{
                          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"
                      />
                    </motion.div>
                    <span className="text-xs text-white/40">↓</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAIN CONTENT - Shows after user interaction */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Speaking Indicator */}
                {isSpeaking && (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                    <span className="text-cyan-300 text-sm font-medium"> AI Narrating...</span>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          setIsSpeaking(false);
                          speechStarted.current = false;
                        }
                      }}
                      className="ml-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-full border border-red-500/30 text-red-300 text-xs transition-all"
                    >
                      Stop
                    </button>
                  </div>
                )}

                {/* Header */}
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                    className="text-8xl"
                  >
                    🌍
                  </motion.div>

                  <h1 className="mt-6 text-white text-6xl font-black">
                    SYNTHERRA
                  </h1>

                  <p className="mt-4 text-white/60 tracking-[6px] uppercase text-sm">
                    Artificial Intelligence Civilization Simulation
                  </p>
                </div>

                {/* Welcome Content - No boot sequence */}
                <div className="mt-12">
                  <h2 className="text-center text-4xl md:text-5xl font-bold text-white">
                    Welcome Commander
                  </h2>

                  {/* Clean text explanation */}
                  <div className="mx-auto mt-6 max-w-4xl">
                    <div className="space-y-4 text-center">
                      <p className="text-lg leading-8 text-white">
                        Syntherra is a living digital world where Artificial Intelligence controls every nation.
                      </p>
                      <p className="text-lg leading-8 text-white">
                        Each country has its own AI brain that thinks, makes decisions, and adapts to changing situations in real time.
                      </p>
                      <p className="text-lg leading-8 text-white">
                        Watch as nations build their economies, trade resources, form powerful alliances, and sometimes go to war. Every action affects the global balance of power.
                      </p>
                      <p className="text-lg leading-8 text-white">
                        You can actually step in and shape the story. Start a war or form an alliance. Your decisions change the course of history.
                      </p>
                      <p className="text-lg leading-8 text-white">
                        Every time you run the simulation, a completely different story emerges. New alliances form, different wars break out, and unique civilizations rise and fall.
                      </p>
                      <p className="text-xl font-bold text-white">
                        The future of this world is in your hands. Welcome to Syntherra.
                      </p>
                    </div>
                  </div>

                  {/* Features grid */}
                  <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((f) => (
                      <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        key={f.title}
                        className="rounded-2xl border border-cyan-500/20 bg-slate-800/40 p-5"
                      >
                        <div className="text-4xl">{f.icon}</div>
                        <h3 className="mt-3 text-xl font-bold text-white">{f.title}</h3>
                        <p className="mt-2 text-sm text-white/70">{f.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enter button */}
                  <div className="mt-12 flex justify-center pb-4">
                    {!loading ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={enter}
                        className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg tracking-wider shadow-lg hover:shadow-2xl transition-all"
                      >
                        ENTER THE WORLD →
                      </motion.button>
                    ) : (
                      <div className="text-center">
                        <motion.div
                          className="mx-auto h-16 w-16 rounded-full border-4 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                        <div className="mt-4 text-xl text-white">
                          Initializing World...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* What is Syntherra section */}
                  <div className="mt-8 pt-8 border-t border-cyan-500/10">
                    <h3 className="text-center text-2xl font-bold text-white mb-4">
                      What Makes Syntherra Special?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-800/30 p-4 rounded-xl border border-cyan-500/10">
                        <h4 className="text-cyan-300 font-semibold mb-2"> AI-Powered Nations</h4>
                        <p className="text-sm text-white/70">Every country has its own AI making independent, smart decisions in real-time.</p>
                      </div>
                      <div className="bg-slate-800/30 p-4 rounded-xl border border-cyan-500/10">
                        <h4 className="text-cyan-300 font-semibold mb-2"> Live & Dynamic</h4>
                        <p className="text-sm text-white/70">Watch everything unfold live through WebSockets. No two simulations are ever the same.</p>
                      </div>
                      <div className="bg-slate-800/30 p-4 rounded-xl border border-cyan-500/10">
                        <h4 className="text-cyan-300 font-semibold mb-2">Play a Role</h4>
                        <p className="text-sm text-white/70">Don't just watch. Start wars, form alliances, make peace, and change history.</p>
                      </div>
                      <div className="bg-slate-800/30 p-4 rounded-xl border border-cyan-500/10">
                        <h4 className="text-cyan-300 font-semibold mb-2">Stunning Visuals</h4>
                        <p className="text-sm text-white/70">Experience the world through a breathtaking 3D globe with real-time events.</p>
                      </div>
                    </div>
                  </div>

                  {/* Manual Play Button - Backup */}
                  {!isSpeaking && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={startSpeech}
                        className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full border border-cyan-500/30 text-cyan-300 text-sm transition-all flex items-center gap-2"
                      >
                        <span>🔊</span> Play Welcome Message
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}