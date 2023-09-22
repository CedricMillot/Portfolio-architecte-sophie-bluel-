// Fonction pour effectuer la requête DELETE vers l'API et supprimer les images
function supprimerImage(imageId) {
    const token = localStorage.getItem("logintoken")
    // Créez un objet d'en-têtes avec le jeton d'autorisation
    const headers = new Headers({
      'Authorization': `Bearer ${token}`, // Ajoutez le jeton d'autorisation dans les en-têtes
    });
  
    // Options de la requête, y compris la méthode DELETE et les en-têtes
    const options = {
      method: 'DELETE',
      headers: headers, // Utilisez l'objet d'en-têtes que vous avez créé
    };
  
    // Envoyer une requête de suppression à l'API en utilisant l'ID de l'image et les en-têtes
    fetch(`http://localhost:5678/api/works/${imageId}`, options)
      .then(response => {
        if (response.ok) {
          
          
          // Supprimer l'élément du DOM
          const imageElement = document.getElementById(`image-${imageId}`);
          const imageElementModal = document.getElementById(`imagemodal-${imageId}`);
          
            imageElement.remove();
        
            imageElementModal.remove();
        } else {
          // Gérer les erreurs de suppression d'image
          console.error('Erreur lors de la suppression de l\'image');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'image :', error);
      });
  }
