const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.scale(50,50);

function renderImage(x, y, id) {
    var tilesheet = new Image();
    tilesheet.src = "src/tilesheet.png";
    tilesheet.onload = function() {
        let splitedid = id.split("/");
        let A = splitedid[0];
        let B = splitedid[1];
        ctx.drawImage(tilesheet, A*16, B*16, 16, 16, x, y, 1, 1);
    }
}

function renderStage(rendered) {
    console.log("rendering map");
    ctx.clearRect(0,0,1000,1000);
    for(i=0;i<rendered.length;i++) {
        for(j=0;j<rendered[i].length;j++) {
            console.log("rendering " + i + " ; " + j);
            renderImage(j,i,rendered[i][j]);
        }
    }
}

renderStage(game);