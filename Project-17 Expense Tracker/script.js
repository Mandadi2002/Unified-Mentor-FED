let expenses = [];

function addExpense() {
  const name = document.getElementById("expense-name").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;
  const date = document.getElementById("expense-date").value;

  if (name && !isNaN(amount) && category && date) {
    expenses.push({ name, amount, category, date });
    clearInputs();
    updateList();
  } else {
    alert("Please fill all fields.");
  }
}

function clearInputs() {
  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";
  document.getElementById("expense-category").value = "";
  document.getElementById("expense-date").value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateList();
}

function updateList(filteredList = expenses) {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";
  let total = 0;

  filteredList.forEach((exp, index) => {
    total += exp.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${exp.name}</strong> - ₹${exp.amount.toFixed(2)} 
      <em>(${exp.category}, ${exp.date})</em>
      <span class="delete" onclick="deleteExpense(${index})">✖</span>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").textContent = `Total Amount: ₹${total.toFixed(2)}`;
}

function filterExpenses() {
  const selectedCategory = document.getElementById("filter-category").value;
  if (selectedCategory === "All") {
    updateList();
  } else {
    const filtered = expenses.filter(exp => exp.category === selectedCategory);
    updateList(filtered);
  }
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  alert("Expenses saved successfully!");
}

window.onload = function () {
  const stored = localStorage.getItem("expenses");
  if (stored) {
    expenses = JSON.parse(stored);
    updateList();
  }
};



