// utils/confetti.ts
import confetti from "canvas-confetti";

export const launchConfetti = () => {
  const noteMusique = confetti.shapeFromText({
    text: "🎶",
    scalar: 4,
    color: "white",
    fontFamily: "Arial",
  });

  const randomX = 0.2 + Math.random() * 0.3;
  const randomY = 0.3 + Math.random() * 0.4;

  confetti({
    particleCount: 100,
    spread: 360,
    origin: { x: randomX, y: randomY },
    shapes: [noteMusique],
    scalar: 3,
    gravity: 0.5,
    drift: 8,
    ticks: 100,
    startVelocity: 45,
    decay: 0.9,
    angle: 120,
  });
};

export const launchConfettiShop = () => {
  const noteMusique = confetti.shapeFromText({
    text: "🛒",
    scalar: 4,
    color: "white",
    fontFamily: "Arial",
  });

  const randomX = 0.2 + Math.random() * 0.3;
  const randomY = 0.3 + Math.random() * 0.4;

  confetti({
    particleCount: 100,
    spread: 360,
    origin: { x: randomX, y: randomY },
    shapes: [noteMusique],
    scalar: 3,
    gravity: 0.5,
    drift: 8,
    ticks: 100,
    startVelocity: 45,
    decay: 0.9,
    angle: 120,
  });
};
