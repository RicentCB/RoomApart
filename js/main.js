document.addEventListener('DOMContentLoaded', function () {

  // Construir Calendario
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    events: eventsEx,
  });
  calendar.render();

  /*----------------------- Modal para agregar evento -----------------------*/
  const modalAddEvent = document.querySelector(".modal#modal-addEvent");

  // Abrir modal de 
  document.querySelector("nav a#open-modal-event").addEventListener('click', e=>{
    modalAddEvent.classList.add('visible')
    modalAddEvent.querySelector(".modal-content").classList.add('visible');
  });

  // Boton Cerrar modal
  modalAddEvent.querySelector("a.close-modal").addEventListener('click', e=>{
    e.preventDefault();
    modalAddEvent.classList.remove('visible');
    modalAddEvent.querySelector(".modal-content").classList.remove('visible');
  })
  modalAddEvent.querySelector("a.btn-cancel").addEventListener('click', e=>{
    e.preventDefault();
    modalAddEvent.classList.remove('visible');
    modalAddEvent.querySelector(".modal-content").classList.remove('visible');
  })

});

const eventsEx = [
  {
    title: 'All Day Event',
    start: '2021-06-01',
    backgroundColor: "#ccc",
    borderColor: "#ff0095",
  },
  {
    title: 'Long Event',
    start: '2021-06-07',
    end: '2021-06-10'
  },
  {
    groupId: 999,
    title: 'Repeating Event',
    start: '2021-06-09T16:00:00'
  },
  {
    groupId: 999,
    title: 'Repeating Event',
    start: '2021-06-16T16:00:00'
  },
  {
    title: 'Conference',
    start: '2021-06-11',
    end: '2021-06-13'
  },
  {
    title: 'Meeting',
    start: '2021-06-12T10:30:00',
    end: '2021-06-12T12:30:00'
  },
  {
    title: 'Lunch',
    start: '2021-06-12T12:00:00'
  },
  {
    title: 'Meeting',
    start: '2021-06-12T14:30:00'
  },
  {
    title: 'Happy Hour',
    start: '2021-06-12T17:30:00'
  },
  {
    title: 'Dinner',
    start: '2021-06-12T20:00:00'
  },
  {
    title: 'Birthday Party',
    start: '2021-06-13T07:00:00'
  },
  {
    title: 'Click for Google',
    url: 'http://google.com/',
    start: '2021-06-28'
  }
]