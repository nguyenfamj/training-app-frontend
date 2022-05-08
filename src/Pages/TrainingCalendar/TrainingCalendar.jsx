import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import './TrainingCalendar.css';

import { add } from 'date-fns';

import { useTrainingsWithCustomerQuery } from '../../Services/trainingsAPI';

const TrainingCalendar = () => {
  const { data } = useTrainingsWithCustomerQuery();
  console.log(data);

  const events = data?.data.map((event) => ({
    title: `${event.activity}/${event.customer.firstname}`,
    start: event.date,
    end: add(new Date(event.date), { minutes: event.duration }),
  }));

  return (
    <div className='page-container-calendar'>
      <div>
        <h3 className='heading'>Calendar</h3>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        initialView='dayGridMonth'
        height='75vh'
        events={events}
      />
    </div>
  );
};

export default TrainingCalendar;
