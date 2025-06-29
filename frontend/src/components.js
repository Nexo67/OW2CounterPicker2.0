import React from 'react';

const Header = ({ language, setLanguage, t }) => {
  return (
    <header className="header">
      <div className="language-selector" onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>
        <div className="flag-icon">
          {language === 'en' ? '🇺🇸' : '🇪🇸'}
        </div>
        <span>{language === 'en' ? 'EN' : 'ES'}</span>
      </div>
      <h1 className="main-title">{t.title}</h1>
      <p className="subtitle">{t.subtitle}</p>
    </header>
  );
};

const TabNavigation = ({ activeTab, setActiveTab, t }) => {
  return (
    <div className="tab-navigation">
      <button 
        className={`tab ${activeTab === '1v1' ? 'active' : ''}`}
        onClick={() => setActiveTab('1v1')}
      >
        {t.counterPicks1v1}
      </button>
      <button 
        className={`tab ${activeTab === '5v5' ? 'active' : ''}`}
        onClick={() => setActiveTab('5v5')}
      >
        {t.counterPicks5v5}
      </button>
    </div>
  );
};

const RoleFilter = ({ selectedRole, setSelectedRole, t }) => {
  const roles = [
    { name: 'All', icon: '🎯', label: t.all },
    { name: 'Tank', icon: '🛡️', label: t.tank },
    { name: 'Damage', icon: '⚔️', label: t.damage },
    { name: 'Support', icon: '❤️', label: t.support }
  ];

  return (
    <div className="role-filter">
      {roles.map(role => (
        <button
          key={role.name}
          className={`role-btn ${selectedRole === role.name ? 'active' : ''} ${role.name.toLowerCase()}`}
          onClick={() => setSelectedRole(role.name)}
        >
          <span className="role-icon">{role.icon}</span>
          <span className="role-name">{role.label}</span>
        </button>
      ))}
    </div>
  );
};

const TeamBuilder = ({ selectedEnemyTeam, onGenerateCounters, onClearTeam, t }) => {
  return (
    <div className="team-builder">
      <div className="selected-team-container">
        <h3 className="team-title">{t.selectedEnemyTeam} ({selectedEnemyTeam.length}/5)</h3>
        <div className="selected-team">
          {selectedEnemyTeam.map(hero => (
            <div key={hero.name} className="selected-hero-mini">
              <img src={hero.image} alt={hero.name} className="mini-hero-image" />
              <span className="mini-hero-name">{hero.name}</span>
            </div>
          ))}
          {[...Array(5 - selectedEnemyTeam.length)].map((_, index) => (
            <div key={`empty-${index}`} className="empty-slot">
              <span>+</span>
            </div>
          ))}
        </div>
        <div className="team-actions">
          <button 
            className="generate-counters-btn"
            onClick={onGenerateCounters}
            disabled={selectedEnemyTeam.length === 0}
          >
            {t.showCounterPicks}
          </button>
          <button 
            className="clear-team-btn"
            onClick={onClearTeam}
            disabled={selectedEnemyTeam.length === 0}
          >
            {t.clearTeam}
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroCard = ({ hero, onSelect, isSelected, isSelectedInTeam, activeTab, t }) => {
  const getRoleColor = (role) => {
    switch (role) {
      case 'Tank': return '#4A90E2';
      case 'Damage': return '#E74C3C';
      case 'Support': return '#2ECC71';
      default: return '#95A5A6';
    }
  };

  const isDisabled = activeTab === '5v5' && isSelectedInTeam && !isSelectedInTeam.find(h => h.name === hero.name);

  return (
    <div 
      className={`hero-card ${isSelected ? 'selected' : ''} ${isSelectedInTeam ? 'team-selected' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={() => onSelect(hero)}
    >
      <div className="hero-image-container">
        <img 
          src={hero.image} 
          alt={hero.name}
          className="hero-image"
          loading="lazy"
        />
        <div className="hero-overlay">
          <span className="hero-name">{hero.name}</span>
          <div className="hero-info">
            <div className="hero-strengths">
              <strong>{t.strengths}:</strong> {hero.strengths}
            </div>
            <div className="hero-weaknesses">
              <strong>{t.weaknesses}:</strong> {hero.weaknesses}
            </div>
          </div>
        </div>
      </div>
      <div 
        className="hero-role-bar"
        style={{ backgroundColor: getRoleColor(hero.role) }}
      >
        <span className="hero-role">{hero.role}</span>
      </div>
    </div>
  );
};

const HeroGrid = ({ heroes, onHeroSelect, selectedHero, selectedEnemyTeam, activeTab, t }) => {
  return (
    <div className="hero-grid">
      {heroes.map(hero => (
        <HeroCard
          key={hero.name}
          hero={hero}
          onSelect={onHeroSelect}
          isSelected={selectedHero?.name === hero.name}
          isSelectedInTeam={selectedEnemyTeam?.find(h => h.name === hero.name)}
          activeTab={activeTab}
          t={t}
        />
      ))}
    </div>
  );
};

const CounterDisplay = ({ activeTab, selectedHero, recommendedTeam, counterData, language, t }) => {
  if (activeTab === '1v1' && selectedHero) {
    const counters = counterData[selectedHero.name] || [];
    
    return (
      <div className="counter-display">
        <h2 className="counter-title">
          {t.counterPicksFor} {selectedHero.name}
        </h2>
        <div className="counters-grid">
          {counters.map(counter => (
            <div key={counter.name} className="counter-card">
              <div className="counter-hero-info">
                <span className="counter-hero-name">{counter.name}</span>
                <div className="effectiveness-bar">
                  <div 
                    className="effectiveness-fill"
                    style={{ width: `${counter.effectiveness * 10}%` }}
                  ></div>
                  <span className="effectiveness-text">{counter.effectiveness}/10</span>
                </div>
              </div>
              <div className="counter-reason">
                <strong>{t.whyEffective}</strong> {counter.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === '5v5' && recommendedTeam) {
    return (
      <div className="counter-display">
        <h2 className="counter-title">{t.recommendedCounterTeam}</h2>
        <div className="recommended-team">
          <div className="team-role-section">
            <h3 className="role-header tank-header">{t.tank}</h3>
            <div className="role-heroes">
              {recommendedTeam.tank && (
                <div className="recommended-hero tank">
                  <img src={recommendedTeam.tank.image} alt={recommendedTeam.tank.name} />
                  <span>{recommendedTeam.tank.name}</span>
                  {recommendedTeam.tank.reason && (
                    <div className="recommendation-reason">{recommendedTeam.tank.reason}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="team-role-section">
            <h3 className="role-header damage-header">{t.damage}</h3>
            <div className="role-heroes">
              {recommendedTeam.damage.map(hero => (
                <div key={hero.name} className="recommended-hero damage">
                  <img src={hero.image} alt={hero.name} />
                  <span>{hero.name}</span>
                  {hero.reason && (
                    <div className="recommendation-reason">{hero.reason}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="team-role-section">
            <h3 className="role-header support-header">{t.support}</h3>
            <div className="role-heroes">
              {recommendedTeam.support.map(hero => (
                <div key={hero.name} className="recommended-hero support">
                  <img src={hero.image} alt={hero.name} />
                  <span>{hero.name}</span>
                  {hero.reason && (
                    <div className="recommendation-reason">{hero.reason}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const Components = {
  Header,
  TabNavigation,
  RoleFilter,
  TeamBuilder,
  HeroCard,
  HeroGrid,
  CounterDisplay
};

export default Components;