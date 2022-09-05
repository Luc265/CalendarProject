// Time variable queries.
let today = new Date()
// All the date should be a NUMBER type!!

// Variable for storing the selected date data.
let selDate, selMonth, selYear;
let clickFullDate = new Date(0, 0, 0, 0);
let toolFullDate = new Date();
toolFullDate.setHours(0, 0, 0, 0);

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

// ==================================================================
// _________________________ OBJECTS ________________________________
// ==================================================================
function Month(index) {
  const shortNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const longNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
  const numberofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  if (currYear % 4 === 0){
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

function getMonthIndex(name){
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
  if (index === undefined){
    index = longMonthTable[name];
  };
  return index;
}

function getStartDay(year, month){
  const startDay = new Date(year, month.index, 1).getDay()
  return startDay
}

function getSelDate(year, month){
  // console.log(year === selYear);
  // console.log(month.index === selMonth.index);
  if (year === selYear && month.index === selMonth.index){
    return selDate
  }
}

function getToday(year, month){
  if (year === thisYear && month.index === thisMonth.index){
    return today.getDate();
  }
}

function updateSelData(dateField){
  let fullDate = dateField.value.split(" ");
  let selData = [];
  if (fullDate !== ""){
    selDate = Number(fullDate[0]);
    selMonth = new Month(getMonthIndex(fullDate[1]));
    selYear = Number(fullDate[2]);
    selData = [selDate, selMonth, selYear];
  }
  
  return selData;
}

function updateDateField(e, fullDate, dateField){
  /* Update the date field of the widget
   * The date arguments should be a formatted date of DD MMMM YYYY
   */
  if (e){
    console.log(`Update Date Field called by: ${e.target.tagName}.${e.target.className}`)
  }
  
  dateField.value = fullDate;
  return fullDate;
}

// Cell UI Animation

function clearSelCell(calendar){
  // For single calendar, input the div with calendar class as the arguments, for dual calendar, input the div with "dual-calendar" class as arguments.
  const cells = calendar.querySelectorAll(".date");
  cells.forEach(cell => {
    cell.classList.remove("in-range");
  })
}

function highlightCellRange(currFullDate, calendar){

  const cells = calendar.querySelectorAll(".date");
  cells.forEach(cell => {
    cell.classList.remove("in-range");
  });
  
  cells.forEach(cell => {
    let cellFullDate, _cellYear, cellYear, cellMonth, cellDate;
    
    if (!(cell.classList.contains("empty") || cell.classList.contains("disabled"))){
      cellFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
      cellYear = cellFullDate[1];
      cellMonth = cellFullDate[0];
      cellDate = Number(cell.querySelector(".date-text").textContent);
      cellFullDate = new Date(`${cellDate} ${cellMonth} ${cellYear}`);
      if((cellFullDate  <= clickFullDate && cellFullDate >= currFullDate) || (cellFullDate  >= clickFullDate && cellFullDate <= currFullDate)){
        cell.classList.add("in-range");
      }

    }
  })
}


function drawTable(calendar){
  let month = currMonth;
  let year = currYear;
  
  if (calendar.classList.contains("plus-one")){
    monthIndex = currMonth.index + 1;
    month = new Month(monthIndex);
    if (monthIndex > 11){
      year++;
    }
  }
  
  const widget = calendar.closest(".calendar-widget");
  
  // Change Table Month Name
  const monthText = calendar.querySelector(".month-text p");
  const calendarWrapper2 = widget.querySelector(".calendar-wrapper");
  const yearText = calendarWrapper2.querySelector(".year p")
  monthText.textContent = `${month.longName} ${year}`
  yearText.textContent = `${year}`
  
  // Defining variables to create the date table
  let monthDays = month.length;
  let start = getStartDay(year, month);
  let count = 1 - start;
  let currSelDate = getSelDate(year, month);
  let todayDate = getToday(year, month);
  let minDate = widget.getAttribute("date-min");
  if (minDate !== null){
    if (minDate === "today"){
      minDate = [todayDate, month.index, year];
    } else if (minDate === "link"){
      const linkedWidget = document.querySelector(widget.getAttribute("data-link"));
      const linkedDateField = linkedWidget.querySelector(".date-field");
      minDate = linkedDateField.value.split(" ");
      let monthIndex = getMonthIndex(minDate[1]);
      minDate[1] = monthIndex;
      console.log(`Linked min Date is: ${minDate}`);
    } else {
      minDate = minDate.split("-");
    }  
    
    if (year === Number(minDate[2]) && month.index === minDate[1]){
      minDate = minDate[0]
    } else {
      minDate = undefined;
    }
  }
  
  // console.log(`Min Date is: ${minDate}`)
  
  // console.log(`Current Selected Date: ${currSelDate}`)
  const tableBody = calendar.querySelector(".date-table-body");
  var rowCount = 0;
  while(rowCount < 6){
    let row = document.createElement("div"); // Create date rows
    row.setAttribute("class", "date-table-row");
    
    let dayCount = 0; // variable to keep track of the day (e.g. Monday, Tuesday, ... Sunday)
    
    // Date cell creation
    for (i=0; i < 7; i++){
      let cell = document.createElement("div");
      cell.setAttribute("class", "date");

      if (count < 1 ){
        cell.classList.add("empty");
      } else if (count > monthDays){
        cell.classList.add("empty");
      } else {
        let cellRipple = document.createElement("div"); // Ripple effect, not important
        let helpText = document.createElement("p"); // Originally intended to show the today's date. Removed.
        let cellText = document.createElement("p"); // The number inside each date cell
        
        cellRipple.setAttribute("class", "date-ripple");
        cellText.setAttribute("class", "date-text");
        helpText.setAttribute("class", "help-text");
        
        cellText.textContent = count; // Output the current date
        
        
        if (dayCount === 0){
          cell.classList.add("sunday");
        }

        if (dayCount === 6){
          cell.classList.add("today");
        }
        
        cell.appendChild(cellRipple);
        cell.appendChild(helpText);
        cell.appendChild(cellText);
        
        
        if (!(cell.classList.contains("disabled") || cell.classList.contains("empty"))){
          if (true){
            cell.addEventListener("mouseenter", function(){
              if(mouseClick === true && checkmode == "Normal Mode")
              {
                let currFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
                // let _currYear = cell.closest(".calendar-wrapper").querySelector(".year p").textContent;
                const currYear = currFullDate[1];
                const currMonth = currFullDate[0];
                const currDate = Number(cell.querySelector(".date-text").textContent);
                currFullDate = new Date(`${currDate} ${currMonth} ${currYear}`);

                highlightCellRange(currFullDate, calendar.closest(".dual-calendar"));
                cell.classList.add("in-range");
              }            
            }) 
          } 

          cell.addEventListener("click", function(e){
            let currFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
            const clickYear = currFullDate[1];
            const clickMonth = cell.closest(".calendar").querySelector(".month-text p").textContent;
            const clickDate = Number(cell.querySelector(".date-text").textContent);
            clickFullDate = new Date(`${clickDate} ${clickMonth} ${clickYear}`);
            
            mouseClick = !mouseClick         
            e.stopPropagation();           
            cell.classList.add("in-range"); 

            //Selected Mode: On       
            if(checkmode == "Selected Mode"){
              //toolFullDate = (クリックされた日) -  1
              toolFullDate.setMonth(clickFullDate.getMonth());
              toolFullDate.setFullYear(clickFullDate.getFullYear());
              toolBars.forEach(toolBar =>{
                checkRadioEvent(toolBar, calendar);
              })
              //選択した日（toolFullDateからclickFullDateまで）をマークします
              highlightCellRange(toolFullDate, calendar.closest(".dual-calendar"));
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
  // highlightCellRange(toolFullDate, calendar.closest(".dual-calendar"));
  
}

function clearTable(calendar){
  // if (e){
  //   console.log(`Clear table called by: ${e.target.tagName}.${e.target.className}`)
  // }
  
  const tableRows = calendar.querySelectorAll(".date-table-row");
  if (tableRows.length){
    tableRows.forEach(row => {
      row.remove();
    })  
  }
}


function editBtnListener(widget, minData, maxData){
  // console.log(`Edit Btn Listener called.`)
  // Query the minimum and maximum date from the html data-attributes;
  let minYear, minMonth, maxYear, maxMonth;
  if (minData){
    minYear = minData["minYear"];
    minMonth = minData["minMonth"];
  } else if (widget.getAttribute("date-min") === "today"){
    minYear = thisYear;
    minMonth = thisMonth;  
  } else if (widget.getAttribute("date-min") === "link"){
    const linkedWidget = document.querySelector(widget.getAttribute("data-link"));
    const linkedDateField = linkedWidget.querySelector(".date-field");
    minData = linkedDateField.value.split(" ");
    minYear = Number(minData[2]);
    minMonth = new Month(getMonthIndex(minData[1]));
  } 
  
  if (maxData){
    maxYear = maxData["maxYear"];
    maxMonth = maxData["maxMonth"];
  } else {
    maxYear = thisYear + 1;
    maxMonth = new Month(thisMonth.index - 1);    
  }
  
  const prevBtn = widget.querySelector(".prev-btn");
  const nextBtn = widget.querySelector(".next-btn");

}

function toggleCalendar(widget){
  
  const dateField = widget.querySelector(".date-field");
  const calendarWrapper = widget.querySelector(".calendar-wrapper");
  const calendars = calendarWrapper.querySelectorAll(".calendar");
  const calendarPadding = Number(window.getComputedStyle(calendars[0]).getPropertyValue("padding-bottom").replace(/px/, ''));
  const calendarMargin = Number(window.getComputedStyle(calendars[0]).getPropertyValue("margin-top").replace(/px/, ''));

  
  let wrapperHeight, calendarHeight;
  
    calendarWrapper.style.display = 'block';
    
    // console.log("toggle-on");
    widget.classList.add("active");
    widget.setAttribute("data-active", "true");
    dateField.classList.add("active");
    
    if (dateField.value !== ""){
      updateSelData(dateField);  
      currMonth = selMonth;
      currYear = selYear;
    }
    
    // console.log(`Selected Date: ${selDate} ${selMonth.shortName} ${selYear}`);
    
    calendars.forEach(calendar => {
      clearTable(calendar);
      drawTable(calendar);
      // toolSelect(calendar);
    })
    
    // Next and Previous Month Buttons Listener
    const nextBtn = widget.querySelector(".next-btn");
    const prevBtn = widget.querySelector(".prev-btn");

    nextBtn.addEventListener("click", nextMonth);
    prevBtn.addEventListener("click", prevMonth);
    nextBtn.setAttribute("data-has-listener", "true");
    prevBtn.setAttribute("data-has-listener", "true");
    

    
  
    let minData;
    
    if (widget.classList.contains("linked")){
      const prevWidget = document.querySelector(widget.getAttribute("data-link"));
      const prevDateField = prevWidget.querySelector(".date-field");
      const prevFullDate = prevDateField.value.split(" ");
      const minYear = Number(prevFullDate[2]);
      const minMonth = new Month(getMonthIndex(prevFullDate[1]));
      minData = {
        "minYear": minYear,
        "minMonth": minMonth
      }
    
    editBtnListener(widget, minData);
  }
  
  return;
}


function changeMonth(e, calendar, direction){
  if(e){
    console.log(`Next Month called by: ${e.target.tagName}.${e.target.className}`);
  }
  let calendars;
  
  let currMonthIndex;
  if (direction === "next"){
    currMonthIndex = currMonth.index + 1;
    currMonth = new Month(currMonthIndex);
    currMonthIndex > 11 ? currYear++ : currYear;
  } else {
    currMonthIndex = currMonth.index - 1;
    currMonth = new Month(currMonthIndex);
    currMonthIndex < 0 ? currYear-- : currYear;
  }
  
  if(calendar.classList.contains("dual-calendar")){
    calendars = calendar.querySelectorAll(".calendar");  
    calendars.forEach(calendar => {
      clearTable(calendar);
      drawTable(calendar);
      // toolSelect(calendar);
    })
  } else {
    clearTable(calendar);
    drawTable(calendar);
    // toolSelect(calendar);
  }
  
  editBtnListener(calendar.closest(".calendar-widget"));
  highlightCellRange(toolFullDate, calendar.closest(".dual-calendar"));
}

function nextMonth(e){
  changeMonth(e, e.target.closest(".dual-calendar"), "next");
}

function prevMonth(e){
  console.log("previous");
  changeMonth(e, e.target.closest(".dual-calendar"), "prev");
}

// ==================================================================
// ________________________ LISTENERS _______________________________
// ==================================================================
//duoc tao khi bat dau load man hinh
calendarWidgets.forEach(widget => {
  // If the widget has the "default-today" class, sets its value to today's date.
  const dateField = widget.querySelector(".date-field");
  
  if (widget.classList.contains("default-today")){
    dateField.readonly = false;
    dateField.value = `${currDate} ${thisMonth.longName} ${thisYear}`;
    dateField.readonly = true;
  }
  
  const calendarWrapper = widget.querySelector(".calendar-wrapper");
  const calendars = widget.querySelectorAll(".calendar");
  
  // Not sure if OK to use
  calendarWrapper.addEventListener("click", function(e){
    // Stop all the click event from bubbling to the widget.
    e.stopPropagation();
  });
  
  toggleCalendar(widget)
  
  //Hide on focus out
  let focusOutFunction;
  widget.addEventListener("focusout", function(e){
    focusOutFunction = setTimeout(function(){
      console.log("focusout");
      // hideCalendar(e, widget);
    }, 0);
  })
  
  // If the next object that was focused in is a member of the widget, cancel the focusout function.
  widget.addEventListener("focusin", function(e){
    console.log(`${e.target.tagName}.${e.target.className} focus in.`);
    clearTimeout(focusOutFunction);
  })
})
window.onload = function()
{
  const sidebar = document.querySelector(".calendar-sidebar");
  const section = document.querySelector(".dual-calendar");
  toolSelect(toolBars, section);
  var offset_width = sidebar.offsetWidth + section.offsetWidth;
  const calendar_footer = document.querySelector(".calendar-footer");
  calendar_footer.style.width = offset_width.toString() + "px";
};

var checkDoubleClick = '';

function toolSelect(toolBars, calendar){
  toolBars.forEach(toolBar =>{
    toolBar.addEventListener("click", function(e){ 
      if(toolBar.value === checkDoubleClick){
        toolBar.checked = false;
        checkDoubleClick = '';
        mouseClick = false;
        checkmode = _mode.NormalMode;
        clearSelCell(calendar.closest(".dual-calendar")); 
      }else{
        clearSelCell(calendar.closest(".dual-calendar"));
        checkRadioEvent(toolBar, calendar);
      }     
    })
  })
};

function checkRadioEvent(toolBar, calendar){
  if(toolBar.checked){

    checkmode = _mode.SelectMode; 

    if(checkmode == "Selected Mode"){
      checkDoubleClick = toolBar.value;
      if(toolBar.value === 'Yesterday'){
        clickFullDate.setDate(clickFullDate.getDate()-1)
        toolFullDate.setDate(clickFullDate.getDate());
      }
      if(toolBar.value === 'rad_weekBefore'){
        clickFullDate.setDate(clickFullDate.getDate()-1)
        toolFullDate.setDate(clickFullDate.getDate()-6);        
      }
      if(toolBar.value === 'rad_weekSelect'){
        var date_day = Zeller(clickFullDate.getDate(), clickFullDate.getMonth() + 1, clickFullDate.getFullYear());
        toolFullDate.setDate(clickFullDate.getDate() - date_day);
        clickFullDate.setDate(clickFullDate.getDate() + 6 - date_day);   
      }
      if(toolBar.value === 'rad_monthBefore'){
        
        clickFullDate.setDate(clickFullDate.getDate() - 1);
        toolFullDate.setDate(1);
      }
      if(toolBar.value === 'rad_monthSelect'){
        toolFullDate.setDate(1);
        clickFullDate.setMonth(clickFullDate.getMonth()+1);
        clickFullDate.setDate(1);
        clickFullDate.setDate(clickFullDate.getDate()-1);
      }

    }      
  } 
}


function Zeller(D, M, Y){    
  var Day = "";

  if (M < 3)
  {
      M = M + 12;
      Y = Y - 1;
  }
  
  var C = Math.floor(Y / 100);
  var K = Y - (100 * C);

  var S = Math.floor(2.6 * M - 5.39) + Math.floor(K / 4) + Math.floor(C / 4) + D + K - (2 * C);

  var ans = S - (7 * Math.floor(S / 7));

  return ans;
}

