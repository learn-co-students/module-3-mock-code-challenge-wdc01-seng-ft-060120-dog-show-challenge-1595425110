const baseURL = 'http://localhost:3000/'
const dogsURL = baseURL + 'dogs/'

document.addEventListener('DOMContentLoaded', () => {
    // const dogTable = document.getElementById('table-body')
    // console.log(dogsURL)
    fetchDogs()
    // editDogForm()
})

const fetchDogs = () => {
    fetch(dogsURL)
        .then(resp => resp.json())
        .then(dogs => {
            renderAllDogs(dogs)
            console.log(dogs)
        })
}

const renderAllDogs = dogs => {
    dogs.forEach(dog => renderDog(dog))
}
// const dogTable = document.getElementById('table-body') // why is this giving me null??
const renderDog = dog => {
    const dogTable = document.getElementById('table-body')
    // append to dogTable
    // console.log(dogTable)

    const tableRow = document.createElement('tr')
    dogTable.appendChild(tableRow)

    const dataName = document.createElement('td')
    dataName.textContent = dog.name
    tableRow.appendChild(dataName)

    const dataBreed = document.createElement('td')
    dataBreed.textContent = dog.breed
    tableRow.appendChild(dataBreed)

    const dataSex = document.createElement('td')
    dataSex.textContent = dog.sex
    tableRow.appendChild(dataSex)

    const editButton = document.createElement('button')
    editButton.textContent = 'Edit Dog'
    tableRow.appendChild(editButton)

    handleButtonListener(editButton, dog)
    // <tr>
    //     <td>Dog *Name*</td>
    //     <td>*Dog Breed*</td>
    //     <td>*Dog Sex*</td>
    //     <td><button>Edit</button></td>
    // </tr>
}

const handleButtonListener = (button, dog) => {
    // grab form
    const editForm = document.getElementById('dog-form')
    button.addEventListener('click', () => {
        // populate inputs
        editForm.name.value = dog.name
        editForm.breed.value = dog.breed
        editForm.sex.value = dog.sex

        editDogForm(dog, editForm)
    })
}

const editDogForm = dog => {
    // grab form
    // console.log(dog)
    const form = document.getElementById('dog-form')
    // listen for submit
    form.addEventListener('submit', e => {
        // prevent default
        e.preventDefault()
        // console.log('trying to submit')

        // make patch request

        const patchRequest = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            },
            body: JSON.stringify({
                name: form.name.value,
                breed: form.breed.value,
                sex: form.sex.value,
            }),
        }

        fetch(dogsURL + dog.id, patchRequest)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                // reload dog list
                const tableBody = document.getElementById('table-body')
                tableBody.innerHTML = ''
                fetchDogs()
            })
    })
}
