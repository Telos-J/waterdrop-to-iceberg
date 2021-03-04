const waterRipples = document.querySelectorAll('.waterRipple');
const waterRipple_path =
    'M101.5 520.895C138 541.421 26.5 547.87 0.500003 547.87H0L0.500003 1019.37H1440V547.87H207C180.5 517.87 64.9999 500.37 101.5 520.895Z';

waterRipples.forEach((waterRipple, idx) => {
    gsap.to(waterRipple.querySelectorAll('path'), {
        delay: idx,
        repeat: -1,
        duration: 6,
        ease: 'none',
        morphSVG: waterRipple_path,
    });
});
