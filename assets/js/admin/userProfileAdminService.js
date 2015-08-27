var app = require('../angular-app');

app.service('UserProfileAdminService', UserProfileAdminService);

function UserProfileAdminService($resource) {
    this.get = function (id, cb) {
        $resource('/api/users/:id', {id: id}).get(function (user) {
            user.birthday = new Date(user.birthday);
            cb(user);
        });
    };
    this.update = function (user, cb) {
        $resource('/api/users/:id', null, {
            'update': {method: 'PUT'}
        }).update({id: user.id}, user, cb);
    };

    this.getAvatarUrl = function (filename) {
        return '/api/files/get/' + filename;
    };

    this.getUserLog = function (userId, cb) {
        $resource('/api/logs/?userId=:userId', {userId: userId}).query(function (log) {
            cb(log);
        })
    };

    this.addLog = function (userId, data, cb) {
        $resource('/api/logs/?userId=:userId', {userId: userId}).query(function (log) {


            if (log.length == 0) {
                data.original = [data.original];
                data.changes = [data.changes];
                data.owner = [data.owner];
                data.date = [data.date];
                data.userId = userId;

                $resource('/api/logs/').save(data, function (response) {
                    cb(response);
                });
            }
            else {
                var userLog = angular.copy(log[0]);
                userLog.original.push(data.original);
                userLog.changes.push(data.changes);
                userLog.owner.push(data.owner);
                userLog.date.push(data.date);

                $resource('/api/logs/:id', null, {
                    'update': {method: 'PUT'}
                }).update({id: userLog.id}, userLog, cb);
            }
        });
    };
}