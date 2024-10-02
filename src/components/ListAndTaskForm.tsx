// src/components/ListAndTaskForm.tsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './styles/ListAndTaskForm.css';
import { ISubTask } from '../Interfaces/IList';

const ListAndTaskForm: React.FC = () => {
    const [idUsuario, setIdUsuario] = useState<string | null>(null);
    const [nomeLista, setNomeLista] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [subTasks, setSubTasks] = useState<{ titulo: string; descricao: string; }[]>([]); // Array de subtarefas

    useEffect(() => {
        // Recupera o ID do usuário do localStorage
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIdUsuario(userId);
            alert(userId)
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!idUsuario) {
            setMensagem('Erro: ID do usuário não encontrado.');
            return;
        }
    
        // Cria a lista e a tarefa em um único objeto
        const newListWithTask = {
            iduser: idUsuario,
            nome: nomeLista,
            tasks: [{
                titulo,
                descricao,
                prioridade,
                venceEm: dataVencimento,
                subTasks, // Adicionando as subtarefas
            }],
        };
    
        try {
            // Envia a requisição para criar a lista com a tarefa
            await api.post('/lista', newListWithTask);
            
            setMensagem('Lista e tarefa criadas com sucesso!');
            
            // Limpa os campos após criação
            setNomeLista('');
            setTitulo('');
            setDescricao('');
            setPrioridade('');
            setDataVencimento('');
            setSubTasks([]); // Limpa as subtarefas
        } catch (error) {
            console.error(error);
            setMensagem('Erro ao criar lista ou tarefa.');
        }
    };

    const handleAddSubTask = () => {
        // Adiciona uma nova subtarefa ao array
        setSubTasks([...subTasks, { titulo: '', descricao: '' }]);
    };

    const handleSubTaskChange = (index: number, key: keyof ISubTask, value: string) => {
        const updatedSubTasks = [...subTasks];
        updatedSubTasks[index][key] = value; // Usa 'key' como tipo de índice
        setSubTasks(updatedSubTasks);
    };

    return (
        <form onSubmit={handleSubmit} className="list-and-task-form">
            <h2>Criar Lista e Tarefa</h2>
            {mensagem && <p>{mensagem}</p>}
            {idUsuario ? (
                <>
                    <input 
                        type="text" 
                        placeholder="Nome da Lista" 
                        value={nomeLista} 
                        onChange={(e) => setNomeLista(e.target.value)} 
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
                    
                    {/* Adiciona subtarefas */}
                    <h3>Subtarefas</h3>
                    {subTasks.map((subTask, index) => (
                        <div key={index}>
                            <input 
                                type="text" 
                                placeholder="Título da Subtarefa" 
                                value={subTask.titulo} 
                                onChange={(e) => handleSubTaskChange(index, 'titulo', e.target.value)} 
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder="Descrição da Subtarefa" 
                                value={subTask.descricao} 
                                onChange={(e) => handleSubTaskChange(index, 'descricao', e.target.value)} 
                                required 
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSubTask}>Adicionar Subtarefa</button>
                    <br/>
                    <br/>
                    <button type="submit">Criar Lista e Tarefa</button>
                </>
            ) : (
                <p>Carregando ID do usuário...</p>
            )}
        </form>
    );
};

export default ListAndTaskForm;
