// eslint-disable-next-line no-undef
export default class Heart {
	constructor(likes, id) {
		this.likes = likes;
		this.id = id;
	}

	incrementLikes() {
		this.likes += 1;
		const numberLikes = document.querySelector(`[data-likes='${this.id}']`);
		numberLikes.textContent = this.likes ;
	}

	render() {
		return `
			<div class="likes__number" data-likes="${this.id}">${this.likes}</div>
			<img class="likes__icon" alt="likes" src="img/heart.svg" data-trigger="addLike" data-id="${this.id}"></img>`;
	}
}
