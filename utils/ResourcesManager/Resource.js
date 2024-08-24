export default class Resource {

        /** @type {String} */
        _type;
        /** @type {String} */
        _key;
        /** @type {String} */
        _src;
        /** @type {String} */
        _directory;

        /**
         * @param {String} type
         * @param {String} key
         * @param {String} src
         * @param {String} directory
         */
        constructor(type, key, src, directory) {
            this._type = type;
            this._key = key;
            this._src = src;
            this._directory = directory;
        }
    
        // GETTERS
        /** @returns {String} */
        get type() {
            return this._type;
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
    
        // SETTERS
        /** @param {String} key */
        set key(key) {
            this._key = key;
        }

        /** @param {String} src */
        set src(src) {
            this._src = src;
        }
}