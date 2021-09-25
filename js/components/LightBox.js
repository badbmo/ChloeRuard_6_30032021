import MediaFactory from "./MediaFactory.js";

export default class LightBox {
	constructor(data) {
		this.data = data;
	}

	workingLightbox() {
		this.i;

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "medium__img" || e.target.dataset.trigger === "medium__video") {
				this.allMediumsLightB = [...document.querySelectorAll(".lightbox__mediaContainer")];
				//create array from MediaFactory mediums in lightbox
				const allMediums = [...document.querySelectorAll(".media__img,.media__video")];
				//create array from all mediums on the photographer page
				this.allMediumsId = allMediums.map((medium) => medium.dataset.id);
				// create an array with id of the mediums of the photographer page
				this.nbMediums = allMediums.length;
				let cliquedMedia = e.target.dataset.id;
				// get the id of the media cliqued
				this.sortMediumsLightB();
				this.defineI(cliquedMedia);
				this.launchLightbox();
				this.allMediumsLightB[this.i].classList.add("active");
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.code === "Enter") {
				const element = document.activeElement;
				if (element.dataset.trigger === "medium__img" || element.dataset.trigger === "medium__video") {
					this.allMediumsLightB = [...document.querySelectorAll(".lightbox__mediaContainer")];
					const allMediums = [...document.querySelectorAll(".media__img,.media__video")];
					this.allMediumsId = allMediums.map((medium) => medium.dataset.id);
					this.nbMediums = allMediums.length;
					let cliquedMedia = element.dataset.id;
					this.sortMediumsLightB();
					this.defineI(cliquedMedia);
					this.launchLightbox();
					this.allMediumsLightB[this.i].classList.add("active");
				}
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "lightbox__closeX") {
				this.closeLightbox();
				this.allMediumsLightB[this.i].classList.remove("active");
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" || e.code === "Escape") {
				this.closeLightbox();
				this.allMediumsLightB[this.i].classList.remove("active");
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "right") {
				this.nextMedia();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowRight" || e.code === "ArrowRight") {
				this.nextMedia();
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "left") {
				this.previousMedia();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft" || e.code === "ArrowLeft") {
				this.previousMedia();
			}
		});
	}

	sortMediumsLightB() {
		return this.allMediumsLightB.sort(
			(a, b) => this.allMediumsId.indexOf(a.dataset.id) - this.allMediumsId.indexOf(b.dataset.id)
		);
	}
	// sort the mediums' array from the lightbox according to the array of mediums'ids of the photographer page
	// result : mediums from lightbox in the same order as the mediums on the photographer page

	defineI(cliquedMedia) {
		return (this.i = this.allMediumsId.indexOf(cliquedMedia));
	}
	// the position of the cliquedMedia's id in the array of mediums'ids = i

	launchLightbox() {
		const lightboxBg = document.querySelector(".lightbox__background");
		lightboxBg.style.display = "flex";
	}

	closeLightbox() {
		const lightboxBg = document.querySelector(".lightbox__background");
		lightboxBg.style.display = "none";
	}

	nextMedia() {
		this.allMediumsLightB[this.i].classList.remove("active");
		if (this.i < this.nbMediums - 1) {
			this.i++;
		} else {
			this.i = 0;
			// if last medium, go back to first one
		}
		this.allMediumsLightB[this.i].classList.add("active");
	}

	previousMedia() {
		this.allMediumsLightB[this.i].classList.remove("active");
		if (this.i > 0) {
			this.i--;
		} else {
			this.i = this.nbMediums - 1;
			// if first medium, go back to last one
		}
		this.allMediumsLightB[this.i].classList.add("active");
	}

	// -- Render methods --

	renderMediaFactory() {
		return this.data
			.map((picture) => {
				const mediaFactory = new MediaFactory(picture);
				return mediaFactory.render();
			})
			.join("");
	}

	render() {
		return `
		<div class="lightbox__background">
			<div class="lightbox__modal" aria-label="image closeup view">
				<img src="img/leftArrow.svg" class="lightbox__arrow" data-trigger="left" alt="previous image" tabIndex = "0"/>
				<article class="lightbox__mediumsList">
				${this.renderMediaFactory()}
				</article>
				<img src="img/rightArrow.svg" class="lightbox__arrow" data-trigger="right" alt="next image" tabIndex = "0"/>
				<img src="img/closeX.svg" class="lightbox__closeX" data-trigger="lightbox__closeX" alt="close dialog" tabIndex = "0"/>
			</div>
		</div>`;
	}
}
