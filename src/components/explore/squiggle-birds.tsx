"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ---------- squiggles: 4 simple SVG curves ---------- */

const squiggles = [
  // Squiggle 0: wavy S-curve
  "M 30 100 C 60 30, 100 170, 140 80 S 180 150, 200 100",
  // Squiggle 1: loopy
  "M 40 120 C 70 40, 110 40, 100 100 C 90 160, 150 160, 160 100 C 170 40, 200 80, 190 120",
  // Squiggle 2: zigzag curve
  "M 30 80 Q 70 30 100 90 Q 130 150 160 70 Q 180 20 200 90",
  // Squiggle 3: spiral-ish
  "M 100 50 C 150 30, 170 70, 150 100 C 130 130, 70 130, 60 100 C 50 70, 80 50, 100 70",
];

/* ---------- transformations: each squiggle gets 3 bird interpretations ---------- */

interface BirdTransform {
  label: string;
  extras: React.ReactNode;
}

function makeBirds(squiggleIndex: number): BirdTransform[] {
  // Each bird adds eyes, beaks, legs to the base squiggle
  const birds: BirdTransform[][] = [
    // Squiggle 0 birds
    [
      {
        label: "Strutting pigeon",
        extras: (
          <>
            <circle cx="55" cy="55" r="5" fill="#333" />
            <polygon points="40,60 25,55 40,50" fill="#E8634A" />
            <line x1="100" y1="130" x2="90" y2="170" stroke="#333" strokeWidth="2" />
            <line x1="120" y1="130" x2="130" y2="170" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
      {
        label: "Swooping swallow",
        extras: (
          <>
            <circle cx="190" cy="90" r="4" fill="#333" />
            <polygon points="200,88 215,92 200,96" fill="#D97706" />
            <line x1="30" y1="100" x2="15" y2="80" stroke="#333" strokeWidth="2" />
            <line x1="30" y1="100" x2="15" y2="115" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
      {
        label: "Perched robin",
        extras: (
          <>
            <circle cx="140" cy="68" r="5" fill="#333" />
            <polygon points="148,65 160,68 148,71" fill="#E8634A" />
            <line x1="180" y1="110" x2="175" y2="140" stroke="#333" strokeWidth="2" />
            <line x1="195" y1="110" x2="200" y2="140" stroke="#333" strokeWidth="2" />
            <line x1="175" y1="140" x2="165" y2="140" stroke="#333" strokeWidth="2" />
            <line x1="200" y1="140" x2="210" y2="140" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
    ],
    // Squiggle 1 birds
    [
      {
        label: "Dancing flamingo",
        extras: (
          <>
            <circle cx="75" cy="48" r="5" fill="#333" />
            <polygon points="65,50 52,45 65,42" fill="#E8634A" />
            <line x1="100" y1="130" x2="95" y2="175" stroke="#333" strokeWidth="2" />
            <line x1="120" y1="125" x2="125" y2="175" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
      {
        label: "Curious owl",
        extras: (
          <>
            <circle cx="95" cy="88" r="8" stroke="#333" strokeWidth="2" fill="none" />
            <circle cx="110" cy="88" r="8" stroke="#333" strokeWidth="2" fill="none" />
            <circle cx="95" cy="88" r="3" fill="#333" />
            <circle cx="110" cy="88" r="3" fill="#333" />
            <polygon points="102,98 98,108 106,108" fill="#D97706" />
          </>
        ),
      },
      {
        label: "Pecking chicken",
        extras: (
          <>
            <circle cx="42" cy="110" r="4" fill="#333" />
            <polygon points="35,115 20,120 35,122" fill="#E8634A" />
            <line x1="90" y1="155" x2="85" y2="180" stroke="#333" strokeWidth="2" />
            <line x1="110" y1="155" x2="115" y2="180" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
    ],
    // Squiggle 2 birds
    [
      {
        label: "Flying eagle",
        extras: (
          <>
            <circle cx="100" cy="80" r="5" fill="#333" />
            <polygon points="108,78 120,82 108,85" fill="#D97706" />
            <line x1="50" y1="65" x2="30" y2="45" stroke="#333" strokeWidth="2" />
            <line x1="160" y1="65" x2="185" y2="45" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
      {
        label: "Waddling duck",
        extras: (
          <>
            <circle cx="55" cy="55" r="5" fill="#333" />
            <polygon points="45,60 30,58 45,55" fill="#D97706" />
            <line x1="140" y1="80" x2="135" y2="110" stroke="#333" strokeWidth="2" />
            <line x1="155" y1="75" x2="160" y2="110" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
      {
        label: "Sleeping bird",
        extras: (
          <>
            <path d="M 155 60 Q 160 55 165 60" stroke="#333" strokeWidth="2" fill="none" />
            <polygon points="170,65 183,62 170,70" fill="#E8634A" />
            <line x1="180" y1="92" x2="178" y2="115" stroke="#333" strokeWidth="2" />
            <line x1="192" y1="92" x2="195" y2="115" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
    ],
    // Squiggle 3 birds
    [
      {
        label: "Nesting bird",
        extras: (
          <>
            <circle cx="100" cy="60" r="5" fill="#333" />
            <polygon points="107,58 118,62 107,65" fill="#E8634A" />
            <path d="M 50 130 Q 80 145 110 130 Q 140 145 170 130" stroke="#8B6914" strokeWidth="3" fill="none" />
          </>
        ),
      },
      {
        label: "Parrot",
        extras: (
          <>
            <circle cx="145" cy="90" r="5" fill="#333" />
            <polygon points="155,88 168,92 155,95" fill="#D97706" />
            <line x1="75" y1="115" x2="55" y2="135" stroke="#4338CA" strokeWidth="2" />
            <line x1="70" y1="115" x2="45" y2="120" stroke="#E8634A" strokeWidth="2" />
            <line x1="65" y1="118" x2="40" y2="130" stroke="#0D7377" strokeWidth="2" />
          </>
        ),
      },
      {
        label: "Penguin",
        extras: (
          <>
            <circle cx="100" cy="58" r="5" fill="#333" />
            <polygon points="95,65 90,72 100,72" fill="#D97706" />
            <line x1="65" y1="100" x2="50" y2="115" stroke="#333" strokeWidth="2" />
            <line x1="140" y1="100" x2="155" y2="115" stroke="#333" strokeWidth="2" />
            <line x1="85" y1="130" x2="82" y2="150" stroke="#333" strokeWidth="2" />
            <line x1="110" y1="130" x2="113" y2="150" stroke="#333" strokeWidth="2" />
          </>
        ),
      },
    ],
  ];

  return birds[squiggleIndex];
}

export function SquiggleBirds() {
  const [currentSquiggle, setCurrentSquiggle] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const birds = makeBirds(currentSquiggle);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSquiggle((prev) => (prev + 1) % squiggles.length);
    setRevealed(false);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Current squiggle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSquiggle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <svg
            viewBox="0 0 230 190"
            className="h-[200px] w-[230px]"
            aria-label={`Squiggle ${currentSquiggle + 1} of ${squiggles.length}`}
          >
            <path
              d={squiggles[currentSquiggle]}
              fill="none"
              stroke="#333"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </AnimatePresence>

      <p className="font-display text-lg font-bold text-neutral-800">
        What could this become?
      </p>

      {!revealed && (
        <Button onClick={handleReveal}>
          Reveal
        </Button>
      )}

      {/* Revealed birds */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {birds.map((bird, i) => (
                <motion.div
                  key={bird.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.25, duration: 0.4 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="rounded-xl border border-neutral-200 bg-white p-3">
                    <svg viewBox="0 0 230 190" className="h-[140px] w-[170px]">
                      <path
                        d={squiggles[currentSquiggle]}
                        fill="none"
                        stroke="#333"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {bird.extras}
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-neutral-500">
                    {bird.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="max-w-md text-center text-sm italic text-neutral-500">
              Uncomfortable? Good. Good designers are comfortable being
              uncomfortable.
            </p>

            <Button variant="outline" onClick={handleNext}>
              Try another squiggle
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
