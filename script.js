const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");


let expenses  = JSON.parse(localStorage.getItem("expenses")) || [];


form.addEventListener("submit", addExpense);



function addExpense(e) {

    e.preventDefault();



    const title  = document.getElementById("title").value;
    const amount = +document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date =  document.getElementById("date").value;


        const expense = {  

            id: Date.now(),

            title,
            amount,
            category,
            date
        };
        expenses.push(expense);
        saveAndRender();


        form.reset();

}


function deleteExpense(id) {

    expenses = expenses.filter(exp => exp.id !== id);
    saveAndRender();
}


function saveAndRender() {


    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    calculateTotal();
}



function renderExpenses() {

    expenseList.innerHTML = "";


    expenses.forEach(exp => {

        const li = document.createElement("li");

        li.innerHTML = `
        <div>

            <strong>${exp.title}</strong>
            

            <span>${exp.category} • ${exp.date}</span>
        </div>

    

        <div>

           ₹${exp.amount}
           <span class="delete" onclick="deleteExpense(${exp.id})">✖</span>
        </div>

        `;


        expenseList.appendChild(li);
    });
}


function calculateTotal() {

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalAmount.textContent = `₹${total}`;
}


saveAndRender();








