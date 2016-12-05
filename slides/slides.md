# 小朋友下樓梯

---

# 簡報下載
## [https://hackmd.io/p/ry7alWXGx](https://hackmd.io/p/ry7alWXGx)

---

# 皮卡丘

---

# Phaser
![](https://i.imgur.com/5mXdMEX.png)

---

# Fork 程式碼

1. 登入[codepn](http://codepen.io/)
2. [打開連結](http://codepen.io/pikapika/full/bBLMOX?editors=1010)
2. 按右上方的Fork按鈕複製到自己的專案下

---

# 創造 Phaser

創造長 ==400== 寬 ==400== 的遊戲畫面，Phaser.AUTO 表示使用預設的繪圖方式，"game" 是告訴 Phaser 遊戲要放置在網頁的那個部分

```javascript=
var game = new Phaser.Game(400, 400, Phaser.AUTO, "game",
    { preload: preload, create: create, update: update });
```

---

# 遊戲架構

**preload**
載入遊戲素材，例如圖片、聲音

**create**
遊戲一開始前初始化動作，只會執行一次

**update**
在遊戲進行中，會不斷的被執行

---

# 想想看
1. 創造場景和遊戲主角的程式要寫在那個函式？
1. 玩家死掉後會顯示 gameOver 的圖片，這張圖片的創造的動作應該寫在？
2. 當我按下空白鍵時要射出子彈，偵測是否按下並執行攻擊的程式寫在？
4. 子彈的移動這個動作應該寫在？
3. 判斷子彈是否撞到敵人，判斷碰撞的這個動作應該放在？
6. 主角每打死一隻敵人後會生出新的敵人，創造敵人這個動作應該寫在？

---

# preload

baseURL 是載入的網址
http://s.ntustcoding.club/ns-shaft-workshop/player.png
並將這張圖片命名為 player

```javascript=
game.load.baseURL = 'http://crossorigin.me/http://s.ntustcoding.club/ns-shaft-workshop/';
game.load.crossOrigin = 'anonymous';
game.load.spritesheet('player', 'player.png', 32, 32);
```

---

# spriteSheet

spritesheet 和 image 的差異，就是一個圖片檔包含很多個要用到的 sprite，這樣的做法有助於繪圖上的效能和儲存空間

[spritesheet](http://s.ntustcoding.club/ns-shaft-workshop/player.png) vs [image](http://s.ntustcoding.club/ns-shaft-workshop/normal.png)

```javascript=
game.load.spritesheet('player', '/assets/player.png', 32, 48);
game.load.image('block', '/assets/block.png');
```

---

# 創造 Sprite

遊戲精靈，在遊戲中任何的東西都可以稱為 sprite
我們先用以下語法創造出主角
game.add.sprite( x座標, y座標, 圖片 );

```javascript=
player = game.add.sprite(200, 200, 'player');
```

---

# 掛載物理引擎

幫 player 加上物理引擎的功能，例如移動、碰撞等，但如果你只是想顯示一張圖片例如背景圖，在遊戲中不需要互動就不用掛載物理引擎

```javascript=
player = game.add.sprite(200, 200, 'player');
game.physics.arcade.enable(player);
```

---

# 座標

---

# 座標點
矩形的圖片的座標點是左上角

---

# Sprite 座標屬性


取得 sprite 的當前位置
```javascript=
var x = player.body.x;
var y = player.body.y;
// 印出 x,y
console.log(x, y);
```

設定 sprite 的座標
```javascript=
player.body.x = 100;
player.body.y = 100;
```

---

# 移動

每執行一次 update，就讓x座標加上 1

```javascript=
player.body.x += 1;
```

---

# 設定速度
設定角色的速度每秒移動X距離60

```javascript=
player.body.velocity.x = 60;
```

---

# 鍵盤事件

創造鍵盤

```javascript=
keyboard = game.input.keyboard.addKeys({
    'up': Phaser.Keyboard.UP,
    'down': Phaser.Keyboard.DOWN,
    'left': Phaser.Keyboard.LEFT,
    'right': Phaser.Keyboard.RIGHT
});
```

判斷某個鍵是否被按下

```javascript=
if(keyboard.left.isDown) {
	// 當左方向鍵按下時執行的動作...
}
if(keyboard.right.isDown) {
	// 當右方向鍵按下時執行的動作...
}
```

---

# 任務1

* 按上下左右鍵時角色會移動
* 放開按鍵時角色停止

if/else 語法提示

:point_right: [任務目標](http://codepen.io/pikapika/full/GNQdOB/)

---

# spritesheet 後面的兩個參數

這裡放圖片網址
提醒看網頁上的圖片長寬

---

# spritesheet 用法

裁切的參數 長 寬
frame 編號

---


# 影格動畫

以下語法幫 sprite 設定動畫
player.animations.add(動作名字, 影格, 每秒幀數)

```javascript=
player.animations.add('left', [0, 1, 2, 3], 6);
player.animations.add('right', [9, 10, 11, 12], 6);
```

播放動畫

```javascript=
player.animations.play('right');
```

---

# 任務2

* 向左或向右移動時，播放相對應的動畫

:point_right:[任務目標](http://codepen.io/pikapika/full/pNaVOJ)

---

# 設定外觀

```javascript
player.frame = 1;
```

---

# 任務3

* 不移動時角色要正面站立

[任務示範](http://codepen.io/pikapika/full/LbQmJe)

---

# 函式

作用域是什麼？

```javascript=
var a = 10;

function test1 () {
    var a = 100;
    alert(a);
}

function test2 () {
    alert(a);
}
```

---

# 任務4

* 增加左右兩邊的牆壁和上面的釘子

:point_right:[任務目標](http://codepen.io/pikapika/full/GNQdXw)

---

# 設定牆壁的屬性

啟用物理引擎，並將牆壁設定為固定，可以嘗試看看設為 false 時會如何

```javascript=
leftWall = game.add.sprite(0, 0, 'wall');
game.physics.arcade.enable(leftWall);
leftWall.body.immovable = true;
```

---

# 碰撞
接受陣列做為參數，這樣會同時檢查玩家是否與左牆或右牆碰撞
```javascript=
game.physics.arcade.collide(player, [leftWall, rightWall]);
```

---

# 任務5

* 讓牆壁有阻擋功能

:point_right:[任務目標](http://codepen.io/pikapika/full/BQYxOE)


---

# 掉落

改變角色的速率，實現加速度的方法
```javascript=
player.body.velocity.y += 30;
```

改用設定玩家的引力屬性，原理和上面的做法相似
sprite.body.gravity 可以設定施加在角色身上的引力
```javascript=
player.body.gravity.y = 500;
```

---

# 任務 6

* 設定角色的引力，會向下墜落
* 創要一個平台，角色踩在平台上會停住

:point_right:[任務目標](http://codepen.io/pikapika/full/ZBroqO)

---

# 平台的移動

平台被設定為固定，因此不能用 velocity 屬性，但可以直接在 update 裡改變座標

---

# 任務7

* 平台會向上移動

:point_right:[任務目標](http://codepen.io/pikapika/full/rWJvqW)

---

# 陣列

基於平台是不斷生成和消失，因此不能分別各自用變數去存放平台，必須改用陣列

陣列語法溫習 push
```javascript=
var platforms = [];
var platform game.add.sprite(0, 0, 'normal');
platforms.push(platform);
```

---

# 任務8

* 創造三個平台
* 改用陣列存放平台
* 使用迴圈去更新陣列裡每個平台位置

:point_right:[任務目標](http://codepen.io/pikapika/full/dOdegm)

---

# 時間


Phaser 自帶時間計時方便我們取得，使用
==Phaser.time.now== 便可以取得遊戲開始後的時間(單位是毫秒ms)
```javascript=
var now = Phaser.time.now;
console.log(now);
```

---

# 任務9

* 每隔一段時間(600ms)創造新的平台

:point_right:[任務目標](http://codepen.io/pikapika/full/GNQdYw)

---

# 移除平台

Sprite.destroy
Array.splice

---

# 隨機數

執行 Math.random() 會產生0~1的隨機數字，再乘上 100 就是 0~100 的隨機數字
```javascript=
var rand = Math.random()*100;
```

---

# 任務10

* 隨機產生平台的位置

[任務示範](http://codepen.io/pikapika/full/QGQrJW)

---

# 挑戰題
* 完成角色的所有動畫
* 左走、右走、往左掉、往右掉、往下掉

---

# 任務11

1. 隨機產生不同的平台

:point_right:[任務目標](http://codepen.io/pikapika/full/yVKNbg)

---

# 碰撞時執行函式

第三個參數 effect 是碰撞時執行的函式
```javascript=
this.physics.arcade.collide(player, platforms, effect);
```

定義effect，傳入的參數是碰撞的兩個 sprite
```javascript=
function effect(player, platform) {
    // do something...
}
```

platform.key 會是 sprite 傳入圖片的名字

---

# 任務12

碰撞上平台時印出碰撞到的平台種類
console在左下角打開

:point_right:[任務目標](http://codepen.io/pikapika/pen/dOmoWg)

---

# 持續播放動畫

第四個參數為 true 時，動畫會不停播放
```javascript=
platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
```

---

# 任務13

* 完成傳送帶的動畫

:point_right:[任務目標](http://codepen.io/pikapika/full/mOxJmg)

---

# 任務14

* 實作傳送帶的功能

:point_right:[任務目標](http://codepen.io/pikapika/full/NbYqgG)

---

# 任務15

* 完成彈簧墊的功能

:point_right:[任務目標](http://codepen.io/pikapika/full/xRWGrj)

---


# 物件

創造物件player，擁有兩個屬性分別是name, life，各自的值是"pikachu", 10
讀取物件的值只要使用點加上屬性名就可以取得
```javascript=
var player = {
    name: "pikachu",
    life: 10
}
alert(player.name);
```

動態增加屬性和給予值
```javascript=
var player = {}
player.life = 10;
player.name = "player1";
```

---

# player 增加屬性

life 用來存放玩家的生命
onTouch 用來存放碰撞的物體，用來防止重複觸法事件
unbeatableTime 角色進入無敵狀態的時間

```javascript=
player.life = 10;
player.touchOn = undefined;
player.unbeatableTime = 0;
```

---

# 文字

創造文字物件
game.add.text(x座標, y座標, 文字內容);
```javascript=
text = game.add.text(10, 10, "");
```
動態修改文字的內容
```javascript=
text.setText("這裡放文字");
```

---

# 任務16

* 顯示玩家血量

:point_right:[任務目標](http://codepen.io/pikapika/full/YpaXQB)

---

# 任務17

* 實作釘子功能，玩家踩上去只會一次扣血

point_right:[任務目標](http://codepen.io/pikapika/full/QGmbME)

---

# 平台碰撞邊界

修改圖片碰撞的邊界
==sprite.body.setSize(長, 寬, x座標, y座標);==
```javascript=
platform.body.setSize(96, 15, 0, 15);
```

---

# 任務18

* 實作普通平台的功能，玩家踩上去會加血
* 限制加血上限是 10

:point_right:[任務目標](http://codepen.io/pikapika/full/LbdVjJ)

---

# 解決側邊跟下面碰撞

取消左邊、右邊、下邊的碰撞
增加以下語法接到創造 platform 程式後面，這樣彈跳時就不會撞到上面的平台
```javascript=
platform.body.checkCollision.down = false;
platform.body.checkCollision.left = false;
platform.body.checkCollision.right = false;
```

---

# 移除平台的碰撞

```javascript=
setTimeout(function() {
    // do something...
}, 100);
```

---

# 任務19

* 實作翻轉的平台功能

:point_right:[任務目標](http://codepen.io/pikapika/full/bBvdoV)

---

# 任務20

天花板扣血

提示：game.time.now, player.unbeatableTime

point_right:[任務目標](http://codepen.io/pikapika/full/zoWGEp)

---

# 任務21

* 判斷玩家是否死亡
* 玩家死亡時停止遊戲，並顯示 gameOver

:point_right:[任務目標](http://codepen.io/pikapika/full/oYqXGa)

---

# 背景閃爍

---

# 音效

---

# 完成所有功能

* 設計重新開始
