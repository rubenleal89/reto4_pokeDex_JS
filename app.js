let poken = async (namePoken)=>{
  try{
    let apiPoken = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePoken}`)
    let pokemon = await apiPoken.json();

    let divVerBusqueda = document.getElementById("div-ver-pokemon");
    divVerBusqueda.className="container-sm div-ver-pokemon d-md-flex justify-content-md-evenly cargaPag";    
    divVerBusqueda.innerHTML="";
      let divPoken = document.createElement("div");
      divPoken.className="div-caracteristicas text-center";
      let namePokemon = document.createElement("h1");
      namePokemon.textContent=pokemon.name;
      let imgPokenFront = document.createElement("img");
      imgPokenFront.src=pokemon.sprites.front_default;
      let imgPokenBack = document.createElement("img");
      imgPokenBack.src=pokemon.sprites.back_default;
      let divMoviPoken = document.createElement("ul");
// Busqueda de movimientos
      divMoviPoken.className="div-movimientos containers-scroll gap-2";
      movimientos(pokemon,divMoviPoken);
// Busqueda de estadisticas
      let divEstadis = document.createElement("ul");
      divEstadis.className="div-estadisticas align-items-center gap-3";
      estadisticas(pokemon,divEstadis);
      let tipoPoken = document.createElement("p")
      tipePokemon(pokemon,tipoPoken);
      let anchuraPoken = document.createElement("p");
      anchuraPoken.textContent=`Altura ${pokemon.height}`;
      let alturaPoken = document.createElement("p");
      alturaPoken.textContent=`Anchura ${pokemon.weight}`;
// Busqueda de habilidades
      let divHabilidad = document.createElement("div");
      divHabilidad.className="div-hablidades"
      let textHabilidades = document.createElement("h4");
      textHabilidades.textContent="Habilidades";
      divHabilidad.insertAdjacentElement("beforeend",textHabilidades);
      habilidades(pokemon,divHabilidad);
// Eventos de Btn Area y caracteristicas
      ubicacionPoken(namePoken);
      let btnArea = document.getElementById("btnArea");
      btnArea.addEventListener("click",()=>{
        btnAreaPoken(divMoviPoken,divEstadis)});
      let btnCaracteristicas = document.getElementById("btnCaracteristicas")
      btnCaracteristicas.addEventListener("click",()=>{
        btnCaractPoken(divMoviPoken,divEstadis)})

      divVerBusqueda.insertAdjacentElement("beforeend",divPoken);
      divPoken.insertAdjacentElement("beforeend",namePokemon);
      divPoken.insertAdjacentElement("beforeend",tipoPoken);
      divPoken.insertAdjacentElement("beforeend",imgPokenFront);
      divPoken.insertAdjacentElement("beforeend",imgPokenBack);
      divPoken.insertAdjacentElement("beforeend",anchuraPoken);
      divPoken.insertAdjacentElement("beforeend",alturaPoken);
      divPoken.insertAdjacentElement("beforeend",divHabilidad);
      
      divVerBusqueda.insertAdjacentElement("beforeend",divMoviPoken);
      divVerBusqueda.insertAdjacentElement("beforeend",divEstadis);
  }
  catch(error){
    let divVerBusqueda = document.getElementById("div-ver-pokemon");
    divVerBusqueda.innerHTML="";
    divVerBusqueda.className="container-sm div-ver-pokemon d-md-flex justify-content-md-evenly error";
    alert("El pokemon que intestas buscar no se encuentra");
    console.log(error);
  }
  finally{
    let spinner = document.getElementById("spinner");
        spinner.className="spinerOculto"
  }
}

let ubicacionPoken = async (namePoken)=>{
  try{
  let apiPoken = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePoken}/encounters`)
  let ubiPoken = await apiPoken.json();

  let divVerBusqueda = document.getElementById("div-ver-pokemon"); 
    let textUbicacion = document.createElement("h4");
    textUbicacion.textContent="Areas Pokemon";
    let listaAreaPoken = document.createElement("ul");
    listaAreaPoken.className="d-none";
    listaAreaPoken.id="lista-area-poken";
    listaAreaPoken.insertAdjacentElement("beforeend",textUbicacion);

    ubiPoken.forEach(element => {
      let ubicacion = document.createElement("li");
      ubicacion.textContent=element.location_area.name;

      divVerBusqueda.insertAdjacentElement("beforeend",listaAreaPoken);
      listaAreaPoken.insertAdjacentElement("beforeend",ubicacion);
    });
  }
  catch(error){
    console.log(error);
    alert("ERROR al buscar las areas de los pokemons")
  }
  finally{
    let spinner = document.getElementById("spinner");
        spinner.className="spinerOculto"
  }
}

function btnAreaPoken(divMoviPoken,divEstadis){
  let areaPoken = document.getElementById("lista-area-poken");
  areaPoken.className="lista-area-poken containers-scroll";
  divMoviPoken.className="d-none";
  divEstadis.className="d-none";
}

function btnCaractPoken(divMoviPoken,divEstadis){
  let areaPoken = document.getElementById("lista-area-poken");
  areaPoken.className="lista-area-poken d-none";
  divMoviPoken.className="div-movimientos containers-scroll gap-2";
  divEstadis.className="div-estadisticas align-items-center gap-3";
}

function spinner(divVerBusqueda) {
  let divSpinner = document.createElement("div");
    divSpinner.className="spinner-border text-dark";
    let spinner = document.createElement("span");
    spinner.className="visually-hidden";
    spinner.textContent="Loading...";
    divSpinner.insertAdjacentElement("beforeend",spinner);
    divVerBusqueda.insertAdjacentElement("beforeend",divSpinner);
}

function tipePokemon(pokemon,tipoPoken) {
    let moveUrl = pokemon.types[0].type.url;
    let prom = fetch(moveUrl)
    .then((response)=>response.json())
    .then((data)=>{
      let arrayLenguage = data.names
      arrayLenguage.forEach(element => {
        if (element.language.name === "es") {
          tipoPoken.textContent=`Tipo de pokemon: ${element.name}`;
        }
      });
    })
    .catch(()=>{
      alert("ERROR, fallo en la busqueda de tipo del pokemon")
    });
}

function movimientos (pokemon,divMoviPoken){
  let textMovimientos = document.createElement("h4");
  textMovimientos.textContent="Movimientos";
  textMovimientos.className="text-movimientos text-center";
  divMoviPoken.insertAdjacentElement("beforeend",textMovimientos);

  let arrayMoves = pokemon.moves;
  arrayMoves.forEach(element => {
    let moveUrl = element.move.url;
    let prom = fetch(moveUrl)
    .then((response)=>response.json())
    .then((data)=>{
      let arrayLenguage = data.names
      arrayLenguage.forEach(element => {
        if (element.language.name === "es") {
          let movimientos = document.createElement("li");
          movimientos.textContent=element.name;
          divMoviPoken.insertAdjacentElement("beforeend",movimientos);
        }
      });
    })
    .catch(()=>{
      alert("ERROR, fallo en la busqueda de movimientos del pokemon")
    });
  });
}

function estadisticas(pokemon,divEstadis){
  let textEstadisticas = document.createElement("h4");
  textEstadisticas.textContent="Estadisticas";
  textEstadisticas.className="text-estadisticas text-center";
  divEstadis.insertAdjacentElement("beforeend",textEstadisticas);

  let estadiPoken = pokemon.stats;
  estadiPoken.forEach(element => {
    let baseStat = element.base_stat
    let statName  = document.createElement("li");
    iconEstadisticas(element,statName)

    let statsUrl = element.stat.url;
    let prom = fetch(statsUrl)
    .then((response)=>response.json())
    .then((data)=>{
      let arrayLenguage = data.names
      arrayLenguage.forEach(element => {
        if (element.language.name === "es") {
          statName.textContent=`${element.name}: ${baseStat}`;
          divEstadis.insertAdjacentElement("beforeend",statName);
        }
      });
    })
    .catch(()=>{
      alert("ERROR, fallo en la busqueda de estadisticas del pokemon")
    });
  });
}

function iconEstadisticas(element,statName){
    if(element.stat.name==="hp"){
      statName.className="hp-poken";
    }
    else if(element.stat.name==="attack"){
      statName.className="attack-poken";
    }
    else if(element.stat.name==="defense"){
      statName.className="defense-poken";
    }
    else if(element.stat.name==="special-attack"){
      statName.className="special-attack-poken";
    }
    else if(element.stat.name==="special-defense"){
      statName.className="special-defense-poken";
    }
    else if(element.stat.name==="speed"){
      statName.className="speed-poken";
    }
}

function habilidades(pokemon,divHabilidad){
  let habilidad = pokemon.abilities;

  habilidad.forEach(element => {
    let abilityUrl = element.ability.url;
    let prom = fetch(abilityUrl)
    .then((response)=>response.json())
    .then((data)=>{
      let arrayLenguage = data.names
      arrayLenguage.forEach(element => {
        if (element.language.name === "es") {
          let habilidades = document.createElement("p");
          habilidades.textContent=element.name;
          divHabilidad.insertAdjacentElement("beforeend",habilidades);
        }
    });
    })
    .catch(()=>{
      alert("ERROR, fallo en la busqueda de habilidades del pokemon")
    });
  });
}

function recargaUrl(){
  let url = window.location.pathname;
  let urlNew = `${url}?#`;
  history.pushState(null,"",urlNew)
}

function validacion(namePokemon){
  if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(namePokemon)){
    let spinner = document.getElementById("spinner");
    spinner.className="d-flex justify-content-center div-spinner";
    poken(namePokemon);

    let url = window.location.pathname;
    let urlNew = `${url}?NAME=${namePokemon}/enconters`;
    history.pushState(null,"",urlNew)

    formulario.reset();
  }
  else{
    alert("Solo se aceptan letras")
  }
}

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit",buscarPokemon);

function buscarPokemon(e){
  e.preventDefault();
  let pokemon = document.getElementById("pokemonName").value;
  let namePokemon = pokemon.toLowerCase();
  validacion(namePokemon);
}

document.addEventListener('DOMContentLoaded',recargaUrl);