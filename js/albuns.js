function filtrarAlbuns(genero, botaoClicado) {
    const albuns = document.querySelectorAll('.wm');

    albuns.forEach(album => {
        const generoDoAlbum = album.getAttribute('data-genero');
        
        if (genero === 'todos' || generoDoAlbum === genero) {
            album.classList.remove('escondido');
        } else {
            album.classList.add('escondido');
        }
    });

    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    
    if (botaoClicado) {
        botaoClicado.classList.add('ativo');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const parametrosURL = new URLSearchParams(window.location.search);
    const generoURL = parametrosURL.get('genero');

    if (generoURL) {
        const botoes = document.querySelectorAll('.btn-filtro');
        let botaoAlvo = null;

        botoes.forEach(btn => {
            if (btn.getAttribute('onclick').includes(`'${generoURL}'`)) {
                botaoAlvo = btn;
            }
        });

        filtrarAlbuns(generoURL, botaoAlvo);
    }
});
