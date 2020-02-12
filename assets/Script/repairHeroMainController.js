cc.Class({
    extends: cc.Component,

    properties: {
        canoonLayout: {
            default: null,
            type: cc.Node,
        },

        canoonPrefab: {
            default: null,
            type: cc.Prefab,
        },

        robotGirlNode: {
            default: null,
            type: cc.Node,
        },

        healthBar: {
            default: null,
            type: cc.Node,
        },

        _isRendering: false,

        _repairType: "",

        character: {
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

        characterSprite: {
            default: null,
            type: cc.Sprite,
        },

        fireNode: {
            default: null,
            type: cc.Node,
        },
        
        disableLayer:{
            default: null,
            type: cc.Node,
        },

        toPauseButton : {
            default : null,
            type : cc.Node,
        },

        toPauseImages : {
            default : [],
            type : cc.SpriteFrame,
        },

        _isPouting: false,


    },

    onLoad() {
        let MainCtrl = this;
        MainCtrl.gameState = [
            { ventOne: "Fine", ventTwo: "Fine" },
            { ventOne: "Fine", ventTwo: "Fine" },
            { ventOne: "Fine", ventTwo: "Fine" },
            { robotGirl: "Fine" },
            { playerHP: 1 }
        ]
        MainCtrl.disableLayer.active = false;
        MainCtrl._createCanoon();
        MainCtrl.renderRobotGirl();
        MainCtrl.createHealthBar();
        MainCtrl._createRobotGirlPouting();
        MainCtrl.currentGameStatus = "Playing";
        let watchStory = 1;
        cc.sys.localStorage.setItem("watchStory", watchStory);
    },

    _createCanoon() {
        let MainCtrl = this;
        for (let i = 0; i < 3; i++) {
            let canoon = cc.instantiate(MainCtrl.canoonPrefab);
            canoon.getComponent("canoonController")._createCanoonProperties(MainCtrl.gameState[i], i);
            canoon.getComponent("canoonController").linkWithMainController(MainCtrl);
            MainCtrl.canoonLayout.addChild(canoon);
        }
    },

    renderRobotGirl() {
        let MainCtrl = this;
        MainCtrl.robotGirlNode.getComponent("robotGirlController").setupRobotGirl(MainCtrl.gameState[3].robotGirl);
    },

    createHealthBar() {
        let MainCtrl = this;

        MainCtrl.healthBar.getComponent("healthBarController").setUpPlayerHP(MainCtrl.gameState[4].playerHP);
    },

    _createRobotGirlPouting() {
        let MainCtrl = this;
        let randomTime = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        MainCtrl.gameState[3].robotGirl = "Pouting";
        MainCtrl.scheduleOnce(function () {
            MainCtrl.robotGirlNode.getComponent("robotGirlController").setupRobotGirl(MainCtrl.gameState[3].robotGirl);
        }, randomTime);
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

    moveCharacter(position) {
        let MainCtrl = this;
        MainCtrl.characterSprite.spriteFrame = MainCtrl.characterStaySprite;
        MainCtrl.fireNode.active = true;
        let mainCtrlPositionX = MainCtrl.character.position.x;
        let targetPositionX = position.x;
        if (mainCtrlPositionX < targetPositionX) {
            MainCtrl.character.scaleX = 1;
        } else if (mainCtrlPositionX > targetPositionX) {
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

    onClickRobotGirl() {
        let MainCtrl = this;
        if (MainCtrl._repairType == "Wrench") {
            MainCtrl.disableLayer.active = false;
            MainCtrl.gameState[3].robotGirl = "Fine";
            MainCtrl.renderRobotGirl();
            MainCtrl._createRobotGirlPouting();
            MainCtrl._repairType = "";
        }
    },

    onClickToPauseGame() {
        let self = this;
        if (self.currentGameStatus == "Playing") {
            self.currentGameStatus = "Pause";
            self.toPauseButton.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = self.toPauseImages[0];
            self.scheduleOnce(function () {
                cc.game.pause();
            }, 0.1);
        } else if (self.currentGameStatus == "Pause") {
            self.currentGameStatus = "Playing";
            self.toPauseButton.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = self.toPauseImages[1];
            // self.scheduleOnce(function () {
                cc.game.resume();
            // }, 0.1);
        }
    },

    onClickMainMenu (){
        cc.director.loadScene("mainMenuScene");
    },

    onClickTryAgain (){
        cc.director.loadScene("RepairHeroScene");
    },

});