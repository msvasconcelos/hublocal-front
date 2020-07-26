import React, { useRef, useCallback } from 'react';
import { FiArrowRight, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface SignInFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData): Promise<void> => {
      try {
        console.log(data);
        await signIn({
          email: data.email,
          senha: data.senha,
        });
        history.push('/dashboard');
      } catch (err) {
        console.log(err);
        throw new Error('erro ao logar');
        return;
      }
    },
    [signIn, history],
  );
  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="senha"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/register">
          <FiArrowRight size={20} />
          Criar conta
        </Link>
      </Content>
    </Container>
  );
};

export default Login;
