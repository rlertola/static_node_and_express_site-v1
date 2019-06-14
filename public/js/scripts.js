$(document).foundation();

// Adds functionality to the button on the errors page.
// Hides and shows the error details.
document.addEventListener("DOMContentLoaded", e => {
  console.log("loaded");
  const errorButton = document.querySelector(".errorButton");
  const errorStack = document.querySelector(".errorStack");
  if (errorStack !== null) {
    errorStack.style.visibility = "hidden";
    document.addEventListener("click", e => {
      if (e.target.className === "errorButton") {
        if (errorStack.style.visibility === "inherit") {
          errorStack.style.visibility = "hidden";
          errorButton.textContent = "More details ->";
        } else {
          errorStack.style.visibility = "inherit";
          errorButton.textContent = "Less details <-";
        }
      }
    });
  }
});
