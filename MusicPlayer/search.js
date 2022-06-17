import { musicData, allArtistsArray, allSongsArray } from "./data.js";
import { renderList } from "./songsList.js";
import {
  setAudioDuration,
  togglePlayPause,
  currSongDetails,
} from "./player.js";
const inputField = document.querySelector("#inputField");
const searchContainer = document.querySelector(".searchWrapper");
var songsListContainer = document.querySelector(".songsListContainer");
let songWrappers;
let finalSearchData;
let currListHTML;
let clickedAlbumIndex;
const audioSrcTag = document.querySelector("#song-source");
const audioTag = document.querySelector("#audio");
const progressFill = document.querySelector(".progressFill");
const playPauseIcon = document.querySelector("#playPauseIcon");
var currPlayingSongName = document.querySelector("#currSongName");
var currPlayingSongArtists = document.querySelector("#currArtistName");
var currPlayingSongImg = document.querySelector("#imgTag-curr");
//  SET CLICKED SONG TO PLAYER_______________________________________________________________

const setCurrPlaying = ({ songUrl, songCoverImg, songName, artist }) => {
  // console.log("fgfgfgfg");
  currSongDetails.albumIndex = null;
  currSongDetails.songIndex = 0;

  audioSrcTag.src = songUrl;
  currPlayingSongImg.src = songCoverImg;
  currPlayingSongName.innerText = songName;
  currPlayingSongArtists.innerText = artist;

  // progressFill.style.width = `${0}%`;
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");

  //   when audio metadata loads set its duration inside player
  audioTag.onloadedmetadata = function () {
    setAudioDuration();
  };
  //   finaly load song
  audioTag.load();
  togglePlayPause();
};

// _RENDERING CLICKED ITEMS__________________________________________________________________

const renderClickedItem = (currList) => {
  currListHTML = currList
    .map((item, index) => {
      return `<div class="songWrapper">
  
        <div class="songNoDiv">
            <p>${index + 1}</p>
        </div>
        <div class="songArtDiv">
        <img id="imgTag-SL" src=${item.songCoverImg} />
        </div>
        <div class="songNameDiv">
            <p>${item.songName}</p>
        </div>
        <div class="songArtistNameDiv">
            <p>${item.artist}</p>
        </div>
        <div class="songDurationDiv">
        <svg class="svgIcon hideSvg" id="equalizer" width="40px" height="28px" viewBox="0 0 10 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g fill="#860d8663">
          <rect id="bar1" transform="translate(0.500000, 6.000000) rotate(180.000000) translate(-0.500000, -6.000000) " x="0" y="5" width="1" height="2px"></rect>
          <rect id="bar2" transform="translate(3.500000, 4.500000) rotate(180.000000) translate(-3.500000, -4.500000) " x="3" y="2" width="1" height="5"></rect>
          <rect id="bar3" transform="translate(6.500000, 3.500000) rotate(180.000000) translate(-6.500000, -3.500000) " x="6" y="0" width="1" height="7"></rect>
        </g>
      </svg>
        </div>
      </div> `;
    })
    .join("");
  songsListContainer.innerHTML = currListHTML;

  songWrappers = document.querySelectorAll(".songWrapper");

  for (let songIndex = 0; songIndex < songWrappers.length; songIndex++) {
    songWrappers[songIndex].addEventListener("click", () => {
      setCurrPlaying(currList[songIndex]);
      console.log(currList[songIndex]);
    });
  }
};

const searchIcon = document.querySelector("#searchIcon");

searchIcon.onclick = () => {
  inputField.value = "";
  searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
  searchContainer.style.display = "none";
};

// SEARCHING FOR INPUT LOGIC__________________________________________

inputField.addEventListener("input", () => {
  const key = inputField.value;
  // console.log(key.length);
  if (key.length <= 0) {
    searchContainer.style.display = "none";
    searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
    return;
  }

  if (key.length >= 1) {
    searchIcon.classList.replace("fa-magnifying-glass", "fa-xmark");
  }

  const filteredAlbumsArray = musicData.filter(
    (item) =>
      item.album.toLowerCase().includes(inputField.value.toLowerCase()) ||
      item.albumArtist.toLowerCase().includes(inputField.value.toLowerCase())
  );

  const filteredArtistAndSongsArray = allSongsArray.filter(
    (item) =>
      item.artist.toLowerCase().includes(inputField.value.toLowerCase()) ||
      item.songName.toLowerCase().includes(inputField.value.toLowerCase())
  );

  if (filteredAlbumsArray && filteredArtistAndSongsArray) {
    finalSearchData = filteredArtistAndSongsArray.concat(filteredAlbumsArray);
  } else if (filteredAlbumsArray) {
    finalSearchData = filteredAlbumsArray;
  } else {
    finalSearchData = filteredArtistAndSongsArray;
  }

  if (finalSearchData.length > 0) {
    searchContainer.style.display = "flex";
  }
  // console.log("fl", finalSearchData);

  const currListHTML = finalSearchData
    .map((item, index) => {
      return `<div class="searchItemWrapper">

        <div class="noDiv">
            <p>${index + 1}</p>
        </div>
        <div class="artDiv">
        <img id="imgTag-search-div" src=${
          item.albumArt ? item.albumArt : item.songCoverImg
        } />
        </div>
        <div class="nameDiv">
            <p>${item.album ? item.album : item.songName}</p>
        </div>
        <div class="artistNameDiv">
            <p>${item.albumArtist ? item.albumArtist : item.artist}</p>
        </div>
        <div class="typeName">
            <p>${item.album ? "Album" : "Song"}</p>
        </div>
      </div> `;
    })
    .join("");

  searchContainer.innerHTML = currListHTML;

  // ADDING CLICK EVENT LISTNER FOR RENDER SEARCH ITEMS_____________________
  const searchItemWrapper = document.querySelectorAll(".searchItemWrapper");
  for (let i = 0; i < currListHTML.length; i++) {
    if (searchItemWrapper[i]) {
      searchItemWrapper[i].addEventListener("click", (e) => {
        // ___________________________________________________________________________________________________
        // console.log("sitem", finalSearchData[i]);
        // return;
        if (finalSearchData[i]["album"]) {
          // console.log(
          //   "album",
          //   finalSearchData[i].album,
          //   finalSearchData[i].albumSongs
          // );

          clickedAlbumIndex = musicData.findIndex(
            (p) => p.album == finalSearchData[i].album
          );
          currSongDetails.albumIndex = clickedAlbumIndex;

          renderList(
            clickedAlbumIndex,
            finalSearchData[i].albumSongs,
            "albums"
          );
          // ___________________________________________________________________________________________________
        } else if (finalSearchData[i]["songName"]) {
          // console.log("song", [finalSearchData[i]]);
          clickedAlbumIndex = allSongsArray.findIndex(
            (p) => p.songName == finalSearchData[i].songName
          );
          // console.log('index',clickedAlbumIndex)
          renderList(clickedAlbumIndex, [finalSearchData[i]], "songs");
        }
      });
    }
  }

  return;
});
