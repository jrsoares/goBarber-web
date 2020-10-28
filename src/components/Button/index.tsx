import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// QUANDO A INTERFACE SÓ EXTENDE ATRIBUTOS DE OUTRAS INTERFACES.

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
