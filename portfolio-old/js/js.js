// Background Site

/* const checkPc = document.querySelector('#checkPc');
const checkCel = document.querySelector('#checkCel');

checkCel.addEventListener('change', (e)=>{  
    if(checkCel.checked == true){
        staticBody(false)
        localStorage.setItem('staticBody', false);
        checkCel.checked = true
        checkPc.checked = true
    }
    else{
        staticBody(true);
        localStorage.setItem('staticBody', true)
        checkCel.checked = false
        checkPc.checked = false
    }
})

checkPc.addEventListener('change', (e)=>{  
    if(checkPc.checked == true){
        staticBody(false)
        localStorage.setItem('staticBody', false);
        checkCel.checked = true
        checkPc.checked = true
    }
    else{
        staticBody(true);
        localStorage.setItem('staticBody', true)
        checkCel.checked = false
        checkPc.checked = false
    }
})

window.onload = function() { 
    var aux = localStorage.getItem('staticBody'); 

    if (aux == 'true'){
        staticBody(true)
        checkPc.checked = false; 
        checkCel.checked = false; 
    }else{
            staticBody(false)
            checkPc.checked = true; 
            checkCel.checked = true; 
    }
}

function staticBody(value){
    var imgBack = document.querySelector('.staticBackground')
    var videoBack = document.querySelector('.videoBackground')

    if(value == true){
        imgBack.style.display   = 'block';
        videoBack.style.display = "none";
    }else{
        imgBack.style.display   = 'none';
        videoBack.style.display = 'block';
    }
} */

// Pagination About Me

const divLinguaguens = document.querySelector('#divLinguaguens');
const divExperiencia = document.querySelector('#divExperiencia');
const divFormacoes = document.querySelector('#divFormacoes');

const btnLinguaguens = document.querySelector('#btnLinguaguens');
const btnExperiencia = document.querySelector('#btnExperiencia');
const btnFormacoes = document.querySelector('#btnFormacoes');

btnLinguaguens.addEventListener('click', (e)=>{
    divLinguaguens.classList.remove('d-none')  
    divLinguaguens.classList.add('d-flex')
    divLinguaguens.classList.add('fadeIn')
    btnLinguaguens.classList.add('active')

    divExperiencia.classList.add('d-none')
    btnExperiencia.classList.remove('active')

    divFormacoes.classList.add('d-none')
    btnFormacoes.classList.remove('active')
})

btnExperiencia.addEventListener('click', (e)=>{
    divExperiencia.classList.remove('d-none')  
    divExperiencia.classList.add('d-flex')
    divExperiencia.classList.add('fadeIn')
    btnExperiencia.classList.add('active')

    divLinguaguens.classList.add('d-none')
    btnLinguaguens.classList.remove('active')

    divFormacoes.classList.add('d-none')
    btnFormacoes.classList.remove('active')
})

btnFormacoes.addEventListener('click', (e)=>{
    divFormacoes.classList.remove('d-none')  
    divFormacoes.classList.add('d-flex')
    divFormacoes.classList.add('fadeIn')
    btnFormacoes.classList.add('active')

    divLinguaguens.classList.add('d-none')
    btnLinguaguens.classList.remove('active')

    divExperiencia.classList.add('d-none')
    btnExperiencia.classList.remove('active')

})


