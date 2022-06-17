import { musicData } from "./data.js";
import { changeSrc } from "./player.js";

var wrapper = document.querySelector(".songsListContainer");
let currAlbumIndex;
currAlbumIndex = 0;

const render = (lst, indx) => {
  const currIndx = indx ? indx : 0;
  wrapper.innerHTML = lst;
  const currSong = musicData[currIndx];
  // console.log(currSong);
  changeSrc(currSong.albumSongs[0].songCoverImg);
};

const getList = (currRenderIndex) => {
  const currAlbum = musicData[currRenderIndex].albumSongs;

  const listHTML = currAlbum
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
        <p>${"4:23"}</p>
    </div>
  </div> `;
    })
    .join("");
  return listHTML;
};

// const list = getList(0);
// render(list);

// const changeIndex = (indx) => {
//   const list = getList(indx);
//   render(list, indx);
// };

// export { changeIndex };
