// Real-time clock and login dates for Sweet Crumbs Bakery
// Displays live time and login dates in footer across all pages

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Format time
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var timeString = hours + ':' + minutes + ':' + seconds;

    // Update all clock elements
    var clocks = document.querySelectorAll('.real-time-clock');
    clocks.forEach(function(clock) {
        clock.textContent = timeString;
    });
}

// Function to get and display login date
function displayLoginDates() {
    var now = new Date();
    var dateString = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    var timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Store only the latest login date in localStorage
    var latestLogin = {
        date: dateString,
        time: timeString,
        timestamp: now.getTime()
    };

    localStorage.setItem('latestLogin', JSON.stringify(latestLogin));

    // Display the latest login date
    var loginDatesContainer = document.getElementById('login-dates');
    if (loginDatesContainer) {
        loginDatesContainer.innerHTML = '<h4>Last Login Date:</h4><p>' + latestLogin.date + ' at ' + latestLogin.time + '</p>';
    }
}

// Update clock every second
setInterval(updateClock, 1000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add clock to footer
    var footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML += ' | Current Time: <span class="real-time-clock"></span>';
        updateClock(); // Initial update
    }

    // Display login dates
    displayLoginDates();

    // Add login dates section to footer
    var footerElement = document.querySelector('footer');
    if (footerElement) {
        var loginDatesDiv = document.createElement('div');
        loginDatesDiv.id = 'login-dates';
        loginDatesDiv.style.marginTop = '10px';
        loginDatesDiv.style.fontSize = '0.9em';
        footerElement.appendChild(loginDatesDiv);
        displayLoginDates(); // Initial display
    }
});
