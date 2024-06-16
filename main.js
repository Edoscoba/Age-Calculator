// Array containing the number of days in each month of a non-leap year.
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Function to check if a given year is a leap year and update the days in February accordingly.
 
 */
function leapCheacker(year) {
  // Check if the year is a leap year:
  // - It should be divisible by 4 and not divisible by 100,
  //   or it should be divisible by 400.
  if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
    // If it's a leap year, set February to have 29 days.
    months[1] = 29;
  } else {
    // If it's not a leap year, set February to have 28 days.
    months[1] = 28;
  }
}

/**
 * Function to calculate the age based on the input date and the current date.
 */
function ageCalculate() {
  // Get the current date.
  let today = new Date();
  // Get the input date from the HTML input element with id "date-input".
  let inputDate = new Date(document.getElementById("date-input").value);
  // Variables to store the calculated birth month, birth date, and birth year.
  let birthMonth, birthDate, birthYear;

  // Object to store the details of the birth date (day, month, year).
  let birthDetails = {
    date: inputDate.getDate(), // Get the day of the month from the input date.
    month: inputDate.getMonth() + 1, // Get the month (adjusting for zero-based index).
    year: inputDate.getFullYear() // Get the year from the input date.
  };

  // Get the current year, month, and date.
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDate = today.getDate();

  // Check if the current year is a leap year to adjust the days in February.
  leapCheacker(currentYear);

  // Check if the birth date is in the future compared to the current date.
  if (birthDetails.year > currentYear || 
     (birthDetails.month > currentMonth && birthDetails.year == currentYear) || 
     (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)) {
    // If the birth date is in the future, display an alert and reset the display to show dashes.
    alert('Not yet born');
    displayResult("-", "-", "-");
    return;
  }

  // Calculate the initial difference in years between the current year and the birth year.
  birthYear = currentYear - birthDetails.year;

  // Calculate the difference in months.
  if (currentMonth >= birthDetails.month) {
    birthMonth = currentMonth - birthDetails.month;
  } else {
    // If the current month is before the birth month, adjust the year and calculate the month difference.
    birthYear--;
    birthMonth = 12 + currentMonth - birthDetails.month;
  }

  // Calculate the difference in days.
  if (currentDate >= birthDetails.date) {
    birthDate = currentDate - birthDetails.date;
  } else {
    // If the current date is before the birth date, adjust the month and calculate the day difference.
    birthMonth--;
    let days = months[currentMonth - 2]; // Get the days in the previous month.
    birthDate = days + currentDate - birthDetails.date;
    if (birthMonth < 0) {
      // If the birth month becomes negative, adjust the year and set the month to December (11).
      birthMonth = 11;
      birthYear--;
    }
  }

  // Display the calculated age (days, months, years) on the webpage.
  displayResult(birthDate, birthMonth, birthYear);
}

/**
 * Function to display the calculated age in the HTML elements.
 */
function displayResult(bDate, bMonth, bYear) {
  // Set the text content of the HTML elements with ids "years", "months", and "days" to display the calculated age.
  document.getElementById("years").textContent = bYear;
  document.getElementById("months").textContent = bMonth;
  document.getElementById("days").textContent = bDate;
}
