// Check userId added the participant
ownsPost = function (ownerId, doc) {
    return doc && doc.ownerId === ownerId;
}