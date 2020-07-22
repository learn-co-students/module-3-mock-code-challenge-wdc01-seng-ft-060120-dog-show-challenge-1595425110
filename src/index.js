const BASEURL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()

    fetchAllDogs()
})

let renderDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
}

let renderDog = (dog) => {
    let tableBody = document.getElementById('table-body')
    let tableRow = document.createElement('tr')
    tableRow.dataset.id = dog.id
    tableBody.appendChild(tableRow)

    let name = document.createElement('td')
    name.innerText = dog.name
    name.classList += 'name'
    tableRow.appendChild(name)

    let breed = document.createElement('td')
    breed.innerText = dog.breed
    breed.classList += 'breed'
    tableRow.appendChild(breed)

    let sex = document.createElement('td')
    sex.innerText = dog.sex
    sex.classList += 'sex'
    tableRow.appendChild(sex)

    let editButton = document.createElement('button')
    editButton.id = dog.id 
    editButton.classList += 'edit'
    editButton.innerText = 'Edit Dog'
    editButton.addEventListener('click', (e) => {
        updateDogInfo(e.target.parentNode)
    })
    tableRow.appendChild(editButton)
}

let updateDogInfo = (dog) => {
    let editForm = document.getElementById('dog-form')
    let nameInput = editForm.querySelector('input[name="name"]')
    nameInput.value = dog.firstChild.innerText
    
    let dogBreed = dog.querySelector('.breed')
    let breedInput = editForm.querySelector('input[name="breed"]')
    breedInput.value = dogBreed.innerText

    let dogSex = dog.querySelector('.sex')
    let sexInput = editForm.querySelector('input[name="sex"]')
    sexInput.value = dogSex.innerText

    let submitButton = editForm.querySelector('input[type="submit"]')
    console.log(submitButton)
}

let fetchAllDogs = () => {
    fetch(BASEURL)
    .then(response => response.json())
    .then(dogs => renderDogs(dogs))
}