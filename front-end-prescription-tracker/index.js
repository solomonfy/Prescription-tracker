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
const addBtn = document.querySelector("a.add-button");
const prescriptionFormContainer = document.getElementById(
  "prescription-form-container"
);

const medDetailDiv = document.querySelector(".medication-detail");
const medUl = document.querySelector("ul#medication-list-ul");
const refreshBtn = document.querySelector("a.refresh-button");
addPrescription = false;

addBtn.addEventListener("click", () => {
  addPrescription = !addPrescription;
  if (addPrescription) {
    prescriptionFormContainer.style.display = "block";
  } else {
    prescriptionFormContainer.style.display = "none";
  }

  // fetch()
});

// refreshBtn.addEventListener("click", () => {
//   medDetailDiv.innerHTML = "";
// });

function fetchData() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => renderAllPrescriptions(data));
}
fetchData();

function renderAllPrescriptions(prescriptions) {
  for (const prescription of prescriptions) {
    dipslayPrescription(prescription);
    // console.log(prescription.id);
  }
}

function dipslayPrescription(prescription) {
  const medLi = document.createElement("li");
  medUl.append(medLi);

  const medNamDiv = document.createElement("div");
  const medNameP = document.createElement("strong");
  const medStrengthSpan = document.createElement("span");
  const medTimeSpan = document.createElement("span");
  medTimeSpan.className = "med-time";

  // medNameP.innerText = prescription.medication.name + " " + prescription.medication.strength;
  medNameP.innerText = prescription.medication.name + " ";
  medStrengthSpan.innerText = prescription.medication.strength + " ";
  medTimeSpan.innerText = "2 PM";

  const btnDiv = document.createElement("div");
  btnDiv.className = "list-item-menu";

  // check, delete and edit icons
  const checkATag = document.createElement("a");
  checkATag.innerHTML = `<a class="check-button" uk-icon="icon: bell; ratio: 2"></a>`;

  checkATag.addEventListener("click", () => {
    var audio = new Audio("https://www.youtube.com/watch?v=M_aj6FbwbBs");
    audio.play();

    console.log("Clicked");
  });

  const editATag = document.createElement("a");
  editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-tooltip="Edit prescription"></a>`;

  const deleteATag = document.createElement("a");
  deleteATag.innerHTML = `<a class="delete-button" uk-icon="icon: trash" uk-tooltip="Delete prescription"></a>`;

  medNamDiv.append(medNameP, medStrengthSpan, medTimeSpan);
  medLi.append(medNamDiv, checkATag, editATag, deleteATag);

  medNamDiv.addEventListener("click", () => {
    const containerDiv = document.createElement("div");
    containerDiv.innerHTML = "";

    const polaroidDiv = document.createElement("div");
    polaroidDiv.className = "polaroid";

    const medNameTag = document.createElement("h3");
    const medImprintTag = document.createElement("h3");
    const medImage = document.createElement("img");
    medImage.className = "medication-image";

    medNameTag.innerText =
      "Name: " +
      prescription.medication.name +
      " " +
      prescription.medication.strength;
    medImprintTag.innerText = "Imprint: " + prescription.medication.imprint;

    medImage.src = prescription.medication.image;

    polaroidDiv.append(medImage, medImprintTag, medNameTag);
    containerDiv.append(polaroidDiv);
    // containerDiv.append(medNameTag, medImprintTag, medImage);
    medDetailDiv.append(containerDiv);
    // console.log(prescription.medication);
  });
}
