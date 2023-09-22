afficherImagesAPI()

function createImageCell(element) {
      
  // Création de l'image container
  const imageContainer = document.createElement('div');
  imageContainer.id=`imagemodal-${element.id}`
  imageContainer.style.textAlign = 'center';

  // Création de l'image
  const image = document.createElement('img');
  image.src = element.imageUrl;
  image.alt = element.title;
  image.style.width = '80px';
  image.style.height = '110px';
  image.style.margin = '10px';

  // Création l'icône de poubelle
  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fa', 'fa-solid', 'fa-trash-can');
  trashIcon.style.position = 'relative';
  trashIcon.style.top = '-100px';
  trashIcon.style.right = '35px';
  trashIcon.style.color = 'white';
  trashIcon.style.backgroundColor = 'black';
  trashIcon.style.padding = '3px';
  trashIcon.style.borderRadius = '2px';

  //gestionnaire d'événement de l'icône de poubelle
  trashIcon.addEventListener('click', function () {
    const imageId = element.id;
    supprimerImage(imageId);
  });

  // Ajoute l'icône à l'image container
  imageContainer.appendChild(image);
  imageContainer.appendChild(trashIcon);

// Récupération de l'élément HTML avec l'ID
  const imagesContainer= document.getElementById("modal-images-container")
  console.log(imagesContainer)
  // Ajout dans le container 
  imagesContainer.appendChild(imageContainer);

 
}


// Fonction pour effectuer la requête vers l'API et afficher les images dans le modal
function afficherImagesAPI() {

  // Requête Ajax vers l'API
  fetch('http://localhost:5678/api/works')
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((data) => { 

      // Conteneur du modal
      const modalContainer = document.getElementById('modalImageContainer');

      // Conteneur des images
      const imagesContainer = document.createElement('div');
      imagesContainer.id = 'modal-images-container';
      imagesContainer.style.display = 'flex'; 
      imagesContainer.style.flexWrap = 'wrap'; 
      imagesContainer.style.flexDirection = 'row'; 
      imagesContainer.style.marginLeft = '40px'; 
      
      
      // Ajout du conteneur images au conteneur du modal
      modalContainer.appendChild(imagesContainer);

      // Ajout des images à la table
      data.forEach((element, index) => {
        createImageCell(element);
      });

    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données de l'API :", error);
    });
}