// let namePoken = "pikachu"
let poken = async (namePoken)=>{
  try{
    let apiPoken = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePoken}`)
    let pokemon = await apiPoken.json();
    console.log(pokemon);
    // console.log(pokemon.abilities);

    let divPantallaPoken = document.getElementById("pantalla-poken");
    divPantallaPoken.innerHTML="";
    let divVerBusqueda = document.createElement("div");
    divVerBusqueda.className="div-ver-pokemon";
      let namePokemon = document.createElement("h1");
      namePokemon.textContent=`Nombre: ${pokemon.name}`;
      let imgPokenFront = document.createElement("img");
      imgPokenFront.src=pokemon.sprites.front_default;
      let imgPokenBack = document.createElement("img");
      imgPokenBack.src=pokemon.sprites.back_default;
      let divMoviPoken = document.createElement("div");
// Busqueda de movimientos
      divMoviPoken.className="div-movimientos";
      let arrayMovi = pokemon.moves;
      arrayMovi.forEach(element => {
        let movimientos = document.createElement("p");
        movimientos.textContent=element.move.name;
        divMoviPoken.insertAdjacentElement("beforeend",movimientos);
      });
      let divEstadis = document.createElement("div");
  // Busqueda de estadisticas
      divEstadis.className="div-estadisticas";
      let estadiPoken = pokemon.stats;
      estadiPoken.forEach(element => {
        let statName = document.createElement("p");
        statName.textContent=element.stat.name;
        let baseStat = document.createElement("p");
        baseStat.textContent=element.base_stat;
        divEstadis.insertAdjacentElement("beforeend",statName);
        divEstadis.insertAdjacentElement("beforeend",baseStat);
      });
      let tipoPoken = document.createElement("p")
      tipoPoken.textContent=`Tipo de pokemon: ${pokemon.types[0].type.name}`;
      let anchuraPoken = document.createElement("p");
      anchuraPoken.textContent=`Altura ${pokemon.height}`;
      let alturaPoken = document.createElement("p");
      alturaPoken.textContent=`Anchura ${pokemon.weight}`;
// Busqueda de habilidades
      let divHabilidad = document.createElement("div");
      let habilidad = pokemon.abilities;
      habilidad.forEach(element => {
        let habilidades = document.createElement("p");
        habilidades.textContent=element.ability.name;
        divHabilidad.insertAdjacentElement("beforeend",habilidades);
      });

      divPantallaPoken.insertAdjacentElement("beforeend",divVerBusqueda);
      divVerBusqueda.insertAdjacentElement("beforeend",namePokemon);
      divVerBusqueda.insertAdjacentElement("beforeend",tipoPoken);
      divVerBusqueda.insertAdjacentElement("beforeend",imgPokenFront);
      divVerBusqueda.insertAdjacentElement("beforeend",imgPokenBack);
      divVerBusqueda.insertAdjacentElement("beforeend",anchuraPoken);
      divVerBusqueda.insertAdjacentElement("beforeend",alturaPoken);
      divVerBusqueda.insertAdjacentElement("beforeend",divHabilidad);
      divVerBusqueda.insertAdjacentElement("beforeend",divMoviPoken);
      divVerBusqueda.insertAdjacentElement("beforeend",divEstadis);
      
  }
  catch(error){
    console.log(error);
    alert("Fallo en la busqueda");
  }
}

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit",buscarPokemon);

function buscarPokemon(e){
  e.preventDefault();
  let namePokemon = document.getElementById("pokemonName").value;
  poken(namePokemon);
  console.log(namePokemon);
}