/* Copyright (c) 2024, youkwhd <lolywk@tutanota.com>
 *
 * MIT Licensed
 */

type Kontinu = {
    observe: (el: HTMLElement, callback: Function) => void,
    isIntersecting: (wrapperElement: HTMLElement, target: HTMLElement) => boolean,
};

const findWrapperElement = (el: HTMLElement): HTMLElement => {
    do {
        el = el.parentElement!!;
    } while (el.parentElement && !(el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight));
 
    return el;
};

const observe = (el: HTMLElement, callback: Function) => {
    const wrapperElement = findWrapperElement(el);
    const listener = wrapperElement === window.document.documentElement ? window : wrapperElement;

    if (isIntersecting(wrapperElement, el)) {
        callback();
        return;
    }

    const handleIntersection = () => {
        if (isIntersecting(wrapperElement, el)) {
            callback();

            listener.removeEventListener("scroll", handleIntersection);
            listener.removeEventListener("resize", handleIntersection);

            if (listener !== window)
                window.removeEventListener("resize", handleIntersection);
        }
    };

    listener.addEventListener("scroll", handleIntersection);
    listener.addEventListener("resize", handleIntersection);

    if (listener !== window)
        window.addEventListener("resize", handleIntersection);
};

const isIntersecting = (wrapperElement: HTMLElement, el: HTMLElement): boolean => {
    const elementPosition = { x: el.offsetLeft, y: el.offsetTop };
    const elementHeight = el.offsetHeight;
    const elementWidth = el.offsetWidth;

    const wrapperPosition = { x: wrapperElement.offsetLeft + wrapperElement.scrollLeft, y: wrapperElement.offsetTop + wrapperElement.scrollTop };
    const wrapperHeight = wrapperElement.clientHeight;
    const wrapperWidth = wrapperElement.clientWidth;

    const isIntersectingVertically = (wrapperPosition.y + wrapperHeight >= elementPosition.y) && (wrapperPosition.y <= elementPosition.y + elementHeight);
    const isIntersectingHorizontally = (wrapperPosition.x + wrapperWidth >= elementPosition.x) && (wrapperPosition.x <= elementPosition.x + elementWidth); 

    return isIntersectingVertically && isIntersectingHorizontally;
};

const kontinu: Kontinu = { observe, isIntersecting };
export default kontinu;
