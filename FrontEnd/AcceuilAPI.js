// Fonction pour afficher les images de l'APIconsole
function afficherImagesAPI() {
  // Récupère l'élément avec l'ID "Picture" dans le DOM
  const pictureContainer = document.getElementById("Picture");
  if (!pictureContainer) {
    // Si l'élément n'est pas trouvé, affiche une erreur dans la console et quitte la fonction
    console.error("Element 'Picture' introuvable dans le DOM.");
    return;
  }

  // Effectue une requête GET à l'URL "http://localhost:5678/api/works" pour récupérer des images depuis l'API
  fetch("http://localhost:5678/api/works")
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(images => {
      images.forEach(image => {
        // Crée une balise "figure" pour chaque image récupérée
        const figure = document.createElement("figure");
        figure.id = `image-${image.id}`; // Définit l'ID en fonction de l'ID de l'image
        figure.dataset.filter = image.categoryId; // Définit un attribut de dataset basé sur la categoryId de l'image

        figure.style.margin = "30px"; // Ajoute une marge à la balise "figure"

        // Crée une balise "img" avec la source (src) et le texte alternatif (alt)
        const imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title; // Utilise le titre de l'image comme texte alternatif
        Object.assign(imgElement.style, commonImageStyles); // Applique des styles d'image communs

        // Crée une balise "figcaption" avec le texte du titre de l'image
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = image.title; // Utilise le titre de l'image comme contenu de la légende

        // Ajoute l'image à la balise "figure"
        figure.appendChild(imgElement);

        // Ajoute la légende à la balise "figure"
        figure.appendChild(figcaption);

        // Ajoute la balise "figure" au conteneur "Picture"
        pictureContainer.appendChild(figure);
      });

      // Applique les styles CSS flex-wrap et flex-direction au conteneur "Picture"
      pictureContainer.style.display = "flex";
      pictureContainer.style.flexWrap = "wrap";
      pictureContainer.style.flexDirection = "row";
      
    })
    .catch(error => {
      // En cas d'erreur lors de la récupération des images, affiche une erreur dans la console
      console.error("Erreur lors de la récupération des images : " + error);
    });
}