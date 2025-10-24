const inputBox = document.getElementById("input-box") as HTMLInputElement;
const listContainer = document.getElementById("list-container") as HTMLUListElement;

function addTask() {
  if (inputBox.value === "") {
    alert("Please Enter Your Task.");
  } else {
    const li = document.createElement("li");
    li.className = "flex border-1 border-slate-300 items-center rounded-lg mt-5 w-220 h-10 text-sm text-slate-600 relative overflow-hidden";
    li.innerHTML = `
      <div class="check-btn w-4 h-4 border border-slate-600 rounded-full mr-3 ml-5 cursor-pointer"></div>
      <span class="task-text w-185 overflow-hidden">${inputBox.value}</span>
      <button class="edit-btn absolute w-8 h-8 ml-200 text-slate-500 hover:bg-slate-200 hover:rounded-full hover:text-blue-500 text-sm font-medium">✏</button>
      <button class="delete-btn absolute w-8 h-8 ml-210 text-slate-500 hover:bg-slate-200 hover:rounded-full hover:text-red-500 text-sm font-medium">⛒</button>
    `;

    const deleteButton = li.querySelector(".delete-btn");
    deleteButton?.addEventListener("click", () => {
      li.remove();
      saveData();
    });

    const editButton = li.querySelector(".edit-btn");
    editButton?.addEventListener("click", () => {
      const textSpan = li.querySelector(".task-text") as HTMLElement;
      const newText = prompt("Edit your task:", textSpan.innerText);
      if (newText !== null && newText.trim() !== "") {
        textSpan.innerText = newText.trim();
        saveData();
      }
    });

    const checkButton = li.querySelector(".check-btn");
    checkButton?.addEventListener("click", () => {
      const textSpan = li.querySelector(".task-text") as HTMLElement;
      textSpan.classList.toggle("line-through");
      textSpan.classList.toggle("text-slate-500");
      checkButton.classList.toggle("bg-green-600");
      saveData();
    });

    listContainer.appendChild(li);
    saveData();
  }

  inputBox.value = "";
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;

    const deleteButtons = listContainer.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const li = btn.closest("li");
        if (li) {
          li.remove();
          saveData();
        }
      });
    });

    const editButtons = listContainer.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const li = btn.closest("li");
        const textSpan = li?.querySelector(".task-text") as HTMLElement;
        const newText = prompt("Edit your task:", textSpan.innerText);
        if (newText !== null && newText.trim() !== "") {
          textSpan.innerText = newText.trim();
          saveData();
        }
      });
    });

    const checkButtons = listContainer.querySelectorAll(".check-btn");
    checkButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const li = btn.closest("li");
        const textSpan = li?.querySelector(".task-text") as HTMLElement;
        textSpan.classList.toggle("line-through");
        textSpan.classList.toggle("text-slate-400");
        saveData();
      });
    });
  }
}
window.addEventListener("load", showTask);
localStorage.clear();
