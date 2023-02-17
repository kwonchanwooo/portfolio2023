const sections = document.querySelectorAll('.room .inner section');
const lis = document.querySelectorAll('.room .inner ul li');
const ul = document.querySelector('.room .inner ul');
const box3_h1 = document.querySelector('h2');
const box2_p = document.querySelector('p');
const lis_arr = Array.from(lis);

const base = -500;
let posArr = [];

for (let el of sections) {
	posArr.push(el.offsetTop - 80);
}

window.addEventListener('scroll', () => {
	let scroll = window.scrollY || window.pageYOffset;
	// box2_p.style.left = `${scroll - posArr[1] + 300}px`;
	// box3_h1.style.transform = `translateX(${scroll - posArr[2] + 300}px)`;

	sections.forEach((el, index) => {
		if (scroll >= posArr[index] + base) {
			for (let el of lis) {
				el.classList.remove('on');
			}
			lis[index].classList.add('on');

			for (let el of sections) {
				el.classList.remove('on');
			}
			sections[index].classList.add('on');
		}
	});
});

lis.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		new Anim(window, {
			prop: 'scroll',
			value: posArr[index],
			duration: 500,
		});
		active(lis, index);
	});
});

function active(arr, index) {
	for (let el of arr) {
		el.classList.remove('on');
	}
	arr[index].classList.add('on');
}

window.addEventListener('resize', () => {
	setPos();

	const on = ul.querySelector('li.on');
	const on_index = lis_arr.indexOf(on);

	window.scroll(0, posArr[on_index]);
});

function setPos() {
	posArr = [];
	for (let el of sections) {
		posArr.push(el.offsetTop - 80);
	}
}

var swiper = new Swiper('.mySwiper', {
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true,
	},
	pagination: {
		el: '.swiper-pagination',
	},
});

const btns = document.querySelectorAll('#tab main nav ul li');
const boxes = document.querySelectorAll('#tab main section article');
const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');
const topbtn = document.querySelector('.logo2');

topbtn.addEventListener('click', (e) => {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

btns.forEach((a, i) => {
	a.addEventListener('click', (e) => {
		e.preventDefault();

		on(btns, i);

		on(boxes, i);
	});
});

function on(a, i) {
	for (let el of a) {
		el.classList.remove('on');
	}
	a[i].classList.add('on');
}

btnCall.onclick = function (e) {
	e.preventDefault();

	btnCall.classList.toggle('on');
	menuMo.classList.toggle('on');
};
