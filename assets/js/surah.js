document.addEventListener("DOMContentLoaded", async function () {
    const surahContent = document.getElementById("surah-content");

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const surahName = getQueryParam("surah");

    if (!surahName) {
        surahContent.innerHTML = `
            <h2>No Surah selected</h2>
            <a href="index.html" class="go-back">Go Back</a>
        `;
        return;
    }

    try {
        const response = await fetch("./assets/data/surah.json");
        const surahData = await response.json();
        const decodedSurahName = decodeURIComponent(surahName);

        // Get all ayahs for the selected Surah
        const surahAyahs = surahData.filter(s => s.surah === decodedSurahName);

        if (surahAyahs.length > 0) {
            // Extract revelation info from the first ayah (since it's the same for all in a Surah)
            const revelation = surahAyahs[0].revelation || "Revelation info not available";

            surahContent.innerHTML = `
                <h2>${decodedSurahName}</h2>
                <p class="revelation">${revelation}</p>
                <div class="ayahs">
                    ${surahAyahs.map(ayah => `
                        <p class"ayah"><strong>${ayah.ayah}</strong></p>
                        <p>${ayah.translation}</p>
                    `).join('')}
                </div>
                <a href="index.html" class="go-back">← Back to Surah Selection</a>
            `;
        } else {
            surahContent.innerHTML = `
                <h2>Surah not found</h2>
                <a href="index.html" class="go-back">Go Back</a>
            `;
        }
    } catch (error) {
        console.error("Error loading Surah data:", error);
        surahContent.innerHTML = `
            <h2>Error loading Surah data</h2>
            <a href="index.html" class="go-back">Go Back</a>
        `;
    }
});
