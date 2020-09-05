var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var today = new Date();
today.setTime(today.getTime());
const todayDateTag = document.getElementById("spanDate");

todayDateTag.innerHTML =
  months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();

const url = "http://localhost:3000/api/v1/prescriptions/";
const addBtn = document.querySelector("#add-prescription");
const prescriptionFormContainer = document.getElementById(
  "prescription-form-container"
);

const medDetailDiv = document.querySelector(".medication-detail");
const medUl = document.querySelector("ul#medication-list-ul");
addPrescription = false;

addBtn.addEventListener("click", () => {
  addPrescription = !addPrescription;
  if (addPrescription) {
    prescriptionFormContainer.style.display = "block";
  } else {
    prescriptionFormContainer.style.display = "none";
  }
  // medDetailDiv.innerHTML = ""

  // fetch()
});

function fetchData() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => renderAllPrescriptions(data));
}
fetchData();

function renderAllPrescriptions(prescriptions) {
  for (const prescription of prescriptions) {
    dipslayPrescription(prescription);
  }
}

function dipslayPrescription(prescription) {
  console.log(prescription);

  const medLi = document.createElement("li");
  medUl.append(medLi);
  medLi.innerText =
    prescription.medication.name + " " + prescription.medication.strength;

  const btnDiv = document.createElement("div");
  btnDiv.className = "list-item-menu";

  const btnUl = document.createElement("ul");
  btnUl.className = "uk-iconnav";

  // working delete and edit button
  const editBtn = document.createElement("i");
  editBtn.className = "uk-button uk-button-default uk-button-small";
  editBtn.innerHTML = `<a class="edit-button" uk-icon="icon: pencil"></a>`;

  const deleteBtn = document.createElement("i");
  deleteBtn.innerText = "Delete";
  deleteBtn.innerHTML = `<a class="delete-button" uk-icon="icon: trash"></a>`;
  deleteBtn.className = "uk-button uk-button-danger uk-button-small";

  //   btnUl.append(editBtn, deleteBtn);

  const checkATag = document.createElement("a");
  checkATag.innerHTML = `<a class="check-button" uk-icon="icon: check""></a>`;

  const editATag = document.createElement("a");
  editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil""></a>`;
  //   editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>`;

  const deleteATag = document.createElement("a");
  deleteATag.innerHTML = `<a class="delete-button" uk-icon="icon: trash"></a>`;

  btnUl.append(checkATag, editATag, deleteATag);
  medLi.append(btnUl);
}
