const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.galleries.getPhotos';
const restgal = "72157721476189071"
const bargal = "72157721524655065"
const spagal = "72157721470708003"
const banqgal = "72157721476188121"

const key = '68728a337d057b4402914f709958247a';
const per_page = 1;
const frame = document.querySelector('#list');

const li = document.querySelectorAll('#wrap nav ul li')
console.log(li)
const rest = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${restgal}&format=json&nojsoncallback=1`;
const bar = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${bargal}&format=json&nojsoncallback=1`;
const spa = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${spagal}&format=json&nojsoncallback=1`;
const bangal = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${banqgal}&format=json&nojsoncallback=1`;



callData(bar);
// callData(bar);

// li.forEach((a, i) => {
//     a.addEventListener('click', (e) => {
//         e.preventDefault();
//         on(li, i)
//         if (li[1].on) callData(rest)
//         if (li[2].on) callData(bar)

//     })
// })



function on(a, i) {
    for (let el of a) {
        el.classList.remove('on')
    }
    a[i].classList.add('on')
}

function callData(rest) {
    fetch(rest)
        .then((data) => {
            // console.log(data)

            return data.json();
        })
        .then((json) => {
            let items = json.photos.photo;
            console.log(items);
            createList(items);

            delayLoading();
        });
}

function createList(items) {
    let htmls = '';

    items.map((el, index) => {
        let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
        let number = 1
        let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
        console.log(items.length)
        htmls += `
        <li class="item">
          <div>
            <a href=${imgSrcBig}>
              <img src=${imgSrc}>
            </a>
            </p>
          </div>
        </li>
      `;
    });
    frame.innerHTML = htmls;
}

function delayLoading() {
    const imgs = frame.querySelectorAll('img');
    const len = imgs.length;

    let count = 0;
    for (let el of imgs) {
        el.addEventListener('load', () => {
            count++;
            if (count == len) isoLayout();
        });
    }
}

function isoLayout() {
    frame.classList.add('on');
    new Isotope('#list', {
        itemSelection: '.item',
        columnWidth: '.item',
        transitionDuration: '0.5s',
    });
}
