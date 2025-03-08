document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (email === 'diptopaulk@gmail.com' && password === 'diptopaul') {
        // Set a flag in localStorage to indicate logged-in status
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        errorMessage.textContent = 'Invalid email or password';
    }
});