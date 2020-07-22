DOGURL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    getDogs();
})

const getDogs = () => {
    fetch(DOGURL)
    .then(res => res.json())
    .then(dogs => {renderDogs(dogs)})
}

const renderDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
}

const renderDog = (dog) => {
    const dogTable = document.getElementById("table-body")
    
    const dogRow = document.createElement('tr')
    dogTable.appendChild(dogRow)
    
    const dogName = document.createElement('td')
    dogName.innerText = dog.name
    dogRow.appendChild(dogName)

    const dogBreed = document.createElement('td')
    dogBreed.innerText = dog.breed
    dogRow.appendChild(dogBreed)

    const dogGender = document.createElement('td')
    dogGender.innerText = dog.sex
    dogRow.appendChild(dogGender)

    const edit = document.createElement('td')
    const editDogButton = document.createElement('button')
    editDogButton.innerText = "Edit dog"
    editDogButton.addEventListener('click', (e) =>{
        editDog(dog);
    })
    edit.appendChild(editDogButton)
    dogRow.appendChild(edit)
}

const editDog = (dog) => {
    const editDogForm = document.getElementById('dog-form')
    
    const editName = editDogForm.firstElementChild
    editName.value = dog.name

    console.log(editName)
}


