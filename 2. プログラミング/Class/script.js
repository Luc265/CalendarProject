// Date Calendar Component
function calendarComponent(name, width, height, attackTimeChart, OkCallback, returnCallback) {
  moment();
  this.timer;
  this.name = name;
  this.width = width;
  this.height = height;
  this.attackTimeChart = attackTimeChart;
  this.parent = document.querySelector("#" + name);

  // -Output------------------------
  this.startDate = moment('invalid date');
  this.endDate = moment('invalid date');
  this.startTime = moment('invalid date');
  this.endTime = moment('invalid date');
  this.OkCallback = OkCallback;
  this.returnCallback = returnCallback;
  // -Output------------------------

  this.refresh = function () {
    if (this.startDate.valueOf() == (new Date(null)).valueOf() || this.endDate.valueOf() == (new Date(null)).valueOf()) {
      this.startDate = moment('invalid date');
      this.endDate = moment('invalid date');
    } else {
      this.startDate = moment(this.startDate);
      this.endDate = moment(this.endDate);
    }
    this.reset();
  }

  this.addLib = function () {
    document.head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
                                <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
                                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
  }
  this.addHtml = function () {
    var htmlContent = "";
    const mes1 = "指定する日にちの範囲を選択してください。";
    const mes2 = "指定する時刻の範囲を選択してください。";
    htmlContent += `<div class="calendar-content calendar-show">
      <div class="calendar-section">
        <div class="calendar-sidebar">
          <p><b>Automatically renews</b></p>
          <br>
          <input class="radio" type="radio" id="rad_yesterday" name="mode_calendar" value="Yesterday">
          <label for="rad_yesterday">Yesterday</label>
          <br>
    
          <br>
          <input class="radio" type="radio" id="rad_weekBefore" name="mode_calendar" value="rad_weekBefore">
          <label for="rad_weekBefore">1 week until the day before</label>
          <br>
    
          <br>
          <input class="radio" type="radio" id="rad_weekSelect" name="mode_calendar" value="rad_weekSelect">
          <label for="rad_weekSelect">1 week including selection date</label>
          <br>
    
          <br>
          <input class="radio" type="radio" id="rad_monthBefore" name="mode_calendar" value="rad_monthBefore">
          <label for="rad_monthBefore">Month until the day before</label>
          <br>
    
          <br>
          <input class="radio" type="radio" id="rad_monthSelect" name="mode_calendar" value="rad_monthSelect">
          <label for="rad_monthSelect">Month including selection date</label>
          <br>
        </div>
    
        <div class="calendar-Date">
          <div id="id_startCalendar" class="calendar-widget default-today" data-next="#id_deadlineCalendar" date-min="today"
            tabindex="-1">
            <div class="input-wrapper">
              <div class="date-field"></div>
            </div>
            <div class="calendar-wrapper" style="display: block;">
              <div class="tabYear">
                <div class="leftYear year-hide">
                  <p> <b>2012</b></p>
                </div>
                <div class="centerYear year-show">
                  <p><b>2012</b></p>
                </div>
                <div class="rightYear year-hide">
                  <p><b>2012</b></p>
                </div>
              </div>
              <div class="dual-calendar">
                <div class="calendar">
                  <div class="calendar-header">
                    <div class="prev-btn move-btn-medium">
                      <i class="material-icons">keyboard_arrow_left</i>
                    </div>
    
                    <div class="month-text">
                      <p><b>September 2018</b></p>
                    </div>
                    <div class="month">
                      <p><b>September 2018</b></p>
                    </div>
                  </div>
                  <div class="calendar-body">
                    <div class="date-table">
                      <div class="date-table-header">
                        <div class="day sunday">S</div>
                        <div class="day">M</div>
                        <div class="day">T</div>
                        <div class="day">W</div>
                        <div class="day">T</div>
                        <div class="day">F</div>
                        <div class="day saturday">S</div>
                      </div>
                      <div class="date-table-body">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="calendar plus-one">
                  <div class="calendar-header">
                    <div class="month-text">
                      <p><b>September 2018</b></p>
                    </div>
                    <div class="month">
                      <p><b>September 2018</b></p>
                    </div>
    
                    <div class="next-btn move-btn-medium">
                      <i class="material-icons">keyboard_arrow_right</i>
                    </div>
                  </div>
                  <div class="calendar-body">
                    <div class="date-table">
                      <div class="date-table-header">
                        <div class="day sunday">S</div>
                        <div class="day">M</div>
                        <div class="day">T</div>
                        <div class="day">W</div>
                        <div class="day">T</div>
                        <div class="day">F</div>
                        <div class="day saturday">S</div>
                      </div>
                      <div class="date-table-body">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div class="calendar-footer">
        <div class="warning">
          <i class='bx bx-info-circle'></i>
          <span>${mes1}</span>
        </div>
        <div class="calendar_button">
          <button class="btn_Next_OK">Next</button>
          <button class="btn_Cancel">Cancel</button>
        </div>
      </div>
    
    </div>`
    if (this.attackTimeChart == true) {
      htmlContent += `<!-- 時間表示 -->
        <div class="time-content timechart-hide">
          <div class="time-section">
            <div class="time-tittle">

              <div class="prev-timebtn">
                <i class="material-icons">keyboard_arrow_left</i>
              </div>
              <div class="time-date">
                <p><b>3/4</b></p>
              </div>
              <div class="next-timebtn">
                <i class="material-icons">keyboard_arrow_right</i>
              </div>

            </div>
            <div class="time-main-content">
              <div class="horizol-line">
              </div>
              <div class="body_time">
              </div>
            </div>
          </div>
        
          <div class="calendar-footer">
            <div class="warning">
              <i class='bx bx-info-circle'></i>
              <span>${mes2}</span>
            </div>
            <div class="calendar_button">
              <button class="time_btn_Return">Return</button>
              <button class="time_btn_OK">OK</button>
            </div>
        
          </div>
        </div>`
    }

    const container = document.getElementById(this.name);
    console.log(container);
    container.innerHTML = htmlContent;
    // centerYear.style.width = offset_width.toString() + "%";
    const calendarContent = this.parent.querySelector(".calendar-content");
    calendarContent.style.width = this.width + "px";
    calendarContent.style.height = this.height + "px";
    if (this.attackTimeChart == true) {
      const timeContent = document.querySelector(".time-content");
      timeContent.style.width = this.width + "px";
      timeContent.style.height = this.height + "px";
    }
  }
  this.start = function () {
    var calendarComponent = this;

    // add library
    // this.addLib();
    // init UI
    this.addHtml();
    // add timeChart
    if (this.attackTimeChart == true) {
      var timeChart = new timeChartComponent(this)
      this.timeChart = timeChart;
      this.timeChart.start();
      this.timeChart.reLoad();
    }

    // Time variable queries.
    let today = new Date()
    // All the date should be a NUMBER type!!

    // Variable for storing the selected date data.
    let selDate, selMonth, selYear;

    const firstDate = moment('invalid date');

    let date_startPoint = moment('invalid date');
    let date_endPoint = moment('invalid date');

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

    // Element queries
    const calendarWidgets = calendarComponent.parent.querySelectorAll(".calendar-widget");
    let toolBars = calendarComponent.parent.querySelectorAll(".radio");
    const calendarContent = calendarComponent.parent.querySelector(".calendar-content");
    // const timeContent = document.querySelector(".time-content");

    this.reset = function () {
      date_startPoint = moment(calendarComponent.startDate);
      date_endPoint = moment(calendarComponent.endDate);

      calendarComponent.oldDateStartPoint = moment(calendarComponent.startDate);
      calendarComponent.oldDateEndPoint = moment(calendarComponent.endDate);
      reLoadForSelectCell();

      const btn_Next_OK = calendarComponent.parent.querySelector(".btn_Next_OK");
      if (calendarComponent.attackTimeChart == false) {
        btn_Next_OK.textContent = `OK`;
      }

      if (calendarComponent.startDate.isValid() && calendarComponent.endDate.isValid()) {
        btn_Next_OK.disabled = false;
      } else {
        btn_Next_OK.disabled = true;
      }
      if (calendarComponent.attackTimeChart == true) {
        calendarComponent.timeChart.refresh();
      }
    }

    // ==================================================================
    // _________________________ OBJECTS ________________________________
    // ==================================================================
    function updateOutputDate(_startDate, _endDate) {
      if (_startDate.isBefore(_endDate)) {
        calendarComponent.startDate = moment(_startDate);
        calendarComponent.endDate = moment(_endDate);
      } else {
        calendarComponent.endDate = moment(_startDate);
        calendarComponent.startDate = moment(_endDate);
      }
      const btn_Next_OK = calendarComponent.parent.querySelector(".btn_Next_OK");
      btn_Next_OK.disabled = false;
    }

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
      const cells = calendarComponent.parent.querySelectorAll(".date");
      cells.forEach(cell => {
        cell.classList.remove("range-normalmode");
        cell.classList.remove("range-selectmode");
      })
    }
    //currFullDate: End Point
    function highlightCellRange(currFullDate, calendar) {
      const cells = calendar.querySelectorAll(".date");

      clearSelCell();

      cells.forEach(cell => {
        let cellFullDate, _cellYear, cellYear, cellMonth, cellDate;

        if (!(cell.classList.contains("empty") || cell.classList.contains("disabled"))) {
          cellFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
          cellYear = cellFullDate[1];
          cellMonth = getMonthIndex(cellFullDate[0]);
          cellDate = Number(cell.querySelector(".date-text").textContent);
          cellFullDate = moment().set({ 'year': cellYear, 'month': cellMonth, 'date': cellDate });

          if ((cellFullDate.startOf('day') <= date_startPoint.startOf('day') && cellFullDate.startOf('day') >= currFullDate.startOf('day')) || (cellFullDate.startOf('day') >= date_startPoint.startOf('day') && cellFullDate.startOf('day') <= currFullDate.startOf('day'))) {
            if (checkmode == _mode.NormalMode) {
              cell.classList.add("range-normalmode");
            } else {
              cell.classList.add("range-selectmode");
            }
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
        leftYear = calendarComponent.parent.querySelector(".leftYear");
        rightYear = calendarComponent.parent.querySelector(".rightYear");
        centerYear = calendarComponent.parent.querySelector(".centerYear");
        if (monthIndex > 11) {
          year++;
          leftYearText = calendarComponent.parent.querySelector(".leftYear p");
          rightYearText = calendarComponent.parent.querySelector(".rightYear p");
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
                    const currYear = Number(currFullDate[1]);
                    const currMonth = getMonthIndex(currFullDate[0]);
                    const currDate = Number(cell.querySelector(".date-text").textContent);
                    currFullDate = moment().set({ 'year': currYear, 'month': currMonth, 'date': currDate })
                    highlightCellRange(currFullDate, calendar.closest(".dual-calendar"));
                    cell.classList.add("range-normalmode");
                  }
                })
              }

              cell.addEventListener("click", function (e) {
                let currFullDate = cell.closest(".calendar").querySelector(".month-text p").textContent.split(" ");
                const clickYear = Number(currFullDate[1]);
                const clickMonth = getMonthIndex(currFullDate[0]);
                const clickDate = Number(cell.querySelector(".date-text").textContent);
                date_endPoint = moment(date_startPoint);
                date_startPoint = moment().set({ 'year': clickYear, 'month': clickMonth, 'date': clickDate });
                updateOutputDate(date_endPoint, date_startPoint);

                if (mouseClick == false) {
                  clearSelCell();
                }

                if (checkmode == _mode.SelectMode) {
                  toolBars.forEach(toolBar => {
                    toolBar.checked = false;
                  })
                  checkmode = _mode.NormalMode;
                }

                mouseClick = !mouseClick
                cell.classList.add("range-normalmode");
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

    var eventClickButton = function () {
      const btnCancel = calendarComponent.parent.querySelector(".btn_Cancel");
      const btnNext_OK = calendarComponent.parent.querySelector(".btn_Next_OK");

      btnCancel.returnCallback = this.returnCallback;
      btnCancel.addEventListener("click", function (e) {
        if (firstDate.toString() != calendarComponent.oldDateStartPoint.toString() && firstDate.toString() != calendarComponent.oldDateEndPoint.toString()) {
          calendarComponent.startDate = moment(calendarComponent.oldDateStartPoint);
          calendarComponent.endDate = moment(calendarComponent.oldDateEndPoint);
        }
        if (checkmode == _mode.SelectMode) {
          toolBars.forEach(toolBar => {
            toolBar.checked = false;
          })
          checkmode = _mode.NormalMode;
        }
        this.returnCallback();
      });

      btnNext_OK.attackTimeChart = this.attackTimeChart;
      btnNext_OK.OkCallback = this.OkCallback;
      btnNext_OK.addEventListener("click", function (e) {
        if (this.attackTimeChart == true) {
          calendarContent.classList.remove("calendar-show");
          calendarContent.classList.add("calendar-hide");
          const timeContent = calendarComponent.parent.querySelector(".time-content");
          timeChart.refresh();
          timeContent.classList.remove("timechart-hide");
          timeContent.classList.remove("timechart-show");
        } else {
          calendarComponent.startDate = calendarComponent.startDate.toDate();
          calendarComponent.endDate = calendarComponent.endDate.toDate();
          this.OkCallback();
        }
      }, false)
    }
    this.eventClickButton = eventClickButton;

    function windowResize() {
      const sidebar = calendarComponent.parent.querySelector(".calendar-sidebar");
      const section = calendarComponent.parent.querySelector(".dual-calendar");
      var offset_width = sidebar.offsetWidth + section.offsetWidth;

      calendarContentWidth = calendarContent.offsetWidth;
      calendarContentHeight = calendarContent.offsetHeight;
      // small
      if (calendarContentWidth < 700 || calendarContentHeight < 400) {
        const moveBtns = calendarComponent.parent.querySelectorAll(".prev-btn,.next-btn");
        const moveTimeBtns = calendarComponent.parent.querySelectorAll(".prev-timebtn, .next-timebtn");
        moveBtns.forEach(btn => {
          btn.classList.remove("move-btn-medium");
          btn.classList.remove("move-btn-big");
          btn.classList.add("move-btn-small");
        });
        moveTimeBtns.forEach(btn => {
          btn.classList.remove("move-timebtn-medium");
          btn.classList.remove("move-timebtn-big");
          btn.classList.add("move-timebtn-small");
        });
      } else {
        const moveBtns = calendarComponent.parent.querySelectorAll(".prev-btn,.next-btn");
        const moveTimeBtns = calendarComponent.parent.querySelectorAll(".prev-timebtn, .next-timebtn");
        moveBtns.forEach(btn => {
          btn.classList.remove("move-btn-small");
          btn.classList.remove("move-btn-big");
          btn.classList.add("move-btn-medium");
        });
        moveBtns.forEach(btn => {
          btn.classList.remove("move-timebtn-small");
          btn.classList.remove("move-timebtn-big");
          btn.classList.add("move-timebtn-medium");
        });
      }
    }

    function eventModeSelect(toolBars, calendar) {
      toolBars.forEach(toolBar => {
        toolBar.addEventListener("click", function (e) {
          mouseClick = false;
          checkmode = _mode.SelectMode;
          clearSelCell();
          checkModeSelect(toolBar, calendar);
          updateOutputDate(date_endPoint, date_startPoint);
          reLoadForSelectCell();
          highlightCellRange(date_endPoint, calendar.closest(".dual-calendar"));

          mouseClick = false;
        })
      })
    };

    function checkModeSelect(toolBar, calendar) {
      if (toolBar.checked) {
        checkmode = _mode.SelectMode;
      } else {
        checkmode = _mode.NormalMode;
      }
      if (checkmode == _mode.SelectMode) {
        const btn_Next_OK = calendarComponent.parent.querySelector(".btn_Next_OK");
        btn_Next_OK.disabled = true;
        date_startPoint = moment();
        if (toolBar.value === 'Yesterday') {
          date_startPoint.add(-1, 'days');
          date_endPoint = moment(date_startPoint);
        }
        if (toolBar.value === 'rad_weekBefore') {
          date_endPoint = moment(date_startPoint).add(-6, 'days')
        }
        if (toolBar.value === 'rad_weekSelect') {
          date_startPoint.startOf('week');
          date_endPoint = moment(date_startPoint).endOf('week');
        }
        if (toolBar.value === 'rad_monthBefore') {
          date_endPoint = moment(date_startPoint).startOf('month');
        }
        if (toolBar.value === 'rad_monthSelect') {
          date_endPoint = moment(date_startPoint).endOf('month');
          date_startPoint.startOf('month');
        }
      }
    }

    function reLoadForSelectCell() {
      if (date_startPoint.isValid()) {
        currMonth = new Month(calendarComponent.startDate.get('month'));
        currYear = calendarComponent.startDate.get('year');
      }

      calendarWidgets.forEach(widget => {
        const dateField = widget.querySelector(".date-field");
        const calendarWrapper = widget.querySelector(".calendar-wrapper");
        const calendars = calendarWrapper.querySelectorAll(".calendar");

        calendarWrapper.style.display = 'block';
        widget.classList.add("active");
        widget.setAttribute("data-active", "true");
        dateField.classList.add("active");

        calendars.forEach(calendar => {
          clearTable(calendar);
          drawTable(calendar);
          if (date_startPoint.toString() !== firstDate.toString()) { //新規状態ではないチェック
            highlightCellRange(date_endPoint, calendar.closest(".dual-calendar"));
          }
        })
      });
    }

    // ==================================================================
    // ________________________ LISTENERS _______________________________
    // ==================================================================
    calendarWidgets.forEach(widget => {
      // If the widget has the "default-today" class, sets its value to today's date.
      const dateField = widget.querySelector(".date-field");

      if (widget.classList.contains("default-today")) {
        dateField.readonly = false;
        dateField.value = `${currDate} ${thisMonth.longName} ${thisYear}`;
        dateField.readonly = true;
      }

      toggleCalendar(widget);

      const section = calendarComponent.parent.querySelector(".dual-calendar");
      eventModeSelect(toolBars, section);
      this.eventClickButton();
      windowResize();
    });
  }
}

// Time chart component
function timeChartComponent(calendarComponent) {
  this.parent = calendarComponent.parent;
  this.reLoad = function () {
    this.drawTime();
    this.addEventHover();
    this.eventClickTimeButton();
  }
  this.refresh = function () {
    if (calendarComponent.startTime.valueOf() == (new Date(null)).valueOf() || calendarComponent.endTime.valueOf() == (new Date(null)).valueOf()) {
      calendarComponent.startTime = moment('invalid date');
      calendarComponent.endTime = moment('invalid date');
    } else {
      calendarComponent.startTime = moment(calendarComponent.startTime);
      calendarComponent.endTime = moment(calendarComponent.endTime);
    }
    this.reset();
  }
  this.start = function () {
    var timeChartComponent = this;
    var orgPoint_Time = moment('invalid date');
    var endPoint_Time = moment('invalid date');
    let originPoint_Line;
    let originPoint_TextBot;
    let endPoint_Line;
    let endPoint_TextBot;

    // =======================================
    // _____________ FUNCTIONS _______________
    // =======================================

    function updateOutputTime(_startTime, _endTime) {
      if (_startTime.isValid() && _endTime.isValid()) {
        calendarComponent.startTime = _startTime.toDate();
        calendarComponent.endTime = _endTime.toDate();
      } else {
        calendarComponent.startTime = new date(null);
        calendarComponent.endTime = new date(null);
      }
    }

    this.reset = function () {
      orgPoint_Time = moment(calendarComponent.startTime);
      endPoint_Time = moment(calendarComponent.endTime);
      updateInforTimeRange(calendarComponent.startTime, calendarComponent.endTime);
      clearTimeChart();
      const time_btnOK = timeChartComponent.parent.querySelector(".time_btn_OK");
      if (!orgPoint_Time.isValid() || !endPoint_Time.isValid()) {
        time_btnOK.disabled = true;
      }
      const next_TimeBtn = timeChartComponent.parent.querySelector(".next-timebtn");
      const prev_TimeBtn = timeChartComponent.parent.querySelector(".prev-timebtn");
      next_TimeBtn.classList.remove("btn-disabled");
      prev_TimeBtn.classList.add("btn-disabled");
      let timeTittle = timeContent.querySelector(".time-date p");
      timeTittle.textContent = `開始:${(calendarComponent.startDate.get('month') + 1).toString()} - ${calendarComponent.startDate.get('date').toString()}`;
      highlightTimeRange();
    }

    const timeContent = timeChartComponent.parent.querySelector(".time-content");

    var drawTime = function () {
      const timeBody = timeChartComponent.parent.querySelector(".body_time");
      let html = "";
      // Date cell creation
      for (i = 0; i < 25; i++) {
        if (i != 24) {
          let htmlUnit = `<div class="time-unit">
            <div class="text-top-containt text-hide"><b>${i}:00</b></div>
            <div class="verical-line-containt"> 
                <div class="line hour-line line-non-select">
      
                </div>
                <div class="background non-select"></div>
            </div>
            <div class="text-bottom-containt">${i}:00</div>
            </div>   
            <div class="time-unit">
                <div class="text-top-containt text-hide"><b>${i}:30</b></div>
                <div class="verical-line-containt"> 
                    <div class="line minute-line line-non-select">
        
                    </div>
                    <div class="background non-select"></div>
                </div>
                <div class="text-bottom-containt text-hide">${i}:30</div>
            </div>`
          html = html + htmlUnit;
        } else {
          let htmlUnit = `<div class="time-unit">
            <div class="text-top-containt text-hide"><b>${i}:00</b></div>
            <div class="verical-line-containt"> 
                <div class="line hour-line line-non-select">
      
                </div>
                <div class="background non-select"></div>
            </div>
            <div class="text-bottom-containt">${i}:00</div>
            </div>`
          html = html + htmlUnit;
        }
        timeBody.innerHTML = html;
      }
    }
    // this.drawTime = drawTime();
    this.drawTime = function () {
      drawTime();
    }

    var addEventHover = function () {
      const line = timeChartComponent.parent.querySelectorAll(".time-unit");

      line.forEach(item => {
        item.addEventListener("mouseenter", function (item) {
          const textTop = item.target.querySelector(".text-top-containt");
          // const textBot = this.item.querySelector(".text-bottom-containt");
          const lineNonSelect = item.target.querySelector(".line.line-non-select");
          const lineSelect = item.target.querySelector(".line.line-select");

          if (lineNonSelect != undefined) {
            lineNonSelect.classList.add("line-hover-non-select");
            lineNonSelect.classList.remove("line-non-select");
          }

          if (lineSelect != undefined) {
            lineSelect.classList.add("line-hover-select");
            lineSelect.classList.remove("line-select");
          }

          textTop.classList.remove("text-hide");
          textTop.classList.add("text-display");
        })

        item.addEventListener("mouseleave", function (item) {
          const textTop = item.target.querySelector(".text-top-containt");
          const lineNonSelect = item.target.querySelector(".line.line-hover-non-select");
          const lineSelect = item.target.querySelector(".line.line-hover-select");

          if (lineNonSelect != undefined) {
            lineNonSelect.classList.remove("line-hover-non-select");
            lineNonSelect.classList.add("line-non-select");
          }

          if (lineSelect != undefined) {
            lineSelect.classList.remove("line-hover-select");
            lineSelect.classList.add("line-select");
          }

          textTop.classList.add("text-hide");
          textTop.classList.remove("text-display");
        })

        item.addEventListener("click", function (item) {
          const timeChart = item.currentTarget.closest(".body_time");
          const timeChart_Unit = timeChart.querySelectorAll(".time-unit");
          //全てのラインとテキストボトムの色をクリア
          timeChart_Unit.forEach(Item => {
            const line = Item.querySelector(".line");
            const lineSelect = Item.querySelector(".line.line-select");
            const textBottom = Item.querySelector(".text-bottom-containt");
            const select_TextBot = Item.querySelector(".text-bottom-containt.text-select");
            if (lineSelect != undefined) {
              line.classList.remove("line-select");
              line.classList.add("line-non-select");
            }
            if (select_TextBot != undefined) {
              textBottom.classList.remove("text-select");
            }
          })

          let originTime = item.currentTarget.querySelector(".text-bottom-containt").textContent.split(":");
          const textTop = item.currentTarget.querySelector(".text-top-containt");
          const textBot = item.currentTarget.querySelector(".text-bottom-containt");
          const line = item.currentTarget.querySelector(".line");
          textTop.classList.remove("text-display");
          textTop.classList.add("text-hide");
          textBot.classList.add("text-select");
          line.classList.remove("line-hover-non-select");

          const firstTimeText = timeChartComponent.parent.querySelector(".time-date p").textContent.split(":");
          const time_date = firstTimeText[1].split(" - ");
          if ((calendarComponent.startDate.get('month') + 1).toString() == time_date[0] && calendarComponent.startDate.get('date').toString() == time_date[1] && firstTimeText[0] == "開始") {
            orgPoint_Time = moment(calendarComponent.startDate);
            orgPoint_Time.set({ 'hour': Number(originTime[0]), 'minute': Number(originTime[1]) });
            originPoint_Line = item.currentTarget.querySelector(".line");
            originPoint_TextBot = item.currentTarget.querySelector(".text-bottom-containt");
            highlightTimeRange();
          }
          if ((calendarComponent.endDate.get('month') + 1).toString() == time_date[0] && calendarComponent.endDate.get('date').toString() == time_date[1] && firstTimeText[0] == "終了") {
            endPoint_Time = moment(calendarComponent.endDate);
            endPoint_Time.set({ 'hour': originTime[0], 'minute': originTime[1] });
            endPoint_Line = item.currentTarget.querySelector(".line");
            endPoint_TextBot = item.currentTarget.querySelector(".text-bottom-containt");
            highlightTimeRange();
          }
        })
      })
    }

    this.addEventHover = function () {
      addEventHover();
    }

    function clearTimeChart() {
      const timeList = timeChartComponent.parent.querySelectorAll(".time-unit");
      //背景色のクリア
      timeList.forEach(_time => {
        const time = _time.querySelector(".background");
        const line = _time.querySelector(".line");
        const textBottom = _time.querySelector(".text-bottom-containt");
        time.classList.remove("select");
        time.classList.add("non-select");
        line.classList.remove("line-select");
        line.classList.add("line-non-select");
        textBottom.classList.remove("text-select");
      });
    }
    //時間の範囲マーク
    function highlightTimeRange() {
      clearTimeChart();
      const firstTimeText = timeChartComponent.parent.querySelector(".time-date p").textContent.split(":");
      const time_date = firstTimeText[1].split(" - ");
      if (firstTimeText[0] == "開始" && originPoint_Line != undefined) {
        originPoint_Line.classList.remove("line-non-select");
        originPoint_Line.classList.add("line-select");
        originPoint_TextBot.classList.add("text-select");
      }
      if (firstTimeText[0] == "終了" && endPoint_Line != undefined) {
        endPoint_Line.classList.remove("line-non-select");
        endPoint_Line.classList.add("line-select");
        endPoint_TextBot.classList.add("text-select");
      }
    }

    function updateInforTimeRange(startTime, endTime) {
      const timeInfor = timeChartComponent.parent.querySelectorAll(".time-unit");
      if (startTime.isValid() && endTime.isValid()) {
        timeInfor.forEach(item => {
          let textBottom = item.querySelector(".text-bottom-containt").textContent.split(":");
          if (textBottom[0] == startTime.get('hour') && textBottom[1] == startTime.get('minute')) {
            originPoint_Line = item.querySelector(".line");
            originPoint_TextBot = item.querySelector(".text-bottom-containt");
          }
          if (textBottom[0] == endTime.get('hour') && textBottom[1] == endTime.get('minute')) {
            endPoint_Line = item.querySelector(".line");
            endPoint_TextBot = item.querySelector(".text-bottom-containt");
          }
        });
      } else {
        originPoint_Line = undefined;
        originPoint_TextBot = undefined;
        endPoint_Line = undefined;
        endPoint_TextBot = undefined;
      }
    }

    function nextDay(e) {
      changeDay(e, e.currentTarget.closest(".time-content"), "next");
    }

    function prevDay(e) {
      changeDay(e, e.currentTarget.closest(".time-content"), "prev");
    }

    function changeDay(e, timechart, direction) {
      const time_date = timechart.querySelector(".time-date p");

      if (direction === "next") {
        time_date.textContent = `終了:${(calendarComponent.endDate.get('month') + 1).toString()} - ${calendarComponent.endDate.get('date').toString()}`
      } else {
        time_date.textContent = `開始:${(calendarComponent.startDate.get('month') + 1).toString()} - ${calendarComponent.startDate.get('date').toString()}`
      }
      const firstTimeText = time_date.textContent.split(":");
      const time_dateText = firstTimeText[1].split(" - ");
      const next_TimeBtn = timeChartComponent.parent.querySelector(".next-timebtn");
      const prev_TimeBtn = timeChartComponent.parent.querySelector(".prev-timebtn");
      if (calendarComponent.startDate != "" && calendarComponent.endDate != "") {
        if (firstTimeText[0] == "開始") {
          next_TimeBtn.classList.remove("btn-disabled");
          prev_TimeBtn.classList.add("btn-disabled");
        }
        if (firstTimeText[0] == "終了") {
          prev_TimeBtn.classList.remove("btn-disabled");
          next_TimeBtn.classList.add("btn-disabled");
        }
      }
      highlightTimeRange();
    }

    var eventClickTimeButton = function () {
      const time_btnOK = timeChartComponent.parent.querySelector(".time_btn_OK");
      const time_btnReturn = timeChartComponent.parent.querySelector(".time_btn_Return");
      const calendarContent = timeChartComponent.parent.querySelector(".calendar-content");

      time_btnOK.addEventListener("click", function (e) {
        updateOutputTime(orgPoint_Time, endPoint_Time);
        calendarComponent.startDate = calendarComponent.startDate.toDate();
        calendarComponent.endDate = calendarComponent.endDate.toDate();
        calendarComponent.OkCallback();
        timeContent.classList.remove("timechart-show");
        timeContent.classList.add("timechart-hide");
        calendarContent.classList.remove("calendar-hide");
        calendarContent.classList.add("calendar-show");
      })
      time_btnReturn.addEventListener("click", function (e) {
        timeContent.classList.remove("timechart-show");
        timeContent.classList.add("timechart-hide");
        calendarContent.classList.remove("calendar-hide");
        calendarContent.classList.add("calendar-show");
      })

      const next_TimeBtn = timeChartComponent.parent.querySelector(".next-timebtn");
      const prev_TimeBtn = timeChartComponent.parent.querySelector(".prev-timebtn");

      next_TimeBtn.addEventListener("click", nextDay);
      prev_TimeBtn.addEventListener("click", prevDay);
    }
    this.eventClickTimeButton = function () {
      eventClickTimeButton();
    }

    // ==================================================================
    // ________________________ LISTENERS _______________________________
    // ==================================================================
    setInterval(function () {
      if (calendarComponent.startDate instanceof moment || calendarComponent.endDate instanceof moment) {
        if (orgPoint_Time.isValid() && endPoint_Time.isValid() && calendarComponent.startDate.isValid() && calendarComponent.endDate.isValid()) {
          const time_btnOK = timeChartComponent.parent.querySelector(".time_btn_OK");
          time_btnOK.disabled = false;
        }
      } else {
        return;
      }
    }, 20)
  }
}

  // Only 1 time chart component
  // function oneTimechartComponent(calendarComponent) {

  // }
