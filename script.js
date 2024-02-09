//* CALORIE COUNTER ELEMENT
const calorieCounter = document.getElementById("calorie-counter");
//* BUDGET ELEMENT
const budgetNumberInput = document.getElementById("budget");
//*ENTRY DROPDOWN ELEMENT
const entryDropdown = document.getElementById("entry-dropdown");
//* ADD ENTRY
const addEntryButton = document.getElementById("add-entry");
//*CLEAR ELEMENT
const clearButton = document.getElementById("clear");
//*OUTPUT ELEMENT
const output = document.getElementById("output");
//*IS ERROR
let isError = false;

//* CLEAR INPUT STRING

//!This code defines a function called cleanInputString that
//!removes all plus, minus, and space characters from the input string.
//!
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}
//!This code snippet defines a function called isInvalidInput that takes a string str as an argument. It uses a regular expression to check if the input string contains a number in scientific
//!notation (e.g., 1e10) and returns a match if it finds one.
//!
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

//! This code defines a function addEntry that dynamically generates HTML input fields based on the value of entryDropdown.
//!It finds the target input container, calculates the current entry number, and then constructs and appends HTML input fields for the entry name and calories to the target input container.
//!It uses the insertAdjacentHTML method to add the HTML string to the target input container without replacing the existing content.
function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1; //! DODA ŠTEVILKO 1 NA => ENTRY 1 NAME
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString); //!The insertAdjacentHtml method takes two arguments.
  //!The first argument is a string that specifies the position of the inserted element. The second argument is a string containing the HTML to be inserted.
  //!PRENESE HTMLSTRING NAPREJ OD TRENUTNEGA ENTRYA, DA SE TRENUTNO ENTRY NE IZBRIŠE
}

//! This JavaScript function calculates the user's calorie intake and expenditure based on input
//! from different meal and exercise forms on a webpage. It then updates the UI with the remaining budgeted calories and the surplus/deficit.
function calculateCalories(e) {
  e.preventDefault();
  isError = false;
  //*This will return any number inputs that are in the #breakfast element.
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );
  let breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  let lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  let dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  let snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  let exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  let budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  if (isError) {
    return;
  }

  consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  let surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>`;
  output.classList.remove("hide");
}

//!
//!This code defines a function that calculates the total calories from a list of input values. It iterates through the list, cleans each input,
//!checks for invalid inputs,
//! and adds up the numeric values to calculate the total calories. If it encounters an invalid input, it displays an alert and returns null.
function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    //*Calls a function cleanInputString() with the value of the current item. This
    //*function is expected to clean up the input string, presumably removing any extraneous characters or whitespace.
    let invalidInputMatch = isInvalidInput(currVal);
    //*This function checks if the input is valid.
    //*If the input is invalid, it returns a match (in this case, possibly an array with the invalid part of the input).
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories; //*After looping through all items in the list, the function returns the total sum of calories calculated.
}
function clearForm() {
  let inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );
  for (const container of inputContainers) {
    container.innerHTML = ""; //!This will clear all of the contents of that input container.
  }
  budgetNumberInput.value = "";
  output.innerText = ""; //!innerText will not render HTML elements, but will display the tags and content as raw text.
  output.classList.add("hide");
}

//!ADD ENTRY BUTTON
//!
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
