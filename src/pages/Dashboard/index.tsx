import React from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
import api from '../../services/api';

type MonthAvailabilityItem = {
  day: number;
  available: boolean;
};

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectDate, setSelectDate] = React.useState(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [monthAvailability, setMonthAvailability] = React.useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = React.useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        setSelectDate(day);
      }
    },
    [],
  );

  const handleMonthChange = React.useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  React.useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => setMonthAvailability(response.data));
  }, [currentMonth, user.id]);

  const disableDays = React.useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = React.useMemo(() => {
    return format(selectDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectDate]);

  const selectedWeekDay = React.useMemo(() => {
    return format(selectDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectDate]);
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
            {isToday(selectDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
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
            onMonthChange={handleMonthChange}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
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
