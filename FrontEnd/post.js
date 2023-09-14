// Fonction pour ajouter une image à l'API
function ajouterImageAPI(image, token) {
    const formData = new FormData();
    formData.append("image", image);
  
    const headers = new Headers({
      'Authorization': `Bearer ${token}`,
    });
  
    const options = {
      method: "POST",
      headers: headers,
      body: formData,
    };
  
    return fetch("http://localhost:5678/api/works", options)
      .then(response => {
        if (response.ok) {
          console.log("L'image a été ajoutée avec succès");
        } else {
          console.error("Erreur lors de l'ajout de l'image");
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'envoi de la requête :", error);
      });
  }

  // Fonction d'initialisation
function initialize() {
    // Obtenez une référence au bouton "Ajouter une photo"
    const boutonOuvrirModal = document.getElementById("ouvrirModal");
    const inputFile = document.getElementById("imageInput");
  
    // Ajoutez un gestionnaire d'événement au bouton pour ouvrir le modal
    boutonOuvrirModal.addEventListener("click", ouvrirModal);
  
    // Ajoutez un gestionnaire d'événement au bouton de fermeture du 
    const closeModalBtn2 = document.getElementById("closeModalBtn2");
    closeModalBtn2.addEventListener("click", fermerModal);
  
    // Ajoutez un gestionnaire d'événement pour le changement de sélection de fichier
    inputFile.addEventListener("change", function (event) {
      const selectedFile = event.target.files[0];
      const token = localStorage.getItem("logintoken");
      ajouterImageAPI(selectedFile, token);
    });
  
    // Appeler la fonction pour afficher les images de l'API au chargement de la page
    afficherImagesAPI();
  }
  
  // Attendez que le DOM soit complètement chargé
  document.addEventListener("DOMContentLoaded", initialize);
  
  // Vérifiez si l'élément "myModal2" existe dans le DOM
  const modal2 = document.getElementById("myModal2");
  if (!modal2) {
    console.error("Element 'myModal2' introuvable dans le DOM.");
  }