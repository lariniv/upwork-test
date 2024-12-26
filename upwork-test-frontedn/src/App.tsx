import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import VideoPage from './pages/video/VideoPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/video/:id" element={<VideoPage />} />
    </Routes>
  );
};

export default App;
