// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var app = angular.module('starter', ['ionic']);

app.controller('SubjectController', ['$scope','$http', function($scope, $http) {
    $scope.newSubject = {};
    $scope.subjects = {};
    $scope.selected = false;
    var dir = "localhost";

$scope.cleanall = function(){
    $scope.newSubject = {};
};

// Obtenemos todos los datos de la base de datos
$http.get('http://'+ dir +':3000/api/subject').success(function(data) {
        $scope.subjects = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
$scope.GetAll = function() {
	$http.get('http://'+ dir +':3000/api/subject').success(function(data) {
        $scope.subjects = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
}
	
    // Función para filtrar por alumno
    $scope.filterSubject = function(res) {

        $http.post('http://'+ dir +':3000/api/sub', $scope.newSubject)
            .success(function (data) {
                if (data==false) {
                    alert("Al alumno que busca no se le ha asociado a ninguna asignatura");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
                })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };
	
	// Función para filtrar por asignatura
    $scope.filterName = function(res) {

        $http.post('http://'+ dir +':3000/api/subject', $scope.newSubject)
            .success(function (data) {
                if (data==false) {
                    alert("La asignatura que busca aún no ha sido creada");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
                })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

// Función para registrar una asignatura
$scope.registrarSubject = function(res) {
    
        $http.post('http://'+ dir +':3000/api/subject', $scope.newSubject)
            .success(function (data) {
                
                if (data == false)
                {
                    alert("El alumno que intentas añadir aún no ha sido creado")
                }
                    else if (data == "repetido")
                {
                    alert("El alumno ya ha sido añadido a esta asignatura")
                }
                else {
                    $scope.cleanall(); // Borramos los datos del formulario
                    $scope.subjects = data;
                }
            })
            .error(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                alert(data);
                //console.log('Error: ' + data);
            });
    
};

// Función para editar los datos de una asignatura
$scope.modificarSubject = function(newSubject) {
    $http.put('http://'+ dir +':3000/api/subject/' + $scope.newSubject._id, $scope.newSubject)
        .success(function(data) {
            $scope.cleanall(); // Borramos los datos del formulario
            $scope.subjects = data;
            $scope.selected = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};

// Función que borra un objeto asignatura conocido su id
$scope.borrarSubject = function(newSubject) {
    $http.delete('http://'+ dir +':3000/api/subject/' + $scope.newSubject._id)
        .success(function(data) {
            $scope.cleanall();
            $scope.subjects = data;
            $scope.selected = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};

// Función para coger el objeto asignatura seleccionado en la tabla
$scope.selectSubject = function(subject) {
    $scope.newSubject = subject;
    $scope.selected = true;
    console.log($scope.newSubject, $scope.selected);
};
}]);


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
