// Definice třídy pro sprite
class Sprite {
    //konstroktor s několika různými parametry (pozice, zdroj obrázku, počet snímků atd.)
    constructor({position, imageSrc, frameRate = 1, animations, frameBuffer = 2, loop = true, autoplay = true}){
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate
            this.height = this.image.height 
        }
        this.image.src= imageSrc
        this.loaded =false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = frameBuffer
        this.animations = animations
        this.loop = loop
        this.autoplay = autoplay
        this.currentAnimation

         // Načtení obrázků pro animace
        if(this.animations){
            for (let key in this.animations){
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }
            
        }
    }

    // Vykreslení sprite na canvas
    draw(){
        if(!this.loaded)return
          // Definice oblasti (cropbox) pro aktuální frame
        const cropbox = {
            position:{
                x: this.width * this.currentFrame,
                y: 0,
            }, 
            width: this.width,
            height: this.height,
        }
          // Vykreslení na canvas
        c.drawImage(
            this.image,
                cropbox.position.x,
                cropbox.position.y,
                cropbox.width,
                cropbox.height,
                //pozice vyrendrování obrázku
                this.position.x,
                this.position.y,
                this.width,
                this.height
                  )
                  // Aktualizace framu
                  this.updateFrames()
    }
    

     // Spuštění animace
    play(){
        this.autoplay = true
    }

    // Aktualizace framu animace
    updateFrames(){
        if(!this.autoplay) return
        this.elapsedFrames++

        
        // Podmínky pro aktualizaci framu
        if (this.elapsedFrames % this.frameBuffer ===0){
        if(this.currentFrame < this.frameRate - 1) this.currentFrame++
            else if(this.loop) this.currentFrame = 0}
             // Kontrola dokončení animace a volání onComplete funkce
            if (this.currentAnimation?.onComplete){
                if(this.currentFrame ===this.frameRate - 1 && !this.currentAnimation.isActive){
                    this.currentAnimation.onComplete()
                    this.currentAnimation.isActive = true
                } 
            }
        }
    
}
