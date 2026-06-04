// array for localstorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Get the form and info box elements
const form = document.getElementById("product-form");
const infoBox = document.getElementById("info");
const productsList = document.getElementById("product-list");

// Add an event listener to the form submission
form.addEventListener("submit", (e) => {
    e.preventDefault() // Prevent the form to refresh the page
    // Get the values from the form inputs
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productDescription = document.getElementById("product-description").value;

    // Validate the inputs
    if (!productName || !productPrice || !productDescription) {
        // If there's empty fields, show an error message
        console.error("There's empty fields, please fill de form");
        infoBox.innerHTML = `<strong class="bad-info">There's empty fields, please fill de form</strong>`;
    } else {
        // If all fields are filled, show a success message
        console.log("Product Created Successfully");
        infoBox.innerHTML = `<strong class="good-info">Product Created Successfully</strong>`;

        // Clear the info box after 3 seconds
        setTimeout(() => {
            infoBox.innerHTML = "";
        }, 2000);

        // Add the product to the list
        addToList(productName, productPrice, productDescription);
        // Clear the form inputs
        form.reset();
    }
})

// Function that manages all the logic to add a product to the list
function addToList(pName, pPrice, pDescription) {
    // Unique ID for the product to manage the localstorage
    const productId = Date.now().toString();

    // elements creation
    const listItem = document.createElement("li");
    const itemContent = document.createElement("p");
    const itemDelButton = document.createElement("button");

    // element configuration
    itemContent.textContent = `Name: ${pName}
    Price: $${pPrice}
    Description: ${pDescription}`;
    itemDelButton.textContent = "Delete";
    listItem.dataset.id = productId; // Unique ID for the li element to manage the localstorage

    // append the elements to the list
    listItem.appendChild(itemContent);
    listItem.appendChild(itemDelButton);
    productsList.appendChild(listItem);

    // add the product to the array for localstorage
    products.push({
        id: productId,
        name: pName,
        price: pPrice,
        description: pDescription
    });
    localStorage.setItem("products", JSON.stringify(products));
}

// event delegation to manage the delete button of each product
productsList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        // Get the product to delete and its data ID
        const itemToDelete = e.target.parentElement;
        const productId = itemToDelete.dataset.id;

        products = products.filter(p => p.id !== productId); // updates the products array without the item to delete
        localStorage.setItem("products", JSON.stringify(products));
        itemToDelete.remove(); // remove the product from the DOM
    }
})

// Load products from localstorage when the page loads and add them to the list
document.addEventListener("DOMContentLoaded", () => {
    products.forEach(product => {
    // elements creation
    const listItem = document.createElement("li");
    const itemContent = document.createElement("p");
    const itemDelButton = document.createElement("button");

    // element configuration
    itemContent.textContent = `Name: ${product.name}
    Price: $${product.price}
    Description: ${product.description}`;
    itemDelButton.textContent = "Delete";
    listItem.dataset.id = product.id; // Unique ID for the li element to manage the localstorage

    // append the elements to the list
    listItem.appendChild(itemContent);
    listItem.appendChild(itemDelButton);
    productsList.appendChild(listItem);
    });
})