
/* =========================================================
   MAJD L'ARTISTE — PREMIUM BARBER SHOP
   SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   01 — PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 500);

    }

});


/* =========================================================
   02 — AOS ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 850,

            easing: "ease-out-cubic",

            once: true,

            offset: 80,

            delay: 0

        });

    }

});


/* =========================================================
   03 — NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================================
   04 — MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        mobileNav.classList.toggle("open");

    });


    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            mobileNav.classList.remove("open");

        });

    });

}


/* =========================================================
   05 — ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".desktop-nav .nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   06 — BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================================
   07 — HERO VIDEO
========================================================= */

const heroVideo =
    document.querySelector(".hero-video");

if (heroVideo) {

    heroVideo.muted = true;

    const playVideo = () => {

        const promise =
            heroVideo.play();

        if (promise !== undefined) {

            promise.catch(() => {

                console.log(
                    "Hero video autoplay blocked."
                );

            });

        }

    };

    playVideo();

}


/* =========================================================
   08 — GALLERY FILTERS
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const galleryItems =
    document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        /* Active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter items */

        galleryItems.forEach(item => {

            const category =
                item.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                item.style.display = "block";

                setTimeout(() => {

                    item.style.opacity = "1";

                    item.style.transform =
                        "scale(1)";

                }, 20);

            } else {

                item.style.opacity = "0";

                item.style.transform =
                    "scale(0.92)";

                setTimeout(() => {

                    item.style.display = "none";

                }, 250);

            }

        });

    });

});


/* =========================================================
   09 — GALLERY VIDEO PREVIEW
========================================================= */

const galleryVideos =
    document.querySelectorAll(
        ".gallery-item video"
    );

galleryVideos.forEach(video => {

    const item =
        video.closest(".gallery-item");


    item.addEventListener("mouseenter", () => {

        video.play().catch(() => {});

    });


    item.addEventListener("mouseleave", () => {

        video.pause();

        video.currentTime = 0;

    });

});


/* =========================================================
   10 — LIGHTBOX
========================================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxContent =
    document.getElementById("lightboxContent");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


let currentGalleryIndex = 0;


/*
    نأخذ فقط عناصر المعرض التي تحتوي
    على صورة أو فيديو.
*/

function getVisibleGalleryItems() {

    return Array.from(
        document.querySelectorAll(
            ".gallery-item"
        )
    ).filter(item => {

        return item.style.display !== "none";

    });

}


/* Open lightbox */

function openLightbox(index) {

    const items =
        getVisibleGalleryItems();

    if (!items.length) return;

    if (index < 0) {

        index = items.length - 1;

    }

    if (index >= items.length) {

        index = 0;

    }

    currentGalleryIndex = index;


    const item =
        items[currentGalleryIndex];

    const image =
        item.querySelector("img");

    const video =
        item.querySelector("video");


    lightboxContent.innerHTML = "";


    if (image) {

        const newImage =
            document.createElement("img");

        newImage.src =
            image.src;

        newImage.alt =
            image.alt || "Majd L'artiste";

        lightboxContent.appendChild(
            newImage
        );

    }


    if (video) {

        const newVideo =
            document.createElement("video");

        newVideo.controls = true;

        newVideo.autoplay = true;

        newVideo.playsInline = true;

        newVideo.src =
            video.querySelector("source")?.src ||
            video.currentSrc ||
            video.src;

        lightboxContent.appendChild(
            newVideo
        );

    }


    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* Gallery click */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        const visibleItems =
            getVisibleGalleryItems();

        const visibleIndex =
            visibleItems.indexOf(item);

        openLightbox(
            visibleIndex >= 0
                ? visibleIndex
                : index
        );

    });

});


/* Close */

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    lightboxContent.innerHTML = "";

}

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* Previous */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        () => {

            openLightbox(
                currentGalleryIndex - 1
            );

        }
    );

}


/* Next */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        () => {

            openLightbox(
                currentGalleryIndex + 1
            );

        }
    );

}


/* Click outside */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* Keyboard */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            openLightbox(
                currentGalleryIndex - 1
            );

        }


        if (event.key === "ArrowLeft") {

            openLightbox(
                currentGalleryIndex + 1
            );

        }

    }
);


/* =========================================================
   11 — SWIPE SUPPORT FOR MOBILE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;

if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );

}

function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {

        return;

    }

    if (difference > 0) {

        /* Swipe left */

        openLightbox(
            currentGalleryIndex + 1
        );

    } else {

        /* Swipe right */

        openLightbox(
            currentGalleryIndex - 1
        );

    }

}


/* =========================================================
   12 — LOAD MORE GALLERY
========================================================= */

const loadMoreButton =
    document.getElementById(
        "loadMoreGallery"
    );


/*
    يمكنك إضافة صور وفيديوهات كثيرة
    داخل HTML.

    هذا الزر سيظهر العناصر المخفية
    إذا قمت بإضافة class="gallery-hidden".
*/

if (loadMoreButton) {

    loadMoreButton.addEventListener(
        "click",
        () => {

            const hiddenItems =
                document.querySelectorAll(
                    ".gallery-item.gallery-hidden"
                );


            hiddenItems.forEach(item => {

                item.classList.remove(
                    "gallery-hidden"
                );

            });


            if (
                hiddenItems.length === 0
            ) {

                loadMoreButton.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   13 — WHATSAPP BOOKING
========================================================= */

const whatsappForm =
    document.getElementById(
        "whatsapp-form"
    );


/*
    رقم WhatsApp
    تونس +216
    بدون + داخل الرابط.
*/
const whatsappNumber = "21692629901";



if (whatsappForm) {

    whatsappForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                )?.value.trim();


            const barber =
                document.getElementById(
                    "barber"
                )?.value;


            const service =
                document.getElementById(
                    "service"
                )?.value;


            const date =
                document.getElementById(
                    "date"
                )?.value;


            const time =
                document.getElementById(
                    "time"
                )?.value;


            if (
                !name ||
                !barber ||
                !service ||
                !date ||
                !time
            ) {

                alert(
                    "يرجى ملء جميع المعلومات المطلوبة."
                );

                return;

            }


            /* Check working day */

            const selectedDate =
                new Date(`${date}T12:00:00`);

            const day =
                selectedDate.getDay();


            /*
                JavaScript:
                Sunday = 0
                Monday = 1
            */

            if (day === 1) {

                alert(
                    "عذراً، يوم الاثنين عطلة أسبوعية."
                );

                return;

            }


            /* Check working hours */

            const [hours, minutes] =
                time.split(":")
                    .map(Number);

            const totalMinutes =
                hours * 60 + minutes;


            const opening =
                10 * 60;

            const closing =
                22 * 60;


            if (
                totalMinutes < opening ||
                totalMinutes > closing
            ) {

                alert(
                    "وقت الحجز يجب أن يكون بين 10:00 و 22:00."
                );

                return;

            }


            /* Format date */

            const formattedDate =
                date.split("-").reverse().join("/");


            /* WhatsApp message */

            const message =
`السلام عليكم Majd L'artiste 👋

أريد حجز موعد:

👤 الاسم: ${name}

💈 الحلاق: ${barber}

✂️ الخدمة: ${service}

📅 التاريخ: ${formattedDate}

⏰ الوقت: ${time}

شكراً لكم ❤️`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   14 — PREVENT PAST DATE
========================================================= */

const dateInput =
    document.getElementById("date");

if (dateInput) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const todayString =
        `${year}-${month}-${day}`;


    dateInput.min =
        todayString;

}


/* =========================================================
   15 — LIMIT BOOKING TIME
========================================================= */

const timeInput =
    document.getElementById("time");

if (timeInput) {

    timeInput.min = "10:00";

    timeInput.max = "22:00";

}


/* =========================================================
   16 — SMOOTH ANCHOR LINKS
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {

                return;

            }


            event.preventDefault();


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   17 — IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll(
    "img"
).forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.style.opacity = "0.3";

            console.warn(
                "Image not found:",
                image.src
            );

        }
    );

});


/* =========================================================
   18 — MOBILE HERO VIDEO OPTIMIZATION
========================================================= */

function optimizeHeroVideo() {

    if (!heroVideo) return;


    if (window.innerWidth <= 600) {

        heroVideo.setAttribute(
            "preload",
            "metadata"
        );

    } else {

        heroVideo.setAttribute(
            "preload",
            "auto"
        );

    }

}

window.addEventListener(
    "resize",
    optimizeHeroVideo
);

optimizeHeroVideo();


/* =========================================================
   19 — STOP OTHER LIGHTBOX VIDEOS
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            heroVideo
        ) {

            heroVideo.pause();

        }

    }
);


/* =========================================================
   20 — CONSOLE MESSAGE
========================================================= */

console.log(
    "%c MAJD L'ARTISTE ",
    "background:#d4af37;color:#000;font-size:18px;font-weight:bold;padding:8px;"
);

console.log(
    "%c Premium Barber Shop Website",
    "color:#d4af37;font-size:13px;"
);
