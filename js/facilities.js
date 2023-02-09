const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.galleries.getPhotos';
const restgal = "72157721476189071"
const bargal = "72157721524655065"
const spagal = "72157721470708003"
const banqgal = "72157721476188121"

const key = '68728a337d057b4402914f709958247a';
const per_page = 1;
const frame = document.querySelector('#list');
const loading = document.querySelector('.loading');

const li = document.querySelectorAll('#wrap nav ul li')
const bangal = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${banqgal}&format=json&nojsoncallback=1`;





callData(bangal)
li[0].addEventListener('click', () => {
    const bangal = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${banqgal}&format=json&nojsoncallback=1`;


    callData(bangal)
})

li[1].addEventListener('click', () => {
    const rest = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${restgal}&format=json&nojsoncallback=1`;

    callData(rest)
})
li[2].addEventListener('click', () => {
    const bar = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${bargal}&format=json&nojsoncallback=1`;

    callData(bar)
})
li[3].addEventListener('click', () => {
    const spa = `${base}method=${method}&api_key=${key}&per_page=${per_page}&gallery_id=${spagal}&format=json&nojsoncallback=1`;
    callData(spa)
})



li.forEach((a, i) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();

        on(li, i)

    })
})

function on(a, i) {
    for (let el of a) {
        el.classList.remove('on')
    }
    a[i].classList.add('on')
}

function callData(rest) {
    frame.innerHTML = '';
    loading.classList.remove('off');
    frame.classList.remove('on');

    fetch(rest)
        .then((data) => {
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
    loading.classList.add('off');
    frame.classList.add('on');
    new Isotope('#list', {
        itemSelection: '.item',
        columnWidth: '.item',
        transitionDuration: '0.5s',
    });
}
