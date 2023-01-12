// GLOBAL ASSIGNMENTS
const firstHour = 9;    // identified as first hour to show
const lastHour = 17;    // identified as last hour to show

$(document).ready( function() {
  // This is the initialization function.
  // Everything that isn't otherwise in a function will be called in this block

  // grab some DOM elements
  const jCal = $("#calendar");     // a reference to the calendar body
  const jDate = $("#currentDay");    // will hold a reference to the date
  let hourDivs;
  
  // determine today's date and place it on the page
  let dDate = dayjs();
  jDate.text(dDate.format('dddd, MMMM DD, YYYY'));

  // draw the calendar's basic structure
  hourDivs = drawCal(jCal);

  // update the calendar to reflect the current time
  updateTime(hourDivs, dDate.hour());

  // create and store an array of events
  let emptyEvents = [];
  for ( let i = 0; i < hourDivs.length; i++ ) {
    // they all start out false
    emptyEvents.push(false);
  }
  // render the events, and get back the updated list
  let hourEvents = renderEvents(emptyEvents);

  // attach the delegated listener to the container div
  jCal.on("click", "button", function(e) {
    e.preventDefault();
    saveEvent(e, hourDivs, hourEvents);
  });

  // once everything is in place, start a tick-tock timer:
  // if the hour has changed, call the functino to draw the page

})


function drawCal(jCalendar) {
  // This function clears out the calendar and re-draws it
  // parameter "calendar" is a reference to the calendar container

  let hours = [];

  // empty the calendar
  jCalendar.empty();

  // get the saved data out of local storage
  let rawData;
  if (localStorage.getItem("events")) {
    rawData = localStorage.getItem("events");
    let parsedData = (rawData.length > 1)?rawData.json():false;
    console.log(rawData);
  }
  else rawData = false;

  // iterate through the hours of the day and render the ones as needed
  let jHourDiv, jHourLabel, jHourText, jHourBtn;
  for (let i = 0; i < 24; i++) {
    // only render if the hour is between the defined "business hours"
    if ( i >= firstHour && i<= lastHour) {
      // create the main div for the hour
      jHourDiv = $("<div>");
      jHourDiv.addClass("row time-block");
      jHourDiv.attr("id", ("hour-" + i))
      // create the div that holds the label
      jHourLabel = $("<div>");
      jHourLabel.addClass("col-2 col-md-1 hour text-center py-3");
      jHourLabel.text( (i == 12)?"12PM":((i % 12) + (i > 11?"PM":"AM")));
      // create the textarea for the hour
      jHourText = $("<textarea>");
      jHourText.addClass("col-8 col-md-10 description");
      jHourText.attr("rows", 3);
      // create the button for the hour
      jHourBtn = $("<button>");
      jHourBtn.addClass("btn saveBtn col-2 col-md-1");
      jHourBtn.html('<i class="fas fa-save" aria-hidden="true"></i>');
      // append the label, the textarea and the button to the main div
      jHourDiv.append(jHourLabel);
      jHourDiv.append(jHourText);
      jHourDiv.append(jHourBtn);
      // append the main div to the calendar
      jCalendar.append(jHourDiv);
      
      // add a reference to the div in the returned array
      hours.push(jHourDiv);
    }
  }

  // return an array of the hour elements
  return hours;
}

function updateTime(hours, currHour) {
  // This function updates the color coding of the hour divs
  // parameter "hours" is an array of the divs
  // parameter "currHour" is our current hour

  let thisHour;

  // iterate through the array of divs
  for (i = 0; i<hours.length; i++) {
    // get the div's hour number from its id
    thisHour = hours[i].attr("id").split("-")[1];

    // compare the hour, and toggle the appropriate class
    hours[i].toggleClass("past", (thisHour < currHour));
    hours[i].toggleClass("present", (thisHour == currHour));
    hours[i].toggleClass("future", (thisHour > currHour));
  }
}

function saveEvent(e, hours) {
  // This listener callback saves the edited calendar hour
  // parameter "e" is the event object
  // parameter "hours" is the array of hour divs

  e.preventDefault();

  let clickedHour;
  // determine which calendar hour was saved
  clickedHour = e.currentTarget.parentNode.id.split("-")[1];
  console.log(clickedHour);

  // disable that text field and dim that hour while saving
  // (perhaps remove the listener while it does this?)

  let rawData, parsedData;
  // do events exist in localStorage?
  // if (!localStorage.getItem("events")) {
   // parsedData = [];
    // iterate over the hours div, store values for each hour
   // for (let i = 0; i < hours.length; )
  // }


  // overwrite the text content of the saved hour

  // put stringified data back into local storage

  // (perhaps put the listener back on?)

}

function renderEvents(hours, events) {
  // This function adds stored events to the calendar
  // parameter "hours" is the array of hour divs
  // parameter "events" is the array of events
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
