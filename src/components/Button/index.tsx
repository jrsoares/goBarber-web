import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// QUANDO A INTERFACE SÓ EXTENDE ATRIBUTOS DE OUTRAS INTERFACES.

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
