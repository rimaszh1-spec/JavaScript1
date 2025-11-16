// مصفوفة لتخزين المهام
let tasks = [];

// عناصر من صفحة HTML
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


// دالة إضافة مهمة
function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("اكتبي مهمة قبل الإضافة");
    return;
  }

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  input.value = "";
  updateList();
}


// دالة تحديث العرض في الصفحة
function updateList() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // نص المهمة مع علامة ✓ إذا مكتملة
    const textSpan = document.createElement("span");
    textSpan.textContent = task.completed ? "✓ " + task.text : task.text;

    if (task.completed) {
      textSpan.classList.add("completed");
      li.style.background = "#d4edda"; // خلفية خضراء فاتحة للمكتملة
    } else {
      li.style.background = "#f3f3f3"; // اللون الافتراضي
    }

    // زر إكمال المهمة
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "تم";
    doneBtn.style.marginLeft = "10px";
    doneBtn.onclick = () => markCompleted(index);

    // زر حذف المهمة
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.style.background = "#d9534f";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.onclick = () => deleteTask(index);

    // إضافة العناصر داخل li
    li.appendChild(textSpan);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}


// دالة وضع علامة تم
function markCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  updateList();
}


// دالة حذف مهمة
function deleteTask(index) {
  tasks.splice(index, 1);
  updateList();
}


// عند ضغط زر إضافة
addBtn.addEventListener("click", addTask);

// تشغيل addTask عند الضغط على Enter
input.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});


// ----------------------------
// تجربة Fetch المطلوبة في المهمة
// ----------------------------

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(data => console.log("بيانات API جاهزة:", data))
  .catch(error => console.log("حدث خطأ:", error));
