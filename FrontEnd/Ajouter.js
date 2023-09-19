// Sélectionnez le bouton "Ajouter image" par son ID
const addButton = document.getElementById("Ajouter-image");
const fileInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const validerButton = document.getElementById("Valider-image");
const pictureContainer = document.getElementById("Picture");
const title = document.getElementById("title");
const category = document.getElementById("category");

// Styles pour les images dans la galerie d'images
const commonImageStyles = {
    width: "310px",
    height: "413px",
};

const modalImages = document.querySelectorAll("#modalImageContainer img");
modalImages.forEach((img) => Object.assign(img.style, commonImageStyles));

// Fonction pour cacher l'aperçu et afficher le formulaire
function hidePreviewAndShowForm() {
    imagePreview.style.display = "none";
    imagePreview.src = "#";
    const label = document.querySelector('label[for="imageInput"]');
    label.style.display = "block";
    addButton.style.display = "block";
}

validerButton.addEventListener("click", () => {
    const selectedFile = fileInput.files[0];
    const bearerToken = localStorage.getItem("logintoken");
    const enteredTitle = title.value; // Obtenir la valeur du champ "title"

    // Vérifier si le champ "title" est vide
    if (enteredTitle.trim() === "") {
        // Afficher un message d'erreur
        alert("Veuillez entrer un titre pour l'image.");
    } else {
        // Si le champ "title" n'est pas vide, envoyer l'image à l'API
        sendImageToAPIAndDisplay(selectedFile, bearerToken);
    }
});

function sendImageToAPIAndDisplay(selectedFile, bearerToken) {
    if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("title", title.value);
        formData.append("category", category.value);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            // Créer une balise "figure" pour l'image nouvellement ajoutée
            const figure = document.createElement("figure");
            figure.id = `imagemodal-${data.id}`; // ID basé sur l'ID du work
            figure.dataset.filter = data.categoryId; // Dataset basé sur la categoryId du work

            // Créer une balise "img" avec le src et alt
            const imgElement = document.createElement("img");
            imgElement.src = data.imageUrl;
            imgElement.alt = data.title; // Utilisez le titre du work comme alt
            Object.assign(imgElement.style, commonImageStyles);

            // Créer une balise "figcaption" avec le texte du titre
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = data.title; // Utilisez le titre du work comme contenu de la légende

            // Ajouter l'image à la balise "figure"
            figure.appendChild(imgElement);

            // Ajouter la légende à la balise "figure"
            figure.appendChild(figcaption);

            // Ajouter la balise "figure" au div "Picture"
            pictureContainer.appendChild(figure);

            console.log("Réponse de l'API :", data);
        })
        .catch((error) => {
            console.error("Erreur lors de l'envoi de l'image à l'API :", error);
        })
        .finally(() => {
            hidePreviewAndShowForm();
        });
    } else {
        console.error("Aucune image sélectionnée pour ajout.");
    }
}



// Ajoutez un gestionnaire d'événements pour détecter lorsque l'utilisateur a sélectionné un fichier
fileInput.addEventListener("change", () => {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        imagePreview.style.display = "block";
        imagePreview.src = URL.createObjectURL(selectedFile);
        const label = document.querySelector('label[for="imageInput"]');
        label.style.display = "none";
        addButton.style.display = "none";
    }
});

// Ajoutez un gestionnaire d'événements au clic sur le bouton "Ajouter image"
addButton.addEventListener("click", () => {
    fileInput.click();
});

// Ajoutez un gestionnaire d'événements pour détecter lorsque l'utilisateur a sélectionné un fichier
fileInput.addEventListener("change", () => {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        imagePreview.style.display = "block";
        imagePreview.src = URL.createObjectURL(selectedFile);
        const label = document.querySelector('label[for="imageInput"]');
        label.style.display = "none";
        addButton.style.display = "none";
    }
});