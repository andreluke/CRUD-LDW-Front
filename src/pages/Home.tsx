// src/pages/Home.tsx
import React from 'react';
import UserForm from '../components/UserForm';
import LoginForm from '../components/LoginForm';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Gerenciador de Tarefas</h1>
            <UserForm />
            <LoginForm />
        </div>
    );
};

export default Home;
