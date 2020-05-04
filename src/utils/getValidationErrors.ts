import { ValidationError } from 'yup';

interface Errors {
  // qualquer coisa: qualquer coisa ( sendo do tipo string).
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  // cria variavel do tipo errors inicializando vazia
  const validationErrors: Errors = {};

  // percorrer o ValidationError.inner, que tem as informações dos erros
  err.inner.forEach((error) => {
    // cria o objeto com a propriedade "name: "valor da mensagem"
    validationErrors[error.path] = error.message;
  });

  // retorna o objeto
  return validationErrors;
}
