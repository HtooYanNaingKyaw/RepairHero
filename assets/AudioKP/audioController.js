cc.Class({
    extends: cc.Component,

    properties: {
        bgMusic : {
            default : null,
            type : cc.AudioClip,
        },
    },

    onLoad() {
        
    },

    playBackgroundMusic() {
        let self = this;
        self.bgMusic = cc.audioEngine.play(self.bgMusic, true, 1);
    },

    _stopBackgroundMusic() {    // Stop Rocket Spin Audio
        let self = this;
        cc.audioEngine.stop(self.bgMusic);
    },

    playShootMusic() {
        let self = this;
        cc.audioEngine.play(self.shootMusic, true, 0.1);
    },

    playWrenchMusic() {
        let self = this;
        cc.audioEngine.play(self.wrenchMusic, true, 1);
    },
});
