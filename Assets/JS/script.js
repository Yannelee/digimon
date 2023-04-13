let body = document.getElementsByTagName('body')[0].id

//*FUNCION PARA CERRAR CARTA DE BUSQUEDA
let cerrar =()=>{
  let tarjetaDigimonList = document.getElementById('cardDigimon').classList
  tarjetaDigimonList.add('d-none')
}

//*SCRIPT PARA PAGINA INDEX.HTML
if (body == 'busqueda'){
  let select = document.getElementById('elegir_digimon')
  let tarjeta = document.getElementById('tarjeta')
  let buscar = document.getElementById('buscarDigimon')
  
  //.LISTADO DE DIGIMON
  fetch(`https://digimon-api.vercel.app/api/digimon`)
  .then(response => response.json())
  .then(datos => {
    for(let i = 0; i<datos.length; i++){
      let { name} = datos[i]
      select.innerHTML +=`<option value="${i}">${name}</option>`
    }
  });
  
  //.ELECCION DIGIMON DE LISTA
  let onChange = ()=> {
    let imgLogo = document.getElementById('card-logo').classList
    let tarjetaClass = tarjeta.classList
    let text = select.options[select.selectedIndex].text

    fetch(`https://digimon-api.vercel.app/api/digimon/name/${text}`)
    .then(response => response.json())
    .then(datos => {
      let { name, img, level } = datos[0]
      tarjeta.innerHTML = `
        <img src="${img}" class="card-img-top imgDigi" alt="Imagen de digimon ${name}">
        <ul class="list-group list-group-flush">
          <li class="list-group-item fs-3"><b>${name}</b></li>
          <li class="list-group-item"><b>Nivel: </b>${level}</li>
        </ul>
      `
    }); 
    imgLogo.add('d-none')
    tarjetaClass.remove('d-none')

  }
  select.onchange = onChange;

  //.CARD
  buscar.addEventListener('submit', function(event){
    let digimon = document.getElementById('digimonInput').value
    let tarjetaDigimon = document.getElementById('tarjetaDigimon')
    let tarjetaDigimonList = document.getElementById('cardDigimon').classList
    event.preventDefault();

    fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`)
    .then(response => response.json())
    .then(datos => {
      let { name, img, level } = datos[0];
      tarjetaDigimon.innerHTML = `
        <div class="text-end p-1">
          <button class="btn" id="cerrarCard" onclick="cerrar()"><i class="far fa-times-circle"></i></button>
        </div>
        <div class="card-title">
          <h2>${name}</h2>
        </div>
        <div class="card-body">
          <img src="${img}" class="card-img-top w-50" alt="Imagen de digimon ${name}">
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Nivel: </b>${level}</li>
        </ul>
      `
      tarjetaDigimonList.remove('d-none')
    })
    .catch(()=>{
      tarjetaDigimon.innerHTML = `
        <div class="text-end p-1">
          <button class="btn" id="cerrarCard" onclick="cerrar()"><i class="far fa-times-circle"></i></button>
        </div>
        <div class="card-title">
          <h2>Error</h2>
        </div>
        <div class="card-body">
          <p>Digimon <b>${digimon}</b> no encontrado</p>
        </div>
      `
      tarjetaDigimonList.remove('d-none')
    });
  });
};

//*SCRIPT PARA PAGINA LISTADODIGIMON.HTML
if (body == 'listado'){
  let tabla = document.getElementById('cuerpo-tabla')
  
  //.TABLA DE DIGIMON
  fetch(`https://digimon-api.vercel.app/api/digimon`)
  .then(response => response.json())
  .then(datos => {
    for(let i = 0; i<datos.length; i++){
      let { name, img, level} = datos[i]
      tabla.innerHTML += `
      <tr>
        <th scope="row"><img src="${img}" alt="digimon nombre" class="w-25"></th>
        <td>${name}</td>
        <td>${level}</td>
      </tr>
    `
    }
  });
}