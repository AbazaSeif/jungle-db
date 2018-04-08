class UniqueLinkedList extends LinkedList {
    constructor() {
        super();
        this._map = new Map();
    }

    /**
     * @param {V|*} value
     * @returns {void}
     * @override
     */
    push(value) {
        if (!this._map.has(value)) {
            super.push(value);
        }
    }

    /**
     * @param {LinkedListEntry} entry
     * @returns {void}
     * @protected
     * @override
     */
    _push(entry) {
        super._push(entry);
        this._map.set(entry.value, entry);
    }

    /**
     * @param {V|*} value
     * @returns {void}
     */
    unshift(value) {
        if (!this._map.has(value)) {
            super.unshift(value);
        }
    }

    /**
     * @param {LinkedListEntry} entry
     * @returns {void}
     * @protected
     */
    _unshift(entry) {
        super._unshift(entry);
        this._map.set(entry.value, entry);
    }

    /**
     * @returns {V|*}
     */
    pop() {
        const value = super.pop();
        this._map.delete(value);
        return value;
    }

    /**
     * @returns {V|*}
     */
    shift() {
        const value = super.shift();
        this._map.delete(value);
        return value;
    }

    /**
     * @returns {void}
     */
    clear() {
        super.clear();
        this._map.clear();
    }

    /**
     * @param {V|*} value
     * @returns {boolean}
     */
    contains(value) {
        return this._map.has(value);
    }

    /**
     * @param {V|*} value
     * @returns {void}
     */
    remove(value) {
        const entry = this._map.get(value);
        if (entry) {
            super._remove(entry);
            this._map.delete(value);
        }
    }
}
Class.register(UniqueLinkedList);
