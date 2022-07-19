import {useState} from 'react'
import { FiSearch } from 'react-icons/fi';
import './style.css'

import api from './services/api';
//01310930
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearce(){
    if(input === ''){
      alert("preenchar algum CEP")
      return;
    }
    try{
      const reponse = await api.get(`${input}/json`);
      setCep(reponse.data)
      setInput("")

    }catch{
      alert('Ops erro ao buscar!')
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
    
    <div className="containerInput">
      <input
       type="text"
       placeholder="Digite seu CEP.."
      value={input}
      onChange={(e)=> setInput(e.target.value)}
      />
    
    <button className="buttonSearch" onClick={handleSearce}>
      <FiSearch size={25} color="#FFF"/>
    </button>
   </div>
    
    {Object.keys(cep).length > 0 && (

       <main className='main'>
       <h2> CEP: {cep.cep}</h2>

       <span>{cep.locadouro}</span>
       <span>Complemento: {cep.logradouro}</span>
       <span>{cep.bairro}</span>
       <span>{cep.localidade} - {cep.uf}</span>

      </main>

    )}
   
    
    </div>
  );
}

export default App;
