// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import api from '../services/api';
import './styles/LoginForm.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate(); // Inicializando useNavigate

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/usuario/login', { email, senha });
            localStorage.setItem('token', response.data.token); // Armazena o token para requisições autenticadas
            localStorage.setItem('userId', response.data.id); // Armazena o ID do usuário
            setMensagem('Login bem-sucedido!');
            navigate('/listas'); // Redireciona para a página de listas após o login
        } catch (error) {
            console.error(error);
            setMensagem('Erro ao fazer login.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {mensagem && <p>{mensagem}</p>}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <br/>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
