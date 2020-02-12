cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    linkWithMainController(wallId ,mainController){
        let WallCtrl = this;
        WallCtrl.wallId = wallId;
        WallCtrl.mainController = mainController;
    },

    onLoad() {
        let WallCtrl = this;
        WallCtrl.hitPoint = 6;
        WallCtrl.collider = WallCtrl.node.getComponent(cc.Collider);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start() {

    },

    repairWall() {
        let WallCtrl = this;
        if (WallCtrl.mainController._repairType == "Hammer"){
            WallCtrl.mainController.hideWarning(WallCtrl.wallId );
            WallCtrl.mainController.repairWallProgress(WallCtrl.wallId);
            WallCtrl.mainController.moveCharacter(WallCtrl.node.position);
            WallCtrl.mainController.showRepairWall(WallCtrl.wallId);
            WallCtrl.mainController._repairType == "";
            WallCtrl.scheduleOnce(WallCtrl.repairWallAndBuild, 2);
        }
       
    },

    repairWallAndBuild(){
        let WallCtrl = this;
        WallCtrl.hitPoint = 3;
        WallCtrl.node.opacity = 255;
        WallCtrl.collider.enabled = true;
        WallCtrl.mainController.hideProgressBar(WallCtrl.wallId);
    },

    onCollisionEnter: function (other, self) {
        let WallCtrl = this;
        WallCtrl.hitPoint -= 1;
        WallCtrl.mainController.gateExpolde(WallCtrl.wallId);
        if (WallCtrl.hitPoint == 0) {
            WallCtrl.node.opacity = 0;
            WallCtrl.collider.enabled = false;
            WallCtrl.mainController.showRepairWall(WallCtrl.wallId);
        }
    },


    // update (dt) {},
});
