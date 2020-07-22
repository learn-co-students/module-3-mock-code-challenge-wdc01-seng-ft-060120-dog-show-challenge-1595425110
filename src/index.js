document.addEventListener('DOMContentLoaded', () => {
    const URL = "http://localhost:3000/dogs"
    let dogForm = document.getElementById('dog-form')
    let dogInputs = dogForm.querySelectorAll('input')
    
    getDogs()
    
    // dogInputs[3].addEventListener('click',event=>{
    //     event.preventDefault()
    //     sumbitHandler()
    // })

    // function sumbitHandler(dog){
    //     let dog = {"name":dogInputs[0].value,"breed":dogInputs[1].value,"sex":dogInputs[2].value}
    //     fetch(URL,{
    //         method: "POST",
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(dog)
    //     })
    //     .then(response=>response.json())
    //     .then(dog=>{
    //         console.log(dog)
    //         renderDog(dog)
    //     })
    
    // }
    


function getDogs(){
    fetch(URL).then(response => response.json()).then(dogs => {renderDogs(dogs)})
}

function renderDogs(dogs){
    dogs.forEach(dog => {renderDog(dog)})
}

function renderDog(dog){
    let tableBody = document.getElementById('table-body')
    let tableRow = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdBreed = document.createElement('td')
    let tdSex = document.createElement('td')
    let tdEdit = document.createElement('td')
    let editButton = document.createElement('button')

    tdName.textContent = dog.name
    tdBreed.textContent = dog.breed
    tdSex.textContent = dog.sex
    editButton.textContent = "Edit"

    tdEdit.append(editButton)
    tableRow.append(tdName,tdBreed,tdSex,editButton,tdEdit)
    tableBody.append(tableRow)

    editButton.addEventListener('click', event =>{
        editDogHandler(dog)
    })
}

function editDogHandler(dog){
    // let dogForm = document.getElementById('dog-form')
    // let dogInputs = dogForm.querySelectorAll('input')
    
    dogInputs[0].value = dog.name
    dogInputs[1].value = dog.breed
    dogInputs[2].value = dog.sex
    
    dogInputs[3].addEventListener('click', event=>{
        event.preventDefault()

        fetch(URL+`/${dog.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(response=>response.json())
        .then(dog=>{
            console.log(dog)
            renderDog(dog)
        })
    })
}

        
    
    
})