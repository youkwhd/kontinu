"use strict";

type Kontinu = {
    __latestElement: HTMLElement | null,
    __init: (el: HTMLElement, callback: (element: HTMLElement) => HTMLElement) => void,
    __onIntersection: Function,
};

const kontinu: Kontinu = {
    __latestElement: null,

    __init: (el: HTMLElement, callback: Function) => {
        if (!window || !document) {
            throw new Error("Kontinu: Could not find the global variable `window`, perhaps wait for the DOM to load.");
        }

        kontinu.__latestElement = el;
        kontinu.__onIntersection(kontinu.__latestElement, callback);

        window.addEventListener("scroll", () => {
            kontinu.__onIntersection(kontinu.__latestElement, callback);
        });

        window.addEventListener("resize", () => {
            kontinu.__onIntersection(kontinu.__latestElement, callback);
        });
    },

    __onIntersection: (el: HTMLElement, callback: Function) => {
        if (!window || !document) {
            throw new Error("Kontinu: Could not find the global variable `window`, perhaps wait for the DOM to load.");
        }

        /* TODO: option to trigger based on:
         * 
         * -> trigger on the top
         *    +------------+
         *    |            |
         *    |            | -> trigger on the middle
         *    |            | 
         *    |            |
         *    +------------+
         * -> trigger on the bottom
         * 
         * Or custom offset in px metrics.
         */
        const offset = 0; // px

        const elementCoordinates = { x: el.offsetLeft, y: el.offsetTop };
        const elementHeight = el.clientHeight;

        // surpasses the element
        if (window.scrollY > elementCoordinates.y + elementHeight) {
            return;
        }

        // intersecting the element
        if (window.scrollY + window.innerHeight >= elementCoordinates.y + offset) {
            const newElement: HTMLElement = callback(el);
            kontinu.__latestElement = newElement; 
            kontinu.__onIntersection(newElement, callback);
        }
    }
};

// export default kontinu;
