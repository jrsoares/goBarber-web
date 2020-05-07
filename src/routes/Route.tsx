import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

/* herda todas as propriedades do componente Route do "react-router-dom"
  e adiciona a propriedade isPrivate sendo opcional e component sendo do tipo
  React.ComponentType.
*/
interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  // dados do usuário autenticado
  const { user } = useAuth();
  return (
    /* Componente padrão do router-dom, render vai fazer a logica
     da exibição do componente */
    <ReactDOMRoute
      {...rest}
      // location - historico de acesso das rotas
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          /* redirecionando o usuário para o login caso o usuario não esteja
          logado, senão redirecinar pro dashboard */
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
