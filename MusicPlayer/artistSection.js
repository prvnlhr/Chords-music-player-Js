import { musicData, allArtistsArray, allSongsArray } from "./data.js";
import { renderList } from "./songsList.js";

var divBox = document.querySelector(".artistBoxWrapper");
let artistWrapper = document.querySelectorAll(".artistBox");

const fwScrollBtn = document.querySelector("#rightScroll");
const bwScrollBtn = document.querySelector("#leftScroll");
const fwSrcoll = () => {
  // console.log("fwSrcoll", divBox.clientWidth);
  divBox.scrollLeft += divBox.clientWidth;
};

const bwScroll = () => {
  // console.log("bwSrcoll");
  divBox.scrollLeft -= divBox.clientWidth;
};
fwScrollBtn.onclick = () => {
  fwSrcoll();
};
bwScrollBtn.onclick = () => {
  bwScroll();
};

const addClickEvent = (currType) => {
  for (let i = 0; i < artistWrapper.length; i++) {
    artistWrapper[i].onclick = () => {
      switch (currType) {
        case "songsBox":
          // console.log("xcxds", [allSongsArray[i]]);
          renderList(i, [allSongsArray[i]], "songs");
          break;

        case "artistBox":
          // console.log(allArtistsArray[i]);
          renderList(i, allArtistsArray[i][1], "artists");
          break;

        case "albumBox":
          // console.log(musicData[i]);
          renderList(i, musicData[i].albumSongs, "albums");
          break;

        default:
          break;
      }

      // renderList(albumIndex);

      // renderCurrAlbumSongs(musicData[albumIndex].albumSongs);
    };
  }
};
// ___INITIAL LOADING OF ALBUMS __________________________________________________________________________
const renderAlbums = () => {
  const currHTML = musicData
    .map((item) => {
      return `<div class="artistBox">
    <div class="imageWrapper">
        <img id="artistArtImg" src=${item.albumArt} />
    </div>
    <div class="albumArtistNameContainer">
        <p id="albumNameText">${item.album}</p>
        <p id="artistNameText">${item.albumArtist}</p>
        <p></p>
    </div>
    </div>`;
    })
    .join("");
  divBox.innerHTML = currHTML;
        artistWrapper = document.querySelectorAll(".artistBox");
  addClickEvent("albumBox");
};
// _____________________________________________________________________________

const renderSongs = (songs) => {
  const currHTML = songs
    .map((item) => {
      return `<div class="artistBox">
        <div class="imageWrapper">
            <img id="artistArtImg" src=${item.songCoverImg} />
        </div>
        <div class="albumArtistNameContainer">
            <p id="albumNameText">${item.songName}</p>
            <p id="artistNameText">${item.artist}</p>
            <p></p>
        </div>
        </div>`;
    })
    .join("");

  divBox.innerHTML = currHTML;
  artistWrapper = document.querySelectorAll(".artistBox");
  addClickEvent("songsBox");
};
// _____________________________________________________________________________
{
  /* <img class="noImg" id="artistArtImg" src=${""} /> */
}
const renderArtists = (artists) => {
  const currHTML = artists

    .map((item) => {
      return `<div class="artistBox">
    <div class="imageWrapper">
         
        <p id="imgText">${item[0].slice(0, 2)}</p>
    </div>
    <div class="albumArtistNameContainer">
        <p id="albumNameText">${item[0]}</p>
        <p id="artistNameText">${""}</p>
        <p></p>
    </div>
    </div>`;
    })
    .join("");

  divBox.innerHTML = currHTML;
  artistWrapper = document.querySelectorAll(".artistBox");
  addClickEvent("artistBox");
};

// initial loading of albums, when DOM loads
window.addEventListener("DOMContentLoaded", renderAlbums());
// _____________________________________________________________________________

export { renderArtists, renderSongs, renderAlbums };
