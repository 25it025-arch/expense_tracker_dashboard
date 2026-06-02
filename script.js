const description =
document.getElementById("description");

const amount =
document.getElementById("amount");

const type =
document.getElementById("type");

const addBtn =
document.getElementById("addBtn");

const transactionList =
document.getElementById("transactionList");

const balance =
document.getElementById("balance");

const income =
document.getElementById("income");

const expense =
document.getElementById("expense");

let transactions =
JSON.parse(localStorage.getItem("transactions"))
|| [];

function saveData(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

function updateDashboard(){

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {

        if(t.type === "income"){
            totalIncome += t.amount;
        }else{
            totalExpense += t.amount;
        }

    });

    income.textContent =
    `₹${totalIncome}`;

    expense.textContent =
    `₹${totalExpense}`;

    balance.textContent =
    `₹${totalIncome - totalExpense}`;

}

function displayTransactions(){

    transactionList.innerHTML = "";

    transactions.forEach((t,index)=>{

        const div =
        document.createElement("div");

        div.classList.add(
            "transaction",
            t.type === "income"
            ? "transaction-income"
            : "transaction-expense"
        );

        div.innerHTML = `
            <div>
                <strong>${t.description}</strong>
                <br>
                ₹${t.amount}
            </div>

            <button
            class="delete-btn"
            onclick="deleteTransaction(${index})">
            Delete
            </button>
        `;

        transactionList.appendChild(div);

    });

    updateDashboard();

}

addBtn.addEventListener("click",()=>{

    const desc =
    description.value.trim();

    const amt =
    Number(amount.value);

    if(desc === "" || amt <= 0){

        alert(
        "Please enter valid details."
        );

        return;

    }

    transactions.push({

        description:desc,
        amount:amt,
        type:type.value

    });

    saveData();

    displayTransactions();

    description.value = "";
    amount.value = "";

});

function deleteTransaction(index){

    transactions.splice(index,1);

    saveData();

    displayTransactions();

}

displayTransactions();
