export default class LabeledArray {

    /** @type {String} */
    _label;
    /** @type {Array} */
    _array;
    /** @type {Set} */
    _keysSet;

    /**
     * @param {String} label
     */
    constructor(label) {
        this._label = label;
        this._array = [];
        this._keysSet = new Set();
    }

    // GETTERS
    /** @returns {String} */
    get label() {
        return this._label;
    }

    /** @returns {Array} */
    get array() {
        return this._array;
    }

    /** @returns {Set} */
    get keysSet() {
        return this._keysSet;
    }
}