// Function for changing the colors of the circles when a new radio is selected.
// "id" is the id of the circle who's color needs to be changed.
// "code" is the color that the circle will be changed to, in the form of an integer.
function change_color(id, code) {

	// Grab the class list for element "id" for later processing
	const ELEMENT_CLASS_LIST = document.getElementById(id).classList
	
	// If code is not 0, then change_color() should disable the selection for the same color in the other radios.
	if (code != 0){

		// Loop through the other radios:
		for (let i = 1; i < 6; i++) {
			
			// If "id" is different from the current iteration, disable this iteration's radio for the color "code"
			if (id != `circle${i}`){
				document.getElementById(`color${i}-${code}`).disabled = true;
			}
		}
	}

	// Reenable the radios for the old colors
	for (let i = 1; i < 6; i++) {
		if (ELEMENT_CLASS_LIST.contains(`colorcode${i}`)){
			for (let j = 1; j < 6; j++) {
				document.getElementById(`color${j}-${i}`).disabled = false;
			}
		}
	}

	// Change the color of the button by removing the old color class and adding in the new one.
	for (let i = 0; i < 6; i++) {
		ELEMENT_CLASS_LIST.remove(`colorcode${i}`)
	}
	ELEMENT_CLASS_LIST.add(`colorcode${code}`)
}


// Function for computing how correct the submitted guess is
function compute_submission(){

	// Visually add the guess to the list of past guesses so players can make informed future guesses.
	insert_past_guess()

	// Disable the submission button and start the timer on it.
	countdown()

	// Reset the selections
	for (let i = 1; i < 6; i++) {
		document.getElementById(`color${i}-${0}`).checked = true
		change_color(`circle${i}`, 0)
	}
}


// Function for inserting the submitted guess to the list of past guesses.
function insert_past_guess(){
	
	// The list of past guesses will consist of a bootstrap row containing 6 columns.
	// In the first five columns will be a small circle colored in the order of color_list.
	// Start by creating the bootstrap row all the columns will go into:
	const ROW = document.createElement("li")
	ROW.classList.add("row", "justify-content-center", "align-items-center")

	// Loop five times to add the five columns:
	for (let i = 1; i < 6; i++) {

		// Create the column and add its bootstrap styling classes.
		const COLUMN = document.createElement("div")
		COLUMN.classList.add("col-auto", "p-0")

		// Obtain the current iteration's guess from the radios
		color = document.querySelector(`input[name="radio${i}"]:checked`).value

		// Create the circle element and add its styling classes, including the recently obtained color.
		const CIRCLE = document.createElement("p")
		CIRCLE.classList.add("circle_small", "m-1", `colorcode${color}`)
	
		// Add the circle to the new column, then add the column to the row.
		COLUMN.appendChild(CIRCLE)
		ROW.appendChild(COLUMN)
	}

	// The last column will be the grade for the five colors.
	// Again, start by creating and styling the column.
	const COLUMN_6 = document.createElement("div")
	COLUMN_6.classList.add("col-auto", "p-0")

	// Next create the element the grade will go into, in this case a bootstrap styled <p> tag.
	// Also, give it the class grade_display so that it can be styled with my own CSS.
	const grade = document.createElement("p")
	grade.classList.add("display-5", "mx-1", "mb-0", "grade_display")

	// Set the text of the grade element to the result of the function grade_submission()
	grade.innerText = grade_submission()

	// Add the grade to COLUMN_6, then add COLUMN_6 to the row.
	COLUMN_6.appendChild(grade)
	ROW.appendChild(COLUMN_6)

	// Finally, add the row to the list of past guesses.
	// This is simply done by adding the row to an ol with the id "past_guesses".
	document.getElementById("past_guesses").appendChild(ROW);
}


// Function for grading the submission
function grade_submission(){
	let grade = 0
	for (let i = 1; i < 6; i++) {
		if (ORDER[i - 1] == document.querySelector(`input[name="radio${i}"]:checked`).value){
			grade++;
		}
	}

	if (grade == 5){
		trigger_win_modal()
	}

	return grade
}


// Function for triggering the modal that says the player won
function trigger_win_modal() {
	const MODAL = new bootstrap.Modal(document.getElementById("win_modal"), {})
	MODAL.show();
}


// Function for disabling the submission button for a set amount of time.
function countdown(){
	const BUTTON = document.getElementById("submit")

	// Disable the button.
	BUTTON.disabled = true;

	// Set the internal timer to the variable WAIT_TIME
	let secs_left = WAIT_TIME

	// Change the button's text to what the converted amount would be prior to the countdown starting
	BUTTON.innerText = convert_secs(secs_left)

	// Update the count down every 1 second
	let count = setInterval(function() {

		// Decrement the number of seconds left
		secs_left--

		// Update the button with the new smaller amount of time left
		BUTTON.innerText = convert_secs(secs_left)

		// If the countdown is finished:
		if (secs_left <= 0) {

			// Change the button text back to "Submit"
			BUTTON.innerText = "Submit";

			// Reenable the button.
			BUTTON.disabled = false;
			
			// Kill the setInterval() so it won't keep counting
			clearInterval(count);
		}
	}, 1000);
}


// This function is for converting the provided number of seconds and converting it into minute:second form
// "n" is the number of seconds to be converted.
function convert_secs(n){

	// string is what will is being built to, and what will ultimatly be returned.
	let string = ""

	// Find how many minutes are in "n" and save it into "NUM_MINS".
	// Find how many seconds are in "n" and save it into "NUM_SECS".
	const NUM_MINS = Math.trunc(n / 60)
	const NUM_SECS = n % 60

	// If there are any minutes in "n", concatenate that number to "string"
	if (NUM_MINS > 0){
		string += NUM_MINS
	}

	// Add ":" to the string as the minute/second separator
	string += ":"

	// If there are more than 10 seconds in "n", concatenate that number as normal.
	if (NUM_SECS >= 10){
		string += NUM_SECS
	}

	// Else NUM_SECS is a single-digit number, and a 0 needs to be appended in front before it can be concatenated to "string".
	else {
		string += "0" + (n % 60)
	}

	// Return the newly constructed string.
	return string
}


console.log("Running functions.js")

// Generate a new randomized order to the colors on page load.
function random_order(state=true) {

	// By default, the order is placed into a configuration that shoud be easier to guess.
	const order = [3, 1, 5, 2, 4]

	// If state is true, then we want to truly shuffle the order.
	if (state) {
		for (let i = 4; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[order[i], order[j]] = [order[j], order[i]];
		}

	}

	// Return either the default order, or the newly shuffled order.
	return order
}

// Global WAIT_TIME to determine how long the timer on the Submit button should be for.
const WAIT_TIME = 30

// Global ORDER to determine what order the colors should be in.
const ORDER = random_order(false)

console.log(ORDER)
countdown()