export function calculatePlanetState(totalPoints) {

  if (totalPoints <= 20) {
    return {
      state: "POLLUTED",
      image: "/images/planet-sick.png"
    };
  }

  if (totalPoints <= 50) {
    return {
      state: "RECOVERING",
      image: "/images/planet-neutral.png"
    };
  }

  if (totalPoints <= 80) {
    return {
      state: "COZY",
      image: "/images/planet-cozy.png"
    };
  }

  return {
    state: "HEALTHY",
    image: "/images/planeta-feliz.png"
  };
}