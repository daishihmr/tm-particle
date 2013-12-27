// [初期値, 最終値(option), イージング関数名(option), 時間(option)]
var DATA_DEFAULT = {
    /**
     * 生成時間(ms)
     * -1の場合は無限に生成を続ける
     */
    limit: -1,

    /**
     * 毎フレーム生成個数
     */
    generate: [ { value: 1 }, { value: 2 } ],

    /**
     * 生成範囲
     */
    generateArea: [ { value: 20 } ],

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
    speed: [ { value: 6 }, { value: 2 } ],

    /**
     * パーティクルの進行方向
     */
    direction: [ { random: true, min: -110-90, max: 110-90 }, { value: -90 }, "easeOutQuad" ],

    /**
     * パーティクルの色
     * 中心から外縁まで
     */
    colors: [
        {
            r: [ { value: 255 } ],
            g: [ { value: 255 } ],
            b: [ { value: 128 }, { value: 0 } ],
            a: [ { value:   1 } ]
        },
        {
            r: [ { value: 255 } ],
            g: [ { value:   0 } ],
            b: [ { value:   0 } ],
            a: [ { value:   0 } ]
        }
    ],

    /**
     * パーティクルの半径
     */
    radius: [ { value: 50 }, { value: 1 } ]
};
