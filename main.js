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
    const expenseAmt = this.totalExpense();
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

  // Submit Budget Form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenseValue == "" || amountValue == "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`;
      setTimeout(() => {
        this.expenseFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      let amount = Number(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      // show balance
      this.showBalance();
    }
  }

  // add expense
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
            <h6 class="expense-title mb-0 text-uppercase list-item">${
              expense.title
            }</h6>
            <h5 class="expense-amount mb-0 list-item">- ${expense.amount}</h5>
            <div class="expense-icons list-item">
                <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="delete-icon" data-id="${expense.id}">
                    <i class="fas fa-trash"></i>
                </a>
            </div>
        </div>`;
    this.expenseList.appendChild(div);
  }

  // Edit expense
  editExpense(element) {
    let id = Number(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    // remove from dom
    this.expenseList.removeChild(parent);

    // remove from the list
    let expense = this.itemList.filter(item => item.id === id);

    // show value;
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    // remove from list
    let tempList = this.itemList.filter(item => {
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }
  // Delete expense
  deleteExpense(element) {
    let id = Number(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    // remove from dom
    this.expenseList.removeChild(parent);
    // remove from list
    let tempList = this.itemList.filter(item => {
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }

  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((amt, item) => amt + item.amount, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
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
    ui.submitExpenseForm();
  });
  //expense list submit
  expenseList.addEventListener("click", e => {
    if (e.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense(e.target.parentElement);
    }
    if (e.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(e.target.parentElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
