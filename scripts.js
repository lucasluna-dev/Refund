const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")

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

    expenseAdd(newExpense)//chamando function para ser executada
}


//function para dicionar nova dispesa na lista
function expenseAdd(newExpense){
    try {
        //Cria o elemto para adicionar na lista.
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)


        //cria infomações da lista
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // cria o nome da dispesa 
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //adiciona name e categoria na div das informações da despesa/lista
        expenseInfo.append(expenseName, expenseCategory)

        //cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")

        //adiciona valor dentro da class expense-amount
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`


    
        //adiciona icon remove
        const expenseIconRemove = document.createElement("img")
        expenseIconRemove.setAttribute("src", `img/remove.svg`)
        expenseIconRemove.setAttribute("alt", "remove")
        expenseIconRemove.classList.add("remove-icon")


        // adicionando todos os atributos criados dentro da ul
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseIconRemove)
        expenseList.append(expenseItem)
        
        //Atualiza os totais
        updateTotals(expenseItem)

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas")
        console.log(error)
    }
}


// atualiza os totais.

function updateTotals(){
    try {
        //Recupera todos os itens li da lista ul
        const items = expenseList.children // quantos filhos tem a ul
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`


        const total = 0

        // percorre cada item li da lista ul
       for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            // remove caracteres não numéricos e subistitui a virgula pelo ponto.
            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",",".")
            console.log(value)
       }
    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar os totais.")
    }
}