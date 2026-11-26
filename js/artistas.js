        const cards = document.querySelectorAll('.card-artista');
        const fundoBalao = document.getElementById('fundo-balao');
        const btnFechar = document.getElementById('fechar-balao');

        const balaoImg = document.getElementById('balao-img');
        const balaoNome = document.getElementById('balao-nome');
        const balaoGenero = document.getElementById('balao-genero');
        const balaoDescricao = document.getElementById('balao-descricao');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                balaoImg.src = card.querySelector('img').src;
                balaoImg.alt = card.querySelector('h3').textContent;
                balaoNome.textContent = card.querySelector('h3').textContent;
                balaoGenero.textContent = card.querySelector('p').textContent;
                balaoDescricao.textContent = card.getAttribute('data-descricao');

                fundoBalao.classList.remove('oculto');
            });
        });

        btnFechar.addEventListener('click', () => {
            fundoBalao.classList.add('oculto');
        });

        fundoBalao.addEventListener('click', (evento) => {
            if (evento.target === fundoBalao) {
                fundoBalao.classList.add('oculto');
            }
        });

        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape') {
                fundoBalao.classList.add('oculto');
            }
        });