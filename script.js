/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const CONFIG = {

  eventDate: "2026-12-13T19:30:00-04:00",

  whatsappUrl:
    "https://wa.me/18297252021?text=Hola%20Dianibel%2C%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20Dayla%20Isabella.%20Mi%20nombre%20es%3A%20"

};


/* =========================================================
   ELEMENTOS
   ========================================================= */

const cover =
  document.getElementById("cover");

const invitation =
  document.getElementById("invitation");

const openInvitation =
  document.getElementById("openInvitation");

const musicButton =
  document.getElementById("musicButton");

const backgroundMusic =
  document.getElementById("backgroundMusic");

const days =
  document.getElementById("days");

const hours =
  document.getElementById("hours");

const minutes =
  document.getElementById("minutes");

const seconds =
  document.getElementById("seconds");


/* =========================================================
   ABRIR INVITACIÓN
   ========================================================= */

function openInvitationPage() {

  if (!cover || !invitation) {
    return;
  }

  cover.classList.add("hidden");

  invitation.classList.add("visible");

  document.body.classList.remove("locked");

  /*
   * Intentamos comenzar la música.
   * Como el usuario acaba de hacer clic,
   * el navegador normalmente permite reproducirla.
   */

  if (backgroundMusic) {

    backgroundMusic.volume = 0.45;

    const playPromise =
      backgroundMusic.play();

    if (playPromise !== undefined) {

      playPromise
        .then(() => {
          setMusicState(true);
        })
        .catch(() => {
          setMusicState(false);
        });

    }

  }

  /*
   * Activamos el botón de música.
   */

  if (musicButton) {
    musicButton.classList.add("visible");
  }

  /*
   * Mostramos inicialmente la primera sección.
   */

  const firstReveal =
    document.querySelector(".reveal-section");

  if (firstReveal) {
    firstReveal.classList.add("visible");
  }

}


if (openInvitation) {

  openInvitation.addEventListener(
    "click",
    openInvitationPage
  );

}


/* =========================================
   MÚSICA
   ========================================= */

const bgMusic = document.getElementById("bgMusic");
const musicPlayer = document.getElementById("musicPlayer");

if (bgMusic && musicPlayer) {

  musicPlayer.addEventListener("click", async () => {

    try {

      if (bgMusic.paused) {
        await bgMusic.play();
        musicPlayer.classList.add("playing");
      } else {
        bgMusic.pause();
        musicPlayer.classList.remove("playing");
      }

    } catch (error) {
      console.log("No se pudo reproducir la música:", error);
    }

  });

  bgMusic.addEventListener("ended", () => {
    musicPlayer.classList.remove("playing");
  });

}


/* =========================================================
   ANIMACIÓN AL HACER SCROLL
   ========================================================= */

const revealSections =
  document.querySelectorAll(
    ".reveal-section"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealSections.forEach((section) => {

  revealObserver.observe(section);

});


/* =========================================================
   CUENTA REGRESIVA
   ========================================================= */

const targetDate =
  new Date(CONFIG.eventDate);


function updateCountdown() {

  const now =
    new Date();

  let difference =
    targetDate.getTime() -
    now.getTime();


  /*
   * Cuando la fecha llega,
   * dejamos todo en cero.
   */

  if (difference < 0) {
    difference = 0;
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


  if (days) {

    days.textContent =
      String(totalDays);

  }


  if (hours) {

    hours.textContent =
      String(
        remainingHours
      ).padStart(2, "0");

  }


  if (minutes) {

    minutes.textContent =
      String(
        remainingMinutes
      ).padStart(2, "0");

  }


  if (seconds) {

    seconds.textContent =
      String(
        remainingSeconds
      ).padStart(2, "0");

  }

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   EFECTO SUTIL EN LOS LAZOS
   ========================================================= */

const bows =
  document.querySelectorAll(
    ".bow-image"
  );


let ticking = false;


function updateBowParallax() {

  const scrollY =
    window.scrollY || 0;


  bows.forEach((bow, index) => {

    const rect =
      bow.getBoundingClientRect();


    /*
     * Solo aplicamos el movimiento
     * cuando el elemento está cerca
     * de la zona visible.
     */

    if (
      rect.bottom > 0 &&
      rect.top < window.innerHeight
    ) {

      const center =
        rect.top +
        rect.height / 2;

      const distance =
        center -
        window.innerHeight / 2;

      const movement =
        Math.max(
          -6,
          Math.min(
            6,
            -distance * 0.015
          )
        );


      /*
       * El lazo de portada tiene
       * su propia animación y no
       * entra en este efecto.
       */

      if (
        !bow.classList.contains(
          "cover__bow"
        )
      ) {

        bow.style.transform =
          `translateY(${movement}px)`;

      }

    }

  });


  ticking = false;

}


window.addEventListener(
  "scroll",
  () => {

    if (!ticking) {

      window.requestAnimationFrame(
        updateBowParallax
      );

      ticking = true;

    }

  },
  {
    passive: true
  }
);


/* =========================================================
   PEQUEÑO EFECTO AL MOVER EL MOUSE
   ========================================================= */

const coverContent =
  document.querySelector(
    ".cover__content"
  );


if (
  coverContent &&
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  document.addEventListener(
    "mousemove",
    (event) => {

      if (
        !cover ||
        cover.classList.contains(
          "hidden"
        )
      ) {
        return;
      }


      const x =
        (event.clientX /
          window.innerWidth -
          0.5) * 8;


      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 6;


      coverContent.style.transform =
        `translate(${x}px, ${y}px)`;

    }
  );

}


/* =========================================================
   PREVENIR REPRODUCCIÓN AUTOMÁTICA ANTES DE ABRIR
   ========================================================= */

if (backgroundMusic) {

  backgroundMusic.pause();

}


/* =========================================================
   ESTADO INICIAL
   ========================================================= */

if (invitation) {

  invitation.classList.remove(
    "visible"
  );

}


if (cover) {

  cover.classList.remove(
    "hidden"
  );

}


if (musicButton) {

  musicButton.classList.remove(
    "visible"
  );

}
