/* smooth Scroll */
let navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
let interval;
for(let i = 0; i < navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click', function(event){
        event.preventDefault();
        let targetSectionID = this.textContent.trim().toLowerCase();
        let targetSection = document.getElementById(targetSectionID);
        interval = setInterval(scrollVertically, 20, targetSection);
    })
}
function scrollVertically(targetSection){
    let targetSectionCoordinates = targetSection.getBoundingClientRect();
    if(targetSectionCoordinates.top <= 0){
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 50);
}

/* AutoFill Bar */
let skillBars = document.querySelectorAll('.skill-item div');

function initializeWidth(bar){
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}
for(let bar of skillBars) {
    initializeWidth(bar);
}
function fillBar(bar){
    let level = bar.getAttribute('data-skill-level');
    let curr = 0;
    let id = setInterval(function(){
        if(curr > level){
            clearInterval(id);
            return;
        }
        curr++;
        bar.style.width = curr + '%';
    }, 8);
}
function checkScroll(){
    for(let bar of skillBars){
        let boxTop = bar.getBoundingClientRect();
        if((bar.getAttribute("data-visited") == "false") && 
            (boxTop.top <= (window.innerHeight - boxTop.height))){

            bar.setAttribute("data-visited", true);
            console.log('Y');
            fillBar(bar);
        }
        else if(boxTop.top > window.innerHeight){
            bar.setAttribute("data-visited", false);
            initializeWidth(bar);
        }
    }
}
window.addEventListener('scroll', checkScroll);