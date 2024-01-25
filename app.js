const btn = document.querySelector(".btn");
const container = document.querySelector(".container");

function displaySuccess(element) {
    element.innerHTML = `
        <img src="./tick.svg" alt="">
        <h3>Account Created</h3>
    `
}

btn.addEventListener("click", () => {
    displaySuccess(container);
})