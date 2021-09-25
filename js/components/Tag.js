export default class Tag {
	constructor(tag) {
		this.tag = tag;
	}

	render() {
		return `<a href="index.html?tag=${this.tag}" class="tag__link" aria-label="Tag"><span class="photographer__tags__tag" data-id="${this.tag}" data-trigger="tag">#${this.tag}</span></a>`;
	}
}
