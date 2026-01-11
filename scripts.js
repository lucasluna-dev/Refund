const amount = document.getElementById("amount")

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

