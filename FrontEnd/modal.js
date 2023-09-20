afficherImagesAPI()
function createImageCell(element) {
      
  // Créez l'image container
  const imageContainer = document.createElement('div');
  imageContainer.id=`imagemodal-${element.id}`
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

  const imagesContainer= document.getElementById("modal-images-container")
console.log(imagesContainer)
  // Ajouter l'image container à la cellule
  imagesContainer.appendChild(imageContainer);

 
}


// Fonction pour effectuer la requête vers l'API et afficher les images dans le modal
function afficherImagesAPI() {
  // Fonction pour créer une cellule avec une image et une icône de poubelle
 
  // Effectuer une requête Ajax vers l'API
  fetch('http://localhost:5678/api/works')
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((data) => { 
   
       // Sélectionner la div de destination dans le modal
       const modalContainer = document.getElementById('modalImageContainer');
       
      const imagesContainer = document.createElement('div');
      imagesContainer.id="modal-images-container"
      modalContainer.appendChild(imagesContainer);

      // Parcourir les éléments de l'API et ajouter les images à la table
      data.forEach((element, index) => {
        createImageCell(element);
      });

   

    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données de l'API :", error);
    });
}