
var HelloWorldLayer = cc.Layer.extend({
    danh: [],
    size: null,
    self: null,
    cards: [],
    backFaceCards: [],
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        // var cards = [];
        size = cc.winSize;
        var srcCard = [];
        var srcBai = ["res/Bai_bich_", "res/Bai_nhep_", "res/Bai_co_", "res/Bai_ro_"];
        var suffix = ".png";
        var randomSo;

        this.sprite = new cc.Sprite(res.Table_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.sprite, 0);

        var startCard = new cc.Sprite(res.BackFaceCard_png);
        startCard.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        startCard.setTag(1);
        this.addChild(startCard, 1);

        // var startCard = new ccui.Button();
        // startCard.setTouchEnabled(true);
        // startCard.loadTextures(res.BackFaceCard_png, res.BackFaceCard_png, "");
        // startCard.setPosition(cc.p(size.width / 2, size.height / 2));
        // startCard.addTouchEventListener(this.touchEvent, this);
        // this.addChild(startCard, 1);

        for (var i = 0; i <= 51; i++) {
            randomSo = Math.floor(Math.random() * 53);
            while (randomSo == 0) {
                randomSo = Math.floor(Math.random() * 53);
            }
            var tempLink;
            if(randomSo >= 1 && randomSo <= 13) {
                if(randomSo <= 9) {
                    var zero = "0";
                    tempLink = srcBai[0] + zero + randomSo + suffix;
                } else {
                    tempLink = srcBai[0] + randomSo + suffix;
                }
            } else if (randomSo >= 14 && randomSo <= 26){
                tempLink = srcBai[1] + randomSo + suffix;
            } else if (randomSo >= 27 && randomSo <= 39) {
                tempLink = srcBai[2] + randomSo + suffix;
            } else if (randomSo >= 40 && randomSo <= 52) {
                tempLink = srcBai[3] + randomSo + suffix;
            }
            srcCard.push(tempLink);
            if (i > 0) {
                for (var j = 0; j < i; j++) {
                    if (srcCard[i] == srcCard[j]) {
                        randomSo = Math.floor(Math.random() * 53);
                        while (randomSo == 0) {
                            randomSo = Math.floor(Math.random() * 53);
                        }
                        if (randomSo >= 1 && randomSo <= 13) {
                            if (randomSo <= 9) {
                                var zero = "0";
                                srcCard[i] = srcBai[0] + zero + randomSo + suffix;
                            } else {
                                srcCard[i] = srcBai[0] + randomSo + suffix;
                            }
                        } else if (randomSo >= 14 && randomSo <= 26) {
                            srcCard[i] = srcBai[1] + randomSo + suffix;
                        } else if (randomSo >= 27 && randomSo <= 39) {
                            srcCard[i] = srcBai[2] + randomSo + suffix;
                        } else if (randomSo >= 40 && randomSo <= 52) {
                            srcCard[i] = srcBai[3] + randomSo + suffix;
                        }
                        j = 0;
                    }
                }
            }
            if(i%4 == 3){
                var tempCard = new cc.Sprite(srcCard[i]);
                tempCard.attr({
                    x: 350 + (50 * Math.floor(i/4)),
                    y: 150,
                });
                this.addChild(tempCard, i+100);
                tempCard.setOpacity(0);
                // tempCard.setFlippedX(true);
                // tempCard.setVisible(false);
                this.cards.push(tempCard);
                // this.cards[this.cards.length - 1].setOpacity(0);
            }
            var temp = new cc.Sprite(res.BackFaceCard_png);
            temp.attr({
                x: size.width / 2,
                y: size.height / 2,
            });
            this.addChild(temp, i);
            temp.setVisible(false);
            temp.setTag(i + 2);
            this.backFaceCards.push(temp);
        }
        // this.bg_black = new ccui.ImageView('res/black.png', ccui.Widget.LOCAL_TEXTURE);
        // this.addChild(this.bg_black, 1000);
        // this.bg_black.cname = 'bg_black';
        // this.bg_black.x = cc.winSize.width / 2;
        // this.bg_black.y = cc.winSize.height / 2;

        self = this;
        if (cc.sys.capabilities.hasOwnProperty('mouse')) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,

                onMouseDown: function (event) {
                    var n = Math.floor(event.getLocationX());
                    var m = Math.floor(event.getLocationY());
                    var x = startCard.getContentSize().height;
                    var y = startCard.getContentSize().width;
                    var k = startCard.getPosition().x;
                    var l = startCard.getPosition().y;

                    if (n >= k - (y * 0.5) && n <= k + (y * 0.5) && m >= l - (x * 0.5) && m <= l + (x * 0.5)) {
                        self.removeChildByTag(1, true);
                        var dTime = 0;
                        for (var i = 0; i < 52; i++) {
                            dTime += 0.01;
                            if(i%4 == 3) {
                                var delay1 = new cc.DelayTime(dTime + 0.01);
                                var delay = new cc.DelayTime(dTime);
                                var action = new cc.FadeIn.create(0.01);
                                var sequence = new cc.Sequence(delay1, action);
                                self.cards[Math.floor(i/4)].runAction(sequence);

                                var fadeOut = new cc.FadeOut.create(0.01);
                                var sprite_action = cc.MoveTo.create(0.1, cc.p(350 + 50 * Math.floor(i/4), 150));
                                var sequenceBackFace = new cc.Sequence(delay, sprite_action, fadeOut);
                                self.backFaceCards[51-i].setVisible(true);
                                self.backFaceCards[51-i].setScale(2);
                                self.backFaceCards[51-i].runAction(sequenceBackFace);
                            } else if(i%4 == 0) {
                                var delay1 = new cc.DelayTime(dTime + 0.01);
                                var delay = new cc.DelayTime(dTime);
                                var sprite_action = cc.MoveTo.create(0.1, cc.p(size.width - 125, size.height/2));
                                var action = new cc.FadeOut.create(0.01);
                                var sequenceBackFace = new cc.Sequence(delay1, sprite_action, action);
                                self.backFaceCards[51-i].setVisible(true);
                                self.backFaceCards[51-i].setScale(2);
                                self.backFaceCards[51-i].runAction(sequenceBackFace);

                                var temp = new cc.Sprite(res.BackFaceCard_png);
                                temp.attr({
                                    x: size.width - 125,
                                    y: size.height / 2,
                                });
                                self.addChild(temp, 0);
                            } else if (i % 4 == 1) {
                                var delay1 = new cc.DelayTime(dTime + 0.01);
                                var delay = new cc.DelayTime(dTime);
                                var sprite_action = cc.MoveTo.create(0.1, cc.p(size.width / 2, size.height - 100));
                                var action = new cc.FadeOut.create(0.01);
                                var sequenceBackFace = new cc.Sequence(delay1, sprite_action, action);
                                self.backFaceCards[51-i].setVisible(true);
                                self.backFaceCards[51-i].setScale(2);
                                self.backFaceCards[51-i].runAction(sequenceBackFace);

                                var temp = new cc.Sprite(res.BackFaceCard_png);
                                temp.attr({
                                    x: size.width / 2,
                                    y: size.height - 100,
                                });
                                self.addChild(temp, 0);
                            } else if (i % 4 == 2) {
                                var delay1 = new cc.DelayTime(dTime + 0.01);
                                var delay = new cc.DelayTime(dTime);
                                var sprite_action = cc.MoveTo.create(0.1, cc.p(125, size.height / 2));
                                var action = new cc.FadeOut.create(0.01);
                                var sequenceBackFace = new cc.Sequence(delay1, sprite_action, action);
                                self.backFaceCards[51-i].setVisible(true);
                                self.backFaceCards[51-i].setScale(2);
                                self.backFaceCards[51-i].runAction(sequenceBackFace);

                                var temp = new cc.Sprite(res.BackFaceCard_png);
                                temp.attr({
                                    x: 125,
                                    y: size.height / 2,
                                });
                                self.addChild(temp, 0);
                            }

                            if(i == 51){
                                var danh_btn = new ccui.Button();
                                danh_btn.setTouchEnabled(true);
                                danh_btn.loadTextures(res.Bt_danh_png, res.Bt_danh_png, "");
                                danh_btn.setPosition(cc.p(size.width - 150, 189));
                                danh_btn.setScale(0.5);
                                danh_btn.addTouchEventListener(self.touchEvent, self);
                                self.addChild(danh_btn, 1);
                            }
                        }
                    }
                }
            }, this);
        }

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    if(target.y == 150) {
                        target.y = 169;
                    }else {
                        target.y = 150;
                    }
                    return true;
                }
                return false;
            }
            // onTouchMoved: function (touch, event) {
            //     var target = event.getCurrentTarget();
            //     var delta = touch.getDelta();
            //     target.x += delta.x;
            //     target.y += delta.y;
            // },
            // onTouchEnded: function (touch, event) {
            //     var target = event.getCurrentTarget();
            //     cc.log("sprite onTouchesEnded.. ");
            //     target.setOpacity(255);
            //     if (target == sprite2) {
            //         containerForSprite1.setLocalZOrder(100);
            //     } else if (target == sprite1) {
            //         containerForSprite1.setLocalZOrder(0);
            //     }
            // }
        });

        cc.eventManager.addListener(listener1, self.cards[0]);
        for(var j = 1; j < 13; j++){
            cc.eventManager.addListener(listener1.clone(), self.cards[j]);
        }
        // cc.eventManager.addListener(listener1.clone(), sprite3);
        return true;
    },
    touchEvent: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (self.danh.length >= 1) {
                var temp = self.danh.length;
                for (var t = 0; t < temp; t++) {
                    self.danh[temp - t - 1].setOpacity(0);
                    self.danh.pop();
                    console.log("==========");
                }
            }
            var conLai = [];
            for (var i = 0; i < 13; i++) {
                if(self.cards[i].y == 169){
                    self.danh.push(self.cards[i]);
                    self.cards[i].y = size.height / 2 - 150;
                    self.cards[i].setScale(0.5);
                    var sprite_action = cc.MoveBy.create(0.1, cc.p(0, 150));
                    var move_ease_inout = sprite_action.clone().easing(cc.easeElasticInOut(0.1));
                    var sprite_scale = cc.ScaleTo.create(0.1, 1, 1);
                    self.cards[i].runAction(move_ease_inout);
                    self.cards[i].runAction(sprite_scale);
                }
                // else if (self.cards[i].y == size.height / 2){
                //     self.cards[i].setOpacity(0);
                //     self.cards[i].setScale(0);
                // }
                if (self.cards[i].y == 150) {
                    conLai.push(self.cards[i]);
                }
                for(var j = 0; j < conLai.length; j++) {
                    conLai[j].x = size.width / 2 - (conLai.length * 22.5) + (50 * j);
                }
                for(var j = 0; j < self.danh.length; j++){
                    self.danh[j].x = size.width / 2 - (self.danh.length*22.5) + (50*j) + 22.5;
                }
            }
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
