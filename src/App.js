import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
   // setRepositories([...repositories, `Novo Repo ${Date.now()}`]) 
    const response = await api.post('/repositories', {
      title: `Novo Repo ${Date.now()}`,
      techs: ['NodeJS', 'ReactJS']
    });
    const repository = response.data

    setRepositories([...repositories, repository]);
  }


  async function handleRemoveRepository(id) {

    api.delete('/repositories/' + id).then(res => {
        const repositoryIndex = repositories.findIndex(repository => {
            return repository.id === id
        })

        repositories.splice(repositoryIndex, 1)
        console.log(repositories)
        setRepositories([
            ...repositories
        ])
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li>
       )
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;