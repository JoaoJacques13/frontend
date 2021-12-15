import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import logoImg from '../../assets/logo.svg'

import './style.css'

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');

  const navigate = useNavigate();

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try{
      await api.post('Incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      navigate('/profile');
    } catch (err) {
      alert('Erro ao cadastrar novo caso!!!')
    }

    
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt='Be The Hero'/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamentne para encontrar um herói para resolver isso.</p>

          <Link className='back-link' to="/profile">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}></input>
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>
          <input 
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}></input>

          <button 
            className="button" 
            type="submit"> Cadastrar </button>
          
        </form>
      </div>
    </div>
  )
}