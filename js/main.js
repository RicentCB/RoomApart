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
    "room": '0',
    "color": '',
    "subject": '',
    "date": '',
    "timeStart": '',
    "timeEnd": ''
  }

  // Construir Calendario
  const calendarDOM = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarDOM, {
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

  //Escribir titulo
  modalAddEvent.querySelector("#in-title").addEventListener('change', e=>{
    addEventParams["title"] = e.target.value;
  });

  //Seleccionar Salon
  modalAddEvent.querySelector("#in-room").addEventListener('change', e=>{
    addEventParams["room"] = e.target.value;
  });
  
  //Seleccionar Materia
  modalAddEvent.querySelector("#in-subject").addEventListener('change', e=>{
    addEventParams["subject"] = e.target.value;
  });

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

  //Seleccionar Dia
  modalAddEvent.querySelector("#in-date").addEventListener('change', e=>{
    addEventParams["date"] = e.target.value;
  });

  //Seleccionar Hora Inicial
  modalAddEvent.querySelector("#in-timeStart").addEventListener('change', e=>{
    addEventParams["timeStart"] = e.target.value;
  });

  //Seleccionar Hora Final
  modalAddEvent.querySelector("#in-timeEnd").addEventListener('change', e=>{
    addEventParams["timeEnd"] = e.target.value;
  });

  const infoModal = modalAddEvent.querySelector('.alert');
  // Boton de Enviar Datos en modal presionado
  modalAddEvent.querySelector("a.btn.submit").addEventListener("click", e=>{
    e.preventDefault();
    //Validaciones
    if(formIsValid()){
      //Crear objeto de datos para enviar
      let data = new FormData();
      Object.keys(addEventParams).forEach(key=>{
        data.append(key, addEventParams[key]);
      });
      //Solicitud POST
      PostRequest(data, "controller/events.ccontroller.php").then(ans=>{
        console.log(ans);
      })
    };
  });

    //Funcion para validar datos de formularip
  const formIsValid = ()=>{
    infoModal.classList.remove('active');

    //Creacion de fechas para compara horas de inicio y fin
    let dateStart = new Date(addEventParams["date"]+' '+addEventParams["timeStart"]+':00');
    let dateEnd = new Date(addEventParams["date"]+' '+addEventParams["timeEnd"]+':00');
    
    if(addEventParams["title"].trim() === ''){
      infoModal.innerHTML = 'El titulo es obligatario';
      infoModal.classList.add('active');
      modalAddEvent.querySelector("#in-title").focus();
      return false;
    }
    if(addEventParams["room"] == "0"){
      infoModal.innerHTML = 'Seleccione un salon';
      infoModal.classList.add('active');
      modalAddEvent.querySelector("#in-room").focus();
      return false;
    }
    if(modalAddEvent.querySelector("#in-subject").value.trim() === ''){
      infoModal.innerHTML = 'La unidad de aprendizaje es obligatoria';
      infoModal.classList.add('active');
      modalAddEvent.querySelector("#in-subject").focus();
      return false;
    }
    if(addEventParams["color"] === ''){
      infoModal.innerHTML = 'Seleccione un color';
      infoModal.classList.add('active');
      return false;
    }
    if(addEventParams["color"] === ''){
      infoModal.innerHTML = 'Seleccione un color';
      infoModal.classList.add('active');
      return false;
    }
    if(addEventParams["date"] === ''){
      infoModal.innerHTML = 'Eliga una fecha';
      infoModal.classList.add('active');
      modalAddEvent.querySelector("#in-date").focus();
      return false;
    }
    if(addEventParams["timeStart"] === ''){
      infoModal.innerHTML = 'Eliga hora de inicio';
      infoModal.classList.add('active');
      modalAddEvent.querySelector("#in-timeStart").focus();
      return false;
    }
    if(addEventParams["timeEnd"] === ''){
      infoModal.innerHTML = 'Eliga hora de termino';
      infoModal.classList.add('active');
      modalAddEvent.querySelector("#in-timeEnd").focus();
      return false;
    }
    if(dateStart >= dateEnd){
      infoModal.innerHTML = 'Revisa las horas de inicio y fin';
      infoModal.classList.add('active');
      return false;
    }
    return true;

  }

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