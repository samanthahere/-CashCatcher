let expenses = [];
let budget = 0;
let currency = "$"; // default

// Load previous expenses from Local Storage
function loadExpenses() {
  let data = JSON.parse(localStorage.getItem("cashcatcherData"));
  if (data) {
    budget = data.budget;
    currency = data.currency;
    expenses = data.expenses || [];

    document.getElementById("budget").value = budget;
    document.getElementById("currency").value = currency;
    document.getElementById("budget-display").innerText = `Budget set: ${currency}${budget}`;
    displayExpenses();
    updateSummary();
  }
}

// Set budget and currency
function setBudget() {
  budget = parseFloat(document.getElementById("budget").value);
  currency = document.getElementById("currency").value;

  if (isNaN(budget) || budget <= 0) {
    alert("Please enter a valid budget!");
    return;
  }

  document.getElementById("budget-display").innerText = `Budget set: ${currency}${budget}`;
  updateSummary();
}

// Add a new expense
function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let category = document.getElementById("category").value;

  if (!desc || isNaN(amount) || amount <= 0) {
    alert("Please enter valid description and amount!");
    return;
  }

  let expense = { desc, amount, category, date: new Date().toLocaleDateString() };
  expenses.push(expense);

  displayExpenses();
  updateSummary();

  // Clear input fields
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

// Display expenses list with mini coins
function displayExpenses() {
  let list = document.getElementById("expense-list");
  list.innerHTML = "";

  expenses.forEach((exp, index) => {
    let li = document.createElement("li");
    
    // Mini spinning coin next to amount
    li.innerHTML = `${exp.date} - ${exp.desc} (${exp.category}) 
      <b><span class="coin">🪙</span>${currency}${exp.amount.toFixed(2)}</b> 
      <button onclick="deleteExpense(${index})">❌</button>`;

    list.appendChild(li);
  });
}

// Delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  updateSummary();
}

// Update total spent and remaining balance
function updateSummary() {
  let totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("total").innerHTML = `Total Spent: <span class="coin">🪙</span>${currency}${totalSpent.toFixed(2)}`;
  document.getElementById("balance").innerHTML = `Remaining Balance: <span class="coin">🪙</span>${currency}${(budget - totalSpent).toFixed(2)}`;
}

// Save expenses & budget to localStorage
function saveExpenses() {
  let data = {
    budget: budget,
    currency: currency,
    expenses: expenses
  };
  localStorage.setItem("cashcatcherData", JSON.stringify(data));
  alert("Expenses saved successfully! 💾");
}

// Initialize
window.onload = loadExpenses;
