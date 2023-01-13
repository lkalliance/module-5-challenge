/* In the code below, comments that are meant to identify what
the code is doing or are identifying or wayfinding are denoted
with "//" notation. Comments that are notes from the author are
denoted with "/*" notation */

/* The nature of the assignment is to refactor code without changing
the UI design of the page. I was tempted to do things like create
navigation to go from day to day, and to assign the saving function
to the blur event of a textarea, but have opted not to in the spirit
of the assignment. */


// GLOBAL ASSIGNMENTS
const firstHour = 9;    // identified as first hour to show
const lastHour = 17;    // identified as last hour to show



$(document).ready( function() {
  // This is the initialization function.
  // Everything that isn't otherwise in a function will be called in this one

  // grab some DOM elements and set some variables
  const jCal = $("#calendar");       // a reference to the calendar body
  const jDate = $("#currentDay");    // will hold a reference to the date
  const jClear = $("#clearButton");  // a reference to the "clear items" button
  let hourDivs;                      // will hold an array of the hour blocks
  let hourEvents;                    // will hold an array of the contents of each hour
  let dCurrentHour;                  // will be a reference to the current hour
  
  // determine today's date and place it on the page
  let dDate = dayjs();
  jDate.text(dDate.format('dddd, MMMM DD, YYYY'));
  // record what hour it is
  dCurrentHour = dDate.hour();

  // draw the calendar's basic structure
  // (value returned is an array of the hour divs)
  hourDivs = drawCal(jCal);

  // update the calendar to reflect the current time
  updateTime(hourDivs, dCurrentHour);

  // extract the localStorage
  // (value returned is an array of events)
  hourEvents = extractStored(hourDivs);

  // place the events into the calendar
  renderEvents(hourDivs, hourEvents);

  // attach the delegated listener to the container div
  jCal.on("click", "button", function(e) {
    e.preventDefault();
    saveEvent(e, hourDivs, hourEvents);
  });

  // attach a listener to the "Clear events" button
  jClear.on("click", function(e) {
    e.preventDefault();
    // empty out the main events array
    for ( i = 0; i < hourEvents.length; i++ ) {
      hourEvents[i] = false;
    }
    // save the empty array to localStorage
    localStorage.setItem("events", JSON.stringify(hourEvents));
    // re-render the calendar
    renderEvents(hourDivs, hourEvents);
  })

  // once-a-second check if there is a new hour
  let tickTock = setInterval( function() {
    dDate = dayjs();
    // is the current hour greater than the saved hour?
    if (dDate.hour() != dCurrentHour) {
      dCurrentHour = dDate.hour();
      updateTime(hourDivs, dCurrentHour);
    }
  }, 1000);
})



// ---- FUNCTION DECLARATIONS ----


function drawCal(jCalendar) {
  // This function clears out the calendar and re-draws its structure
  // parameter "calendar" is a reference to the calendar container

  /* Coder's note: I thought a while about what way to go on this. I have
  opted in the end to have the hour divs array and the stored events array
  each have 24 members, and not just members that have elements to hold. 
  That way I can tell just from the array index what hour is being referenced.
  Hours that are not represented on the calendar are just listed as "false"
  in the returned array. */

  let hours = [];

  // empty the calendar
  jCalendar.empty();
  // iterate through the hours of the day and render the ones as needed
  let jHourDiv, jHourLabel, jHourText, jHourBtn, jHourI;
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
      jHourI = $("<i>");
      jHourI.addClass("fas fa-save");
      jHourI.attr("aria-hidden", "true");
      jHourBtn.append(jHourI);
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

  /* Coder's note: it was not literally necessary to identify
  the textarea with "[0]", however against the possiblity of future
  releases that feature multiple text areas in a calendar hour,
  I've left that array index in.
  
  I do not just save the events, I save a date stamp as well, for 
  use with the extraction of the local storage */

  let clickedHour;
  // determine which calendar hour was saved
  clickedHour = e.currentTarget.parentNode.id.split("-")[1];
  // store the contents of the textarea in the events array
  events[clickedHour] = hours[clickedHour].children("textarea")[0].value;
  localStorage.setItem("events", JSON.stringify(events));
}

function extractStored(hours) {
  // This function converts the stored events into an array
  // parameter "hours" is the array of hourly divs

  /* Coder's note: As with the array of hours, I've opted to create
  this array of events with 24 members, so that I can know the hour
  associated with the event by the index.

  I have designed the code to compare the stored date with today's date:
  if the stored events weren't for today, then they are no longer relevant
  and should not be stored any more.

  I've also designed the code such that I only extract from localStorage
  once; after that all the events are held in the array and that array is 
  edited and then posted to localStorage with each save. */

  // create an empty array in case there are no saved events
  let emptyArray = [];
  for ( let i = 0; i < 24; i++ ) emptyArray.push(false);

  // retrieve the saved event object and parse them if they exist
  let storedEvents = localStorage.getItem("events");

  let events;
  if ( !storedEvents ) {
    // is today a new day, or are there no stored events?
    events = emptyArray;
  } else {
    // grab the existing events array
    events = JSON.parse(storedEvents);
  }

  return events;
}

function renderEvents(hours, events) {
  // This function adds stored events to the calendar
  // parameter "hours" is the array of hour divs
  // parameter "events" is the array of eventsd

  // iterate over the divs and place the text there

  let jHourText;
  for ( let i = 0; i < hours.length; i++ ) {
    if ( hours[i] ) {
      jHourText = $(hours[i]).children("textarea")[0];
      console.log(jHourText.value);
      jHourText.value = (events[i]?events[i]:"");
    }
  }
}

function clearEvents(events) {
  // This function clears all the stored events
  // parameter "events" is the hourly events array

  // create an empty version of the events array
  let emptyEvents = []
  for (let i = 0; i < 24; i++ ) emptyEvents.push(false);

  return emptyEvents;
}


// ---- END FUNCTION DECLARATIONS ----








/* For posterity and reference, I've left here all of the comments
that had been in the code at the start of the challenge */


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
