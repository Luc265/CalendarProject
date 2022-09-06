function drawTime(){
    
    const timeBody = document.querySelector(".body_time");
    let html = "";
    // Date cell creation
    for (i=0; i < 25; i++){
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
                <div class="background select"></div>
            </div>
            <div class="text-bottom-containt text-hide">${i}:30</div>
        </div>`
        html = html + htmlUnit;
    }
    timeBody.innerHTML = html;
}

function addEventHover(){
    const line = document.querySelectorAll(".time-unit");
    line.forEach(item =>{
        item.addEventListener("mouseenter", function(item){
            const textTop = item.target.querySelector(".text-top-containt");
            // const textBot = this.item.querySelector(".text-bottom-containt");
            const lineNonSelect = item.target.querySelector(".line.line-non-select");
            const lineSelect = item.target.querySelector(".line.line-select");

            if(lineNonSelect != undefined){
                lineNonSelect.classList.add("line-hover-non-select");
                lineNonSelect.classList.remove("line-non-select");
            }

            if(lineSelect != undefined){
                lineSelect.classList.add("line-hover-select");
                lineSelect.classList.remove("line-select");
            }
            
            textTop.classList.remove("text-hide");
            textTop.classList.add("text-display");
        })
        item.addEventListener("mouseleave", function(item){
            const textTop = item.target.querySelector(".text-top-containt");
            // const textBot = this.item.querySelector(".text-bottom-containt");
            const lineNonSelect = item.target.querySelector(".line.line-hover-non-select");
            const lineSelect = item.target.querySelector(".line.line-hover-select");

            if(lineNonSelect != undefined){
                lineNonSelect.classList.remove("line-hover-non-select");
                lineNonSelect.classList.add("line-non-select");
            }

            if(lineSelect != undefined){
                lineSelect.classList.remove("line-hover-select");
                lineSelect.classList.add("line-select");
            }

            textTop.classList.add("text-hide");
            textTop.classList.remove("text-display");
        })
        item.addEventListener("click", function(item){
            const textTop = item.target.querySelector(".text-top-containt");
            // const textBot = this.item.querySelector(".text-bottom-containt");
            // const line = this.item.querySelector(".line");
            textTop.classList.add("text-hide");
            textTop.classList.remove("text-display");
        })
    })
}
window.onload = function()
{
    drawTime();
    addEventHover();
};