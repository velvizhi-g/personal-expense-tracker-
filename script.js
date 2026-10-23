
let budget = 0;
let total = 0;
let count = 0;

let form = document.getElementById("expenseForm");
let budgetInput = document.getElementById("budget");

let expenseSection = document.createElement("section");
expenseSection.className = "expense-section";
expenseSection.innerHTML = `
    <h3>Recent Expenses</h3>
    <div id="expenseList"></div>
`;
document.querySelector(".container").appendChild(expenseSection);

let expenseList = document.getElementById("expenseList");

document.getElementById("saveBudget").addEventListener("click", function () {
    if (budgetInput.value === "" || Number(budgetInput.value) <= 0) {
        alert("Please enter a valid budget");
        return;
    }

    budget = Number(budgetInput.value);
    updateDashboard();

    alert("Budget saved successfully!");
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("expenseName").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    if (name === "" || amount <= 0 || category === "" || date === "") {
        alert("Please fill in all fields correctly");
        return;
    }

    let item = document.createElement("div");
    item.className = "expense-item";

    let details = document.createElement("div");
    details.className = "expense-details";

    let title = document.createElement("h4");
    title.textContent = name;

    let info = document.createElement("p");
    info.textContent = category + " | " + date;

    details.appendChild(title);
    details.appendChild(info);

    let price = document.createElement("span");
    price.className = "expense-amount";
    price.textContent = "₹ " + amount.toFixed(2);

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        total = total - amount;
        count = count - 1;

        item.remove();
        updateDashboard();

        if (count === 0) {
            showEmptyMessage();
        }
    });

    item.appendChild(details);
    item.appendChild(price);
    item.appendChild(deleteButton);

    expenseList.appendChild(item);

    total = total + amount;
    count = count + 1;

    updateDashboard();
    form.reset();
});

function updateDashboard() {
    document.getElementById("totalSpending").textContent =
        "₹ " + total.toFixed(2);

    document.getElementById("expenseCount").textContent = count;

    document.getElementById("remainingBudget").textContent =
        "₹ " + (budget - total).toFixed(2);
}

function showEmptyMessage() {
    let message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No expenses added yet.";

    expenseList.appendChild(message);
}

