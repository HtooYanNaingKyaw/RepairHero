cc.Class({
    extends: cc.Component,

    properties: {
        startPointPrefab: {
            default : null,
            type : cc.Prefab,
        },

        StartPointLayout: {
            default : null,
            type : cc.Node,
        },

        gatePrefab: {
            default : null,
            type : cc.Prefab,
        },

        gateLayout: {
            default : null,
            type : cc.Node,
        },
        character: {
            default: null,
            type: cc.Node,
        },

        gateProgressLayout: {
            default: null,
            type: cc.Node,
        },

        firstGateProgressBar: {
            default: null,
            type: cc.Node,
        },

        secondGateProgressBar: {
            default: null,
            type: cc.Node,
        },

        thirdGateProgressBar: {
            default: null,
            type: cc.Node,
        },

        repairWarningFirst: {
            default: null,
            type: cc.Node,
        },

        repairWarningSecond: {
            default: null,
            type: cc.Node,
        },

        repairWarningThird: {
            default: null,
            type: cc.Node,
        },

        characterRepairSprite: {
            default: null,
            type: cc.SpriteFrame,
        },


        characterStaySprite: {
            default: null,
            type: cc.SpriteFrame,
        },

        hitPointBar: {
            default: null,
            type: cc.ProgressBar,
        },

        gameOverNode: {
            default: null,
            type: cc.Node,
        },

        highScoreLabel: {
            default: null,
            type: cc.Label,
        },

        audioBGNode: {
            default: null,
            type: cc.Node,
        },

        inGameHighScoreLabel: {
            default: null,
            type: cc.Label,
        },

        characterSprite: {
            default: null,
            type: cc.Sprite,
        },

        fireNode: {
            default: null,
            type: cc.Node,
        },

        firstGateExplode: {
            default: null,
            type : cc.Node,
        },
        secondGateExplode: {
            default: null,
            type : cc.Node,
        },
        thirdGateExplode: {
            default: null,
            type : cc.Node,
        },

        endLine: {
            default: null,
            type : cc.Node,
        },


        _highScore: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let MainCtrl = this;
        MainCtrl.placeStartPoints();
        MainCtrl.placeGates();
        MainCtrl.gameOverNode.active = false;
        MainCtrl.hitPointBar.progress = 1;
        MainCtrl.audioBGNode.getComponent("audioController").playBackgroundMusic();
        MainCtrl.characterAnimation();
        MainCtrl.firstGateAnim = MainCtrl.firstGateExplode.getComponent(cc.Animation);
        MainCtrl.secondGateAnim = MainCtrl.secondGateExplode.getComponent(cc.Animation);
        MainCtrl.thirdGateAnim = MainCtrl.thirdGateExplode.getComponent(cc.Animation);
        MainCtrl.endLineAnim = MainCtrl.endLine.getComponent(cc.Animation);
    },
    start () {

    },


    placeStartPoints(){
        let MainCtrl = this;
        for (let i = 0; i < 3; i++){
            let startPointNode = cc.instantiate(MainCtrl.startPointPrefab);
            let startPointCtrl = startPointNode.getComponent("startpointController");
            startPointCtrl.linkWithMainController(MainCtrl);
            if (i == 0){
                startPointNode.x = -180;
                startPointNode.y = -100;
            } else if (i == 1) {
                startPointNode.x = 0;
                startPointNode.y = -100;
            } else {
                startPointNode.x = 180;
                startPointNode.y = -100;
            }
            MainCtrl.StartPointLayout.addChild(startPointNode);
        }
    },

    placeGates(){
        let MainCtrl = this;
        for (let i = 0; i < 3; i++){
            let gateNode = cc.instantiate(MainCtrl.gatePrefab);
            gateNode.getComponent("wallController").linkWithMainController(i, MainCtrl);
            if (i == 0){
                gateNode.x = -186;
                gateNode.y = 25;
            } else if (i == 1) {
                gateNode.x = 1;
                gateNode.y = 25;
            } else {
                gateNode.x = 187;
                gateNode.y = 25;
            }
            MainCtrl.gateLayout.addChild(gateNode);
        }
    },
    
    repairWallProgress(wallId){
        let MainCtrl = this;
        MainCtrl.wallId = wallId;
        cc.log(wallId);
        if (wallId == 0){
            MainCtrl.firstGateProgressBar.active = true;
            MainCtrl.firstGateProgressBar.getComponent(cc.Animation).play("progressAnimation");
       
        } else if (wallId == 1){
            MainCtrl.secondGateProgressBar.active = true;
            MainCtrl.secondGateProgressBar.getComponent(cc.Animation).play("progressAnimation");

        } else {
            MainCtrl.thirdGateProgressBar.active = true;
            MainCtrl.thirdGateProgressBar.getComponent(cc.Animation).play("progressAnimation");
    
        }
    },

    repairWall(event, wallId){
        let MainCtrl = this;
        MainCtrl.wallId = wallId;
        cc.log("call")
        MainCtrl.gateLayout.children[parseInt(MainCtrl.wallId) - 1].getComponent("wallController").repairWall();
    },



    onClickHammerButton() {
        let MainCtrl = this;
        MainCtrl._repairType = "Hammer";
        
    },

    onClickWrenchButton() {
        let MainCtrl = this;
        MainCtrl._repairType = "Wrench";
    },

    onClickEnergyButton() {
        let MainCtrl = this;
        MainCtrl._repairType = "Energy";
    },

    moveCharacter(position){
        let MainCtrl = this;  
        MainCtrl.characterSprite.spriteFrame = MainCtrl.characterStaySprite;
        MainCtrl.fireNode.active = true;
        let mainCtrlPositionX = MainCtrl.character.position.x;
        let targetPositionX = position.x;
        if (mainCtrlPositionX < targetPositionX){
            MainCtrl.character.scaleX = 1;
        } else if(mainCtrlPositionX > targetPositionX){
            MainCtrl.character.scaleX = -1;
        }
        let moveTo = cc.moveTo(0.5, position);
        MainCtrl.character.runAction(moveTo);
        MainCtrl.scheduleOnce(MainCtrl.changeCharacterSprite, 0.5);
    },

    changeCharacterSprite() {
        let MainCtrl = this;
        MainCtrl.characterSprite.spriteFrame = MainCtrl.characterRepairSprite;
        MainCtrl.fireNode.active = false;
    },

    showRepairWall(wallId){
        let MainCtrl = this;
        if (wallId == 0) {
            MainCtrl.repairWarningFirst.active = true;
        } else if (wallId == 1) {
            MainCtrl.repairWarningSecond.active = true;
        } else {
            MainCtrl.repairWarningThird.active = true; 
        }
    },

    hideWarning(wallId){
        let MainCtrl = this;
        if (wallId == 0) {
            MainCtrl.repairWarningFirst.active = false;
        } else if (wallId == 1) {
            MainCtrl.repairWarningSecond.active = false;
        } else {
            MainCtrl.repairWarningThird.active = false;
        }
    },

    hideProgressBar(wallId){
        let MainCtrl = this;
        if (wallId == 0) {
            MainCtrl.firstGateProgressBar.active = false;
        } else if (wallId == 1) {
            MainCtrl.secondGateProgressBar.active = false;
        } else {
            MainCtrl.thirdGateProgressBar.active = false;
        }
    },

    alienEnterEndLine(){
        let MainCtrl = this;
        MainCtrl.hitPointBar.progress = MainCtrl.hitPointBar.progress -= 0.1;
        cc.log(MainCtrl.hitPointBar.progress)
        if (MainCtrl.hitPointBar.progress < 0.1){
            MainCtrl.gameOverNode.active = true;
            MainCtrl.highScoreLabel.string = "High Score : " + MainCtrl._highScore;
            MainCtrl.gameLose();
        }
    },

    addHighScore(){
        let MainCtrl = this;
        MainCtrl.inGameHighScoreLabel.string = MainCtrl._highScore;
    },

    goToMainMenu (){
        cc.director.loadScene("mainMenuScene");
    },

    characterAnimation(){
        let self = this;
        let f1 = cc.fadeIn(0.1);
        let delay = cc.delayTime(0.25);
        let f2 = cc.fadeOut(0.5);
        let fSeq = cc.repeatForever(
            cc.sequence(f1, delay, f2)
        );
        self.fireNode.runAction(fSeq);
    },

    gateExpolde(wallId){
        let MainCtrl = this;
        if (wallId == 0){
            MainCtrl.firstGateAnim.play();
        } else if (wallId == 1) {
            MainCtrl.secondGateAnim.play();
        } else {
            MainCtrl.thirdGateAnim.play();
        }
    },

    gameLose(){
        let MainCtrl = this;
        MainCtrl.StartPointLayout.removeAllChildren();
    },

    endLineExplode(){
        let MainCtrl = this;
        MainCtrl.endLineAnim.play();
    },

    // update (dt) {},
});
