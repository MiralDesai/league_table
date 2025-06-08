const UpcomingFixtures = ({ fixtures, onSelectFixture }) => (
  <div>
    <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2 border-b-2 border-indigo-200 dark:border-indigo-500/50 pb-1">Upcoming</h3>
    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
      {fixtures.length > 0 ? fixtures.map(f => (
        <div key={f.id} className="p-3 bg-gray-100 dark:bg-gray-700/60 rounded-lg flex justify-between items-center">
          <span>{f.player1.name}<span className="text-gray-400 dark:text-gray-500 mx-2">vs</span>{f.player2.name}</span>
          <button onClick={() => onSelectFixture(f)} className="text-xs bg-indigo-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-indigo-600">
            Add Result
          </button>
        </div>
      )) : <p className="text-sm text-gray-500 dark:text-gray-400">All fixtures played!</p>}
    </div>
  </div>
);

export default UpcomingFixtures;
