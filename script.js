    //vytvořn canvas dokumentu
    const canvas=document.querySelector('canvas');
    //vyvoření světa ve 2d
    const c = canvas.getContext('2d');

    //16:9
    canvas.width= 64 * 16; //1024
    canvas.height=64 * 9; // 576


    let parsedCollisions
    let collisionBlocks
    let background
    let doors 
    const player = new Player({
        imageSrc: './img/king/idle.png',
        frameRate: 11,
        animations: {
            idleRight:{
                frameRate: 11,
                frameBuffer: 2,
                loop: true,
                imageSrc: './img/king/idle.png',
            },
            idleLeft:{
                frameRate: 11,
                frameBuffer: 2,
                loop: true,
                imageSrc: './img/king/idleLeft.png',
            },
            runRight:{
                frameRate: 8,
                frameBuffer: 4,
                loop: true,
                imageSrc: './img/king/runRight.png',
            },
            runLeft:{
                frameRate: 8,
                frameBuffer: 4,
                loop: true,
                imageSrc: './img/king/runLeft.png',
            },
            enterDoor:{
                frameRate: 8,
                frameBuffer: 4,
                loop: false,
                imageSrc: './img/king/enterDoor.png',
                onComplete: () =>{
                    console.log('completed')
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level++

                            if(level ===4) level = 1
                            levels[level].init()
                            player.switchSprite('idleRight')
                            player.preventInput = false
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
                },
            }
        }
    });


    let level = 1
    let levels = {
        1: {
            init: ()=>{
                parsedCollisions = collisionLevel1.parse2D()
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                player.collisionBlocks = collisionBlocks

                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel1.png' ,
                })

                doors = [
                    new Sprite ({
                        position: {
                            x: 767,
                            y: 385-112,
                        },
                        imageSrc:('./img/doorOpen.png'),
                        frameRate:5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    })
                ]
            }
        },
        2: {
            init: ()=>{
                parsedCollisions = collisionLevel2.parse2D()
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                player.collisionBlocks = collisionBlocks
                player.position.x = 96
                player.position.y = 140
            
                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel2.png' ,
                })

                doors = [
                    new Sprite ({
                        position: {
                            x: 773,
                            y: 448-112,
                        },
                        imageSrc:('./img/doorOpen.png'),
                        frameRate:5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    })
                ]
            }
        },
        3: {
            init: ()=>{
                parsedCollisions = collisionLevel3.parse2D()
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                player.collisionBlocks = collisionBlocks
                player.position.x = 756
                player.position.y = 227
            
                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel3.png' ,
                })

                doors = [
                    new Sprite ({
                        position: {
                            x: 176,
                            y: 447-112,
                        },
                        imageSrc:('./img/doorOpen.png'),
                        frameRate:5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    })
                ]
            }
        },
        4: {
            init: ()=>{
                parsedCollisions = collisionLevel4.parse2D()
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                player.collisionBlocks = collisionBlocks
                player.position.x = 810
                player.position.y = 510
            
                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel4.png' ,
                })

                doors = [
                    new Sprite ({
                        position: {
                            x: 128,
                            y: 318-112,
                        },
                        imageSrc:('./img/doorOpen.png'),
                        frameRate:5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    })
                ]
            }
        },
    }

    
    const keys = {
        w: {
            pressed:false,
        },
        a:{
            pressed:false,
        },
        d:{
            pressed:false,
        },
    }

    const overlay = {
        opacity :0,
    }

    //vytvoření animace hráče
    function animate(){
        //znovu vyvolání animace pro pád hráče
        window.requestAnimationFrame(animate)

        background.draw()


        doors.forEach((door) => {
            door.draw()
        })



        
        player.handleInput(keys)
        player.draw()
        player.update()


        c.save()
        c.globalAlpha = overlay.opacity
        c.fillStyle = ('black')
        c.fillRect(0,0,canvas.width,canvas.height)
        c.restore()
    }


    levels[level].init()
    //vyvolání animace
    animate()
