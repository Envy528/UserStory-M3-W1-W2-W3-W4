// Get the form and info box elements
const form = document.getElementById("product-form");
const infoBox = document.getElementById("info");

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
    }

})