document.getElementById('submit-button').addEventListener('click', function() {
    const urlInput = document.getElementById('url-input').value;
    const errormessage = document.getElementById('error-message');

    if (!urlInput) {
        errormessage.classList.remove('hidden');
        errormessage.textContent = "Please enter a URL.";
        return;
    }

    if (isValidUrl(urlInput)) {
        // errormessage.classList.add('hidden');

        fetch('/url/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput })
        })
        .then(response => response.json())
        .then(data => {
            // Display the shortened URL to the user
            const shortenedUrl = "short.ly" + data.shortId;
            const shortenedLink = document.getElementById('shortened-link');
            // shortenedLink.href = "https://localhost:3000/" + data.shortId; // Fixed the protocol
            shortenedLink.href = "https://jubilant-engine-x5w7pwxgjq6r399g7-4000.app.github.dev/" + data.shortId
            shortenedLink.textContent = shortenedUrl;

            // Show the shortened URL section
            document.getElementById('shortened-url').classList.remove('hidden');

            // Add event listener for the QR code button
            const qrButton = document.getElementById('qr-button');
            qrButton.addEventListener('click', function generateQRCode() {
                const downloadButton = document.getElementById('download-button');
                const qrCodeDiv = document.getElementById('qr-code');
                qrCodeDiv.innerHTML = '';
                new QRCode(qrCodeDiv, {
                    text: shortenedUrl,
                    width: 200,
                    height: 200
                });

                qrCodeDiv.classList.remove('hidden');
                downloadButton.classList.remove('hidden');

                // Remove event listener after QR code is generated
                qrButton.removeEventListener('click', generateQRCode);

                downloadButton.addEventListener('click', function() {
                    const qrCodeImg = qrCodeDiv.querySelector('img');
                    if (qrCodeImg) {
                        const imgURL = qrCodeImg.src;
                        const link = document.createElement('a');
                        link.href = imgURL;
                        link.download = 'qr-code.png';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        errormessage.classList.remove('hidden');
        errormessage.textContent = "Please enter a valid URL.";
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

function isValidUrl(string) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:\/?#@!$&'()*+,;=%]*)?$/;
    return regex.test(string);
}
