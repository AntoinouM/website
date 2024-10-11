function getScrollValueOfElement(element, container) {

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

    /**
     * @param {JSON} data
     * @param {Array} array 
     */
function assignJSONToResources(data, array) {
    const map = new Map(Object.entries(data))
    array.forEach(resource => {
        console.log(map.has(resource.src))
        if (!map.has(resource.src)) return;
        resource.name = map.get(resource.src).name
        resource.description = map.get(resource.src).description
        resource.divers = map.get(resource.src).divers
    })
}

export {assignJSONToResources, getScrollValueOfElement}