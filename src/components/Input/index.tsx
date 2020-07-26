import React, { InputHTMLAttributes, useRef } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} ref={inputRef} />
    </Container>
  );
};

export default Input;
