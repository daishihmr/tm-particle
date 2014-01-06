var STATS = false;

var app;
var particleElement;

if (STATS) {
    tm.preload(function() {
        tm.util.ScriptManager.loadStats();
    });
}

tm.main(function() {
    app = tm.display.CanvasApp("#app");
    if (STATS) app.enableStats();
    app.run();

    particleElement = tm.display.ParticleElement(DATA_DEFAULT)
        .setPosition(app.width/2, app.height/2)
        .addChildTo(app.currentScene);
});

var myApp;
angular.element(document).ready(function() {
    myApp = angular.module("myApp", []);
    myApp.controller("MainCtrl", ["$scope", function($scope) {

        $scope.$extend(DATA_DEFAULT);

        $scope.generate[2] = "linear";

        $scope.enableEasing = {};
        ["generate", "generateArea", "speed", "direction", "radius"].forEach(function(v) {
            $scope.enableEasing[v] = $scope[v].length > 1;
        });

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
            if (particleElement) particleElement.remove();
            particleElement = tm.display.ParticleElement($scope)
                .setPosition(app.width/2, app.height/2)
                .addChildTo(app.currentScene);
        };
    }]);


    angular.bootstrap(document, ['myApp']);
});
