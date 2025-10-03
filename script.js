let budget = 0;
let expenses = [];
let currency = "$";

function setBudget() {
  budget = parseFloat(document.getElementById("budget-input").value);
  currency = document.getElementById("currency").value;

  if (isNaN(budget) || budget <= 0) {
    alert("Please enter a valid budget!");
    return;
  }

  document.getElementById("expense-section").style.display = "block";
  updateSummary();
}

function addExpense() {
  let category = document.getElementById("category").value;
  let amount = parseFloat(document.getElementById("amount").value);

  if (category === "" || isNaN(amount) || amount <= 0) return;

  expenses.push({ category, amount });
  displayExpenses();
  updateSummary();
}

function displayExpenses() {
  let list = document.getElementById("expense-list");
  list.innerHTML = "";
  expenses.forEach((exp, index) => {
    list.innerHTML += `<li>${exp.category} - ${currency}${exp.amount.toFixed(2)} 
      <button onclick="deleteExpense(${index})">❌</button></li>`;
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  updateSummary();
}

function updateSummary() {
  let totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  let remaining = budget - totalSpent;

  document.getElementById("total").innerHTML = `Total Spent: ${currency}${totalSpent.toFixed(2)}`;
  document.getElementById("balance").innerHTML = `Remaining Balance: ${currency}${remaining.toFixed(2)}`;

  let reply = "";
  if (remaining <= 0) reply = "😱 You’re broke!";
  else if (remaining < budget * 0.2) reply = "⚠️ Careful, low funds!";
  else reply = "💖 You’re spending smart!";

  document.getElementById("fun-reply").innerText = reply;
}

function saveExpenses() {
  let data = { budget, currency, expenses };
  localStorage.setItem("cashcatcherData", JSON.stringify(data));
  alert("Your expenses are saved!");
}

function loadExpenses() {
  let saved = localStorage.getItem("cashcatcherData");
  if (saved) {
    let data = JSON.parse(saved);
    budget = data.budget;
    currency = data.currency;
    expenses = data.expenses;
    document.getElementById("budget-input").value = budget;
    document.getElementById("currency").value = currency;
    document.getElementById("expense-section").style.display = "block";
    displayExpenses();
    updateSummary();
  }
}

window.onload = loadExpenses;

   
