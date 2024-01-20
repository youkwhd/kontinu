"use strict";

type Kontinu = {
    __latestElement: HTMLElement | null,
    __init: Function,
    __onIntersection: Function,
}

const kontinu: Kontinu = {
    __latestElement: null,

    __init: (el: HTMLElement, callback: Function) => {
        kontinu.__latestElement = el;
        kontinu.__onIntersection(kontinu.__latestElement, callback);

        window.addEventListener("scroll", () => {
            kontinu.__onIntersection(kontinu.__latestElement, callback);
        });
    },

    __onIntersection: (el: HTMLElement, callback: Function) => {
        // assert window != null
        const elementCoordinates = { x: el.offsetLeft, y: el.offsetTop };
        const elementHeight = el.clientHeight;

        // surpasses the element
        if (window.scrollY > elementCoordinates.y + elementHeight) {
            return;
        }

        // intersecting the element
        if (window.scrollY + window.innerHeight >= elementCoordinates.y) {
            const newElement: HTMLElement = callback(el);
            kontinu.__latestElement = newElement; 
            kontinu.__onIntersection(newElement, callback);
        }
    }
};

// export default kontinu;
