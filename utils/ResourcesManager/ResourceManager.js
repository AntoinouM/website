import LabeledArray from "./LabeledArray";
import Resource from "./Resource";

export default class ResourceManager extends EventTarget {

    /** @type {LabeledArray} */
    _images;
    /** @type {LabeledArray} */
    _videos;
    /** @type {Number} */
    _totalResources;
    /** @type {Array} */
    _loadedResources;


    constructor() {
        super();

        this._images = new LabeledArray('images');
        this._videos = new LabeledArray('videos');
        this._loadedResources = [];
        this._totalResources = 0;
    }

    // GETTERS

    /** @returns {LabeledArray} */
    get images() {
        return this._images;
    }

    /** @returns {LabeledArray} */
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

    manageResources(type, directory, listOfElements) {
        this.declareResources(type, directory, listOfElements).then(() => this.handleResourcesLoading())
    }

    /**
        * @param {String} type
        * @param {String} directory
        * @param {Array|null} listOfElements
        * @returns {Promise<String>}
    */
    // load resources
    async declareResources(type, directory, listOfElements) {

        return new Promise(async(resolve, reject) => {

            let files;
            // should offer possibility to have a list of items in a folder?
            if (!listOfElements) {
                files = await getAssets(directory);
            } else {
                files = listOfElements;
            }

            if (files.length === 0) {
                console.log(`No files in folder /${directory}.`)
                return;
            }
    
            switch (type) {
                case 'images': {
                    checkFiles: for (let i in files) {
                        let imageName = files[i];

                        // check if key is already declared
                        if (this.images.keysSet.has(this.toKey(imageName))) continue checkFiles;

                        let image = new Resource('image', this.toKey(imageName), this.toSrc(imageName, directory), directory);
                        
                        this.images.array.push(image);
                        this.images.keysSet.add(image.key);          
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
    /**
        * @returns {Promise<String>}
    */
    handleResourcesLoading() {

        if (!import.meta.client) return;

        return new Promise((resolve, reject) => {

            const promisesList = [];

            for (let i in this.images.array) {

                let image = this.images.array[i];
                promisesList.push(
                    this.handleSingleResourceLoading(image)
                )
            }

            this.dispatchEvent(new CustomEvent("start"));
            Promise.all(promisesList)
                .then(() => {
                    this.dispatchEvent(new CustomEvent("end"));
                    resolve(`All resources have been loaded (${this.images.array.length} images`)
                })
                .catch((e) => reject(`${e}`));
        })
    }

    /**
     * @param {Resource} resource
     * @returns {Promise<String>}
    */
    handleSingleResourceLoading(resource) {

        return new Promise((resolve, reject) => {

            const instance = this;

            switch (resource.type) {
                case 'image': {
                    const image = new Image();

                    image.onload = () => {
                        instance.addLoadedResource(resource);
                        instance.emitProgress(); // track progress of promise
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


    // METHODS
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

    /** @param {String} message */
    cl(message) {
        if (import.meta.client) {
            console.log(message)
        }
    }
}
