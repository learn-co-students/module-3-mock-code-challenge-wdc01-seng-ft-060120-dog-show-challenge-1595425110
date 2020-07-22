document.addEventListener('DOMContentLoaded', () => {
// make fetch request to base_url
//render every register dog



const urlBase = "http://localhost:3000/dogs"

function fecthGet(){
    fetch(urlBase)
    .then(resp => resp.json())
    .then(dogs => renderAllDogs(dogs))
}
fecthGet()  

function renderAllDogs(dogs){
    dogs.forEach(dog => renderDog(dog))
}

function renderDog(dog){
    // get access to table body with id = "table-body"
    //<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
    // create tr and append it to table body
    // td and append it to tr
    const tableBody = document.getElementById("table-body")
    const tableRow = document.createElement('tr')
    tableBody.append(tableRow)

    const tableDataName = document.createElement('td')
    tableRow.append(tableDataName)
    tableRow.innerText = `${dog.name}`

    const tableDataBreed = document.createElement('td')
    tableDataBreed.innerText = `${dog.breed}`
    tableRow.append(tableDataBreed)

    const tableDataSex = document.createElement('td')
    tableDataSex.innerText = `${dog.sex}`
    tableRow.append(tableDataSex)

    const tableDataButton = document.createElement('td')
    const button = document.createElement('button')
    button.innerText = "Edit"
    tableDataButton.append(button)
    tableRow.append(tableDataButton)
    console.log(tableBody)
    
}
})