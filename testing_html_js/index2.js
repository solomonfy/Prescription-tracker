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
        console.log(prescription.id);
    }
}

function dipslayPrescription(prescription) {

    const medLi = document.createElement("li");
    medUl.append(medLi);

    const checkATag = document.createElement("a");
    checkATag.innerHTML = `<a class="check-button" uk-icon="icon: check; ratio: 1.5"></a>`;

    checkATag.addEventListener("click", () => {
        console.log("Clicked");
    });


    const medNamDiv = document.createElement('div')
    const medNameP = document.createElement('strong')
    const medStrengthSpan = document.createElement('span')
    const medTimeSpan = document.createElement('span')

    // medNameP.innerText = prescription.medication.name + " " + prescription.medication.strength;
    medNameP.innerText = prescription.medication.name + " "
    medStrengthSpan.innerText = prescription.medication.strength;
    medTimeSpan.innerText = "2 PM"

    const btnDiv = document.createElement("div");
    btnDiv.className = "list-item-menu";

    const btnUl = document.createElement("ul");
    btnUl.className = "uk-iconnav";

    // check, delete and edit icons
    const checkATag = document.createElement("a");
    checkATag.innerHTML = `<a class="check-button" uk-icon="icon: check; ratio: 1.5"></a>`;

    checkATag.addEventListener("click", () => {
        console.log("Clicked");
    });

    const editATag = document.createElement("a");
    editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil"></a>`;
    //   editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>`;

    const deleteATag = document.createElement("a");
    deleteATag.innerHTML = `<a class="delete-button" uk-icon="icon: trash"></a>`;

    btnUl.append(checkATag, editATag, deleteATag);
    medLi.append(btnUl);


    medNamDiv.append(medNameP, medStrengthSpan, medTimeSpan)

    medLi.append(checkATag, medNamDiv)

}