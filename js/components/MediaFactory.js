export default class MediaFactory {
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

	render() {
		if (this.video == null) {
			return `
		<article class="lightbox__mediaContainer" data-id="${this.id}">
			<div class="lightbox__media">
				<img class="lightbox__img" src="img/${this.photographerId}/${this.image}" alt="${this.alt}">
			</div>
			<h2 class="lightbox__title">${this.title}</h2>
		</article>`;
		} else {
			return `
		<article class="lightbox__mediaContainer" data-id="${this.id}">
			<div class="lightbox__media">
				<video class="lightbox__video" autoplay controls src="img/${this.photographerId}/${this.video}">
					<p> ${this.alt} </p>
				</video>
			</div>
			<h2 class="lightbox__title">${this.title}</h2>
		</article>`;
		}
	}
}
