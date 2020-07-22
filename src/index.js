const baseUrl = 'http://localhost:3000'
const dogsUrl = `${baseUrl}/dogs`

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs(dogsUrl)
    handleButtons()
})

const fetchDogs = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(dogs => renderAllDogs(dogs))
}

const renderAllDogs = dogs => {
    dogs.forEach(dog => renderDog(dog))
}

const renderDog = dog => {
    const dogTable = document.querySelector('#table-body')
    // console.log(dogTable)
    const dogRow = document.createElement('tr')
    dogRow.dataset.id = dog.id
    dogTable.appendChild(dogRow)

    const dogName = document.createElement('td')
    dogName.textContent = dog.name
    dogRow.appendChild(dogName)

    const dogBreed = document.createElement('td')
    dogBreed.textContent = dog.breed
    dogRow.appendChild(dogBreed)

    const dogSex = document.createElement('td')
    dogSex.textContent = dog.sex
    dogRow.appendChild(dogSex)

    const dogEdit = document.createElement('td')
    const dogEditButton = document.createElement('button')
    dogEditButton.classList += 'edit'
    dogEditButton.dataset.dogId = dog.id
    dogEditButton.textContent = "Edit Dog"
    dogEdit.appendChild(dogEditButton)
    dogRow.appendChild(dogEdit)
}

const handleButtons = () => {
    document.addEventListener('click', function(e){
        if(e.target.matches('.edit')){
            // console.log(e.target.parentNode.parentNode) = whole row
            const dogForm = document.querySelector('#dog-form')
            const dogInfo = e.target.parentNode.parentNode
            console.log(dogForm.name)

            const grabDogName = dogInfo.children[0].innerText
            const grabDogBreed = dogInfo.children[1].innerText
            const grabDogSex = dogInfo.children[2].innerText

            dogForm.name.value = grabDogName
            dogForm.breed.value = grabDogBreed
            dogForm.sex.value = grabDogSex
        }
    })

    document.addEventListener('submit', function(e){
        e.preventDefault()
        console.log(e.target)
    })
}