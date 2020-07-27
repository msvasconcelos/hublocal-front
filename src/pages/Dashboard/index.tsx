import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import { Container } from './styles';

interface dataTask {
  id: string;
  name: string;
  description: string;
  status: 'not_done' | 'in_progress' | 'done';
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  // const [name, setName] = useState<string>('');
  // const [description, setDesc] = useState<string>('');
  // const [status, setStatus] = useState<string>('');
  // return <h1>Página Dashboard2222</h1>;

  const [tasks, setTasks] = useState<dataTask[]>([]);

  useEffect(() => {
    async function loadTask(): Promise<void> {
      const response = await api.get('/task');
      console.log(response);

      const repository = response.data;

      setTasks(repository);
    }

    loadTask();
  }, []);

  async function deleteTask(id: string): Promise<void> {
    await api.delete(`/task/${id}`);
    history.go(0);
  }

  return (
    <>
      <Container>
        <span>LISTA DE TASKS</span>
        {tasks.map(task => (
          <tr key={task.id}>
            <td className="name">{task.name}</td>
            <td className="name">{task.description}</td>
            <td className="name">{task.status}</td>
            <button
              type="submit"
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              Deletar
            </button>
          </tr>
        ))}
      </Container>
    </>
  );
};

export default Dashboard;
