import React, { useState, useEffect } from 'react';
import './App.css';
import { heroesData, counterData, translations } from './data';
import Components from './components';

const { Header, TabNavigation, RoleFilter, HeroGrid, CounterDisplay, TeamBuilder } = Components;

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('1v1');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedEnemyTeam, setSelectedEnemyTeam] = useState([]);
  const [showCounters, setShowCounters] = useState(false);
  const [recommendedTeam, setRecommendedTeam] = useState(null);

  const t = translations[language];

  // Filter heroes based on selected role
  const getFilteredHeroes = () => {
    let filtered = selectedRole === 'All' 
      ? [...heroesData] 
      : heroesData.filter(hero => hero.role === selectedRole);
    
    // Sort alphabetically
    if (selectedRole === 'All') {
      // Global A-Z regardless of class
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Alphabetically within role
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
  };

  // Handle hero selection for 1v1
  const handleHeroSelect = (hero) => {
    if (activeTab === '1v1') {
      setSelectedHero(hero);
      setShowCounters(true);
    }
  };

  // Handle enemy team selection for 5v5
  const handleEnemyTeamSelect = (hero) => {
    if (activeTab === '5v5') {
      if (selectedEnemyTeam.find(h => h.name === hero.name)) {
        // Remove hero if already selected
        setSelectedEnemyTeam(prev => prev.filter(h => h.name !== hero.name));
      } else if (selectedEnemyTeam.length < 5) {
        // Add hero if less than 5 selected
        setSelectedEnemyTeam(prev => [...prev, hero]);
      }
    }
  };

  // Generate counter team for 5v5
  const generateCounterTeam = () => {
    if (selectedEnemyTeam.length === 0) return;

    const allCounters = [];
    
    // Collect all possible counters for the enemy team
    selectedEnemyTeam.forEach(enemy => {
      const counters = counterData[enemy.name] || [];
      counters.forEach(counter => {
        const counterHero = heroesData.find(h => h.name === counter.name);
        if (counterHero) {
          allCounters.push({
            ...counterHero,
            effectiveness: counter.effectiveness,
            reason: counter.reason
          });
        }
      });
    });

    // Count counter frequency and effectiveness
    const counterFrequency = {};
    allCounters.forEach(counter => {
      if (!counterFrequency[counter.name]) {
        counterFrequency[counter.name] = {
          ...counter,
          count: 0,
          totalEffectiveness: 0
        };
      }
      counterFrequency[counter.name].count++;
      counterFrequency[counter.name].totalEffectiveness += counter.effectiveness;
    });

    // Sort by frequency and effectiveness
    const sortedCounters = Object.values(counterFrequency)
      .sort((a, b) => {
        const aScore = a.count * 2 + a.totalEffectiveness;
        const bScore = b.count * 2 + b.totalEffectiveness;
        return bScore - aScore;
      });

    // Build balanced team (1 Tank, 2 DPS, 2 Support)
    const team = {
      tank: null,
      damage: [],
      support: []
    };

    // Select best tank
    const tankCounters = sortedCounters.filter(c => c.role === 'Tank');
    if (tankCounters.length > 0) {
      team.tank = tankCounters[0];
    }

    // Select best damage heroes (2)
    const damageCounters = sortedCounters.filter(c => c.role === 'Damage');
    team.damage = damageCounters.slice(0, 2);

    // Select best support heroes (2)
    const supportCounters = sortedCounters.filter(c => c.role === 'Support');
    team.support = supportCounters.slice(0, 2);

    // Fill missing roles with strong general picks if needed
    if (!team.tank && heroesData.find(h => h.name === 'Reinhardt')) {
      team.tank = heroesData.find(h => h.name === 'Reinhardt');
    }
    if (team.damage.length < 2) {
      const fallbacks = ['Soldier: 76', 'Tracer', 'Cassidy'].map(name => 
        heroesData.find(h => h.name === name)
      ).filter(h => h && !team.damage.find(d => d.name === h.name));
      team.damage.push(...fallbacks.slice(0, 2 - team.damage.length));
    }
    if (team.support.length < 2) {
      const fallbacks = ['Ana', 'Mercy', 'Lucio'].map(name => 
        heroesData.find(h => h.name === name)
      ).filter(h => h && !team.support.find(s => s.name === h.name));
      team.support.push(...fallbacks.slice(0, 2 - team.support.length));
    }

    setRecommendedTeam(team);
    setShowCounters(true);
  };

  // Clear selections
  const clearSelections = () => {
    if (activeTab === '1v1') {
      setSelectedHero(null);
    } else {
      setSelectedEnemyTeam([]);
      setRecommendedTeam(null);
    }
    setShowCounters(false);
  };

  // Reset when switching tabs
  useEffect(() => {
    clearSelections();
  }, [activeTab]);

  return (
    <div className="app">
      <div className="background-gradient">
        <div className="container">
          <Header language={language} setLanguage={setLanguage} t={t} />
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
          
          {activeTab === '5v5' && (
            <TeamBuilder
              selectedEnemyTeam={selectedEnemyTeam}
              onGenerateCounters={generateCounterTeam}
              onClearTeam={clearSelections}
              t={t}
            />
          )}
          
          <RoleFilter selectedRole={selectedRole} setSelectedRole={setSelectedRole} t={t} />
          
          <div className="hero-selection-section">
            <h2 className="section-title">
              {activeTab === '1v1' ? t.selectEnemyHero : t.selectEnemyTeam}
            </h2>
            <HeroGrid 
              heroes={getFilteredHeroes()} 
              onHeroSelect={activeTab === '1v1' ? handleHeroSelect : handleEnemyTeamSelect}
              selectedHero={selectedHero}
              selectedEnemyTeam={selectedEnemyTeam}
              activeTab={activeTab}
              t={t}
            />
          </div>

          {showCounters && (
            <CounterDisplay
              activeTab={activeTab}
              selectedHero={selectedHero}
              recommendedTeam={recommendedTeam}
              counterData={counterData}
              language={language}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;