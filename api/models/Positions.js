/**
 * Position.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        pdps: {
            collection: "pdps",
            via: "position"
        },
        name: {
            type: 'string',
            unique: true
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

