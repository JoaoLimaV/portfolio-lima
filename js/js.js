//Windows.load

window.addEventListener('load', function () {
    var largura = window.screen.width;
    tScreen = (largura <= 785) ? 370 : 650;
    
});

// Texto Digita Sozinho - Inicio

    const typeIt = new TypeIt("#texto-digita-sozinho", {
        loop: true,
    })
    .type('Desenvolvedor Web', {delay: 1000}).delete(17)
    .type('BackEnd e FrontEnd', {delay: 1000}).delete(29)
    .go();

typeIt.go();

// OffCanvas Mobile

function closeOC() {
    var btn_oc = document.getElementById("btn-close-oc");
    setTimeout(function () {
        btn_oc.click();
    }, 500);
}

// Download CV

function downloadCV() {
    var url = "Curriculo.pdf";
    var a = document.createElement("a");
    a.href = url;
    a.download = "cv_joãolima";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Pagination About Me - Sobre mim

const divLinguaguens = document.querySelector('#divLinguaguens');
const divExperiencia = document.querySelector('#divExperiencia');
const divFormacoes = document.querySelector('#divFormacoes');

const btnLinguaguens = document.querySelector('#btnLinguaguens');
const btnExperiencia = document.querySelector('#btnExperiencia');
const btnFormacoes = document.querySelector('#btnFormacoes');

btnLinguaguens.addEventListener('click', (e) => {
    divLinguaguens.classList.remove('d-none')
    divLinguaguens.classList.add('d-flex')
    divLinguaguens.classList.add('fadeIn')
    btnLinguaguens.classList.add('active')

    divExperiencia.classList.add('d-none')
    btnExperiencia.classList.remove('active')

    divFormacoes.classList.add('d-none')
    btnFormacoes.classList.remove('active')
})

btnExperiencia.addEventListener('click', (e) => {
    divExperiencia.classList.remove('d-none')
    divExperiencia.classList.add('d-flex')
    divExperiencia.classList.add('fadeIn')
    btnExperiencia.classList.add('active')

    divLinguaguens.classList.add('d-none')
    btnLinguaguens.classList.remove('active')

    divFormacoes.classList.add('d-none')
    btnFormacoes.classList.remove('active')
})

btnFormacoes.addEventListener('click', (e) => {
    divFormacoes.classList.remove('d-none')
    divFormacoes.classList.add('d-flex')
    divFormacoes.classList.add('fadeIn')
    btnFormacoes.classList.add('active')

    divLinguaguens.classList.add('d-none')
    btnLinguaguens.classList.remove('active')

    divExperiencia.classList.add('d-none')
    btnExperiencia.classList.remove('active')

})

//Carrousel - Meu projetos

let aux = 0;
let tScreen = 650;

window.addEventListener('resize', function () {
    var largura = window.screen.width;
    tScreen = (largura <= 785) ? 370 : 650;
});

function slide(sinal) {
    var carrousel = document.getElementById("carrousel");
    var numProjetos = document.querySelectorAll(".projeto");
    aux++;

    if (sinal > 0) {
        let transformActual = carrousel.style.transform;
        transformActual = (transformActual) ? parseInt(transformActual.match(/-?\d+/)[0]) : 0;

        if (transformActual == 0) {
            aux = numProjetos.length - 1;
            carrousel.style.transform = `translateX(${(aux * tScreen) * -1}px)`;
            return;
        }

        carrousel.style.transform = `translateX(${transformActual + tScreen}px)`;
        return;
    }

    aux = (aux > numProjetos.length - 1) ? 0 : aux;
    carrousel.style.transform = `translateX(${(aux * tScreen) * sinal}px)`;
}

// Fale Comigo - Contato

const inputFale = document.getElementById('text_area_fale');
spanCaracter = document.getElementById('caracter-contato');

inputFale.addEventListener("keyup", function () {
    spanCaracter.innerHTML = inputFale.value.length;
});



