const modalAddEvent = document.querySelector(".modal#modal-addEvent");

//Inyectar colores en el HTML del formulario
const OptionsColors = [
  {"color": "#023e8a","name": "Azul Obscuro"},
  {"color": "#00b4d8","name": "Azul"},
  {"color": "#0ead69","name": "Verde"},
  {"color": "#fca311","name": "Amarillo"},
  {"color": "#d00000","name": "Rojo"},
];
modalAddEvent.querySelector("#input-color").innerHTML = 
  OptionsColors.reduce((html, color) => {
    return html +
    `<a href="#" class="row-content option-color" color="${color["color"]}">
        <div class="color-content" style="background-color: ${color["color"]}"></div>
      <p>${color["name"]}</p>
    </a>
    `;
    }
  ,'')

// Una vez cargado todo el documento
document.addEventListener('DOMContentLoaded', function () {
  // Objeto para el envio de datos
  let addEventParams = {
    "title": '',
    "room": '',
    "color": '',
    "subject": '',
    "date": '',
    "timeStart": '',
    "timeEnd": ''
  }

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

  /*----------------- Modal para agregar evento -----------------*/
  // Abrir modal para Agregar Evento
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

  // Seleccionar Color
  modalAddEvent.querySelectorAll("a.option-color").forEach(domElement=>{
    domElement.addEventListener("click", e=>{
      e.preventDefault();
      //Remover otros colores
      modalAddEvent.querySelectorAll("a.option-color").forEach(child=>{
        child.classList.remove('selected');
      });
      //Agregar color Seleccionado
      let thisColor = e.target;
      if(! thisColor.classList.contains('row-content')){
        thisColor = thisColor.parentNode;
      }
      thisColor.classList.add('selected');
      //Modicar datos a enviar
      addEventParams["color"] = thisColor.getAttribute("color");
    })
  })

  // Boton de Enviar Datos en modal presionado
  modalAddEvent.querySelector("a.btn.submit").addEventListener("click", e=>{
    e.preventDefault();
    let data = new FormData();
    data.append("var1", "val1");
    data.append("var2", "val2");
    console.log(addEventParams);
    // PostRequest(data, "controller/events.ccontroller.php").then(ans=>{
    //   console.log(ans);
    // })
  });
});

// Metodo Post para enviar datos usando url y formData
const PostRequest = async (data = {}, url = '')=>(
  await fetch(url ,{
    method: "POST",
    body: data,
  }).then(response=>{
    if(response.ok){
      return response.text();
    }else{
      return {"error": response.statusText};
    }
  })
);

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