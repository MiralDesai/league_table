const PlayedFixtures = ({ fixtures, onSelectFixture }) => (
  <div>
    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2 border-b-2 border-green-200 dark:border-green-500/50 pb-1">Results</h3>
    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
      {fixtures.length > 0 ? fixtures.map(f => (
        <div key={f.id} className="p-3 bg-gray-100 dark:bg-gray-700/60 rounded-lg flex justify-between items-center">
          <span className="font-medium">{f.player1.name}<span className="text-gray-400 dark:text-gray-500 mx-2">vs</span>{f.player2.name}</span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-green-800 dark:text-green-300">{f.score1} - {f.score2}</span>
            <button onClick={() => onSelectFixture(f)} className="text-xs bg-gray-400 dark:bg-gray-600 text-white font-semibold py-1 px-2 rounded-full hover:bg-gray-500 dark:hover:bg-gray-500">
              Edit
            </button>
          </div>
        </div>
      )) : <p className="text-sm text-gray-500 dark:text-gray-400">No results yet.</p>}
    </div>
  </div>
);

export default PlayedFixtures;
