let evX = -1;
let evY = -1;
let mvX = -1;
let mvY = -1;
let imgW = 120;
let imgH = 100;
let gremlins = [];
let puntos = 0;
let tiempoJugado = 0;
let jugando = false;
let miVida = 100;

let lienzo = document.getElementById("mi_canvas");
lienzo.addEventListener('click', function (evt) {
	if (evt.pageX || evt.pageY) {
		evX = evt.pageX;
		evY = evt.pageY;
	}
	evX -= lienzo.offsetLeft;
	evY -= lienzo.offsetTop;
});

lienzo.addEventListener('mousemove', function (evt) {
	if (evt.pageX || evt.pageY) {
		mvX = evt.pageX;
		mvY = evt.pageY;
	}
	mvX -= lienzo.offsetLeft;
	mvY -= lienzo.offsetTop;
});

let ctx = lienzo.getContext("2d");
let btnIniciar = document.getElementById("iniciar");
let btnAcabar = document.getElementById("acabar");

function inicio() {
	let buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	ctxBffr = buffer.getContext("2d");
	ctxBffr.fillStyle = "#ffffff";
	ctxBffr.clearRect(0, 0, 700, 500);
	ctxBffr.font = "bold 50px sans-serif";
	ctxBffr.fillText("BIENVENIDO", 180, 200);
	ctxBffr.fillStyle = "#ff0000";
	ctxBffr.font = "bold 30px sans-serif";
	ctxBffr.fillText("HAS CLICK EN INICIAR", 170, 230);
	ctx.clearRect(0, 0, 700, 500);
	ctx.drawImage(buffer, 0, 0);

	btnAcabar.style.display = "none"
}

function jugar() {
	gremlins[puntos] = new Gremlin(
		aleatorio(0, lienzo.width - imgW),
		aleatorio(0, lienzo.height - imgH)
	);

	jugando = true;
	miVida = 100;

	run();

	btnIniciar.style.display = "none"
	btnAcabar.style.display = ""
}

function terminar() {
	jugando = false;
	lienzo.style.cursor = ''
	btnIniciar.style.display = ""
	btnAcabar.style.display = "none"
}

function run() {
	let buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	ctxBffr = buffer.getContext("2d");

	if (miVida <= 0) terminar();
	if (gremlins.length == 0) terminar();
	if (jugando) {
		ctxBffr.font = "bold 20px sans-serif"
		ctxBffr.fillText("Vida: " + miVida, 20, 20);
		tiempoJugado++;

		for (let i = 0; i < gremlins.length; i++) {
			if (gremlins[i].vida > 0) {
				gremlins[i].vida--;
				gremlins[i].dibujar(ctxBffr);
			} else if (gremlins[i].vida == 0) {
				gremlins[i].dibujar(ctxBffr);
				gremlins[i].vida--;
				miVida -= 10;
				gremlins.splice(i, 1);
			}
		}

		let ongremlin = false

		for (let i = 0; i < gremlins.length; i++) {
			let gremlinActual = gremlins[i]
			if (gremlinActual.state === 'loco') {
				if ((evX >= gremlinActual.x && evX <= (gremlinActual.x + imgW)) &&
					(evY >= gremlinActual.y && evY <= (gremlinActual.y + imgH))) {
					puntos++
					gremlinActual.vida = 120;
					gremlins[gremlins.length] = new Gremlin(gremlinActual.x, gremlinActual.y);
					break;
				}

				if ((mvX >= gremlinActual.x && mvX <= (gremlinActual.x + imgW)) &&
					(mvY >= gremlinActual.y && mvY <= (gremlinActual.y + imgH))) {
					ongremlin = true;
				}
			}
		}

		lienzo.style.cursor = ongremlin ? 'crosshair' : ''

		evX = -1;
		evY = -1;
		ctx.clearRect(0, 0, 700, 500);
		ctx.drawImage(buffer, 0, 0);

		setTimeout("run()", 20);

	} else {
		ctxBffr.fillStyle = "#0000ff";
		ctxBffr.clearRect(0, 0, 700, 500);
		ctxBffr.font = "bold 50px sans-serif";
		ctxBffr.fillText("GAME OVER", 180, 200);

		ctxBffr.fillStyle = "#ff0000";
		ctxBffr.font = "bold 30px sans-serif";
		ctxBffr.fillText("Puntos Conseguidos: " + puntos + ".", 170, 230);

		ctxBffr.font = "bold 30px sans-serif";
		ctxBffr.fillText("Tiempo Jugado= " + tiempoJugado / 50 + "s", 170, 260);

		puntos = 0;
		tiempoJugado = 0;

		ctx.clearRect(0, 0, 700, 500);
		ctx.drawImage(buffer, 0, 0);
	}

}

function aleatorio(piso, techo) {
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}