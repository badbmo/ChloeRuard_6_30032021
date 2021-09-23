import Tag from "./Tag.js";

export default class Navigation {
	constructor(tags) {
		this.tags = tags;
	}

	renderTags() {
		const uniqueTags = [...new Set(this.tags)];
		return uniqueTags
			.map((tag) => {
				const tagComponent = new Tag(tag);
				return tagComponent.render();
			})
			.join("");
	}
	//New Set create an array with no double, only unique value
	//Then, create a new tag Component for each unique tag in this array

	render() {
		return `
		<nav>
		<div class="photographer__tags">${this.renderTags()}</div>
		</nav>`;
	}
}
