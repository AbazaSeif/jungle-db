class LRUMap {
    constructor(maxSize) {
        this._maxSize = maxSize;
        /** @type {Map} */
        this._map = new Map();
        this._numAccesses = new Map();
        this._accessQueue = [];
    }

    get size() {
        return this._map.size;
    }

    clear() {
        this._numAccesses.clear();
        this._accessQueue = [];
        return this._map.clear();
    }

    delete(key) {
        return this._map.delete(key);
    }

    entries() {
        return this._map.entries();
    }

    forEach(callback, thisArg) {
        return this._map.forEach(callback, thisArg);
    }

    get(key) {
        this.access(key);
        return this._map.get(key);
    }

    has(key) {
        return this._map.has(key);
    }

    keys() {
        return this._map.keys();
    }

    evict(k=1) {
        while (k > 0 && this._accessQueue.length > 0) {
            const oldest = this._accessQueue.shift();
            let accesses = this._numAccesses.get(oldest);
            --accesses;
            this._numAccesses.set(oldest, accesses);
            // Check if not used in the meanwhile.
            if (accesses !== 0) {
                continue;
            }
            // Otherwise delete that.
            this.delete(oldest);
            this._numAccesses.delete(oldest);
            --k;
        }
    }

    access(key) {
        if (!this._map.has(key)) {
            return;
        }
        let accesses = 0;
        if (this._numAccesses.has(key)) {
            accesses = this._numAccesses.get(key);
        }
        ++accesses;
        this._numAccesses.set(key, accesses);
        this._accessQueue.push(key);
    }

    set(key, value) {
        if (this.size >= this._maxSize) {
            this.evict();
        }
        this._map.set(key, value);
        this.access(key);
    }

    values() {
        return this._map.values();
    }

    [Symbol.iterator]() {
        return this._map.entries();
    }
}
Class.register(LRUMap);
