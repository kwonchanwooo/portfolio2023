const articles = document.querySelectorAll('.lists article')
console.log(articles)
let i = 0

for (let el of articles) {
    let pic = el.querySelector('.pic')


    pic.style.backgroundImage = `url(./img/department/dep${i + 1}.jpg)`;
    i++
}

const vidList = document.querySelector('.vidList');
const key = 'AIzaSyA-UYRzqSCi4U5kxVd_JZ2vPlyksDRJJiQ';
const playlistId = 'PLqxc4-9rluJ8Ks1sNOzeOADYOJLCLzfiR';
const num = 6;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;
const btnClose = document.querySelector('.btnClose');

fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        let items = json.items;
        console.log(items)
        let result = '';

        items.map((el) => {
            let title = el.snippet.title;
            if (title.length > 26) {
                title = title.substr(0, 26) + '...';
            }
            let con = el.snippet.description;
            if (con.length > 80) {
                con = con.substr(0, 80) + '...';
            }
            let date = el.snippet.publishedAt;
            date = date.split('T')[0];

            result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.standard.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${con}</p>
            <span>${date}</span>
          </div>
        </article>
      `;
        });

        vidList.innerHTML = result;
    });


vidList.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.closest('a')) return;
    const vidId = e.target.closest('a').getAttribute('href');

    let pop = document.createElement('figure');
    pop.classList.add('pop');
    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose"><i class="fa-regular fa-circle-xmark"></i></span>
        `;

    vidList.append(pop);
});


vidList.addEventListener('click', (e) => {
    const pop = vidList.querySelector('.pop');
    if (pop) {
        const close = pop.querySelector('span i');
        if (e.target == close) pop.remove();
    }
});

//loc

var container = document.getElementById('map');
const buttons = document.querySelectorAll('.chain li');
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];



var options = {

    center: new kakao.maps.LatLng(37.5347906, 126.9935937),
    level: 3,
};

var map = new kakao.maps.Map(container, options);

let markerOptions = [

    {
        title: '서울',
        latlng: new kakao.maps.LatLng(37.5347906, 126.9935937),
        button: buttons[0],
    },
    {
        title: '대구',
        latlng: new kakao.maps.LatLng(35.8252327, 128.6203849),
        button: buttons[1],
    }
];



for (let i = 0; i < markerOptions.length; i++) {
    new kakao.maps.Marker({
        map: map,
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,

    });

    markerOptions[i].button.addEventListener('click', (e) => {
        e.preventDefault();
        for (let k = 0; k < markerOptions.length; k++) {
            markerOptions[k].button.classList.remove('on');
        }
        markerOptions[i].button.classList.add('on');

        moveTo(markerOptions[i].latlng);
    });
}

function moveTo(target) {
    var moveLatLon = target;
    map.setCenter(moveLatLon);
}

var mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);