function MouseHandler(button, startCallback, holdCallback, endCallback) {
  this.button = button;
  this.startCallback = startCallback;
  this.holdCallback = holdCallback;
  this.endCallback = endCallback;

  this.mouseX;
  this.mouseY;
  this.isHeld = false;
  this.activeInterval;

  this.onHoldStart = () => {
    this.isHeld = true;
    this.startCallback(this.mouseX, this.mouseY);
    this.activeInterval = setInterval(() => (this.holdCallback(this.mouseX, this.mouseY)), 10);
  }

  this.onHoldEnd = () => {
    this.isHeld = false;
    this.endCallback(this.mouseX, this.mouseY);
    clearInterval(this.activeInterval);
  }

  this.trackMouse = (e) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  window.addEventListener('mousedown', (e) => { if(e.button == this.button) {e.preventDefault(); this.onHoldStart()}});
  window.addEventListener('mouseup', (e) => { if(e.button == this.button) {e.preventDefault(); this.onHoldEnd()}});
  window.addEventListener('mousemove', this.trackMouse);
}