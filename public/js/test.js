console.log("Client side static js loaded")

fetch('https://puzzle.mead.io/puzzle').then(async (response) => {
    const res = await response.json()
    console.log(res)
})

fetch('/weather?address=Boston').then(async (response) => {
    const res = await response.json()
    console.log(res)
})

fetch('/weather?address=Bodfegston').then(async (response) => {
    const res = await response.json()
    console.log(res)
})

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const weatherForm = document.querySelector("#weather-form");
const mainContent = document.querySelector(".main-content");
const address = document.querySelector("#address");
const results = document.createElement("div");
results.classList.add("result-list");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = address.value;
    fetch('/weather?address=' + location).then(async (response) => {
        const res = await response.json()
        const resultList = document.querySelectorAll(".result-list p");
        for (let element of resultList) {
            element.remove()
        }
        for (let key in res) {

            const p = document.createElement("p");
            p.textContent = `${String(key).capitalize()} : ${res[key]}`
            results.append(p)
        }
        mainContent.append(results)

    })
})