gsap.registerPlugin(MorphSVGPlugin);

const waterdropBase = document.querySelector('.waterdrop');
const waterdropFall = "M431.938 1471.5C431.938 1533.63 362.042 1582.5 303.5 1582.5C244.958 1582.5 174 1533.63 174 1471.5C174 1409.37 270.5 1080.5 299.5 980C328.5 1078.5 431.938 1409.37 431.938 1471.5Z";
const iceberg = "M790 1841C787.323 1841.26 780.769 1879.75 768.5 1901C754.199 1925.76 733.031 1934.23 715 1941.5C732.5 2006 702.318 2060.92 715 2097C637 2121.5 637 2223.15 637 2271C602.261 2376.51 623.049 2296.09 602.5 2336.8C558.232 2424.5 511.946 2460.86 463.5 2498C405.5 2498 378.5 2498 332 2406.5C332 2440.72 344.206 2339.63 332 2336.8C306.218 2330.82 260.756 2268.02 227.5 2257.5C165 2257.5 191.288 2173 165 2121.5C141.337 2090.5 163.75 2079.25 131.5 2037C116 1968 76 1927.87 76 1829.79C62.6736 1838.26 53.6715 1849.89 49.633 1865.5C28.5049 1807.5 28.5049 1807.5 28.5049 1747.19C-3.8147e-06 1677.7 28.5049 1692.7 0 1610.2C6.9508 1590.08 0 1542.7 49.633 1487.7C28.5049 1445.2 0 1400.2 28.5049 1352.7C55.7635 1291.96 90 1425.2 90 1155.2C217.5 1142.59 277.773 1034.92 322.5 990.195C375 990.195 360 975.195 447.5 1010.2C473.052 1075.63 498.171 1117.36 522.5 1142.59C600 1160.2 545 1155.2 602.5 1155.2C625.981 1223.92 646.115 1275.99 663.376 1315.2C730 1315.2 730 1315.2 790 1315.2C804 1382.5 902 1580.5 790 1841Z";
const waterdrops = [];

const waterBox = document.querySelector('.water-box');
const waterSurface = waterBox.querySelector('rect').getBoundingClientRect().top - waterdropBase.getBBox().height * 3 / 4;

class Waterdrop {
    constructor() {
        this.dropped = false;
        this.timeline = gsap.timeline();
        this.DOM = waterdropBase.cloneNode(true);
        this.DOM.style.opacity = 1;
        document.body.insertBefore(this.DOM, waterdropBase);
    }

    grow() {
        const self = this;
        this.timeline.clear();
        this.timeline
            .to(this.DOM.querySelector('path'), {
                duration: 1,
                ease: 'none',
                morphSVG: waterdropFall,
            })

    }

    fall() {
        const self = this
        this.dropped = true
        this.timeline.clear()
        if (this.DOM.getBoundingClientRect().top > 480) this.morph();
        this.timeline
            .to(this.DOM, {
                y: waterSurface,
                onComplete: function() {
                    self.morph();
                }
            })
    }

    morph() {
        const self = this;
        this.timeline.clear()
        this.timeline
            .to(this.DOM.querySelector('path'), {
                morphSVG: iceberg,
            })
            .to(this.DOM, {
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                y: waterSurface - 5,
            })
        window.setTimeout((e) => {
            self.sink()
        }, 4000)
    }

    sink() {
        this.timeline.clear()
        this.timeline
            .to(this.DOM, {
                duration: 5,
                y: 1000
            })
        water.heal();
    }
}
