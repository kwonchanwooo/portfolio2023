const articles = document.querySelectorAll('.lists article')
let i = 0

for (let el of articles) {
    let pic = el.querySelector('.pic')
    pic.style.backgroundImage = `url(../img/department/dep${i + 1}.jpg)`;
    i++
}
