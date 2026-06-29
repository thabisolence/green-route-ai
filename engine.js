function calculateScore(route, mode) {

  let score = 0;

  const time = route.estimated_time_min;
  const distance = route.distance_km;
  const fuel = route.fuel_litres * 10;
  const co2 = route.co2_kg * 10;

  if (mode === "eco") {
    score = (co2 * 0.5) + (fuel * 0.3) + (distance * 0.1) + (time * 0.1);
  }

  if (mode === "fast") {
    score = (time * 0.5) + (distance * 0.3) + (fuel * 0.1) + (co2 * 0.1);
  }

  if (mode === "balanced") {
    score = (distance * 0.3) + (time * 0.3) + (fuel * 0.2) + (co2 * 0.2);
  }

  return score;
}

function findBestRoute(routes, mode) {
  let best = null;
  let bestScore = Infinity;

  routes.forEach(r => {
    let s = calculateScore(r, mode);
    if (s < bestScore) {
      bestScore = s;
      best = r;
    }
  });

  return { bestRoute: best, bestScore };
}

function calculateCarbonSavings(ranked) {
  const worst = ranked[ranked.length - 1];
  const best = ranked[0];

  return {
    worstRoute: worst.name,
    bestRoute: best.name,
    worstCO2: worst.co2_kg,
    bestCO2: best.co2_kg,
    carbonSaved: (worst.co2_kg - best.co2_kg).toFixed(2)
  };
}
