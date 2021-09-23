import SortButton from "./js/components/SortButton.js";
import PhotographerHeader from "./js/components/PhotographerHeader.js";
import PhotographerMedia from "./js/components/PhotographerMedia.js";
import Header from "./js/components/Header.js";
import TotalLikes from "./js/components/TotalLikes.js";
import ModalForm from "./js/components/ModalForm.js";
import LightBox from "./js/components/LightBox.js";

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
				// look in the URL, get the id value, get the data from the photographer that has this id
				this.displayHeader();
				this.displayPhotographer();
				this.displayForm();
				this.createPhotographerMedia(data.media, id);
				this.displayMedia(this.sortByPopularity);
				//default display: by popularity
				this.displaySort();
				this.sortMedia();
				this.displayTotalLikes();
				this.displayLightBox();
				this.incrementLikes();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	displayHeader() {
		const headerContainer = document.querySelector(".headerContainer");
		const header = new Header();
		headerContainer.innerHTML += header.render();
	}

	displayPhotographer() {
		const photographerHeaderContainer = document.querySelector(".photographer__header");
		const photographerHeader = new PhotographerHeader(this.photographer);
		photographerHeaderContainer.innerHTML += photographerHeader.render();
	}

	displayForm() {
		const photographerHeaderContainer = document.querySelector(".photographer__contact");
		const modalForm = new ModalForm(this.photographer);
		photographerHeaderContainer.innerHTML += modalForm.renderbutton();
		photographerHeaderContainer.innerHTML += modalForm.renderForm();
		modalForm.workingForm();
	}

	createPhotographerMedia(media, id) {
		this.photographerMediaArray = media
			.filter((mediums) => mediums.photographerId === parseInt(id))
			.map((medium) => new PhotographerMedia(medium));
	}
	// get all the mediums that have the photographer id (value from URL) in an array

	displayMedia() {
		const mediumsListContainer = document.querySelector(".mediums__list");
		const picture = this.photographerMediaArray.map((medium) => {
			return medium.render();
		});
		mediumsListContainer.innerHTML = picture.join("");
	}
	// separate display and render of media to avoid events bubbling
	// displayMedia() only reorganize media and display in array.
	//Creation of data (media) is only called once in createPhotographerMedia()

	displaySort() {
		const mediumsSortContainer = document.querySelector(".mediums__sort");
		const sortButton = new SortButton();
		mediumsSortContainer.innerHTML += sortButton.render();
	}

	sortByTitle() {
		return this.photographerMediaArray.sort((a, b) => {
			return a.title.localeCompare(b.title);
		});
	}

	sortByDate() {
		return this.photographerMediaArray.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB - dateA;
		});
	}

	sortByPopularity() {
		return this.photographerMediaArray.sort((a, b) => {
			return b.likes - a.likes;
		});
	}

	sortMedia() {
		document.addEventListener("change", (e) => {
			if (e.target.dataset.trigger === "select") {
				if (e.target.value == "titre") {
					this.photographerMediaArray = this.sortByTitle();
				}
				if (e.target.value == "date") {
					this.photographerMediaArray = this.sortByDate();
				}
				if (e.target.value == "popularité") {
					this.photographerMediaArray = this.sortByPopularity();
				}
				return this.displayMedia(this.photographerMediaArray);
			}
			//display mediums again when select list is changed
		});
	}

	displayTotalLikes() {
		const mainContainer = document.querySelector(".mainContainer");
		const likesNumber = document.querySelectorAll(".likes__number");
		const likesArray = Array.from(likesNumber).map((acc) => parseInt(acc.textContent));
		const likesSum = likesArray.reduce((total, likes) => total + likes, 0);
		// get the value (textContent) inside every likes of every photo and add them (display only)
		// to change this value (incrementTotalLikes), other method !
		this.totalLikes = new TotalLikes(this.photographer, likesSum);
		mainContainer.innerHTML += this.totalLikes.render();
	}

	incrementLikes() {
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "addLike") {
				const id = e.target.dataset.id;
				const photographerMedia = this.photographerMediaArray.find((medium) => {
					return medium.id == id;
				});
				// if heart clicked, look for the corresponding media (with id) in photographerMediaArray
				if (photographerMedia) {
					photographerMedia.incrementLikes();
					this.totalLikes.incrementTotalLikes();
				}
				// if media found, increment Likes and TotalLikes
			}
		});
	}

	displayLightBox() {
		const mainContainer = document.querySelector(".mainContainer");
		const lightbox = new LightBox(this.photographerMediaArray);
		mainContainer.innerHTML += lightbox.render();
		lightbox.workingLightbox();
	}
}

//Création d'un objet de la classe Photograph (Instance de la classe)
new Photograph();
