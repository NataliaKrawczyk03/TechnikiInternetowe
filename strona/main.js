let currentTable = 1; // Zmienna do śledzenia aktualnej tabeli

function updateGallery() {
    const table1 = document.getElementById('gallerytable1');
    const table2 = document.getElementById('gallerytable2');
    const table3 = document.getElementById('gallerytable3');

    // Ukryj wszystkie tabele
    table1.style.display = 'none';
    table2.style.display = 'none';
    table3.style.display = 'none';

    // Pokaż aktualną tabelę
    if (currentTable === 1) {
        table1.style.display = 'block';
    } else if (currentTable === 2) {
        table2.style.display = 'block';
    } else if (currentTable === 3) {
        table3.style.display = 'block';
    }
}

document.getElementById('next').addEventListener('click', () => {
    currentTable += 1;
    
    // Przełączanie między tabelami
    if (currentTable > 3) {
        currentTable = 1; // Powrót do pierwszej tabeli
    }
    
    updateGallery();
});

document.getElementById('before').addEventListener('click', () => {
    currentTable -= 1;

    // Przełączanie między tabelami
    if (currentTable < 1) {
        currentTable = 3; // Przejdź do ostatniej tabeli
    }
    
    updateGallery();
});

// Inicjalizacja galerii
updateGallery();