let balance = 0;
let scheduledWithdrawalTime = 0;
let emergencyWithdrawalsLeft = 3;

function updateBalance() {
    document.getElementById('balance').innerText = `Balance: ₹${balance.toFixed(2)}`;
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        updateBalance();
    } else {
        alert('Please enter a valid amount.');
    }
}

function scheduleWithdrawal() {
    const timeInput = prompt('Enter the time after which you want to withdraw (in hours):');
    const withdrawalDelay = parseFloat(timeInput);

    if (!isNaN(withdrawalDelay) && withdrawalDelay > 0) {
        const currentTime = new Date().getTime();
        scheduledWithdrawalTime = currentTime + withdrawalDelay * 60 * 60 * 1000;
        alert(`Withdrawal scheduled successfully after ${withdrawalDelay} hours.`);

        // Disable the "Schedule Withdrawal" button after scheduling
        document.getElementById('schedule-withdrawal-button').disabled = true;

        // Enable the withdrawal button after the scheduled time
        setTimeout(() => {
            document.getElementById('withdraw-button').disabled = false;
        }, withdrawalDelay * 60 * 60 * 1000);
    } else {
        alert('Invalid input. Please enter a valid time in hours.');
    }
}

function emergencyWithdraw() {
    if (emergencyWithdrawalsLeft > 0) {
        const amount = parseFloat(document.getElementById('amount').value);
        if (!isNaN(amount) && amount > 0) {
            if (balance >= amount) {
                balance -= amount;
                emergencyWithdrawalsLeft--;
                updateBalance();
            } else {
                alert('Insufficient funds.');
            }
        } else {
            alert('Please enter a valid amount.');
        }
    } else {
        alert('No more emergency withdrawals allowed.');
    }
}

function withdraw() {
    const currentTime = new Date().getTime();
    if (currentTime < scheduledWithdrawalTime) {
        alert('Withdrawal is scheduled. Please wait for the scheduled time.');
    } else {
        const amount = parseFloat(document.getElementById('amount').value);
        if (!isNaN(amount) && amount > 0) {
            if (balance >= amount) {
                balance -= amount;
                updateBalance();
            } else {
                alert('Insufficient funds.');
            }
        } else {
            alert('Please enter a valid amount.');
        }
    }
}

// Initial balance update
updateBalance();
