cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad() {

    },

    setUpPlayerHP(hp) {
        let self = this;
        self.node.getComponent(cc.ProgressBar).progress = hp;
    },
});
