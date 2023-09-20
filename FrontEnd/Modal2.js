// Fonction pour retourner à la div "myModal" lorsque le span est cliqué
function retournerAModal() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.scrollIntoView({ behavior: "smooth" }); // Pour faire défiler jusqu'à la div "myModal"
  } else {
    console.error("Div 'myModal' introuvable dans le DOM.");
  }
}

// Fonction pour ouvrir le modal
function ouvrirModal() {
  const modal = document.getElementById("myModal2");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Element 'myModal2' introuvable dans le DOM.");
  }
}

// Fonction pour fermer le modal
function fermerModal() {
  const modal = document.getElementById("myModal2");
  if (modal) {
    modal.style.display = "none";
  }
}

// Fonction d'initialisation
function initialize() {
  // ...

  // Obtenez une référence au bouton "Ajouter une photo"
  const boutonOuvrirModal = document.getElementById("ouvrirModal");
  const inputFile = document.getElementById("imageInput");

  // Ajoutez un gestionnaire d'événement au bouton pour ouvrir le modal
  boutonOuvrirModal.addEventListener("click", ouvrirModal);

  // Ajoutez un gestionnaire d'événement au bouton de fermeture du modal
  const closeModalBtn2 = document.getElementById("closeModalBtn2");
  closeModalBtn2.addEventListener("click", fermerModal);

  // Obtenez une référence à l'élément de flèche de retour
  const retourModalPrecedentBtn = document.getElementById("retourModalPrecedent");
  
  // Ajoutez un gestionnaire d'événements pour le clic sur l'élément de flèche de retour
  retourModalPrecedentBtn.addEventListener("click", function() {
    const modal2 = document.getElementById("myModal2");
    if (modal2) {
      modal2.style.display = "none"; // Ferme le Modal2 en masquant son affichage
    }

    const modal = document.getElementById("myModal"); // Affiche le Modal1
    if (modal) {
      modal.style.display = "block";
    }
  });

  // Appeler la fonction pour afficher les images de l'API au chargement de la page
  afficherImagesAPI();
}

// Attendez que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", initialize);