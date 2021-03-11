gsap.registerPlugin(MorphSVGPlugin);

const waterdropBase = document.querySelector('.waterdrop');
const waterdropFall = document.querySelector('.waterdrop-fall');
const iceberg = document.querySelector('.iceberg');
const waterdropPath = 'M339.938 560.5C339.938 622.632 270.042 671.5 211.5 671.5C152.958 671.5 82 622.632 82 560.5C82 498.368 178.5 169.5 207.5 69C236.5 167.5 339.938 498.368 339.938 560.5Z';
const waterdrops = [];

class Waterdrop {
    constructor() {
        this.dropped = false;
        this.timeline = gsap.timeline();
    }
    
    create() {
        this.DOM = waterdropBase.cloneNode(true);
        document.body.insertBefore(this.DOM, waterdropBase);
    }

    grow() {
        const self = this;
        this.timeline.clear();
        this.timeline
            .to(this.DOM.querySelector('path'), {
                duration: 1,
                ease: 'none',
                morphSVG: waterdropFall.querySelector('path'),
            })

        this.DOM.style.display = 'block';
    }
    
    fall() {
        const self = this
        this.dropped = true
        this.timeline.clear()
        this.timeline
            .to(this.DOM, {
                y: 480,
                onComplete: function() {
                    self.morph();
                }
            })
    }

    morph() {
        this.timeline.clear()
        this.timeline
            .to(this.DOM.querySelector('path'), {
                morphSVG: iceberg.querySelector('path'),
            })
            .to(this.DOM, {
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                y: 485,
            })
    }

    sink() {
        this.timeline.clear()
        this.timeline
            .to(this.DOM, {
                duration: 5,
                y:1000
            })
    }
}