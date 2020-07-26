import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const Register: React.FC = () => {
  return (
    <Container>
      <Content>
        <form>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </form>

        <Link to="/">
          <FiArrowLeft size={20} />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default Register;
