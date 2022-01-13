const form = document.querySelector("form");
const section = document.querySelector(".tasks-section .container");
const input = document.querySelector("input");
form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  const task = 
    `   <div class="task">
    <i class="bi bi-star-fill"></i>
    <p class="po" id="task1">${input.value}</p>
    <div class="flex">
      <i class="bi bi-trash"></i>
      <i class="bi bi-emoji-angry"></i>
    </div>
  </div>`
    
    
    ;
  section.innerHTML += task;
  input.value = "";
});
section.addEventListener("click", (eo) => {
  switch (eo.target.className) {
    case "bi bi-trash":
      eo.target.parentElement.parentElement.remove();
      break;

    case "bi bi-emoji-angry":
      eo.target.classList.add("dis");
      const heart = `<i class="bi bi-emoji-heart-eyes"></i>`;
      eo.target.parentElement.parentElement
        .getElementsByClassName("po")[0]
        .classList.add("finish");
      eo.target.parentElement.innerHTML += heart;
      break;
    case "bi bi-emoji-heart-eyes":
      eo.target.parentElement.parentElement
        .getElementsByClassName("po")[0]
        .classList.remove("finish");
      eo.target.style.display = "none";
      const angry = `<i class="bi bi-emoji-angry"></i>`;
      eo.target.parentElement.innerHTML += angry;
      break;
    case "bi bi-star-fill":
      eo.target.classList.add("star");
      section.prepend(eo.target.parentElement);
      break;
    case "bi bi-star-fill star":
      eo.target.classList.remove("star");
      section.append(eo.target.parentElement);
      break;
  }
});

let body = document.querySelector("body");
let moon = document.getElementById("moon");
let sun = document.getElementById("sun");

moon.addEventListener("click", (eo) => {
  mode("dark");
  localStorage.setItem("theme", "dark");
});

sun.addEventListener("click", (eo) => {
  mode("light");
  localStorage.setItem("theme", "light");
});
if (document.body.classList.contains("dark")) {
  mode(localStorage.getItem("theme", "dark"));
} else {
  mode(localStorage.getItem("theme", "light"));
}
onload = (eo) => {
  mode(localStorage.getItem("theme"));
};

function mode(ld) {
  if (ld === "dark") {
    body.classList.add("dark");
    moon.style.display = "none";
    sun.style.display = "block";
  } else if (ld === "light") {
    body.classList.remove("dark");
    moon.style.display = "block";
    sun.style.display = "none";
  }
}

let eng = document.getElementById("eng");
let arb = document.getElementById("arb");
let title = document.getElementById("title");
let task1 = document.getElementById("task1");
let task2 = document.getElementById("task2");
let title2 = document.getElementById("title2");

eng.addEventListener("click", (eo) => {
  languages("eng");
  localStorage.setItem("change", "eng");
});
arb.addEventListener("click", (eo) => {
  languages("arb");
  localStorage.setItem("change", "arb");
});
onload = (eo) => {
  languages(localStorage.getItem("change"));
};
function languages(lang) {
  if (lang === "arb") {
    title.innerHTML = "قائمة المهام";
    task1.innerHTML = " المهمة 1";
    task2.innerHTML = " المهمة 2";
    title2.innerHTML = "   ماالتالي  ؟ ";
    input.placeholder = " ... تفضل";
  } else if (lang === "eng") {
    title.innerHTML = "TO DO list";
    task1.innerHTML = " Task 1";
    task2.innerHTML = " Task 2";
    title2.innerHTML = "  What's up ? ";
    input.placeholder = " write it down mate!!";
  }
}
