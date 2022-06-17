import { musicData, allArtistsArray, allSongsArray } from "./data.js";
import { playingSvgs, currPlayingIndex, setActive } from "./songsList.js";
const songWrappers = document.querySelectorAll(".songWrapper");
const audioTag = document.querySelector("#audio");
const audioSrcTag = document.querySelector("#song-source");
const playPauseIcon = document.querySelector("#playPauseIcon");
const pausePlayIconDiv = document.querySelector("#pausePlayIconDiv");
const progressFill = document.querySelector(".progressFill");
var currPlayingSongName = document.querySelector("#currSongName");
var currPlayingSongArtists = document.querySelector("#currArtistName");
var currPlayingSongImg = document.querySelector("#imgTag-curr");
var currPlayingSongDuration = document.querySelector("#endTimeText");
var currPlayingSongCurrTime = document.querySelector("#startTimeText");
// const playingSvgs = document.querySelectorAll(".svgIcon");

const fwIcon = document.querySelector("#fIconDiv");
const bwIcon = document.querySelector("#bIconDiv");

const playIcon = ' <i id="playPauseIcon" class="fa-solid fa-play"></i>';
const puaseIcon = '<i id="playPauseIcon" class="fa-solid fa-pause"></i>';

const currSongDetails = {
  albumIndex: "",
  songIndex: "",
  albumLength: "",
};
const currPlayListDetails = {
  from: "",
  playListLength: "",
  currListDataIndex: "",
  currSongIndex: "",
};

// toggling play pause icons
const togglePlayPause = (signal) => {
  if (playPauseIcon.classList[1] === "fa-play") {
    audioTag.play();
    playPauseIcon.classList.replace("fa-play", "fa-pause");
    setActive(currPlayListDetails.currSongIndex, signal);
  } else if (playPauseIcon.classList[1] === "fa-pause") {
    playPauseIcon.classList.replace("fa-pause", "fa-play");
    audioTag.pause();
    setActive(currPlayListDetails.currSongIndex, signal);
  }
};

playPauseIcon.onclick = () => {
  togglePlayPause("fromPlayer");
  // console.log("xc", currSongDetails.songIndex);
};

const setAudioDuration = () => {
  var duration = audioTag.duration; //song is object of audio.  song= new Audio();
  var sec = new Number();
  var min = new Number();
  sec = Math.floor(duration);
  min = Math.floor(sec / 60);
  min = min >= 10 ? min : "0" + min;
  sec = Math.floor(sec % 60);
  sec = sec >= 10 ? sec : "0" + sec;
  console.log("duration", `${min}:${sec}`);
  currPlayingSongDuration.innerHTML = `${min}:${sec}`;
};

// SET CURR CLICKED SONG INSIDE PLAYER
const setCurrPlaying = (currAlbumIndex, songIndex, songData) => {
  // console.log("grgrgrgrrg", currAlbumIndex, songIndex, songData);
  currPlayListDetails.currSongIndex = songIndex;
  const { artist, songCoverImg, songName, songUrl } = songData;

  audioSrcTag.src = songUrl;
  currPlayingSongImg.src = songCoverImg;
  currPlayingSongName.innerText = songName;
  currPlayingSongArtists.innerText = artist;

  //   progressFill.style.width = `${0}%`;
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

audioTag.ontimeupdate = () => {
  currprogressBar.max = audioTag.duration;

  var currTime = audioTag.currentTime;
  var sec = new Number();
  var min = new Number();
  sec = Math.floor(currTime);
  min = Math.floor(sec / 60);
  min = min >= 10 ? min : "0" + min;
  sec = Math.floor(sec % 60);
  sec = sec >= 10 ? sec : "0" + sec;
  currPlayingSongCurrTime.innerText = `${min}:${sec}`;

  if (currTime === audioTag.duration) {
    forwardBtnClick();
  }

  currprogressBar.value = currTime;
};

//HANDLE SONG SEEKING BY CHANGING RANGE INPUT
currprogressBar.onchange = () => {
  audioTag.currentTime = currprogressBar.value;
};

// ___________________________________________________________________________
const forwardBtnClick = () => {
  console.log(currPlayListDetails);
  if (currPlayListDetails.playListLength === 1) {
    return;
  }
  const nextSongIndex =
    currPlayListDetails.currSongIndex + 1 < currPlayListDetails.playListLength
      ? currPlayListDetails.currSongIndex + 1
      : 0;

  let currSongData;
  if (currPlayListDetails.from === "songs") {
    currSongData = allSongsArray[currPlayListDetails.currListDataIndex];
  } else if (currPlayListDetails.from === "artists") {
    currSongData =
      allArtistsArray[currPlayListDetails.currListDataIndex][1][nextSongIndex];
  } else if (currPlayListDetails.from === "albums") {
    currSongData =
      musicData[currPlayListDetails.currListDataIndex].albumSongs[
        nextSongIndex
      ];
  }
  console.log("nI", nextSongIndex);
  setCurrPlaying(
    currPlayListDetails.currListDataIndex,
    nextSongIndex,
    currSongData
  );
};

fwIcon.onclick = () => {
  forwardBtnClick();
};
// ___________________________________________________________________________

const backwardBtnClick = () => {
  if (currPlayListDetails.playListLength === 1) {
    return;
  }
  const prevSongIndex =
    currPlayListDetails.currSongIndex - 1 >= 0
      ? currPlayListDetails.currSongIndex - 1
      : 0;

  let currSongData;
  if (currPlayListDetails.from === "songs") {
    currSongData = allSongsArray[currPlayListDetails.currListDataIndex];
  } else if (currPlayListDetails.from === "artists") {
    currSongData =
      allArtistsArray[currPlayListDetails.currListDataIndex][1][prevSongIndex];
  } else if (currPlayListDetails.from === "albums") {
    currSongData =
      musicData[currPlayListDetails.currListDataIndex].albumSongs[
        prevSongIndex
      ];
  }
  setCurrPlaying(
    currPlayListDetails.currListDataIndex,
    prevSongIndex,
    currSongData
  );
};

bwIcon.onclick = () => {
  backwardBtnClick();
};

// ___________________________________________________________________________
window.addEventListener("DOMContentLoaded", () => {
  currPlayListDetails.currListDataIndex = 0;
  currPlayListDetails.from = "albums";
  currPlayListDetails.playListLength = musicData[0].albumSongs.length;
  currPlayListDetails.currSongIndex = 0;

  const { artist, songCoverImg, songName, songUrl } =
    musicData[0].albumSongs[0];

  //   console.log(artist, songCoverImg, songName, songUrl);

  audioSrcTag.src = songUrl;
  currPlayingSongImg.src = songCoverImg;
  currPlayingSongName.innerText = songName;
  currPlayingSongArtists.innerText = artist;

  //   progressFill.style.width = `${0}%`;
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");

  //   when audio metadata loads set its duration inside player
  audioTag.onloadedmetadata = function () {
    setAudioDuration();
  };
  audioTag.load();
});
export {
  currPlayListDetails,
  setCurrPlaying,
  setAudioDuration,
  togglePlayPause,
  currSongDetails,
};
