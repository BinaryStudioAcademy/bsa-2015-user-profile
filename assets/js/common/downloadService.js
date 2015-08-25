var app = require('../angular-app');

app.factory('downloadService', function($resource){
    return {
        downloadFile : downloadFile
    };

    function downloadFile(obj) {
        var newFile = $resource('/downloadimg', null, {'post': { method:'POST' }});
        newFile.post(obj, function(res) {
            console.log(res);
        }, function(err){
            console.log(err);
        });

    }
});