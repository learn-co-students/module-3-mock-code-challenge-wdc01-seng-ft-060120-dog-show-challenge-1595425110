DOGS_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
	
	const tableBody = document.getElementById("table-body");
	function getDogs(){
		fetch(DOGS_URL)
		.then(resp => resp.json())
		.then(displayDogs)
	//	.catch(error => error.forEach(alert(error.message)))
	}

	function displayDogs(json){
		json.forEach(displayDog)
	}

	function displayDog(dog){
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
		editButtonTd.append(editButton);

		newRow.append(nameData, breedData, sexData, editButtonTd);
		tableBody.append(newRow);
	}

	getDogs();
})
