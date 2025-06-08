import { useState } from 'react';
import { SPORTS_WITH_DRAWS } from '../utils/constants';

const ResultModal = ({ fixture, onSave, onCancel, onNotify, sport }) => {
  const [score1, setScore1] = useState(fixture.score1 ?? '');
  const [score2, setScore2] = useState(fixture.score2 ?? '');

  const handleSave = () => {
    const s1 = parseInt(score1, 10), s2 = parseInt(score2, 10);
    if (isNaN(s1) || isNaN(s2)) {
      onNotify("Please enter valid numbers for scores.");
      return;
    }
    if (!SPORTS_WITH_DRAWS.includes(sport) && s1 === s2) {
      onNotify(`Draws are not allowed in ${sport}. Please enter a winning score.`);
      return;
    }
    onSave(fixture.id, s1, s2);
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4 transition-opacity">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-2xl">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Enter Result</h3>
        <div className="flex justify-between items-center mb-6"><span className="font-semibold text-lg text-gray-700 dark:text-gray-200">{fixture.player1.name}</span><span className="text-gray-400 dark:text-gray-500 font-bold">vs</span><span className="font-semibold text-lg text-gray-700 dark:text-gray-200">{fixture.player2.name}</span></div>
        <div className="flex gap-4 mb-6">
          <input type="number" value={score1} onChange={(e) => setScore1(e.target.value)} className="w-full p-2 text-center text-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="P1" />
          <input type="number" value={score2} onChange={(e) => setScore2(e.target.value)} className="w-full p-2 text-center text-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="P2" />
        </div>
        <div className="flex justify-end gap-3"><button onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button><button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-500">Save</button></div>
      </div>
    </div>
  );
};

export default ResultModal;
