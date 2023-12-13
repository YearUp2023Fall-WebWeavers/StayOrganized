"use strict";

const userDropdown = document.getElementById("userDropdown");
const taskDisplay = document.getElementById("taskDisplay");

window.onload = init;

function init() {
  userDropdown.onchange = handleUserDropdown;
  // fetchUsers();
}

function fetchUsers() {

  fetch(`http://localhost:8083/api/users`)
    .then(response => {
      if (!response.ok) {
        throw new Error("There was a problem with the network response.");
      }
      return response.json();
    })

    .then(users => {
      

      userDropdown.innerHTML = "";

      let defaultOption = new Option("Select a user", "");
      userDropdown.appendChild(defaultOption);

      // Populate the dropdown with fetched categories
      for (let user of users) {
        let option = new Option(user.name, user.id);
        userDropdown.appendChild(option);
      }
    })
    .catch(error => {
      console.error("There was an error fetching users.", error.message);
    });
}

// Event handler for user dropdown change.
function handleUserDropdown() {
  let selectedUser = userDropdown.value;
  if (selectedUser) {
    handleUserSelection(selectedUser);
  }
}

// Function to create a dropdown element with options
function createDropdown(options, id, labelText) {
  const label = document.createElement('label');
  label.textContent = labelText;

  const dropdown = document.createElement('select');
  dropdown.id = id;

  // Add options to the dropdown
  options.forEach(option => {
    const optionElement = new Option(option, option);
    dropdown.appendChild(optionElement);
  });

  // Create a div to hold the label and dropdown
  const container = document.createElement('div');
  container.appendChild(label);
  container.appendChild(dropdown);

  return container;
}

// Function to create a textarea element
function createTextArea(id, labelText) {
  const label = document.createElement('label');
  label.textContent = labelText;

  const textarea = document.createElement('textarea');
  textarea.id = id;

  // Create a div to hold the label and textarea
  const container = document.createElement('div');
  container.appendChild(label);
  container.appendChild(textarea);

  return container;
}

// Function to create an input element of type text
function createTextInput(id, labelText) {
  const label = document.createElement('label');
  label.textContent = labelText;

  const input = document.createElement('input');
  input.id = id;
  input.type = 'text';

  // Create a div to hold the label and input
  const container = document.createElement('div');
  container.appendChild(label);
  container.appendChild(input);

  return container;
}

// Function to create the form for adding a new ToDo task
function createToDoForm() {
  const form = document.createElement('form');
  form.id = 'newTodoForm';

  // Create dropdowns
  form.appendChild(createDropdown(["User1", "User2", "User3"], 'userDropdown', 'Select User'));
  form.appendChild(createDropdown(categoryOptions, 'categoryDropdown', 'Select Category'));
  form.appendChild(createDropdown(urgencyOptions, 'urgencyDropdown', 'Select Urgency'));

  // Create textarea
  form.appendChild(createTextArea('descriptionTextarea', 'Enter Description'));

  // Create text input for deadline
  form.appendChild(createTextInput('deadlineInput', 'Enter Deadline (YYYY-MM-DD)'));

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Add ToDo';
  submitButton.type = 'button'; // Change to 'submit' if you want to submit the form
  submitButton.addEventListener('click', addNewTodo);
  form.appendChild(submitButton);

  document.body.appendChild(form);
}

// Function to handle the "Add ToDo" button click
function addNewTodo() {
  // Fetch form data and make a POST request to the API
  const formData = new FormData(document.getElementById('newTodoForm'));
  fetch('http://localhost:8083/api/todos', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.status === 200) {
        // ToDo added successfully, handle accordingly
        console.log('ToDo added successfully!');
      } else {
        // Handle errors or display a message to the user
        console.error('Error adding new ToDo:', response.statusText);
      }
    })
    .catch(error => console.error('Error adding new ToDo:', error));
}

// Call the function to create the ToDo form
createToDoForm();

// pull up the dropdown from HTML

// fetch information for the ADD button 

//ADD button function handler

