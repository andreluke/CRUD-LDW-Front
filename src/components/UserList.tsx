// src/components/UserListsDisplay.tsx
import React, { useEffect, useState } from 'react';
import { IList } from '../Interfaces/IList';
import api from '../services/api';
import './styles/UserList.css';

const UserListsDisplay: React.FC = () => {
    const [lists, setLists] = useState<IList[]>([]);
    const [selectedList, setSelectedList] = useState<IList | null>(null);

    const fetchLists = async () => {
        try {
            const response = await api.get('/lista/mylist');
            setLists(response.data);
        } catch (error) {
            console.error('Erro ao buscar listas:', error);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    const handleListClick = (list: IList) => {
        setSelectedList(selectedList?.id === list.id ? null : list); // Alterna a lista selecionada
    };

    return (
        <div className="user-lists-display">
            <h2>Minhas Listas</h2>
            {lists.length > 0 ? (
                <ul>
                    {lists.map(list => (
                        <li key={list.id} onClick={() => handleListClick(list)} style={{ cursor: 'pointer' }}>
                            {list.nome}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma lista criada.</p> // Mensagem caso não haja listas
            )}

            {selectedList && ( // Renderiza as tarefas se uma lista estiver selecionada
                <div className="list-display">
                    <h3>{selectedList.nome}</h3>
                    {selectedList.tasks.map((task, index) => (
                        <div key={index}>
                            <h4>{task.titulo}</h4>
                            <p><strong>Descrição:</strong> {task.descricao}</p>
                            <p><strong>Prioridade:</strong> {task.prioridade}</p>
                            <p><strong>Data de Vencimento:</strong> {task.venceEm}</p>
                            {task.subTasks && task.subTasks.length > 0 && ( // Verifica se subTasks existe e se há subtarefas
                                <>
                                    <h4>Subtarefas:</h4>
                                    <ul>
                                        {task.subTasks.map((subTask, index) => (
                                            <li key={index}>{subTask.titulo}: {subTask.descricao}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserListsDisplay;
