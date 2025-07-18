function showExplanation(id)  {
    var explanation = document.getElementById(id);
    if (explanation.style.display === "none") {
        explanation.style.display = "block";
    } else {
        explanation.style.display = "none";
    }
}
// Функция чтобы при нажатии на формулу воявлялось обьяснение