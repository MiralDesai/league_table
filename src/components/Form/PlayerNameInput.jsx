const PlayerNameInput = ({ index, name, onChange }) => (
  <div>
    <label htmlFor={`player-${index}`} className="sr-only">Player {index + 1}</label>
    <input
      id={`player-${index}`}
      type="text"
      value={name}
      onChange={e => onChange(index, e.target.value)}
      placeholder={`Player ${index + 1} Name`}
      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 dark:placeholder-gray-400"
    />
  </div>
);

export default PlayerNameInput;
