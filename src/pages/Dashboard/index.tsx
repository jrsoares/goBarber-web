import React from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectDate, setSelectDate] = React.useState(new Date());

  const handleDateChange = React.useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        setSelectDate(day);
      }
    },
    [],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img
              src="https://avatars1.githubusercontent.com/u/12559921?s=460&u=bd533eaa213c72a8d1403b028ad470e1e2af3297&v=4"
              alt={user.name}
            />
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
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
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
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
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
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
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
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            selectedDays={selectDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
