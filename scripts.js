

const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text') 
const inputTransactionAmount = document.querySelector('#amount')


const localStoregeTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStoregeTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount <0 ?'-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOpetator = Math.abs(transaction.amount)
    const li = document.createElement('li');


    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOpetator}</span>
    <button class="delete-btn" onClick = "removeTransaction(${transaction.id})">
    x
    </button>

    `
    transactionsUl.append(li)


}

const updateBalanceValues = () => {
    const transactionsAmouts = transactions
        .map(transaction => transaction.amount)
    const total = transactionsAmouts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmouts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs( transactionsAmouts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`


}

const init = () => {
    transactionsUl.innerHTML = ''


    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)


form.addEventListener('submit', Event => {
    Event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionsAmout = inputTransactionAmount.value.trim()

    if (transactionName ===  '' || transactionsAmout === '') {
        alert('Por favor, preencha tanto o nome quanto o valor da transação ')
        return
    }

    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionsAmout)  
    }


    transactions.push(transaction)
    init()
    updateLocalStorage()


    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
    
    
    






})






