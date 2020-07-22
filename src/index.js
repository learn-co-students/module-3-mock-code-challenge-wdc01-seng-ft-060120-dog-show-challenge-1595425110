DOGS_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {

	const tableBody = document.getElementById("table-body");
	const dogForm = document.getElementById("dog-form");

	function getDogs(){
		fetch(DOGS_URL)
			.then(resp => resp.json())
			.then(displayDogs)
		//		.catch(error => error.forEach(alert(error.message)))
	}

	function displayDogs(json){
		json.forEach(displayDog);
		document.addEventListener('submit', (e) => {
			e.preventDefault();

			const submitButton = dogForm[3];

			if(submitButton.dataset['id']){
				submitForm();
			}
		})
	}

	function displayDog(dog){
//		if(!document.querySelector(`td > [data-id='${dog["id"]}']`)){
			const newRow = document.createElement("tr")
			const nameData = document.createElement("td")
			const breedData = document.createElement("td")
			const sexData = document.createElement("td")
			const editButton = document.createElement("button")
			const editButtonTd = document.createElement("td")

			nameData.textContent = dog['name'];
			breedData.textContent = dog['breed'];
			sexData.textContent = dog['sex'];
			editButton.textContent = "Edit Dog";
			editButton.setAttribute("data-id", dog['id']);
			editButtonTd.append(editButton);

			newRow.append(nameData, breedData, sexData, editButtonTd);
			tableBody.append(newRow);

			editButton.addEventListener("click", (e) => {
				dogForm.name.value = dog['name'];
				dogForm.breed.value = dog['breed'];
				dogForm.sex.value = dog['sex'];
				dogForm[3].setAttribute('data-id', dog['id']);
			})
//		}
//			else{
//				const editRow = document.querySelector(`td > [data-id='${dog["id"]}']`).parentElement.parentElement;
//			}
	}

	function submitForm() {
		const newName = dogForm.name.value;
		const newBreed = dogForm.breed.value;
		const newSex = dogForm.sex.value;
		const submitButton = dogForm[3];
		const dogId = submitButton.dataset['id'];

		if(newName == '' || newBreed == '' || newSex == ''){
			alert('Please fill in all fields before submitting');
		}
		else{

			PATCH_PARAMS = { method: 'PATCH',
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify({
					name: newName,
					breed: newBreed,
					sex: newSex
				})
			};

			fetch(DOGS_URL + `/${dogId}`, PATCH_PARAMS)
				.then(resp => resp.json())
				.then(dog => console.log(dog))
		}
	}


	getDogs();
})
