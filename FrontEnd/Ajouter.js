// Sélection de l'élément bouton "Ajouter une image"
const addButton = document.getElementById("Ajouter-image");

// Sélection de l'élément d'entrée de fichier 
const fileInput = document.getElementById("imageInput");

// Sélection de l'élément d'aperçu de l'image 
const imagePreview = document.getElementById("imagePreview");

// Sélection de l'élément bouton "Valider" 
const validerButton = document.getElementById("Valider-image");

// Sélection de l'élément conteneur d'images 
const pictureContainer = document.getElementById("Picture");

// Sélection de l'élément de titre 
const title = document.getElementById("title");

// Sélection de l'élément de catégorie 
const category = document.getElementById("category");

// Styles galerie d'images
const commonImageStyles = {
    width: "310px",
    height: "413px",
};

// Obtient toutes les images du conteneur du modal
const modalImages = document.querySelectorAll("#modalImageContainer img");

// Applique les styles communs à toutes les images
modalImages.forEach((img) => Object.assign(img.style, commonImageStyles));

// Fonction pour afficher l'image à la place du conteneur
function hidePreviewAndShowForm() {
    imagePreview.style.display = "none"; 
    imagePreview.src = "#";
    const label = document.querySelector('label[for="imageInput"]');
    label.style.display = "block"; 
    addButton.style.display = "block"; 
}

// Ajoute un gestionnaire d'événements au clic sur le bouton "Valider"
validerButton.addEventListener("click", () => {
    const selectedFile = fileInput.files[0]; 
    const enteredTitle = title.value; 

    // Vérifier si le champ "title" est vide
    if (enteredTitle.trim() === "") {
        // Afficher un message d'erreur si le champ est vide
        const titleError = document.getElementById("titleError");
        titleError.style.display = "block";
    } else {
        // Si le champ "title" n'est pas vide, envoyer l'image à l'API
        sendImageToAPIAndDisplay(selectedFile);
    }
});

// Fonction pour envoyer l'image à l'API et l'afficher
function sendImageToAPIAndDisplay(selectedFile) {
    const bearerToken = localStorage.getItem("logintoken"); // Obtient le jeton d'authentification de local storage

    if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile); 
        formData.append("title", title.value); 
        formData.append("category", category.value); 

        // Envoie le formulaire à l'API via une requête fetch
        fetch("http://localhost:5678/api/works", {
            method: "POST", 
            headers: {
                "Authorization": `Bearer ${bearerToken}`, 
            },
            body: formData, // Utilise le formulaire comme corps de la requête
        })
        .then((response) => response.json()) // Convertit la réponse en JSON
        .then((data) => {
            createImageCell(data); // Crée une cellule d'image avec les données de l'API

            // Crée une balise "figure" pour afficher l'image
            const figure = document.createElement("figure");
            figure.id = `image-${data.id}`; // ID basé sur l'ID du work
            figure.dataset.filter = data.categoryId; // Dataset basé sur la categoryId du work
            figure.style.margin = "30px"; // Ajoute une marge à la balise "figure"

            // Crée une balise "img" avec le src, alt et les styles de largeur et de hauteur
            const imgElement = document.createElement("img");
            imgElement.src = data.imageUrl;
            imgElement.alt = data.title; // Utilise le titre comme alt
            imgElement.style.width = "310px";
            imgElement.style.height = "413px";

            // Crée une balise "figcaption" avec le texte du titre
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = data.title; // Utilise le titre du work comme contenu de la légende

            // Ajoute l'image à la balise "figure"
            figure.appendChild(imgElement);

            // Ajoute la légende à la balise "figure"
            figure.appendChild(figcaption);

            // Ajoute la balise "figure" au div "Picture"
            pictureContainer.appendChild(figure);

            console.log("Réponse de l'API :", data);
        })
        .catch((error) => {
            console.error("Erreur lors de l'envoi de l'image à l'API :", error);
        })
        .finally(() => {
            hidePreviewAndShowForm(); // Cache l'aperçu et réinitialise le formulaire
        });
    }
}

// Ajoute un gestionnaire d'événements pour détecter lorsque l'utilisateur a sélectionné un fichier
fileInput.addEventListener("change", () => {
    const selectedFile = fileInput.files[0]; // Obtient le fichier sélectionné

    if (selectedFile) {
        imagePreview.style.display = "block"; // Affiche l'aperçu de l'image
        imagePreview.src = URL.createObjectURL(selectedFile); // Affiche l'image sélectionnée dans l'aperçu
        const label = document.querySelector('label[for="imageInput"]');
        label.style.display = "none"; // Cache l'étiquette du champ de fichier
        addButton.style.display = "none"; // Cache le bouton "Ajouter une image"
    }
});

// Ajoute un gestionnaire d'événements au clic sur le bouton "Ajouter image"
addButton.addEventListener("click", () => {
    fileInput.click(); // Clique sur le champ de fichier lorsque le bouton "Ajouter image" est cliqué
});

