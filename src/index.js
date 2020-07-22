const DOGS_URL = "http://localhost:3000/dogs/";

const getTbody = () =>
{
  return document.getElementById(("table-body"));
}
const runner = () =>
{  
  const tbody = getTbody();
  fetchThenRenderDogs(tbody);
  document.addEventListener("submit",submitHandler);
  document.addEventListener("click",clickHandler);
}

document.addEventListener('DOMContentLoaded', runner);

const clickHandler = (e) =>
{
  const tgt = e.target;
  if (tgt.className === "edit")
  {
    const ppId = tgt.parentElement.parentElement.dataset.id;
    if(!!ppId)
      fetchDogThenForm(ppId);
  }
}

const submitHandler = (e) =>
{
  e.preventDefault();
  const inp = e.target.children;
  const dogData =
  {
    name: inp[0].value,
    breed: inp[1].value,
    sex: inp[2].value
  };
  const configObj =
  {
    method: "PATCH",
    body: JSON.stringify(dogData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

  fetch(DOGS_URL + e.target.dataset.id,configObj)
  .then(r => r.json())
  .then(dog => updateRow(dog));
}


const fetchDogThenForm = (id) =>
{
  fetch(DOGS_URL + id)
  .then(r => r.json())
  .then(dog => populateEditForm(dog));
}

const populateEditForm = (dog) =>
{
  const form = document.getElementById("dog-form");
  form.dataset.id = dog.id;
  const fInp = form.getElementsByTagName('input');
  const inp = [dog.name,dog.breed,dog.sex]
  for(let i = 0; i < 3; i++)
  {
    fInp[i].value = inp[i];
  }
}

//fetches dogs and calls renderDogs to add them to table
const fetchThenRenderDogs = (tbody) =>
{
  fetch(DOGS_URL)
  .then(r => r.json())
  .then(dogs => renderDogs(dogs,tbody))
  .catch(error => console.log(error));
}

//renders each dog to table
const renderDogs = (dogs,tbody) =>
{
  tbody.innerHTML = "";
  dogs.forEach(dog =>  renderDog(dog,tbody));
}

//renders dog to table
const renderDog = (dog,tbody) =>
{      
  const tr = document.createElement("tr");
  tr.innerHTML = "";
  tr.dataset.id = dog.id;
  setDogRow(dog,tr);
  tbody.append(tr);
}

const updateRow = (dog) =>
{
  const tr = getTbody().querySelector(`[data-id~="${dog.id}"]`);
  console.log(dog);
  setDogRow(dog,tr);
}

const setDogRow = (dog,tr) =>
{
  tr.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit">Edit</button></td>`;
}