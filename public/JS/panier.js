//function pour recupérer les données de l'offre mobile sélectionnée et les envoyer au serveur pour les ajouter au panier
document.querySelectorAll('.add-offre-panier-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Récupération des informations de l'offre via les attributs data-*
        const offre = {
            nom: this.getAttribute('data-nom'),
            data_incluse: this.getAttribute('data-data_incluse'),
            appels_sms_inclus: this.getAttribute('data-appels_sms_inclus'),
            prix: this.getAttribute('data-prix')
        };

        fetch('/api/panier/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offre)
        })
        .then(response => response.json())
        .then(data => {
            alert(`${offre.nom} ajouté au panier !`);
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout au panier :', error);
        });
    });
});


//function pour recupérer les données du téléphone sélectionné et les envoyer au serveur pour les ajouter au panier
document.querySelectorAll('.add-telephone-panier-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Récupération des informations du téléphone via les attributs data-*
        const telephone = {
            marque: this.getAttribute('data-marque'),
            modele: this.getAttribute('data-modele'),
            prix: this.getAttribute('data-prix')
        };
        fetch('/api/panier/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(telephone)
        })
        .then(response => response.json())
        .then(data => {
            alert(`${telephone.modele} ajouté au panier !`);
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout au panier :', error);
        });
    });
});

//function pour supprimer un élément du panier
document.querySelectorAll('.remove-panier-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        fetch(`/api/panier/remove/${id}`, {
            method: 'DELETE'
        });
    });
});

//function pour supprimer un élément du panier en utilisant une requete fetch
function supprimerPanier(id) {
    const routeComplete = '/api/panier/remove/' + id;
    fetch(routeComplete, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                // Suppression réussie, on rafraîchit la page pour mettre à jour le panier
                window.location.reload();
            } else {
                return response.json().then(data => {
                    alert(data.message || "Erreur lors de la suppression de l'élément du panier.");
                });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression :', error);
            alert("Erreur lors de la suppression de l'élément du panier.");
        });
};

//notification de suppression d'un élément du panier
document.querySelectorAll('.remove-panier-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        supprimerPanier(id);
    });
});

//notification lors de l'ajout d'une offre mobile au panier
document.querySelectorAll('.add-offre-panier-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const nomOffre = this.getAttribute('data-nom');
        alert(`${nomOffre} ajouté au panier !`);
    });
});

//notification lors de l'ajout d'un téléphone au panier
document.querySelectorAll('.add-telephone-panier-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modeleTelephone = this.getAttribute('data-modele');
        alert(`${modeleTelephone} ajouté au panier !`);
    });
});