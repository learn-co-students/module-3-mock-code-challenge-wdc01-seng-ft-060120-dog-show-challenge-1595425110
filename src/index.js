const baseURL = 'http://localhost:3000/'
const dogsURL = baseURL + 'dogs/'

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
})

const fetchDogs = () => {
  // initial get request
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

const renderDog = dog => {
  const dogTable = document.getElementById('table-body')

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
}

const handleButtonListener = (editButton, dog) => {
  // grab form
  const editForm = document.getElementById('dog-form')

  editButton.addEventListener('click', () => {
    // populate inputs
    editForm.name.value = dog.name
    editForm.breed.value = dog.breed
    editForm.sex.value = dog.sex

    editDogForm(dog, editForm)
  })
}

const editDogForm = dog => {
  // grab form
  const form = document.getElementById('dog-form')
  // listen for submit
  form.addEventListener('submit', e => {
    e.preventDefault()

    // make patch request configuratino Object
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

    //resets the form
    form.reset()

    // make a patch request to dogsURL
    fetch(dogsURL + dog.id, patchRequest)
      .then(resp => resp.json())
      .then(reloadTable())
  })
}

const reloadTable = () => {
  const tableBody = document.getElementById('table-body')

  tableBody.innerHTML = ''
  fetchDogs()
}
