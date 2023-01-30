// const btns = document.querySelectorAll('ul li')
const btns = document.querySelectorAll('#tab main nav ul li')
const boxes = document.querySelectorAll('#tab main section article')
const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');


console.log(btns)
console.log(boxes)


btns.forEach((a, i) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();

        on(btns, i)

        on(boxes, i)
    })
})

function on(a, i) {
    for (let el of a) {
        el.classList.remove('on')
    }
    a[i].classList.add('on')
}

btnCall.onclick = function (e) {
    e.preventDefault();

    btnCall.classList.toggle('on')
    menuMo.classList.toggle('on')
}

var swiper = new Swiper(".mySwiper", {
    // mousewheel: true,
    touchEventsTarget: 'wrapper',
    loop: true,
    grabCursor: true,

    keyboard: {
        enabled: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
});    