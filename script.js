/* ==========================================================
   DAYLA ISABELLA · XV AÑOS
   JAVASCRIPT
   ========================================================== */


/* ==========================================================
   CUENTA REGRESIVA
   ========================================================== */

const target =
    new Date(
        "2026-12-13T19:30:00-04:00"
    );


const days =
    document.getElementById("days");

const hours =
    document.getElementById("hours");

const minutes =
    document.getElementById("minutes");

const seconds =
    document.getElementById("seconds");


function twoDigits(number) {

    return String(number)
        .padStart(2, "0");

}


function tick() {

    const difference =
        target.getTime() -
        Date.now();


    if (difference <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        return;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const totalMinutes =
        Math.floor(
            totalSeconds / 60
        );


    const totalHours =
        Math.floor(
            totalMinutes / 60
        );


    const totalDays =
        Math.floor(
            totalHours / 24
        );


    const remainingHours =
        totalHours % 24;


    const remainingMinutes =
        totalMinutes % 60;


    const remainingSeconds =
        totalSeconds % 60;


    days.textContent =
        twoDigits(totalDays);


    hours.textContent =
        twoDigits(remainingHours);


    minutes.textContent =
        twoDigits(remainingMinutes);


    seconds.textContent =
        twoDigits(remainingSeconds);

}


tick();


setInterval(
    tick,
    1000
);


/* ==========================================================
   MÚSICA
   ========================================================== */

const bgMusic =
    document.getElementById(
        "bgMusic"
    );


const musicPlayer =
    document.getElementById(
        "musicPlayer"
    );


async function toggleMusic() {

    if (!bgMusic || !musicPlayer) {
        return;
    }


    try {

        if (bgMusic.paused) {

            await bgMusic.play();

            musicPlayer.classList.add(
                "playing"
            );

            musicPlayer.setAttribute(
                "aria-label",
                "Pausar música"
            );

        }

        else {

            bgMusic.pause();

            musicPlayer.classList.remove(
                "playing"
            );

            musicPlayer.setAttribute(
                "aria-label",
                "Reproducir música"
            );

        }

    }

    catch (error) {

        console.log(
            "No se pudo reproducir la música:",
            error
        );

    }

}


if (musicPlayer) {

    musicPlayer.addEventListener(
        "click",
        toggleMusic
    );


    musicPlayer.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                toggleMusic();

            }

        }
    );

}


if (bgMusic) {

    bgMusic.addEventListener(
        "ended",
        function() {

            musicPlayer.classList.remove(
                "playing"
            );

        }
    );

}