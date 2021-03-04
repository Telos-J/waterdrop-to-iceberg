gsap.registerPlugin(MorphSVGPlugin);

const waterdropBase = document.querySelector('.waterdrop');
const waterdropFall = document.querySelector('.waterdrop-fall');
const iceberg = document.querySelector('.iceberg');
const waterdropPath = 'M339.938 560.5C339.938 622.632 270.042 671.5 211.5 671.5C152.958 671.5 82 622.632 82 560.5C82 498.368 178.5 169.5 207.5 69C236.5 167.5 339.938 498.368 339.938 560.5Z';
const waterdrops = [];

class Waterdrop {
    constructor() {
        this.dropped = false;
    }
    
    create() {
        this.DOM = waterdropBase.cloneNode(true);
        document.body.insertBefore(this.DOM, waterdropBase);
    }
    
    fall() {
        const waterdropTimeline = gsap.timeline();
        const self = this;
        waterdropTimeline
            .to(this.DOM.querySelector('path'), {
                duration: 1,
                ease: 'none',
                morphSVG: waterdropFall.querySelector('path'),
                onComplete: function() {
                    self.dropped = true;
                }
            })
            .to(this.DOM, {
                y: 460,
            })
            .to(this.DOM.querySelector('path'), {
                morphSVG: iceberg.querySelector('path'),
            })
            .to(this.DOM, {
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                y: 465,
            })

        this.DOM.style.display = 'block';
    }
}