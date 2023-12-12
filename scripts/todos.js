"use strict";

const userDropdown = document.getElementById("userDropdown");
const taskDisplay = document.getElementById("taskDisplay");

window.onload = init;

function init() {
    userDropdown.onchange = handleUserDropdown;
    handleUserDropdown();
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

function handleUserDropdown() {
    // Add an event listener for the change event
    fetchUsers();
    userDropdown.onchange = () => {
        let selectedUser = userDropdown.value;
        if (selectedUser) {
            handleUserSelection(selectedUser);
        }
    };
}


function handleUserSelection(id) {
    // Fetch products for the selected category

    fetch(`http://localhost:8083/api/todos/byuser/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("There was a problem with the network response.");
            }
            return response.json();
        })

        .then(data => {
            // Display products for the selected category
            displayTasks(data);
        })
        .catch(error => {
            console.error("There was an error fetching tasks by ID.", error);
        });
}


// function sortProductsByName(products) {
//     return products.sort((a, b) => {
//         const nameA = a.productName.toUpperCase();
//         const nameB = b.productName.toUpperCase();
//         if (nameA < nameB) {
//             return -1;
//         }
//         if (nameA > nameB) {
//             return 1;
//         }
//         return 0;
//     });
// }

function displayTasks(tasks) {

    clearOutput();

    // const sortedProducts = sortProductsByName(data);

    for (const task of tasks) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const userId = document.createElement('h4');
        userId.textContent = ` User ID: ${task.userid}`;

        const category = document.createElement('h3');
        category.textContent = ` Category: ${task.category}`;

        const description = document.createElement('p');
        description.textContent = `Description: ${task.description}`;

        const deadline = document.createElement('p');
        deadline.textContent = `Due By: ${task.deadline}`;

        const priority = document.createElement('p');
        priority.textContent = `Priority: ${task.priority}`;

        cardBody.appendChild(userId);
        cardBody.appendChild(category);
        cardBody.appendChild(description);
        cardBody.appendChild(deadline);
        cardBody.appendChild(priority);

        card.appendChild(cardBody);
        taskDisplay.appendChild(card);

    }
}

function clearOutput() {
    taskDisplay.innerHTML = "";
}


