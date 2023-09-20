function logout() {
    // Supprime le jeton de connexion du localStorage
    localStorage.removeItem("logintoken");
  
    // Redirige l'utilisateur vers la page index.html
    window.location.href = "index.html";
  }