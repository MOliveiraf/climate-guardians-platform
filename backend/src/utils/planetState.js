export function calculatePlanetState(totalPoints) {

  if (totalPoints <= 30) {
    return {
      state: "POLLUTED",
      image: "/images/planet_polluted.png"
    };
  }

  if (totalPoints <= 80) {
    return {
      state: "RECOVERING",
      image: "/images/planet_recovering.png"
    };
  }

  return {
    state: "HEALTHY",
    image: "/images/planet_healthy.png"
  };
}