const pipetteBase = document.querySelector('.pipette')
const pipetteFull = document.querySelector('.pipette-full')
const pipetteEmpty = document.querySelector('.pipette-empty')

class Pipette {
    constructor(DOM) {
        this.DOM = DOM;
        this.squeezable = true;
    }

    squeeze() {
        this.squeezable = false;
        Array.from(this.DOM.children).forEach((path, idx) => {
            gsap.to(path, {
                duration: 1,
                ease: 'none',
                morphSVG: pipetteEmpty.children[idx],
            });
        }); 
        
        this.waterdrop = new Waterdrop();
        waterdrops.push(this.waterdrop);
        this.waterdrop.create();
        this.waterdrop.grow();
    }

    drop() {
        this.waterdrop.fall();
        window.setTimeout((e) => {
            this.waterdrop.sink()
        }, 4000)
    }

    refill() {
        const self = this;
        Array.from(this.DOM.children).forEach((path, idx) => {
            gsap.to(path, {
                duration: 1,
                ease: 'none',
                morphSVG: pipetteFull.children[idx],
                onComplete() {
                    self.squeezable = true;
                }
            });
        }); 
    }
}

const pipette = new Pipette(pipetteBase)
