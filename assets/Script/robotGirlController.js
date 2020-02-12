cc.Class({
    extends: cc.Component,

    properties: {
        robotBody: {
            default: null,
            type: cc.Sprite,
        },

        robotBodySPrite: {
            default: [],
            type: cc.SpriteFrame
        },

        angryEmo: {
            default: null,
            type: cc.Node,
        },

        fireNode: {
            default: null,
            type: cc.Node,
        },

        disableLayer: {
            default: null,
            type: cc.Node,
        },
    },

    setupRobotGirl(robotState) {
        let self = this;

        self.rotbotStatus = robotState;
        self.node.setPosition(0, -325);
        if (self.rotbotStatus == "Fine") {
            self.robotBody.spriteFrame = self.robotBodySPrite[0];
            self.angryEmo.active = false;
            let a1 = cc.moveTo(5, 200, self.node.position.y);
            let s1 = cc.scaleTo(0.1, -1, 1);
            let a2 = cc.moveTo(5, -200, self.node.position.y);
            let s2 = cc.scaleTo(0.1, 1, 1);
            let seq = cc.repeatForever(
                cc.sequence(a1, s1, a2, s2)
            );
            self.node.runAction(seq);

            let f1 = cc.fadeIn(0.1);
            let delay = cc.delayTime(0.25);
            let f2 = cc.fadeOut(0.5);
            let fSeq = cc.repeatForever(
                cc.sequence(f1, delay, f2)
            );
            self.fireNode.runAction(fSeq);
        } else if (self.rotbotStatus == "Pouting") {
            self.angryEmo.active = true;
            self.disableLayer.active = true;
            self.robotBody.spriteFrame = self.robotBodySPrite[1];
            self.node.stopAllActions();
            self.node.setPosition(self.node.position.x, self.node.position.y);
        }
    },
});
