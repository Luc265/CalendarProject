const orgPoint_Time = new Date(null);
const endPoint_Time = new Date(null);
let originPoint;
let originPoint_textBot;

function drawTime() {
    const timeBody = document.querySelector(".body_time");
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
    }
    timeBody.innerHTML = html;
}

function addEventHover() {
    const line = document.querySelectorAll(".time-unit");

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
            var luc = orgPoint_Time.valueOf();
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
            //????????????????????????????????????????????????????????????
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

            //???????????????????????????
            if (orgPoint_Time.valueOf() == 0) {
                orgPoint_Time.setHours(originTime[0]);
                orgPoint_Time.setMinutes(originTime[1]);
                line.classList.add("line-select");
                originPoint = item.currentTarget.querySelector(".line");
                originPoint_textBot = item.currentTarget.querySelector(".text-bottom-containt");
            }
            //??????????????????????????????
            if (orgPoint_Time.valueOf() != 0) {
                originPoint.classList.remove("line-non-select");
                originPoint.classList.add("line-select");
                line.classList.remove("line-non-select");
                line.classList.add("line-select");
                originPoint_textBot.classList.add("text-select");
                if (originTime[0] == 24) {
                    endPoint_Time.setHours(23);
                    endPoint_Time.setMinutes(59);
                } else {
                    endPoint_Time.setHours(originTime[0]);
                    endPoint_Time.setMinutes(originTime[1]);
                }
                highlightTimeRange(endPoint_Time, item);
            }
        })
    })
}
//????????????????????????
function highlightTimeRange(endPoint_Time, item) {
    const timeChart = item.currentTarget.closest(".body_time");
    const timeList = timeChart.querySelectorAll(".time-unit");
    //?????????????????????
    timeList.forEach(_time => {
        const time = _time.querySelector(".background")
        time.classList.remove("select");
        time.classList.add("non-select");
    });
    //??????????????????
    timeList.forEach(_time => {
        let _Time = _time.querySelector(".text-bottom-containt").textContent.split(":");
        let Time = new Date(null);
        Time.setHours(_Time[0]);
        Time.setMinutes(_Time[1]);
        if (Time >= orgPoint_Time && Time < endPoint_Time || Time < orgPoint_Time && Time >= endPoint_Time) {
            const time = _time.querySelector(".background")
            time.classList.remove("non-select");
            time.classList.add("select");
        }
    });
}

window.onload = function () {
    drawTime();
    addEventHover();
};