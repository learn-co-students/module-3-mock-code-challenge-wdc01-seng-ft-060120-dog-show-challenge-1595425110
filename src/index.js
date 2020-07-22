const BASEURL = 'http://localhost:3000/dogs/'

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()

    fetchAllDogs()
    // delegateClicks()
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
        let editForm = document.getElementById('dog-form')
        editForm.reset()
        editForm.name.value = dog.name
        editForm.breed.value = dog.breed
        editForm.sex.value = dog.sex
        editForm.dataset.id = dog.id
        updateDogInfo(dog, editForm)
    })
    tableRow.appendChild(editButton)
}

// this is event delegation: 
// let delegateClicks = () => {
//     document.addEventListener('click', e => {
//         if (e.target.textContent === 'Edit Dog') {
//             const dogRow = e.target.closest('tr')
//             const name = dogRow.children[0].textContent
//             const breed = dogRow.children[1].textContent
//             const sex = dogRow.children[2].textContent

//             const dogForm = document.querySelector('form')

//         }
//     })
// }
// const submitHandler = () => {
//     document.addEventListener('submit', e => {
//         e.preventDefault()

//     })
// }
let updateDogInfo = (dog, editForm) => {
    // let editForm = document.getElementById('dog-form')
    // let nameInput = editForm.querySelector('input[name="name"]')
    // nameInput.value = dog.name
    
    // let dogBreed = dog.querySelector('.breed')
    // let breedInput = editForm.querySelector('input[name="breed"]')
    // breedInput.value = dog.breed

    // let dogSex = dog.querySelector('.sex')
    // let sexInput = editForm.querySelector('input[name="sex"]')
    // sexInput.value = dog.sex

    
    // let submitButton = editForm.querySelector('input[type="submit"]')
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        patchRequest(dog)
    })
    
}

let patchRequest = (dog) => {
    let editForm = document.getElementById('dog-form')
    let editDog = {
        "name": editForm.name.value,
        "breed": editForm.breed.value,
        "sex": editForm.sex.value
    }

    let options = {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accepts: 'application/json'
        },
        body: JSON.stringify(editDog)
    }
    fetch(BASEURL + editForm.dataset.id, options)
    .then(response => response.json())
    .then( dog => updateDogTable() )
}

let updateDogTable = () => {
    let dogList = document.getElementById('table-body')
    removeAllListItems(dogList)
    fetchAllDogs()
}

let removeAllListItems = (dogList) => {
    while (dogList.firstChild) {
        dogList.removeChild(dogList.firstChild)
    }
}

let fetchAllDogs = () => {
    fetch(BASEURL)
    .then(response => response.json())
    .then(dogs => renderDogs(dogs))
}