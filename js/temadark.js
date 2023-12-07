// Tema oscuro
const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('modo-oscuro', 'verdadero');
    } else {
        localStorage.setItem('modo-oscuro', 'falso');
    }
});

//Actualizacion tema oscuro
if (localStorage.getItem('modo-oscuro') === 'verdadero') {
    document.body.classList.add('dark');
    btnSwitch.classList.add('active');
} else {
    document.body.classList.remove('dark');
    btnSwitch.classList.remove('active');
}