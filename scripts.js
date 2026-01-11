const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")

// Captura o evento de input para formatar o valor.
amount.oninput = () =>{
   
    let value = amount.value.replace(/\D/g, "") // obtém o valor atual do input e remove os caracteres não numericos.

    value = Number(value) / 100 // transofma valor em centavos (exemplo:1.50)
    amount.value =  formatCurrencyBRL(value) //atualiza o valor do input
}

function formatCurrencyBRL(value){
    value  = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    })

    return value
}

form.onsubmit = (event) =>{
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
}

