// GLOBAL ASSIGNMENTS
const firstHour = 9;    // identified as first hour to show
const lastHour = 17;    // identified as last hour to show
const jCal = $("#calendar");     // a reference to the calendar body
const jDate = $("#currentDay");    // will hold a reference to the date

$(document).ready( function() {
  // This is the initialization function.
  // Everything that isn't otherwise in a function will be called in this block

  // determine today's date and place it on the page
  let dDate = dayjs();
  console.log(dDate);

  // call a function to draw the page
  let jHours = drawCal();

  // attach the delegated listener to the container div
  // it should save a 

  // once everything is in place, start a tick-tock timer:
  // if the hour has changed, call the functino to draw the page

})


function drawCal() {
  // This function clears out the calendar and re-draws it

  let hours = [];

  // empty the calendar
  jCal.empty();

  // get the saved data out of local storage
  // let rawData = localStorage.getItem("events");
  // let parsedData = (rawData.length > 1)?rawData.json():false;

  // iterate through the hours of the day and render the ones as needed
  /* -- go from 0 to 24 and if it's within given bounds:
  create the div
  append the div
  push a reference to the div onto hours array */

  // return an array of the hour elements
  return hours;
}

function updateTime(hours, currHour) {
  // This function updates the color coding of the hour divs
  // parameter "hours" is an array of the divs
  // parameter "currHour" is our current hour

}

function saveEvent(e) {
  // This listener callback saves the edited calendar hour

  e.preventDefault();

  // determine which calendar hour was saved

  // disable that text field and dim that hour while saving
  // (perhaps remove the listener while it does this?)

  // get data from local storare and parse it

  // overwrite the text content of the saved hour

  // put stringified data back into local storage

  // (perhaps put the listener back on?)

}










/* ---- COMMENTS IN ORIGINAL FILE ---- */


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
