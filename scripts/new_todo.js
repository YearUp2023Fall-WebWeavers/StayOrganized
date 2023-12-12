"use strict";

const userDropdown = document.getElementById("userDropdown");
const taskDisplay = document.getElementById("taskDisplay");

window.onload = init;

function init() {
  userDropdown.onchange = handleUserDropdown;
  handleUserDropdown();
}

//Fetching the users from the API and making sure that proper messages were 
//displayed for troubleshooting purposes.
function fetchUsers() {

  fetch(`http://localhost:8083/api/users`)
    .then(response => {
      if (!response.ok) {
        throw new Error("There was a problem with the network response.");
      }
      return response.json();
    })

    .then(users => {
      // Clear the existing options

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

  fetchUsers();
  userDropdown.onchange = () => {
    let selectedUser = userDropdown.value;
    if (selectedUser) {
      handleUserSelection(selectedUser);
    }
  };
}


// pull up the dropdown from HTML

// fetch information for the ADD button 

//ADD button function handler

