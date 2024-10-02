import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lists from './pages/Lists';
// Adicione outros componentes ou páginas conforme necessário

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listas" element={<Lists />} />

        </Routes>
    );
};

export default App;
