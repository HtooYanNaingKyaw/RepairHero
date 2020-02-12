let alienState = {
    health: 100,
    level: 1,
    speed: 100,
}

let alienLevelSpwanChance = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
let alienRandomSpeedChance = [20, 20, 30, 30, 40, 40, 40, 60, 70, 100];



cc.Class({
    extends: cc.Component,

    properties: {

        
        alienPrefab: {
            default: null,
            type: cc.Prefab,
        },

    },

    linkWithMainController(mainController){
        let StartPointCtrl = this;
        StartPointCtrl.mainController = mainController;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var StartPointCtrl = this;
     
       

        StartPointCtrl.spwanAlien();


        // console.log() requires firebug    



    },

    

    spwanRandomAlien() {
        let StartPointCtrl = this;
        let alienNode = cc.instantiate(StartPointCtrl.alienPrefab);
        let alienCtrl = alienNode.getComponent("alienController");
        var randomInt = StartPointCtrl.getRandomInt(0, 10);
        var randomSpeed = StartPointCtrl.getRandomInt(0, 10);
        alienCtrl.linkWithMainLayer(StartPointCtrl.mainController);
        alienState.speed = alienRandomSpeedChance[randomSpeed];
        alienState.level = alienLevelSpwanChance[randomInt];
        alienCtrl.spawnAlien(alienState);
        StartPointCtrl.node.addChild(alienNode);

    },

    

    spwanAlien() {
        let StartPointCtrl = this;
        var myFunction = function () {
            StartPointCtrl.spwanRandomAlien();
            var rand = Math.round(Math.random() * (4000 - 2000)) + 1000;
            setTimeout(myFunction, rand);
        }
        myFunction();
    },

    start() {

    },

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomFloat(min, max) {

        return Math.random() * (max - min) + min;
    },

    // update (dt) {},
});
