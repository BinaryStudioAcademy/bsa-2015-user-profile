var app = require('../angular-app');

app.service('UserProfileService', UserProfileService);

function UserProfileService($resource) {
    this.get = function(id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            cb(user);
        });
    };
}