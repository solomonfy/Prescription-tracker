// var months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// var today = new Date();
// today.setTime(today.getTime());
// todayDateTag.innerHTML =
// months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();

// Display today's date
const todayDateTag = document.getElementById("spanDate");
todayDateTag.innerHTML = new Date().toLocaleDateString();

// Missed medications alert
const divMissedMed = document.querySelector("div.missed-medications");

if (7 > 3) {
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
  missedLi.innerText = "Missed med 1";
  missedUl.append(missedLi);
}

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
  const medLi = document.createElement("li");
  medUl.append(medLi);

  const medNamDiv = document.createElement("div");
  const medNameP = document.createElement("strong");
  const medStrengthSpan = document.createElement("span");
  const medTimeSpan = document.createElement("span");
  medTimeSpan.className = "med-time";

  console.log(prescription);

  medNameP.innerText = prescription.medication.name + " ";
  medStrengthSpan.innerText = prescription.medication.strength + " ";
  // medTimeSpan.innerText = "2 PM";
  medTimeSpan.innerText = prescription.time_to_take;
  // medTimeSpan.innerText = prescription.time_to_take.toLocaleTimeString();

  const btnDiv = document.createElement("div");
  btnDiv.className = "list-item-menu";

  // check, delete and edit icons
  const checkATag = document.createElement("a");
  checkATag.innerHTML = `<a class="check-button" uk-icon="icon: bell; ratio: 2"></a>`;

  checkATag.addEventListener("click", () => {
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

console.log(new Date().toLocaleTimeString());
