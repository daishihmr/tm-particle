// [初期値, 最終値(option), イージング関数名(option), 時間(option)]
var DATA_DEFAULT = {
    /**
     * 生成時間(ms)
     * -1の場合は無限に生成を続ける
     */
    limit: 5000,

    /**
     * 毎フレーム生成個数
     */
    generate: [ 2 ],

    /**
     * 生成範囲
     */
    generateArea: [ 10, 50 ],

    /**
     *
     */
    blendMode: "lighter",

    /**
     * パーティクル生存時間(ms)
     */
    ageLimit: 1500,

    /**
     * パーティクルの速さ
     */
    speed: [ 3, 1.5 ],

    /**
     * パーティクルの進行方向
     */
    direction: [ function() { return Math.rand(-180, 180); } ],

    /**
     * パーティクルの色
     * 中心から外縁まで
     */
    colors: [
        {
            r: [ 255 ],
            g: [ 255 ],
            b: [ 128, 0 ],
            a: [   1, 0 ]
        },
        {
            r: [ 255 ],
            g: [   0 ],
            b: [   0 ],
            a: [   0 ]
        }
    ],

    /**
     * パーティクルの半径
     */
    radius: [ 30, 80 ],
};

var app;
var pe;

// tm.preload(function() {
//     tm.util.ScriptManager.loadStats();
// });

tm.main(function() {
    app = tm.display.CanvasApp("#app");
    // app.enableStats();
    app.fps = 60;
    app.run();

    pe = tm.display.ParticleElement(DATA_DEFAULT)
        .setPosition(app.width/2, app.height/2)
        .addChildTo(app.currentScene);
});

var MainCtrl = function($scope) {

    $scope.limit = 1000;
    $scope.generate = [];
    $scope.generateArea = [];
    $scope.speed = [];
    $scope.direction = [];
    $scope.radius = [];

    $scope.$extend(DATA_DEFAULT);

    $scope.generate[2] = "linear";
    $scope.blendMode = "source-over";

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
};
