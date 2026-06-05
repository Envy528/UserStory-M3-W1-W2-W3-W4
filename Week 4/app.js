// Variable for the PUT method
let idEditItem = null;
// json-server URL
const url = "http://localhost:3000/products";
// array for localstorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// DOM elements
const form = document.getElementById("product-form");
const infoBox = document.getElementById("info");
const productsList = document.getElementById("product-list");
const submitBtn = document.getElementById("add-btn");

// Load products from API or localStorage
async function loadProducts() {
    try {
        const res = await fetch(url); // Fetch products from the API

        if (!res.ok) { // Checking if the response is ok, if not, throws an error
            throw new Error("Failed to load products from API");
        }
        // parses the response to the products array and saves it to localStorage
        products = await res.json();
        localStorage.setItem("products", JSON.stringify(products));
        console.log("Products loaded successfully from API");
    } catch (error) {
        // Shows error message if there's an error with the API and loads products from localStorage
        console.error(`Error loading products: ${error}`);
        infoBox.innerHTML = `<strong class="bad-info">Could not load products from API. Using local storage.</strong>`;
        setTimeout(() => { infoBox.innerHTML = ""; }, 2000);
        products = JSON.parse(localStorage.getItem("products")) || [];
    }
    renderNotes();
}

// Render products list
function renderNotes() {
    productsList.innerHTML = ""; // Clear existing list to avoid duplicates

    // Render each product as a list item
    products.forEach(product => {
        // Create list item elements
        const listItem = document.createElement("li");
        const itemContent = document.createElement("p");
        const itemDelButton = document.createElement("button");
        const itemEditButton = document.createElement("button");

        // configure list item content and delete button
        itemContent.textContent = `Name: ${product.name} Price: $${product.price} Description: ${product.description}`;
        itemDelButton.textContent = "Delete";
        itemDelButton.className = "delete-btn"
        itemEditButton.textContent = "Edit";
        itemEditButton.className = "edit-btn"
        listItem.dataset.id = product.id;

        // append all elements to the list item and then to the products list
        listItem.appendChild(itemContent);
        listItem.appendChild(itemEditButton);
        listItem.appendChild(itemDelButton);
        productsList.appendChild(listItem);
    });
}

// Add new product to the list and localStorage
async function addToList(pName, pPrice, pDescription) {
    const productId = Date.now().toString(); // unique ID for the product
    // product object creation
    const product = {
        id: productId,
        name: pName,
        price: pPrice,
        description: pDescription
    };
    // Save the new product to the API and update localStorage and the rendered list
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        })
        if (!res.ok) { // Checking if the response is ok, if not, throws an error
            throw new Error("Failed to save the product to the API");
        }
        const savedProduct = await res.json(); // Get the saved product from the response
        products.push(savedProduct); // Add the saved product to the products array
        localStorage.setItem("products", JSON.stringify(products)); // Updates the localstorage
        renderNotes(); // Renders the new list with the new product added
        console.log("Product Created Successfully");
        infoBox.innerHTML = `<strong class="good-info">Product Created Successfully</strong>`;
        setTimeout(() => { infoBox.innerHTML = ""; }, 2000);
    } catch (error) {
        console.error(`Error saving the product: ${error}`);
        infoBox.innerHTML = `<strong class="bad-info">Failed to save the product. Try again.</strong>`;
        setTimeout(() => { infoBox.innerHTML = ""; }, 2000);
    }
}

async function updateProduct(id, name, price, description) {
    const product = { id, name, price, description };
    // Send a PUT request to the API to update the product and update localStorage and the rendered list
    try {
        const res = await fetch(url + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        if (!res.ok) { // Checking if the response is ok, if not, throws an error
            throw new Error("Failed to update product");
        }
        // Get the updated product from the response, update the products array and localStorage, then re-render the list
        const productUpdated = await res.json();
        products = products.map(p => p.id === id ? productUpdated : p);
        localStorage.setItem("products", JSON.stringify(products));
        renderNotes();

        // Reset the form and show success message
        idEditItem = null;
        submitBtn.textContent = "Add Product";
        console.log("Product Updated Successfully");
        infoBox.innerHTML = `<strong class="good-info">Product Updated Successfully</strong>`;
        setTimeout(() => { infoBox.innerHTML = ""; }, 2000);

    } catch (error) { // Shows error message if there's an error with the API
        console.error(`Error updating the product: ${error}`);
        infoBox.innerHTML = `<strong class="bad-info">Failed to update the product. Try again.</strong>`;
        setTimeout(() => { infoBox.innerHTML = ""; }, 2000);
    }
}

// Event listener for delete button
productsList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) { // Check if the clicked element is the delete button
        // Gets information about the product to delete
        const itemToDelete = e.target.parentElement;
        const productId = itemToDelete.dataset.id;

        // Send a DELETE request to the API 
        try {
            const res = await fetch(url + "/" + productId, {
                method: "DELETE"
            })

            if (!res.ok) { // Checking if the response is ok, if not, throws an error
                throw new Error("Failed to delete product")
            }

            // Filters the product to delete from the products array and updates localStorage without that product
            products = products.filter(p => p.id !== productId);
            localStorage.setItem("products", JSON.stringify(products));
            renderNotes();
            console.log("Product deleted successfully");
            infoBox.innerHTML = `<strong class="good-info">Product deleted successfully</strong>`;
            setTimeout(() => { infoBox.innerHTML = ""; }, 2000);
        } catch (error) {
            console.error(`Error deleting the product: ${error}`);
            infoBox.innerHTML = `<strong class="bad-info">Failed to delete the product. Try again.</strong>`;
            setTimeout(() => { infoBox.innerHTML = ""; }, 2000);
        }
    } else if (e.target.classList.contains("edit-btn")) {
        const itemToEdit = e.target.parentElement;
        const productId = itemToEdit.dataset.id;

        const product = products.find(p => p.id == productId);
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-description").value = product.description;

        idEditItem = productId;
        console.log(`Editing product: ${product.name}`);
        infoBox.innerHTML = `<strong class="good-info">Editing: ${product.name}</strong>`
        submitBtn.textContent = "Save Changes";
    }
});

// Event listener for form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevents the form for refreshing the page

    // Gets the values from the form inputs
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productDescription = document.getElementById("product-description").value;

    if (!productName || !productPrice || !productDescription) { // Validates if there's empty fields
        // Shows errors messages if there's empty fields
        console.error("There's empty fields, please fill the form");
        infoBox.innerHTML = `<strong class="bad-info">There's empty fields, please fill the form</strong>`;
        setTimeout(() => { infoBox.innerHTML = ""; }, 2000);

    } else if (idEditItem) { // If the user is editing a product, it calls the updateProduct function
        await updateProduct(idEditItem, productName, productPrice, productDescription);
        form.reset();

    } else { // Creates a new product
        await addToList(productName, productPrice, productDescription);
        form.reset();
    }
});

// add event listener to load products when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadProducts);