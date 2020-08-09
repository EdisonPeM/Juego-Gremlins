let gizmo = document.createElement("img");
gizmo.src = "imagenes/gizmo3.png"
gizmo.name = 'gizmo'

let loco = document.createElement("img");
loco.src = 'imagenes/loco.png'
loco.name = 'loco'

let exp = document.createElement("img");
exp.src = 'imagenes/explosion.png'
exp.name = 'exp'

class Gremlin {
    constructor(xi, yi) {
        this.state = 'gizmo'
        this.vida = 200;
        this.img = [gizmo, loco, exp];
        this.x = xi;
        this.y = yi;
        this.dirx = aleatorio(-5, 5);
        this.diry = aleatorio(-5, 5);
    }

    actualizar() {
        this.x += this.dirx;
        this.y += this.diry;

        if (this.x <= 0 || this.x > (640 - imgW)) {
            this.dirx = -this.dirx;
            this.x += this.dirx;
        }
        if (this.y <= 0 || this.y > (480 - imgH)) {
            this.diry = -this.diry;
            this.y += this.diry;
        }
    }

    dibujar(ctx) {
        this.actualizar();
        let img = this.img[0];

        if (this.vida == 0) {
            img = this.img[2];
        } else if (this.vida < 80) {
            img = this.img[1];
        }

        this.state = img.name
        ctx.drawImage(img, this.x, this.y);
    }
}