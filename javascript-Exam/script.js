// Check if user is logged in
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showExpenseTracker(currentUser);
    } else {
        showLoginForm();
    }
}

// Show Login Form
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('expense-tracker').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
}

// Show Signup Form
function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('expense-tracker').style.display = 'none';
}

// Sign up new user
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, password, expenses: [] });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Account created successfully. Please log in.");
    showLoginForm();
}

// Login an existing user
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        showExpenseTracker(username);
    } else {
        alert("Invalid username or password");
    }
}

// Show Expense Tracker after login
function showExpenseTracker(username) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('expense-tracker').style.display = 'block';

    document.getElementById('welcome-username').textContent = username;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.username === username);

    displayExpenses(currentUser.expenses);
}

// Display expenses for the logged-in user
function displayExpenses(expenses) {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount}`;
        expenseList.appendChild(li);
    });
}

// Add a new expense
function addExpense() {
    const description = document.getElementById('expense-description').value;
    const amount = document.getElementById('expense-amount').value;

    if (!description || !amount) {
        alert("Please fill in all fields");
        return;
    }

    const username = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);

    user.expenses.push({ description, amount: parseFloat(amount) });
    localStorage.setItem('users', JSON.stringify(users));

    displayExpenses(user.expenses);
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    showLoginForm();
}

// Initial check
checkLoginStatus();


function del() {
    // alert('scsvdv')

    localStorage.clear()

    window.location.reload();
}
