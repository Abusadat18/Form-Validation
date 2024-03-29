var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
    in: [
      "^(IN-)?\\d{6}$",
      "India ZIPs must have exactly 6 digits: e.g. IN-110001 or 110001",
    ],
    pk: [
      "^(PK-)?\\d{5}$",
      "Pakistan ZIPs must have exactly 5 digits: e.g. PK-44000 or 44000",
    ],
    ps: [
      "^(PS-)?\\d{5}$",
      "Palestine ZIPs must have exactly 5 digits: e.g. PS-11111 or 11111",
    ],
    bd: [
      "^(BD-)?\\d{4}$",
      "Bangladesh ZIPs must have exactly 4 digits: e.g. BD-1205 or 1205",
    ],
  };

const userForm = document.querySelector(".userForm");
const container = document.querySelector(".container");
const name = document.getElementById("userName");
const email = document.getElementById("userEmail");
const country = document.getElementById("userCountry");
const zipCode = document.getElementById("zipCode");
const password = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const btn = document.querySelector(".btn");

function displaySuccess(element) {
    element.innerHTML = `
        <img src="./tick.svg" alt="">
        <h3>Account Created</h3>
    `
}

name.addEventListener("input", () => {
    const nameError = document.querySelector(".nameError");
    if (name.validity.valid) {
        setValidClass(name);
        removeError(nameError);
    }
    else {
        setInvalidClass(name);
        showNameError(nameError);
    }
})

email.addEventListener("input", () => {
    const emailError = document.querySelector(".emailError");
    if (email.validity.valid) {
        setValidClass(email);
        removeError(emailError);
    } else {
        setInvalidClass(email);
        showEmailError(emailError);
    }
})

country.addEventListener("input", () => {
    const countryError = document.querySelector(".countryError");
    if (country.validity.valid && isCountryPresent(country.value)) {
        setValidClass(country);
        removeError(countryError);
    } else {
        setInvalidClass(country);
        showCountryError(countryError);
    }
})

zipCode.addEventListener("input", () => {
    const zipError = document.querySelector(".zipError");
    if (isCountryPresent(country.value)) {
        checkZipError(zipError);
    }
    else {
        setInvalidClass(zipCode);
        setActiveClass(zipError);
        zipError.textContent = "Please enter a valid country name in previous input";
    }
})

password.addEventListener("input", () => {
    const passwordError = document.querySelector(".passwordError");
    if (password.validity.valid) {
        setValidClass(password);
        removeError(passwordError);
    }
    else {
        setInvalidClass(password);
        showPasswordError(passwordError);
    }
})

confirmPassword.addEventListener("input", () => {
    const confirmPasswordError = document.querySelector(".confirmPasswordError");
    if (isSamePassword() && confirmPassword.validity.valid) {
        setValidClass(confirmPassword);
        removeError(confirmPasswordError);
    }
    else {
        setInvalidClass(confirmPassword);
        showConfirmPasswordError(confirmPasswordError);
    }
})

function removeError(element) {
    element.classList.remove("active");
}

function setActiveClass(element) {
    element.classList.add("active");
}

function showNameError(element) {
    setActiveClass(element);
    if (name.validity.valueMissing) {
        element.textContent = "*Name cannot be empty";
    }
}

function showEmailError(element) {
    setActiveClass(element);
    if (email.validity.valueMissing) {
        element.textContent = "*Email cannot be empty";
    }
    else if (email.validity.typeMismatch) {
        element.textContent = "*Entered value needs to be an email";
    }
    else if (email.validity.tooShort) {
        element.textContent = `*Email should be at least ${email.minLength} characters.`;
    }
}

function showCountryError(element) {
    setActiveClass(element);
    if (country.validity.valueMissing) {
        element.textContent = "*Country cannot be empty.";
    }
    else if (country.validity.patternMismatch) {
        element.textContent = "*Entered value needs to be a country name";
    }
    else if (!isCountryPresent(country.value)) {
        element.textContent = "*Enter a valid country name";
    }
}

function isCountryPresent(name) {
    return country_list.includes(name);
}

function checkZipError(element) {
    const countryCode = getCountryCode(country.value);
    const zipPattern = new RegExp(constraints[countryCode][0]);
    if (!zipPattern.test(zipCode.value)) {
        setInvalidClass(zipCode);
        setActiveClass(element);
        element.textContent = constraints[countryCode][1];
    } else {
        setValidClass(zipCode);
        removeError(element);
    }
}

function getCountryCode(name) {
    switch (name) {
        case "Switzerland": return "ch";
        case "France": return "fr";
        case "Germany": return "de";
        case "Netherland": return "nl";
        case "India": return "in";
        case "Pakistan": return "pk";
        case "Bangladesh": return "bd";
        case "Palestine": return "ps";
    }
}

function showPasswordError(element) {
    setActiveClass(element);
    if (password.validity.valueMissing) {
        element.textContent = "*Password cannot be empty.";
    }
    else if (password.validity.tooShort) {
        element.textContent = `*Password should be at least ${password.minLength} characters.`;
    }
}

function isSamePassword(){
    if (password.value === confirmPassword.value) {
        return true;
    }
    else {
        return false;
    }
}

function showConfirmPasswordError(element) {
    setActiveClass(element);
    if (confirmPassword.validity.valueMissing) {
        element.textContent = "*This field cannot be empty.";
    }
    else if (confirmPassword.value.length > 0) {
        element.textContent = `*Password doesn't match`;
    }
}

btn.addEventListener("click", () => {
    console.log(btn);
    console.log(isEmptyAnyField());
    if (userForm.checkValidity() && isSamePassword()) {
        btn.setCustomValidity("");
        displaySuccess(container);
    }
    else if (isEmptyAnyField()) {
        btn.setCustomValidity("All the fields are mandatory");
    }
    else {
        btn.setCustomValidity("Fill all the fields correctly");
    }
    btn.reportValidity();
})

function isEmptyAnyField() {
    const formFields = userForm.querySelectorAll("input");
    for (let i = 0; i < formFields.length; i++){
        if (formFields[i].validity.valueMissing) {
            return true;
        }
    }
    return false;
}

function setValidClass(element){
    element.classList.remove("invalidd");
    element.classList.add("validd");
}

function setInvalidClass(element){
    element.classList.remove("validd");
    element.classList.add("invalidd");
}