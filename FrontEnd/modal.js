  // Fonction pour effectuer la requête vers l'API et afficher les images dans le modal
  function afficherImagesAPI() {
    // Effectuer une requête Ajax vers l'API
    fetch('http://localhost:5678/api/works')
      .then(response => response.json()) // Convertir la réponse en JSON
      .then(data => {
        // Sélectionner la div de destination dans le modal
        const modalContainer = document.getElementById('modalImageContainer');
  
        // Créer une div pour afficher les images
        const imagesTable = document.createElement('table');
        imagesTable.classList.add('image-table'); // Ajoutez une classe pour le style CSS
  
        // Créer une ligne pour les images
        let currentRow;
  
        // Parcourir les éléments de l'API et ajouter les images à la table
        data.forEach((element, index) => {
          // Créez une nouvelle ligne après chaque 5ème image
          if (index % 5 === 0) {
            currentRow = document.createElement('tr');
            imagesTable.appendChild(currentRow);
          }
  
          // Créez une cellule pour chaque image
          const cell = document.createElement('td');
  
          // Créez l'image container
          const imageContainer = document.createElement('div');
          const image = document.createElement('img');
          image.src = element.imageUrl; // Assurez-vous que votre API retourne une URL d'image pour chaque élément
          image.alt = element.title;
  
          // Définir la taille des images
          image.style.width = '80px';
          image.style.height = '110px';
  
          // Ajouter une marge de 20 pixels autour de chaque image pour les espacer
          image.style.margin = '10px';
  
          // Centrer l'image horizontalement dans le container
          imageContainer.style.textAlign = 'center';
  
          // Créez l'élément d'icône de poubelle
          const trashIcon = document.createElement('i');
          trashIcon.classList.add('fa', 'fa-solid', 'fa-trash-can');
  
          // Appliquer un style pour déplacer l'icône
          trashIcon.style.position = 'relative';
          trashIcon.style.top = '-100px';
          trashIcon.style.right = '35px';
          trashIcon.style.color = 'white'; // Couleur de l'icône
          trashIcon.style.backgroundColor = 'black'; // Couleur de fond
          trashIcon.style.padding = '3px'; // Augmenter la taille du fond blanc autour de l'icône
          trashIcon.style.borderRadius = '2px';
  
          // Ajouter un gestionnaire d'événement au clic sur l'icône de poubelle
          trashIcon.addEventListener('click', function() {
            // Récupérer l'ID de l'image à supprimer à partir de l'élément
            const imageId = element.id; // Assurez-vous que chaque élément a une propriété "id"
  
            // Appeler la fonction pour supprimer l'image en utilisant l'ID et le jeton d'autorisation
            supprimerImage(imageId, bearerToken);
          });
  
          // Ajouter l'icône de poubelle à l'image container
          imageContainer.appendChild(image);
          imageContainer.appendChild(trashIcon);
  
          // Ajouter l'image container à la cellule
          cell.appendChild(imageContainer);
  
          currentRow.appendChild(cell);
        });
  
        // Ajouter la table des images à la div de destination
        modalContainer.appendChild(imagesTable);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
  }
  

 