import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FactionHub } from './pages/FactionHub';
import { FactionInfo, FactionShips, FactionVideo } from './pages/FactionSubPages';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Faction Hub */}
          <Route path=":factionId" element={<FactionHub />} />
          
          {/* Sub Pages */}
          <Route path=":factionId/info" element={<FactionInfo />} />
          <Route path=":factionId/ships" element={<FactionShips />} />
          <Route path=":factionId/video" element={<FactionVideo />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;