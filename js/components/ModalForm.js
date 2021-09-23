// modal form HTML creation
export default class ModalForm {
	constructor(data) {
		this.name = data.name;
	}

	workingForm() {
		this.firstNameValidated = false;
		this.lastNameValidated = false;
		this.emailValidated = false;
		this.messageValidated = false;

		this.errorMessages = {
			firstName: "Veuillez entrer 2 caractères ou plus.",
			lastName: "Veuillez entrer 2 caractères ou plus.",
			email: "Veuillez entrer une adresse email valide.",
			message: "Veuillez entrer 5 caractères ou plus.",
		};

		// Délégation d'évènements
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "contact") {
				this.launchModal();
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "closeX") {
				this.closeModal();
			}
		});

		document.addEventListener("submit", (e) => {
			if (e.target.dataset.trigger === "form") {
				e.preventDefault();
				this.validate();
				this.showResultConsole();
			}
		});
	}

	showResultConsole() {
		const inputs = [...document.querySelectorAll(".text-control")];
		let values = inputs.map((input) => input.value);
		let keys = inputs.map((input) => input.name);
		let result = {};
		for (let i = 0; i < keys.length; i++) {
			result[keys[i]] = values[i];
		}
		console.log(result);
	}

	launchModal() {
		const modalBg = document.querySelector(".form__background");
		modalBg.style.display = "block";
	}

	closeModal() {
		const modalBg = document.querySelector(".form__background");
		modalBg.style.display = "none";
	}

	validate() {
		this.firstNameValidate();
		this.lastNameValidate();
		this.emailValidate();
		this.messageValidate();
		//execute each methods to validate or not each input
		if (
			this.firstNameValidated == true &&
			this.lastNameValidated == true &&
			this.emailValidated == true &&
			this.messageValidated == true
		) {
			this.showSuccessMessage();
			this.hideFormData();
			this.modifySubmitButton();
			//if all inputs correct, execute the methods that show the success message
		} else {
			console.log("formulaire incorrect");
		}
	}

	// -- Inputs validation --

	firstNameValidate() {
		const firstNameForm = document.querySelector("#first");
		// eslint-disable-next-line no-useless-escape
		if (firstNameForm.value.length < 2 || firstNameForm.value == null || !/^[A-Za-z\-\']+$/.test(firstNameForm.value)) {
			//Regex: accept letters from A to Z upper or lowercase, accept - and '
			this.showError(firstNameForm, this.errorMessages.firstName);
			return (this.firstNameValidated = false);
		} else {
			this.hideError(firstNameForm);
			return (this.firstNameValidated = true);
		}
	}

	lastNameValidate() {
		const lastNameForm = document.querySelector("#last");
		// eslint-disable-next-line no-useless-escape
		if (lastNameForm.value.length < 2 || lastNameForm.value == null || !/^[A-Za-z\-\']+$/.test(lastNameForm.value)) {
			//Regex: accept letters from A to Z upper or lowercase, accept - and '
			this.showError(lastNameForm, this.errorMessages.firstName);
			return (this.lastNameValidated = false);
		} else {
			this.hideError(lastNameForm);
			return (this.lastNameValidated = true);
		}
	}

	emailValidate() {
		const emailForm = document.querySelector("#email");
		// eslint-disable-next-line no-useless-escape
		if (emailForm.value == null || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailForm.value)) {
			//Regex: (one or more (+)(letters and digits 0 to 9 and _ - .)) @ (one or more (+)(letters and digits 0 to 9 and _ - .)) . (2 to 5 letters)
			this.showError(emailForm, this.errorMessages.email);
			return (this.emailValidated = false);
		} else {
			this.hideError(emailForm);
			return (this.emailValidated = true);
		}
	}

	messageValidate() {
		const messageForm = document.querySelector("#message");
		if (messageForm.value.length < 5 || messageForm.value == null) {
			this.showError(messageForm, this.errorMessages.message);
			return (this.messageValidated = false);
		} else {
			this.hideError(messageForm);
			return (this.messageValidated = true);
		}
	}

	// -- Errors Management --

	showError(selectedInput, errorMessage) {
		selectedInput.parentElement.setAttribute("data-error-visible", "true");
		selectedInput.parentElement.setAttribute("data-error", errorMessage);
	}

	hideError(selectedInput) {
		selectedInput.parentElement.removeAttribute("data-error-visible");
		selectedInput.parentElement.removeAttribute("data-error");
	}

	// -- Success Message --

	showSuccessMessage() {
		const formBody = document.querySelector(".form__body");
		const successMessage = document.createElement("span");
		successMessage.classList.add("success");
		successMessage.textContent = `Merci ! Votre message a bien été envoyé à ${this.name}`;
		formBody.appendChild(successMessage);
	}

	hideFormData() {
		const formData = document.querySelectorAll(".form__data");
		formData.forEach((data) => (data.style.visibility = "hidden"));
	}

	modifySubmitButton() {
		const submitBtn = document.querySelectorAll(".button--submit");
		submitBtn.forEach((btn) => btn.setAttribute("value", "Fermer"));
		submitBtn.forEach((btn) => btn.addEventListener("click", this.closeModal));
	}

	// -- Render methods --

	renderForm() {
		return `
		<div class="form__background">
			<div class="form__modal">
				<img src="img/closeX.svg" class="form__closeX" data-trigger="closeX" />
						<h1 class="form__title">Contactez-moi <br /> ${this.name}</h1>
							<div class="form__body">
								<form id="form" name="reserve" action="index.html" method="post" data-trigger="form">
									<div class="form__data">
										<label for="first" class="form__label">Prénom</label><br />
										<input class="text-control" type="text" id="first" name="first" minlength="2" /><br />
									</div>
									<div class="form__data">
										<label for="last" class="form__label">Nom</label><br />
										<input class="text-control" type="text" id="last" name="last" /><br />
									</div>
									<div class="form__data">
										<label for="email" class="form__label">Email</label><br />
										<input class="text-control" type="email" id="email" name="email" /><br />
									</div>
									<div class="form__data">
										<label for="message" class="form__label">Votre message</label><br />
										<textarea class="text-control text-control__message" id="message" name="message" minlength="5"></textarea>
										<br />
									</div>
									<input type="submit" class="button button--submit" value="Envoyer" />
								</form>
							</div>
						</div>
					</div>`;
	}

	renderbutton() {
		return `
		<button class="button button--contact" alt="contact me" data-trigger="contact">
			Contactez-moi
		</button>`;
	}
	// bouton to launch modal
}
