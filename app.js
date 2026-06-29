// ===============================
// LOGIN SYSTEM (UI CONTROL)
// ===============================
function enterSystem() {
  const user = document.getElementById("user").value;

  if (!user) {
    alert("Please enter your name");
    return;
  }

  // Hide login screen
  document.getElementById("loginScreen").style.display = "none";

  // Show main app
  document.getElementById("app").style.display = "block";
}


// ===============================
// LOADING ANIMATION
// ===============================
function showAILoading() {
  document.getElementById("outputBox").textContent = "AI Processing...";
  document.getElementById("comparisonBox").textContent = "Analyzing routes...";
  document.getElementById("explanationBox").textContent = "Generating insights...";
}


// ===============================
// CHART (REAL SIMPLE VISUAL)
// ===============================
function renderRealChart(ranked) {
  const container = document.getElementById("chartContainer");
  container.innerHTML = "";

  const maxCO2 = Math.max(...ranked.map(r => r.co2_kg));
  const maxFuel = Math.max(...ranked.map(r => r.fuel_litres));
  const maxTime = Math.max(...ranked.map(r => r.estimated_time_min));

  ranked.forEach(r => {

    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <div><b>${r.name}</b></div>

      CO₂
      <div style="background:#ef4444;height:10px;width:${(r.co2_kg/maxCO2)*100}%"></div>

      Fuel
      <div style="background:#f59e0b;height:10px;width:${(r.fuel_litres/maxFuel)*100}%"></div>

      Time
      <div style="background:#3b82f6;height:10px;width:${(r.estimated_time_min/maxTime)*100}%"></div>
      <br>
    `;

    container.appendChild(wrapper);
  });
}


// ===============================
// MAP SIMULATION
// ===============================
function renderRouteMap(best) {
  document.getElementById("mapBox").textContent =
    "Route Simulation: " + best.name;
}


// ===============================
// CO2 ANIMATION
// ===============================
function animateCO2(value) {
  document.getElementById("co2Counter").textContent =
    value + " kg CO₂ saved";
}


// ===============================
// MAIN CONTROLLER
// ===============================
function runDashboard(mode) {

  showAILoading();

  setTimeout(() => {

    const result = findBestRoute(routes, mode);
    const ranked = rankRoutes(routes, mode);

    displayOutput(generateOutput(result, mode));
    displayComparisonTable(ranked, mode);

    renderRealChart(ranked);
    renderRouteMap(result.bestRoute);

    const savings = calculateCarbonSavings(ranked);
    displayCarbonSavings(savings);

    animateCO2(savings.carbonSaved);

    console.log(generateExplanation(result.bestRoute, ranked, mode));

  }, 1200);
}


// ===============================
// EXPORT REPORT
// ===============================
function exportPDF() {
  const ranked = rankRoutes(routes, "eco");

  let text = "GreenRoute AI Report\n\n";

  ranked.forEach((r, i) => {
    text += `${i + 1}. ${r.name} - Score: ${r.score.toFixed(2)}\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "GreenRoute_Report.txt";
  link.click();
                                 }
