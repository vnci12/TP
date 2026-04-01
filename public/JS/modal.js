
// Récupère la fenêtre modale
const modal = document.querySelector("#myModal");
const modalContent = document.getElementById("modalContent");
const addToCartBtn = document.getElementById("addToCartBtn");
const span = document.getElementsByClassName("close")[0];

let selectedPhone = null;

// Ouvre le modal avec les infos du téléphone sélectionné
document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        selectedPhone = {
            nom: this.getAttribute('data-nom'),
            marque: this.getAttribute('data-marque'),
            modele: this.getAttribute('data-modele'),
            prix: this.getAttribute('data-prix')
        };
        modalContent.innerHTML = `
            <p><strong>Nom :</strong> ${selectedPhone.nom}</p>
            <p><strong>Marque :</strong> ${selectedPhone.marque}</p>
            <p><strong>Modèle :</strong> ${selectedPhone.modele}</p>
            <p><strong>Prix :</strong> ${selectedPhone.prix} €</p>
        `;
        modal.style.display = "block";
    });
});

// Ferme le modal
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Ajoute au panier (exemple : affichage d'une alerte, à remplacer par logique réelle)
addToCartBtn.onclick = function() {
    if (selectedPhone) {
        alert(`${selectedPhone.nom} ajouté au panier !`);
        modal.style.display = "none";
    }
}