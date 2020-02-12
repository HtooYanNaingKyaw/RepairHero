cc.Class({
    extends: cc.Component,

    properties: {
        robotNode: {
            default: null,
            type: cc.Node,
        },

        robotBody: {
            default: null,
            type: cc.Sprite,
        },

        robotBodySprites: {
            default: [],
            type: cc.SpriteFrame,
        },

        fireNode: {
            default: null,
            type: cc.Node,
        },

        angryEmo: {
            default: null,
            type: cc.Node,
        },

        textOne: {
            default: null,
            type: cc.Node,
        },

        textTwo: {
            default: null,
            type: cc.Node,
        },

        engineer: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad() {
        let self = this;
        self.moveRobotGirl();
    },

    moveRobotGirl() {
        let self = this;
        self.robotBody.spriteFrame = self.robotBodySprites[0];
        self.angryEmo.active = false;
        let a1 = cc.moveTo(2, -145, -150);
        self.robotNode.runAction(a1);

        let f1 = cc.fadeIn(0.1);
        let delay = cc.delayTime(0.25);
        let f2 = cc.fadeOut(0.5);
        let fSeq = cc.repeatForever(
            cc.sequence(f1, delay, f2)
        );
        self.fireNode.runAction(fSeq);
       
        self.scheduleOnce(function() {
            self.moveTextOne();
        }, 2);
    },

    moveTextOne() {
        let self = this;
        let a1 = cc.moveTo(2, 0, 0);
        self.textOne.runAction(a1);
    },

    onClickHeroes() {
        let self = this;
        self.textOne.active = false;
        self.lastPartOfStory();
    },

    changeRobotGirlSprite() {
        let self = this;
        self.robotBody.spriteFrame = self.robotBodySprites[1];
        self.angryEmo.active = true;
    },

    moveTextTwo() {
        let self = this;
        let a1 = cc.moveTo(2, 0, 36);
        self.textTwo.runAction(a1);
    },

    moveEngineer() {
        let self = this;
        let a1 = cc.moveTo(2, 175, -150);
        self.engineer.runAction(a1);
    },
 
    lastPartOfStory() {
        let self = this;
        self.moveTextTwo();
        self.moveEngineer();
        self.scheduleOnce(function() {
            self.changeRobotGirlSprite();
        }, 3); 
    },
 
    onClickGoToGame() {
        cc.director.loadScene("RepairHeroScene");
    },
});
