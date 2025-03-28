const searchIcon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById("search-results");

// Mostra il campo di ricerca al clic sull'icona Cerca
searchIcon.addEventListener('click', function(event) {
  event.preventDefault();
  searchInput.style.display = 'inline-block'; 
  searchInput.focus();
});

document.addEventListener('click', function(event) {
  if (searchInput.style.display === 'inline-block' && !searchIcon.contains(event.target) && !searchInput.contains(event.target)) {
    searchInput.style.display = 'none';
  }
});


const searchMusic = () => {
  const query = searchInput.value.trim();

  if (query.length > 0) {
    const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayResults(data); 
      })
      .catch((error) => {
        console.error('Errore nella richiesta API:', error);
        searchResults.innerHTML = '<p class="text-danger">Errore nella ricerca.</p>';
      });
  } else {
    searchResults.innerHTML = ''; 
  }
};

// Funzione per risultati
const displayResults = (data) => {
  searchResults.innerHTML = ''; // Pulisce i risultati precedenti

  if (data.data.length === 0) {
    searchResults.innerHTML = '<p class="text-center">Nessun risultato trovato.</p>';
    return;
  }

  // Crea il contenuto HTML per i risultati
  const resultsHTML = data.data.map(item => {
    return `
      <div class="card mb-3 bg-secondary text-light">
        <img src="${item.album.cover_medium}" class="card-img-top" alt="Album cover">
        <div class="card-body bg-dark">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.artist.name}</p>
          <a href="#" class="btn btn-secondary" target="_blank">Listen</a>
        </div>
      </div>
    `;
  }).join('');
  searchResults.innerHTML = resultsHTML;
};

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMusic();
  }
});
