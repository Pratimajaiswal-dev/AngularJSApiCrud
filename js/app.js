var app = angular.module("TodoApp", ["ngRoute" /*, "TodoApp.controllers"*/]);

//app.config(['$locationProvider', function ($locationProvider) {
//    $locationProvider.hashPrefix('');
//}]);

app.constant('urls', {
    BASE: 'http://localhost:8080/api',
    TODO_SERVICE: 'http://localhost:8080/api/todos'
});

// app.config(["$routeProvider", function ($routeProvider, $locationProvider) {
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when("/", {templateUrl: "partials/todos/list.html", controller: "TodoController"})
        .when("/todos/:id", {templateUrl: "partials/todos/show.html", controller: "TodoDetailsController"})
        .when("/todos/create", {templateUrl: "partials/todos/create_edit.html", controller: "TodoDetailsController"})
        .when("/todos/:id/edit", {templateUrl: "partials/todos/create_edit.html", controller: "TodoDetailsController"})
        .otherwise({redirectTo: "/"});

});
