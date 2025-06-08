export const generateFixtures = (players, format = 'single') => {
  const fixtures = [];
  if (!players || players.length < 2) return fixtures;

  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players.length; j++) {
      if (i === j) continue; // Skip playing against oneself

      if (format === 'single' && i > j) continue;

      fixtures.push({
        id: `fixture_${players[i].id}_vs_${players[j].id}`,
        player1: players[i],
        player2: players[j],
        score1: null, score2: null, played: false,
      });
    }
  }
  return fixtures;
};
