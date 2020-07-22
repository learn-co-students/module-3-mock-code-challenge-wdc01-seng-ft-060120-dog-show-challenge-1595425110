const url = 'http://localhost:3000/dogs/'

document.addEventListener('DOMContentLoaded', () => {
   getDogs()
});

function getDogs() {
    fetch(url)
    .then(response => response.json())
    .then(dogs => {dogs
        renderDogs(dogs)
    })
}

function renderDogs(dogs) {
dogs.forEach(dog => {
        renderDog(dog)
  })
}

function renderDog(dog) {
    const table = document.querySelector('#table-body')
    let tr = document.createElement('tr')
    let tdName = document.createElement('td')
    tdName.innerHTML = dog.name
    let tdBreed = document.createElement('td')
    tdBreed.innerHTML = dog.breed
    let tdSex = document.createElement('td')
    tdSex.innerHTML = dog.sex
    let tdButton = document.createElement('button')
    tdButton.innerText = "Edit"
    tdButton.addEventListener('click', (e) => editDog(e, dog))
    tr.appendChild(tdName)
    tr.appendChild(tdBreed)
    tr.appendChild(tdSex)
    tr.appendChild(tdButton)
    table.appendChild(tr)
}

function editDog(e, dog) {

}