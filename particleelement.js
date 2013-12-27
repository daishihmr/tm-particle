(function() {

tm.define("tm.display.ParticleElement", {
    superClass: "tm.display.CanvasElement",

    data: null,
    factory: null,
    completed: false,

    generate: 0,
    generateArea: 0,

    init: function(_data) {
        this.superInit();

        this.completed = false;

        var data = this.data = {}.$extend(_data);

        if (data.limit > 0) {
            this.tweener.wait(data.limit).call(function() {
                this.completed = true;
            }.bind(this));

            newTweener(this, data, "generate", data.limit);
            newTweener(this, data, "generateArea", data.limit);
        } else {
            this.generate = evalValue(data.generate[0]);
            this.generateArea = evalValue(data.generateArea[0]);
        }

        this.factory = function() {
            var a = Math.random() * Math.PI * 2;
            var d = Math.random() * this.generateArea;
            return tm.display.Particle(evalValue(data.ageLimit), data)
                .setPosition(Math.cos(a)*d, Math.sin(a)*d);
        };
    },

    update: function(app) {
        if (this.completed) return;

        for (var i = 0; i < this.generate; i++) {
            this.addChild(this.factory());
        }
    }

});

tm.define("tm.display.Particle", {
    superClass: "tm.display.CanvasElement",

    ageLimit: 0,
    speed: 0,
    direction: 0,
    colors: null,
    blendMode: "source-over",

    init: function(ageLimit, data) {
        this.superInit();
        this.radius = 30;

        this.ageLimit = ageLimit;
        this.blendMode = data.blendMode;

        this.tweener.wait(this.ageLimit).call(function() {
            this.remove();
        }.bind(this));

        newTweener(this, data, "speed", this.ageLimit);
        newTweener(this, data, "direction", this.ageLimit);
        newTweener(this, data, "radius", this.ageLimit);

        this.colors = [];
        for (var i = 0; i < data.colors.length; i++) {
            var cd = data.colors[i];
            var c = tm.particle.ColorElement(0, 0, 0, 0);
            newTweener(c, cd, "r", this.ageLimit);
            newTweener(c, cd, "g", this.ageLimit);
            newTweener(c, cd, "b", this.ageLimit);
            newTweener(c, cd, "a", this.ageLimit);
            c.addChildTo(this);
            this.colors.push(c);
        }
    },

    update: function() {
        this.x += Math.cos(this.direction*Math.DEG_TO_RAD)*this.speed;
        this.y += Math.sin(this.direction*Math.DEG_TO_RAD)*this.speed;
    },

    draw: function(canvas) {
        canvas.globalCompositeOperation = this.blendMode;
        canvas.fillStyle = tm.graphics.RadialGradient(0, 0, 0, 0, 0, this.radius)
            .addColorStopList(this.colorStopList())
            .toStyle();
        canvas.fillRect(-this.radius, -this.radius, this.radius*2, this.radius*2);
    },

    colorStopList: function() {
        var result = [];
        var len = this.colors.length;
        if (len == 0) {
            result.push({ offset: 0, color: "white" });
            result.push({ offset: 1, color: "transparent" });
        } else if (len == 1) {
            result.push({ offset: 0, color: this.colors[0].toStyleAsRGBA() });
            result.push({ offset: 1, color: this.colors[0].toStyleAsRGBA() });
        } else {
            for (var i = 0; i < len; i++) {
                result.push({
                    offset: i / (len - 1),
                    color: this.colors[i].toStyleAsRGBA()
                });
            }
        }
        return result;
    }

});

var newTweener = function(target, data, propName, duration) {
    var temp;
    var initialValues = {};
    var tos = {};

    initialValues[propName] = temp = evalValue(data[propName][0]);
    tos[propName] = evalValue(data[propName][1], temp);
    tm.app.Tweener(target).set(initialValues).to(tos, data[propName][3] || duration, data[propName][2]);
};

var evalValue = function(v, v2) {
    if (v === undefined) {
        if (typeof(v2) === "number") {
            return v2;
        } else if (typeof(v2) === "object") {
            if (v2.random) {
                return Math.randf(v2.min, v2.max);
            } else {
                return v2.value;
            }
        } else {
            return 0;
        }
    } else {
        if (typeof(v) === "number") {
            return v;
        } else if (typeof(v) === "object") {
            if (v.random) {
                return Math.randf(v.min, v.max);
            } else {
                return v.value;
            }
        } else {
            return 0;
        }
    }
};

tm.define("tm.particle.GhostElement", {
    superClass: "tm.app.Object2D",

    init: function() {
        this.superInit();
    },

    _dirtyCalc: function() {
    },

});

/**
 * tweenerを利用可能な色クラス
 */
tm.define("tm.particle.ColorElement", {
    superClass: "tm.particle.GhostElement",

    color: null,

    init: function() {
        this.superInit();
        this.color = tm.graphics.Color.apply(null, arguments);
    },

    toStyleAsRGBA: function() {
        return this.color.toStyleAsRGBA();
    }
});

tm.particle.ColorElement.prototype.accessor("r", {
    get: function() {
        return this.color.r;
    },
    set: function(v) {
        this.color.r = Math.round(Math.clamp(v, 0, 255) * 10000) / 10000;
    }
});
tm.particle.ColorElement.prototype.accessor("g", {
    get: function() {
        return this.color.g;
    },
    set: function(v) {
        this.color.g = Math.round(Math.clamp(v, 0, 255) * 10000) / 10000;
    }
});
tm.particle.ColorElement.prototype.accessor("b", {
    get: function() {
        return this.color.b;
    },
    set: function(v) {
        this.color.b = Math.round(Math.clamp(v, 0, 255) * 10000) / 10000;
    }
});
tm.particle.ColorElement.prototype.accessor("a", {
    get: function() {
        return this.color.a;
    },
    set: function(v) {
        this.color.a = Math.round(Math.clamp(v, 0, 1) * 10000) / 10000;
    }
});

})();
