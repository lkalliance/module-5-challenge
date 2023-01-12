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
  let dCurrentHour;
  
  // determine today's date and place it on the page
  let dDate = dayjs();
  jDate.text(dDate.format('dddd, MMMM DD, YYYY'));
  dCurrentHour = dDate.hour();

  // draw the calendar's basic structure
  // value returned is an array of the hour divs
  hourDivs = drawCal(jCal);

  // update the calendar to reflect the current time
  updateTime(hourDivs, dDate.hour());

  // extract the localStorage
  // value returned is an array of events
  let hourEvents = extractStored(hourDivs);

  // place the events into the calendar
  renderEvents(hourDivs, hourEvents);

  // attach the delegated listener to the container div
  jCal.on("click", "button", function(e) {
    e.preventDefault();
    saveEvent(e, hourDivs, hourEvents);
  });

  // once a second check if there is a new hour
  let tickTock = setInterval( function() {
    dDate = dayjs();
    // is the current hour greater than the saved hour?
    if (dDate.hour() != dCurrentHour) {
      dCurrentHour = dDate.hour();
      updateTime(hourDivs, dCurrentHour);
    }
  }, 1000);
})


function drawCal(jCalendar) {
  // This function clears out the calendar and re-draws its structure
  // parameter "calendar" is a reference to the calendar container

  let hours = [];

  // empty the calendar
  jCalendar.empty();

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
    else hours.push(false);
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
    if (hours[i]) {
      thisHour = hours[i].attr("id").split("-")[1];
      // compare the hour, and toggle the appropriate class
      hours[i].toggleClass("past", (thisHour < currHour));
      hours[i].toggleClass("present", (thisHour == currHour));
      hours[i].toggleClass("future", (thisHour > currHour));
    }
  }
}

function saveEvent(e, hours, events) {
  // This listener callback saves the edited calendar hour
  // parameter "e" is the event object
  // parameter "hours" is the array of hour divs
  // parameter "events" is the array of hour events

  e.preventDefault();

  let clickedHour;
  // determine which calendar hour was saved
  clickedHour = e.currentTarget.parentNode.id.split("-")[1];
  // store the contents of the textarea in the events array
  events[clickedHour] = hours[clickedHour].children("textarea").val();
  localStorage.setItem("events", JSON.stringify(events));
}

function extractStored(hours) {
  // This function converts the stored events into an array
  // parameter "hours" is the array of hourly divs

  // create an empty array in case there are no saved events
  let emptyArray = [];
  for ( let i = 0; i < 24; i++ ) emptyArray.push(false);

  // get the raw data and parse it
  let storedEvents = localStorage.getItem("events");
  let parsedEvents = storedEvents?JSON.parse(storedEvents):emptyArray;

  return parsedEvents;
}

function renderEvents(hours, events) {
  // This function adds stored events to the calendar
  // parameter "hours" is the array of hour divs
  // parameter "events" is the array of events

  // now iterate over the divs and place the text there
  let jHourText;
  for ( let i = 0; i < hours.length; i++ ) {
    if ( hours[i] ) {
      jHourText = $(hours[i]).children("textarea")[0];
      jHourText.textContent = (events[i]?events[i]:"");
    }
  }
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
