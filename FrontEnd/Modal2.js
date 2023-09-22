// Fonction pour ouvrir le modal
function ouvrirModal() {
  const modal = document.getElementById("myModal2");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Element 'myModal2' introuvable dans le DOM.");
  }
}
// Fonction pour retourner  
function retournerAModal() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.scrollIntoView({ behavior: "smooth" }); 
  } else {
    console.error("Div 'myModal' introuvable dans le DOM.");
  }
}
// Fonction pour fermer 
function fermerModal() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "none";
    const modal2 = document.getElementById("myModal2");
    if (modal2) {
      modal2.style.display = "none";
    }
  }
}

// Fonction d'initialisation
function initialize() {
  
  // Ajouter une photo
  const boutonOuvrirModal = document.getElementById("ouvrirModal");
  const inputFile = document.getElementById("imageInput");

  // Ouvrir le modal
  boutonOuvrirModal.addEventListener("click", ouvrirModal);

  // Fermer le modal
  const closeModalBtn2 = document.getElementById("closeModalBtn2");
  closeModalBtn2.addEventListener("click", fermerModal);

  //  Bouton flèche de retour
  const retourModalPrecedentBtn = document.getElementById("retourModalPrecedent");
  
  //  Gestionnaire d'événements flèche de retour
  retourModalPrecedentBtn.addEventListener("click", function() {
    const modal2 = document.getElementById("myModal2");
    if (modal2) {
      modal2.style.display = "none"; // Masque le modal
    }

    const modal = document.getElementById("myModal"); // Affiche le Modal
    modal.style.display = "block";
  });

  // Fonction pour afficher les images de l'API
  afficherImagesAPI();
}

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", initialize);