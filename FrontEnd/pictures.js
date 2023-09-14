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

// Fonction pour afficher les images de l'API
function afficherImagesAPI() {
  const imageContainer = document.getElementById("Picture");
  if (!imageContainer) {
    console.error("Element 'Picture' introuvable dans le DOM.");
    return;
  }

  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(images => {
      const gridContainer = document.createElement("div");
      gridContainer.style.display = "grid";
      gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
      gridContainer.style.gap = "10px";

      images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;
        imgElement.id = image.id;
        imgElement.setAttribute("data-filter", image.categoryId);

        imgElement.style.width = "310px";
        imgElement.style.height = "413px";

        gridContainer.appendChild(imgElement);
      });

      // Effacez le contenu précédent du conteneur d'images
      while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
      }

      // Ajoutez le conteneur de grille mis à jour au div "Picture"
      imageContainer.appendChild(gridContainer);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des images : " + error);
    });
}

// Fonction d'initialisation
function initialize() {
  // Obtenez une référence au bouton "Ajouter une photo"
  const boutonOuvrirModal = document.getElementById("ouvrirModal");
  const inputFile = document.getElementById("imageInput");

  // Ajoutez un gestionnaire d'événement au bouton pour ouvrir le modal
  boutonOuvrirModal.addEventListener("click", ouvrirModal);

  // Ajoutez un gestionnaire d'événement au bouton de fermeture du modal
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