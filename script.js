document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;

  slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active-dot");

      dot.addEventListener("click", () => {
          index = i;
          updateSlider();
      });

      dotsContainer.appendChild(dot);
  });

  function updateSlider() {
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;

      document.querySelectorAll(".dots span").forEach(dot => {
          dot.classList.remove("active-dot");
      });

      document.querySelectorAll(".dots span")[index].classList.add("active-dot");
  }

  nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateSlider();
  });

  prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
  });

  setInterval(() => {
      index = (index + 1) % slides.length;
      updateSlider();
  }, 4000);

 document.querySelectorAll('nav a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
});

window.addEventListener("load",function(){
document.getElementById("loader").style.display="none";
});

function reveal(){

let reveals=document.querySelectorAll(".reveal");

for(let i=0;i<reveals.length;i++){

let windowHeight=window.innerHeight;
let elementTop=reveals[i].getBoundingClientRect().top;

if(elementTop<windowHeight-100){
reveals[i].classList.add("active");
}
}
}
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("active");
});
