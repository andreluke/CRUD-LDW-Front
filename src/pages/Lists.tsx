// src/pages/Lists.tsx
import React from 'react';
import ListAndTaskForm from '../components/ListAndTaskForm';
// import TaskForm from '../components/TaskForm';
import UserList from '../components/UserList';
import './Lists.css'; // Adicione o CSS específico para esta página

const Lists: React.FC = () => {
    return (
        <div className="lists-container">
            <h1>Gerenciamento de Listas</h1>
            <ListAndTaskForm />
            <UserList />
        </div>
    );
};

export default Lists;
