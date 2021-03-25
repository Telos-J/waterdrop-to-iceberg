const pipetteDOM = document.querySelector('.pipette')
const pipetteIdle = document.querySelector('#pipette-idle')
const pipetteSqueeze = document.querySelector('#pipette-squeeze')

class Pipette {
    constructor(DOM) {
        this.DOM = DOM;
        this.DOMOutline = DOM.querySelector('#pipette-outline');
        this.DOMFill = DOM.querySelector('#pipette-fill');
        this.squeezable = true;
        this.timeline = gsap.timeline();
    }

    squeeze() {
        const self = this;
        this.squeezable = false;
        this.timeline.clear();
        this.timeline
            .to(this.DOMOutline, {
                duration: 1,
                ease: 'none',
                morphSVG: pipetteSqueeze,
            }, 0)
            .to(this.DOMFill, {
                duration: (945 - this.DOMFill.getAttribute("y")) / 664,
                ease: 'none',
                attr: { y: 945 },
                onComplete() {
                    self.drop();
                }
            }, 0);

        this.waterdrop = new Waterdrop();
        waterdrops.push(this.waterdrop);
        this.waterdrop.create();
        this.waterdrop.grow();
    }

    drop() {
        if (this.DOMFill.getAttribute("y") < 945) this.squeezable = true;
        this.waterdrop.fall();
        this.timeline.clear();
        this.timeline
            .to(this.DOMOutline, {
                duration: 0.5,
                morphSVG: pipetteIdle,
            })
    }

    refill() {
        const self = this;
        const properties = {
            duration: 1,
            ease: 'none',
            attr: { y: 281 },
            onComplete() {
                self.squeezable = true;
            }
        }
        this.timeline.clear();
        this.timeline.to(this.DOMFill, properties, 0);
    }
}

const pipette = new Pipette(pipetteDOM)
