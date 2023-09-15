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
          imgElement.id = `image-${image.id}`;
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