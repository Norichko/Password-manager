document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('password-form');
    const passwordList = document.getElementById('password-list');

    const loadPasswords = () => {
        passwordList.innerHTML = '';
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.forEach((password, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${password.url} - ${password.username} - ${password.password}</span>
                <button onclick="deletePassword(${index})">Удалить</button>
            `;
            passwordList.appendChild(li);
        });
    };

    const savePassword = (url, username, password) => {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ url, username, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        loadPasswords();
    };

    const deletePassword = (index) => {
        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        loadPasswords();
    };

    window.deletePassword = deletePassword;

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = document.getElementById('site-url').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        savePassword(url, username, password);
        passwordForm.reset();
    });

    loadPasswords();
});
