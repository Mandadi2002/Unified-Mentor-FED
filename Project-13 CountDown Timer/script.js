let countdownInterval;

function startCountdown() {
    playSound(clickSound);
    playSound(ting.mp3);
    clearInterval(countdownInterval);
    playSound(startSound);
}

function stopCountdown() {
    playSound(clickSound);
    playSound(tingSound);
    clearInterval(countdownInterval);
    playSound(stopSound);
}

function clearCountdown() {
    playSound(clickSound);
    playSound(ting.mp3);
    clearInterval(countdownInterval);
    playSound(clearSound);
}

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => playSound(clickSound));
});

function startCountdown() {
    clearInterval(countdownInterval);

    const dateInput = document.getElementById("date").value;
    const hour = parseInt(document.getElementById("hour").value) || 0;
    const minute = parseInt(document.getElementById("minute").value) || 0;
    const second = parseInt(document.getElementById("second").value) || 0;

    const targetDate = new Date(`${dateInput}T${pad(hour)}:${pad(minute)}:${pad(second)}`);

    if (isNaN(targetDate.getTime()) || targetDate <= new Date()) {
        alert("Please enter a valid future date and time.");
        return;
    }

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            updateDisplay(0, 0, 0, 0);
            alert("Countdown finished!");
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateDisplay(days, hours, minutes, seconds);
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
}

function clearCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("date").value = "";
    document.getElementById("hour").value = "";
    document.getElementById("minute").value = "";
    document.getElementById("second").value = "";
    updateDisplay(0, 0, 0, 0);
}

function updateDisplay(d, h, m, s) {
    document.getElementById("days").innerText = pad(d);
    document.getElementById("hours").innerText = pad(h);
    document.getElementById("minutes").innerText = pad(m);
    document.getElementById("seconds").innerText = pad(s);
}

function pad(num) {
    return num < 10 ? "0" + num : num;
}




