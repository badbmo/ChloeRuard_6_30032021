import Heart from "./Heart.js";

export default class PhotographerMedia {
	constructor(data) {
		this.title = data.title;
		this.date = data.date;
		this.image = data.image;
		this.video = data.video;
		this.likes = data.likes;
		this.alt = data.alt;
		this.photographerId = data.photographerId;
		this.id = data.id;
	}

	renderHeart() {
		this.heartComponent = new Heart(this.likes, this.id);
		return this.heartComponent.render();
	}

	incrementLikes() {
		this.likes += 1;
		this.heartComponent.incrementLikes();
	}
	// keep consistency in data (likes) !

	render() {
		if (this.video == null) {
			return `
			<article class="media">
        <div class="media__medium" >
          <img class="media__img" src="img/${this.photographerId}/${this.image}" 
					alt="${this.alt}" data-trigger="medium__img" data-id="${this.id}">
        </div>
				<div class="media__legend">
					<h2 class="media__title">${this.title}</h2>
					<div class="media__likes">${this.renderHeart()}</div>
				</div>
      </article>`;
		} else {
			return `
			<article class="media">
				<div class="media__medium" >
					<video class="media__video" src="img/${this.photographerId}/${this.video}" 
					data-trigger="medium__video" data-id="${this.id}">
						<p> ${this.alt} </p>
					</video>
				</div>
				<div class="media__legend">
					<h2 class="media__title">${this.title}</h2>
					<div class="media__likes">${this.renderHeart()}</div>
				</div>
			</article>`;
		}
	}
}
