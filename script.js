document.addEventListener("DOMContentLoaded", function () {
  const savedItems = JSON.parse(localStorage.getItem("toDoList")) || [];
  savedItems.forEach(function (item) {
    addItemToList(item.text, item.checked);
  });
});

// Function to add an item to the list and local storage
function addItemToList(text, isChecked) {
  var li = document.createElement("li");
  li.textContent = text;

  if (isChecked) {
    li.classList.add("checked");
  }

  document.getElementById("myUL").appendChild(li);

  // Add close button
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Add close event
  span.onclick = function () {
    var div = this.parentElement;
    div.remove();
    updateLocalStorage();
  };

  // Add checked event
  li.onclick = function () {
    li.classList.toggle("checked");
    updateLocalStorage();
  };
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    addItemToList(inputValue, false);
    document.getElementById("myInput").value = "";
    updateLocalStorage();
  }
}

// Function to update local storage with the current list
function updateLocalStorage() {
  var items = [];
  var listItems = document.querySelectorAll("ul li");
  listItems.forEach(function (li) {
    items.push({
      text: li.textContent.replace("\u00D7", ""), // Remove the close button text
      checked: li.classList.contains("checked"),
    });
  });
  localStorage.setItem("toDoList", JSON.stringify(items));
}
