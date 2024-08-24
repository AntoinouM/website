import Resource from "./Resource";

export default class ResourceManager extends EventTarget {

    /** @type {Array} */
    _images;
    /** @type {Array} */
    _videos;
    /** @type {Number} */
    _totalResources;
    /** @type {Array} */
    _loadedResources;

    constructor() {
        super();

        this._images = [];
        this._videos = [];
        this._loadedResources = [];
        this._totalResources = 0;
    }

    // GETTERS

    /** @returns {Array} */
    get images() {
        return this._images;
    }

    /** @returns {Array} */
    get videos() {
        return this._videos;
    }

    /** @returns {Array} */
    get loadedResources() {
        return this._loadedResources;
    }

    /** @returns {Number} */
    get totalResources() {
        return this._totalResources;
    }

    // SETTERS
    /** @param {Number} n */
    set totalResources(n) {
        this._totalResources += n;
    }

    manageResources(type, directory) {
        this.declareResources(type, directory).then(() => this.handleResourcesLoading())
    }

    /**
        * @param {String} type
        * @param {String} directory
    */
    // load resources
    async declareResources(type, directory) {

        return new Promise(async(resolve, reject) => {
            const files = await getAssets(directory);

            if (files.length === 0) {
                console.log(`No files in folder /${directory}.`)
                return;
            }
    
            switch (type) {
                case 'images': {
                    for (let i in files) {
                        let imageName = files[i];
                        let image = new Resource('image', this.toKey(imageName), this.toSrc(imageName, directory), directory);
                        
                        this.addImage(image);             
                    }
                    break;
                }
                case 'videos': {
                    console.log('videos')
                    break;
                }
                default: {
                    console.log(`Type of resources not recognized in /${directory}`)
                }
            } 
            this.totalResources = files.length
            resolve(`${files.length} files declared.`);
        })
    }

    // handle loading
    handleResourcesLoading() {

        if (!import.meta.client) return;

        return new Promise((resolve, reject) => {

            const promisesList = [];

            for (let i in this.images) {

                let image = this.images[i];
                promisesList.push(
                    this.handleSingleResourceLoading(image)
                )
            }

            this.dispatchEvent(new CustomEvent("start"));
            Promise.all(promisesList)
                .then(() => {
                    this.dispatchEvent(new CustomEvent("end"));
                    resolve(`All resources have been loaded (${this.images.length} images`)
                })
                .catch((e) => reject(`${e}`));
        })
    }
    handleSingleResourceLoading(resource) {

        return new Promise((resolve, reject) => {

            const instance = this;

            switch (resource.type) {
                case 'image': {
                    const image = new Image();

                    image.onload = () => {
                        instance.addLoadedResource(resource);
                        // emit something here? (dispatchEvent? customEvent?)
                        instance.emitProgress();
                        resolve(`Image ${resource.key} loaded.`)
                    };
                    image.onerror = () => {reject(`Impossible to load image ${resource.key} from (${resource.src}).`)};
        
                    image.src = resource.src;
                    break;
                }
                case 'video': {

                    break;
                }
                default: this.cl(`Resource ${resource.src} type is not recognized.`)
            }
        })
    }

    emitProgress() {
        this.dispatchEvent(new CustomEvent("progress", {
            detail: {
                totalResources: this.totalResources,
                loadedResources: this.loadedResources.length,
                percentage: (this.loadedResources.length / this.totalResources) * 100
            }
        }));
    }


    // methods

    /** @param {Resource} image */
    addImage(image) {
        this.images.push(image);
    }

    /** @param {Resource} resource */
    addLoadedResource(resource) {
        this.loadedResources.push(resource);
    }

    /** @param {String} name */
    toKey(name) {
        return name.substring(0, name.indexOf('.'));
    }

    /** @param {String|null} directory */
    /** @param {String} name */
    toSrc(name, directory) {
        let src;
        directory ? src = `/${directory}/${name}` : src = `/${name}`
        return src;
    }

    cl(message) {
        if (import.meta.client) {
            console.log(message)
        }
    }
}
