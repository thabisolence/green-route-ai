function rankRoutes(routes, mode) {

  let ranked = routes.map(r => ({
    ...r,
    score: calculateScore(r, mode)
  }));

  ranked.sort((a, b) => a.score - b.score);

  return ranked;
}

function displayComparisonTable(ranked, mode) {

  let text = "Rank | Route | CO2 | Fuel | Time | Score\n";
  text += "--------------------------------------\n";

  ranked.forEach((r, i) => {
    text += `${i+1} | ${r.name} | ${r.co2_kg} | ${r.fuel_litres} | ${r.estimated_time_min} | ${r.score.toFixed(2)}\n`;
  });

  document.getElementById("comparisonBox").textContent = text;
}
