import React, { useState } from 'react';
import './App.css';
import Components from './components';

const { HeroGrid, Header, RoleFilter, TabNavigation } = Components;

// Mock data for all Overwatch 2 heroes
const heroesData = [
  { name: "Ana", role: "Support", image: "https://i.imgur.com/isyo8dm.png" },
  { name: "Ashe", role: "Damage", image: "https://i.imgur.com/Dt9yFlZ.png" },
  { name: "Baptiste", role: "Support", image: "https://i.imgur.com/NFoVTB1.png" },
  { name: "Bastion", role: "Damage", image: "https://i.imgur.com/16QTi3l.png" },
  { name: "Brigitte", role: "Support", image: "https://i.imgur.com/DRJAOvU.png" },
  { name: "Cassidy", role: "Damage", image: "https://i.imgur.com/44kC7Wp.png" },
  { name: "D.Va", role: "Tank", image: "https://i.imgur.com/fs6L7r2.png" },
  { name: "Doomfist", role: "Tank", image: "https://i.imgur.com/u3tZVBp.png" },
  { name: "Echo", role: "Damage", image: "https://i.imgur.com/kkb1KwH.png" },
  { name: "Freja", role: "Damage", image: "https://i.imgur.com/S5r6NHM.png" },
  { name: "Genji", role: "Damage", image: "https://i.imgur.com/F5HDCSr.png" },
  { name: "Hanzo", role: "Damage", image: "https://i.imgur.com/QopdlyF.png" },
  { name: "Hazard", role: "Tank", image: "https://i.imgur.com/ll0Z5E4.png" },
  { name: "Illari", role: "Support", image: "https://i.imgur.com/QiVFjmh.png" },
  { name: "Junker Queen", role: "Tank", image: "https://i.imgur.com/qk57SjY.png" },
  { name: "Junkrat", role: "Damage", image: "https://i.imgur.com/15h0XVK.png" },
  { name: "Juno", role: "Support", image: "https://i.imgur.com/uBcOgMV.png" },
  { name: "Kiriko", role: "Support", image: "https://i.imgur.com/SjBOEML.png" },
  { name: "Lifeweaver", role: "Support", image: "https://i.imgur.com/MyUZbnB.png" },
  { name: "Lúcio", role: "Support", image: "https://i.imgur.com/HVEad0a.png" },
  { name: "Mauga", role: "Tank", image: "https://i.imgur.com/hADiTTW.png" },
  { name: "Mei", role: "Damage", image: "https://i.imgur.com/fk4dOD3.png" },
  { name: "Mercy", role: "Support", image: "https://i.imgur.com/eYENwgY.png" },
  { name: "Moira", role: "Support", image: "https://i.imgur.com/NzALvVG.png" },
  { name: "Orisa", role: "Tank", image: "https://i.imgur.com/iLHsRuI.png" },
  { name: "Pharah", role: "Damage", image: "https://i.imgur.com/7pPzER6.png" },
  { name: "Ramattra", role: "Tank", image: "https://i.imgur.com/D865c06.png" },
  { name: "Reaper", role: "Damage", image: "https://i.imgur.com/ut4TVun.png" },
  { name: "Reinhardt", role: "Tank", image: "https://i.imgur.com/NqeRUVl.png" },
  { name: "Roadhog", role: "Tank", image: "https://i.imgur.com/Fn3cjMl.png" },
  { name: "Sigma", role: "Tank", image: "https://i.imgur.com/bAOUVqW.png" },
  { name: "Sojourn", role: "Damage", image: "https://i.imgur.com/hKQgOlB.png" },
  { name: "Soldier: 76", role: "Damage", image: "https://i.imgur.com/s96W24d.png" },
  { name: "Sombra", role: "Damage", image: "https://i.imgur.com/p38Fiw1.png" },
  { name: "Symmetra", role: "Damage", image: "https://i.imgur.com/swEkLNZ.png" },
  { name: "Torbjörn", role: "Damage", image: "https://i.imgur.com/zexhWW4.png" },
  { name: "Tracer", role: "Damage", image: "https://i.imgur.com/5nxK2mJ.png" },
  { name: "Venture", role: "Damage", image: "https://i.imgur.com/q44tsj7.png" },
  { name: "Widowmaker", role: "Damage", image: "https://i.imgur.com/swnCSAr.png" },
  { name: "Winston", role: "Tank", image: "https://i.imgur.com/pLOv5Ja.png" },
  { name: "Wrecking Ball", role: "Tank", image: "https://i.imgur.com/rucw5fm.png" },
  { name: "Zarya", role: "Tank", image: "https://i.imgur.com/DmJuOnf.png" },
  { name: "Zenyatta", role: "Support", image: "https://i.imgur.com/4JTeCq9.png" }
];

function App() {
  const [activeTab, setActiveTab] = useState('1v1');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedHero, setSelectedHero] = useState(null);

  const filteredHeroes = selectedRole === 'All' 
    ? heroesData 
    : heroesData.filter(hero => hero.role === selectedRole);

  const handleHeroSelect = (hero) => {
    setSelectedHero(hero);
    // Here you could add logic to show counter picks
    console.log(`Selected hero: ${hero.name} (${hero.role})`);
  };

  return (
    <div className="app">
      <div className="background-gradient">
        <div className="container">
          <Header />
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <RoleFilter selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
          
          <div className="hero-selection-section">
            <h2 className="section-title">Select Enemy Hero</h2>
            <HeroGrid 
              heroes={filteredHeroes} 
              onHeroSelect={handleHeroSelect}
              selectedHero={selectedHero}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;