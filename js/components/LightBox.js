import MediaFactory from "./MediaFactory.js";

export default class LightBox {
	constructor(data) {
		this.data = data;
	}

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
				<img src="img/leftArrow.svg" class="lightbox__arrow" data-trigger="left" alt="previous image"/>
				<article class="lightbox__mediumsList">
				${this.renderMediaFactory()}
				</article>
				<img src="img/rightArrow.svg" class="lightbox__arrow" data-trigger="right" alt="next image" />
				<img src="img/closeX.svg" class="lightbox__closeX" data-trigger="lightbox__closeX" alt="close dialog"/>
			</div>
		</div>`;
	}
	workingLightbox() {
		let i;

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger.includes("medium")) {
				this.allMediumsLightB = [...document.querySelectorAll(".lightbox__mediaContainer")];
				const allMediums = [...document.querySelectorAll(".media__img,.media__video")];
				this.allMediumsId = allMediums.map((medium) => medium.dataset.id);
				this.nbMediums = allMediums.length;
				let cliquedMedia = e.target.dataset.id;
				sortMediumsLightB();
				defineI(cliquedMedia);
				launchLightbox();
				this.allMediumsLightB[i].classList.add("active");
				console.log(i);
				console.log(this.allMediumsLightB);
			}
		});

		const sortMediumsLightB = () => {
			return this.allMediumsLightB.sort(
				(a, b) => this.allMediumsId.indexOf(a.dataset.id) - this.allMediumsId.indexOf(b.dataset.id)
			);
		};

		const defineI = (cliquedMedia) => {
			return (i = this.allMediumsId.indexOf(cliquedMedia));
		};

		const launchLightbox = () => {
			const lightboxBg = document.querySelector(".lightbox__background");
			lightboxBg.style.display = "flex";
		};

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "lightbox__closeX") {
				closeLightbox();
				this.allMediumsLightB[i].classList.remove("active");
			}
		});

		const closeLightbox = () => {
			const lightboxBg = document.querySelector(".lightbox__background");
			lightboxBg.style.display = "none";
		};

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "right") {
				nextMedia();
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "left") {
				previousMedia();
			}
		});

		const nextMedia = () => {
			this.allMediumsLightB[i].classList.remove("active");
			if (i < this.nbMediums - 1) {
				i++;
				console.log(i);
			} else {
				i = 0;
			}
			this.allMediumsLightB[i].classList.add("active");
		};

		const previousMedia = () => {
			this.allMediumsLightB[i].classList.remove("active");
			if (i > 0) {
				i--;
				console.log(i);
			} else {
				i = this.nbMediums - 1;
			}
			this.allMediumsLightB[i].classList.add("active");
		};
	}
}
