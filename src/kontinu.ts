"use strict";

const kontinu = {
    // TODO: what does onHit callback suppose to accept? also returns
    init: (children: Element, onHit: Function): void => {
        const config = {
            root: null,
            threshold: 0.5, /* 50% */
        };

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
        }, config)
            .observe(children);
    },
};

// export default kontinu;
