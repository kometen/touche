// Check userId added the post
ownsDocument = function (userId, doc) {
    return doc && doc.userId === userId;
}

ownsMenu = function (userId, doc) {
    return doc && doc.userId === userId;
}