
const URI = 'https://mindhub-xj03.onrender.com/api/amazing'

function traerDatos(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let eventos = data.events;
            let eventUp = eventos.filter(evento => evento.date > data.currentDate)
            let eventPast = eventos.filter(evento => evento.date < data.currentDate)
            let eventDate = eventos.filter(evento => evento.date < data.currentDate)
            let menorPorcentaje = filtrarmenorPorcentaje(eventDate)
            let mayorPorcentaje = filtrarEventoMayorPorcentaje(eventDate)
            let mayorCap = filtrarmayorCap(eventos)
            let filtroCatUp = filtrarCategorias(eventUp)
            let eventosPorCategoriaUP = filtrareventosporCategoria(filtroCatUp, eventUp)
            let concurrenciaUp = concurrencia(eventosPorCategoriaUP)
            let porConcUp = calcularConcurrenciaCat(eventosPorCategoriaUP)
            let filtroCatPast = filtrarCategorias(eventPast)
            let eventCatPast = filtrareventosporCategoria(filtrarCategorias(eventPast), eventPast)
            let ConcurrenciPast = concurrencia(eventCatPast)
            let porConcPast = calcularConcurrenciaCat(eventCatPast)
            let catUp = calcularCategorias(filtroCatUp, concurrenciaUp, porConcUp)
            let catPast = calcularCategorias(filtroCatPast, ConcurrenciPast, porConcPast)
            pintarDatos(catUp, catPast, mayorPorcentaje, menorPorcentaje, mayorCap)
        })
}

function pintarDatos(arraycatUp, arraycatPast, eventomenorpor, eventomayorpor, eventomayorcap) {
    const primerosDatos = document.getElementById('table1')
    const contenedorUP = document.getElementById('upcomingTable')
    const contenedorPAST = document.getElementById('tablePast')
    const trPrimer = document.createElement('tr')
    trPrimer.innerHTML = `
    <td>${eventomenorpor}</td>
        <td>${eventomayorpor}</td>
        <td>${eventomayorcap}</td>
    `
    primerosDatos.appendChild(trPrimer)

    arraycatUp.forEach(categoria => {
        let trCategoria = document.createElement('tr')
        trCategoria.innerHTML = `
        <td>${categoria.name}</td>
        <td>${categoria.revenues.toLocaleString()}$</td>
        <td>${categoria.porcentaje.toFixed(2)}%</td>`
        contenedorUP.appendChild(trCategoria)
    })
    arraycatPast.forEach(categoria => {
        let trCategoria = document.createElement('tr')
        trCategoria.innerHTML = `
        <td>${categoria.name}</td>
        <td>${categoria.revenues.toLocaleString()}$</td>
        <td>${categoria.porcentaje.toFixed(2)}%</td>`
        contenedorPAST.appendChild(trCategoria)
    })

}

function concurrencia(arrayeventosporcategoria) {
    let arrayrevenues = []
    arrayeventosporcategoria.forEach(array => {
        let revenuescat = []
        for (let i = 0; i < array.length; i++) {
            let revenue;
            if (array[i].hasOwnProperty('estimate')) {
                revenue = array[i].estimate * array[i].price
            } else {
                revenue = array[i].assistance * array[i].price
            }
            revenuescat.push(revenue)
        }
        arrayrevenues.push(revenuescat.reduce((i, e) => i + e))
    })
    return arrayrevenues
}

function calcularCategorias(arraycategorias, arrayrevenues, arrayporcentajes) {
    let arrayCategoriasCalculadas = []
    for (let i = 0; i < arraycategorias.length; i++) {
        categoriaCalculada = {
            name: arraycategorias[i],
            revenues: arrayrevenues[i],
            porcentaje: arrayporcentajes[i]
        }
        arrayCategoriasCalculadas.push(categoriaCalculada)
    }
    return arrayCategoriasCalculadas;
}

function calcularConcurrenciaCat(arrayeventosporcategoria) {
    let arrayporcentajes = []
    arrayeventosporcategoria.forEach(array => {
        let resultado = 0
        for (let i = 0; i < array.length; i++) {
            resultado = resultado + calculoporcentajeAsistencia(array[i])
        }
        arrayporcentajes.push(resultado / array.length)
    })
    return arrayporcentajes;
}


function filtrareventosporCategoria(arraycategorias, eventUp) {
    let arrayeventosporcategoria = []
    arraycategorias.forEach(categoria => {
        filtradosporcategoria = eventUp.filter(evento => evento.category == categoria)
        arrayeventosporcategoria.push(filtradosporcategoria)
    })
    return arrayeventosporcategoria;
}

function filtrarCategorias(eventos) {
    arrayCategorias = []
    eventos.forEach(evento => {
        if (!arrayCategorias.includes(evento.category)) {
            arrayCategorias.push(evento.category)
        }
    });
    return arrayCategorias;
}

function filtrarmayorCap(eventos) {
    return eventos.sort((a, b) => b.capacity - a.capacity)[0].name
}

function filtrarEventoMayorPorcentaje(eventos) {
    let eventomayor = eventos[0]
    for (i = 1; i < eventos.length; i++) {
        if (calculoporcentajeAsistencia(eventos[i]) > calculoporcentajeAsistencia(eventomayor)) {
            eventomayor = eventos[i]
        }
    }
    return eventomayor.name;
}

function filtrarmenorPorcentaje(eventos) {
    let eventomenor = eventos[0]
    for (i = 1; i < eventos.length; i++) {
        if (calculoporcentajeAsistencia(eventos[i]) < calculoporcentajeAsistencia(eventomenor)) {
            eventomenor = eventos[i]
        }
    }
    return eventomenor.name;
}

function calculoporcentajeAsistencia(evento) {
    let resultado
    if (evento.hasOwnProperty('assistance')) {
        resultado = ((evento.assistance * 100) / evento.capacity)
    } else {
        resultado = ((evento.estimate * 100) / evento.capacity)
    }
    return resultado;
}

traerDatos(URI)

