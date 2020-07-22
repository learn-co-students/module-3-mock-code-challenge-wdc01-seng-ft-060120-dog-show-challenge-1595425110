const DOGURL = 'http://localhost:3000/dogs/'
let dogId = 0

document.addEventListener('DOMContentLoaded', () => {
    getDogs();
    handleForm();
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
        dogId = dog.id
        editDog(dog);
        console.log(dogId)
    })
    edit.appendChild(editDogButton)
    dogRow.appendChild(edit)
}

const editDog = (dog) => {
    const editDogForm = document.getElementById('dog-form')

    const editName = editDogForm.firstElementChild
    editName.value = dog.name

    const editBreed =  editDogForm.children[1]
    editBreed.value = dog.breed
    
    const editSex = editDogForm.children[2]
    editSex.value = dog.sex

}

const handleForm = () => {
    document.addEventListener('submit', (e) => {
        e.preventDefault()

        const patchRequest = {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                // name: dog.name,
                // breed: dog.breed,
                // sex: dog.sex
            })
        }

        fetch(`${DOGURL}${dogId}`, patchRequest)
        .then(res => res.json())
        .then(data => console.log()
    })

}

