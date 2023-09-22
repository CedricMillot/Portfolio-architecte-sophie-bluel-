//valider adresse e-mail
function isValidEmail(email) {
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //vérifier si l'e-mail correspond au modèle
  return emailPattern.test(email);
}

// valider le formulaire
async function validateForm() {
  console.log("Validation du formulaire en cours...");

  // Récupération de l'e-mail et du mot de passe 
  let email = document.getElementById("email").value;
  let password = document.getElementById("mdp").value;

  // Validation de l'e-mail
  if (!isValidEmail(email)) {
    console.log("Adresse e-mail invalide");
    alert("Veuillez entrer une adresse e-mail valide.");
    return false; // Empêche l'envoi du formulaire si l'e-mail est invalide
  }
  // Validation du mot de passe
  if (password.length < 6) {
    console.log("Mot de passe invalide");
    alert("Le mot de passe doit contenir au moins 6 caractères.");
    return false; // Empêche l'envoi du formulaire si le mot de passe est invalide
  }

  console.log("Formulaire valide. Redirection en cours...");

  // Connexion à l'API
  const response = await fetch("http://localhost:5678/api/users/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  // Récupération des détails de connexion 
  const loginDetails = await response.json();

  console.log(loginDetails);

  // Redirection vers index.html si le Token est bon
  if (loginDetails?.token) {
    
    localStorage.setItem("logintoken", loginDetails.token);
    
    window.location.href = "../FrontEnd/index.html";
  }
}