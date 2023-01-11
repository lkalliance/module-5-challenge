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

  // attach the delegated listener to the container div
  // it should save a 

  // once everything is in place, start a tick-tock timer:
  // if the hour has changed, call the functino to draw the page

})


function drawCal() {
  // This function clears out the calendar and re-draws it

  // empty the calendar
  jCal.empty();

  // get the saved data out of local storage
  let rawData = localStorage.getItem("events").toString();
  let parsedData = (rawData.length) > 1?rawData.json():false;

  // iterate through business hours and create new hour div
  for (let i = 0; i < 24; i++) {
    hours[i] = new hour(currHour);
  }

  // iterate through the returned hours and attach to the calendar body
  for (let i = 0; i < hours.length; i++) {
    if (hours[i].render) jCal.append(hours[i].hr);
  }

  // grab and parse the stored calendar events
 
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
