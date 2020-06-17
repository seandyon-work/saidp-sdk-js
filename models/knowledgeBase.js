const  { kbq } = require('./kbq')

class KnowledgeBase {
    
    constructor() {
        this.kbq1 = kbq;
        this.kbq2 = kbq;
        this.kbq3 = kbq;
        this.kbq4 = kbq;
        this.kbq5 = kbq;
        this.kbq6 = kbq;
        this.helpDeskKb = kbq;
    }
}

module.exports = {
    KnowledgeBase: KnowledgeBase
}