document.addEventListener('DOMContentLoaded', () => {
// make fetch request to base_url
// get access to div with class = "margin-flex"
// get access to table with class = "margin"
//get access to tr with class = "padding"
// get access to th with class = "padding center"
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
    const tableHead = document.querySelector(".padding")
    tableHead.innerHTML = `${dog.name}`
    console.log(tableHead)
}
})