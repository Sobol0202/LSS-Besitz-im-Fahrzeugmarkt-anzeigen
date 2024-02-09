// ==UserScript==
// @name         LSS Besitz im Fahrzeugmarkt anzeigen
// @namespace    www.leitstellenspiel.de
// @version      1.0
// @description  Zeigt im Fahrzeugmarkt die Anzahl der Fahrzeuge für jeden Fahrzeugtyp an
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/buildings/*/vehicles/new
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Lade die Fahrzeugbezeichnungen
    fetch('https://api.lss-manager.de/de_DE/vehicles')
        .then(response => response.json())
        .then(vehicleData => {
            // Lade die Fahrzeuge
            fetch('https://www.leitstellenspiel.de/api/vehicles')
                .then(response => response.json())
                .then(vehicles => {
                    // Iteriere über alle divs mit der Klasse "vehicle_type well"
                    document.querySelectorAll('.vehicle_type.well').forEach(vehicleDiv => {
                        // Extrahiere den Fahrzeugtyp aus dem Text des h3-Elements
                        const vehicleType = vehicleDiv.querySelector('h3').textContent.trim();
                        // Suche den Fahrzeugtyp in den Daten der Bezeichnungs-API, um die type id zu finden
                        const typeId = Object.keys(vehicleData).find(key => vehicleData[key].caption === vehicleType);
                        if (typeId) {
                            // Zähle die Anzahl der Fahrzeuge dieses Typs
                            const count = vehicles.filter(vehicle => vehicle.vehicle_type == typeId).length;
                            // Füge die Anzahl der Fahrzeuge dem entsprechenden Fahrzeug-Well hinzu
                            vehicleDiv.insertAdjacentHTML('beforeend', `<p>Im Besitz: ${count}</p>`);
                        }
                    });
                })
                .catch(error => console.error('Fehler beim Laden der Fahrzeuge:', error));
        })
        .catch(error => console.error('Fehler beim Laden der Fahrzeugbezeichnungen:', error));
})();
