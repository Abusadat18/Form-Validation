const btn = document.querySelector(".btn");
const container = document.querySelector(".container");
const name = document.getElementById("userName");
const email = document.getElementById("userEmail");
const country = document.getElementById("userCountry");
const zipCode = document.getElementById("zipCode");
const password = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");

function displaySuccess(element) {
    element.innerHTML = `
        <img src="./tick.svg" alt="">
        <h3>Account Created</h3>
    `
}

btn.addEventListener("click", () => {
    displaySuccess(container);
})

email.addEventListener("input", () => {
    const emailError = document.querySelector(".emailError");
    console.log(email.validity.valid);
    if (email.validity.valid) {
        removeError(emailError);
    } else {
        showEmailError(emailError);
    }
})

function removeError(element) {
    element.classList.remove("active");
}

function showEmailError(element) {
    element.classList.add("active");
    if (email.validity.valueMissing) {
        element.textContent = "*Email cannot be empty.";
    }
    else if (email.validity.typeMismatch) {
        element.textContent = "*Entered value needs to be an email";
    }
    else if (email.validity.tooShort) {
        element.textContent = `*Email should be at least ${email.minLength} characters.`;
    }
}

 