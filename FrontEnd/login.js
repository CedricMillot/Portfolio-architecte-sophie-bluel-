//valider adresse e-mail
function isValidEmail(email) {
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //vérifier si l'e-mail correspond au modèle
  return emailPattern.test(email);
}

async function validateForm() {
  console.log("Validation du formulaire en cours...");

  // Récupération de l'e-mail et du mot de passe
  let email = document.getElementById("email").value;
  let password = document.getElementById("mdp").value;
  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");

  // Validation de l'e-mail
  if (!isValidEmail(email)) {
    emailError.style.display = "block"; // Afficher le message d'erreur pour l'e-mail
    passwordError.style.display = "none"; // Masquer le message d'erreur pour le mot de passe
    return false;
  } else {
    emailError.style.display = "none"; // Masquer le message d'erreur pour l'e-mail si l'e-mail est valide
  }

  // Validation du mot de passe
  if (password.length < 6) {
    passwordError.style.display = "block"; // Afficher le message d'erreur pour le mot de passe
    emailError.style.display = "none"; // Masquer le message d'erreur pour l'e-mail
    return false;
  } else {
    passwordError.style.display = "none"; // Masquer le message d'erreur pour le mot de passe si le mot de passe est valide
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