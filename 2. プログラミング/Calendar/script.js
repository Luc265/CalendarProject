
// Time variable queries.
let today = new Date()
// All the date should be a NUMBER type!!

// Variable for storing the selected date data.
let selDate, selMonth, selYear;

const firstDate = new Date(0, 0, 0, 0);
firstDate.setHours(0, 0, 0, 0);
let date_startPoint = new Date(0, 0, 0, 0);
date_startPoint.setHours(0, 0, 0, 0);
let date_endPoint = new Date(0, 0, 0, 0);
date_endPoint.setHours(0, 0, 0, 0);

var mouseClick = false;

const _mode = {
  NormalMode: "Normal Mode",
  SelectMode: "Selected Mode"
}
let checkmode = _mode.NormalMode;

// To store the date today.
// Variables with "curr" represents the current displayed data.
let currYear = thisYear = today.getFullYear();
let currMonth = thisMonth = new Month(today.getMonth());
let currDate = today.getDate();
let startDay = new Date(thisMonth.index, thisYear, 1).getDay()

// Element queries
const calendarWidgets = document.querySelectorAll(".calendar-widget");
let toolBars = document.querySelectorAll(".radio");
const calendarContent = document.querySelector(".calendar-content");

// ==================================================================
// _________________________ OBJECTS ________________________________
// ==================================================================
function Month(index) {
  const shortNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const longNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const numberofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (currYear % 4 === 0) {
    numberofDays[1] = 29;
  }

  index = index > 11 ? 0 : index;
  index = index < 0 ? 11 : index;

  this.index = index;
  this.shortName = shortNames[index];
  this.longName = longNames[index];
  this.length = numberofDays[index];
}

// =======================================
// _____________ FUNCTIONS _______________
// =======================================

function getMonthIndex(name) {
  const shortMonthTable = {
    "jan": 0,
    "feb": 1,
    "mar": 2,
    "apr": 3,
    "may": 4,
    "june": 5,
    "july": 6,
    "aug": 7,
    "sept": 8,
    "oct": 9,
    "nov": 10,
    "dec": 11
  };

  const longMonthTable = {
    "january": 0,
    "february": 1,
    "march": 2,
    "april": 3,
    "may": 4,
    "june": 5,
    "july": 6,
    "august": 7,
    "september": 8,
    "october": 9,
    "november": 10,
    "december": 11
  };
  
  name = name.toLowerCase();
  let index = shortMonthTable[name];
  if (index === undefined) {
    index = longMonthTable[name];
  };
  return index;
}

function getStartDay(year, month) {
  const startDay = new Date(year, month.index, 1).getDay()
  return startDay
}

function updateSelData(dateField) {
  let fullDate = dateField.value.split(" ");
  let selData = [];
  if (fullDate !== "") {
    selDate = Number(fullDate[0]);
    selMonth = new Month(getMonthIndex(fullDate[1]));
    selYear = Number(fullDate[2]);
    selData = [selDate, selMonth, selYear];
  }
  return selData;
}

// Cell UI Animation
function clearSelCell() {
  // For single calendar, input the div with calendar class as the arguments, for dual calendar, input the div with "dual-calendar" class as arguments.
  const cells = document.querySelectorAll(".date");
  cells.forEach(cell => {
    cell.classList.remove("in-range");
  })
}

function highlightCellRange(currFullDate, calendar) {
  const cells = calendar.querySelectorAll(".date");

  clearSelCell();

  cells.forEach(cell => {
    let cellFullDate, _cellYear, cellYear, cellMonth, cellDate;

    if (!(cell.classList.contains("empty") || cell.classList.contains("disabled"))) {
      cellFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
      cellYear = cellFullDate[1];
      cellMonth = cellFullDate[0];
      cellDate = Number(cell.querySelector(".date-text").textContent);
      cellFullDate = new Date(`${cellDate} ${cellMonth} ${cellYear}`);

      if ((cellFullDate <= date_startPoint && cellFullDate >= currFullDate) || (cellFullDate >= date_startPoint && cellFullDate <= currFullDate)) {
        cell.classList.add("in-range");
      }
    }
  })
}

function drawTable(calendar) {
  let month = currMonth;
  let year = currYear;

  if (calendar.classList.contains("plus-one")) {
    monthIndex = currMonth.index + 1;
    month = new Month(monthIndex);
    leftYear = document.querySelector(".leftYear");
    rightYear = document.querySelector(".rightYear");
    centerYear = document.querySelector(".centerYear");
    if (monthIndex > 11) {
      year++;
      leftYearText = document.querySelector(".leftYear p");
      rightYearText = document.querySelector(".rightYear p");
      leftYearText.textContent = `${year - 1}`;
      rightYearText.textContent = `${year}`;

      leftYear.classList.remove("year-hide");
      leftYear.classList.add("year-show");
      rightYear.classList.remove("year-hide");
      rightYear.classList.add("year-show");
      centerYear.classList.remove("year-show");
      centerYear.classList.add("year-hide");
    } else {
      var offset_width = 100;
      centerYear.style.width = offset_width.toString() + "%";

      leftYear.classList.remove("year-show");
      leftYear.classList.add("year-hide");
      rightYear.classList.remove("year-show");
      rightYear.classList.add("year-hide");
      centerYear.classList.remove("year-hide");
      centerYear.classList.add("year-show");
    }
  }

  const widget = calendar.closest(".calendar-widget");
  // Change Table Month Name
  const monthText = calendar.querySelector(".month-text p");
  const monthCalendar = calendar.querySelector(".month p");
  const calendarWrapper2 = widget.querySelector(".calendar-wrapper");
  const yearText = calendarWrapper2.querySelector(".centerYear p")
  monthText.textContent = `${month.longName} ${year}`
  monthCalendar.textContent = `${month.longName}`
  yearText.textContent = `${year}`

  // Defining variables to create the date table
  let monthDays = month.length;
  let start = getStartDay(year, month);
  let count = 1 - start;

  const tableBody = calendar.querySelector(".date-table-body");
  var rowCount = 0;

  while (rowCount < 6) {
    let row = document.createElement("div"); // Create date rows
    row.setAttribute("class", "date-table-row");

    let dayCount = 0; // variable to keep track of the day (e.g. Monday, Tuesday, ... Sunday)

    // Date cell creation
    for (i = 0; i < 7; i++) {
      let cell = document.createElement("div");
      cell.setAttribute("class", "date");

      if (count < 1) {
        cell.classList.add("empty");
      } else if (count > monthDays) {
        cell.classList.add("empty");
      } else {
        let cellRipple = document.createElement("div"); // Ripple effect, not important
        let helpText = document.createElement("p"); // Originally intended to show the today's date. Removed.
        let cellText = document.createElement("p"); // The number inside each date cell

        cellRipple.setAttribute("class", "date-ripple");
        cellText.setAttribute("class", "date-text");
        helpText.setAttribute("class", "help-text");

        cellText.textContent = count; // Output the current date
        //settings style of Sunday in Week
        if (dayCount === 0) {
          cell.classList.add("sunday");
        }
        //settings style of Today 
        if (dayCount === 6) {
          cell.classList.add("today");
        }

        cell.appendChild(cellRipple);
        cell.appendChild(helpText);
        cell.appendChild(cellText);

        if (!(cell.classList.contains("disabled") || cell.classList.contains("empty"))) {
          if (true) {
            cell.addEventListener("mouseenter", function () {
              if (mouseClick === true && checkmode == _mode.NormalMode) {
                let currFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
                const currYear = currFullDate[1];
                const currMonth = currFullDate[0];
                const currDate = Number(cell.querySelector(".date-text").textContent);
                currFullDate = new Date(`${currDate} ${currMonth} ${currYear}`);
                highlightCellRange(currFullDate, calendar.closest(".dual-calendar"));
                cell.classList.add("in-range");
              }
            })
          }

          cell.addEventListener("click", function (e) {
            let currFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
            const clickYear = currFullDate[1];
            const clickMonth = cell.closest(".calendar").querySelector(".month-text p").textContent;
            const clickDate = Number(cell.querySelector(".date-text").textContent);

            date_endPoint = new Date(date_startPoint.toString());

            date_startPoint = new Date(`${clickDate} ${clickMonth} ${clickYear}`);

            if (mouseClick == false) {
              clearSelCell();
            }

            mouseClick = !mouseClick
            cell.classList.add("in-range");

            if (checkmode == _mode.SelectMode) {
              let yesterdayRadioObj = null;
              toolBars.forEach(obj =>{
                if (obj.value === 'Yesterday') {
                  yesterdayRadioObj = obj;
                }
              });
              //date_endPoint = (クリックされた日) -  1
              if(yesterdayRadioObj.checked == true){
                mouseClick = true;
              }else{         
                toolBars.forEach(toolBar => {
                  checkModeSelect(toolBar, calendar);
                })
                //選択した日（date_endPointからdate_startPointまで）をマークします
                highlightCellRange(date_endPoint, calendar.closest(".dual-calendar"));
                mouseClick = false;
              }
            
              toolBars.forEach(toolBar => {
                toolBar.checked = false;
                console.log(toolBar.checked);
              })
              checkmode = _mode.NormalMode;         
            }
          })
        }
      }
      row.appendChild(cell);
      count++;
      dayCount++;
    }
    tableBody.appendChild(row);
    rowCount++;
  }
}

function clearTable(calendar) {
  const tableRows = calendar.querySelectorAll(".date-table-row");
  if (tableRows.length) {
    tableRows.forEach(row => {
      row.remove();
    })
  }
}

function toggleCalendar(widget) {
  const dateField = widget.querySelector(".date-field");
  const calendarWrapper = widget.querySelector(".calendar-wrapper");
  const calendars = calendarWrapper.querySelectorAll(".calendar");

  calendarWrapper.style.display = 'block';
  widget.classList.add("active");
  widget.setAttribute("data-active", "true");
  dateField.classList.add("active");

  if (dateField.value !== "") {
    updateSelData(dateField);
    currMonth = selMonth;
    currYear = selYear;
  }

  calendars.forEach(calendar => {
    clearTable(calendar);
    drawTable(calendar);
  })
  // Next and Previous Month Buttons Listener
  const nextBtn = widget.querySelector(".next-btn");
  const prevBtn = widget.querySelector(".prev-btn");

  nextBtn.addEventListener("click", nextMonth);
  prevBtn.addEventListener("click", prevMonth);
  nextBtn.setAttribute("data-has-listener", "true");
  prevBtn.setAttribute("data-has-listener", "true");

  let minData;
  return;
}

function changeMonth(e, calendar, direction) {
  if (e) {
    console.log(`Next Month called by: ${e.target.tagName}.${e.target.className}`);
  }
  let calendars;

  let currMonthIndex;
  if (direction === "next") {
    currMonthIndex = currMonth.index + 1;
    currMonth = new Month(currMonthIndex);
    currMonthIndex > 11 ? currYear++ : currYear;
  } else {
    currMonthIndex = currMonth.index - 1;
    currMonth = new Month(currMonthIndex);
    currMonthIndex < 0 ? currYear-- : currYear;
  }

  if (calendar.classList.contains("dual-calendar")) {
    calendars = calendar.querySelectorAll(".calendar");
    calendars.forEach(calendar => {
      clearTable(calendar);
      drawTable(calendar);
    })
  } else {
    clearTable(calendar);
    drawTable(calendar);
  }

  if (mouseClick == false) {  // cellを選択完了の状態
    if (date_startPoint.toString() !== firstDate.toString()) { //新規状態ではないチェック
      highlightCellRange(date_endPoint, calendar.closest(".dual-calendar"));
    }
  }
}

function nextMonth(e) {
  changeMonth(e, e.target.closest(".dual-calendar"), "next");
}

function prevMonth(e) {
  console.log("previous");
  changeMonth(e, e.target.closest(".dual-calendar"), "prev");
}

calendarWidgets.forEach(widget => {
  // If the widget has the "default-today" class, sets its value to today's date.
  const dateField = widget.querySelector(".date-field");

  if (widget.classList.contains("default-today")) {
    dateField.readonly = false;
    dateField.value = `${currDate} ${thisMonth.longName} ${thisYear}`;
    dateField.readonly = true;
  }
  
  toggleCalendar(widget);

  const section = document.querySelector(".dual-calendar");
  eventModeSelect(toolBars, section);
  eventClickButton();
  windowResize();
});

function windowResize() {
  const sidebar = document.querySelector(".calendar-sidebar");
  const section = document.querySelector(".dual-calendar");
  var offset_width = sidebar.offsetWidth + section.offsetWidth;
  const calendar_footer = document.querySelector(".calendar-footer");
  calendar_footer.style.width = offset_width.toString() + "px";

  calendarContentWidth = calendarContent.offsetWidth;
  calendarContentHeight = calendarContent.offsetHeight;
  // small
  if (calendarContentWidth < 700 || calendarContentHeight < 400) {
    const moveBtns = document.querySelectorAll(".prev-btn,.next-btn");
    moveBtns.forEach(btn => {
      btn.classList.remove("move-btn-medium");
      btn.classList.remove("move-btn-big");
      btn.classList.add("move-btn-small");
    })
  }else{
    const moveBtns = document.querySelectorAll(".prev-btn,.next-btn");
    moveBtns.forEach(btn => {
      btn.classList.remove("move-btn-small");
      btn.classList.remove("move-btn-big");
      btn.classList.add("move-btn-medium");
    })
  }
}

function eventModeSelect(toolBars, calendar) {
  toolBars.forEach(toolBar => {
    toolBar.addEventListener("click", function (e) {
      mouseClick = false;
      checkmode = _mode.SelectMode;
      clearSelCell();
      checkModeSelect(toolBar, calendar);
    })
  })
};

function checkModeSelect(toolBar, calendar) {
  date_endPoint.setMonth(date_startPoint.getMonth());
  date_endPoint.setFullYear(date_startPoint.getFullYear());
  if (toolBar.checked) {
    checkmode = _mode.SelectMode;
  } else {
    checkmode = _mode.NormalMode;
  }
  if (checkmode == _mode.SelectMode) {
    if (toolBar.value === 'Yesterday') {
      date_startPoint = new Date(); // start
      date_startPoint.setHours(0, 0, 0, 0);
      date_startPoint.setDate(date_startPoint.getDate() - 1);
      date_endPoint = new Date(date_startPoint.toString());

      console.log("date_endPoint", date_endPoint);
      highlightCellRange(date_endPoint, calendar.closest(".dual-calendar"));
    }
    if (toolBar.value === 'rad_weekBefore') {
      date_startPoint.setDate(date_startPoint.getDate() - 0);
      date_endPoint.setMonth(date_startPoint.getMonth());
      date_endPoint.setFullYear(date_startPoint.getFullYear());
      date_endPoint.setDate(date_startPoint.getDate() - 6);
    }
    if (toolBar.value === 'rad_weekSelect') {
      var date_day = Zeller(date_startPoint.getDate(), date_startPoint.getMonth() + 1, date_startPoint.getFullYear());
      date_endPoint.setDate(date_startPoint.getDate() - date_day);
      date_startPoint.setDate(date_startPoint.getDate() + 6 - date_day);
    }
    if (toolBar.value === 'rad_monthBefore') {
      date_startPoint.setDate(date_startPoint.getDate());
      date_endPoint.setMonth(date_startPoint.getMonth());
      date_endPoint.setFullYear(date_startPoint.getFullYear());
      date_endPoint.setDate(1);
    }
    if (toolBar.value === 'rad_monthSelect') {
      date_endPoint.setDate(1);
      date_startPoint.setMonth(date_startPoint.getMonth() + 1);
      date_startPoint.setDate(1);
      date_startPoint.setDate(date_startPoint.getDate() - 1);
    }
  }
}

function eventClickButton() {
  const btnOK = document.querySelector(".btn_OK");
  const btnCancel = document.querySelector(".btn_Cancel");
  btnOK.addEventListener("click", function (e) {
    alert('OKボタンが押す');
  })
  btnCancel.addEventListener("click", function (e) {
    alert('Cancelボタンが押す');
  })
}

//曜日の順序を返す
function Zeller(D, M, Y) {
  var Day = "";

  if (M < 3) {
    M = M + 12;
    Y = Y - 1;
  }

  var C = Math.floor(Y / 100);
  var K = Y - (100 * C);

  var S = Math.floor(2.6 * M - 5.39) + Math.floor(K / 4) + Math.floor(C / 4) + D + K - (2 * C);

  var ans = S - (7 * Math.floor(S / 7));

  return ans;
}

