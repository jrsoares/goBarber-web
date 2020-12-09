import React from 'react';

import { FiClock, FiPower } from 'react-icons/fi';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  console.log(user);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo, </span>
              <strong>{user.name}</strong>
            </div>
            <button type="button" onClick={() => signOut()}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendandos</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/12559921?s=460&u=bd533eaa213c72a8d1403b028ad470e1e2af3297&v=4"
                alt="Júnior Soares"
              />
              <strong>Júnior Soares</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
