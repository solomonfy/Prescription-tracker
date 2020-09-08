

// Display today's date
const todayDateTag = document.getElementById("spanDate");
todayDateTag.innerHTML = new Date().toLocaleDateString();

const divMissedMed = document.querySelector("div.missed-medications");
const url = "http://localhost:3000/api/v1/prescriptions/";

const addBtn = document.querySelector("a.add-button");
const prescriptionFormContainer = document.getElementById(
  "prescription-form-container"
);

const medDetailDiv = document.querySelector(".medication-detail");
const medUl = document.querySelector("ul#medication-list-ul");
const refreshBtn = document.querySelector("a.refresh-button");
const breakTag = document.createElement("br");
addPrescription = false;
let allPrescriptions = [];

addBtn.addEventListener("click", () => {
  addPrescription = !addPrescription;
  if (addPrescription) {
    prescriptionFormContainer.style.display = "block";
  } else {
    prescriptionFormContainer.style.display = "none";
  }

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
  allPrescriptions.push(prescriptions);
}

for (const element of allPrescriptions) {
  console.log(allPrescriptions);
}
// Missed medications alert
// console.log(parseInt(new Date().toLocaleTimeString()));

if (3 > 2) {
  for (const aPrescription in allPrescriptions) {
    console.log(aPrescription)
  }
}

if (
  allPrescriptions.filter(
    (prescription) =>
    parseInt(prescription.time_to_take) <
    parseInt(new Date().toLocaleHoureString())
  )
) {
  const headerInnerDiv = document.createElement("div");

  headerInnerDiv.innerHTML = `
      <div class="uk-card-header">
        <h3 class="uk-card-title" style="color: red;">Missed Medications</h3>
      </div>
      <div class="list-of-missed-medication uk-card-body">
        <h4>
          <ul id="missed-medication-ul" class="uk-list uk-list-striped"></ul>
        </h4>
      </div>`;
  divMissedMed.append(headerInnerDiv);

  const missedUl = document.querySelector("ul#missed-medication-ul");
  const missedLi = document.createElement("li");
  missedLi.innerText = element
  missedUl.append(missedLi);
}
// }

// missedPrescription();

function dipslayPrescription(prescription) {
  const medLi = document.createElement("li");
  medUl.append(medLi);

  const medNamDiv = document.createElement("div");
  const medNameP = document.createElement("strong");
  const medStrengthSpan = document.createElement("span");
  const medTimeSpan = document.createElement("span");
  medTimeSpan.className = "med-time";

  // console.log(prescription);

  medNameP.innerText = prescription.medication.name + " ";
  medStrengthSpan.innerText = prescription.medication.strength + " ";
  medTimeSpan.innerText = prescription.time_to_take;

  const btnDiv = document.createElement("div");
  btnDiv.className = "list-item-menu";

  // bell, delete and edit icons
  const checkTag = document.createElement("a");
  checkTag.innerHTML = `<a class="check-button" uk-icon="icon: bell; ratio: 2"></a>`;

  checkTag.addEventListener("click", () => {
    const medTakenUl = document.querySelector("ul.taken-medication");
    const medTakenLi = document.createElement("li");

    medTakenUl.append(medTakenLi);

    medLi.innerText = "";
    // console.log(prescription.medication.name);
    medTakenLi.innerText = prescription.medication.name;
  });

  const editATag = document.createElement("a");
  editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-tooltip="Edit prescription"></a>`;

  const deleteATag = document.createElement("a");
  deleteATag.innerHTML = `<a class="delete-button" uk-icon="icon: trash" uk-tooltip="Delete prescription"></a>`;

  medNamDiv.append(medNameP, medStrengthSpan, medTimeSpan, breakTag);
  medLi.append(medNamDiv, checkTag, editATag, deleteATag);

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

// console.log(new Date().toLocaleTimeString());