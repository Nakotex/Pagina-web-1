document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');
    const petDetailsContainer = document.getElementById('pet-details-container');
    const profileContainer = document.getElementById('profile-container');
    const petCountInput = document.getElementById('pet-count');

    petCountInput.addEventListener('input', () => {
        const petCount = parseInt(petCountInput.value);
        petDetailsContainer.innerHTML = '';

        for (let i = 0; i < petCount; i++) {
            const petDetailDiv = document.createElement('div');
            petDetailDiv.innerHTML = `
                <h3>Mascota ${i + 1}</h3>
                <label for="pet-name-${i}">Nombre:</label>
                <input type="text" id="pet-name-${i}" name="pet-name-${i}" required>

                <label for="pet-species-${i}">Especie:</label>
                <select id="pet-species-${i}" name="pet-species-${i}" required>
                    <option value="gato">Gato</option>
                    <option value="perro">Perro</option>
                    <!-- Agrega más opciones según sea necesario -->
                </select>

                <label for="pet-breed-${i}">Raza:</label>
                <input type="text" id="pet-breed-${i}" name="pet-breed-${i}" required>
            `;
            petDetailsContainer.appendChild(petDetailDiv);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const profile = {
            name: form.name.value,
            pets: []
        };

        const petCount = parseInt(petCountInput.value);
        for (let i = 0; i < petCount; i++) {
            const pet = {
                name: form[`pet-name-${i}`].value,
                species: form[`pet-species-${i}`].value,
                breed: form[`pet-breed-${i}`].value
            };
            profile.pets.push(pet);
        }

        displayProfile(profile);
    });

    function displayProfile(profile) {
        profileContainer.innerHTML = `<h2>Perfil de ${profile.name}</h2>`;

        profile.pets.forEach((pet, index) => {
            const petDiv = document.createElement('div');
            petDiv.innerHTML = `
                <h3>${pet.name} (${pet.species})</h3>
                <p>Raza: ${pet.breed}</p>
                <div id="info-${index}">
                    <!-- Aquí se añadirá información adicional -->
                </div>
            `;
            profileContainer.appendChild(petDiv);
            fetchPetInfo(pet.species, pet.breed, `info-${index}`);
        });
    }

    function fetchPetInfo(species, breed, elementId) {
        const infoContainer = document.getElementById(elementId);

        // Información simulada (puedes reemplazar esto con una llamada a una API real)
        const info = {
            gato: {
                persa: {
                    care: "Los gatos persas requieren cepillado diario.",
                    food: "Se recomienda alimento para gatos de alta calidad.",
                    vets: ["Veterinaria ABC", "Clínica XYZ"]
                },
                siamés: {
                    care: "Los gatos siameses son muy sociales y necesitan atención.",
                    food: "Prefieren alimentos húmedos.",
                    vets: ["Veterinaria DEF", "Clínica UVW"]
                }
            },
            perro: {
                labrador: {
                    care: "Los labradores necesitan ejercicio diario.",
                    food: "Requieren una dieta balanceada.",
                    vets: ["Veterinaria GHI", "Clínica RST"]
                },
                beagle: {
                    care: "Los beagles son muy energéticos.",
                    food: "Les gusta la comida rica en proteínas.",
                    vets: ["Veterinaria JKL", "Clínica OPQ"]
                }
            }
        };

        const speciesInfo = info[species];
        if (speciesInfo && speciesInfo[breed]) {
            const breedInfo = speciesInfo[breed];
            infoContainer.innerHTML = `
                <p><strong>Cuidado:</strong> ${breedInfo.care}</p>
                <p><strong>Alimento:</strong> ${breedInfo.food}</p>
                <p><strong>Veterinarios cercanos:</strong> ${breedInfo.vets.join(', ')}</p>
            `;
        } else {
            infoContainer.innerHTML = `<p>Información no disponible para esta raza.</p>`;
        }
    }
});
