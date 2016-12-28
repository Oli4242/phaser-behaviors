var DEFAULT_CONTROLS = 0; // arrows
// TODO
// var AWSD_CONTROLS = 1;
// var JUMP_ON_SPACE = 2;

var Platformer = {

    // defaults settings
    options: {
        gravity: 600,
        velocity: 200,
        jumpStrength: 250,
        controls: [DEFAULT_CONTROLS]
    },

    create: function (object, options) {
        var gravity = options.gravity;
        var controls = options.controls;
        
        if (gravity > 0) {
            object.body.gravity.y = gravity;
        }
        
        if (controls === false) return; // skip controls setup
        
        if (Array.isArray(controls) === false) {
            controls = [controls]
        }
        
        for(var i = 0; i < controls.length; ++i) {
            if (options.controls === DEFAULT_CONTROLS) {
                options.__cursor = object.game.input.keyboard.createCursorKeys();
            }
        }
    },

    preUpdate: function (object, options) {
        var cursor = options.__cursor;
        var velocity = options.velocity;
        if (cursor.left.isDown) {
            object.body.velocity.x = -velocity;
        } else if (cursor.right.isDown) {
            object.body.velocity.x = velocity;
        } else {
            object.body.velocity.x = 0;
        }

        if (cursor.up.isDown && object.body.touching.down) {
            object.body.velocity.y = -options.jumpStrength;
        }
    }
};
