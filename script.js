"use strict";

var pets = new Array();
var healthyCheck = false; // No list all healthy pets
var calcBMI = false; // Display BMI all case (including healthy pets view)

// Form elements content
const petIDEl = document.getElementById("input-id");
const petNameEl = document.getElementById("input-name");
const petAgeEl = document.getElementById("input-age");
const petTypeEl = document.getElementById("input-type");
const petWeightEl = document.getElementById("input-weight");
const petLengthEl = document.getElementById("input-length");
const petColorEl = document.getElementById("input-color-1");
const petBreedEl = document.getElementById("input-breed");
const petVacinatedEl = document.getElementById("input-vaccinated");
const petDewormedEl = document.getElementById("input-dewormed");
const petSterilizedEl = document.getElementById("input-sterilized");

// Button elements
const btnSubmit = document.getElementById("submit-btn");
const btnShowHealthyPet = document.getElementById("healthy-btn");
const btnCalBMI = document.getElementById("calBMI-btn");

// Table element
const fillPet = document.getElementById("tbody");

// Error elements
const eIDNull = document.getElementById("eIdNull");
const eID = document.getElementById("eIdUnique");
const eName = document.getElementById("eNameNull");
const eAgeNull = document.getElementById("eAgeNull");
const eAge = document.getElementById("eAge");
const eType = document.getElementById("eType");
const eWeightNull = document.getElementById("eWeightNull");
const eWeight = document.getElementById("eWeight");
const eLengthNull = document.getElementById("eLengthNull");
const eLength = document.getElementById("eLength");
const eBreed = document.getElementById("eBreed");

const addPet = function (pet) {
  pets.push(pet);
  if (pets.length === 1) fillPet.innerHTML = "";
  console.log(pets);
};

const petToRow = function (pet, bmi) {
  return `<tr>
  <th scope="row">${pet.petID}</th>
  <td>${pet.petName}</td>
  <td>${pet.petAge}</td>
  <td>${pet.petType}</td>
  <td>${pet.petWeight} kg</td>
  <td>${pet.petLength} cm</td>
  <td>${pet.petBreed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${pet.petColor}"></i>
  </td>
  <td><i class="bi ${
    pet.petVacinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.petDewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.petSterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td>${bmi ? pet.BMI : "?"}</td>
  <td>${pet.dateAdded}</td>
  <td><button type="button" class="btn btn-danger" onClick="deletePet('${
    pet.petID
  }');">Delete</button>
  </td>
</tr>`;
};

// Refresh table data
const renderTableData = (pets, bmi) => {
  let n = pets.length;
  if (n == 0) {
    fillPet.innerHTML = `<tr>
    <td colspan="14" style="text-align: center; font-style: italic">
      Please input data
    </td>
  </tr>`;
    return;
  }
  // Empty Table
  fillPet.innerHTML = "";

  // Fill the table
  for (let i = 0; i < n; i++) {
    fillPet.innerHTML += petToRow(pets[i], bmi);
  }
};

const getDate = function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "/" + mm + "/" + yyyy;
};

const checkIDUniqued = function (pID) {
  let n = pets.length;
  if (n == 0) {
    return true;
  }
  for (let i = 0; i < n; i++) {
    if (pID === pets[i].petID) return false;
  }
  return true;
};

const hideErrors = function () {
  const errors = document.querySelectorAll(".errors");
  for (let i = 0; i < errors.length; i++) {
    if (!errors[i].classList.contains("hidden"))
      errors[i].classList.add("hidden");
  }
};

const validate = function () {
  let ok = true;
  hideErrors();

  // check ID is not null and unique
  if (petIDEl.value === "") {
    eIDNull.classList.remove("hidden");
    ok = false;
  } else if (!checkIDUniqued(petIDEl.value)) {
    eID.classList.remove("hidden");
    ok = false;
  }

  // Check name is not null
  if (petNameEl.value === "") {
    eName.classList.remove("hidden");
    ok = false;
  }

  // Check Age is not null and between 1 - 15
  if (petAgeEl.value === "") {
    eAgeNull.classList.remove("hidden");
    ok = false;
  } else if (Number(petAgeEl.value) < 1 || Number(petAgeEl.value) > 15) {
    eAge.classList.remove("hidden");
    ok = false;
  }

  // Check Type is selected
  if (petTypeEl.value === "Select Type") {
    eType.classList.remove("hidden");
    ok = false;
  }

  // Check Weight is not null and between 1 - 15
  if (petWeightEl.value === "") {
    eWeightNull.classList.remove("hidden");
    ok = false;
  } else if (Number(petWeightEl.value) < 1 || Number(petWeightEl.value) > 15) {
    eWeight.classList.remove("hidden");
    ok = false;
  }

  // Check Length is not null and between 1- 100
  if (petLengthEl.value === "") {
    eLengthNull.classList.remove("hidden");
    ok = false;
  } else if (Number(petLengthEl.value) < 1 || Number(petLengthEl.value) > 100) {
    eLength.classList.remove("hidden");
    ok = false;
  }

  // Check Breed is selected
  if (petBreedEl.value === "Select Breed") {
    eBreed.classList.remove("hidden");
    ok = false;
  }

  return ok;
};

const clearInput = () => {
  petIDEl.value = "";
  petNameEl.value = "";
  petAgeEl.value = "";
  petTypeEl.value = "Select Type";
  petWeightEl.value = "";
  petLengthEl.value = "";
  petColorEl.value = "#000000";
  petBreedEl.value = "Select Breed";
  petVacinatedEl.checked = false;
  petDewormedEl.checked = false;
  petSterilizedEl.checked = false;
};

btnSubmit.addEventListener("click", function () {
  if (validate()) {
    if (true) {
      // Datas variables
      const pet = {
        setPetID: function (petID) {
          this.petID = petID;
          return this.petID;
        },
        setPetName: function (petName) {
          this.petName = petName;
          return this.petName;
        },
        setPetAge: function (petAge) {
          this.petAge = petAge;
          return this.petAge;
        },
        setPetType: function (petType) {
          this.petType = petType;
          return this.petType;
        },
        setPetWeight: function (petWeight) {
          this.petWeight = petWeight;
          return this.petWeight;
        },
        setPetLength: function (petLength) {
          this.petLength = petLength;
        },
        setPetColor: function (petColor) {
          this.petColor = petColor;
          return this.petColor;
        },
        setPetBreed: function (petBreed) {
          this.petBreed = petBreed;
          return this.petBreed;
        },
        setPetVacinated: function (vacinated) {
          this.petVacinated = vacinated;
          return this.petVacinated;
        },
        setPetDewormed: function (dewormed) {
          this.petDewormed = dewormed;
          return this.petDewormed;
        },
        setPetSterilized: function (sterilized) {
          this.petSterilized = sterilized;
          return this.petSterilized;
        },
        setDateAdded: function (date) {
          this.dateAdded = date;
          return this.dateAdded;
        },
        calBMI: function () {
          this.BMI =
            (this.petWeight * this.petType == "Dog" ? 703.0 : 886.0) /
            this.petLength ** 2;
          this.BMI = parseFloat(this.BMI).toFixed(2);
          return this.BMI;
        },
      };
      // If the inputs isn't error -> let's record!
      pet.setPetID(petIDEl.value);
      pet.setPetName(petNameEl.value);
      pet.setPetAge(Number(petAgeEl.value));
      pet.setPetType(petTypeEl.value);
      pet.setPetWeight(Number(petWeightEl.value));
      pet.setPetLength(Number(petLengthEl.value));
      pet.setPetColor(petColorEl.value);
      pet.setPetBreed(petBreedEl.value);
      pet.setPetVacinated(petVacinatedEl.checked ? true : false);
      pet.setPetDewormed(petDewormedEl.checked ? true : false);
      pet.setPetSterilized(petSterilizedEl.checked ? true : false);
      pet.setDateAdded(getDate());
      pet.calBMI();

      // Add above information to list
      addPet(pet);

      // Convert data to table and fill to table below
      renderTableData(pets, calcBMI);

      // Hide all error messages
      hideErrors();

      // Clear input
      clearInput();
    }
  }
});

// Show Healthy pets
const showHealthyPet = function () {
  let healthyPets = new Array();
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].petVacinated && pets[i].petDewormed && pets[i].petSterilized)
      healthyPets.push(pets[i]);
  }
  renderTableData(healthyPets, calcBMI);
};

btnShowHealthyPet.addEventListener("click", () => {
  if (!healthyCheck) {
    healthyCheck = true;
    showHealthyPet();
    btnShowHealthyPet.textContent = "Show All Pets";
  } else {
    renderTableData(pets);
    healthyCheck = false;
    btnShowHealthyPet.textContent = "Show Healthy Pet";
  }
});

// Delete record here

const findItem = function (pID) {
  let item = -1;
  for (let i = 0; i < pets.length; i++) {
    console.log(pets[i].petID);
    if (pID == pets[i].petID) {
      item = i;
    }
  }
  return item;
};

const deletePet = (pID) => {
  console.log(pID);

  if (confirm("Are you sure?")) {
    let item = pets.indexOf(findItem(pID));
    console.log(findItem(pID));
    pets.splice(findItem(pID), 1);
    renderTableData(pets, calcBMI);
  }
};

// Show Healthy Pet functions
btnCalBMI.addEventListener("click", function () {
  // BMI was calculated when adding

  // display BMI
  calcBMI = true;
  renderTableData(pets, calcBMI);
});
