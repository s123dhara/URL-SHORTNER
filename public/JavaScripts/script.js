document.getElementById('submit-button').addEventListener('click', function() {
    const urlInput = document.getElementById('url-input').value;
    if (urlInput) {
        fetch('/url/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput })
        })
        .then(response => response.json())
        .then(data => {
            console.log("data : ",data)
            // Display the shortened URL to the user
            const shortenedLink = document.getElementById('shortened-link');
            const shortenedUrl = "http://localhost:3000/" + data.shortId
            shortenedLink.href = shortenedUrl;
            shortenedLink.textContent = "short.ly/" + data.shortId;

            // Show the shortened URL section
            document.getElementById('shortened-url').classList.remove('hidden');

            // Your existing code for copy functionality, etc.
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

document.getElementById('copy-button').addEventListener('click', function() {
    const shortenedLink = document.getElementById('shortened-link').href;
    navigator.clipboard.writeText(shortenedLink).then(function() {
        const copySuccess = document.getElementById('copy-success');
        copySuccess.classList.add('show');
        setTimeout(() => {
            copySuccess.classList.remove('show');
        }, 2000);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
});
