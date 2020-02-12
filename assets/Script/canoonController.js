cc.Class({
    extends: cc.Component,

    properties: {
        ventOne: {
            default: null,
            type: cc.Sprite,
        },

        ventTwo: {
            default: null,
            type: cc.Sprite,
        },

        canoonCover: {
            default: null,
            type: cc.Sprite,
        },

        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },

        noEnergyLeft: {
            default: null,
            type: cc.Node,
        },

        noEnergyRight: {
            default: null,
            type: cc.Node,
        },

        ventOneNode: {
            default: null,
            type: cc.Node,
        },

        ventTwoNode: {
            default: null,
            type: cc.Node,
        },

        _repairType: "",

        repairProgressBar: {
            default: null,
            type: cc.Node,
        },

        hammerSound : {
            default : null,
            type : cc.AudioSource,
        },

        wrenchSound : {
            default : null,
            type : cc.AudioSource,
        },

        energySound : {
            default : null,
            type : cc.AudioSource,
        },

        ringOne : {
            default : null,
            type : cc.ParticleSystem,
        },

        ringTwo : {
            default : null,
            type : cc.ParticleSystem,
        },
    },

    onLoad() {
        let self = this;
        self.repairProgressBar.active = false;
    },

    linkWithMainController(mainController) {
        let self = this;
        self.mainController = mainController;
    },

    _createCanoonProperties(state, i) {
        let self = this;
        self.ventOneBullet = 0;
        self.ventTwoBullet = 0;
        self.cannonState = state;
        self.canoonID = i;
        if (i == 0) {
            self.node.x = -185;
            self.node.y = -270;
        } else if (i == 1) {
            self.node.x = 0;
            self.node.y = -270;
        } else {
            self.node.x = 185;
            self.node.y = -270;
        }
        self.renderOnVentOneState();
        self.renderOnVentTwoState();
    },

    renderOnVentOneState() {
        let self = this;
        if (self.cannonState.ventOne == "Fine") {
            self.ventOneShooting = true;
            let interval = 1;
            let repeat = self.getRandomInt(5, 10);
            self.ventOneCount = repeat;
            let delay = 0.5;
            this.schedule(function () {
                self.spawnBulletVentOne();
            }, interval, repeat, delay);
            self.defaultVentOneCanoonStyle();
        } else if (self.cannonState.ventOne == "Hammer") {
            self.shooting = false;
            self.defaultVentOneCanoonStyle();
            self.ventOneNode.active = false;
        } else if (self.cannonState.ventOne == "Wrench") {
            self.shooting = false;
            self.defaultVentOneCanoonStyle();
            self.ventOneNode.angle = 45;
        } else if (self.cannonState.ventOne == "Energy") {
            self.shooting = false;
            self.defaultVentOneCanoonStyle();
            self.noEnergyLeft.active = true;
        }
    },

    renderOnVentTwoState() {
        let self = this;
        if (self.cannonState.ventTwo == "Fine") {
            self.ventTwoShooting = true;
            let interval = 1;
            let repeat = self.getRandomInt(5, 10);
            self.ventTwoCount = repeat;
            let delay = 1;
            this.schedule(function () {
                self.spawnBulletVentTwo();
            }, interval, repeat, delay);
            self.defaultVentTwoCanoonStyle();
        } else if (self.cannonState.ventTwo == "Hammer") {
            self.ventTwoShooting = false;
            self.defaultVentTwoCanoonStyle();
            self.ventTwoNode.active = false;
        } else if (self.cannonState.ventTwo == "Wrench") {
            self.ventTwoShooting = false;
            self.defaultVentTwoCanoonStyle();
            self.ventTwoNode.angle = -45;
        } else if (self.cannonState.ventTwo == "Energy") {
            self.ventTwoShooting = false;
            self.defaultVentTwoCanoonStyle();
            self.noEnergyRight.active = true;
        }
    },

    defaultVentOneCanoonStyle() {
        let self = this;
        self.noEnergyLeft.active = false;
        self.ventOneNode.active = true;
        self.ventOneNode.angle = 0;
    },

    defaultVentTwoCanoonStyle() {
        let self = this;
        self.noEnergyRight.active = false;
        self.ventTwoNode.active = true;
        self.ventTwoNode.angle = 0;
    },

    spawnBulletVentOne() {
        let self = this;
        let bullet = cc.instantiate(self.bulletPrefab);
        self._createVentOneShaking();
        self.shootingParticle(1);
        bullet.setPosition(0, 60);
        self.ventOne.node.addChild(bullet);
        self.ventOneBullet += 1;
        bullet.getComponent("bulletController").shootingBullet(bullet);

        if (self.ventOneBullet > self.ventOneCount) {
            self.ventOneShooting = false;
            self.ventOneBullet = 0;
            self.ventOneBreak = Math.floor(Math.random() * 3);
            self.checkForNextRenderVentOne();
        }
    },

    spawnBulletVentTwo() {
        let self = this;
        
        let bullet = cc.instantiate(self.bulletPrefab);
        self._createVentTwoShaking();
        self.shootingParticle(2);
        bullet.setPosition(0, 60);
        self.ventTwo.node.addChild(bullet);
        self.ventTwoBullet += 1;
        bullet.getComponent("bulletController").shootingBullet(bullet);

        if (self.ventTwoBullet > self.ventTwoCount) {
            self.ventTwoShooting = false;
            self.ventTwoBullet = 0;
            self.ventTwoBreak = Math.floor(Math.random() * 3);
            self.checkForNextRenderVentTwo();
        }
    },

    _createVentOneShaking() {
        let self = this;
        let action1 = cc.moveTo(0.1, -33, 87);
        let action2 = cc.moveTo(0.1, -33, 82);
        let action3 = cc.moveTo(0.1, -33, 87);
        self.ventOne.node.runAction(cc.sequence(action1, action2, action3));
    },

    _createVentTwoShaking() {
        let self = this;
        let action1 = cc.moveTo(0.1, 33, 87);
        let action2 = cc.moveTo(0.1, 33, 82);
        let action3 = cc.moveTo(0.1, 33, 87);
        self.ventTwo.node.runAction(cc.sequence(action1, action2, action3));
    },

    checkForNextRenderVentOne() {
        let self = this;

        if (self.ventOneShooting) {
            return;
        } else {
            self.changingVentOneState();
        }
    },

    checkForNextRenderVentTwo() {
        let self = this;

        if (self.ventTwoShooting) {
            return;
        } else {
            self.changingVentTwoState();
        }
    },

    changingVentOneState() {
        let self = this;
        if (self.ventOneBreak == 0) {
            self.cannonState.ventOne = "Hammer";
        } else if (self.ventOneBreak == 1) {
            self.cannonState.ventOne = "Wrench";
        } else if (self.ventOneBreak == 2) {
            self.cannonState.ventOne = "Energy";
        }
        self.renderOnVentOneState();
    },

    changingVentTwoState() {
        let self = this;
        if (self.ventTwoBreak == 0) {
            self.cannonState.ventTwo = "Hammer";
        } else if (self.ventTwoBreak == 1) {
            self.cannonState.ventTwo = "Wrench";
        } else if (self.ventTwoBreak == 2) {
            self.cannonState.ventTwo = "Energy";
        }
        self.renderOnVentTwoState();
    },

    onClickVentOne() {
        let self = this;
        if (self.cannonState.ventOne == self.mainController._repairType) {
            if (self.mainController._repairType == "Hammer") {
                self.hammerSound.play();
            } else if (self.mainController._repairType == "Wrench") {
                self.wrenchSound.play();
            } else if (self.mainController._repairType == "Energy") {
                self.energySound.play();
            }
            self.repairProgressBar.active = true;
            self.mainController.moveCharacter(self.node.position);
            self.repairProgressBar.getComponent(cc.Animation).play("progressAnimation");
            self.scheduleOnce(self.repairedVentOne, 2);
        }
    },

    repairedVentOne() {
        let self = this;
        self.repairProgressBar.active = false;
        self.cannonState.ventOne = "Fine";
        self.mainController._repairType = "";
        self.renderOnVentOneState();
    },

    onClickVentTwo() {
        let self = this;
        if (self.cannonState.ventTwo == self.mainController._repairType) {
            if (self.mainController._repairType == "Hammer") {
                self.hammerSound.play();
            } else if (self.mainController._repairType == "Wrench") {
                self.wrenchSound.play();
            } else if (self.mainController._repairType == "Energy") {
                self.energySound.play();
            }
            self.repairProgressBar.active = true;
            self.mainController.moveCharacter(self.node.position);
            self.repairProgressBar.getComponent(cc.Animation).play("progressAnimation");
            self.scheduleOnce(self.repairedVentTwo, 2);
        }
    },

    repairedVentTwo() {
        let self = this;
        self.repairProgressBar.active = false;
        self.cannonState.ventTwo = "Fine";
        self.mainController._repairType = "";
        self.renderOnVentTwoState();
    },

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    shootingParticle(id) {
        let self = this;

        if(id == 1) {
            self.ringOne.resetSystem();
        } else if (id == 2) {
            self.ringTwo.resetSystem();
        }
    },

});