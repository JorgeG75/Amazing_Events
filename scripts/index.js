const cardsContainer = document.getElementById("cards");
const checksContainer=document.getElementById('checkbox-container');
const search=document.getElementById('search')

function eventChecked(selector){
  selector.forEach(element=> element.addEventListener('click',()=>  filtroCheckbox(events,cardsContainer)));
}
search.addEventListener('input',()=>filtroInput(events,cardsContainer));
let events;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response=>response.json())
  .then(data=>{
    events=data.events
    pintarCrads(events,cardsContainer);
    pintarCheckbox(checksContainer,events);
    let checks=document.querySelectorAll('.checkbox');
    eventChecked(checks);
  })
  .catch(error=>console.log(error));



  function pintarCrads(data,container){
    container.innerHTML='';
    if(data.length<=0){
      container.innerHTML+=`
      <h1 class='text-center'>No se encontraron eventos con los filtros seleccionados. Por favor, ajuste los filtros e intente nuevamente.<h1>
      `
    }else{
      data.forEach((element)=>{
        container.innerHTML += `
        <div class="card m-2" style="width: 18rem;">
          <img src="${element.image}" class="card-img-top"  alt="image ${element.id}">
          <div class="card-body">
              <h5 class="card-title text-center">${element.name}</h5>
              <p class="card-text">${element.description}</p>
              <a href="./details.html?id=${element._id}" class="btn-sm btn btn-danger  flex-grow-1">Ver más...</a>
          </div>
        </div>
        `
      });
    }
};

function filtroInput(array,container){

  let checked=[...document.querySelectorAll('.checkbox:checked')];
  checked=checked.map(element=>element.value);
  let filterSearch=array.filter((element)=>element.name.toLowerCase().includes(search.value.toLowerCase())||
  element.category.toLowerCase().includes(search.value.toLowerCase()));
  
  let filterChecks=filterSearch.filter(element=>checked.includes(element.category)|| checked.length===0);

  pintarCrads(filterChecks,container)
}

function filtroCheckbox(array,container){

  let checked=[...document.querySelectorAll('.checkbox:checked')];
  checked=checked.map(element=>element.value);
  let filterChecks=array.filter(element=>checked.includes(element.category)|| checked.length===0);
  let filterSearch=filterChecks.filter((element)=>
  element.name.toLowerCase().includes(search.value.toLowerCase()));

  pintarCrads(filterSearch,container)
}

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
