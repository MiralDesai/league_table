import { useMemo } from 'react';

export const useLeagueTable = (players, fixtures) => {
  return useMemo(() => {
    const playedFixtures = fixtures.filter(f => f.played).sort((a, b) => a.id.localeCompare(b.id));

    const stats = players.map(player => {
      const playerMatches = playedFixtures.filter(f => f.player1.id === player.id || f.player2.id === player.id);
      let won = 0, drawn = 0, lost = 0, pf = 0, pa = 0;

      playerMatches.forEach(match => {
        const isPlayer1 = match.player1.id === player.id;
        const pScore = isPlayer1 ? match.score1 : match.score2;
        const oScore = isPlayer1 ? match.score2 : match.score1;

        if (pScore > oScore) won++;
        else if (pScore < oScore) lost++;
        else drawn++;

        pf += pScore;
        pa += oScore;
      });

      const form = playerMatches.slice(-3).map(match => {
        const isPlayer1 = match.player1.id === player.id;
        const pScore = isPlayer1 ? match.score1 : match.score2;
        const oScore = isPlayer1 ? match.score2 : match.score1;
        if (pScore > oScore) return 'W';
        if (pScore < oScore) return 'L';
        return 'D';
      });

      return {
        ...player,
        played: playerMatches.length, won, drawn, lost, pf, pa,
        pd: pf - pa, points: (won * 3) + (drawn * 1), form,
      };
    });

    const sortedTable = stats.sort((a, b) => b.points - a.points || b.pd - a.pd || b.pf - a.pf || a.name.localeCompare(b.name));
    const isLeagueOver = fixtures.length > 0 && fixtures.every(f => f.played);
    const winner = isLeagueOver ? sortedTable[0] : null;

    return { leagueTable: sortedTable, winner };
  }, [fixtures, players]);
};
