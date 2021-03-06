const waterRippleBase = document.querySelector('.waterRipple');
const waterRipple_path = "M289.972 42.3928C394.402 140.212 75.3889 170.946 1 170.946L0 170.946V2418H4118.57L4120 170.945L591.819 170.946C516 27.9732 185.541 -55.4268 289.972 42.3928Z";

class WaterRipple {
    constructor() {
        this.timeline = gsap.timeline()
        this.DOM = waterRippleBase.cloneNode(true);
        this.DOM.style.display = 'block';
        this.path = this.DOM.querySelector('path');

        document.body.insertBefore(this.DOM, waterRippleBase);
    }

    animate(idx) {
        const self = this;
        this.timeline.to(self.path, {
            delay: idx,
            repeat: -1,
            duration: 6,
            ease: 'none',
            morphSVG: waterRipple_path,
        });

        water.colorTimeline.to(self.path, {
            duration: 10,
            ease: 'none',
            fill: '#1464AE'
        }, 0);
    }
}

class Wave {
    constructor() {
        this.DOM = document.querySelector('.wave');
    }

    animate() {
        const self = this;
        const path = Array.from(this.DOM.querySelectorAll('path'));
        gsap.to(path, {
            x: '-=2060',
            duration: 2,
            ease: Linear.easeNone,
            repeat: -1
        })

        water.colorTimeline.to(self.DOM.querySelector('#wave-fill'), {
            duration: 10,
            ease: 'none',
            fill: '#1464AE'
        }, 0);
    }
}

class Water {
    constructor(numRipples) {
        this.numRipples = numRipples;
        this.ripples = [];
        this.wave = new Wave();
        this.colorTimeline = gsap.timeline({ paused: true })
        this.polution = 10;
        this.surface = this.wave.DOM.getBoundingClientRect().top;
    }

    setup() {
        for (let idx of Array(this.numRipples).keys()) {
            const waterRipple = new WaterRipple();
            this.ripples.push(waterRipple)
            waterRipple.animate(idx)
        }

        this.wave.animate();

        this.colorTimeline.to(document.body, {
            backgroundColor: "#f0f8ff",
            duration: 10,
            ease: 'none',
        }, 0)
    }

    heal() {
        this.polution--;
        if (this.polution < 0) this.polution = 0;
        this.colorTimeline.tweenTo(10 - this.polution);
    }

    contaminate() {
        this.polution += 0.1;
        if (this.polution > 10) this.polution = 10;
        this.colorTimeline.tweenTo(10 - this.polution);
    }
}

const water = new Water(6);
water.setup();
