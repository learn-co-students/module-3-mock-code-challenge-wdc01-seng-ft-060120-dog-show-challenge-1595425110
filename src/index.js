let baseUrl = 'http://localhost:3000'
let dogsUrl = baseUrl + '/dogs'

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    document.addEventListener("click", (event) => {
        console.log(event.target)
        if(event.target.value === "submit")
            createNewDog()
        if(event.target.textContent === "Edit Dog")
            editDog()
    })
});

function fetchDogs() {
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(dogs => renderAllDogs(dogs))
};

function renderAllDogs(dogs) {
    dogs.forEach(dog => renderDog(dog))
};

function renderDog(dog) {
    let tableBody = document.getElementById("table-body")
    let dogRow = document.createElement("tr")
    let dogName = document.createElement("td")
    let dogBreed = document.createElement("td")
    let dogSex = document.createElement("td")
    let editDog = document.createElement("td")
    let editDogBtn = document.createElement("button")
    dogRow.id = dog.name

    dogName.textContent = dog.name
    dogBreed.textContent = dog.breed
    dogSex.textContent = dog.sex
    editDogBtn.textContent = 'Edit Dog'

    tableBody.appendChild(dogRow)
    dogRow.appendChild(dogName)
    dogRow.appendChild(dogBreed)
    dogRow.appendChild(dogSex)
    dogRow.appendChild(editDog)
    editDog.appendChild(editDogBtn)
};

function createNewDog() {
    preventDefault()
}

function editDog() {
    console.log("I'm a good boy placeholder, woof")
}