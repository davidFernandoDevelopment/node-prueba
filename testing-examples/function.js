const forEach = (items, cb) => {
    for (let i = 0; i < items.length; i++) {
        cb(items[i])
    }
}

module.exports = forEach

