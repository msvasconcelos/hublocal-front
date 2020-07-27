import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiUser, FiInfo, FiSmile } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, TableContainer } from './styles';

interface dataTask {
  id: string;
  name: string;
  description: string;
  status: 'not_done' | 'in_progress' | 'done';
  // eslint-disable-next-line camelcase
  created_at: Date;
}

interface createTask {
  name: string;
  description: string;
  status: 'not_done' | 'in_progress' | 'done';
  // eslint-disable-next-line camelcase
  user_id: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  // const [name, setName] = useState<string>('');
  // const [description, setDesc] = useState<string>('');
  // const [status, setStatus] = useState<string>('');
  // return <h1>Página Dashboard2222</h1>;

  const [tasks, setTasks] = useState<dataTask[]>([]);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function loadTask(): Promise<void> {
      const response = await api.get('/task');
      console.log(response);

      const repository = response.data;

      setTasks(repository);
    }

    loadTask();
  }, []);

  const handleSubmit = useCallback(
    async ({ name, status, user_id, description }: createTask) => {
      const taskId = window.localStorage.getItem('@HubLocal:user');
      if (taskId) {
        const userId = JSON.parse(taskId);
        const testeIdUser = userId.id;
        await api.post('/task', {
          description,
          name,
          user_id: testeIdUser,
          status: 'not_done',
        });
        history.go(0);
      }

      // } catch (error) {
      //   console.log(error);
      //   throw new Error('erro ao cadastrar');
      //   return;
      // }
    },
    [],
  );

  async function deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/task/${id}`);
      history.go(0);
    } catch (error) {
      throw new Error('erro ao deletar');
    }
  }

  return (
    <>
      <Container>
        <div>
          <img src={logo} alt="Todo List" />
        </div>
        {/* <a href="/">Voltar</a> */}
        <Link to="/">Voltar</Link>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastrar novo Task</h1>

          <Input name="name" icon={FiSmile} placeholder="Nome da tarefa" />
          <Input name="description" icon={FiInfo} placeholder="Descricão" />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome da Tarefa</th>
                <th>Descricão</th>
                <th>Status</th>
                <th>Data criação</th>
                <th>#</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="title">{task.name}</td>
                  <td className="">{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.created_at}</td>

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
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
