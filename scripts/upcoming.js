
let cardsContainer = document.getElementById("cards");
let checksContainer=document.getElementById('checkbox-container');
let search=document.getElementById('search')
let events;

function eventChecked(selector){
  selector.forEach(element=> element.addEventListener('click',()=>  filterCheckbox(events,cardsContainer)));
}
search.addEventListener('input',()=>filterInput(events,cardsContainer));

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response=>response.json())
  .then(data=>{
    events=data.events
    let currentDate=data.currentDate;
    events=events.filter(element=>currentDate<element.date);
    pintarCards(events,cardsContainer);
    pintarCheckbox(checksContainer,events);
    let checks=document.querySelectorAll('.checkbox');
    eventChecked(checks);
  })
  .catch(error=>console.log(error));

function filterInput(array, container) {
  let checked = [...document.querySelectorAll('.checkbox:checked')];
  checked = checked.map(element => element.value);
  let filterSearch = array.filter((element) => element.name.toLowerCase().includes(search.value.toLowerCase()) ||
    element.category.toLowerCase().includes(search.value.toLowerCase()) || element.description.toLowerCase().includes(search.value.toLowerCase()));

  let filterChecks = filterSearch.filter(element => checked.includes(element.category) || checked.length === 0);
  pintarCards(filterChecks, container)
}

function filterCheckbox(array, container) {
  let checked = [...document.querySelectorAll('.checkbox:checked')];
  checked = checked.map(element => element.value);
  let filterChecks = array.filter(element => checked.includes(element.category) || checked.length === 0);
  let filterSearch = filterChecks.filter((element) => element.name.toLowerCase().includes(search.value.toLowerCase()));
  pintarCards(filterSearch, container)
}


function pintarCards(data, container) {
  container.innerHTML = '';
  if (data.length <= 0) {
    container.innerHTML += `
      <h1 class='text-center'>No se encontraron eventos con los filtros seleccionados. Por favor, ajuste los filtros e intente nuevamente.<h1>
      `
  } else {
    data.forEach((element) => {
      container.innerHTML += `
        <div class="card m-2" style="width: 18rem;">
          <img src="${element.image}" class="card-img-top"  alt="image ${element.id}">
          <div class="card-body">
              <h5 class="card-title text-center">${element.name}</h5>
              <p class="card-text">${element.description}</p>
              <a href="./details.html?id=${element._id}" class="btn-sm btn btn-danger  flex-grow-1">Ver Mas..</a>
          </div>
        </div>
        `
    });
  }
};

function pintarCheckbox(container,array){
  let filterCategorys=(array.map((element)=>element.category));
  let categorys=[... new Set(filterCategorys)];
  container.innerHTML='';
  categorys.forEach((element)=>{
    container.innerHTML+=`
      <label>
        <input type="checkbox" name="Category" value="${element}" id="categori1" class="me-2 checkbox" />${element}
      </label>
    `
  });
};


// compara fechas parseando currentDate y (date)

// const currentDate = Date.parse(data.currentDate);

// const filteredEvents = data.events.filter(event => {
//   const eventDate = Date.parse(event.date);
//   return eventDate > currentDate; // eventos posteriores
// });

// // Mostrar los eventos filtrados por la consola
// console.log(filteredEvents);



// let cardContainer = document.getElementById("up-container");
// llenarTarjeta(filteredEvents)

// function llenarTarjeta(events) {
//   let newCard = document.querySelector(".upContainer")
//   filteredEvents.forEach(events => {
//     newCard.innerHTML += `
    
//   <div class="card container-fluid" style="width: 16rem;">
//   <img src="${events.image}" class="card-img-top" alt="...">
//   <div class="card-body">
//       <h5 class="card-title">"${events.name}"</h5>
//       <p class="card-text">"${events.description}"</p>
//       <h6 class="card-title">Price: U$S ${events.price}</h6>
//       <a href="./details.html?id=${events._id}" class="btn-sm btn btn-danger">ver más...</a>
//   </div>
// </div>`
//   })
// } 


// const searchInput = document.getElementById("search");
// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// const eventsList = document.getElementById("eventsList");



// // Función para filtrar los eventos por categoría y término de búsqueda
// function filterEvents() {
//   // Obtener los valores de los checkboxes seleccionados
//   const selectedCategories = Array.from(checkboxes)
//     .filter((checkbox) => checkbox.checked)
//     .map((checkbox) => checkbox.value);

//   // pasar a minusculas el texto ingresado
//   const searchTerm = searchInput.value.toLowerCase();

//   // Filtrar los eventos
//   const filteredEvents = data.events.filter(
//     (event) =>
//       (selectedCategories.length === 0 ||
//         selectedCategories.includes(event.category)) &&
//       (searchTerm.length === 0 ||
//         event.name.toLowerCase().includes(searchTerm) ||
//         event.description.toLowerCase().includes(searchTerm) ||
//         event.category.toLowerCase().includes(searchTerm))
      
//   );

//   // Mostrar los eventos filtrados
//   if (filteredEvents.length > 0) {
//     eventsList.innerHTML = "";
//     filteredEvents.forEach((event) => {
//       const eventItem = document.createElement("li");
//       eventItem.innerHTML = ` 
//       <div class="card container-fluid" style="width: 16rem;">
//       <img src="${event.image}" class="card-img-top" alt="...">
//       <div class="card-body">
//           <h5 class="card-title">"${event.name}"</h5>
//           <p class="card-text">"${event.description}"</p>
//           <h6 class="card-title">Price: U$S ${event.price}</h6>
//           <a href="#" class="btn-sm btn btn-danger">ver más...</a>
//       </div>
//     </div>`;
//       eventsList.appendChild(eventItem);
//     });
//   } else {
//     eventsList.innerHTML = "No se encontraron eventos con los filtros seleccionados. Por favor, ajuste los filtros e intente nuevamente.";
//   }
// }

// // Escuchar cambios en los checkboxes y el input de búsqueda
// checkboxes.forEach((checkbox) =>
//   checkbox.addEventListener("change", filterEvents)
// );
// searchInput.addEventListener("input", filterEvents);

// let data = null;
// const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

// async function traerDatos(){
//   try {
//     const response = await fetch(urlApi);
//     const eventos = await response.json();
//     data = eventos;
//     llenarTarjeta(data);
//   }
//   catch (error){
//     console.log(error.message);
//   }
// }

// traerDatos();

// function llenarTarjeta(events) {
//   let cardContainer = document.getElementById("up-container");
//   cardContainer.innerHTML = "";
//   if (events && events.events) {
//     events.events.forEach(event => {
//       const eventDate = new Date(event.date);
//       const currentDate = new Date();
//       if (eventDate > currentDate) {
//         cardContainer.innerHTML += `
//           <div class="card container-fluid" style="width: 16rem;">
//             <img src="${event.image}" class="card-img-top" alt="...">
//             <div class="card-body">
//               <h5 class="card-title">${event.name}</h5>
//               <p class="card-text">${event.description}</p>
//               <h6 class="card-title">Price: U$S ${event.price}</h6>
//               <a href="./details.html?id=${event._id}" class="btn-sm btn btn-danger">ver más...</a>
//             </div>
//           </div>
//         `;
//       }
//     });
//   }
// }
