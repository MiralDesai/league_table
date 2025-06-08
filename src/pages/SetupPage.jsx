import { useRef } from 'react';
import { SPORTS, MAX_PLAYERS } from '../utils/constants';
import PlayerNameInput from '../components/Form/PlayerNameInput';
import FormSelect from '../components/Form/FormSelect';
import { useSetupForm } from '../hooks/useSetupForm';
import OrSeperator from '../components/OrSeperator';

const SetupPage = ({ onSetupComplete, onNotify, onDataImport, sport, onSportChange }) => {
  const importFileRef = useRef(null);
  const {
    numPlayers,
    setNumPlayers,
    playerNames,
    handleNameChange,
    leagueFormat,
    setLeagueFormat,
    handleStartLeague,
  } = useSetupForm(onSetupComplete, onNotify, sport);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">

        <FormSelect id="sport" label="Sport" value={sport} onChange={e => onSportChange(e.target.value)}>
          {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
        </FormSelect>

        <FormSelect id="leagueFormat" label="League Format" value={leagueFormat} onChange={e => setLeagueFormat(e.target.value)}>
          <option value="single">Single match (everyone plays each other once)</option>
          <option value="home_away">Home/Away (everyone plays each other twice)</option>
        </FormSelect>

        <FormSelect id="numPlayers" label="Number of Players" value={numPlayers} onChange={e => setNumPlayers(parseInt(e.target.value, 10))}>
          {[...Array(MAX_PLAYERS - 1)].map((_, i) => <option key={i + 2} value={i + 2}>{i + 2} Players</option>)}
        </FormSelect>

        <div className="space-y-3 mb-8">
          {playerNames.map((name, index) => (
            <PlayerNameInput key={index} index={index} name={name} onChange={handleNameChange} />
          ))}
        </div>

        <button onClick={handleStartLeague} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
          Start New League
        </button>

        <OrSeperator />
        
        <input type="file" accept=".json" ref={importFileRef} style={{ display: 'none' }} onChange={onDataImport} />
        <button onClick={() => importFileRef.current.click()} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105">
          Import Existing League
        </button>
      </div>
    </div>
  );
};

export default SetupPage;
