// src/components/UserForm.tsx
import React, { useState } from 'react';
import { IUser } from '../Interfaces/IUser';
import api from '../services/api';
import './styles/UserForm.css';

const UserForm: React.FC = () => {
    const [user, setUser] = useState<IUser>({
        id: '',
        nome: '',
        email: '',
        senha: ''
    });

    const [mensagem, setMensagem] = useState<string>('');
    const [erro, setErro] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensagem(''); // Limpa mensagens anteriores
        setErro(''); // Limpa erros anteriores

        try {
            await api.post('/usuario', user);
            setMensagem('Usuário criado com sucesso!');
        } catch (error) {
            console.error(error);
            setErro('Erro ao criar usuário. Tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2>Criar Usuário</h2>
            {mensagem && <p className="success-message">{mensagem}</p>}
            {erro && <p className="error-message">{erro}</p>}
            <input
                type="text"
                name="nome"
                placeholder="Nome"
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="senha"
                placeholder="Senha"
                onChange={handleChange}
                required
            />
            <br />
            <button type="submit">Criar</button>
        </form>
    );
};

export default UserForm;
