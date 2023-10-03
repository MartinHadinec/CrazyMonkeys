
const showButtons = document.querySelectorAll(".show-button");

showButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        // Získáme ID řádku z atributu data-rowid
        const rowId = button.getAttribute("data-rowid");
        // Zobrazíme nebo schováme zprávu podle aktuálního stavu
        const zprava = document.getElementById(`zprava-${rowId}`);

        if (zprava.style.display === "none" || zprava.style.display === "") {
            zprava.style.display = "block";
            zprava.style.width = "100%"; // Zajistí, že zpráva nebude širší než okno
            zprava.style.whiteSpace = "normal"; // Zajistí, že zpráva nebude pokračovat v jednom řádku
        } else {
            zprava.style.display = "none";
        }
    });

    // Schováme zprávu při načtení stránky
    const rowId = button.getAttribute("data-rowid");
    const zprava = document.getElementById(`zprava-${rowId}`);
    zprava.style.display = "none";
});
