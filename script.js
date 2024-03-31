document.getElementById('studyForm').addEventListener('submit', function(event) {
    // prevent form submit
    event.preventDefault();

    // start study animation
    animateStudy();
});

async function animateStudy(){
    // hide button
    document.getElementById("controlButton").style.display = "none";

    // get form content
    const [cyclesNumber, studyTime, restTime] = getFormContent();

    for(var i = 0; i < cyclesNumber; i++){
        // work animation
        startWorkingAnimations(studyTime*60);
        await startTimer(studyTime, "Working");

        // rest animation
        stopWorkingAnimations(restTime*60);
        await startTimer(restTime, "Resting");
    }

    // show button
    document.getElementById("controlButton").style.display = "block";
}

function getFormContent(){
    const cyclesNumber = parseInt(document.getElementById('cyclesNumber').value, 10);
    const studyTime = parseInt(document.getElementById('studyTime').value, 10);
    const restTime = parseInt(document.getElementById('restTime').value, 10);
    return [cyclesNumber, studyTime, restTime]
}

function startWorkingAnimations(dayLength){
    // make ant and tomato move accross animation area
    document.getElementById("ant").style.animation = "antAnimation 30s infinite cubic-bezier(0.1, 0.6, 0.7, 0.2)";
    document.getElementById("tomato").style.animation = "tomatoAnimation 30s infinite cubic-bezier(0.1, 0.6, 0.7, 0.2)";

    // animation to darken environment
    document.getElementById("darkener").style.animation = "sunsetAnimation " + dayLength + "s ease-in-out";
    document.getElementById("darkener").style.animationFillMode = "forwards";
}

function stopWorkingAnimations(nightLength){
    // stop ant ant tomato animation
    document.getElementById("ant").style.animation = "";
    document.getElementById("tomato").style.animation = "";

    // animation to lighten environment
    document.getElementById("darkener").style.animation = "sunriseAnimation " + nightLength + "s ease-in-out";
    document.getElementById("darkener").style.animationFillMode = "";
}

function startTimer(minutes, activity) {
    return new Promise(resolve => {
        timerElement = document.getElementById("timerDisplay");
        activityElement = document.getElementById("activity");
        activityElement.textContent = activity;

        let seconds = minutes * 60;

        let timerInterval = setInterval(function() {
            seconds--;
            let remainingMinutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;
            
            if (seconds < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "00:00";
                activityElement.textContent = "Waiting";
                resolve();
            } else {
                timerElement.textContent = `${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
            }
        }, 1000);
    });
}