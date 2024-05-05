/* Copyright (c) 2024, youkwhd <lolywk@tutanota.com>
 *
 * MIT Licensed
 */

type Kontinu = {
    observe: (el: HTMLElement, callback: Function) => void,
    isIntersecting: (target: HTMLElement) => boolean,
};

const observe = (el: HTMLElement, callback: Function) => {
    if (isIntersecting(el)) {
        callback();
        return;
    }

    const handleIntersection = () => {
        if (isIntersecting(el)) {
            callback();

            window.removeEventListener("scroll", handleIntersection);
            window.removeEventListener("resize", handleIntersection);
        }
    };

    window.addEventListener("scroll", handleIntersection);
    window.addEventListener("resize", handleIntersection);
};

const isIntersecting =  (el: HTMLElement): boolean => {
    const elementPosition = { x: el.offsetLeft, y: el.offsetTop };
    const elementHeight = el.clientHeight;

    const screenPosition = { x: window.scrollX, y: window.scrollY };
    const screenHeight = window.innerHeight;

    return (screenPosition.y + screenHeight >= elementPosition.y)
           && (screenPosition.y <= elementPosition.y + elementHeight);
};

const kontinu: Kontinu = { observe, isIntersecting };
export default kontinu;
