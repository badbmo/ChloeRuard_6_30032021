import Tag from "./Tag.js";

export default class PhotographerCard {
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
		<article class="photographer">
        <a alt="${this.name}" href="photograph.html?id=${this.id}" class="photographer__link">
            <div class="photographer__picture">
                <img src="img/thumbnails/${this.portrait}" alt="">
            </div>
            <h2 class="photographer__name">${this.name}</h2>
        </a>
        <div class="photographer__location">${this.city}, ${this.country}</div>
        <div class="photographer__tagline">${this.tagline}</div>
      	<div class="photographer__price">${this.price}€/jour</div>
        <div class="photographer__tags">${this.renderTags()}</div>
    	</article>`;
	}
}
