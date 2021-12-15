import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // importando componente que relizar troca de páginas via SPA
import { FiLogIn } from 'react-icons/fi'; // Importanto icones

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('session', { id })

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      navigate('/profile');
    } catch (err) {
      alert('Falha, algo deu errado')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt='Be The Hero'/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"/>
          <button className="button" type="submit">Entrar</button>

          <Link className='back-link' to="/register">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt='heroes'/>
    </div>
  );
}