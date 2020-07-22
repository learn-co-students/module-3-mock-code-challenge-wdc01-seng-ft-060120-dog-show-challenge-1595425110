DOGSURL = "http://localhost:3000/dogs/"



document.addEventListener('DOMContentLoaded', () => {
    const mainDogForm = document.getElementById("dog-form")
    
    fetchDogs();

    mainDogForm.addEventListener("submit", (e) => {
        e.preventDefault()
        updateDog(e.target)
    })
    

})

function fetchDogs(){
    fetch(DOGSURL)
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(renderDog);
    })
}

function renderDog(dog){
    let tableBody = document.getElementById("table-body")
    // console.log(dog)
    let row = document.createElement("tr");
    // render name cell
    let tdName = document.createElement("td")
    tdName.innerText = dog.name;
    row.appendChild(tdName)
    // render Breed Cell
    let tdBreed = document.createElement("td")
    tdBreed.innerText = dog.breed;
    row.appendChild(tdBreed)
    // render Sex Cell
    let tdSex = document.createElement("td")
    tdSex.innerText = dog.sex;
    row.appendChild(tdSex)
    // render Edit Button Cell
    let tdEdit = document.createElement("td")
    let editButton = document.createElement("button")
    editButton.innerText = "EDIT DOG"
    tdEdit.appendChild(editButton)
    row.appendChild(tdEdit)
    tableBody.appendChild(row)
    editButton.addEventListener("click", (e) => {
        populateForm(e.target.parentElement.parentElement, dog)
    })
}

function populateForm(tableRow, dog){
    let dogForm = document.getElementById("dog-form")
    dogForm.name.value = tableRow.children[0].innerText
    dogForm.breed.value = tableRow.children[1].innerText
    dogForm.sex.value = tableRow.children[2].innerText
    dogForm.children[3].dataset.id = dog.id
}

function updateDog(dogFormData){
    let dogId = dogFormData.children[3].dataset.id
    let updatedDog = {
        "name": dogFormData.name.value,
        "breed": dogFormData.breed.value,
        "sex": dogFormData.sex.value
    }
    let dogConfig = {
        method: "PATCH",
        
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify(updatedDog)
    }
    fetch(`${DOGSURL}${dogId}`, dogConfig)
    .then(resp => resp.json())
    .then(dog => {
        let tableBody = document.getElementById("table-body")
        tableBody.innerText = ""
        fetchDogs()
    })
    dogFormData.reset()
}