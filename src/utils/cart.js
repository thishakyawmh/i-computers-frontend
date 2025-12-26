export function getCart() {
    const cartString = localStorage.getItem("cart");
    if (!cartString) {
        return [];
    }
    try {
        return JSON.parse(cartString);
    } catch (error) {
        console.error("Error parsing cart:", error);
        return [];
    }
}

export function addToCart(product, quantity) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex((item) => item.productID === product.productID);
    let result = { action: "added", count: quantity };

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += quantity;
        result = { action: "updated", count: cart[existingProductIndex].quantity };
    } else {
        cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    return result;
}

export function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.productID !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
}

export function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex((item) => item.productID === productId);

    if (existingProductIndex >= 0) {
        if (quantity <= 0) {
            cart.splice(existingProductIndex, 1);
        } else {
            cart[existingProductIndex].quantity = quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
    }
}

export function clearCart() {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
}
