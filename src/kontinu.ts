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

        const elementPosition = { x: el.offsetLeft, y: el.offsetTop };
        const elementHeight = el.clientHeight;

        const screenPosition = { x: window.scrollX, y: window.scrollY };
        const screenHeight = window.innerHeight;

        return (screenPosition.y + screenHeight >= elementPosition.y + offset)
               && (screenPosition.y <= elementPosition.y + elementHeight);
    },
};

// export default kontinu;
