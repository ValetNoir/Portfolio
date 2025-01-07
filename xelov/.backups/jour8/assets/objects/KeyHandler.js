function KeyHandler(key, startCallback, holdCallback, endCallback) {
  this.key = key;
  this.startCallback = startCallback;
  this.holdCallback = holdCallback;
  this.endCallback = endCallback;

  this.isHeld = false;
  this.activeInterval;

  this.onHoldStart = () => {
    this.isHeld = true;
    this.startCallback();
    this.activeInterval = setInterval(() => (this.holdCallback()), 10);
  }

  this.onHoldEnd = () => {
    this.isHeld = false;
    this.endCallback();
    clearInterval(this.activeInterval);
  }

  window.addEventListener('keydown', (e) => { if(e.key == this.key) {e.preventDefault(); this.onHoldStart()}});
  window.addEventListener('keyup', (e) => { if(e.key == this.key) {e.preventDefault(); this.onHoldEnd()}});
}