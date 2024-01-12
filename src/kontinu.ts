"use strict";

type Kontinu = {
    config: IntersectionObserverInit,
    init: (children: Element, onHit: (el: Element) => Element) => void,
}

const kontinu: Kontinu = {
    config: {
        root: null,
        rootMargin: "0px 0px 5px 0px",
        // threshold: 0.5, /* 50% */
    },

    // TODO: what does onHit callback suppose to accept? also returns
    init: (children: Element, onHit: (el: Element) => Element): void => {
        new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            const entry: IntersectionObserverEntry = entries[0];

            if (entry.isIntersecting) {
                const lastElement: Element = onHit(children);
                if (lastElement == undefined) {
                    throw new Error("Kontinu: last element is undefined");
                }

                observer.unobserve(entry.target);
                return kontinu.init(lastElement, onHit);
            }
        }, kontinu.config)
            .observe(children);
    },
};

// export default kontinu;
