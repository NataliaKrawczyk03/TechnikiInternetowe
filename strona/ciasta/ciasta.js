document.addEventListener("DOMContentLoaded", () => {
    fetch('ciasta/ciasta.json') // Wczytaj dane JSON
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.forEach(recipe => {
                // Twórz elementy galerii
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <img src="ciasta/${recipe.image}" alt="${recipe.title}">
                    <p>${recipe.title}</p>
                `;
                item.onclick = () => openRecipe(recipe.id); // Kliknięcie otwiera przepis
                gallery.appendChild(item);
            });
        })
        .catch(error => console.error("Błąd wczytywania przepisów:", error));
});

// Funkcja otwierająca stronę z przepisem
function openRecipe(id) {
    window.location.href = `przepis.html?id=${id}&category=ciasta`;
}


////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const gallery = document.getElementById('gallery');

    let recipesData = []; // Przechowuje dane przepisów

    // Wczytaj dane JSON
    fetch('ciasta/ciasta.json')
        .then(response => response.json())
        .then(data => {
            recipesData = data; // Zapisz dane
            displayRecipes(recipesData); // Wyświetl wszystkie przepisy
        })
        .catch(error => console.error("Błąd wczytywania przepisów:", error));

    // Funkcja wyświetlania przepisów
    function displayRecipes(recipes) {
        gallery.innerHTML = ''; // Wyczyść galerię
        recipes.forEach(recipe => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="ciasta/${recipe.image}" alt="${recipe.title}">
                <p>${recipe.title}</p>
            `;
            item.onclick = () => openRecipe(recipe.id);
            gallery.appendChild(item);
        });
    }

    // Funkcja filtrowania przepisów
    function filterRecipes() {
        const query = searchBar.value.toLowerCase(); // Pobierz tekst i zmień na małe litery
        const filtered = recipesData.filter(recipe =>
            recipe.title.toLowerCase().includes(query) || // Sprawdź tytuł
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)) // Sprawdź składniki
        );
        displayRecipes(filtered); // Wyświetl przefiltrowane przepisy
    }

    // Nasłuchiwanie na kliknięcie przycisku lub wpisywanie w pole
    searchBar.addEventListener('input', filterRecipes); // Filtrowanie w czasie rzeczywistym
    searchButton.addEventListener('click', filterRecipes); // Filtrowanie po kliknięciu
});


