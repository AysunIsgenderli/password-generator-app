"use strict";
const generatePassword = document.getElementById("generatePassword");
const copyPassword = document.getElementById("copy");
const newPassword = document.getElementById("newPassword");
const passwordLength = document.getElementById("lengthContainer");
const symbolInput = document.getElementById("symbols");
const numberInput = document.getElementById("numberInput");
const lowerInput = document.getElementById("lowerInput");
const upperInput = document.getElementById("upperInput");
const autoSelect = document.getElementById("auto-select");

const characters = {
  specialCharacters: ["@", "#", "$", "%"],
  numbers: ["1", "2", "3", "4"],
  lowercase: ["a", "b", "c", "d"],
  uppercase: ["A", "B", "C", "D"],
};

function getPassword() {
  let demo = document.getElementById("lengthContainer").children[0];
  let weakPassword = document.createElement("optgroup");
  weakPassword.setAttribute("label", "some value");
  weakPassword.label = "Weak";
  for (let i = 6; i <= 15; i++) {
    weakPassword.appendChild(new Option(i));
  }
  let strongPassword = document.createElement("optgroup");
  strongPassword.setAttribute("label", "some value");
  strongPassword.label = "Strong";
  for (let i = 16; i <= 127; i++) {
    strongPassword.appendChild(new Option(i));
  }

  let unbelievablePassword = document.createElement("optgroup");
  unbelievablePassword.setAttribute("label", "some value");
  unbelievablePassword.label = "Unbelievable";

  // for(let i = 256; i<=2048; i++){
  //     unbelievablePassword.appendChild(new Option(total))
  // }

  demo.appendChild(weakPassword);
  demo.appendChild(strongPassword);
  //   demo.appendChild(unbelievablePassword)
}
getPassword();

function generateRandom({
  length,
  uppercase,
  lowercase,
  specialCharacter,
  numbers,
}) {
  let generatedPassword = "";
  const specialCharacterCodes = {
    uppercase: "uppercase",
    lowercase: "lowercase",
    specialCharacters: "specialCharacters",
    numbers: "numbers",
  };
  let usableCharacters = [];
  if (uppercase) {
    usableCharacters.push(specialCharacterCodes.uppercase);
  }
  if (lowercase) {
    usableCharacters.push(specialCharacterCodes.lowercase);
  }
  if (specialCharacter) {
    usableCharacters.push(specialCharacterCodes.specialCharacters);
  }
  if (numbers) {
    usableCharacters.push(specialCharacterCodes.numbers);
  }

  if (!usableCharacters.length) return "";

  for (let i = 0; i < length; i++) {
    // usableCharacters = ['specialCharacters', 'numbers']
    const randomCodeIndex = Math.floor(Math.random() * usableCharacters.length);
    // randomCodeIndex = 1

    const selectedUsableCharacters = usableCharacters[randomCodeIndex];
    // selectedUsableCharacters = 'numbers'
    const randomCharacterIndex = Math.floor(
      Math.random() * characters[selectedUsableCharacters].length
    );
    // randomCharacterIndex = 3
    // characters.numbers[3]  characters[selectedUsableCharacters]
    const pickOne = characters[selectedUsableCharacters][randomCharacterIndex];
    generatedPassword += pickOne;
  }

  return generatedPassword;
}

generatePassword.addEventListener("click", function () {
  const passwordLength = +document.getElementById("passwordLength").value;
  newPassword.removeAttribute("readonly");
  generatePassword.style.backgroundColor = "rgb(21, 176, 21)";
  newPassword.value = generateRandom({
    length: passwordLength,
    numbers: numberInput.checked,
    lowercase: lowerInput.checked,
    specialCharacter: symbolInput.checked,
    uppercase: upperInput.checked,
  });
});
copyPassword.addEventListener('click', function(){
  copyPassword.style.backgroundColor = 'yellow'
})
function autoSelectHandler() {
  if (autoSelect.checked) {
    newPassword.removeAttribute("readonly");
  } else {
    newPassword.setAttribute("readonly", true);
  }
}

const copyContent = () => {
  newPassword.select();
  navigator.clipboard.writeText(newPassword.value);
};

