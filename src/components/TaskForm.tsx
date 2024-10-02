// src/components/TaskForm.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { CreateTask } from '../Interfaces/IList'; // Importando a interface
import './styles/TaskForm.css';

const TaskForm: React.FC = () => {
    const [idLista, setIdLista] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newTask: CreateTask = {
            id: idLista,
            taskData: {
                titulo,
                descricao,
                prioridade,
                venceEm: dataVencimento,
            },
        }; // Usando a interface

        try {
            await api.post('/lista/tarefa', newTask);
            setMensagem('Tarefa criada com sucesso!');
        } catch (error) {
            console.error(error);
            setMensagem('Erro ao criar tarefa.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>Criar Tarefa</h2>
            {mensagem && <p>{mensagem}</p>}
            <input 
                type="text" 
                placeholder="ID da Lista" 
                value={idLista} 
                onChange={(e) => setIdLista(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Título da Tarefa" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Descrição" 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Prioridade" 
                value={prioridade} 
                onChange={(e) => setPrioridade(e.target.value)} 
                required 
            />
            <input 
                type="datetime-local" 
                placeholder="Data de Vencimento" 
                value={dataVencimento} 
                onChange={(e) => setDataVencimento(e.target.value)} 
                required 
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default TaskForm;
