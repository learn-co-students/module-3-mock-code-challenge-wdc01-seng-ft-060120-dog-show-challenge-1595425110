BASE_URL = 'http://localhost:3000/'
DOG_URL = BASE_URL + 'dogs/'

document.addEventListener('DOMContentLoaded', () => {

    const getDogs = () => {
        fetch(DOG_URL)
        .then(resp => resp.json())
        .then(dogs => {
            renderDogs(dogs)
        })
    }

    const renderDogs = (dogsArray) => {
        dogsArray.forEach(dog => {renderDog(dog)})
    }

    const renderDog = (dog) => {
        const tbody = document.getElementById('table-body');
        const tr = document.createElement('tr');


        const dogName = document.createElement('td');
        dogName.innerText = dog.name; 
        dogName.className= 'name'
        dogName.id = (`${dog.id}`, 'hidden')
        console.log(dogName)
        tr.appendChild(dogName);

        const dogBreed = document.createElement('td')
        dogBreed.innerText = dog.breed 
        dogBreed.className = 'breed'
        tr.appendChild(dogBreed);

        const dogSex = document.createElement('td')
        dogSex.innerText = dog.sex 
        dogSex.className = 'sex'
        tr.appendChild(dogSex)

        const button = document.createElement('button')
        button.innerText = 'Edit'
        button.id = dog.id
        tr.appendChild(button)
        button.addEventListener('click', (event) => {
            // grab the info in the table row and populate the form fields on the submit form 
            // find the form field area and make the innertext of that field the dog data
            const form = document.getElementById('dog-form')

            const dogNameField = form[0]
            dogNameField.value = event.target.parentNode.querySelector(`.name`).innerText

            const dogBreedField = form[1]
            dogBreedField.value = event.target.parentNode.querySelector('.breed').innerText

            const dogSexField = form[2] 
            dogSexField.value = event.target.parentNode.querySelector('.sex').innerText
            
        })
        
        tbody.appendChild(tr)
    }

    document.addEventListener('submit', (event) => {
        event.preventDefault();
        const dogForm = event.target

        const name = dogForm.name.value 
        const breed = dogForm.breed.value
        const sex = dogForm.sex.value 
        
        const dogObject = {name, breed, sex}
        
        dogForm.reset();
        
        // do a patch fetch request to change the data 
        // once form is submitted, we have to show the changes. We could do another GET fetch request.  
        
        const dogId = document.getElementById(name)
        console.log(dogId)
        const entireDog = dogId.parentNode
        const actualId = entireDog.querySelector('button').id

        // const options = {
        //     method: 'PATCH',
        //     headers: {
        //         'content-type' : 'application/json',
        //         'accept' : 'application/json'
        //     },
        //     body: JSON.stringify(dogObject)
        // }

        // fetch((DOG_URL + actualId), options)
        // .then(resp => resp.json())
        // .then(newDogData => console.log(newDogData))
    })

    getDogs();

})