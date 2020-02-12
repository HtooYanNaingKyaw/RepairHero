cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad() {

    },

    onClickPlayButton() {
        let watchStory = cc.sys.localStorage.getItem("watchStory");
        if(watchStory != 1) {
            cc.director.loadScene("StoryScene");
        } else {
            cc.director.loadScene("RepairHeroScene");
        }
    },

    onClickQuitButton() {
        cc.game.end();
    },
});
