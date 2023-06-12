var isLeveloneLock = true;
var isLeveltwoLock = true;
var isLevelthreeLock = true;
var isSeenPassword = false;

// Level 0
import items_0 from './JSON/items_0.json' assert {type: 'json'};
const KEY_0 = 0;

// Level 1
import items_1 from './JSON/items_1.json' assert {type: 'json'};
const KEY_1 = 0;
const KNIFE_1 = 1;
const MESSAGECARD_1 = 2;

// Level 2
import items_2 from './JSON/items_2.json' assert {type: 'json'};
const KEY_2 = 0;
const MESSAGECARD_2 = 1;

// Level 2
import items_3 from './JSON/items_3.json' assert {type: 'json'};
const KEY_3 = 0;
const MESSAGECARD_3 = 1;
const BOTTLE_3 = 2;


class LevelScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create() {
        this.cameras.main.setBackgroundColor('#808080');
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(1120, 0, 1120, 720));
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 180, 1280, 180));
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 360, 1280, 360));
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 540, 1280, 540));
        this.onEnter();
    }

    displayItems(items) {
        for(let i = 0; i < items.length; i++) {
            if(items[i].isOwn) {
                this.add.image(items[i].x, items[i].y, items[i].name);		
            }
        }
    }

    addMessagecard(x, y, name, isOwn, message) {
        if (isOwn) {
            this.add.image(x, y, name)
            .setInteractive()
            .on('pointerdown', () => {
                let m = this.add.image(480, 360, message)
                .setInteractive()
                this.input.on('pointerup', () => {
                    m.destroy();
                });
            });
        }
    }

    update() {
    }

    onEnter() {
    }


}

class UIScene extends Phaser.Scene {
    constructor() {
        super();
    }
	preload() {
        this.load.path = './assets/';
        this.load.audio('music', 'Tchaikovsky_dance_of_the_sugar_plum_fairy.mp3');
    }
    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.add.text(this.w - 3 * this.s, this.h - 3 * this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

		const music = this.sound.add('music', { loop: true });
		music.play();

		this.add.text(this.w - 6 * this.s, this.h - 3 * this.s, "🔊")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
				if (music.volume === 0) {
					music.setVolume(1);
				}
				else {
					music.setVolume(0);
				}
            });
    }
}

class start extends Phaser.Scene {
    constructor() {
        super({ key: 'start' });
    }
    preload() {
        this.load.path = './assets/';
    }
    create() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.add.text(640, 240, "Core Gameplay", { fontSize: 64, color: '#000000' }).setOrigin(0.5);
        this.add.text(640, 480, "Start Screen\nTap the screen to continue", { fontSize: 48, color: '#000000' }).setOrigin(0.5);
        
		this.scene.add('UIScene', UIScene, true);

        this.input.on('pointerup', () => {
            this.cameras.main.fade(1000, 0,0,0);
			this.time.delayedCall(1000, () => this.scene.start('LS'));
        });
        
    }
    update() {

    }
}

class LS extends Phaser.Scene {
	constructor() {
			super('LS');
	}
	preload() {
			this.load.path = './assets/LevelUI/';
			this.load.image('l0u','/Level0_unlocked.png');
			this.load.image('l1l','/Level1_locked.png');
			this.load.image('l1u','/Level1_unlocked.png');
			this.load.image('l2l','/Level2_locked.png');
			this.load.image('l2u','/Level2_unlocked.png');
			this.load.image('l3l','/Level3_locked.png');
			this.load.image('l3u','/Level3_unlocked.png');
            this.load.image('tb','/TitleBackground.png');
	}
	create() {
		for (let i = 0; i < items_0.length; i++) {
			items_0[i].isOwn = false;
		}
		for (let i = 0; i < items_1.length; i++) {
			items_1[i].isOwn = false;
		}
		for (let i = 0; i < items_2.length; i++) {
			items_2[i].isOwn = false;
		}
		for (let i = 0; i < items_3.length; i++) {
			items_3[i].isOwn = false;
		}

        isSeenPassword = false;

        items_3[BOTTLE_3].name = "bottle";

        this.add.image(640, 360, 'tb');

		this.add.image(180, 360, 'l0u')
        .setInteractive()
        .on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
			this.time.delayedCall(1000, () => this.scene.start('L0'));
		});

		if(isLeveloneLock) {
			this.add.image(480, 360, 'l1l')
        }
		else {
            this.add.image(480, 360, 'l1u')
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L1'));
            });
        }

		if(isLeveltwoLock) {
			this.add.image(780, 360, 'l2l')
        }
		else {
            this.add.image(780, 360, 'l2u')
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L2'));
            });
        }

		if(isLevelthreeLock) {
			this.add.image(1080, 360, 'l3l')
        }
		else {
            this.add.image(1080, 360, 'l3u')
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L3'));
            });
        }
        
	}
	update() {
        
	}
}

class L0 extends LevelScene {
    constructor() {
        super('L0');
    }
    preload() {
        this.load.path = './assets/Level0/';
		this.load.image('background','/level0_background.png');
		this.load.image('unlocked_door','/unlockeddoor.png');
		this.load.image('locked_door','/door.png');
		this.load.image('key','/key.png');
		this.load.image('arrow','/arrowUI.png');

        this.load.path = './assets/Sound/';
        this.load.audio('blop_sound', '/blop_sound_effect.mp3');
        this.load.audio('door_open_sound', '/door_open_sound_effect.mp3');
    }
    onEnter() {
        this.add.image(480, 360, 'background');
		let lockedDoor = this.add.image(320, 360, 'locked_door')
			.setInteractive()
            .on('pointerdown', () => {
                if(items_0[KEY_0].isOwn) {
                    this.sound.play('door_open_sound');
					lockedDoor.setTexture('unlocked_door');
					this.cameras.main.fade(1000, 0,0,0);
                    this.time.delayedCall(1000, () => {
						isLeveloneLock = false;
                        this.scene.start('LS');
                    });
				}
            });
		this.add.image(640, 360, 'unlocked_door')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('door_open_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L0_1');
                });
            });
        
		this.displayItems(items_0);
    }
    update() {

    }
}

class L0_1 extends LevelScene {
	constructor() {
		super('L0_1');
	}
	preload() {
		this.load.path = './assets/Level0/';
	}
	onEnter() {
		this.add.image(480, 360, 'background');
		this.add.image(840, 640, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L0');
                });
            });

		if(items_0[KEY_0].isOwn == false) {
			let key = this.add.image(480, 360, items_0[KEY_0].name)
			.setInteractive()
            .on('pointerdown', () => {
                key.destroy();
                this.sound.play('blop_sound');
				this.add.image(items_0[KEY_0].x, items_0[KEY_0].y, items_0[KEY_0].name);
				items_0[KEY_0].isOwn = true;
            });

            this.tweens.add({
                targets: key,
                y: 330,
                duration: 1000,
                ease: 'Linear',
                repeat: -1,
            });
		}	
        
        this.displayItems(items_0);
	}
	update() {
    
	}
}

class L1 extends LevelScene {
    constructor() {
        super('L1');
    }
    preload() {
        this.load.path = './assets/Level1/';
		this.load.image('bedroom','/bedroom.png');
		this.load.image('kitchen','/kitchen.png');
		this.load.image('knife','/knife.png');
		this.load.image('messagecard','/messagecard.png');
		this.load.image('message1','/messagecard-opened.png');
		this.load.image('vase','/vase.png');
        this.load.image('pillow','/pillow.png');
    }
    onEnter() {
        this.add.image(480, 360, 'background');

		this.add.image(240, 360, 'unlocked_door')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('door_open_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L1_1');
                });
            });
		
			let lockedDoor = this.add.image(480, 360, 'locked_door')
			.setInteractive()
            .on('pointerdown', () => {
                if(items_1[KEY_1].isOwn) {
                    this.sound.play('door_open_sound');
					lockedDoor.setTexture('unlocked_door');
					this.cameras.main.fade(1000, 0,0,0);
                    this.time.delayedCall(1000, () => {
						isLeveltwoLock = false;
                        this.scene.start('LS');
                    });
				}
            });

		this.add.image(720, 360, 'unlocked_door')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('door_open_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L1_2');
                });
            });
		
        this.displayItems(items_1);	
        this.addMessagecard(items_1[MESSAGECARD_1].x, 
                            items_1[MESSAGECARD_1].y, 
                            items_1[MESSAGECARD_1].name, 
                            items_1[MESSAGECARD_1].isOwn,
                            'message1');
    }
    update() {

    }
}

class L1_1 extends LevelScene {
    constructor() {
        super('L1_1');
    }
	onEnter() {
		this.add.image(480, 360, 'bedroom');

		this.add.image(840, 640, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L1');
                });
            });

        this.add.image(800, 465, 'vase')
        .setInteractive()
        .on('pointerdown', () => {
            if(items_1[MESSAGECARD_1].isOwn == false) {
                this.sound.play('blop_sound');
                items_1[MESSAGECARD_1].isOwn = true;
        	    this.addMessagecard(items_1[MESSAGECARD_1].x, 
                            	    items_1[MESSAGECARD_1].y, 
                            	    items_1[MESSAGECARD_1].name, 
                            	    items_1[MESSAGECARD_1].isOwn,
                            	    'message1');
            }
        });
		
        this.add.image(102, 450, 'pillow')
        .setInteractive()
        .on('pointerdown', () => {
            if(items_1[KEY_1].isOwn == false && items_1[KNIFE_1].isOwn == true) {
                this.sound.play('blop_sound');
                items_1[KEY_1].isOwn = true;
        	    this.add.image(items_0[KEY_0].x, items_0[KEY_0].y, items_0[KEY_0].name);
            }
        });

        this.displayItems(items_1);
        this.addMessagecard(items_1[MESSAGECARD_1].x, 
                            items_1[MESSAGECARD_1].y, 
                            items_1[MESSAGECARD_1].name, 
                            items_1[MESSAGECARD_1].isOwn,
                            'message1');
	}
}

class L1_2 extends LevelScene {
    constructor() {
        super('L1_2');
    }
	onEnter() {
		this.add.image(480, 360, 'kitchen');

		this.add.image(840, 640, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L1');
                });
            });

		if(items_1[KNIFE_1].isOwn == false) {
			let knife = this.add.image(790, 280, items_1[KNIFE_1].name)
			.setInteractive()
            .on('pointerdown', () => {
                knife.destroy();
                this.sound.play('blop_sound');
				this.add.image(items_1[KNIFE_1].x, items_1[KNIFE_1].y, items_1[KNIFE_1].name);
				items_1[KNIFE_1].isOwn = true;
            });
		}


        this.displayItems(items_1);
        this.addMessagecard(items_1[MESSAGECARD_1].x, 
                            items_1[MESSAGECARD_1].y, 
                            items_1[MESSAGECARD_1].name, 
                            items_1[MESSAGECARD_1].isOwn,
                            'message1');
	}
}

class L2 extends LevelScene {
    constructor() {
        super('L2');
    }
    preload() {
        this.load.path = './assets/Level2/';
		this.load.image('lock','/newlock.png');
		this.load.image('lock_unlocked', '/newlock_unlocked.png');
		this.load.image('studyroom','/studyroom.png');
		this.load.image('table_with_paper','/table_with_paper.png');
		this.load.image('password','/topviewtable.png');
		this.load.image('wardrobe','/wardrobe.png');
        this.load.image('message2','/message2.png');
    }
    onEnter() {
        this.add.image(480, 360, 'background');
        this.add.image(240, 360, 'unlocked_door')
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play('door_open_sound');
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => {
                this.scene.start('L2_1');
            });
        });
    
		let lockedDoor1 = this.add.image(480, 360, 'locked_door')
		.setInteractive()
		.on('pointerdown', () => {
			if (isSeenPassword) {
				let lu = this.add.image(480, 360, 'lock_unlocked')
					.setInteractive()
					.on('pointerdown', () => {
						lu.destroy();
						this.sound.play('door_open_sound');
						lockedDoor1.setTexture('unlocked_door');
						this.cameras.main.fade(1000, 0, 0, 0);
						this.time.delayedCall(1000, () => {
							isLevelthreeLock = false;
							this.scene.start('LS');
						});
					});
			} 
			else {
				let l = this.add.image(480, 360, 'lock')
					.setInteractive()
					.on('pointerdown', () => {
						l.destroy();
					});
			}
		});
	

        let lockedDoor2 = this.add.image(720, 360, 'locked_door')
        .setInteractive()
        .on('pointerdown', () => {
            if(items_2[KEY_2].isOwn) {
                this.sound.play('door_open_sound');
                lockedDoor2.setTexture('unlocked_door');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L2_2');
                });
            }
        });

        this.displayItems(items_2);
        this.addMessagecard(items_2[MESSAGECARD_2].x, 
                            items_2[MESSAGECARD_2].y, 
                            items_2[MESSAGECARD_2].name, 
                            items_2[MESSAGECARD_2].isOwn,
                            'message2');
    }
    update() {

    }
}

class L2_1 extends LevelScene {
    constructor() {
        super('L2_1');
    }

    onEnter() {
        this.add.image(480, 360, 'bedroom');

		this.add.image(840, 640, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L2');
                });
            });

		this.add.image(800, 465, 'vase')
			.setInteractive()
			.on('pointerdown', () => {
				if(items_2[MESSAGECARD_2].isOwn == false) {
					this.sound.play('blop_sound');
					items_2[MESSAGECARD_2].isOwn = true;
					this.addMessagecard(items_2[MESSAGECARD_2].x, 
										items_2[MESSAGECARD_2].y, 
										items_2[MESSAGECARD_2].name, 
										items_2[MESSAGECARD_2].isOwn,
										'message2');
				}
			});
            
        this.add.image(551, 366, 'wardrobe')
            .setInteractive()
            .on('pointerdown', () => {
                if(items_2[KEY_2].isOwn == false) {
                    this.sound.play('blop_sound');
                    items_2[KEY_2].isOwn = true;
                    this.add.image(items_2[KEY_2].x, items_0[KEY_2].y, items_0[KEY_2].name);
                }
            });

        this.displayItems(items_2);
        this.addMessagecard(items_2[MESSAGECARD_2].x, 
                            items_2[MESSAGECARD_2].y, 
                            items_2[MESSAGECARD_2].name, 
                            items_2[MESSAGECARD_2].isOwn,
                            'message2');
    }
}

class L2_2 extends LevelScene {
    constructor() {
        super('L2_2');
    }

    onEnter() {
        this.add.image(480, 360, 'studyroom');

		this.add.image(840, 640, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L2');
                });
            });

        this.add.image(213, 486, 'table_with_paper')
            .setInteractive()
            .on('pointerdown', () => {
                isSeenPassword = true;
                let p = this.add.image(480, 360, 'password')
                .setInteractive()
                .on('pointerdown', () => {
                    p.destroy();
                });
            });

        this.displayItems(items_2);
        this.addMessagecard(items_2[MESSAGECARD_2].x, 
                            items_2[MESSAGECARD_2].y, 
                            items_2[MESSAGECARD_2].name, 
                            items_2[MESSAGECARD_2].isOwn,
                            'message2');
    }
}

class L3 extends LevelScene {
	constructor() {
		super('L3');
	}
	preload() {
		this.load.path = './assets/Level3/';
        this.load.image('bathroom','/bathroom.png');
		this.load.image('lwor', '/lock_without_rust.png');
		this.load.image('lwr','/lock_with_rust.png');
		this.load.image('washbasin','/washbasin.png');
		this.load.image('message3','/message3.png');
		this.load.image('remover','/remover.png');
        this.load.image('bottle','/bottle.png');
        this.load.image('bww','/bottle_with_water.png');
        this.load.image('bwr','/bottle_with_remover.png');
	}
	onEnter() {
		this.add.image(480, 360, 'background');
        
        items_3[KEY_3].isOwn = true;
        items_3[MESSAGECARD_3].isOwn = true;

		this.add.image(240, 360, 'unlocked_door')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('door_open_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L3_1');
                });
            });
		
		let lockedDoor = this.add.image(480, 360, 'locked_door')
		.setInteractive()
		.on('pointerdown', () => {
			if (items_3[BOTTLE_3].name == 'bwr') {
				let lu = this.add.image(480, 360, 'lwor')
					.setInteractive()
					.on('pointerdown', () => {
						lu.destroy();
						this.sound.play('door_open_sound');
						lockedDoor.setTexture('unlocked_door');
						this.cameras.main.fade(1000, 0, 0, 0);
						this.time.delayedCall(1000, () => {
							this.scene.start('LS');
						});
					});
			} 
			else {
				let l = this.add.image(480, 360, 'lwr')
					.setInteractive()
					.on('pointerdown', () => {
						l.destroy();
					});
			}
		});

		this.add.image(720, 360, 'unlocked_door')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('door_open_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L3_2');
                });
            });
		
        this.displayItems(items_3);
        this.addMessagecard(items_3[MESSAGECARD_3].x, 
                            items_3[MESSAGECARD_3].y, 
                            items_3[MESSAGECARD_3].name, 
                            items_3[MESSAGECARD_3].isOwn,
                            'message3');
                                
	}
	update() {
    
	}
}

class L3_1 extends LevelScene {
	constructor() {
		super('L3_1');
	}
    onEnter() {
        this.add.image(480, 360, 'kitchen');
        this.add.image(840, 640, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L3');
                });
            });

        if(items_3[BOTTLE_3].isOwn == false) {
			let bottle = this.add.image(790, 326, items_3[BOTTLE_3].name)
			.setInteractive()
            .on('pointerdown', () => {
                bottle.destroy();
                this.sound.play('blop_sound');
				this.add.image(items_3[BOTTLE_3].x, items_3[BOTTLE_3].y, items_3[BOTTLE_3].name);
				items_3[BOTTLE_3].isOwn = true;
            });
		}

        this.displayItems(items_3);
        this.addMessagecard(items_3[MESSAGECARD_3].x, 
                            items_3[MESSAGECARD_3].y, 
                            items_3[MESSAGECARD_3].name, 
                            items_3[MESSAGECARD_3].isOwn,
                            'message3');
    }
}

class L3_2 extends LevelScene {
	constructor() {
		super('L3_2');
	}
    onEnter() {
        this.add.image(480, 360, 'bathroom');
        this.add.image(840, 640, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L3');
                });
            });
        
        this.add.image(800, 465, 'washbasin')
        .setInteractive()
        .on('pointerdown', () => {
            if(items_3[BOTTLE_3].isOwn == true && items_3[BOTTLE_3].name == "bottle") {
                this.sound.play('blop_sound');
                items_3[BOTTLE_3].name = "bww";
                this.add.image(items_3[BOTTLE_3].x, items_3[BOTTLE_3].y, items_3[BOTTLE_3].name);
            }
        });

        this.add.image(505, 78, 'remover')
        .setInteractive()
        .on('pointerdown', () => {
            if(items_3[BOTTLE_3].isOwn == true && items_3[BOTTLE_3].name == "bww") {
                this.sound.play('blop_sound');
                items_3[BOTTLE_3].name = "bwr";
                this.add.image(items_3[BOTTLE_3].x, items_3[BOTTLE_3].y, items_3[BOTTLE_3].name);
            }
        });

        this.displayItems(items_3);
        this.addMessagecard(items_3[MESSAGECARD_3].x, 
                            items_3[MESSAGECARD_3].y, 
                            items_3[MESSAGECARD_3].name, 
                            items_3[MESSAGECARD_3].isOwn,
                            'message3');
    }
}



let config = {
	type: Phaser.WEBGL,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
	backgroundColor: '#ffffff',
	scene: [start, LS, L0, L0_1, L1, L1_1, L1_2, L2, L2_1, L2_2, L3, L3_1, L3_2]
}

let game = new Phaser.Game(config);