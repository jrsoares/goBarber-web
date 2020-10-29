import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // opicional
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  /*

    verifica cada input que foram registrados
    buscou a referencia dos inputs na DOM
    acessou a propriedade "value"
    e retornou um campo exatamente com o mesmo nome "fieldName"

  */

  // acessa o elemento na DOM, retornando a referencia do elemento HTML
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // hook que retorna varias propriedades, registerField - para registrar o campo
  const { fieldName, defaultValue, error, registerField } = useField(name);

  /*
    LEI: Sempre que formos criar uma function dentro de um componente (Function),
    vamos utilizar um hook chamado useCallback (ficam salvas na memoria, não são recriadas toda vez que o componente e renderizado)
  */

  // focus no input

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // verifica se o valor do input esta preenchido
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    // registro dos inputs
    registerField({
      name: fieldName,
      // current retorna o input
      ref: inputRef.current,
      // retorn o valor do input
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
