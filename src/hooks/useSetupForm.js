import { useState, useEffect } from 'react';

export const useSetupForm = (onSetupComplete, onNotify, sport) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState(Array(4).fill(''));
  const [leagueFormat, setLeagueFormat] = useState('single');

  useEffect(() => {
    setPlayerNames(currentNames => {
      const newNames = Array(numPlayers).fill('');
      for (let i = 0; i < Math.min(currentNames.length, numPlayers); i++) {
        newNames[i] = currentNames[i];
      }
      return newNames;
    });
  }, [numPlayers]);

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartLeague = () => {
    if (playerNames.some(name => name.trim() === '')) {
      onNotify("Please enter a name for every player.");
      return;
    }

    const trimmedNames = playerNames.map(name => name.trim().toLowerCase());
    if (new Set(trimmedNames).size !== trimmedNames.length) {
      onNotify("Player names must be unique. Please check for duplicates.");
      return;
    }

    const newPlayers = playerNames.map((name, index) => ({ id: `p${index + 1}`, name: name.trim() }));
    onSetupComplete(newPlayers, leagueFormat, sport);
  };

  return {
    numPlayers,
    setNumPlayers,
    playerNames,
    handleNameChange,
    leagueFormat,
    setLeagueFormat,
    handleStartLeague,
  };
};
