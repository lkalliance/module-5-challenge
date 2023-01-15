# Work Day Scheduler

## Description

This is a web page that allows a user to interact with a daily calendar for the current day. He can save or delete events for any hour of the work day, and those events will be there the next time he loads the page.

You can access the page at [this location](https://lkalliance.github.io/module-5-challenge/).

<img src="./assets/images/work-day-scheduler.png" alt="Work Day Scheduler screenshot" width="500px">


## Usage

The page renders the work day calendar for the current day. The work day calendar is defined as the 9am hour (work day starts at 9am) through the 5pm hour (work day ends at 6pm).

The hour blocks are color-coded: the present hour has a red background, all hours before the present ("the past") have gray backgrounds, and all hours after the present hour ("the future") have green backgrounds. The color coding automatically updates as the day progresses.

The user can click on any hour and add, or edit the text block in that hour, as they create, edit or delete events. After entering or editing text, the user can click the "save" button for that hour (a floppy disk icon to the right of each hour) to store that hour's text.

The events that the user saves are persistent: they will reappear upon page reload or upon leaving the page and coming back later. However, once the calendar turns to the next day, all events are cleared out and the calendar is ready for the next day.

## Installation

There are not installations necessary for this page to operate. It currently uses just HTML, CSS and Javascript; technologies that are built into any web browser. The browser DOES  need to have Javascript enabled.

## Notes on design

There are some features I feel would need to be added to this application, but that would require a large redesign, and that felt like I did not have enough time before the development deadline to implement them. I did implement one feature not specifically spelled out in the design objective: when the calendar turns to the next day, then all the stored events are cleared out, and the new day gets a fresh start.

Whether this feature is a good addition or a bad one depends on how the application is used: a user entering daily tasks that they mean to persist and be present every single day without re-entering them will not be well served by the feature.

## Credits

I was not the original coder of the HTML and CSS; further, the site was built using the [jQuery Javascript library](https://jquery.com), the [Day.js javascript library](https://day.js.org) and [Bootstrap dev framework](https://getbootstrap.com).

I coded all of the local javascript, with the usual occasional assistancde from [W3Schools](https://w3schools.com/), [MDN](https://developer.mozilla.org/en-US/), [Stack Overflow](https://stackoverflow.com), and other code developers around the Web.

## License

This code is published under the [MIT license](./LICENSE).