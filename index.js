module.exports = class RadixTrie {
    tree = {}

    tokenize (sentence) {
        const words = sentence
            .trim()
            .split(' ')
            .map(word => word.replace(/[\W\.]/mg, '').toLowerCase())

        return words
    }

    register (sentence) {
        const tokens = this.tokenize(sentence)
        let root = this.tree

        for (let i = 0, l = tokens.length; i < l; i++) {
            const token = tokens[i]

            if (!root[token]) {
                root[token] = {}
            }

            root = root[token]
        }
    }

    search (sentence) {
        const tokens = this.tokenize(sentence)
        let root = this.tree

        for (let i = 0, l = tokens.length; i < l; i++) {
            const token = tokens[i]

            if (root[token]) {
                root = root[token]
            } else {
                return 0
            }
        }

        if (root) {
            return 1
        }
    }

    sortFn (a, b) {
        if (a === b) {
            return 0
        }

        for (let i = 0, l = a.length; i < l; i++) {
            if (!a[i]) {
                return -1
            }

            if (a.charCodeAt(i) > b.charCodeAt(i)) {
                return 1
            } else {
                return -1
            }
        }
    }

    sort (root = this.tree, upstreams = '', result = []) {
        const keys = Object
            .keys(root)
            .sort(this.sortFn)

        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i]

            if (!Object.keys(root[key]).length) {
                result.push(upstreams + ' ' + key)
            } else {
                this.sort(root[key], upstreams + ' ' + key, result)
            }
        }

        return result
    }
}
