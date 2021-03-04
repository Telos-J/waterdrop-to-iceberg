const pipette = document.querySelector('.pipette')
const pipetteFull = document.querySelector('.pipette-full')
const pipetteEmpty = document.querySelector('.pipette-empty')

function squeeze() {
    Array.from(pipette.children).forEach((path, idx) => {
        gsap.to(path, {
            duration: 1,
            ease: 'none',
            morphSVG: pipetteEmpty.children[idx],
        });
    }); 
    
    const newWaterdrop = new Waterdrop();
    waterdrops.push(newWaterdrop);
    newWaterdrop.create();
    newWaterdrop.fall();
}

function refill() {
    Array.from(pipette.children).forEach((path, idx) => {
        gsap.to(path, {
            duration: 1,
            ease: 'none',
            morphSVG: pipetteFull.children[idx],
        });
    }); 
}