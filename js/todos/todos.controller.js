/*
angular.module('TodoApp').controller('TodoController',
    ['TodoService', '$scope', function (TodoService, $scope) {
    ...}]);
 */

// app.controller('TodoController',
// angular.module('TodoApp.controllers', [])
app
    .controller("TodoController", ['TodoService', '$scope', function (TodoService, $scope) {

        $scope.message = null;
        $scope.messageClass = 'alert alert-success';

        self.successMessage = '';
        self.errorMessage = '';

        function buildError(messages) {
            $scope.message = (messages || []).map(msg => msg + '<br/>');
            $scope.messageClass = 'alert alert-danger';
        }

        TodoService.fetchAll()
            .then(todos => {
                $scope.todos = todos;
            });

        $scope.destroy = function (todo) {
            TodoService.destroy(todo)
                .then(
                    function (result) {
                        $scope.message = 'Todo deleted successfully';
                        $scope.messageClass = 'alert alert-success';
                        $scope.todos.splice(todo, 1);
                    },
                    function (errorMessages) {
                        buildError(errorMessages)
                    }
                );
        };

        $scope.toggleComplete = function (todo) {
            const newTodo = {...todo, completed: !todo.completed};
            TodoService.update(newTodo).then(function (updatedTodo) {
                $scope.todos = $scope.todos.map(t => t.id === todo.id ? updatedTodo : t);
            }, function (errorMessages) {
                buildError(errorMessages);
            });
        }
    }]);
