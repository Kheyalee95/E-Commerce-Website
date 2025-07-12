document.addEventListener('DOMContentLoaded', function() {
    // Function to load cart items from localStorage
    function loadCart() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let cartTable = document.getElementById('cart-items');
        cartTable.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            let row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
                <td><button class="remove-item" data-index="${index}">Remove</button></td>
            `;

            cartTable.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        document.getElementById('total-price').textContent = totalPrice;
    }

    // Function to add item to cart
    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let existingProduct = cartItems.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.push({...product, quantity: 1});
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCart();
    }

    // Event listener for adding items to the cart from shop.html
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            let product = {
                name: this.parentElement.querySelector('p').textContent,
                price: parseInt(this.parentElement.querySelector('p:nth-of-type(2)').textContent.replace('₹', ''))
            };

            addToCart(product);
        });
    });

    // Event listener for removing items from the cart
    document.getElementById('cart-items').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            cartItems.splice(e.target.dataset.index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadCart();
        }
    });

    // Load cart items when the page loads
    loadCart();
});
