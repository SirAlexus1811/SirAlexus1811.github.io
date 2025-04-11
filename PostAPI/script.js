//For The Scroll Up Button
const scrollUpBtn = document.getElementById('scrollUpBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
});

scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function selectClassAddClass(id, toggleclass) {
  document.querySelector(id).classList.toggle(toggleclass);
}

function hideAll() {
  const list2 = document.querySelectorAll(".goesHide");
  for (var i = 0; i < list2.length; i++) {
    list2[i].classList.add("beHidden");
  }
}

function showAndHideOthers(id, toggleclass) {
  hideAll();
  selectClassAddClass(id, toggleclass);
}
