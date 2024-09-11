import Resource from "./Resource";

export default class ResourceManager extends EventTarget {

    /** @type {Map} */
    _images;
    /** @type {Map} */
    _videos;
    /** @type {Number} */
    _totalResources;
    /** @type {Map} */
    _loadedResources;

    constructor() {
        super();

        this._images = new Map();
        this._videos = new Map();
        this._loadedResources = new Map();
        this._totalResources = 0;
    }

    // GETTERS

    /** @returns {Map} */
    get images() {
        return this._images;
    }

    /** @returns {Map} */
    get videos() {
        return this._videos;
    }

    /** @returns {Map} */
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

    /**
     * @param {String|Array} directory 
     * @param {Array} listOfElements 
     * @returns {Promise<String>}
     */
    manageResources(directory, listOfElements) {
        if (Array.isArray(directory)) {
            // manage arr => promise.all
            this.manageResourcesArrayOfDir(directory).then((message) => {
                this.emitEnd();
            })
        } else {
            // manage single
            this.manageResourcesSingleDir(directory, listOfElements).then((message) => {
                this.emitEnd();
            })
        }
    }

    manageResourcesArrayOfDir(directories, listOfElements) {
        return new Promise((resolve, reject) => {
            const promisesOfArrayDir = [];

            directories.forEach(dir => {
                promisesOfArrayDir.push(this.manageResourcesSingleDir(dir));
            })

            Promise.all(promisesOfArrayDir).then((message) => {
                resolve(`All resources have been loaded (${this.images.size} images, ${this.videos.size} videos)`)
            })
        })

    }

    manageResourcesSingleDir(directory, listOfElements) {
        return new Promise ((resolve, reject) => {
            this.declareResources(directory, listOfElements)
                .then(() => {
                    this.handleResourcesLoading().then((value) => {resolve(value)}) 
                }
            )
        })
    }


    /**
        * @param {String} type
        * @param {String} directory
        * @param {Array|null} listOfElements
        * @returns {Promise<String>}
    */
    // load resources
    async declareResources(directory, listOfElements) {

        return new Promise(async(resolve, reject) => {

            let files;
            // should offer possibility to have a list of items in a folder?
            if (!listOfElements) {
                files = await getAssets(directory);
            } else {
                files = listOfElements;
            }

            if (files.length === 0) {
                console.log(`No files in folder '/${directory}'.`)
                return;
            }

            checkFiles: for (let i in files) {
                let resourceName = files[i];
                // check if key is already declared
                if (
                    this.images.has(this.toKey(resourceName)) ||
                    this.videos.has(this.toKey(resourceName))
                ) 
                {
                    continue checkFiles;
                }

                let resource = new Resource(this.getFormat(resourceName), this.toKey(resourceName), this.toSrc(resourceName, directory), directory);

                if (!resource.type) continue checkFiles;
                
                switch (resource.type) {
                    case 'image': {
                        this.images.set(resource.key, resource);  
                        break;
                    }
                    case 'video': {
                        this.videos.set(resource.key, resource);  
                        break;
                    }
                }   
            }

            this.totalResources = this.images.size + this.videos.size;
            resolve(`${files.length} files declared.`);
        })
    }

    // handle loading
    /**
        * @returns {Promise<String>}
    */
    handleResourcesLoading() {
        return new Promise((resolve, reject) => {

            if (!import.meta.client) return;

            const promisesList = [];

            this.emitStart();

            if (this.images.size !== 0) {
                this.images.forEach((value, key) => {
                    promisesList.push(
                        this.handleSingleResourceLoading(value)
                    )
                });
            }

            if (this.videos.size !== 0) {
                this.videos.forEach((value, key) => {
                    promisesList.push(
                        this.handleSingleResourceLoading(value)
                    )
                });
            }

            Promise.all(promisesList)
                .then(() => {
                    resolve(`All resources have been loaded (${this.images.size} images, ${this.videos.size} videos)`)
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
                        instance.loadedResources.set(resource.key, resource)
                        instance.emitProgress();
                        resolve(`Image ${resource.key} loaded.`)
                    };
                    image.onerror = () => {reject(`Impossible to load image ${resource.key} from (${resource.src}).`)};
        
                    image.src = resource.src;
                    break;
                }
                case 'video': {
                    const video = document.createElement("video");

                    video.onloadeddata = function () {
                        instance.loadedResources.set(resource.key, resource)
                        instance.emitProgress();
                        resolve(`Video ${resource.key} loaded.`)
                    };

                    video.onerror = () => {reject(`Impossible to load video ${resource.key} from (${resource.src}).`)};

                    video.src = resource.src;
                    video.load();

                    break;
                }
                default: this.cl(`Resource ${resource.src} type is not recognized.`)
            }
        })
    }

    /**
     * 
     * @param {String} p 
     * @returns {Array|null}
     */
    getFilteredArray(p) {
        let generalArray = Array.from(this.images.values()).concat(Array.from(this.videos.values()))

        // check for directory
        let array = generalArray.filter((resource) => resource.directory === p);
        if (array.length !== 0) { // match for directory
            return array
        }
        
        // check for type as no match for directory
        array = generalArray.filter((resource) => resource.type === p);
        if (array.length !== 0) {
            return array
        }

        // no match for either directory or type
        console.log(`No resources matching directory or type: '${p}'.`)
        return null;
    }

    // EMITS METHODS - CUSTOMEVENTS
    emitStart() {
        this.dispatchEvent(new CustomEvent("start", {
            detail: {
                resourcesLoaded: false,
                message: `Resource loading starts (${this.images.size + this.videos.size} resources.)`
            }
        }));
    }

    emitProgress() {
        this.dispatchEvent(new CustomEvent("progress", {
            detail: {
                totalResources: this.totalResources,
                loadedResources: this.loadedResources.size,
                percentage: (this.loadedResources.size / this.totalResources) * 100
            }
        }));
    }

    emitEnd() {
        this.dispatchEvent(new CustomEvent("end", {
            detail: {
                images: this.images,
                videos: this.videos,
                nbImages: this.images.size,
                nbVideos: this.videos.size,
                resourcesLoaded: true,
                message: `All resources have been loaded (${this.images.size} images, ${this.videos.size} videos)`
            }
        }));
    }


    // METHODS
    /** @param {String} str */
    toKey(str) {
        return str.substring(0, str.indexOf('.'));
    }

    /** @param {String|null} directory */
    /** @param {String} name */
    toSrc(name, directory) {
        let src;
        directory ? src = `/${directory}/${name}` : src = `/${name}`
        return src;
    }

    /** @param {String} str */
    getFormat(str) {
        return str.split('.').pop();
    }


    /** @param {String} message */
    cl(message) {
        if (import.meta.client) {
            console.log(message)
        }
    }
}
