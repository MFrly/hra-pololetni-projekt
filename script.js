      //vytvořn canvas dokumentu
    const canvas=document.querySelector('canvas');
    //vyvoření světa ve 2d
    const c = canvas.getContext('2d');

    //16:9
    canvas.width= 64 * 16; //1024
    canvas.height=64 * 9; // 576

    // Deklarace proměnné pro různé herní elementy
    let parsedCollisions
    let collisionBlocks
    let background
    let doors 

    // Vytvoření nového objektu hráče s určenými animacemi a vlastnostmi
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
                        // po dokončení levlu zatemění obrazovky
                        opacity: 1,
                        onComplete: () => {
                            //po dokončení levlu přesun do dalšího levlu přičtením preoměné 
                            level++

                            //když hráč zkusí jít na pátou úrovň, vrací se zpět do první
                            if(level ===5) level = 1
                            levels[level].init()
                            //hráč se vždy při spawnu oběví otočený doprava
                            player.switchSprite('idleRight')
                            player.preventInput = false
                            // při vstupu do nového levelu odtemění obrazovky
                            gsap.to(overlay, {
                                opacity: 0
                            })
                        }
                    })
                },
            }
        }
    });

    // inizalizace na první level
    let level = 1
    let levels = {
        // Inicializační funkce pro úroveň 1
        1: {
            init: ()=>{
                //kolizní data pro úroveň 1
                parsedCollisions = collisionLevel1.parse2D()
                 // Vytvoření kolizních bloků na základě kolizních dat
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                // Nastavení hráčových kolizních bloků na vytvořené bloky
                player.collisionBlocks = collisionBlocks

                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                //nastavení nového pozadí
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel1.png' ,
                })

                //nastavení dveří pro danou úroveň
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
        // Inicializační funkce pro úroveň 2
        2: {
            init: ()=>{
                //kolizní data pro úroveň 2
                parsedCollisions = collisionLevel2.parse2D()
                // Vytvoření kolizních bloků na základě kolizních dat
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                // Nastavení hráčových kolizních bloků na vytvořené bloky
                player.collisionBlocks = collisionBlocks
                player.position.x = 96
                player.position.y = 140
            
                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                //nastavení nového pozadí
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel2.png' ,
                })

                //nastavení dveří pro danou úroveň
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
        // Inicializační funkce pro úroveň 3
        3: {
            init: ()=>{
                //kolizní data pro úroveň 3
                parsedCollisions = collisionLevel3.parse2D()
                // Vytvoření kolizních bloků na základě kolizních dat
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                // Nastavení hráčových kolizních bloků na vytvořené bloky
                player.collisionBlocks = collisionBlocks
                player.position.x = 756
                player.position.y = 227
            
                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                //nastavení nového pozadí
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel3.png' ,
                })

                //nastavení dveří pro danou úroveň
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
        // Inicializační funkce pro úroveň 4
        4: {
            init: ()=>{
                //kolizní data pro úroveň 3
                parsedCollisions = collisionLevel4.parse2D()
                // Vytvoření kolizních bloků na základě kolizních dat
                collisionBlocks = parsedCollisions.createObjectsFrom2D()
                // Nastavení hráčových kolizních bloků na vytvořené bloky
                player.collisionBlocks = collisionBlocks
                player.position.x = 652
                player.position.y = 216
            
                if (player.currentAnimation) player.currentAnimation.isActive = false
            
                //nastavení nového pozadí
                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: './img/backgroundLevel4.png' ,
                })

                //nastavení dveří pro danou úroveň 
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

    // Objekt s klávesami, nastavené na false (proti pohybu)
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

    // Objekt pro překrytí
    const overlay = {
        opacity :0,
    }

    //vytvoření animace hráče
    function animate(){
        //znovu vyvolání animace pro pád hráče
        window.requestAnimationFrame(animate)

        background.draw()

        //vykreslení dveří
        doors.forEach((door) => {
            door.draw()
        })



        
        player.handleInput(keys)
        player.draw()
        player.update()


        //nastavení překryvu
        c.save()
        c.globalAlpha = overlay.opacity
        c.fillStyle = ('black')
        c.fillRect(0,0,canvas.width,canvas.height)
        c.restore()
    }


    // Inizializace nové úrovně
    levels[level].init()
    //vyvolání animace
    animate()
