
const password = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const toast = document.getElementById("toast");
const hint = document.getElementById("hint");

let toastTimer;

function randomIndex(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function generatePassword() {
    const length = 16;

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%&*?_-+";

    let allChars = lowerChars;
    let groups = [lowerChars];

    if (uppercase.checked) {
        allChars += upperChars;
        groups.push(upperChars);
    }

    if (numbers.checked) {
        allChars += numberChars;
        groups.push(numberChars);
    }

    if (symbols.checked) {
        allChars += symbolChars;
        groups.push(symbolChars);
    }

    let result = [];

    groups.forEach(function (group) {
        result.push(group[randomIndex(group.length)]);
    });

    while (result.length < length) {
        result.push(allChars[randomIndex(allChars.length)]);
    }

    // Password characters ko shuffle karna
    for (let i = result.length - 1; i > 0; i--) {
        const j = randomIndex(i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }

    password.value = result.join("");
    hint.textContent = "Your new password is ready!";
}

function showToast() {
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

async function copyPassword() {
    if (!password.value) {
        hint.textContent = "Please generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(password.value);
    } catch (error) {
        password.select();
        const copied = document.execCommand("copy");

        if (!copied) {
            hint.textContent = "Please copy the password manually.";
            return;
        }
    }

    showToast();
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

// Page open hote hi password generate hoga
generatePassword();
