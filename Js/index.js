function capitalizeFirstLetter(event) {
  let input = event.target;
  let value = input.value;
  if (value.length === 1) {
    input.value = value.charAt(0).toUpperCase();
  } else {
    input.value = value.charAt(0).toUpperCase() + value.slice(1);
  }
}

const nameInput = () => {
  const name = document.getElementById("name").value;
  const errorMessage = document.getElementById("error-message");

  if (!name.match(/^[A-Za-z]+$/)) {
    errorMessage.innerText = "Please enter a valid name";
    return false;
  } else {
    errorMessage.innerText = "";
    return true;
  }
};

const phoneInput = () => {
  const phone = document.getElementById("phone");
  const errorSms = document.getElementById("error-sms");

  if (!phone.value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)) {
    errorSms.innerText = "Please enter a valid number";
    return false;
  } else {
    errorSms.innerText = "";
    return true;
  }
};

const emailInput = () => {
  const email = document.getElementById("email");
  const errorMsg = document.getElementById("error-msg");

  if (!email.value.match(/^[\w.+\-]+@gmail\.com$/)) {
    errorMsg.innerText = "Please enter a valid email";
    return false;
  } else {
    errorMsg.innerText = "";
    return true;
  }
};

const saveInformation = () => {
  if (
    nameInput() !== false &&
    phoneInput() !== false &&
    emailInput() !== false
  ) {
    //? get timestamp
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const Hour = today.getHours();
    const min = today.getMinutes();

    //? get element and create
    const table = document.getElementById("table");
    const NameInput = document.getElementById("name").value;
    const PhoneInput = document.getElementById("phone").value;
    const EmailInput = document.getElementById("email").value;
    const tr = document.createElement("tr");
    tr.style.backgroundColor = "rgb(231, 231, 231)";
    tr.classList = "table-secondary";

    //? create tr
    const No = tr.appendChild(document.createElement("td"));
    const td1 = tr.appendChild(document.createElement("td"));
    const td2 = tr.appendChild(document.createElement("td"));
    const td3 = tr.appendChild(document.createElement("td"));
    const Today = tr.appendChild(document.createElement("td"));
    //? create btn edit
    const td4 = tr.appendChild(document.createElement("button"));
    //? create btn delete
    const td5 = tr.appendChild(document.createElement("button"));

    //? add class name
    No.classList = "text-start ps-2";
    td1.classList = "text-start ps-2";
    td2.classList = "text-start ps-2";
    td3.classList = "text-start ps-2";
    Today.classList = "text-start ps-2";
    //? add btn class name --Edit--
    td4.classList = "btn btn-success";
    td4.style.marginRight = "6px";
    td4.style.marginBlock = "10px";
    //? add btn class name --delete--
    td5.classList = "btn btn-danger";

    //? output data from user
    No.textContent = table.rows.length;
    td1.innerText = NameInput;
    td2.innerText = PhoneInput;
    td3.innerText = EmailInput;
    Today.innerText = `${year}/${month}/${date} ${Hour}:${min}`;
    td4.textContent = "Edit";
    td5.textContent = "Delete";
    table.appendChild(tr);

    td5.onclick = DeleteBtn;
    td4.onclick = editInformation;
  }
  //? clear form
  {
    if (nameInput() !== true) {
      document.querySelector("#name").value = "";
    }
    if (phoneInput() !== true) {
      document.querySelector("#phone").value = "";
    }
    if (nameInput() !== true && phoneInput() !== true) {
      document.querySelector("#name").value = "";
      document.querySelector("#phone").value = "";
    }
    if (
      nameInput() !== true &&
      phoneInput() !== true &&
      emailInput() !== true
    ) {
      document.querySelector("#name").value = "";
      document.querySelector("#phone").value = "";
    }
    if (
      nameInput() !== false &&
      phoneInput() !== false &&
      emailInput() !== false
    ) {
      document.querySelector("#name").value = "";
      document.querySelector("#phone").value = "";
      document.querySelector("#email").value = "";
    }
  }
};

function editInformation() {
  let row = this.parentNode;
  updateInputs(row);
}

function updateInputs(row) {
  let nameValue = row.cells[1].innerText;
  let phoneValue = row.cells[2].innerText;
  let emailValue = row.cells[3].innerText;

  document.getElementById("name").value = nameValue;
  document.getElementById("phone").value = phoneValue;
  document.getElementById("email").value = emailValue;

  let saveButton = document.getElementById("save");

  // Temporarily store the original onclick handler
  const originalSaveHandler = saveButton.onclick;

  saveButton.onclick = function () {
    const isNameValid = nameInput();
    const isPhoneValid = phoneInput();
    const isEmailValid = emailInput();

    if (isNameValid && isPhoneValid && isEmailValid) {
      row.cells[1].innerText = document.getElementById("name").value;
      row.cells[2].innerText = document.getElementById("phone").value;
      row.cells[3].innerText = document.getElementById("email").value;

      // Clear error messages
      document.getElementById("error-message").innerText = "";
      document.getElementById("error-sms").innerText = "";
      document.getElementById("error-msg").innerText = "";

      document.getElementById("name").classList.remove("error-input");
      document.getElementById("phone").classList.remove("error-input");
      document.getElementById("email").classList.remove("error-input");

      // Clear form inputs
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";

      // Restore the original onclick handler after saving
      saveButton.onclick = originalSaveHandler;
    }
  };
}
function DeleteBtn() {
  const td5 = this;
  const removeTr = td5.parentElement;
  removeTr.remove();
}
