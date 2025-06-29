import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="language-selector">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkY0ODAwIi8+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K" alt="EN" />
        <span>EN</span>
      </div>
      <h1 className="main-title">Overwatch 2 Counter Picks</h1>
      <p className="subtitle">Master the meta with strategic hero selections</p>
    </header>
  );
};

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-navigation">
      <button 
        className={`tab ${activeTab === '1v1' ? 'active' : ''}`}
        onClick={() => setActiveTab('1v1')}
      >
        Counter Picks 1v1
      </button>
      <button 
        className={`tab ${activeTab === '5v5' ? 'active' : ''}`}
        onClick={() => setActiveTab('5v5')}
      >
        Counter Picks da Equipe 5v5
      </button>
    </div>
  );
};

const RoleFilter = ({ selectedRole, setSelectedRole }) => {
  const roles = [
    { name: 'All', icon: '🎯' },
    { name: 'Tank', icon: '🛡️' },
    { name: 'Damage', icon: '⚔️' },
    { name: 'Support', icon: '❤️' }
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
          <span className="role-name">{role.name}</span>
        </button>
      ))}
    </div>
  );
};

const HeroCard = ({ hero, onSelect, isSelected }) => {
  const getRoleColor = (role) => {
    switch (role) {
      case 'Tank': return '#4A90E2';
      case 'Damage': return '#E74C3C';
      case 'Support': return '#2ECC71';
      default: return '#95A5A6';
    }
  };

  return (
    <div 
      className={`hero-card ${isSelected ? 'selected' : ''}`}
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

const HeroGrid = ({ heroes, onHeroSelect, selectedHero }) => {
  return (
    <div className="hero-grid">
      {heroes.map(hero => (
        <HeroCard
          key={hero.name}
          hero={hero}
          onSelect={onHeroSelect}
          isSelected={selectedHero?.name === hero.name}
        />
      ))}
    </div>
  );
};

const Components = {
  Header,
  TabNavigation,
  RoleFilter,
  HeroCard,
  HeroGrid
};

export default Components;