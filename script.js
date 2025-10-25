// Supabase setup
const SUPABASE_URL = "https://vqfkucertpcrkxfqfnad.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY_HERE"; // replace with your key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Buttons
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");

// Modal elements
const authModal = document.getElementById("auth-modal");
const modalTitle = document.getElementById("modal-title");
const authEmail = document.getElementById("auth-email");
const authPassword = document.getElementById("auth-password");
const authRole = document.getElementById("auth-role");
const authSubmit = document.getElementById("auth-submit");
const authClose = document.getElementById("auth-close");

let authType = "signup";

// Open modal
function openModal(type){
  authType = type;
  modalTitle.textContent = type === "signup" ? "Sign Up" : "Log In";
  authModal.style.display = "flex";
}
signupBtn.addEventListener("click", ()=>openModal("signup"));
loginBtn.addEventListener("click", ()=>openModal("login"));

// Close modal
authClose.addEventListener("click", ()=>{
  authModal.style.display = "none";
});

// Submit modal
authSubmit.addEventListener("click", async () => {
  const email = authEmail.value;
  const password = authPassword.value;
  const role = authRole.value;

  if(authType === "signup"){
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } }
    });
    if(error) alert("❌ " + error.message);
    else { 
      alert("✅ Signed up! You can now log in."); 
      authModal.style.display = "none";
    }
  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if(error) alert("❌ Login failed: "+error.message);
    else {
      alert("✅ Logged in!");
      window.location.href = "dashboard.html"; // go to dashboard
    }
  }
});