/* Copyright (c) 2024, youkwhd <lolywk@tutanota.com>
 *
 * MIT Licensed
 */

type KontinuConfig = {
    offset: {
        top: number,
        bottom: number,
    },
};

type Kontinu = {
    config: KontinuConfig,
    observe: (el: HTMLElement, callback: Function, config?: KontinuConfig) => void,
    isIntersecting: (target: HTMLElement) => boolean,
};

const kontinu: Kontinu = {
    config: {
        offset: {
            top: 0,
            bottom: 0,
        },
    },

    observe: (el: HTMLElement, callback: Function, config?: KontinuConfig) => {
        if (!window || !document) {
            throw new Error("Kontinu: Could not find the global variable `window`, perhaps wait for the DOM to load.");
        }

        if (config) {
            kontinu.config = config;
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

        const { offset } = kontinu.config; // px

        const elementPosition = { x: el.offsetLeft, y: el.offsetTop };
        const elementHeight = el.clientHeight;

        const screenPosition = { x: window.scrollX, y: window.scrollY };
        const screenHeight = window.innerHeight;

        return (screenPosition.y + screenHeight >= elementPosition.y + offset.top)
               && (screenPosition.y <= elementPosition.y + elementHeight - offset.bottom);
    },
};

export default kontinu;
