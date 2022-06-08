// ===================  add task ==================== //

const form = document.querySelector("form");
const section = document.querySelector(".tasks-section .container");
const input = document.querySelector("input");
let arrOfTasks= [];
let arrayOfFinishedTasks = [];
let arrayOfInportantTasks = [];

// checking local storage
if(localStorage.getItem("tasks")){
  arrOfTasks = JSON.parse(localStorage.getItem("tasks"))  // we add it to the array of tasks because if we don't and add a new task the old ones will disapear
  GetData()
}else if(!localStorage.getItem("tasks")){
  section.innerHTML = `<div class="plus">
  <i class="bi bi-patch-plus-fill"></i>
</div>`
}

// check local storage for finish class

if(localStorage.getItem("finish")){

  arrayOfFinishedTasks = JSON.parse(localStorage.getItem("finish"))
  
  arrayOfFinishedTasks.forEach(function(item){
  
document.querySelectorAll(".tasks-section .container .task").forEach(function (ele) {
    if(item.myid === ele.dataset.id){
      ele.querySelector("p").classList.add("finish")
      ele.querySelector(".flex .bi-emoji-angry").style.display = "none"
      ele.querySelector(".flex").innerHTML += `<i class="bi bi-emoji-heart-eyes"></i>`
}

})


})
    }

// check important tasks
if (localStorage.getItem("important")) {
  arrayOfInportantTasks =  JSON.parse(localStorage.getItem("important"))

  arrayOfInportantTasks.forEach(function(item){
  
    document.querySelectorAll(".tasks-section .container .task").forEach(function (ele) {
        if(item.myid2 === ele.dataset.id){
        //  console.log(item.myid2)
        ele.querySelector(".bi-star-fill").classList.add("star");
        section.prepend(ele);
    }
    
    })
    
    
    })
}


// checking array of tasks
if(arrOfTasks.length === 0){
  section.innerHTML = `<div class="plus">
  <i class="bi bi-patch-plus-fill"></i>
</div>`
  // console.log(true)
}

form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  
  if(input.value){
// add task to array
addTaskToArray(input.value)

// add task to page
addTaskToPage(arrOfTasks)

// add to local storage
addToLoacalStorage(arrOfTasks)
  }
  
});

// add task to page function
function addTaskToPage(arrOfTasks){
  section.innerHTML="";
arrOfTasks.forEach((item) => {

  // create task
  let task = document.createElement("div")
  task.classList.add("task");
  task.setAttribute("data-id",item.id)

  // create star emoji

  let star = document.createElement("i")
  star.className ="bi bi-star-fill"
task.appendChild(star)

// create paragraph
let paragraph = document.createElement("p")
paragraph.appendChild(document.createTextNode(item.title))
  
task.appendChild(paragraph)

// create flex div

let flex = document.createElement("div")
flex.className ="flex"

  // create trash emoji
  let trash = document.createElement("i")
  trash.className ="bi bi-trash"
  flex.appendChild(trash)
  // create angry emoji
  let angry = document.createElement("i")
  angry.className ="bi bi-emoji-angry"

  // if(localStorage.getItem("finish")){
  //   if(task.dataset.id === localStorage.getItem("finish")){
  //    flex.innerHTML += `<i class="bi bi-emoji-heart-eyes"></i>` 
  //    angry.classList.add("dis")
  //   }
  //   }
  flex.appendChild(angry)

// append flex div
task.appendChild(flex)


  // append task to section
  section.appendChild(task)
})
input.value = ""
}

// add task to array fucntion
function addTaskToArray(value) {
  let myObj = {
    id:Date.now(),
    title:value,
  }
  arrOfTasks.push(myObj)
}

// add tasks to local storge fucntion
function addToLoacalStorage(arrOfTasks){
  localStorage.setItem("tasks",JSON.stringify(arrOfTasks))
}

// get old data and create old tasks on the page  function
function GetData(){
  let data = localStorage.getItem("tasks")
  if(data){
 let old_Tasks = JSON.parse(data)
 addTaskToPage(old_Tasks)
  }
}


// change emojis
section.addEventListener("click", (eo) => {
  switch (eo.target.className) {
    case "bi bi-trash":
      eo.target.parentElement.parentElement.remove();
      // console.log(eo.target.parentElement.parentElement.dataset.id)
      deleteTask(eo.target.parentElement.parentElement.dataset.id)
      break;
    case "bi bi-emoji-angry":
     
      // console.log(eo.target.parentElement.parentElement.dataset.id)
      addFinishedToArray(eo.target.parentElement.parentElement.dataset.id)
      // console.log(arrayOfFinishedTasks)

      // add to lacal storage
      localStorage.setItem("finish", JSON.stringify(arrayOfFinishedTasks))

      eo.target.classList.add("dis");
      const heart = `<i class="bi bi-emoji-heart-eyes"></i>`;
      eo.target.parentElement.parentElement.querySelector("p").className = "finish";
      eo.target.parentElement.innerHTML += heart;
      break;
    case "bi bi-emoji-heart-eyes":
   
    // add to local storage
   undoTask(eo.target.parentElement.parentElement.dataset.id)

      eo.target.parentElement.parentElement.getElementsByTagName("p")[0].classList.remove("finish");
      eo.target.style.display = "none";
      const angry = `<i class="bi bi-emoji-angry"></i>`;
      eo.target.parentElement.innerHTML += angry;
      break;
    case "bi bi-star-fill":

    // add to local storage
    addImportantTask(eo.target.parentElement.dataset.id)
    // console.log(arrayOfInportantTasks)

    localStorage.setItem("important",JSON.stringify(arrayOfInportantTasks))

      eo.target.classList.add("star");
      section.prepend(eo.target.parentElement);
      break;
    case "bi bi-star-fill star":

    unimportantTask(eo.target.parentElement.dataset.id)
      eo.target.classList.remove("star");
      section.append(eo.target.parentElement);
      break;
  }
});

// finished tasks
function addFinishedToArray(id) {
  let myobj2 = {
    myid : id
  } 
  arrayOfFinishedTasks.push(myobj2)
}

// imporant tasks
function addImportantTask(id) {
  let myobj3 = {
    myid2 : id
  }
 arrayOfInportantTasks.push(myobj3)
}

// delete function
function deleteTask(taskid) {
  arrOfTasks = arrOfTasks.filter(function (ele) {
    return ele.id != taskid ;
  })
  addToLoacalStorage(arrOfTasks)
  if(arrOfTasks.length === 0){
    section.innerHTML = `<div class="plus">
    <i class="bi bi-patch-plus-fill"></i>
  </div>`
  // console.log(true)
  }
}


// undo task
function undoTask(taskid) {
  arrayOfFinishedTasks = arrayOfFinishedTasks.filter(function(ele){
    return ele.myid != taskid
    })
    localStorage.setItem("finish", JSON.stringify(arrayOfFinishedTasks))
}

// unimportant task
function unimportantTask(taskid) {
  arrayOfInportantTasks = arrayOfInportantTasks.filter(function(ele){
    return ele.myid2 != taskid
    })
    localStorage.setItem("important", JSON.stringify(arrayOfInportantTasks))
}






// ================== dark mode ======================= //

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

// dark mode function
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



// ======================== translation ===================  //

let eng = document.getElementById("eng");
let arb = document.getElementById("arb");
let title = document.getElementById("title");

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

// change language function
function languages(lang) {
  if (lang === "arb") {
    title.innerHTML = "قائمة المهام";
    input.placeholder = " ... تفضل";
  } else if (lang === "eng") {
    title.innerHTML = "TO DO list";
    input.placeholder = " write it down mate!!";
  }
}


// plus
let plus =  document.querySelector(".tasks-section .plus")
plus.addEventListener("click",(eo) => {
  input.focus()
})
