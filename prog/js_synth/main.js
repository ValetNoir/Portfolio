let A
let volume
let m = false
let b = null
let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
let oscs = {}

document.onmousedown = e => {
  m = (e.button == 0)? true : m

  if(b != null) {
    oscs[b] = A.createOscillator()
    oscs[b].type = "sawtooth"
    oscs[b].frequency.value = b;
    oscs[b].start()
    oscs[b].connect(volume)
  }
}
document.onmouseup = e => {
  m = (e.button == 0)? false : m
  if(b && oscs[b]) oscs[b].stop(A.currentTime)
}
document.getElementById("play").addEventListener("click", () => {
    let piano = document.createElement("div")
    piano.id = "piano"
    piano.style.width = "150px"
    A = new AudioContext()
    volume = A.createGain()
    volume.gain.value = 0.15

    for(let i = 0; i < 100; i++) {
        let index = i - 57
        let note = notes[i % 12]
        let octave = Math.floor(i / 12)
        let frequency = Math.pow(2, index / 12 ) * 440

        let button = document.createElement("button")
        button.dataset.note = frequency
        button.innerText = note + octave
        
        button.addEventListener("pointerover", () => {
          b = frequency
          if(m) {
            oscs[frequency] = A.createOscillator()
            oscs[frequency].type = "sawtooth"
            oscs[frequency].frequency.value = frequency;
            oscs[frequency].start()
            oscs[frequency].connect(volume)
          }
        })
        button.addEventListener("pointerout", () => {
          if(oscs[frequency]) oscs[frequency].stop(A.currentTime)
        })
 
        piano.appendChild(button)
    }
    volume.connect(A.destination)

    document.body.appendChild(piano)
    document.getElementById("play").remove()
})