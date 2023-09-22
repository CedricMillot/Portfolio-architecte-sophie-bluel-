// Récupération du token
const token = localStorage.getItem("logintoken");

if (token) {
  // Si le token est présent
  const bodyElement = document.getElementsByTagName("body")[0];

  // Conteneur "Mode édition"
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.backgroundColor = "#000";
  container.style.color = "#FFF";
  container.style.textAlign = "center";
  container.style.width = "100%";
  container.style.height = "30px";
  container.style.fontFamily = "Work Sans";
  container.style.fontSize = "16px";
  container.style.fontStyle = "normal";
  container.style.fontWeight = "400";
  container.style.lineHeight = "30px";
  container.style.cursor = "default";

  // Icône "Mode édition"
  const icon = document.createElement("i");
  icon.classList.add("fa", "fa-light", "fa-pen-to-square");

  // Ajout de l'icône au conteneur
  container.appendChild(icon);

  // Texte "Mode édition"
  const modeEditionText = document.createTextNode("Mode édition");
  container.appendChild(modeEditionText);

  // Ajout du conteneur à la page
  bodyElement.appendChild(container);

  // Ouvre le modal
  container.addEventListener("click", function () {
    // Sélectionne le modal
    const modal = document.getElementById("myModal");

    // Affiche le modal
    modal.style.display = "block";

    // Sélection du bouton pour fermer le modal
    const closeModalBtn = document.getElementById("closeModalBtn");

    // Ferme le modal
    closeModalBtn.addEventListener("click", function () {
      // Sélection du modal
      const modal = document.getElementById("myModal");

      // Masque le modal
      modal.style.display = "none";
    });
  });


 // Sélectionnez l'élément du titre "Mes Projets"
 const titleElement = document.getElementById("projets");

  // Bouton modifier
  const modifyButton = document.createElement("button");
  modifyButton.style.backgroundColor = "#FFF"; // Fond blanc
  modifyButton.style.color = "#000"; // Texte noir
  modifyButton.style.textAlign = "center";
  modifyButton.style.fontFamily = "Work Sans";
  modifyButton.style.fontSize = "14px";
  modifyButton.style.fontStyle = "normal";
  modifyButton.style.fontWeight = "400";
  modifyButton.style.lineHeight = "normal";
  modifyButton.style.border = "none"; // Suppression de la bordure
  modifyButton.style.cursor = "pointer"; // Utilisez un curseur pointeur pour indiquer que c'est un bouton
  modifyButton.style.marginLeft = "10px"; // Ajoute une marge à gauche du bouton

  // Créez l'icône "fa-pen-to-square" en noir
  const iconBlack = document.createElement("i");
  iconBlack.classList.add("fas", "fa-pen-to-square", "black-icon"); 


  // Ajoutez l'icône noire et le texte au bouton
  modifyButton.appendChild(iconBlack);
  modifyButton.appendChild(document.createTextNode(" Modifier"));

  // Ajoutez le bouton "Modifier" à la suite du titre "Mes Projets" 
  titleElement.appendChild(modifyButton);


 // Ajoutez le bouton "Modifier" à la suite du titre "Mes Projets"
 titleElement.appendChild(modifyButton);

 // Copiez le code de gestion du "mode édition" et adaptez-le pour le bouton "Modifier"
 modifyButton.addEventListener("click", function () {
   // Sélectionnez le modal
   const modal = document.getElementById("myModal");

   // Affichez le modal
   modal.style.display = "block";

   // Sélectionnez le bouton pour fermer le modal
   const closeModalBtn = document.getElementById("closeModalBtn");

   // Fermez le modal lorsque le bouton de fermeture est cliqué
   closeModalBtn.addEventListener("click", function () {
     // Sélectionnez le modal
     const modal = document.getElementById("myModal");

     // Masquez le modal
     modal.style.display = "none";
   });
 });
}

// Création du "div" des filtres
const filtersDiv = document.getElementById("filters");

// Bouton "Tous" 
const boutonTous = createStyledButton("Tous");
boutonTous.setAttribute("data-filter", "Tous"); 

// Bouton stylisé filtres
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


// Ajout du bouton dans les filtres
filtersDiv.appendChild(boutonTous); 

// Mouse hover du filtres "Tous"
boutonTous.addEventListener("mouseover", function () {
  boutonTous.style.backgroundColor = "white";
  boutonTous.style.color = "#1d6154";
});

boutonTous.addEventListener("mouseout", function () {
  boutonTous.style.backgroundColor = "#1d6154";
  boutonTous.style.color = "white";
});

// Appel à l'API pour les catégories
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json()) 
  .then((categories) => {
    // Tri des catégories 
    categories.sort((a, b) => {
      // Ordre des catégories
      const ordre = ["Tous", "Objet", "Appartement", "Hotel & restaurent"];
      // Ordre spécifié des catégories
      const indexA = ordre.indexOf(a.name);
      const indexB = ordre.indexOf(b.name);

      return indexA - indexB;
    });

    categories.forEach((categorie) => {
      // Création du bouton de filtre 
      const boutonFiltre = createStyledButton(categorie.name);
      boutonFiltre.setAttribute("data-filter", categorie.id); 

      // Ecouteur d'événements pour les bouton de filtre
      boutonFiltre.addEventListener("click", () => {
        const filtreSelectionne = boutonFiltre.getAttribute("data-filter");
        const images = document.querySelectorAll("#Picture figure");

        // Affichage ou masquage les images en fonction du filtre 
        images.forEach((image) => {
          if (filtreSelectionne == image.getAttribute("data-filter")) {
            image.style.display = "block"; 
          } else {
            image.style.display = "none"; 
          }
        });
      });

      // Mouse hover des filtres "Objet", "Appartement", "Hotel & restaurent"
      boutonFiltre.addEventListener("mouseover", function () {
        boutonFiltre.style.backgroundColor = "white";
        boutonFiltre.style.color = "#1d6154";
      });

      boutonFiltre.addEventListener("mouseout", function () {
        boutonFiltre.style.backgroundColor = "#1d6154";
        boutonFiltre.style.color = "white";
      });

      // Ajout des filtre "Objet", "Appartement", "Hotel & restaurent" à la "div"
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
    image.style.display = "block"; 
  });
});