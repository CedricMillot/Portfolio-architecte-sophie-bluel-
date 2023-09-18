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


    

        images.forEach(image => {
                  // Créer une balise "figure" pour chaque "work"
        const figure = document.createElement("figure");
        figure.id = `image-${image.id}`; // ID basé sur l'ID du work
        figure.dataset.filter = image.categoryId; // Dataset basé sur la categoryId du work

        // Créer une balise "img" avec le src et alt
        const imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title; // Utilisez le titre du work comme alt
        Object.assign(imgElement.style, commonImageStyles);

        // Créer une balise "figcaption" avec le texte du titre
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = image.title; // Utilisez le titre du work comme contenu de la légende

        // Ajouter l'image à la balise "figure"
        figure.appendChild(imgElement);

        // Ajouter la légende à la balise "figure"
        figure.appendChild(figcaption);

        // Ajouter la balise "figure" au div "Picture"
        pictureContainer.appendChild(figure);
      
      });
  
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des images : " + error);
      });
  }



document.addEventListener('DOMContentLoaded', function() {
  // Placez votre code ici pour vous assurer que les éléments existent avant d'essayer d'y accéder.
  const token = localStorage.getItem("logintoken");
  const loginLink = document.getElementById('loginLink');
  const unlogLink = document.getElementById('unlogLink');

  if (token) {
    loginLink.style.display = 'none';
    unlogLink.style.display = 'block';
  } else {
    loginLink.style.display = 'block';
    unlogLink.style.display = 'none';
  }
});