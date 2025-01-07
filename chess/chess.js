const canv = document.getElementById('chess');
const ctx = canv.getContext('2d');
const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})
canvas.addEventListener('ontouchstart', function(e) {
    getCursorPosition(canvas, e)
})

const scale = 50;

function getCursorPosition(canvas, event) {
    if(isGameOver === false) {
        const rect = canvas.getBoundingClientRect();
        const clicX = Math.floor((event.clientX - rect.left)/scale);
        const clicY = Math.floor((event.clientY - rect.top)/scale);
        verifieSelect(clicY, clicX);
    }
}

ctx.scale(scale, scale);

const player = {
    pos: {x: null, y: null},
    type: null,
    color: null
}

function piece(type, color) {
    this.type = type;
    this.color = color;
    this.nevermove = true;
}

var isGameOver = false;
var turn = 1;
var invertcolor;

var game = [];
var canGo = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

function start() {
    B_roi = new piece('♚', "white");
    B_dame = new piece('♛', "white");
    B_tour = new piece('♜', "white");
    B_cavalier = new piece('♞', "white");
    B_fou = new piece('♝', "white");
    B_pion = new piece('♟', "white");
    N_roi = new piece('♚', "black");
    N_dame = new piece('♛', "black");
    N_tour = new piece('♜', "black");
    N_cavalier = new piece('♞', "black");
    N_fou = new piece('♝', "black");
    N_pion = new piece('♟', "black");
    NB = new piece(" ", "#000");

    game = [
        [N_tour, N_cavalier, N_fou, N_dame, N_roi, N_fou, N_cavalier, N_tour],
        [N_pion, N_pion, N_pion, N_pion, N_pion, N_pion, N_pion, N_pion],
        [NB,NB,NB,NB,NB,NB,NB,NB],
        [NB,NB,NB,NB,NB,NB,NB,NB],
        [NB,NB,NB,NB,NB,NB,NB,NB],
        [NB,NB,NB,NB,NB,NB,NB,NB],
        [B_pion, B_pion, B_pion, B_pion, B_pion, B_pion, B_pion, B_pion],
        [B_tour, B_cavalier, B_fou, B_dame, B_roi, B_fou, B_cavalier, B_tour] ];
    /*game = [
        [NB,NB,NB,NB,NB,NB,NB,NB],
        [NB,NB,NB,NB,NB,NB,NB,NB],
        [N_tour, N_dame, N_cavalier, N_fou, N_fou, N_cavalier, N_roi, N_tour],
        [N_pion, N_pion, N_pion, N_pion, N_pion, N_pion, N_pion, N_pion],
        [B_pion, B_pion, B_pion, B_pion, B_pion, B_pion, B_pion, B_pion],
        [B_tour, B_dame, B_cavalier, B_fou, B_fou, B_cavalier, B_roi, B_tour],
        [NB,NB,NB,NB,NB,NB,NB,NB],
        [NB,NB,NB,NB,NB,NB,NB,NB]];*/
    render();
}

function render() {
    ctx.fillStyle = "#F0F";
    ctx.fillRect(0, 0, 8, 8);
    ctx.font = "1px sans";
    for(let i = 0; i < game.length; i++) {
        for(let j = 0; j < game[i].length; j++) {
            ctx.fillStyle = "#0F0";
            if(canGo[i][j] === 1) {ctx.fillRect(j, i, 1, 1);}
            if(canGo[i][j] === 2) {ctx.fillStyle = "#FF0"; ctx.fillRect(j, i, 1, 1);}
            ctx.fillStyle = game[i][j].color;
            ctx.fillText(game[i][j].type, j, i + 0.9);
        }
    }
}

function move(x, y) {
    if(player.type != ' ' && canGo[x][y] === 1) {
        game[x][y] = game[player.pos.x][player.pos.y];
        game[x][y].nevermove = false;
        game[player.pos.x][player.pos.y] = NB;
        if(player.type === '♟' && player.color === "black") {if(x === game.length-1) {game[x][y] = N_dame;}}
        if(player.type === '♟' && player.color === "white") {if(x === 0) {game[x][y] = B_dame;}}
        player.pos.x = null;
        player.pos.y = null;
        canGo = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];
        let B_win = true;
        let N_win = true;
        for(let i = 0; i < game.length; i++) {
            for(let j = 0; j < game[i].length; j++) {
                if(game[i][j] === B_roi) {N_win = false;}
                if(game[i][j] === N_roi) {B_win = false;}
            }
        }
        if(B_win === true) {console.log("les blancs ont gagnés !");isGameOver = true;}
        if(N_win === true) {console.log("les noirs ont gagnés !");isGameOver = true;}
        turn++;
        render();
    }
}

function verifieSelect(x,y) {
    if(canGo[x][y] === 2) {roque(player.pos.x,player.pos.y,x,y);}
    else if(turn%2 === 1 && game[x][y].color === "white") {select(x,y);}
    else if(canGo[x][y] === 1) {move(x,y);}
    else if(turn%2 === 0 && game[x][y].color === "black") {select(x,y);}
}

function select(x, y) {
    canGo = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0] ];
    player.pos.x = x;
    player.pos.y = y;
    player.type = game[player.pos.x][player.pos.y].type;
    player.color = game[player.pos.x][player.pos.y].color;
    detectPath();
}

function detectPath() {
    if(player.color === "white") {invertcolor = "black";}
    if(player.color === "black") {invertcolor = "white";}
    if(player.type === '♜') {
        for(let i = 1; i <=7; i++) {
            if(player.pos.x - i < 0) {break;
            }else if(game[player.pos.x -i][player.pos.y] != NB) {
                if(game[player.pos.x -i][player.pos.y].color === invertcolor) {
                    canGo[player.pos.x -i][player.pos.y] = 1;
                }
                break;
            }else {canGo[player.pos.x -i][player.pos.y] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x + i > 7) {break;
            }else if(game[player.pos.x +i][player.pos.y] != NB) {
                if(game[player.pos.x +i][player.pos.y].color === invertcolor) {
                    canGo[player.pos.x +i][player.pos.y] = 1;
                }
                break;
            }else {canGo[player.pos.x +i][player.pos.y] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.y - i < 0) {break;
            }else if(game[player.pos.x][player.pos.y -i] != NB) {
                if(game[player.pos.x][player.pos.y -i].color === invertcolor) {
                    canGo[player.pos.x][player.pos.y -i] = 1;
                }
                break;
            }else {canGo[player.pos.x][player.pos.y -i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.y + i > 7) {break;
            }else if(game[player.pos.x][player.pos.y +i] != NB) {
                if(game[player.pos.x][player.pos.y +i].color === invertcolor) {
                    canGo[player.pos.x][player.pos.y +i] = 1;
                }
                break;
            }else {canGo[player.pos.x][player.pos.y +i] = 1;}
        }
    }

    if(player.type === '♞') {
        if(player.pos.x-2 >=0 && player.pos.y-1 >=0 && game[player.pos.x-2][player.pos.y-1].color === invertcolor) {canGo[player.pos.x-2][player.pos.y-1] = 1;}
        if(player.pos.x-2 >=0 && player.pos.y-1 >=0 && game[player.pos.x-2][player.pos.y-1] === NB) {canGo[player.pos.x-2][player.pos.y-1] = 1;}
        if(player.pos.x-1 >=0 && player.pos.y-2 >=0 && game[player.pos.x-1][player.pos.y-2].color === invertcolor) {canGo[player.pos.x-1][player.pos.y-2] = 1;}
        if(player.pos.x-1 >=0 && player.pos.y-2 >=0 && game[player.pos.x-1][player.pos.y-2] === NB) {canGo[player.pos.x-1][player.pos.y-2] = 1;}
        if(player.pos.x+2 <=7 && player.pos.y+1 <=7 && game[player.pos.x+2][player.pos.y+1].color === invertcolor) {canGo[player.pos.x+2][player.pos.y+1] = 1;}
        if(player.pos.x+2 <=7 && player.pos.y+1 <=7 && game[player.pos.x+2][player.pos.y+1] === NB) {canGo[player.pos.x+2][player.pos.y+1] = 1;}
        if(player.pos.x+1 <=7 && player.pos.y+2 <=7 && game[player.pos.x+1][player.pos.y+2].color === invertcolor) {canGo[player.pos.x+1][player.pos.y+2] = 1;}
        if(player.pos.x+1 <=7 && player.pos.y+2 <=7 && game[player.pos.x+1][player.pos.y+2] === NB) {canGo[player.pos.x+1][player.pos.y+2] = 1;}
        if(player.pos.x+1 <=7 && player.pos.y-2 >=0 && game[player.pos.x+1][player.pos.y-2].color === invertcolor) {canGo[player.pos.x+1][player.pos.y-2] = 1;}
        if(player.pos.x+1 <=7 && player.pos.y-2 >=0 && game[player.pos.x+1][player.pos.y-2] === NB) {canGo[player.pos.x+1][player.pos.y-2] = 1;}
        if(player.pos.x-2 >=0 && player.pos.y+1 <=7 && game[player.pos.x-2][player.pos.y+1].color === invertcolor) {canGo[player.pos.x-2][player.pos.y+1] = 1;}
        if(player.pos.x-2 >=0 && player.pos.y+1 <=7 && game[player.pos.x-2][player.pos.y+1] === NB) {canGo[player.pos.x-2][player.pos.y+1] = 1;}
        if(player.pos.x-1 >=0 && player.pos.y+2 <=7 && game[player.pos.x-1][player.pos.y+2].color === invertcolor) {canGo[player.pos.x-1][player.pos.y+2] = 1;}
        if(player.pos.x-1 >=0 && player.pos.y+2 <=7 && game[player.pos.x-1][player.pos.y+2] === NB) {canGo[player.pos.x-1][player.pos.y+2] = 1;}
        if(player.pos.x+2 <=7 && player.pos.y-1 >=0 && game[player.pos.x+2][player.pos.y-1].color === invertcolor) {canGo[player.pos.x+2][player.pos.y-1] = 1;}
        if(player.pos.x+2 <=7 && player.pos.y-1 >=0 && game[player.pos.x+2][player.pos.y-1] === NB) {canGo[player.pos.x+2][player.pos.y-1] = 1;}
    }

    if(player.type === '♝') {
        for(let i = 1; i <=7; i++) {
            if(player.pos.x - i < 0 ||player.pos.y - i < 0) {break;
            }else if(game[player.pos.x - i][player.pos.y - i] != NB) {
                if(game[player.pos.x - i][player.pos.y - i].color === invertcolor) {
                    canGo[player.pos.x - i][player.pos.y - i] = 1;
                }
                break;
            }else {canGo[player.pos.x - i][player.pos.y - i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x + i > 7 ||player.pos.y - i < 0) {break;
            }else if(game[player.pos.x + i][player.pos.y - i] != NB) {
                if(game[player.pos.x + i][player.pos.y - i].color === invertcolor) {
                    canGo[player.pos.x + i][player.pos.y - i] = 1;
                }
                break;
            }else {canGo[player.pos.x + i][player.pos.y - i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x - i < 0 ||player.pos.y + i > 7) {break;
            }else if(game[player.pos.x - i][player.pos.y + i] != NB) {
                if(game[player.pos.x - i][player.pos.y + i].color === invertcolor) {
                    canGo[player.pos.x - i][player.pos.y + i] = 1;
                }
                break;
            }else {canGo[player.pos.x - i][player.pos.y + i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x + i > 7 ||player.pos.y + i > 7) {break;
            }else if(game[player.pos.x + i][player.pos.y + i] != NB) {
                if(game[player.pos.x + i][player.pos.y + i].color === invertcolor) {
                    canGo[player.pos.x + i][player.pos.y + i] = 1;
                }
                break;
            }else {canGo[player.pos.x + i][player.pos.y + i] = 1;}
        }
    }

    if(player.type === '♛') {
        for(let i = 1; i <=7; i++) {
            if(player.pos.x - i < 0) {break;
            }else if(game[player.pos.x -i][player.pos.y] != NB) {
                if(game[player.pos.x -i][player.pos.y].color === invertcolor) {
                    canGo[player.pos.x -i][player.pos.y] = 1;
                }
                break;
            }else {canGo[player.pos.x -i][player.pos.y] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x + i > 7) {break;
            }else if(game[player.pos.x +i][player.pos.y] != NB) {
                if(game[player.pos.x +i][player.pos.y].color === invertcolor) {
                    canGo[player.pos.x +i][player.pos.y] = 1;
                }
                break;
            }else {canGo[player.pos.x +i][player.pos.y] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.y - i < 0) {break;
            }else if(game[player.pos.x][player.pos.y -i] != NB) {
                if(game[player.pos.x][player.pos.y -i].color === invertcolor) {
                    canGo[player.pos.x][player.pos.y -i] = 1;
                }
                break;
            }else {canGo[player.pos.x][player.pos.y -i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.y + i > 7) {break;
            }else if(game[player.pos.x][player.pos.y +i] != NB) {
                if(game[player.pos.x][player.pos.y +i].color === invertcolor) {
                    canGo[player.pos.x][player.pos.y +i] = 1;
                }
                break;
            }else {canGo[player.pos.x][player.pos.y +i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x - i < 0 ||player.pos.y - i < 0) {break;
            }else if(game[player.pos.x - i][player.pos.y - i] != NB) {
                if(game[player.pos.x - i][player.pos.y - i].color === invertcolor) {
                    canGo[player.pos.x - i][player.pos.y - i] = 1;
                }
                break;
            }else {canGo[player.pos.x - i][player.pos.y - i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x + i > 7 ||player.pos.y - i < 0) {break;
            }else if(game[player.pos.x + i][player.pos.y - i] != NB) {
                if(game[player.pos.x + i][player.pos.y - i].color === invertcolor) {
                    canGo[player.pos.x + i][player.pos.y - i] = 1;
                }
                break;
            }else {canGo[player.pos.x + i][player.pos.y - i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x - i < 0 ||player.pos.y + i > 7) {break;
            }else if(game[player.pos.x - i][player.pos.y + i] != NB) {
                if(game[player.pos.x - i][player.pos.y + i].color === invertcolor) {
                    canGo[player.pos.x - i][player.pos.y + i] = 1;
                }
                break;
            }else {canGo[player.pos.x - i][player.pos.y + i] = 1;}
        }
        for(let i = 1; i <=7; i++) {
            if(player.pos.x + i > 7 ||player.pos.y + i > 7) {break;
            }else if(game[player.pos.x + i][player.pos.y + i] != NB) {
                if(game[player.pos.x + i][player.pos.y + i].color === invertcolor) {
                    canGo[player.pos.x + i][player.pos.y + i] = 1;
                }
                break;
            }else {canGo[player.pos.x + i][player.pos.y + i] = 1;}
        }
    }

    if(player.type === '♚') {
        if(player.pos.x-1 >=0 && player.pos.y-1 >=0) {if(game[player.pos.x-1][player.pos.y-1] === NB || game[player.pos.x-1][player.pos.y-1].color === invertcolor) {canGo[player.pos.x -1][player.pos.y -1] = 1;}}
        if(player.pos.x+1 <=7 && player.pos.y-1 >=0) {if(game[player.pos.x+1][player.pos.y-1] === NB || game[player.pos.x+1][player.pos.y-1].color === invertcolor) {canGo[player.pos.x +1][player.pos.y -1] = 1;}}
        if(player.pos.x-1 >=0 && player.pos.y+1 <=7) {if(game[player.pos.x-1][player.pos.y+1] === NB || game[player.pos.x-1][player.pos.y+1].color === invertcolor) {canGo[player.pos.x -1][player.pos.y +1] = 1;}}
        if(player.pos.x+1 <=7 && player.pos.y+1 <=7) {if(game[player.pos.x+1][player.pos.y+1] === NB || game[player.pos.x+1][player.pos.y+1].color === invertcolor) {canGo[player.pos.x +1][player.pos.y +1] = 1;}}
        if(player.pos.x-1 >=0) {if(game[player.pos.x-1][player.pos.y] === NB || game[player.pos.x-1][player.pos.y].color === invertcolor) {canGo[player.pos.x -1][player.pos.y] = 1;}}
        if(player.pos.x+1 <=7) {if(game[player.pos.x+1][player.pos.y] === NB || game[player.pos.x+1][player.pos.y].color === invertcolor) {canGo[player.pos.x +1][player.pos.y] = 1;}}
        if(player.pos.y-1 >=0) {if(game[player.pos.x][player.pos.y-1] === NB || game[player.pos.x][player.pos.y-1].color === invertcolor) {canGo[player.pos.x][player.pos.y -1] = 1;}}
        if(player.pos.y+1 <=7) {if(game[player.pos.x][player.pos.y+1] === NB || game[player.pos.x][player.pos.y+1].color === invertcolor) {canGo[player.pos.x][player.pos.y +1] = 1;}}
        if(game[player.pos.x][player.pos.y].nevermove === true) {if(game[player.pos.x][player.pos.y -4].type === '♜' && game[player.pos.x][player.pos.y-1] === NB && game[player.pos.x][player.pos.y-2] === NB && game[player.pos.x][player.pos.y-3] === NB) {canGo[player.pos.x][player.pos.y -4] = 2;}}
        if(game[player.pos.x][player.pos.y].nevermove === true) {if(game[player.pos.x][player.pos.y +3].type === '♜' && game[player.pos.x][player.pos.y+1] === NB && game[player.pos.x][player.pos.y+2] === NB) {canGo[player.pos.x][player.pos.y+3] = 2;}}
    }

    if(player.type === '♟') {
        let dirPion;
        let startPos;
        if(player.color === "black") {dirPion = 1; startPos = 1;
        }else if(player.color === "white") {dirPion = -1; startPos = game.length-2;}
        if(player.pos.x+dirPion >=0 && player.pos.x+dirPion <=7) {if(game[player.pos.x+dirPion][player.pos.y] === NB) {canGo[player.pos.x +dirPion][player.pos.y] = 1;if(player.pos.x === startPos) {if(game[player.pos.x+dirPion*2][player.pos.y] === NB) {canGo[player.pos.x+dirPion*2][player.pos.y] = 1;}}}}
        if(player.pos.x+dirPion >=0 && player.pos.x+dirPion <=7 && player.pos.y+1 <=7) {if(game[player.pos.x+dirPion][player.pos.y+1].color === invertcolor) {canGo[player.pos.x+dirPion][player.pos.y+1] = 1;}}
        if(player.pos.x+dirPion >=0 && player.pos.x+dirPion <=7 && player.pos.y-1 >=0) {if(game[player.pos.x+dirPion][player.pos.y-1].color === invertcolor) {canGo[player.pos.x+dirPion][player.pos.y-1] = 1;}}
    }

    render();
}

function roque(roiX, roiY, tourX, tourY) {
    if(roiY < tourY) {
        game[roiX][roiY+2] = game[roiX][roiY];
        game[roiX][roiY+2].nevermove = false;
        game[roiX][roiY] = NB;
        game[tourX][tourY-2] = game[tourX][tourY];
        game[tourX][tourY-2].nevermove = false;
        game[tourX][tourY] = NB;
    }
    if(roiY > tourY) {
        game[roiX][roiY-2] = game[roiX][roiY];
        game[roiX][roiY-2].nevermove = false;
        game[roiX][roiY] = NB;
        game[tourX][tourY+3] = game[tourX][tourY];
        game[tourX][tourY+3].nevermove = false;
        game[tourX][tourY] = NB;
    }
    player.pos.x = null;
    player.pos.y = null;
    canGo = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];
    turn++;
    render();
}
start();