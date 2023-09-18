
// Récupération du token depuis le stockage local (localStorage)
const token = localStorage.getItem("logintoken");

if (token) {
  // Seulement si un token est présent
  const bodyElement = document.getElementsByTagName("body")[0];

  // Créer le conteneur "Mode édition"
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.backgroundColor = "#000"; // Fond noir
  container.style.color = "#FFF"; // Texte blanc
  container.style.textAlign = "center"; // Alignement du texte
  container.style.width = "100%"; // Largeur à 100%
  container.style.height = "30px"; // Hauteur à 30 pixels
  container.style.fontFamily = "Work Sans"; // Police de caractères
  container.style.fontSize = "16px"; // Taille de police
  container.style.fontStyle = "normal"; // Style de police
  container.style.fontWeight = "400"; // Poids de police
  container.style.lineHeight = "30px"; // Hauteur de ligne égale à la hauteur du fond noir
  container.style.cursor = "default";


  // Créer l'élément pour l'icône FontAwesome
  const icon = document.createElement("i");
  icon.classList.add("fa", "fa-light", "fa-pen-to-square");

  // Ajouter l'icône à container
  container.appendChild(icon);

  // Ajouter le texte "Mode édition" après l'icône
  const modeEditionText = document.createTextNode("Mode édition");
  container.appendChild(modeEditionText);

  // Ajouter le conteneur à la page
  bodyElement.appendChild(container);

  // Gestionnaire d'événements pour ouvrir le modal
  container.addEventListener("click", function () {
    // Sélectionnez le modal
    const modal = document.getElementById("myModal");

    // Affichez le modal en le rendant visible
    modal.style.display = "block";
    
    const closeModalBtn = document.getElementById("closeModalBtn");

// Gestionnaire d'événements pour fermer le modal lorsque la croix est cliquée
closeModalBtn.addEventListener("click", function () {
    // Sélectionnez le modal
    const modal = document.getElementById("myModal");

    // Masquez le modal en le rendant invisible
    modal.style.display = "none";
});
  });
}

// Fonction pour créer un bouton stylisé
function createStyledButton(texte) {
  var bouton = document.createElement("input");
  bouton.type = "button";
  bouton.value = texte;
  bouton.style.fontFamily = "Syne"; 
  bouton.style.fontWeight = "700"; 
  bouton.style.color = "white"; 
  bouton.style.backgroundColor = "#1d6154"; 
  bouton.style.marginBottom = "20px";
  bouton.style.marginLeft = "10px"; 
  bouton.style.scrollMarginRight = "10px"; 
  bouton.style.width = "180px"; 
  bouton.style.textAlign = "center"; 
  bouton.style.borderRadius = "60px"; 
  return bouton; 
}

// Sélection du div avec l'id "filters"
const filtersDiv = document.getElementById("filters");

// Création du bouton "Tous" 
const boutonTous = createStyledButton("Tous");
boutonTous.setAttribute("data-filter", "Tous"); 

// Ajout du bouton "Tous" à la division des filtres
filtersDiv.appendChild(boutonTous); 

// Appel à l'API pour récupérer les catégories
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json()) // Conversion de la réponse en JSON
  .then((categories) => {
    // Tri des catégories dans l'ordre souhaité
    categories.sort((a, b) => {
      // Ordre souhaité des catégories
      const ordre = ["Tous", "Objet", "Appartement", "Hotel & restaurent"];
      // Index de chaque catégorie dans l'ordre spécifié
      const indexA = ordre.indexOf(a.name);
      const indexB = ordre.indexOf(b.name);
      
      return indexA - indexB;
    });

    // Parcours des catégories récupérées
    categories.forEach((categorie) => {
      // Création d'un bouton de filtre pour chaque catégorie
      const boutonFiltre = createStyledButton(categorie.name);
      boutonFiltre.setAttribute("data-filter", categorie.id); 

      // Ajout d'un écouteur d'événements pour chaque bouton de filtre
      boutonFiltre.addEventListener("click", () => {
        const filtreSelectionne = boutonFiltre.getAttribute("data-filter");
        const images = document.querySelectorAll("#Picture figure");

        // Affichage ou masquage des images en fonction du filtre sélectionné
        images.forEach((image) => {
          if (filtreSelectionne == image.getAttribute("data-filter")) {
            image.style.display = "block"; 
          } else {
            image.style.display = "none"; 
          }
        });
      });

      // Ajout du bouton de filtre à la division des filtres
      filtersDiv.appendChild(boutonFiltre); 
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des catégories : " + error);
  });

// Écouteur d'événement pour le bouton "Tous"
boutonTous.addEventListener("click", () => {
  const images = document.querySelectorAll("#Picture figure");
  images.forEach((image) => {
    image.style.display = "block"; // Afficher toutes les images
  });

  // Suppression de la classe "active" de tous les boutons de filtre
  const boutonsFiltres = document.querySelectorAll("#filters input[type=button]");
  boutonsFiltres.forEach((bouton) => {
    bouton.classList.remove("active");
  });

  // Ajout de la classe "active" au bouton "Tous" pour le mettre en surbrillance
  boutonTous.classList.add("active");
});
