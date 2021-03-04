window.addEventListener('mousemove', (e) => {
    pipette.style.transform = 'translate(' + String(e.clientX - 110) + 'px, ' + String(e.clientY - 20) + 'px)';
    waterdropBase.style.transform = 'translate(' + String(e.clientX - 120) + 'px, ' + String(e.clientY + 5) + 'px)';

    for (let waterdrop of waterdrops) {
        if (!waterdrop.dropped) {
            waterdrop.DOM.style.transform = 'translate(' + String(e.clientX - 120) + 'px, ' + String(e.clientY + 5) + 'px)';
        }
    }
})

window.addEventListener('click', squeeze)

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') refill()
})