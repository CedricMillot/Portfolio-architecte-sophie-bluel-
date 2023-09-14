// Sélectionnez le bouton "Ajouter image" par son ID
const addButton = document.getElementById("Ajouter-image");

// Sélectionnez l'élément d'entrée de fichier par son ID
const fileInput = document.getElementById("imageInput");

// Sélectionnez l'élément d'aperçu de l'image par son ID
const imagePreview = document.getElementById("imagePreview");

// Ajoutez un gestionnaire d'événements au clic sur le bouton "Ajouter image"
addButton.addEventListener("click", function() {
    // Déclenchez le clic sur l'élément d'entrée de fichier lorsque le bouton est cliqué
    fileInput.click();
});

// Ajoutez un gestionnaire d'événements pour détecter lorsque l'utilisateur a sélectionné un fichier
fileInput.addEventListener("change", function() {
    // Accédez au fichier sélectionné par l'utilisateur
    const selectedFile = fileInput.files[0];

    // Vous pouvez maintenant traiter le fichier ici, par exemple l'afficher dans un aperçu
    if (selectedFile) {
        // Affichez l'image dans l'aperçu
        imagePreview.style.display = "block";
        imagePreview.src = URL.createObjectURL(selectedFile);

        // Cachez la balise label et le bouton "Ajouter photo"
        const label = document.querySelector('label[for="imageInput"]');
        label.style.display = "none";
        addButton.style.display = "none";
    }
});

// Sélectionnez le bouton "Valider" par son ID
const validerButton = document.getElementById("Valider-image");

// Ajoutez un gestionnaire d'événements au clic sur le bouton "Valider"
validerButton.addEventListener("click", function() {
    // Accédez à l'image sélectionnée dans l'aperçu
    const imagePreview = document.getElementById("imagePreview");

    // Vérifiez si une image a été sélectionnée
    if (imagePreview.src && imagePreview.src !== "#") {
        // Créez un nouvel élément d'image pour la galerie d'images
        const newImageGallery = document.createElement("img");
        newImageGallery.src = imagePreview.src;
        newImageGallery.alt = "Image ajoutée à la galerie";

        // Appliquez des styles spécifiques à la galerie d'images
        newImageGallery.style.width = "310px";
        newImageGallery.style.height = "413px";

        // Ajoutez la nouvelle image à la galerie (balise <div id="Picture">)
        const pictureDiv = document.getElementById("Picture");
        pictureDiv.appendChild(newImageGallery);

        // Créez un nouvel élément d'image pour le conteneur modal
        const newImageModal = document.createElement("img");
        newImageModal.src = imagePreview.src;
        newImageModal.alt = "Image ajoutée au conteneur modal";

        // Appliquez des styles spécifiques au conteneur modal
        newImageModal.style.width = '80px';
        newImageModal.style.height = '110px';

        // Ajoutez la nouvelle image au conteneur modal (balise <div id="modalImageContainer">)
        const modalImageContainer = document.getElementById("modalImageContainer");
        modalImageContainer.appendChild(newImageModal);

        // Réinitialisez l'aperçu de l'image
        imagePreview.style.display = "none";
        imagePreview.src = "#";

        // Affichez à nouveau la balise label et le bouton "Ajouter photo"
        const label = document.querySelector('label[for="imageInput"]');
        label.style.display = "block";
        addButton.style.display = "block";
    } else {
        // Gérez le cas où aucune image n'a été sélectionnée
        console.error("Aucune image sélectionnée pour ajout.");
    }
});

// Styles pour les images dans la galerie d'images
const pictureImages = document.querySelectorAll("#Picture img");
pictureImages.forEach(img => {
    img.style.width = "310px";
    img.style.height = "413px";
});

// Styles pour les images dans le conteneur modal
const modalImages = document.querySelectorAll("#modalImageContainer img");
modalImages.forEach(img => {
    img.style.width = "80px";
    img.style.height = "110px";
});