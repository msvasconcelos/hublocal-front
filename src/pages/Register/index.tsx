import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content } from './styles';
import api from '../../services/api';

interface RegisterFormData {
  name: string;
  email: string;
  senha: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: RegisterFormData) => {
      try {
        console.log(data);
        await api.post('/users', data);
        history.push('/');
      } catch (error) {
        console.log(error);
        throw new Error('erro ao cadastrar');
        return;
      }
    },
    [useHistory],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="senha"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft size={20} />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default Register;
