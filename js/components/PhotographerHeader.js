import Tag from "./Tag.js";

export default class PhotographerHeader {
	constructor(data) {
		this.name = data.name;
		this.city = data.city;
		this.country = data.country;
		this.id = data.id;
		this.portrait = data.portrait;
		this.price = data.price;
		this.tagline = data.tagline;
		this.tags = data.tags;
	}

	renderTags() {
		return this.tags
			.map((tag) => {
				const tagComponent = new Tag(tag);
				return tagComponent.render();
			})
			.join("");
	}
	// for each tag, create a new tag component (array), then .join("") to string

	render() {
		return `
		<div class="photographer__description">			
			<h1 class="photographer__name photographer__name__header">${this.name}</h1>
			<div class="photographer__location photographer__location__header">${this.city}, ${this.country}</div>
			<div class="photographer__tagline photographer__tagline__header">${this.tagline}</div>
			<div class="photographer__tags photographer__tags__header">${this.renderTags()}</div>
		</div>
		<div class="photographer__contact"></div>
		<div class="photographer__picture photographer__picture__header">
			<img src="img/thumbnails/${this.portrait}" alt="${this.name}">
		</div>`;
	}
}
