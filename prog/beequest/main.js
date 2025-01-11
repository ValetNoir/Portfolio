let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")
canvas.style.position = "absolute"
canvas.style.top = "0"
canvas.style.left = "0"
document.body.append(canvas)
resize()
function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.imageSmoothingEnabled = false
}

function rand(min, max) {
    return Math.floor(rf(min, max))
}
function rf(min, max) {
    return Math.random() * (max - min) + min
}

let pixel_size = 4
let meter_size = 16

class animation {
    constructor(startframe, spritesheet_path, sprite_size, fps) {
        this.img = new Image()
        this.img.src = spritesheet_path
        this.time = 0
        this.max = 1 / fps
        this.frame_index = startframe
        this.sprite_size = sprite_size
    }
    step(dt) {
        this.time += dt
        if(this.time >= this.max) {
            this.time %= this.max
            this.frame_index++
            if(this.sprite_size * this.frame_index >= this.img.height) this.frame_index = 0
        }
    }
    draw(x, y) {
        ctx.drawImage(
            this.img,
            0,
            this.sprite_size * this.frame_index,
            this.sprite_size,
            this.sprite_size,
            (x * meter_size - this.sprite_size / 2) * pixel_size,
            (y * meter_size - this.sprite_size / 2) * pixel_size,
            this.sprite_size * pixel_size,
            this.sprite_size * pixel_size
        )
    }
}

class bee {
    constructor(x, y, animation_index) {
        this.animation_index = animation_index
        // position
        this.x = x
        this.y = y
        this.vx = 0 // rf(-1, 1)
        this.vy = 0 // rf(-1, 1)
        this.target
        // seperation
        this.close_range = 0.75
        this.avoid_factor = 15
        // alignement
        this.visible_range = 3
        this.follow_factor = 0.003
        // cohesion
        this.center_factor = 0.005
    }

    followObjective(target) {
        this.target = target
    }

    stopFollowingObjective() {
        this.target = false
    }

    update(dt) {
        this.x += this.vx * dt
        this.y += this.vy * dt
        this.vx *= 0.95
        this.vy *= 0.95
    }
}

let all = [
    new animation(0, "assets/select.png", 16, 7),
]

let grid = []
let bees = []
let selectedbees = []
let cursor = {x: 0, y: 0}
let last_time = 0
let hovered_i = 0
let hovered_j = 0
let dimensions = getGridPos(canvas.height, canvas.width)
let mousecursor = {x: 0, y: 0}
let selecting = {x: 0, y: 0}
let selectingBees = false

generateanimation()
generategrid(dimensions.x, dimensions.y * 1.5)
generatebees(50)
frame(0)
function frame(t) {
    let dt = (t - last_time) / 1000
    last_time = t

    cursor.x = hovered_i + 0.5 * (hovered_j % 2)
    cursor.y = hovered_j * 0.75

    updatebees(dt)
    
    for(let i = 0; i < all.length; i++) all[i].step(dt)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "white"
    drawgrid(6, 4)
    if(!selectingBees) drawOnGrid(hovered_i, hovered_j, 0)
    drawbees()

    ctx.strokeStyle = "aqua"
    ctx.lineWidth = 3
    if(selectingBees) ctx.strokeRect(selecting.x * pixel_size * meter_size, selecting.y * pixel_size * meter_size, (mousecursor.x - selecting.x) * pixel_size * meter_size, (mousecursor.y - selecting.y) * pixel_size * meter_size)

    ctx.fillStyle = "black"
    ctx.font = "48px Arial"
    ctx.fillText("fps : " + 1 / dt, 0, 48)

    requestAnimationFrame(frame)
}

function generateanimation() {
    for(let i = 0; i < 4; i++) {
        all.push(new animation(i, "assets/idlehoneycomb2.png", 16, 1))
        all.push(new animation(i, "assets/idleemptyhoneycomb2.png", 16, 1))
        all.push(new animation(i, "assets/idlefullhoneycomb2.png", 16, 1))
        all.push(new animation(i, "assets/idlelarvacomb.png", 16, 7))
    }
    for(let i = 0; i < 4; i++) {
        all.push(new animation(i, "assets/idleworkerbee.png", 16, 7))
        all.push(new animation(i, "assets/idlesuitworkerbee.png", 16, 7))
        all.push(new animation(i, "assets/idlepollenatedworkerbee.png", 16, 7))
    }
    for(let i = 0; i < 4; i++) {
        all.push(new animation(i, "assets/idlefullhoneycomb.png", 16, 7))
    }
}

function generategrid(w, h) {
    for(let i = 0; i < w; i++) {
        grid[i] = []
        for(let j = 0; j < h; j++) {
            grid[i][j] = rand(1, 4 * 4 + 1)
        }
    }
}

function generatebees(n) {
    for(let i = 0; i < n; i++) {
        let x = rand(0, canvas.width / pixel_size) / meter_size
        let y = rand(0, canvas.height / pixel_size) / meter_size
        bees.push(new bee(x, y, rand(4 * 4 + 1, 4 * 4 + 1 + 4 * 3)))
    }
}

function drawbees() {
    for(let i = 0; i < bees.length; i++) {
        let dabee = bees[i]
        all[dabee.animation_index].draw(dabee.x, dabee.y)
    }
}

function updatebees(dt) {
    let distances = calculateBeesDistanceMap()
    for(let i = 0; i < bees.length; i++) {
        let close_x = 0
        let close_y = 0
        let xpos_avg = 0
        let ypos_avg = 0
        let xvel_avg = 0
        let yvel_avg = 0
        let neighbors = 0
        for(let j = 0; j < bees.length; j++) {
            let dist = getBeeDist(distances, i, j)
            let mag = getDistMag(dist)
            if(mag < bees[i].close_range) { // seperation
                close_x -= dist.x * (bees[i].close_range - mag)
                close_y -= dist.y * (bees[i].close_range - mag)
            }
            else if(mag < bees[i].visible_range) {
                // alignment
                xvel_avg += bees[j].vx
                yvel_avg += bees[j].vy
                // cohesion
                xpos_avg += bees[j].x
                ypos_avg += bees[j].y
                neighbors++
            }
        }
        // seperation
        bees[i].vx += close_x * bees[i].avoid_factor
        bees[i].vy += close_y * bees[i].avoid_factor
        if(neighbors > 0) {
            // alignment
            xvel_avg = xvel_avg / neighbors
            yvel_avg = yvel_avg / neighbors
            // cohesion
            xpos_avg = xpos_avg / neighbors
            ypos_avg = ypos_avg / neighbors

            bees[i].vx += (xvel_avg - bees[i].vx) * bees[i].follow_factor + (xpos_avg - bees[i].x) * bees[i].center_factor
            bees[i].vy += (yvel_avg - bees[i].vy) * bees[i].follow_factor + (ypos_avg - bees[i].y) * bees[i].center_factor
        }

        if(bees[i].target) {
            let dist = {
                x: bees[i].target.x - bees[i].x,
                y: bees[i].target.y - bees[i].y 
            }
            let mag = getDistMag(dist)
            if(mag < bees[i].close_range) {
                // rotation around the objective
                if(dist.y < 0) bees[i].vx += 0.1
                else bees[i].vx -= 0.1
                if(dist.x < 0) bees[i].vy -= 0.1
                else bees[i].vy += 0.1
            } else {
                bees[i].vx += dist.x / mag
                bees[i].vy += dist.y / mag
            }
        }

        bees[i].update(dt)
    }
}

function calculateBeesDistanceMap() {
    let distances = []
    for(let i = 0; i < bees.length; i++) {
        distances.push([])
        for(let j = 0; j < bees.length; j++) {
            if(i < j) distances[i][j] = {x: bees[j].x - bees[i].x, y: bees[j].y - bees[i].y}
        }
    }
    return distances
}

function getBeeDist(distances, i, j) {
    if(i == j) return {x: 0, y: 0}
    if(i > j) return {x: -distances[j][i].x, y: -distances[j][i].y}
    if(i < j) return distances[i][j]
}

function getDistMag(distance) {
    return Math.sqrt(distance.x*distance.x + distance.y*distance.y)
}

function drawgrid() {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            drawOnGrid(i, j, grid[i][j])
        }
    }
}

function drawOnGrid(i, j, index) {
    let x = i  + (j % 2) / 2
    let y = j * 0.75
    all[index].draw(x, y)
}

function getMousePos(x, y) {
    hovered_j = Math.floor((y / pixel_size + meter_size / 2) / (meter_size * 0.75))
    hovered_i = Math.floor((x / pixel_size + meter_size / 2 - (hovered_j % 2) * meter_size / 2) / meter_size)
}

function getGridPos(x, y) {
    return {
        x: Math.floor((y / pixel_size + meter_size / 2) / (meter_size * 0.75)),
        y: Math.floor((x / pixel_size + meter_size / 2 - (hovered_j % 2) * meter_size / 2) / meter_size)
    }
}
function getPos(x, y) {
    return {
        x: Math.floor(x / pixel_size) / meter_size,
        y: Math.floor(y / pixel_size) / meter_size
    }
}

function getBees(X1, Y1, X2, Y2) {
    let x1 = (X1 < X2)? X1 : X2
    let x2 = (X1 < X2)? X2 : X1
    let y1 = (Y1 < Y2)? Y1 : Y2
    let y2 = (Y1 < Y2)? Y2 : Y1
    selectedbees = []
    for(let i = 0; i < bees.length; i++) {
        if(x1 <= bees[i].x && bees[i].x < x2 && y1 <= bees[i].y && bees[i].y < y2) {
            selectedbees.push(i)
        }
    }
}

function directSelectedBees(target) {
    for(let i = 0; i < selectedbees.length; i++) {
        bees[selectedbees[i]].followObjective(target)
    }
}

function stopSelectedBees() {
    for(let i = 0; i < selectedbees.length; i++) {
        bees[selectedbees[i]].stopFollowingObjective()
    }
}

window.addEventListener("resize", resize)
window.addEventListener("mousemove", e => {
    let a = getPos(e.clientX, e.clientY)
    mousecursor.x = a.x
    mousecursor.y = a.y
    getMousePos(e.clientX, e.clientY)
})
window.addEventListener("mousedown", () => {
    stopSelectedBees()
    selectingBees = true
    selecting = {x: mousecursor.x, y: mousecursor.y}
})
window.addEventListener("mouseup", () => {
    selectingBees = false
    getBees(selecting.x, selecting.y, mousecursor.x, mousecursor.y)
    directSelectedBees(cursor)
})