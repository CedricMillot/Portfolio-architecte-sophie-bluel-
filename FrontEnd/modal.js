afficherImagesAPI()

// Fonction pour effectuer la requête vers l'API et afficher les images dans le modal
function afficherImagesAPI() {
  // Fonction pour créer une cellule avec une image et une icône de poubelle
  function createImageCell(element) {
    // Créez une cellule pour chaque image
    const cell = document.createElement('td');
    cell.id=`imagemodal-${element.id}`

    // Créez l'image container
    const imageContainer = document.createElement('div');
    imageContainer.style.textAlign = 'center';

    // Créez l'image
    const image = document.createElement('img');
    image.src = element.imageUrl;
    image.alt = element.title;
    image.style.width = '80px';
    image.style.height = '110px';
    image.style.margin = '10px';

    // Créez l'icône de poubelle
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-solid', 'fa-trash-can');
    trashIcon.style.position = 'relative';
    trashIcon.style.top = '-100px';
    trashIcon.style.right = '35px';
    trashIcon.style.color = 'white';
    trashIcon.style.backgroundColor = 'black';
    trashIcon.style.padding = '3px';
    trashIcon.style.borderRadius = '2px';

    // Ajoutez un gestionnaire d'événement au clic sur l'icône de poubelle
    trashIcon.addEventListener('click', function () {
      const imageId = element.id;
      supprimerImage(imageId, bearerToken);
    });

    // Ajouter l'icône de poubelle à l'image container
    imageContainer.appendChild(image);
    imageContainer.appendChild(trashIcon);

    // Ajouter l'image container à la cellule
    cell.appendChild(imageContainer);

    return cell;
  }

  // Effectuer une requête Ajax vers l'API
  fetch('http://localhost:5678/api/works')
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((data) => { 
   
      // Sélectionner la div de destination dans le modal
      const modalContainer = document.getElementById('modalImageContainer');

      // Créer une table pour afficher les images
      const imagesTable = document.createElement('table');
      imagesTable.classList.add('image-table');

      // Créer une ligne pour les images
      let currentRow;

      // Parcourir les éléments de l'API et ajouter les images à la table
      data.forEach((element, index) => {
        // Créez une nouvelle ligne après chaque 5ème image
        if (index % 5 === 0) {
          currentRow = document.createElement('tr');
          imagesTable.appendChild(currentRow);
        }

        // Créer une cellule avec l'image et l'icône de poubelle
        const cell = createImageCell(element);

        // Ajouter la cellule à la ligne actuelle
        currentRow.appendChild(cell);
      });

      // Ajouter la table des images à la div de destination
      modalContainer.appendChild(imagesTable);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données de l'API :", error);
    });
}