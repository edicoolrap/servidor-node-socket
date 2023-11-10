const { v4: uniqId} = require('uuid');

class Band {
    constructor(name = 'no-name') {
        this.id = uniqId(); //Identificador Unico
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;