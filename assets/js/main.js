const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map(type => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img id="img" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
        ${createBoxDetail(pokemon)}
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const html = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += html;
  });
}

function createBoxDetail(pokemon) {
  return `
      <div class="box-details">
              <div class="about">
                  <h2>About</h2>
                  <p>Species <span class="one">${pokemon.species}</span></p>
                  <p>Height <span class="one">${
                    pokemon.height
                  }' <span class="two">(${
    pokemon.height * 30
  } cm)</span></span></p>
                  <p>Weight <span class="one">${
                    pokemon.weight
                  }<span class="two"> lbs (${(pokemon.weight / 2.205).toFixed(
    1
  )} kg)</span></span></p>
                  <p>Abilities <span class="one">${
                    pokemon.abilities[0].ability.name
                  }, ${pokemon.abilities[1].ability.name}</span></p>
              </div>
          </div>`;
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
