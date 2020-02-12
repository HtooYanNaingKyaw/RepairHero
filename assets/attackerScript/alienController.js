
let alienState = {
    health: 100,
    level: 1,
    speed: 100,
}

cc.Class({
    extends: cc.Component,

    properties: {
        easyAlienSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },

        normalAlienSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },

        hardAlienSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },

        alienSprite: {
            default: null,
            type: cc.Sprite,
        },

        alienBoxCollider: {
            default: null,
            type: cc.BoxCollider,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    linkWithMainLayer(mainController){
        let AlienCtrl = this;
        AlienCtrl.mainController = mainController;
    },

    onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

    },

    spawnAlien(alienState) {
        var AlienCtrl = this;
        AlienCtrl.alienState = alienState;
        AlienCtrl.animation = AlienCtrl.node.getComponent(cc.Animation);
        if (AlienCtrl.alienState.level == 1) {
            AlienCtrl.alienSprite.spriteFrame = AlienCtrl.easyAlienSpriteFrame;
            AlienCtrl.animation.play("easyAlienAnimation");
            let randomLane = AlienCtrl.getRandomInt(1, 3);
            if (randomLane == 1) {
                AlienCtrl.node.x = 35;
            } else {
                AlienCtrl.node.x = -35;
            }

        } else if (AlienCtrl.alienState.level == 2) {
            AlienCtrl.alienSprite.spriteFrame = AlienCtrl.normalAlienSpriteFrame;
            AlienCtrl.alienLive = 2;
            AlienCtrl.animation.play("normalAlienAnimation");
            let randomLane = AlienCtrl.getRandomInt(1, 3);
            if (randomLane == 1) {
                AlienCtrl.node.x = 35;
            } else {
                AlienCtrl.node.x = -35;
            }
        } else {
            AlienCtrl.alienBoxCollider.size.width = 120;
            AlienCtrl.alienLive = 3;
            AlienCtrl.alienSprite.spriteFrame = AlienCtrl.hardAlienSpriteFrame;
            AlienCtrl.animation.play("hardAlienAnimation");
        }
    },

    start() {

    },

    onCollisionEnter: function (other, self) {
        let AlienCtrl = this;
        if (other.node.group == "bullet") {
            if (AlienCtrl.alienState.level == 1) {
                AlienCtrl.mainController._highScore += 1;
                AlienCtrl.mainController.addHighScore();
                AlienCtrl.node.active = false;
               
            } else if (AlienCtrl.alienState.level == 2) {
                AlienCtrl.alienLive -= 1;
                if (AlienCtrl.alienLive == 0) {
                    AlienCtrl.mainController._highScore += 3;
                    AlienCtrl.mainController.addHighScore();
                    AlienCtrl.node.active = false;
                 
                }
            } else {
                AlienCtrl.alienLive -= 1;
                if (AlienCtrl.alienLive == 0) {
                    AlienCtrl.mainController._highScore += 5;
                    AlienCtrl.mainController.addHighScore();
                    AlienCtrl.node.active = false;
                }
            }
        } else if (other.node.group == "gate"){
            AlienCtrl.node.active = false;
        } else if (other.node.group == "endLine") {
            AlienCtrl.node.active = false;
            AlienCtrl.mainController.endLineExplode();
            AlienCtrl.mainController.alienEnterEndLine();
        }
    },

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    update(dt) {
        let AlienCtrl = this;
        AlienCtrl.node.y -= dt * 100;
    },
});
