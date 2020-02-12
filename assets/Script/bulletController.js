cc.Class({
    extends: cc.Component,

    properties: {
        shootSound:{
            default: null,
            type: cc.AudioSource,
        },
    },

    onLoad() {
        let manager = cc.director.getCollisionManager();       
        manager.enabled = true;
    },

    shootingBullet() {
        let self = this;
        self.shootSound.play();
        let actionBy = cc.moveTo(1, cc.v2(0, 600));
        let destruction = cc.callFunc(function () {
            self.node.destroy();
        }, this);
        let bulletAction = cc.sequence(actionBy, destruction);
        self.node.runAction(bulletAction);
    },

    onCollisionEnter(other, self) {
            self.node.destroy();
    },
});
