const birthdays = [];

function clearMessage() {
  const message = document.getElementById("message");
  if (message) message.innerText = "";
}

function showAddBirthday() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Add Birthday</h2>
    <form onsubmit="addBirthday(event)">
      <label for="name">Name:</label>
      <input type="text" id="name" required>
      <label for="date">Date:</label>
      <input type="date" id="date" required>
      <button type="submit">Add</button>
    </form>
    <p class="message" id="message"></p>
  `;
}

function addBirthday(event) {
  event.preventDefault();
  clearMessage();

  const nameInput = document.getElementById("name");
  const dateInput = document.getElementById("date");

  const name = nameInput.value.toUpperCase(); // Convert name to uppercase
  const date = new Date(dateInput.value);

  birthdays.push({ name, date });

  const messageElement = document.getElementById("message");
  messageElement.innerText = "Birthday added successfully!";
  setTimeout(() => clearMessage(), 3000);

  nameInput.value = "";
  dateInput.value = "";
}

function showSummary() {
  clearMessage();
  const content = document.getElementById("content");
  const sortedBirthdays = birthdays.sort((a, b) => a.date - b.date);

  const months = {};
  sortedBirthdays.forEach(({ name, date }) => {
    const month = date.toLocaleString("default", { month: "long" });
    if (!months[month]) {
      months[month] = [];
    }
    months[month].push({ name, day: date.getDate() });
  });

  let summaryHTML = "<h2>Summary</h2>";
  const monthColors = [
    "month-color-1",
    "month-color-2",
    "month-color-3",
    "month-color-4",
    "month-color-5",
    "month-color-6",
  ];
  let colorIndex = 0;

  for (const [month, people] of Object.entries(months)) {
    const colorClass = monthColors[colorIndex % monthColors.length];
    summaryHTML += `<div class="table-container">
      <div class="month-header ${colorClass}">${month}</div>`;
    summaryHTML += `<table><tr><th>Name</th><th>Day</th></tr>`;
    people.forEach(({ name, day }) => {
      summaryHTML += `<tr><td>${name}</td><td>${day}</td></tr>`;
    });
    summaryHTML += `</table></div>`;
    colorIndex++;
  }

  content.innerHTML = summaryHTML;
}

function showDelete() {
  clearMessage();
  const content = document.getElementById("content");
  const options = birthdays
    .map((b, index) => `<option value="${index}">${b.name}</option>`)
    .join("");

  content.innerHTML = `
    <h2>Delete Birthday</h2>
    <label for="deleteSelect">Select a person:</label>
    <select id="deleteSelect">
      ${options}
    </select><br><br>
    <button onclick="deleteBirthday()">Delete</button>
    <p class="message" id="deleteMessage"></p>
  `;
}

function deleteBirthday() {
  const deleteSelect = document.getElementById("deleteSelect");
  const index = deleteSelect.value;

  if (index !== "") {
    const deletedName = birthdays[index].name;
    birthdays.splice(index, 1);

    const messageElement = document.getElementById("deleteMessage");
    messageElement.innerText = `${deletedName}'s birthday has been deleted!`;

    // Clear the message after 3 seconds
    setTimeout(() => {
      const deleteMessage = document.getElementById("deleteMessage");
      if (deleteMessage) deleteMessage.innerText = "";
    }, 3000);

    showDelete(); // Refresh the delete dropdown
  }
}

function exitApp() {
  clearMessage();
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Thank you for using the Birthday Reminder App!</h2>
    <p>Click <a href="#" onclick="restartApp()">here</a> to restart the app.</p>
  `;

  // Disable buttons to prevent further actions
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach(button => button.disabled = true);
}

function restartApp() {
  // Enable all buttons
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach(button => button.disabled = false);

  // Reset content to initial state
  const content = document.getElementById("content");
  content.innerHTML = "";

  // Optionally, redirect to the home page of the app
  showAddBirthday(); // Default to "Add Birthday" view
}
