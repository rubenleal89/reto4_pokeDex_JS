// let namePoken = "pikachu"
let poken = async (namePoken)=>{
  try{
    let apiPoken = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePoken}`)
    let pokemon = await apiPoken.json();
    console.log(pokemon);
    // console.log(pokemon.abilities);

    let divVerBusqueda = document.getElementById("div-ver-pokemon");
    divVerBusqueda.className="container-sm div-ver-pokemon d-md-flex justify-content-md-between";
    divVerBusqueda.innerHTML="";
      let divPoken = document.createElement("div");
      divPoken.className="div-caracteristicas text-center";
      let namePokemon = document.createElement("h1");
      namePokemon.textContent=pokemon.name;
      let imgPokenFront = document.createElement("img");
      imgPokenFront.src=pokemon.sprites.front_default;
      let imgPokenBack = document.createElement("img");
      imgPokenBack.src=pokemon.sprites.back_default;
      let divMoviPoken = document.createElement("div");
// Busqueda de movimientos
      divMoviPoken.className="div-movimientos gap-2";
      let arrayMovi = pokemon.moves;
      movimientos(arrayMovi,divMoviPoken);
// Busqueda de estadisticas
      let divEstadis = document.createElement("div");
      divEstadis.className="div-estadisticas align-items-center gap-3";
      let estadiPoken = pokemon.stats;
      estadisticas(estadiPoken,divEstadis);
      let tipoPoken = document.createElement("p")
      tipoPoken.textContent=`Tipo de pokemon: ${pokemon.types[0].type.name}`;
      let anchuraPoken = document.createElement("p");
      anchuraPoken.textContent=`Altura ${pokemon.height}`;
      let alturaPoken = document.createElement("p");
      alturaPoken.textContent=`Anchura ${pokemon.weight}`;
// Busqueda de habilidades
      let divHabilidad = document.createElement("div");
      divHabilidad.className="div-hablidades"
      let textHabilidades = document.createElement("h4");
      textHabilidades.textContent="Habilidades";
      let habilidad = pokemon.abilities;
      divHabilidad.insertAdjacentElement("beforeend",textHabilidades);
      habilidades(habilidad,divHabilidad);

      // divVerBusqueda.insertAdjacentElement("beforeend",divVerBusqueda);
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
    divVerBusqueda.className="container-sm div-ver-pokemon d-md-flex justify-content-md-between error";
    alert("El pokemon que intestas buscar no se encuentra");
  }
}

function movimientos(arrayMovi,divMoviPoken){
  let textMovimientos = document.createElement("h4");
  textMovimientos.textContent="Movimientos";
  textMovimientos.className="text-movimientos text-center";
  divMoviPoken.insertAdjacentElement("beforeend",textMovimientos);
  arrayMovi.forEach(element => {
    let movimientos = document.createElement("p");
    movimientos.textContent=element.move.name;
    divMoviPoken.insertAdjacentElement("beforeend",movimientos);
  });
}

function estadisticas(estadiPoken,divEstadis){
  let textEstadisticas = document.createElement("h4");
  textEstadisticas.textContent="Estadisticas";
  textEstadisticas.className="text-estadisticas text-center";
  divEstadis.insertAdjacentElement("beforeend",textEstadisticas);
  estadiPoken.forEach(element => {
    let statName = document.createElement("p");
    statName.textContent=element.stat.name;
    let baseStat = document.createElement("p");
    baseStat.textContent=element.base_stat;
    divEstadis.insertAdjacentElement("beforeend",statName);
    divEstadis.insertAdjacentElement("beforeend",baseStat);
  });
}

function habilidades(habilidad,divHabilidad){
  habilidad.forEach(element => {
    let habilidades = document.createElement("p");
    habilidades.textContent=element.ability.name;
    divHabilidad.insertAdjacentElement("beforeend",habilidades);
  });
}

function validacion(namePokemon){
  if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(namePokemon)){
    poken(namePokemon);
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