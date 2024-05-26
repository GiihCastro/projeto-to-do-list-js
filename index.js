document.addEventListener("DOMContentLoaded", function() {
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task-btn");
  
    addTaskButton.addEventListener("click", function() {
        const taskContent = newTaskInput.value;
        if (taskContent.trim() !== "") {
            addTask(taskContent);
            newTaskInput.value = "";
        }
});
  
    function addTask(content) {
        const taskList = document.getElementById("task-list");
        const li = document.createElement("li");
        li.textContent = content;
        li.classList.add("card");
        li.draggable = true;
  
        // Criando o botÃ£o de remover
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("delete-btn");
        removeButton.addEventListener("click", function() {
            li.remove();
    });
  
        li.appendChild(removeButton);
  
        taskList.appendChild(li);
  
        li.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", event.target.textContent);
            event.target.classList.add("is-dragging");
    });
  
        li.addEventListener("dragend", function(event) {
            event.target.classList.remove("is-dragging");
    });
}
  
    const boards = document.querySelectorAll(".board");
  
    boards.forEach(board => {
        board.addEventListener("dragover", function(event) {
            event.preventDefault();
            const cardBeingDragged = document.querySelector(".is-dragging");
            this.classList.add("highlight");
            cardBeingDragged.classList.add("over");
        });
  
        board.addEventListener("dragleave", function() {
            this.classList.remove("highlight");
            const cardBeingDragged = document.querySelector(".is-dragging");
            cardBeingDragged.classList.remove("over");
        });
  
        board.addEventListener("drop", function(event) {
            const cardBeingDragged = document.querySelector(".is-dragging");
            this.querySelector(".dropzone").appendChild(cardBeingDragged);
            this.classList.remove("highlight");
            cardBeingDragged.classList.remove("over");
    });
});
});