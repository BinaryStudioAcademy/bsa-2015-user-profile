var app = require('../angular-app');

app.factory('cvPublicFactory', function($resource, $location) {

    var userId = $location.path().split("/")[2];
    console.log('cv ' + userId);
    var cv = $resource('api/cvs/' + userId);
    var Technologies = $resource('api/technologies');
    var Projects = $resource('api/projects');
    var Categories = $resource('api/categories');
    var User_projects = $resource('/api/users_projects');
    var F = {};

    F.getUserData = function(callback) {
        cv.get(function(res) {
            callback(res);
        });
    };

    F.getAllProjects = function(callback) {
        Projects.query(function(res) {
            callback(res);
        });
    };

    F.getAllCategories = function(callback) {
        Categories.query(function(res) {
            callback(res);
        });
    };

    F.getAllTechnologies = function(callback) {
        Technologies.query(function(res) {
            callback(res);
        });
    };

    F.getUsersProjects = function(callback) {
        User_projects.query(function(res) {
            callback(res);
        });
    };

    F.createTechnology = function(tech, userCV, callback){
        var newTechnology = {};
        newTechnology.name = tech.name;
        newTechnology.category = tech.category.id;

        Technologies.save(newTechnology, function(res){
            callback(res);
        });

    };

    F.addTechnologyToCV = function(tech, userCV, callback) {
        var CVs = $resource('/cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'});
        CVs.save({cv_id: userCV.id, id: tech.id}, tech);

        var Categories = $resource('api/categories', {id: '@id'});
        Categories.get({id: tech.category}, function(res) {
            tech.category = res;

            callback(tech);
        })
    };

    F.updateCVTechnologies = function(tech, userCV){
        var CVs = $resource('/cv/:cv_id/technology/:id', {cv_id: '@id', id: '@id'}, {'update': { method:'PUT' }});
        CVs.update({cv_id: userCV.id, id: tech.id}, tech);
    };

    F.createProject = function(project, userCV, callback) {
        var newProject = {};
        newProject.name = project.name;
        newProject.description = project.description;
        newProject.technologies = [];

        for(var i=0; i< project.technologies.length; i++){
            newProject.technologies.push(project.technologies[i].id);
        }

        Projects.save(newProject, function(res){
            callback(res);
        });
    };

    F.addProjectToCV = function(project, userCV, users_projects, callback) {
        project.participants = [];

        for(var i=0; i<users_projects.length; i++) {
            if(users_projects[i].projectId == project.id) {
                project.participants.push(users_projects[i].userId);
            }
        }

        var CVs = $resource('/cv/:cv_id/project/:id', {cv_id: '@id', id: '@id'});
        CVs.save({cv_id: userCV.id, id: project.id}, project);

        callback(project);
    };

    return F;

});