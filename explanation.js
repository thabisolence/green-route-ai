function generateExplanation(best, ranked, mode) {

  let second = ranked[1];

  return `
Mode: ${mode}

Selected: ${best.name}

Reason:
- Optimized based on ${mode} strategy
- Compared against ${second.name}
- Better overall weighted score

Decision: Best route selected for efficiency and sustainability.
`;
}
