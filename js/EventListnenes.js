// Event listener pro stisknutí klávesy
window.addEventListener('keydown', (event) => {
     // Kontrola, zda není blokován vstup hráče
    if (player.preventInput)return
    switch (event.key) {
        case 'w':
              // Kontrola kolizí s dveřmi
            for (let i = 0; i < doors.length; i++){
                const door = doors[i]

                if(player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x  >= door.position.x  && 
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                     ){
                        player.velocity.x = 0
                        player.velocity.y = 0
                        player.preventInput = true
                        player.switchSprite('enterDoor')
                        door.play()
                        return
                     }
            }
              // Nastavení vertikální rychlosti pro skok
            if (player.velocity.y ===0)player.velocity.y = -20
        
            break
        case 'a':
        //posun hráče doleva
         keys.a.pressed = true
            break
        case 'd':
        //posun hráče doprava    
         keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
        //posun hráče doleva
        keys.a.pressed = false
            break
        case 'd':
        //posun hráče doprava    
            keys.d.pressed = false
            break
    }
})
