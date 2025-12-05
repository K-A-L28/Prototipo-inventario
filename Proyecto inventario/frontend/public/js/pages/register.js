/**********************************************
 * VALIDACIÓN SEGURA PARA FORMULARIO DE REGISTRO
 **********************************************/

document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------------------------------------
       VARIABLES Y ELEMENTOS DEL DOM
    --------------------------------------------------------------*/

    const form = document.getElementById("registerForm");

    const nameOrg = document.getElementById("name_org");
    const nameUser = document.getElementById("name");
    const email = document.getElementById("emailRegister");
    const password = document.getElementById("passwordRegister");

    /* -------------------------------------------------------------
       FUNCIÓN PARA SANITIZAR (ANTI-XSS)
    --------------------------------------------------------------*/
    function sanitizeInput(input) {
        const div = document.createElement("div");
        div.textContent = input;
        return div.innerHTML
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    /* -------------------------------------------------------------
       BLOQUEAR CARACTERES PELIGROSOS
    --------------------------------------------------------------*/
    function blockSpecialChars(e) {
        const key = e.key;

        // Permitir control y movimiento
        if (
            ["Backspace", "Tab", "Enter", "Shift", "Control", "Alt", "Escape",
             "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Delete"].includes(key)
        ) return;

        // Solo letras, números y algunos símbolos permitidos
        const allowed = /^[A-Za-z0-9 ÁÉÍÓÚáéíóúÑñ!@#$%^&*()_+\-=.,]+$/;
        if (!allowed.test(key)) e.preventDefault();
    }

    nameOrg.addEventListener("keydown", blockSpecialChars);
    nameUser.addEventListener("keydown", blockSpecialChars);
    email.addEventListener("keydown", blockSpecialChars);
    password.addEventListener("keydown", blockSpecialChars);

    /* -------------------------------------------------------------
       PREVENIR PEGAR CONTRASEÑA
    --------------------------------------------------------------*/
    password.addEventListener("paste", (e) => e.preventDefault());

    /* -------------------------------------------------------------
       VALIDACIÓN PRINCIPAL
    --------------------------------------------------------------*/
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Eliminar errores previos
        clearErrors();

        let valid = true;

        /* ---------------------------
           VALIDAR NOMBRE DE ORGANIZACIÓN
        ----------------------------*/
        if (nameOrg.value.trim() === "") {
            showError(nameOrg, "El nombre de la organización es obligatorio.");
            valid = false;
        } else if (nameOrg.value.trim().length < 3) {
            showError(nameOrg, "Debe tener al menos 3 caracteres.");
            valid = false;
        }

        /* ---------------------------
           VALIDAR NOMBRE COMPLETO
        ----------------------------*/
        if (nameUser.value.trim() === "") {
            showError(nameUser, "Tu nombre es obligatorio.");
            valid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nameUser.value.trim())) {
            showError(nameUser, "Solo se permiten letras y espacios.");
            valid = false;
        }

        /* ---------------------------
           VALIDAR CORREO
        ----------------------------*/
        if (email.value.trim() === "") {
            showError(email, "El correo es obligatorio.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, "Ingrese un correo válido.");
            valid = false;
        }

        /* ---------------------------
           VALIDAR CONTRASEÑA
        ----------------------------*/
        if (password.value.trim() === "") {
            showError(password, "La contraseña es obligatoria.");
            valid = false;
        } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password.value.trim())) {
            showError(password, "Debe tener mínimo 8 caracteres, una letra y un número.");
            valid = false;
        }

        /* ---------------------------
           SI NO ES VÁLIDO → DETENER
        ----------------------------*/
        if (!valid) return;

        /* ---------------------------
           SI ES VÁLIDO → SANITIZAR Y REDIRIGIR
        ----------------------------*/
        const safeData = {
            organization: sanitizeInput(nameOrg.value.trim()),
            name: sanitizeInput(nameUser.value.trim()),
            email: sanitizeInput(email.value.trim()),
            password: sanitizeInput(password.value.trim())
        };

        console.log("Datos listos para envío seguro:", safeData);

        // Simular registro exitoso
        window.location.href = "registro-completado.html";
    });

    /* -------------------------------------------------------------
       FUNCIONES DE ERROR
    --------------------------------------------------------------*/
    function showError(input, message) {
        input.classList.add("error");

        let span = document.createElement("span");
        span.classList.add("error-message");
        span.textContent = message;

        input.parentElement.appendChild(span);
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(el => el.remove());
        document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
    }

});
