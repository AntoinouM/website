export default class Resource {

        /** @type {String} */
        _type;
        /** @type {String} */
        _key;
        /** @type {String} */
        _src;
        /** @type {String} */
        _directory;
        /** @type {String} */
        _format;
        /** @type {Map} */
        _formatsList;
        /** @type {String} */
        _description;


        /**
         * @param {String} format
         * @param {String} key
         * @param {String} src
         * @param {String} directory
         */
        constructor(format, key, src, directory) {
            this._format = format;
            this._key = key;
            this._src = src;
            this._directory = directory;
            this._formatsList = new Map()

            this.init();    
        }

        init() {
            this._formatsList.set(
                'image',
                new Set(['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'])
            )
            this._formatsList.set(
                'video',
                new Set(['mp4', 'mpg', 'mpg-1', 'mpg-2', 'mpg-4', 'mov', 'avi', 'wmf', 'asf', 'mkv', 'webm', 'flf'])
            )

            this.type = this.returnType(this.format)
        }
    
        // GETTERS
        /** @returns {String} */
        get type() {
            return this._type;
        }

        /** @returns {String} */
        get format() {
            return this._format;
        }
    
        /** @returns {String} */
        get key() {
            return this._key;
        }
    
        /** @returns {String} */
        get src() {
            return this._src;
        }

        /** @returns {String} */
        get directory() {
            return this._directory;
        }

        /** @returns {Map} */
        get formatsList() {
            return this._formatsList;
        }

        /** @returns {String} */
        get description() {
            return this._description;
        }
    
        // SETTERS
        /** @param {String} key */
        set key(key) {
            this._key = key;
        }

        /** @param {String} src */
        set src(src) {
            this._src = src;
        }

        /** @param {String} type */
        set type(type) {
            this._type = type;
        }

        /** @param {String} description */
        set description(description) {
            this._description = description;
        }

        // METHODS
        /**
         * @param {String} formatStr
         * @returns {String|undefined}
         */
        returnType(formatStr) {
            let rscType = undefined;

            for (let [key, value] of this.formatsList) {

                if (value.has(formatStr.toLowerCase()) || value.has(formatStr.toUpperCase())) {
                    rscType = key;
                }
            }

            if (rscType === undefined) console.log(`Resource '${this.key}' has a non-recognized format: ${this.format}.`)
                
            return rscType;
        }
}