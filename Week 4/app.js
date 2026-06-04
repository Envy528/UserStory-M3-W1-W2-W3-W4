// Get the form and info box elements
const form = document.getElementById("product-form");
const infoBox = document.getElementById("info");
const productsList = document.getElementById("product-list");

// Add an event listener to the form submission
form.addEventListener("submit", (e)=>{
    e.preventDefault() // Prevent the form to refresh the page
    // Get the values from the form inputs
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productDescription = document.getElementById("product-description").value;

    // Validate the inputs
    if (!productName || !productPrice || !productDescription){
        // If there's empty fields, show an error message
        console.error("There's empty fields, please fill de form");
        infoBox.innerHTML = `<strong class="bad-info">There's empty fields, please fill de form</strong>`;
    } else{
        // If all fields are filled, show a success message
        console.log("Product Created Successfully");
        infoBox.innerHTML = `<strong class="good-info">Product Created Successfully</strong>`;

        // Clear the info box after 3 seconds
        setTimeout(() => {
            infoBox.innerHTML = "";
        }, 3000);

        // Add the product to the list
        addToList(productName, productPrice, productDescription);
    }

})

// Function that manages all the logic to add a product to the list
function addToList(pName, pPrice, pDescription){
    const listItem = document.createElement("li");
    const itemContent = document.createElement("p");
    const itemDelButton = document.createElement("button");

    itemContent.textContent = `Name: ${pName}
    Price: $${pPrice}
    Description: ${pDescription}`;
    itemDelButton.textContent = "Delete";

    listItem.appendChild(itemContent);
    listItem.appendChild(itemDelButton);
    productsList.appendChild(listItem);
}

// event delegation to manage the delete button of each product
productsList.addEventListener("click", (e)=>{
    if (e.target.tagName === "BUTTON"){
        const itemToDelete = e.target.parentElement;
        productsList.removeChild(itemToDelete);
    }
})