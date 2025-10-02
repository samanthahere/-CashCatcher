let expenses = [];
let budget = 0;
let currency = "$"; // default
let replies = [
  "💖 Spend wisely!",
  "✨ Careful, money vibes alert!",
  "💸 Oops, a little splurge!",
  "🫣 Watch that budget!",
  "✨ Balance intact!"
];

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
    alert("Enter a valid budget!");
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
    alert("Enter valid description and amount!");
    return;
  }

  let expense = { desc, amount, category, date: new Date().toLocaleDateString() };
  expenses.push(expense);

  displayExpenses();
  updateSummary();

  // Fun gender-neutral reply
  let reply = replies[Math.floor(Math.random() * replies.length)];
  alert(reply);

  // Clear inputs
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

// Display expenses with mini coins
function displayExpenses() {
  let list = document.getElementById("expense-list");
  list.innerHTML = "";

  expenses.forEach((exp, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${exp.date} - ${exp.desc} (${exp.category}) 
      <b><span class="coin">💖</span>${currency}${exp.amount.toFixed(2)}</b> 
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

// Update totals with gender-neutral fun messages
function updateSummary() {
  let totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  let remaining = budget - totalSpent;

  document.getElementById("total").innerHTML = `Total Spent: <span class="coin">💖</span>${currency}${totalSpent.toFixed(2)}`;
  
  let balanceText = `Remaining Balance: <span class="coin">💖</span>${currency}${remaining.toFixed(2)}`;
  if (remaining <= 0) balanceText += " 😱 Uh-oh, broke vibes!";
  else if (remaining < budget*0.2) balanceText += " 🫣 Careful!";
  else balanceText += " ✨ Budget safe!";

  document.getElementById("balance").innerHTML = balanceText;
}

// Save expenses & budget to localStorage
function saveExpenses() {
  let data = { budget, currency, expenses };
  localStorage.setItem("cashcatcherData", JSON.stringify(data));
  alert("Saved successfully! 💾💖");
}

// Initialize
window.onload = loadExpenses;
