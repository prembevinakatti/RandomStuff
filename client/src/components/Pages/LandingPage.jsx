import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LandingPage = ({
  title = "Discover. Showcase. Inspire.",
  tagline = "RandomStuff – Your platform to share and explore dev projects.",
  words = ["Innovative", "Open Source", "Student-Built"],
  blurAmount = 5,
  borderColor = "#BAFF38",
  glowColor = "rgba(186, 255, 56, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* 🔵 Animated Blurry Blue Blob
      <motion.div
        className="absolute rounded-full bg-lime-400 blur-3xl opacity-50"
        style={{
          width: "400px",
          height: "400px",
          top: "-100px",
          left: "-100px",
        }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 100, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      /> */}

      <h1 className="text-5xl font-extrabold mb-4 text-center">{title}</h1>
      <p className="text-lg text-center max-w-xl mb-8 text-gray-400">
        {tagline}
      </p>

      <div
        className="relative flex gap-6 justify-center items-center flex-wrap"
        ref={containerRef}
      >
        {words.map((word, index) => {
          const isActive = index === currentIndex;
          return (
            <span
              key={index}
              ref={(el) => (wordRefs.current[index] = el)}
              className="relative text-4xl font-bold cursor-pointer"
              style={{
                filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
                transition: `filter ${animationDuration}s ease`,
              }}
            >
              {word}
            </span>
          );
        })}

        <motion.div
          className="absolute top-0 left-0 pointer-events-none box-border border-0"
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
            opacity: currentIndex >= 0 ? 1 : 0,
          }}
          transition={{
            duration: animationDuration,
          }}
          style={{
            "--border-color": borderColor,
            "--glow-color": glowColor,
          }}
        >
          {/* Four glow corners */}
          <span
            className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 4px var(--border-color))",
            }}
          ></span>
          <span
            className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 4px var(--border-color))",
            }}
          ></span>
          <span
            className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 4px var(--border-color))",
            }}
          ></span>
          <span
            className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 4px var(--border-color))",
            }}
          ></span>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
