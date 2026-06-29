function generateOutput(result, mode) {
  return {
    mode,
    bestRoute: result.bestRoute.name,
    score: result.bestScore.toFixed(2)
  };
}

function displayOutput(output) {
  document.getElementById("outputBox").textContent =
    JSON.stringify(output, null, 2);
}

function displayCarbonSavings(s) {
  document.getElementById("carbonBox").textContent =
    `Best: ${s.bestRoute}
Worst: ${s.worstRoute}
CO₂ Saved: ${s.carbonSaved} kg`;
}
