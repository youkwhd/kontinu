"use strict";

type Kontinu = {
    config: IntersectionObserverInit,
    init: (children: Element, onHit: (el: Element) => Element) => void,
    __init: Function,
    __isIntersecting: Function,
}

const kontinu: Kontinu = {
    config: {
        root: null,
        rootMargin: "0px 0px 10px 0px",
        // threshold: 0.5, /* 50% */
    },

    // TODO: what does onHit callback suppose to accept? also returns
    init: (children: Element, onHit: (el: Element) => Element): void => {
        new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            const entry: IntersectionObserverEntry = entries[0];

            console.log(entry);

            if (entry.isIntersecting) {
                const element: Element = onHit(children);

                if (element == undefined) {
                    throw new Error("Kontinu: observed element is undefined");
                }

                observer.unobserve(entry.target);
                return kontinu.init(element, onHit);
            }
        }, kontinu.config)
            .observe(children);
    },

    __init: () => {
    },

    __isIntersecting: (el: HTMLElement, onHit: Function) => {
        // assert window != null

        const elementCoordinates = { x: el.clientLeft, y: el.clientTop };
        const elementHeight = el.clientHeight;

        // surpasses the element
        if (window.scrollY > elementCoordinates.y + elementHeight) {
        }

        // intersecting the element
        if (window.scrollY + window.innerHeight >= elementCoordinates.y) {
        }
    }
};

// export default kontinu;
