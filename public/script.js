// custom allert
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const closeAlertButton = document.getElementById('closeAlert');

    // Function to show custom alert
    function showAlert(message) {
        alertMessage.textContent = message;
        customAlert.style.display = 'block';
    }

    // Close the custom alert box
    closeAlertButton.addEventListener('click', function() {
        customAlert.style.display = 'none';
    });

//LOGIN
loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    if (username.value && password.value) {
            // Send POST request to server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/home.html';
                } else {
                    showAlert(data.message || 'Incorrect username or password');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('An error occurred. Please try again later.');
            });
        } else {
            // If one or both fields are empty, alert the user
            showAlert('Please enter both username and password');
        }
    });
});

//revisi https://chat.openai.com/share/237d163d-e4d3-41b5-ad62-061250b52937

document.addEventListener('DOMContentLoaded', function() {
    const suhuElement = document.getElementById('suhu-value');
    const kipasElement = document.getElementById('kipas-status');

    function updateSuhuDanKipas() {
        fetch('/getDecryptedData')
            .then(response => response.json())
            .then(data=>{
                const suhu = data.decryptedData
                suhuElement.textContent = `${parseFloat(suhu).toFixed(2)}°C`;
                // Mengubah kondisi kipas berdasarkan suhu
                if (suhu >= 30) {
                    kipasElement.textContent = `ON`;
                } else {
                    kipasElement.textContent = `OFF`;
                }
            })
    }

    setInterval(updateSuhuDanKipas, 60000); // Perbarui suhu dan status kipas setiap 2 detik
});

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        // Send a request to the server's logout endpoint
        fetch('/logout', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            // Redirect to login page after successful logout
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    });
});





