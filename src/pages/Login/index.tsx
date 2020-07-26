import React from 'react';
import { FiArrowRight, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <form>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </form>

        <Link to="/register">
          <FiArrowRight size={20} />
          Criar conta
        </Link>
      </Content>
    </Container>
  );
};

export default Login;
