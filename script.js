document.getElementById('processButton').addEventListener('click', function() {
    const files = document.getElementById('imageInput').files;
    const resizeWidth = parseInt(document.getElementById('resizeWidth').value);
    const resizeHeight = parseInt(document.getElementById('resizeHeight').value);
    const resultContainer = document.getElementById('resultContainer');

    resultContainer.innerHTML = '<h2>Processed Images:</h2>'; // Clear previous results

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Get the size of the image
                const width = img.width;
                const height = img.height;

                // Determine the size of the square crop
                const sideLength = Math.min(width, height);

                // Calculate the coordinates of the crop box
                const startX = (width - sideLength) / 2;
                const startY = (height - sideLength) / 2;

                // Set canvas dimensions to resize dimensions
                canvas.width = resizeWidth;
                canvas.height = resizeHeight;

                // Draw the cropped image to the canvas and resize it
                ctx.drawImage(img, startX, startY, sideLength, sideLength, 0, 0, resizeWidth, resizeHeight);

                const resultImageContainer = document.createElement('div');
                resultImageContainer.className = 'result-image-container';

                const resultImage = new Image();
                resultImage.src = canvas.toDataURL('image/png');

                const downloadButton = document.createElement('a');
                downloadButton.href = resultImage.src;
                downloadButton.download = 'processed_' + file.name;
                downloadButton.className = 'download-button';
                downloadButton.textContent = 'Download';

                resultImageContainer.appendChild(resultImage);
                resultImageContainer.appendChild(downloadButton);
                resultContainer.appendChild(resultImageContainer);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    });
});
