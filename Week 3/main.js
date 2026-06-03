// Array for localstorage
let notes = JSON.parse(localStorage.getItem("notes")) || []; // If there's something in localStorage, get it. If not, the variable is an empty array

// HTML variables
const btn = document.getElementById("agregarNota");
const input = document.getElementById("nota");
const lista = document.getElementById("listaNotas");

// Show variables in console - Task 2
console.log(btn, input, lista);

// Event listeners to add notes - Task 3
btn.addEventListener("click", addNote);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") addNote();
});

// Function for adding notes 
function addNote() {
    // If the input is empty, do this
    if (!input.value) {
        alert("Agrega algo en el input");
    } else {  // If the input is not empty, create the elements for the note and show it in console
        // Element creation
        const item = document.createElement("li");
        const text = document.createElement("span");
        const deletebtn = document.createElement("button");
        // Elements configuration
        text.textContent = input.value;
        deletebtn.id = "btnDel";
        deletebtn.textContent = "Eliminar";
        // Append the elements to the HTML
        item.appendChild(text);
        item.appendChild(deletebtn);
        lista.appendChild(item);

        // Add note to localStorage - Task 5
        const note = input.value;
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));

        // Clear the input and focus it
        input.value = "";
        input.focus();
        // Log the added note to console
        console.log("Note added: ", item);
    }
}

// Event listener to remove notes - Task 4
lista.addEventListener("click", function (e) {
    // If the button is clicked, remove the note and log it to console
    if (e.target.id === "btnDel") {
        // Get the li element and the text of it
        const item = e.target.parentElement;
        const noteText = item.querySelector("span").textContent;

        // Remove the note from the DOM
        lista.removeChild(item);
        console.log("Note removed: ", item);

        // Remove the note from localStorage - Task 5
        const savedNotes = JSON.parse(localStorage.getItem("notes"));
        const updateNotes = savedNotes.filter(n => n !== noteText);
        localStorage.setItem("notes", JSON.stringify(updateNotes));
        notes = updateNotes;

    }
})
// Load notes from localStorage when the page loads - Task 5
document.addEventListener("DOMContentLoaded", function () {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    for (const note of savedNotes) {
        // Element creation
        const item = document.createElement("li");
        const text = document.createElement("span");
        const deletebtn = document.createElement("button");
        // Elements configuration
        text.textContent = note;
        deletebtn.id = "btnDel";
        deletebtn.textContent = "Eliminar";
        // Append the elements to the HTML
        item.appendChild(text);
        item.appendChild(deletebtn);
        lista.appendChild(item);
    }
    console.log(`${savedNotes.length} notes loaded`);
})
