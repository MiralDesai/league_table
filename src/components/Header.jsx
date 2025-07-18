import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const Header = ({ page, sport, onDataExport, onLeagueReset, toggleTheme, theme }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleConfirmReset = () => {
    onLeagueReset();
    setShowResetConfirm(false);
  };

  return (
    <header className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400">{sport} League</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {page === 'setup' ? 'Create a new league' : 'Season Standings & Fixtures'}
        </p>
      </div>
      <div className="flex gap-2 flex-wrap justify-center items-center">
        {page === 'league' && (
          <>
            <button onClick={onDataExport} className="px-4 py-2 bg-green-500 dark:bg-green-800 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-700 shadow-sm font-semibold">Export</button>
            <button onClick={() => setShowResetConfirm(true)} className="px-4 py-2 bg-red-500 dark:bg-red-800 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 shadow-sm font-semibold">Reset</button>
          </>
        )}
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">{theme === 'light' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" /></svg>}</button>
      </div>
      {showResetConfirm && <ConfirmModal title="Confirm Reset" message="This will erase all players and results, returning you to the setup screen. Are you sure?" onConfirm={handleConfirmReset} onCancel={() => setShowResetConfirm(false)} />}
    </header>
  );
};

export default Header;
