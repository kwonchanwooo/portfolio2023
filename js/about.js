const articles = document.querySelectorAll('.lists article')
console.log(articles)
let i = 0

for (let el of articles) {
    let pic = el.querySelector('.pic')


    pic.style.backgroundImage = `url(./img/department/dep${i + 1}.jpg)`;
    i++
}

// for (let i = 0; i++; i < articles.length) {
//     let pic = articles.querySelector('.pic')
//     pic.style.backgroundImage = `url(../img/department/dep${i + 1}.jpg)`
// }