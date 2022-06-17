import { musicData, allArtistsArray, allSongsArray } from "./data.js";
import { renderArtists, renderSongs, renderAlbums } from "./artistSection.js";
const searchIcon = document.querySelector("#searchIcon");
const inputField = document.querySelector("#inputField");

const sideABarMenuItem = document.querySelector("#categorydiv-text");
const artistSectionHeaderText = document.querySelector(
  "#artistSectionHeaderText"
);
const categoryDivs = document.querySelectorAll("#categorydiv-text");
const categoryDivsIcon = document.querySelectorAll("#sidebarIcon");
const searchContainer = document.querySelector(".searchWrapper");
const setCurrActiveItem = (indx) => {
  console.log(indx);
  for (let i = 0; i < 3; i++) {
    console.log(categoryDivs[i]);
    categoryDivsIcon[i].style.color = "black";
    categoryDivs[i].style.color = "black";
  }
  categoryDivsIcon[indx].style.color = "red";
  categoryDivs[indx].style.color = "red";
};

const sideBarMenuItemClicked = (category, currIndx) => {
  inputField.value = "";
  searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
  searchContainer.style.display = "none";

  console.log(category);
  switch (category) {
    case "Albums":
      setCurrActiveItem(currIndx);

      artistSectionHeaderText.innerText = "Albums";
      // console.log("Albums");
      renderAlbums();
      break;

    case "Artists":
      // console.log("Artists", artistSectionHeaderText);
      artistSectionHeaderText.innerText = "Artists";
      setCurrActiveItem(currIndx);

      renderArtists(allArtistsArray);
      break;

    case "Songs":
      // console.log("Songs", artistSectionHeaderText);
      artistSectionHeaderText.innerText = "Songs";
      setCurrActiveItem(currIndx);

      renderSongs(allSongsArray);
      break;
  }
};
window.addEventListener("DOMContentLoaded", setCurrActiveItem(0));

for (let i = 0; i < categoryDivs.length; i++) {
  categoryDivs[i].addEventListener("click", () => {
    sideBarMenuItemClicked(categoryDivs[i].innerHTML, i);
  });
}
