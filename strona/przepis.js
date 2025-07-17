//////////////////GENEROWANIE STRONY PRZEPISU////////////////////////////////
document.addEventListener("DOMContentLoaded", () => 
{
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id'); // Pobierz ID przepisu
    const category = params.get('category'); // Pobierz kategorię

    // Ustawienie linku powrotu na stronę kategorii
    const backLink = document.getElementById('back-link');
    if (backLink) {
        backLink.setAttribute('href', `${category}.html`); // Link do kategorii
    }

    if (!category || !recipeId) {
        console.error("Brak wymaganych parametrów: kategoria lub ID.");
        document.getElementById('recipe-container').innerHTML = "<p>Nie podano kategorii lub ID przepisu.</p>";
        return;
    }

    fetch(`${category}/${category}.json`) // Wczytaj odpowiedni plik JSON na podstawie kategorii
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(r => r.id === Number(recipeId)); // Znajdź przepis po ID
            if (recipe) {
                const container = document.getElementById('recipe-container');
                container.innerHTML = `
                    <h2>${recipe.title}</h2>
                    <div class="recipe-top">
                        <img src="${category}/${recipe.image}" alt="${recipe.title}" class="recipe-image">
                        <div class="ingredients">
                            <h3>Składniki</h3>
                            <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                        </div>
                    </div>
                    <div class="recipe-description">
                        <p>${recipe.desc}</p>
                    </div>
                    <div class="steps">
                        <h3>Przygotowanie</h3>
                        <ol>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
                    </div>
                `;
            } else {
                console.error("Przepis o ID:", recipeId, "nie został znaleziony.");
                document.getElementById('recipe-container').innerHTML = "<p>Przepis nie został znaleziony.</p>";
            }
        })
        .catch(error => console.error("Błąd wczytywania przepisu:", error));
});

//////////////////////////////POBIERANIE PRZEPISU/////////////////////////////
document.getElementById("download").addEventListener("click", function() 
{
    // Pobieranie treści przepisu
    const recipeTitle = document.querySelector('h2').textContent; // Tytuł przepisu
    const recipeIngredients = Array.from(document.querySelectorAll('.ingredients ul li')).map(li => li.textContent).join('\n'); // Składniki
    const recipeSteps = Array.from(document.querySelectorAll('.steps ol li')).map(li => li.textContent).join('\n'); // Kroki przygotowania
    const recipeDescription = document.querySelector('.recipe-description p').textContent; // Opis przepisu

    // Tworzymy zawartość pliku
    const content = `Tytuł: ${recipeTitle}\n\nOpis: ${recipeDescription}\n\nSkładniki:\n${recipeIngredients}\n\nKroki przygotowania:\n${recipeSteps}`;
    const blob = new Blob([content], { type: 'text/plain' });

    // Tworzymy URL do pobrania
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${recipeTitle}.txt`; // Nazwa pliku będzie oparta na tytule przepisu
    link.click();
});

