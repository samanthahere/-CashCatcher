let expenses = [];
let budget = 0;

function setBudget() {
  budget = parseFloat(document.getElementById("budget").value);
  if (isNaN(budget) || budget <= 0) {
    alert("Please enter a valid budget!");
    return;
  }
  document.getElementById("budget-display").innerText = `Budget set: $${budget}`;
  updateSummary();
}

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

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function displayExpenses() {
  let list = document.getElementById("expense-list");
  list.innerHTML = "";

  expenses.forEach((exp, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${exp.date} - ${exp.desc} (${exp.category}) <b>$${exp.amount}</b> 
      <button onclick="deleteExpense(${index})">❌</button>`;
    list.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  updateSummary();
}

function updateSummary() {
  let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  let balance = budget - total;

  document.getElementById("total").innerText = `Total Spent: $${total}`;
  document.getElementById("balance").innerText = `Remaining Balance: $${balance}`;

  if (budget > 0 && balance < 0) {
    alert("Bestie... you went OVER budget 💳💔");
  }
}
