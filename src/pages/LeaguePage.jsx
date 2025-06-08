import { useState } from 'react';
import ResultModal from '../components/ResultModal';
import LeagueTableHeader from '../components/LeagueTable/Header';
import LeagueTableRow from '../components/LeagueTable/Row';
import { useLeagueTable } from '../hooks/useLeagueTable';
import UpcomingFixtures from '../components/fixtures/UpcomingFixtures';
import PlayedFixtures from '../components/fixtures/PlayedFixtures';

const LeaguePage = ({ players, fixtures, onResultSave, onNotify, sport }) => {
  const [selectedFixture, setSelectedFixture] = useState(null);
  const { leagueTable, winner } = useLeagueTable(players, fixtures);

  const handleModalSave = (fixtureId, score1, score2) => {
    onResultSave(fixtureId, score1, score2);
    setSelectedFixture(null);
  };

  const upcomingFixtures = fixtures.filter(f => !f.played);
  const playedFixtures = fixtures.filter(f => f.played).sort((a, b) => a.id.localeCompare(b.id));
  const isLeagueFinished = fixtures.length > 0 && upcomingFixtures.length === 0;

  return (
    <>
      {winner && (
        <div className="text-center p-4 mb-6 bg-yellow-400 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-200 rounded-lg shadow-lg animate-pulse">
          <h2 className="text-2xl font-bold">🏆 {winner.name} is the {sport} League Champion! 🏆</h2>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">League Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left">
              <LeagueTableHeader sport={sport} />
              <tbody>
                {leagueTable.map((player, index) => (
                  <LeagueTableRow key={player.id} player={player} index={index} isLeagueFinished={isLeagueFinished} sport={sport} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fixtures Column */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Fixtures</h2>
          <div className="space-y-6">
            <UpcomingFixtures fixtures={upcomingFixtures} onSelectFixture={setSelectedFixture} />
            <PlayedFixtures fixtures={playedFixtures} onSelectFixture={setSelectedFixture} />
          </div>
        </div>
      </div>
      {selectedFixture && <ResultModal fixture={selectedFixture} onSave={handleModalSave} onCancel={() => setSelectedFixture(null)} onNotify={onNotify} sport={sport} />}
    </>
  );
};

export default LeaguePage;
