document.addEventListener('DOMContentLoaded', () => {
    const inventoryList = document.getElementById('inventory-list');
    const productForm = document.getElementById('product-form');

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const productName = document.getElementById('product-name').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        
        if (productName && quantity > 0) {
            const newRow = document.createElement('tr');
            const productId = generateProductId();
            newRow.innerHTML = `
                <td>${productId}</td>
                <td>${productName}</td>
                <td>${quantity}</td>
                <td>
                    <button class="remove-button" data-product-id="${productId}">Remove</button>
                    <select class="remove-quantity" data-product-id="${productId}">
                        ${generateQuantityOptions(quantity)}
                    </select>
                </td>
            `;
            inventoryList.appendChild(newRow);
            productForm.reset();
        }
    });

    inventoryList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const productId = event.target.getAttribute('data-product-id');
            const row = event.target.closest('tr');
            const selectedQuantity = parseInt(row.querySelector('.remove-quantity').value);
            const currentQuantity = parseInt(row.querySelector('td:nth-child(3)').textContent);

            if (selectedQuantity >= currentQuantity) {
                inventoryList.removeChild(row);
            } else {
                row.querySelector('td:nth-child(3)').textContent = currentQuantity - selectedQuantity;
            }
        }
    });

    function generateProductId() {
        // Generate a simple product ID (for demonstration purposes)
        return Math.floor(Math.random() * 1000);
    }

    function generateQuantityOptions(maxQuantity) {
        let options = '';
        for (let i = 1; i <= maxQuantity; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        return options;
    }
});
