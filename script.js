let selectedProducts = [];
const maxProducts = 4;
const productCards = document.querySelectorAll('.product-card');
const finalizeButton = document.getElementById('finalize-cart');
const totalPriceDisplay = document.getElementById('total-price');
const actualPriceSpan = document.getElementById('actual-price');
const savedAmount = document.getElementById('saved-amount');
const offerPriceDisplay = document.getElementById('offer-price');
const discountAmountDisplay = document.getElementById('discount-amount');

// Function to update all product buttons (disable/enable)
function updateProductButtons() {
    productCards.forEach(card => {
        const addToCartButton = card.querySelector('.add-to-cart');
        const productName = card.querySelector('.product-title').textContent;

        // If product is already in the cart, show "Remove from Cart"
        if (selectedProducts.some(product => product.productName === productName)) {
            addToCartButton.textContent = "Remove from Cart";
            addToCartButton.style.backgroundColor = '#FF5733';  // Red color for remove button
        } else {
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.style.backgroundColor = '#4CAF50';  // Green color for add button
        }
    });
}

function updateCartSummary() {
    let totalPrice = 0;
    selectedProducts.forEach(product => {
        totalPrice += product.price;
    });

    // Display the actual total price and apply discount
    actualPriceSpan.textContent = totalPrice;
    savedAmount.style.display = 'none';
    offerPriceDisplay.style.display = 'none';

    if (selectedProducts.length >= maxProducts) {
        // Show the offer and saved amount
        actualPriceSpan.textContent = totalPrice;  // Original total price
        const saved = totalPrice - 1999;
        savedAmount.style.display = 'block';
        savedAmount.textContent = `Saved: ₹${saved}`;  // Correct saved amount
        offerPriceDisplay.style.display = 'block';
        discountAmountDisplay.textContent = '₹1999';  // Show discounted offer price
    }

    // Enable the Add to Cart button when 4 products are selected
    if (selectedProducts.length === maxProducts) {
        finalizeButton.disabled = false;
        finalizeButton.style.backgroundColor = '#4CAF50';  // Green color
    } else {
        finalizeButton.disabled = true;
        finalizeButton.style.backgroundColor = '#bbb';  // Grey out the button
    }
}

function handleAddToCartButton(card, addToCartButton) {
    const price = parseFloat(card.querySelector('.product-price').textContent.replace('₹', ''));
    const productName = card.querySelector('.product-title').textContent;

    // Check if the product is already in the cart
    if (selectedProducts.some(product => product.productName === productName)) {
        // If the product is already in the cart, remove it
        selectedProducts = selectedProducts.filter(product => product.productName !== productName);
    } else {
        // Add the product to the cart if less than 4 products are selected
        if (selectedProducts.length < maxProducts) {
            selectedProducts.push({ productName, price, element: card });
        }
    }

    // Update the button text for all products
    updateProductButtons();
    updateCartSummary();
}

// Attach event listeners to all product cards
productCards.forEach(card => {
    const addToCartButton = card.querySelector('.add-to-cart');

    addToCartButton.addEventListener('click', () => {
        handleAddToCartButton(card, addToCartButton);
    });
});

// Initial call to disable/enable buttons based on selected products
updateProductButtons();
