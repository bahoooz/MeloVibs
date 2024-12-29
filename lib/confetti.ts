// utils/confetti.ts
import confetti from "canvas-confetti";

export const launchConfetti = () => {
  const noteMusique1 = confetti.shapeFromText({
    text: "🎅",
    scalar: 4,
    color: "white",
    fontFamily: "Arial"
  });

  const noteMusique2 = confetti.shapeFromText({
    text: "🎶",
    scalar: 4,
    color: "white",
    fontFamily: "Arial"
  });

  const randomX = 0.2 + Math.random() * 0.3;
  const randomY = 0.3 + Math.random() * 0.4;

  // Vérifier si l'écran est en mode mobile ou desktop
  const isLargeScreen = window.innerWidth >= 1024; // 1024px est le breakpoint lg standard
  const particleCount = isLargeScreen ? 500 : 250;

  confetti({
    particleCount,
    spread: 360,
    origin: { x: randomX, y: randomY },
    shapes: [noteMusique1, noteMusique2],
    scalar: 3,
    gravity: 0.5,
    drift: 8,
    ticks: 100,
    startVelocity: 45,
    decay: 0.9,
    angle: 120
  });
};
