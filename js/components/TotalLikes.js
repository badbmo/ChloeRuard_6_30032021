export default class TotalLikes {
	constructor(photographer, allLikes) {
		this.price = photographer.price;
		this.likes = allLikes;
	}

	incrementTotalLikes() {
		const photographerTotalLikes = document.querySelector(".photographer__totalLikes");
		const likesNumber = document.querySelectorAll(".likes__number");
		const likesArray = Array.from(likesNumber).map((acc) => parseInt(acc.textContent));
		const likesSum = likesArray.reduce((total, likes) => total + likes, 0);
		photographerTotalLikes.textContent = likesSum;
		//get the value (textContent) inside every likes of every photo and add them
	}

	render() {
		return `
		<div class="photographer__info">
			<div class="photographer__totalLikes">${this.likes}
			</div>
			<img class="totalLikes__icon" src="img/heart.svg"></img>
			<div class="photographer__info__price">${this.price}€ / jour</div>
		</div>`;
	}
}
