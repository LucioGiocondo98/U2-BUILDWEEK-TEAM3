/*const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const URLparameters = new URLSearchParams(location.search);
const albumId = URLparameters.get("Id");

const getAlbumDetails = function () {
  fetch(albumUrl + "/" + albumId)
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dettagli");
      }
    })
    .then((data) => {
      console.log("DETTAGLI EVENTO", data);
      //   aggiungo immagine album
      const albumImg = document.getElementById("album-img");
      albumImg.innerHTML = `
      <img src="${data.cover_big}" alt="${data.title}" width="100%" />
      `;
      //   aggiungo titolo album
      const nameAlbum = document.getElementsByTagName("h1")[0];
      nameAlbum.innerHTML = `${data.title}`;
      const nameAlbumSm = document.getElementById("title-sm");
      nameAlbumSm.innerHTML = `${data.title}`;
      //   aggiungo dettagli album
      const artistImg = document.getElementById("img-artist");
      artistImg.innerHTML = `
       <img
         src="${data.artist.picture}"
         alt="${data.artist.name}"
         width="40px"
         class="rounded-circle"
        />
      `;
      const artistImgSm = document.getElementById("artist-img-sm");
      artistImgSm.innerHTML = `
<img
         src="${data.artist.picture}"
         alt="${data.artist.name}"
         width="30px"
         class="rounded-circle"
        />
        <span class="fw-bold ms-2">${data.artist.name}</span>
`;
      const nameArtist = document.getElementById("name-artist");
      nameArtist.innerText = `${data.artist.name}`;

      const releaseDate = document.getElementById("release");
      releaseDate.innerText = `${data.release_date.slice(0, 4)}`;
      const releaseDateSm = document.getElementById("release-sm");
      releaseDateSm.innerText = `${data.release_date.slice(0, 4)}`;
      const totalSeconds = data.duration;

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const totalSongs = document.getElementById("total-songs");
      totalSongs.innerHTML = `${data.tracks.data.length} brani,  <span class="text-secondary">${minutes}min ${seconds}sec</span>`;

      //   aggiungo le canzoni

      data.tracks.data.forEach((song, i) => {
        const songs = document.getElementById("songs");
        newSong = document.createElement("div");
        newSong.classList.add("row", "pt-3");
        const formatTime = (totalSeconds) => {
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        };

        newSong.innerHTML = `
        <div class="col col-1 text-end d-none d-md-block">${i + 1}</div>
                  <div class="col col-6 d-flex flex-grow-1 flex-md-grow-0">
                  <div>
                    <p class="m-0 text-light">${song.title}</p>
                    <p class="m-0">${song.artist.name}</p>
                    </div>
                 
                  </div>
                  <div class="col col-2 text-end d-none d-md-block">${
                    song.rank
                  }</div>
                  <div class="col col-2 text-end">
                  <div class="d-none d-md-block">
                  ${formatTime(song.duration)}
                  </div>
                  <button class="btn d-md-none" style="transform: rotate(90deg)
                  ">
                  <i class="bi bi-three-dots fs-4 text-light" ></i>
                </button>
                  </div>
        `;

        songs.appendChild(newSong);
      });
    })

    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI ALBUM", err);
    });
};
getAlbumDetails();

// play pausa
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playPauseIcon.className = isPlaying
    ? "bi bi-pause-fill fs-3 text-dark"
    : "bi bi-play-fill fs-3 text-dark";
});

// like
const hearts = document.querySelectorAll(".bi-heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", function () {
    this.classList.toggle("bi-heart");
    this.classList.toggle("bi-heart-fill");
    this.classList.toggle("text-danger");
  });
});
*/
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const URLparameters = new URLSearchParams(location.search);
const albumId = URLparameters.get("Id");

const getAlbumDetails = function () {
    fetch(albumUrl + "/" + albumId)
        .then((response) => {
            console.log("response", response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Errore nel recupero dettagli");
            }
        })
        .then((data) => {
            console.log("DETTAGLI EVENTO", data);
            //  aggiungo immagine album
            const albumImg = document.getElementById("album-img");
            albumImg.innerHTML = `
            <img src="${data.cover_big}" alt="${data.title}" width="100%" />
            `;
            //  aggiungo titolo album
            const nameAlbum = document.getElementsByTagName("h1")[0];
            nameAlbum.innerHTML = `${data.title}`;
            //  aggiungo dettagli album
            const artistImg = document.getElementById("img-artist");
            artistImg.innerHTML = `
               <img
                 src="${data.artist.picture}"
                 alt="${data.artist.name}"
                 width="40px"
                 class="rounded-circle"
               />
            `;

            const nameArtist = document.getElementById("name-artist");
            nameArtist.innerText = `${data.artist.name}`;

            const releaseDate = document.getElementById("release");
            releaseDate.innerText = `${data.release_date.slice(0, 4)}`;

            const totalSeconds = data.duration;

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            const totalSongs = document.getElementById("total-songs");
            totalSongs.innerHTML = `${data.tracks.data.length} brani,  <span class="text-secondary">${minutes}min ${seconds}sec</span>`;

            //  aggiungo le canzoni

            data.tracks.data.forEach((song, i) => {
                const songs = document.getElementById("songs");
                newSong = document.createElement("div");
                newSong.classList.add("row", "pt-3");
                const formatTime = (totalSeconds) => {
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    return `${minutes.toString().padStart(2, "0")}:${seconds
                        .toString()
                        .padStart(2, "0")}`;
                };

                newSong.innerHTML = `
                <div class="col col-1 text-end">${i + 1}</div>
                        <div class="col col-6">
                          <p class="m-0 text-light">${song.title}</p>
                          <p class="m-0">${song.artist.name}</p>
                        </div>
                        <div class="col col-2 text-end">${song.rank}</div>
                        <div class="col col-2 text-end">${formatTime(
                            song.duration
                        )}</div>
                `;

                songs.appendChild(newSong);
            });
        })

        .catch((err) => {
            console.log("ERRORE NEL RECUPERO DATI ALBUM", err);
        });
};
getAlbumDetails();

// play pausa
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    playPauseIcon.className = isPlaying
        ? "bi bi-pause-fill fs-3 text-dark"
        : "bi bi-play-fill fs-3 text-dark";
});

// like
const hearts = document.querySelectorAll(".bi-heart");

hearts.forEach((heart) => {
    heart.addEventListener("click", function () {
        this.classList.toggle("bi-heart");
        this.classList.toggle("bi-heart-fill");
        this.classList.toggle("text-danger");
    });
});