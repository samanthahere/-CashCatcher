let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currency = localStorage.getItem("currency") || "$";

document.getElementById("currency-select").value = currency;

function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let category = document.getElementById("category").value;
  let date = new Date().toLocaleDateString();

  if (!desc || isNaN(amount)) return;

  expenses.push({ desc, amount, category, date });
  displayExpenses();
  updateTotal();
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function displayExpenses() {
  let list = document.getElementById("expense-list");
  list.innerHTML = "";

  expenses.forEach((exp, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${exp.date} - ${exp.desc} (${exp.category}) 
      <b><span class="coin">🪙</span>${currency}${exp.amount.toFixed(2)}</b> 
      <button onclick="deleteExpense(${index})">❌</button>`;
    list.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  updateTotal();
}

function updateTotal() {
  let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("total").innerText = currency + total.toFixed(2);

  let replyBox = document.getElementById("fun-reply");
  if (total < 50) {
    replyBox.innerText = "🤑 Saving mode activated, nice!";
  } else if (total < 200) {
    replyBox.innerText = "💅 Balanced spender, keep it up!";
  } else if (total < 500) {
    replyBox.innerText = "⚡ Careful… money flowing fast!";
  } else {
    replyBox.innerText = "🔥 Big spender energy!";
  }
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("currency", currency);
  alert("Expenses saved successfully!");
}

document.getElementById("currency-select").addEventListener("change", function () {
  currency = this.value;
  updateTotal();
  displayExpenses();
});

displayExpenses();
updateTotal();
