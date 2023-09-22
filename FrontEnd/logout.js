function logout() {
    // Supprime le jeton de connexion du localStorage
    localStorage.removeItem("logintoken");
  
    // Redirige l'utilisateur vers la page index.html
    window.location.href = "index.html";
  }
// Vérifier si le token est présent dans le localStorage
if (localStorage.getItem("logintoken")) {
  // Si le token est présent, masquer l'élément
  var loginLink = document.getElementById("loginLink");
  if (loginLink) {
    loginLink.style.display = "none";
  }
}

// Vérifier si le token est présent dans le localStorage
if (!localStorage.getItem("logintoken")) {
  // Si le token n'est pas présent, masquer l'élément
  var unlogLink = document.getElementById("unlogLink");
  if (unlogLink) {
    unlogLink.style.display = "none";
  }
}
// Vérifiez si le token est présent
if (token) {
  // Masquez le bouton "Tous" et la division des filtres
  boutonTous.style.display = "none";
  filtersDiv.style.display = "none";
}