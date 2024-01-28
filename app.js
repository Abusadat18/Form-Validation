var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

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
    if (email.validity.valid) {
        removeError(emailError);
    } else {
        showEmailError(emailError);
    }
})

country.addEventListener("input", () => {
    const countryError = document.querySelector(".countryError");
    console.log(country.validity.valid);
    if (country.validity.valid) {
        removeError(countryError);
    } else {
        showCountryError(countryError);
    }
})
country.addEventListener("keyup", allowTextOnly);

function removeError(element) {
    element.classList.remove("active");
}

function setActiveClass(element) {
    element.classList.add("active");
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
    else if (country.validity.typeMismatch) {
        element.textContent = "*Entered value needs to be a country name";
    }
}
 
function allowTextOnly() {
    country.value = country.value.replace(/[^a-zA-Z]+/, '');
}