/*
  exercises.js — Session 9 Lab, Part 2
  Web Application Programming (G247) · CUNEF Escuela Politécnica Superior

  Loaded from both index.html and login.html:
    <script src="exercises.js" defer></script>

  No DOM access here — everything is observed through the console.
  DOM manipulation is covered in Sessions 10-11.
*/

// ---------------------------------------------------------------------
// fizzBuzz — print 1..n. Multiples of 3 become "Fizz",
// multiples of 5 become "Buzz", multiples of both become "FizzBuzz".
// ---------------------------------------------------------------------
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

// ---------------------------------------------------------------------
// findMax — return the largest value in the array. No Math.max.
// Return undefined for an empty array.
// ---------------------------------------------------------------------
function findMax(numbers) {
  if (numbers.length === 0) {
    return undefined;
  }
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// ---------------------------------------------------------------------
// isPalindrome — ignore case, spaces, and punctuation.
// Refactored as an arrow function (satisfies the "at least one arrow"
// requirement for this part).
// ---------------------------------------------------------------------
const isPalindrome = (str) => {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = normalized.split("").reverse().join("");
  return normalized === reversed;
};

// =====================================================================
// TESTS — fizzBuzz(15) prints its own output; the asserts below stay
// silent on success.
// =====================================================================
fizzBuzz(15);

console.assert(findMax([3, 7, 2, 9, 1]) === 9, "findMax basic");
console.assert(findMax([-5, -2, -9]) === -2, "findMax negatives");
console.assert(findMax([]) === undefined, "findMax empty");

console.assert(isPalindrome("racecar") === true, "isPalindrome basic");
console.assert(isPalindrome("A man, a plan, a canal: Panama") === true, "isPalindrome punctuation");
console.assert(isPalindrome("hello") === false, "isPalindrome false case");

// ---------------------------------------------------------------------
// Real data from the site's own topic (Cool Era clothing shop): prices
// (in euros) of a few featured catalog items. Run findMax on it, as
// required.
// ---------------------------------------------------------------------
const coolEraPrices = [24.99, 39.5, 18.0, 45.0, 32.75];
console.log("Precio más alto del catálogo destacado:", findMax(coolEraPrices));

// =====================================================================
// Login form validation — pure functions, no DOM access.
// =====================================================================

// Basic email shape validation. Return true or false.
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// At least 8 characters, one letter, and one digit.
function validatePassword(password) {
  const longEnough = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  return longEnough && hasLetter && hasDigit;
}

// Return { valid: true, errors: [] } or
// { valid: false, errors: ["...", "..."] }.
function validateLoginForm(email, password) {
  const errors = [];

  if (!validateEmail(email)) {
    errors.push("Email address is not valid.");
  }
  if (!validatePassword(password)) {
    errors.push("Password must be at least 8 characters and include a letter and a digit.");
  }

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}

// =====================================================================
// TESTS — silent console means every assertion passed.
// =====================================================================
console.assert(validateEmail("fan@riverside.fc") === true, "email valid");
console.assert(validateEmail("fan@riversidefc") === false, "email needs a dot");
console.assert(validateEmail("fanriverside.fc") === false, "email needs an @");

console.assert(validatePassword("Season2026") === true, "password ok");
console.assert(validatePassword("short1") === false, "password too short");
console.assert(validatePassword("allletters") === false, "password needs a digit");

console.assert(validateLoginForm("fan@riverside.fc", "Season2026").valid === true, "form valid");
console.assert(validateLoginForm("nope", "x").errors.length === 2, "form reports both errors");
