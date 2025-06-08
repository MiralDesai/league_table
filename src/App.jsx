import React, { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS, SPORTS } from './utils/constants';
import { generateFixtures } from './utils/fixtures';
import PageLayout from './components/PageLayout';
import Confetti from './components/Confetti';
import Notification from './components/Notification';
import SetupPage from './pages/SetupPage';
import LeaguePage from './pages/LeaguePage';

export default function App() {
  const [players, setPlayers] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [theme, setTheme] = useState('light');
  const [sport, setSport] = useState(SPORTS[0]);
  const [leagueFormat, setLeagueFormat] = useState('single');
  const [isLeagueSetup, setIsLeagueSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    // Load Data from Local Storage
    try {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.theme) || 'light';
      setTheme(savedTheme);
      const savedPlayers = localStorage.getItem(LOCAL_STORAGE_KEYS.players);
      if (savedPlayers) {
        const parsedPlayers = JSON.parse(savedPlayers);
        const savedFixtures = localStorage.getItem(LOCAL_STORAGE_KEYS.fixtures);
        const savedFormat = localStorage.getItem(LOCAL_STORAGE_KEYS.format) || 'single';
        const savedSport = localStorage.getItem(LOCAL_STORAGE_KEYS.sport) || SPORTS[0];
        setPlayers(parsedPlayers);
        setFixtures(savedFixtures ? JSON.parse(savedFixtures) : generateFixtures(parsedPlayers, savedFormat));
        setLeagueFormat(savedFormat);
        setSport(savedSport);
        setIsLeagueSetup(true);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setIsLeagueSetup(false);
    }
    setIsLoading(false);
  }, []);

  // --- Data & Theme Persistence ---
  useEffect(() => {
    document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    if (!isLoading && isLeagueSetup) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.players, JSON.stringify(players));
      localStorage.setItem(LOCAL_STORAGE_KEYS.fixtures, JSON.stringify(fixtures));
      localStorage.setItem(LOCAL_STORAGE_KEYS.format, leagueFormat);
      localStorage.setItem(LOCAL_STORAGE_KEYS.sport, sport);
    }
  }, [players, fixtures, isLoading, isLeagueSetup, leagueFormat, sport]);

  // --- Event Handlers ---
  const handleSetupComplete = (newPlayers, format, selectedSport) => {
    setPlayers(newPlayers);
    setLeagueFormat(format);
    setSport(selectedSport);
    setFixtures(generateFixtures(newPlayers, format));
    setIsLeagueSetup(true);
  };

  const handleResultSave = (fixtureId, score1, score2) => {
    const wasLeagueOver = fixtures.length > 0 && fixtures.every(f => f.played);
    const newFixtures = fixtures.map(f => f.id === fixtureId ? { ...f, score1, score2, played: true } : f);
    setFixtures(newFixtures);

    const isLeagueNowOver = newFixtures.every(f => f.played);
    if (!wasLeagueOver && isLeagueNowOver) {
      setIsCelebrating(true);
    }
  };

  const handleLeagueReset = () => {
    Object.values(LOCAL_STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    setPlayers([]);
    setFixtures([]);
    setSport(SPORTS[0]);
    setLeagueFormat('single');
    setIsLeagueSetup(false);
  };

  const handleDataExport = () => {
    const dataToExport = { players, fixtures, leagueFormat, sport };
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `${sport.toLowerCase().replace(' ', '-')}-league.json`);
    linkElement.click();
  };

  const handleDataImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.players && data.fixtures) {
          setPlayers(data.players);
          setFixtures(data.fixtures);
          setLeagueFormat(data.leagueFormat || 'single');
          setSport(data.sport || SPORTS[0]);
          setIsLeagueSetup(true);
        } else {
          setNotification("Import failed. File is missing required data.");
        }
      } catch (error) { setNotification("Import failed. Invalid file format."); }
    };
    reader.readAsText(file);
    event.target.value = null;
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  if (isLoading) return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900"><div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading League...</div></div>;

  return (
    <PageLayout
      page={isLeagueSetup ? 'league' : 'setup'}
      sport={sport}
      onDataExport={handleDataExport}
      onLeagueReset={handleLeagueReset}
      toggleTheme={toggleTheme}
      theme={theme}
    >
      {isCelebrating && <div className="fixed inset-0 z-40 cursor-pointer" onClick={() => setIsCelebrating(false)}><Confetti /></div>}
      {!isLeagueSetup ? (
        <SetupPage
          sport={sport}
          onSportChange={setSport}
          onSetupComplete={handleSetupComplete}
          onNotify={setNotification}
          onDataImport={handleDataImport}
        />
      ) : (
        <LeaguePage
          players={players}
          fixtures={fixtures}
          onResultSave={handleResultSave}
          onNotify={setNotification}
          sport={sport}
        />
      )}
      {notification && <Notification message={notification} onClear={() => setNotification(null)} />}
    </PageLayout>
  );
}
