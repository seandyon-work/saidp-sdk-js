
const Properties = require('./properties').Properties
const KnowledgeBase = require('./knowledgeBase').KnowledgeBase

class ProfileProperties {

    constructor() {
      this.userId = {}
      this.password = {}
      this.properties = new Properties();
      this.knowledgeBase = new KnowledgeBase();
  }

}

class UpdateProfileProperties {
  constructor() {
    this.properties = new Properties();
    this.knowledgeBase = new KnowledgeBase();
  }
}


module.exports = {
  ProfileProperties: ProfileProperties,
  UpdateProfileProperties: UpdateProfileProperties
}