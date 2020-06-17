
const { ProfileProperties, UpdateProfileProperties } = require('./profileProperties');


class Models {
    constructor() {
        this.profileProperties = new ProfileProperties();
        this.updateProfileProperties = new UpdateProfileProperties();
    }
}

module.exports = {
    Models: Models
}