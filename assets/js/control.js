window.addEventListener('mousemove', (e) => {
    pipette.DOM.style.transform = 'translate(' + String(e.clientX - 110) + 'px, ' + String(e.clientY - 20) + 'px)';
    waterdropBase.style.transform = 'translate(' + String(e.clientX - 120) + 'px, ' + String(e.clientY + 5) + 'px)';

    for (let waterdrop of waterdrops) {
        if (!waterdrop.dropped) {
            waterdrop.DOM.style.transform = 'translate(' + String(e.clientX - 120) + 'px, ' + String(e.clientY + 5) + 'px)';
        }
    }
})

window.addEventListener('mousedown', (e) => {
    if (pipette.squeezable) pipette.squeeze()
})

window.addEventListener('mouseup', (e) => {
    if (!pipette.waterdrop.dropped) pipette.drop()
})

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') pipette.refill()
})

window.setInterval(() => {
    console.log("Polution: ", (1 - water.colorTimeline.progress()) * 100)
}, 100)

window.setInterval(() => {
    water.contaminate()
}, 200)

window.addEventListener('resize', () => location.reload())
