

//valider  adresse e-mail
function isValidEmail(email) {
  // Partern de l'adresse e-mail
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

// valider le formulaire
async function validateForm() {
  console.log("Validation du formulaire en cours..."); 

  // Récupération de l'e-mail et du mot de passe à partir des champs de formulaire
  let email = document.getElementById("email").value;
  let password = document.getElementById("mdp").value;

  // Validation de l'e-mail
  if (!isValidEmail(email)) {
    console.log("Adresse e-mail invalide"); 
    alert("Veuillez entrer une adresse e-mail valide."); 
    return false; 
  }
  // Validation du mot de passe
  if (password.length < 6) {
    console.log("Mot de passe invalide"); 
    alert("Le mot de passe doit contenir au moins 6 caractères."); 
    return false; 
  }

  console.log("Formulaire valide. Redirection en cours..."); 

  // connection à l'API
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

  const loginDetails = await response.json();


  console.log(loginDetails); 

  // redirection vers index.html
  if (loginDetails?.token) {
    localStorage.setItem("logintoken",loginDetails.token)
    window.location.href = "../FrontEnd/index.html";
  }
  // const token=localStorage.getItem("logintoken")
  // localStorage.removeItem("logintoken")
}