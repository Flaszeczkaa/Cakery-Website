document.addEventListener("DOMContentLoaded", () => {
    
    const modal = document.getElementById("LogInModal");
    const loginLink = document.getElementById("login-link");
    const closeBtn = document.querySelector(".close"); 
    const adminLinks = document.querySelectorAll(".admin-only");

    //FUNKCJA AKTUALIZUJĄCA WYGLĄD STRONY 
    function updateUI() {
        const isLoggedIn = localStorage.getItem("isAdmin") === "true";

        if (isLoggedIn) {
            adminLinks.forEach(link => link.style.display = "inline-block");
            if (loginLink) loginLink.textContent = "Wyloguj się";
        } else {
            adminLinks.forEach(link => link.style.display = "none");
            if (loginLink) loginLink.textContent = "Zaloguj się";
        }
    }

    updateUI();

    //OBSŁUGA PRZYCISKU ZALOGUJ / WYLOGUJ 
    if (loginLink) {
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            const isLoggedIn = localStorage.getItem("isAdmin") === "true";

            if (isLoggedIn) {
                localStorage.removeItem("isAdmin");
                alert("Wylogowano pomyślnie.");
                if (window.location.pathname.includes("/html/")) {
                    window.location.href = "../index.html"; 
                } else {
                    window.location.reload(); 
                }
            } else {
                if (modal) {
                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                }
            }
        });
    }

    //OBSŁUGA FORMULARZA LOGOWANIA 
    const loginForm = document.querySelector("#LogInModal .contact-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault(); 
            
            const inputs = loginForm.querySelectorAll("input");
            if(inputs.length >= 2) {
                const username = inputs[0].value;
                const password = inputs[1].value;

                if (username === "admin" && password === "admin") {
                    localStorage.setItem("isAdmin", "true");
                    alert("Zalogowano pomyślnie!");
                    
                    if (modal) modal.style.display = "none";
                    document.body.style.overflow = "auto";
                    updateUI(); 
                    
                    inputs[0].value = "";
                    inputs[1].value = "";
                } else {
                    alert("Błędny login lub hasło!");
                }
            }
        });
    }

    // OBSŁUGA MODALA 
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    if (modal) {
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    // OBSŁUGA SLIDERA 
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (sliderTrack && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: 330, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: -330, behavior: 'smooth' });
        });
    }

    // Edycja Postów
    const postForm = document.getElementById("post-form");
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            alert('Sukces! Zmiany w ogłoszeniu zostały zapisane.');
            window.location.href = 'posts.html'; 
        });
    }

    // Edycja Użytkowników
    const usersForm = document.getElementById("users-form"); 
    if (usersForm) {
        usersForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            alert('Sukces! Zmiany w profilu zostały zapisane.');
            window.location.href = 'users.html'; 
        });
    }

});