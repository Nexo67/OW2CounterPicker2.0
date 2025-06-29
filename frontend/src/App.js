import React, { useState, useEffect } from 'react';
import './App.css';
import { heroesData, counterData, translations } from './data';
import Components from './components';

const { Header, TabNavigation, RoleFilter, HeroGrid, CounterDisplay, TeamBuilder, HeroModal } = Components;

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('1v1');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedEnemyTeam, setSelectedEnemyTeam] = useState([]);
  const [showCounters, setShowCounters] = useState(false);
  const [recommendedTeam, setRecommendedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalHero, setModalHero] = useState(null);
  const [modalType, setModalType] = useState('info'); // 'info' or 'counters'

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

  // Handle hero click - open modal instead of immediate action
  const handleHeroClick = (hero) => {
    setModalHero(hero);
    setModalType('info');
    setShowModal(true);
  };

  // Handle counter view from modal
  const handleViewCounters = (hero) => {
    if (activeTab === '1v1') {
      setSelectedHero(hero);
      setShowCounters(true);
    }
    setShowModal(false);
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
    setShowModal(false);
  };

  // Generate counter team for 5v5 - FIXED VERSION
  const generateCounterTeam = () => {
    if (selectedEnemyTeam.length === 0) return;

    try {
      const allCounters = [];
      
      // Collect all possible counters for the enemy team
      selectedEnemyTeam.forEach(enemy => {
        const enemyCounters = counterData[enemy.name];
        if (enemyCounters && Array.isArray(enemyCounters)) {
          enemyCounters.forEach(counter => {
            const counterHero = heroesData.find(h => h.name === counter.name);
            if (counterHero) {
              allCounters.push({
                ...counterHero,
                effectiveness: counter.effectiveness || 5,
                reason: counter.reason || { en: "Effective counter", es: "Counter efectivo" }
              });
            }
          });
        }
      });

      if (allCounters.length === 0) {
        // Fallback to default strong picks if no counters found
        const fallbackTeam = {
          tank: heroesData.find(h => h.name === 'Reinhardt'),
          damage: [
            heroesData.find(h => h.name === 'Soldier: 76'),
            heroesData.find(h => h.name === 'Tracer')
          ].filter(Boolean),
          support: [
            heroesData.find(h => h.name === 'Ana'),
            heroesData.find(h => h.name === 'Mercy')
          ].filter(Boolean)
        };
        setRecommendedTeam(fallbackTeam);
        setShowCounters(true);
        return;
      }

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
        counterFrequency[counter.name].totalEffectiveness += (counter.effectiveness || 5);
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
      if (!team.tank) {
        const fallbackTanks = ['Reinhardt', 'Winston', 'D.Va'];
        for (const tankName of fallbackTanks) {
          const tank = heroesData.find(h => h.name === tankName);
          if (tank) {
            team.tank = tank;
            break;
          }
        }
      }

      if (team.damage.length < 2) {
        const fallbackDamage = ['Soldier: 76', 'Tracer', 'Cassidy', 'Ashe'];
        for (const damageName of fallbackDamage) {
          if (team.damage.length >= 2) break;
          const damage = heroesData.find(h => h.name === damageName);
          if (damage && !team.damage.find(d => d.name === damage.name)) {
            team.damage.push(damage);
          }
        }
      }

      if (team.support.length < 2) {
        const fallbackSupport = ['Ana', 'Mercy', 'Lucio', 'Baptiste'];
        for (const supportName of fallbackSupport) {
          if (team.support.length >= 2) break;
          const support = heroesData.find(h => h.name === supportName);
          if (support && !team.support.find(s => s.name === support.name)) {
            team.support.push(support);
          }
        }
      }

      setRecommendedTeam(team);
      setShowCounters(true);

    } catch (error) {
      console.error('Error generating counter team:', error);
      // Fallback team in case of any errors
      const fallbackTeam = {
        tank: heroesData.find(h => h.name === 'Reinhardt'),
        damage: [
          heroesData.find(h => h.name === 'Soldier: 76'),
          heroesData.find(h => h.name === 'Tracer')
        ].filter(Boolean),
        support: [
          heroesData.find(h => h.name === 'Ana'),
          heroesData.find(h => h.name === 'Mercy')
        ].filter(Boolean)
      };
      setRecommendedTeam(fallbackTeam);
      setShowCounters(true);
    }
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

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalHero(null);
  };

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
              onHeroClick={handleHeroClick}
              selectedHero={selectedHero}
              selectedEnemyTeam={selectedEnemyTeam}
              activeTab={activeTab}
              t={t}
              language={language}
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

          {showModal && modalHero && (
            <HeroModal
              hero={modalHero}
              language={language}
              t={t}
              activeTab={activeTab}
              onClose={closeModal}
              onViewCounters={handleViewCounters}
              onSelectForTeam={handleEnemyTeamSelect}
              counterData={counterData}
              isInSelectedTeam={selectedEnemyTeam.find(h => h.name === modalHero.name)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;