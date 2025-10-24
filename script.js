var inputBox = document.getElementById("input-box");
var listContainer = document.getElementById("list-container");
function addTask() {
    if (inputBox.value === "") {
        alert("Please Enter Your Task.");
    }
    else {
        var li_1 = document.createElement("li");
        li_1.className = "flex border-1 border-slate-300 items-center rounded-lg mt-5 w-220 h-10 text-sm text-slate-600 relative overflow-hidden";
        li_1.innerHTML = "\n      <div class=\"check-btn w-4 h-4 border border-slate-600 rounded-full mr-3 ml-5 cursor-pointer\"></div>\n      <span class=\"task-text w-185 overflow-hidden\">".concat(inputBox.value, "</span>\n      <button class=\"edit-btn absolute w-8 h-8 ml-200 text-slate-500 hover:bg-slate-200 hover:rounded-full hover:text-blue-500 text-sm font-medium\">\u270F</button>\n      <button class=\"delete-btn absolute w-8 h-8 ml-210 text-slate-500 hover:bg-slate-200 hover:rounded-full hover:text-red-500 text-sm font-medium\">\u26D2</button>\n    ");
        var deleteButton = li_1.querySelector(".delete-btn");
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", function () {
            li_1.remove();
            saveData();
        });
        var editButton = li_1.querySelector(".edit-btn");
        editButton === null || editButton === void 0 ? void 0 : editButton.addEventListener("click", function () {
            var textSpan = li_1.querySelector(".task-text");
            var newText = prompt("Edit your task:", textSpan.innerText);
            if (newText !== null && newText.trim() !== "") {
                textSpan.innerText = newText.trim();
                saveData();
            }
        });
        var checkButton_1 = li_1.querySelector(".check-btn");
        checkButton_1 === null || checkButton_1 === void 0 ? void 0 : checkButton_1.addEventListener("click", function () {
            var textSpan = li_1.querySelector(".task-text");
            textSpan.classList.toggle("line-through");
            textSpan.classList.toggle("text-slate-500");
            checkButton_1.classList.toggle("bg-green-600");
            saveData();
        });
        listContainer.appendChild(li_1);
        saveData();
    }
    inputBox.value = "";
}
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    var savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
        var deleteButtons = listContainer.querySelectorAll(".delete-btn");
        deleteButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var li = btn.closest("li");
                if (li) {
                    li.remove();
                    saveData();
                }
            });
        });
        var editButtons = listContainer.querySelectorAll(".edit-btn");
        editButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var li = btn.closest("li");
                var textSpan = li === null || li === void 0 ? void 0 : li.querySelector(".task-text");
                var newText = prompt("Edit your task:", textSpan.innerText);
                if (newText !== null && newText.trim() !== "") {
                    textSpan.innerText = newText.trim();
                    saveData();
                }
            });
        });
        var checkButtons = listContainer.querySelectorAll(".check-btn");
        checkButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var li = btn.closest("li");
                var textSpan = li === null || li === void 0 ? void 0 : li.querySelector(".task-text");
                textSpan.classList.toggle("line-through");
                textSpan.classList.toggle("text-slate-400");
                saveData();
            });
        });
    }
}
window.addEventListener("load", showTask);
localStorage.clear();
