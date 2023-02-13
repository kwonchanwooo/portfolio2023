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
	},
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
