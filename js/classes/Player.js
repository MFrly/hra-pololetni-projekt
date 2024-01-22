//vytvoření classy pro hráče, rozšiřující třídu Sprite
    class Player extends Sprite{
        constructor({collisionBlocks = [], imageSrc, frameRate, animations, loop}){
              // Volání konstruktoru rodičovské třídy Sprite
            super({imageSrc, frameRate, animations, loop})
             // Inicializace pozice a rychlosti hráče
            this.position = {
                x:200,
                y:200,
            }
            this.velocity = {
                x:0,
                y:0,
            }

             // Inicializace různých vlastností hráče
            this.sides = {
                bottom: this.position.y + this.height
            }
            this.gravity = 1

            this.collisionBlocks = collisionBlocks
            
        }

        // Přidání update classy pro aktualizaci stavu hráče    
        update(){
            /*
            pozadí postavy
            c.fillStyle = 'rgba(0,0,0.25,0.25)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)*/
            this.position.x += this.velocity.x
            this.updateHitbox()

            //kontrola jestli se hráč dotkl  bloku horizontálně
            this.chechForHorizontalCollisions()

            //aplikování  gravitace
            this.applyGravity()

            this.updateHitbox()

            //c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
            
            
            //kontrola jestli se hráč doktl bloku vertikálně
            this.chechForVerticalCollisions()

        }

         // Přidání classy pro zpracování vstupů od hráče
        handleInput(keys){
            if(this.preventInput)return
            this.velocity.x = 0
            if(keys.d.pressed) {
                this.switchSprite('runRight')
                this.velocity.x =5
                this.lastDirection = 'right'
            }
            else if (keys.a.pressed) {
                this.switchSprite('runLeft')
                this.velocity.x = -5
                this.lastDirection = 'left'
            }
            else {
                if (this.lastDirection === 'left')this.switchSprite('idleLeft')
                else this.switchSprite('idleRight')
            }
        }

        // Pro změnu aktuálního sprite
        switchSprite(name){
            if (this.image === this.animations[name].image)return 
            this.currentFrame = 0
            this.image = this.animations[name].image
            this.frameRate = this.animations[name].frameRate
            this.frameBuffer = this.animations[name].frameBuffer
            this.loop = this.animations[name].loop
            this.currentAnimation = this.animations[name]
        }


        // Přidání classy pro aktualizaci hitboxu hráče

        updateHitbox(){
            this.hitbox = {
                position:{
                    x: this.position.x + 58,
                    y: this.position.y + 34,
                },
                width: 50,
                height: 53,
            }
        }



        chechForHorizontalCollisions(){
            for(let i = 0; i < this.collisionBlocks.length; i++){
                const collisionBlock = this.collisionBlocks[i]
                //kontrola kolize
                if(
                    //kontrola všech stran hráče a bloků, jestli se překrývají
                  this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                  this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x  && 
                  this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                   this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
                  ){
                    //jestli se překrývá levá strana hráče s pravou stranou bloku
                    if (this.velocity.x < 0){
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = 
                        //posunutí hráče
                        collisionBlock.position.x + collisionBlock.width - offset +0.01
                        break
                    }

                    //jestli se překrývá pravá strana hráče s levou stranou bloku
                    if(this.velocity.x > 0){
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x =
                        //posunutí hráče 
                        collisionBlock.position.x - offset - 0.01
                        break
                    }
                  }
            }
        }

        applyGravity(){
            this.velocity.y += this.gravity
            this.position.y += this.velocity.y
        }

        chechForVerticalCollisions(){
            for(let i = 0; i < this.collisionBlocks.length; i++){
                const collisionBlock = this.collisionBlocks[i]
                //kontrola kolize
                if(
                    //kontrola všech stran hráče a bloků, jestli se překrývají
                  this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                  this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x  && 
                  this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                   this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
                  ){
                    //jestli se překrývá vrchní strana hráče se spodní stranou bloku
                    if (this.velocity.y < 0){
                        //vynulování gravitace aby se hráč neprobugoval přes bloky postupem času
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                        //posunutí hráče
                        collisionBlock.position.y + collisionBlock.height +0.01
                        break
                    }

                    //jestli se překrývá spodní strana hráče s vrchní stranou bloku
                    if(this.velocity.y > 0){
                        //vynulování gravitace aby se hráč neprobugoval přes bloky postupem času
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        //posunutí hráče 
                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }
                  }
            }
        }
    }
