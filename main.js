var app;
var pe;

// tm.preload(function() {
//     tm.util.ScriptManager.loadStats();
// });

tm.main(function() {
    app = tm.display.CanvasApp("#app");
    // app.enableStats();
    app.run();

    pe = tm.display.ParticleElement(DATA_DEFAULT)
        .setPosition(app.width/2, app.height/2)
        .addChildTo(app.currentScene);
});

var myApp;
angular.element(document).ready(function() {
    $("#value-input").tmpl().appendTo("#tmpl-test");

    myApp = angular.module('myApp', []);
    myApp.controller("MainCtrl", ["$scope", function($scope) {

        $scope.limit = 1000;
        $scope.generate = [];
        $scope.generateArea = [];
        $scope.speed = [];
        $scope.direction = [];
        $scope.radius = [];

        $scope.$extend(DATA_DEFAULT);

        $scope.generate[2] = "linear";

        $scope.enableEasing = {};
        $scope.enableEasing.generate = $scope.generate.length > 1;

        $scope.easings = [];
        for (var name in tm.anim.easing) {
            $scope.easings.push(name);
        }
        $scope.blendModes = [
            "source-atop",
            "source-in",
            "source-out",
            "source-over",
            "destination-atop",
            "destination-in",
            "destination-out",
            "destination-over",
            "lighter",
            "copy",
            "xor",
        ];

        $scope.regenerate = function() {
            if (pe) pe.remove();
            pe = tm.display.ParticleElement($scope)
                .setPosition(app.width/2, app.height/2)
                .addChildTo(app.currentScene);
        };
    }]);


    angular.bootstrap(document, ['myApp']);
});
