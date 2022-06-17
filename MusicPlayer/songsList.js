import { musicData, allArtistsArray, allSongsArray } from "./data.js";
// ____________________________________________

// console.log("artistArray", artistArray);
// ______________________________________________
import { setCurrPlaying, currPlayListDetails } from "./player.js";
var wrapper = document.querySelector(".songsListContainer");
let songWrappers;
let currListHTML;
let playingSvgs;
let currPlayingIndex;

const setActive = (indx, signal) => {
  playingSvgs = document.querySelectorAll(".svgIcon");

  if (signal) {
    if (playingSvgs[indx].classList.contains("hideSvg"))
      playingSvgs[indx].classList.replace("hideSvg", "showSvg");
    else {
      playingSvgs[indx].classList.replace("showSvg", "hideSvg");
    }
    return;
  }

  const divBox = document.querySelectorAll(".songWrapper");

  for (let x = 0; x < playingSvgs.length; x++) {
    playingSvgs[x].classList.replace("showSvg", "hideSvg");
  }

  playingSvgs[indx].classList.replace("hideSvg", "showSvg");
  currPlayingIndex = indx;
};

const renderList = (dataIndex, dataArr, dataT) => {
  // console.log("List to render", dataIndex, dataArr, dataT);
  // currAlbumIndex = currAlbumIndex ? currAlbumIndex : 0;
  // const currList = musicData[currAlbumIndex].albumSongs;
  // return;
  currPlayListDetails.currListDataIndex = dataIndex;
  currPlayListDetails.from = dataT;
  currPlayListDetails.playListLength = dataArr.length;

  const currList = dataArr;
  currListHTML = currList
    .map((item, index) => {
      return `<div class="songWrapper">
  
        <div class="songNoDiv">
            <p>${index + 1 < 10 ? "0" + (index + 1) : index + 1}</p>
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

  wrapper.innerHTML = currListHTML;

  songWrappers = document.querySelectorAll(".songWrapper");

  for (let songIndex = 0; songIndex < songWrappers.length; songIndex++) {
    songWrappers[songIndex].addEventListener("click", (e) => {
      // console.log("type", currPlayListDetails.from);
      let currSongData;

      if (currPlayListDetails.from === "songs") {
        currSongData = allSongsArray[currPlayListDetails.currListDataIndex];
      } else if (currPlayListDetails.from === "artists") {
        currSongData =
          allArtistsArray[currPlayListDetails.currListDataIndex][1][songIndex];
      } else if (currPlayListDetails.from === "albums") {
        currSongData =
          musicData[currPlayListDetails.currListDataIndex].albumSongs[
            songIndex
          ];
      }

      // console.log("si", currSongData);
      setCurrPlaying(
        currPlayListDetails.currListDataIndex,
        songIndex,
        currSongData
      );
    });
  }
  return;
};

window.addEventListener(
  "DOMContentLoaded",
  renderList(0, musicData[0].albumSongs, "albums")
);

export { renderList, setActive, playingSvgs, currPlayingIndex };

// initial loading of list, when DOM loads
// window.addEventListener("DOMContentLoaded", renderList(0));
// const renderList = (currAlbumIndex) => {
//   renderCurrAlbumSongs(currAlbumIndex);
//   //   setCurrPlaying(currAlbumIndex, 0);
//   setCurrPlayingState(musicData[currAlbumIndex].albumSongs[songIndex]);
// };
// window.addEventListener(
//   "DOMContentLoaded",
//   renderCurrAlbumSongs(musicData[0].albumSongs[0])
// );
