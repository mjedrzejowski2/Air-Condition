const stationSelect = document.getElementById("stationSelect")

async function fetchStations() {
    let stations;
    try {
        const response = await fetch('/api/stations');
        stations = await response.json();
    } catch (error) {
        console.error("Błąd", error);
    }

    stations.forEach(station => {
        const option = document.createElement("option");
        option.value = station.id;
        option.textContent = `${station.stationName} (${station.addressStreet || "Brak ulicy"})`;
        stationSelect.appendChild(option);
    });
}


async function getAirQuality() {
    const stationId = stationSelect.value
    const getAirQualityResult = document.getElementById("airQualityResult")
    const loadingMessage = document.getElementById("loadingMessage")

    if (!stationId) {
        getAirQualityResult.textContent = "Wybierz stację, aby zobaczyć jakość powietrza."
    }

    loadingMessage.textContent = "Ładowanie danych.."
    getAirQualityResult.textContent = ""

    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/${stationId}`)
        const data = await response.json()

        if (data.stIndexLevel) {
            getAirQualityResult.innerHTML = `<strong>Indeks jakości powietrza:</strong> ${data.stIndexLevel.indexLevelName}`
        } else {
            getAirQualityResult.textContent = "Brak danych"
        }
    } catch (error) {
        getAirQualityResult.textContent = "Błąd"
    } finally {
        loadingMessage.textContent = ""
    }
}
window.onload = function() {
    fetchStations();
};