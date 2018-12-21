class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // Submit Budget Form
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value == "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`;
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }

  // show balance
  showBalance() {
    const budgetAmt = Number(this.budgetAmount.textContent);
    const expenseAmt = Number(this.expenseAmount.textContent);
    const bal = budgetAmt - expenseAmt;
    this.balanceAmount.textContent = bal;

    if (bal < 0) {
      this.balance.classList.add("showRed");
      this.balance.classList.remove("showGreen", "showBlack");
    } else if (bal > 0) {
      this.balance.classList.add("showGreen");
      this.balance.classList.remove("showRed", "showBlack");
    }
    if (bal === 0) {
      this.balance.classList.add("showBlack");
      this.balance.classList.remove("showGreen", "showRed");
    }
  }
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  //new instance of UI
  const ui = new UI();

  //budget form submit
  budgetForm.addEventListener("submit", e => {
    e.preventDefault();
    ui.submitBudgetForm();
  });
  //expense form submit
  expenseForm.addEventListener("submit", e => {
    e.preventDefault();
  });
  //expense list submit
  expenseList.addEventListener("click", e => {});
}

document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
