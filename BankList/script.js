'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     
     <div class="movements__value">${mov} $</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//displayMovements(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = incomes;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumOut.textContent = Math.abs(outcomes);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, curr) => acc + curr)
    .toFixed(2);

  labelSumInterest.textContent = interest;
};

//calcDisplaySummary(account1.movements);

const createUserName = accs => {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);
//console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  //console.log(`${balance}  `);

  labelBalance.textContent = `${acc.balance} $ `;
};

//calcPrintBalance(movements);

//update ui
const updateUI = function (acc) {
  //display movements
  displayMovements(currentAccount.movements);

  //display balance
  calcPrintBalance(currentAccount);

  //display summary
  calcDisplaySummary(currentAccount);
};

// event handler
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  //containerApp

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //required values
    updateUI(currentAccount);

    //clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
  }
  //console.log(currentAccount);
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferto = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    currentAccount.username !== transferto?.username
  ) {
    currentAccount.movements.push(-amount);
    transferto.movements.push(amount);
    updateUI(currentAccount);

    //console.log('transfered sucssesfully');
  }
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    console.log('deleted sussesfully');
    labelWelcome.textContent = 'Log in to get started';
  }
  inputCloseUsername.value = inputClosePin.value = '';

  //hide ui
  containerApp.style.opacity = 0;
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add amount
    currentAccount.movements.push(amount);

    //update ui
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
