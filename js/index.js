        const form = document.getElementById("form");
        const msg = document.querySelector(".msg");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const { nome, email, senha, senha2 } = form.elements;

            if (nome.value.trim() === "" || email.value.trim() === "") {
                alert("Escreva os campos corretamente")
                return;
            }

            if (senha.value !== senha2.value) {
                alert("As senhas não coincidem")
                return;
            }

            alert("Cadastro realizado com sucesso!");
            window.location.href = "main.html";
        });