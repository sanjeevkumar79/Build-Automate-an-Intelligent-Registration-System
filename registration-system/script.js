const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");
const topError = document.getElementById("topError");
const successMsg = document.getElementById("successMsg");

const disposableEmails = ["tempmail.com", "mailinator.com"];

const states = {
    India: ["Telangana", "Karnataka"],
    USA: ["Texas", "California"]
};

const cities = {
    Telangana: ["Hyderabad", "Warangal"],
    Karnataka: ["Bangalore", "Mysore"],
    Texas: ["Austin", "Dallas"],
    California: ["LA", "San Diego"]
};


document.getElementById("country").addEventListener("change", function () {
    const state = document.getElementById("state");
    const city = document.getElementById("city");

    state.innerHTML = "<option value=''>Select State</option>";
    city.innerHTML = "<option value=''>Select City</option>";

    states[this.value]?.forEach(s => {
        state.innerHTML += `<option>${s}</option>`;
    });
});

document.getElementById("state").addEventListener("change", function () {
    const city = document.getElementById("city");
    city.innerHTML = "<option value=''>Select City</option>";

    cities[this.value]?.forEach(c => {
        city.innerHTML += `<option>${c}</option>`;
    });
});


document.getElementById("password").addEventListener("input", function () {
    const strength = document.getElementById("strength");
    const val = this.value;

    if (!val) {
        strength.innerText = "";
        return;
    }

    if (val.length < 6) {
        strength.innerText = "Weak";
        strength.style.color = "red";
    } else if (/[A-Z]/.test(val) && /[0-9]/.test(val)) {
        strength.innerText = "Strong";
        strength.style.color = "green";
    } else {
        strength.innerText = "Medium";
        strength.style.color = "orange";
    }
});


form.addEventListener("input", validateForm);

function validateForm() {
    let valid = true;
    topError.innerText = "";

    function showError(el, msg) {
        el.classList.add("error");
        el.nextElementSibling.innerText = msg;
        valid = false;
    }

    function clearError(el) {
        el.classList.remove("error");
        el.nextElementSibling.innerText = "";
    }


    const fname = document.getElementById("fname");
    fname.value ? clearError(fname) : showError(fname, "First Name required");


    const lname = document.getElementById("lname");
    lname.value ? clearError(lname) : showError(lname, "Last Name required");


    const email = document.getElementById("email");
    if (!email.value || disposableEmails.some(d => email.value.includes(d))) {
        showError(email, "Invalid email");
    } else {
        clearError(email);
    }


    const phone = document.getElementById("phone");
    phone.value ? clearError(phone) : showError(phone, "Phone number required");


    const gender = document.querySelector("input[name='gender']:checked");
    const genderError = document.getElementById("genderError");
    if (!gender) {
        genderError.innerText = "Please select gender";
        valid = false;
    } else {
        genderError.innerText = "";
    }


    const pwd = document.getElementById("password");
    const cpwd = document.getElementById("confirmPassword");

    if (!pwd.value || !cpwd.value) {
        showError(cpwd, "Password confirmation required");
    } else if (pwd.value !== cpwd.value) {
        showError(cpwd, "Passwords must match");
    } else {
        clearError(cpwd);
    }


    const terms = document.getElementById("terms");
    const termsError = document.getElementById("termsError");
    if (!terms.checked) {
        termsError.innerText = "Accept Terms & Conditions";
        valid = false;
    } else {
        termsError.innerText = "";
    }

    if (!valid) {
        topError.innerText = "❌ Please fix the highlighted errors";
    }

    submitBtn.disabled = !valid;
}


form.addEventListener("submit", function (e) {
    e.preventDefault();

    successMsg.innerText =
        "✅ Registration Successful! Your profile has been submitted successfully.";

    form.reset();
    document.getElementById("strength").innerText = "";
    submitBtn.disabled = true;
});