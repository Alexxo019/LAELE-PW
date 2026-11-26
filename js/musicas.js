let controlador = null;
let cardAtual = null;
let tocarQuandoPronto = false;
let fallback = null;

const cards = document.querySelectorAll('.card-artista');

function resetarCard(card) {
    card.classList.remove('tocando');
    card.querySelector('.btn-play').textContent = '▶';
}

function marcarTocando(card) {
    card.classList.add('tocando');
    card.querySelector('.btn-play').textContent = '❚❚';
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const elemento = document.getElementById('player-spotify');
    const opcoes = {
        width: '100%',
        height: 80,
        uri: cards[0].dataset.spotify
    };

    IFrameAPI.createController(elemento, opcoes, (ctrl) => {
        controlador = ctrl;
        ctrl.addListener('ready', () => {
            console.log('Player do Spotify pronto');

            if (tocarQuandoPronto) {
                tocarQuandoPronto = false;
                clearTimeout(fallback);
                ctrl.play();
            }
        });

        ctrl.addListener('playback_update', (e) => {
            if (!cardAtual) return;
            if (e.data.isPaused) {
                resetarCard(cardAtual);
            } else {
                marcarTocando(cardAtual);
            }
        });
    });
};

const script = document.createElement('script');
script.src = 'https://open.spotify.com/embed/iframe-api/v1';
script.async = true;
document.body.appendChild(script);

cards.forEach(card => {
    const botao = card.querySelector('.btn-play');

    botao.addEventListener('click', () => {
        if (!controlador) {
            console.warn('O player do Spotify ainda não carregou.');
            return;
        }

        if (cardAtual === card) {
            controlador.togglePlay();
            return;
        }

        if (cardAtual) resetarCard(cardAtual);
        cardAtual = card;
        marcarTocando(card);

        const uri = card.dataset.spotify;
        console.log('Carregando:', uri);

        tocarQuandoPronto = true;
        controlador.loadUri(uri);
        controlador.play();

        clearTimeout(fallback);
        fallback = setTimeout(() => {
            if (tocarQuandoPronto) {
                tocarQuandoPronto = false;
                controlador.play();
            }
        }, 1500);
    });
});
