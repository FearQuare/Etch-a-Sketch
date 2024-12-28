main = document.querySelector("main");

function fillScreenWithSquares() {
    main.textContent = "";

    // Calculate how many squares fit horizontally and vertically
    const squaresAcross = Math.floor(window.innerWidth / 16);
    const squaresDown = Math.floor(window.innerHeight / 16);

    // Configure the grid to have `squaresAcross` columns and `squaresDown`rows
    main.style.gridTemplateColumns = `repeat(${squaresAcross}, 16px)`;
    main.style.gridTemplateRows = `repeat(${squaresDown}, 16px)`;

    // Generate the total number of squares
    const totalSquares = squaresAcross * squaresDown;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.style.width = "16px";
        square.style.height = "16px";
        square.style.backgroundColor = "white";
        // Append each square
        main.appendChild(square);
    }
}

// Initial fill
fillScreenWithSquares();

// Re-fill on resize
window.addEventListener("resize", fillScreenWithSquares);

// Click-and-drag logic
let isMouseDown = false;

// 1) On mousedown: set isMouseDown = true; color the current square
main.addEventListener("mousedown", (e) => {
    isMouseDown = true;

    // Only color if the target is actually one of the squares
    if (e.target && e.target.matches("main div")) {
        e.target.style.backgroundColor = "red";
    }

    // Prevent potential text-selection dragging
    e.preventDefault();
});

main.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;

    if (e.target && e.target.matches("main div")) {
        e.target.style.backgroundColor = "red";
    }
});

// 3) On mouseup: stop coloring
main.addEventListener("mouseup", () => {
    isMouseDown = false;
});

// 4) If the user leaeves the container (e.g., drags off-screen),
// also set isMouseDown = false so that we don't keep coloring when they come back.
main.addEventListener("mouseleave", () => {
    isMouseDown = false;
});