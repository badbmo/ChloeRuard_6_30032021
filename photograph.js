import { createForm } from "./js/modal.js";
import SortButton from "./js/components/SortButton.js";
createForm();
import PhotographerCard from "./js/components/PhotographerCard.js";
import PhotographerMedia from "./js/components/PhotographerMedia.js";
import Header from "./js/components/Header.js";

class Photograph {
	constructor() {
		this.fetchData();
	}
	/**
	 * fetch data from json file
	 */
	fetchData() {
		const urlSearchParams = new URL(document.location).searchParams;
		const id = urlSearchParams.get("id");
		fetch("FishEyeData.json")
			.then((response) => response.json())
			.then((data) => {
				this.photographer = data.photographers.find((photographer) => {
					return photographer.id === parseInt(id);
				});
				this.displayHeader();
				this.displayPhotographer();
				this.mediums = data.media.filter((mediums) => {
					return mediums.photographerId === parseInt(id);
				});
				console.log(this.mediums);
				this.displayMedia();
				this.displaySort();
				this.sortMedia();
				this.incrementLikes();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	displayHeader(){
		const mainContainer = document.querySelector(".mainContainer");
		const header = new Header();
		mainContainer.innerHTML += header.render();
	}

	displayPhotographer() {
		const mainContainer = document.querySelector(".mainContainer");
		const photographerCard = new PhotographerCard(this.photographer);
		mainContainer.innerHTML += photographerCard.render();
	}
	displayMedia() {
		const mainContainer = document.querySelector(".mainContainer");
		const picture = this.mediums.map((medium) => {
			const photographerMedia = new PhotographerMedia(medium);
			return photographerMedia.render();
		});
		mainContainer.innerHTML += picture.join("");
	}
	displaySort() {
		const mainContainer = document.querySelector(".mainContainer");
		const sortButton = new SortButton();
		mainContainer.innerHTML += sortButton.render();
	}
	sortMedia() {
		const selectList = document.querySelector(".button--select");
		selectList.addEventListener("change", () => {
			if (selectList.value == "titre") {
				this.mediums.sort((a, b) => {
					return a.title.localeCompare(b.title);
				});
				console.log(this.mediums);
			}
			if (selectList.value == "date") {
				this.mediums.sort((a, b) => {
					const dateA = new Date(a.date);
					const dateB = new Date(b.date);
					return dateB - dateA;
				});
				console.log(this.mediums);
			}
			if (selectList.value == "popularité") {
				this.mediums.sort((a, b) => {
					return b.likes - a.likes;
				});
				console.log(this.mediums);
			}
		});
	}
	incrementLikes() {
		const hearts = document.querySelectorAll(".likes__icon");
		console.log(hearts);
		hearts.forEach((heart) => {
			heart.addEventListener("click", (e) => {
				const idData = e.target.dataset.trigger;
				console.log(idData);
				console.log(this.mediums);
				const selectedMedium = this.mediums.find((medium) => {
					return medium.id == idData;
				});
				console.log(selectedMedium.likes + 1);
			});
		});
	}
}
new Photograph();
