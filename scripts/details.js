//usando el fetch con sintaxix resumida
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function traerDatos(){
  try {
    let response = await fetch(urlApi);
    let datos = await response.json();
    console.log(datos)
    return datos;
    
  }
  catch (error){
    console.log(error.message);
  }
}

async function mostrarEvento(id) {
  const datos = await traerDatos();
  const evento = datos.events.find(evento => evento._id == id);
  console.log(evento)
  
  const div = document.querySelector(".cardDetails");

  div.innerHTML = ` 
  <div class="card container-fluid" style="width: 18em;">
    <img src="${evento.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="card-text">${evento.description}</p>
      <p class="card-text">Category: ${evento.category}</p>
      <p class="card-text">Date: ${evento.date}</p>
      <p class="card-text">Place: ${evento.place}</p>
      <p class="card-text">Capacity: ${evento.capacity}</p>
      <h6 class="card-title">Price: U$S ${evento.price}</h6>
      <a href="./index.html" class="btn-sm btn btn-danger">Volver</a>
    </div>
  </div>`;
}

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

mostrarEvento(id);
