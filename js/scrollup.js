document.addEventListener("DOMContentLoaded", function () {
    let scrollUpBtn = document.getElementById("bFScroll");

    scrollUpBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});