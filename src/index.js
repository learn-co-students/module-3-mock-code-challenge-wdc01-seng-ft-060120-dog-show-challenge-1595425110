let baseUrl = 'http://localhost:3000'
let dogsUrl = baseUrl + '/dogs'

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    // document.addEventListener("click", (event) => {
        // if(event.target.value === "submit")
        //     submitEditedDog()
    // })
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
    editDogBtn.id = dog.name

    dogName.textContent = dog.name
    dogBreed.textContent = dog.breed
    dogSex.textContent = dog.sex
    editDogBtn.textContent = 'Edit Dog'
    editDogBtn.id = `Edit ${dog.name}`

    tableBody.appendChild(dogRow)
    dogRow.appendChild(dogName)
    dogRow.appendChild(dogBreed)
    dogRow.appendChild(dogSex)
    dogRow.appendChild(editDog)
    editDog.appendChild(editDogBtn)

    document.addEventListener("click", (e) => {
        if(e.target.id === `Edit ${dog.name}`)
            populateDogForm(dog)
    })

    function populateDogForm(dog) {
        let dogForm = document.getElementById("dog-form")
        let field = dogForm.getElementsByTagName("input")
        let nameField = field[0]
        let breedField = field[1]
        let sexField = field[2]

        nameField.value = `${dog.name}`
        breedField.value = `${dog.breed}`
        sexField.value = `${dog.sex}`
    };
};


