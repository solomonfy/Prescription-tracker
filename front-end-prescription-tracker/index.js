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

fetchData();

function fetchData() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => renderAllPrescriptions(data));
}


function renderAllPrescriptions(prescriptions) {
  for (const prescription of prescriptions) {
    dipslayPrescription(prescription);
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
  missedLi.innerText = "Missed med1"
  missedUl.append(missedLi);
}

function dipslayPrescription(prescription) {
  const medLi = document.createElement("li");
  medUl.append(medLi);

  const medNamDiv = document.createElement("div");
  const medNameP = document.createElement("strong");
  const medStrengthSpan = document.createElement("span");
  const medTimeSpan = document.createElement("span");
  medTimeSpan.className = "med-time";

  // condition to show the prescription on "Medications to be taken on" or "Medication taken" side

  if (prescription.prescription_taken === false) {
    
    medNameP.innerText = prescription.medication.name + " ";
    medStrengthSpan.innerText = prescription.medication.strength + " ";
    medTimeSpan.innerText = prescription.time_to_take;
    
    const btnDiv = document.createElement("div");
    btnDiv.className = "list-item-menu";
    
    // bell, delete and edit icons
    const checkTag = document.createElement("a");
    checkTag.innerHTML = `<a class="check-button" uk-icon="icon: bell; ratio: 2"></a>`;
      checkTag.addEventListener("click", () => {
        medLi.innerHTML = "";
        fetch(`${url}${prescription.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            prescription_taken: true
          })
        })
        .then((response => response.json()))
        .then((prescription) => dipslayPrescription(prescription))
      })
 
    const editATag = document.createElement("a");
    editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-tooltip="Edit prescription"></a>`;
    
    const deleteATag = document.createElement("a");
    deleteATag.innerHTML = `<a class="delete-button" uk-icon="icon: trash" uk-tooltip="Delete prescription"></a>`;
    
    medNamDiv.append(medNameP, medStrengthSpan, medTimeSpan, breakTag);
    medLi.append(medNamDiv, checkTag, editATag, deleteATag);

    
    //-------------- end of if medication_taken === false

  } else {

    const medTakenUl = document.querySelector("ul.taken-medication");
    const medTakenLi = document.createElement("li");
            
    medTakenUl.append(medTakenLi);
    medTakenLi.innerText = prescription.medication.name;

  }  //------------- end of if medication_taken === true

     //---- send all prescriptions to "Medications to be taken on" -----//
     
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

const medReset = document.querySelector("a.reset-button");

medReset.addEventListener("click", () => {
  medUl.innerHTML = "";
  const medTakenUl = document.querySelector("ul.taken-medication");
  medTakenUl.innerHTML = "";
  fetch(url)
    .then((response) => response.json())
    .then((prescriptions) => updatePrescriptionTaken(prescriptions))
})
  
  
function updatePrescriptionTaken(prescriptions) {
  prescriptions.forEach(prescription => makeFalse(prescription)) 
}


//--------- change "prescription_taken" to "false" --------------------//
function makeFalse(prescription) {
  setTimeout(function() {                  // add delay in loop
    fetch(`${url}${prescription.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        prescription_taken: false
      })
    })
      .then((response) => response.json())
      .then((prescription) => dipslayPrescription(prescription))
  }, 100 * prescription.id);
};



// console.log(new Date().toLocaleTimeString());