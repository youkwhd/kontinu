"use strict";

type Kontinu = {
    observe: Function,
    isIntersecting: (target: HTMLElement) => boolean,
};

const kontinu: Kontinu = {
    observe: (el: HTMLElement, callback: Function) => {
        if (!window || !document) {
            throw new Error("Kontinu: Could not find the global variable `window`, perhaps wait for the DOM to load.");
        }

        if (kontinu.isIntersecting(el)) {
            callback();
            return;
        }

        const handleIntersection = () => {
            if (kontinu.isIntersecting(el)) {
                callback();

                window.removeEventListener("scroll", handleIntersection);
                window.removeEventListener("resize", handleIntersection);
            }
        };

        window.addEventListener("scroll", handleIntersection);
        window.addEventListener("resize", handleIntersection);
    },

    isIntersecting: (el: HTMLElement): boolean => {
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
            return false;
        }

        return window.scrollY + window.innerHeight >= elementCoordinates.y + offset;
    },
};

// export default kontinu;
