export default function getScrollValueOfElement(element, container) {

    let observer = undefined;
    let scrollVal = ref(0);

    const updateScrollPercentage = (entry) => {
        const ratio = entry.intersectionRatio;
        const percentage = Math.round(ratio * 100);

        // Update the scroll percentage
        scrollVal.value = percentage;
    };

    const options = {
        root: container ? container : null,
        rootMargin: '0px',
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) // [0, 0.01, 0.02, ..., 1]
    };

    // Initialize the IntersectionObserver
    observer = new IntersectionObserver((entries) => {
        entries.forEach(updateScrollPercentage);
    }, options);

    // Observe the section element
    if (element) {
        observer.observe(element);
    }


    return {
        observer,
        scrollVal,
    };
}