function logout(){
window.location.href=window.location.origin+"/login.html"
localStorage.removeItem("logintoken")
}