// Display today's date
const todayDateTag = document.getElementById("spanDate");
todayDateTag.innerHTML = new Date().toLocaleDateString();

const divMissedMed = document.querySelector("div.missed-medications");
const url = "http://localhost:3000/api/v1/prescriptions/";

const addBtn = document.querySelector("a.add-button");
const prescriptionFormContainer = document.getElementById(
  "prescription-form-container"
);
// const editPrescriptionForm = document.querySelector("#edit-prescription-container");
const editPrescriptionForm = document.querySelector(
  "form#edit-prescription-form"
);

//create hidden Id field for the form
let hiddenId = document.createElement("input");
hiddenId.setAttribute("type", "hidden");
hiddenId.setAttribute("name", "prescriptionId");
editPrescriptionForm.append(hiddenId);

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

  // POST - add new prescription

  prescriptionFormContainer.addEventListener("submit", () => {
    event.preventDefault;

    let medication_name = event.target[0].value;
    let medication_strength = event.target[1].value;
    let medication_imprint = event.target[2].value;
    let medication_precaution = event.target[3].value;
    let medication_category = event.target[4].value;
    let medication_image = event.target[5].value;
    let frequency = event.target[6].value;
    let dose = event.target[7].value;
    let time_to_take = event.target[8].value;

    configObj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        medication_name,
        medication_strength,
        medication_imprint,
        medication_precaution,
        medication_category,
        medication_image,
        frequency,
        dose,
        time_to_take,
      }),
    };
    fetch(url, configObj)
      .then((resp) => resp.json())
      .then((newPrescription) => displayPrescription(newPrescription));

    prescriptionFormContainer.reset();
  });
});

fetchData();

function fetchData() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => renderAllPrescriptions(data));
}

function renderAllPrescriptions(prescriptions) {
  for (const prescription of prescriptions) {
    displayPrescription(prescription);
  }
}

// Missed medications alert
if (3 > 2) {
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
  missedLi.innerText = "Missed med1";
  missedUl.append(missedLi);
}

function displayPrescription(prescription) {
  const medLi = document.createElement("li");
  medUl.append(medLi);

  const medNamDiv = document.createElement("div");
  const medNameP = document.createElement("strong");
  const medStrengthSpan = document.createElement("span");
  const medTimeSpan = document.createElement("span");
  medTimeSpan.className = "med-time";

  // condition to show the prescription on "Medications to be taken on" or "Medication taken" side

  if (prescription.prescription_taken === false) {
    medNameP.innerText = prescription.medication_name + " ";
    medStrengthSpan.innerText = prescription.medication_strength + " ";
    medTimeSpan.innerText = prescription.time_to_take;

    // bell, delete and edit icons
    const checkTag = document.createElement("a");
    checkTag.innerHTML = `<a class="check-button" uk-icon="icon: bell; ratio: 2"></a>`;
    checkTag.addEventListener("click", () => {
      medLi.innerHTML = "";
      fetch(`${url}${prescription.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          prescription_taken: true,
        }),
      })
        .then((response) => response.json())
        .then((prescription) => displayPrescription(prescription));
    });

    const editATag = document.createElement("a");
    editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-tooltip="Edit prescription" uk-toggle="target: #edit-prescription-container"></a>`;
    // editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-tooltip="Edit prescription"></a>`;

    //click on edit button to populate form
    editATag.addEventListener("click", () => {
      editPrescriptionForm.children[0].value = prescription.frequency;
      editPrescriptionForm.children[1].value = prescription.dose;
      editPrescriptionForm.children[2].value = prescription.time_to_take;
      hiddenId = prescription.id;
      // debugger;

      // edit prescription
      document.querySelector("input.frequency").value = prescription.frequency;
      document.querySelector("input.dose").value = prescription.dose;

      editPrescriptionForm.addEventListener("submit", () => {
        // event.preventDefault();

        let med_frequency = event.target[0].value;
        let med_dose = event.target[1].value;
        let med_time_to_take = event.target[2].value;

        configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            frequency: med_frequency,
            dose: med_dose,
            time_to_take: med_time_to_take,
          }),
        };

        fetch(url + prescription.id, configObj)
          .then((resp) => resp.json())
          .then((updatedPrescription) =>
            displayPrescription(updatedPrescription)
          );
        editPrescriptionForm.reset();
      });
    });

    // Delete prescription
    const deleteATag = document.createElement("a");
    deleteATag.innerHTML = `<a class="delete-button" uk-icon="icon: trash" uk-tooltip="Delete prescription"></a>`;

    deleteATag.addEventListener("click", () => {
      fetch(url + prescription.id, {
        method: "DELETE",
      });
      medLi.innerText = "";
    });

    medNamDiv.append(medNameP, medStrengthSpan, medTimeSpan, breakTag);
    medLi.append(medNamDiv, checkTag, editATag, deleteATag);

    //-------------- end of if medication_taken === false
  } else {
    const medTakenUl = document.querySelector("ul.taken-medication");
    const medTakenLi = document.createElement("li");

    medTakenUl.append(medTakenLi);
    medTakenLi.innerText = prescription.medication_name;
  } //------------- end of if medication_taken === true

  //---- send all prescriptions to "Medications to be taken on" -----//

  const containerDiv = document.createElement("div");
  medDetailDiv.append(containerDiv);

  medNamDiv.addEventListener("click", () => {
    containerDiv.innerHTML = "";

    const polaroidDiv = document.createElement("div");
    polaroidDiv.className = "polaroid";

    containerDiv.append(polaroidDiv);
    // polaroidDiv.innerHTML = "";

    const medNameTag = document.createElement("h2");
    const medImprintTag = document.createElement("h2");
    const medImage = document.createElement("img");
    medImage.className = "medication-image";
    const medPrecauTag = document.createElement("h2");

    medNameTag.innerText =
      prescription.medication_name + " " + prescription.medication_strength;
    medImprintTag.innerText = prescription.medication_imprint;

    medImage.src = prescription.medication_image;
    medPrecauTag.innerText = prescription.medication_precaution;

    polaroidDiv.append(medImage, medImprintTag, medNameTag, medPrecauTag);
    // containerDiv.append(medNameTag, medImprintTag, medImage, medPrecauTag);
  });
}

const medReset = document.querySelector("a.reset-button");

medReset.addEventListener("click", () => {
  medUl.innerHTML = "";
  const medTakenUl = document.querySelector("ul.taken-medication");
  medTakenUl.innerHTML = "";
  fetch(url)
    .then((response) => response.json())
    .then((prescriptions) => updatePrescriptionTaken(prescriptions));
});

function updatePrescriptionTaken(prescriptions) {
  prescriptions.forEach((prescription) => makeFalse(prescription));
}

//--------- change "prescription_taken" to "false" --------------------//
function makeFalse(prescription) {
  setTimeout(function () {
    // add delay in loop
    fetch(`${url}${prescription.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        prescription_taken: false,
      }),
    })
      .then((response) => response.json())
      .then((prescription) => displayPrescription(prescription));
  }, 100 * prescription.id);
}

// // edit prescription

// editPrescriptionForm.addEventListener("submit", () => {
//   // document.querySelector("input.frequency").value = prescription.frequency;
//   // document.querySelector("input.dose").value = prescription.dose;
//   // debugger;
//   event.preventDefault();

//   let med_frequency = event.target[0].value;
//   let med_dose = event.target[1].value;
//   let med_time_to_take = event.target[2].value;

//   configObj = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       frequency: med_frequency,
//       dose: med_dose,
//       time_to_take: med_time_to_take,
//     }),
//   };

//   setTimeout(function () {
//     // add delay in loop
//     fetch(url + hiddenId.value, configObj)
//       .then((resp) => resp.json())
//       .then((data) => console.log(data));
//   }, 100 * hiddenId.value);
// });
