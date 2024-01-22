// Převedení jednorozměrného pole na dvourozměrné pole
Array.prototype.parse2D= function(){
    const rows = []
    // Rozdělení pole na řádky s délkou 16 prvků
    for(let i = 0; i < this.length; i+=16){
        rows.push(this.slice(i, i + 16))
    }

    return rows
}

// Vytvoření objektů kolize z dvourozměrného pole
Array.prototype.createObjectsFrom2D = function(){
    const objects = []
    this.forEach((row, y )=> {
        row.forEach((symbol, x) => {
             // Kontrola, zda symbol odpovídá kolizi
            if(symbol === 292 || symbol === 250){
                // Vytvoření nového objektu kolize a přidání do pole objektů
                // protlačení nové kolize do bloků kolize
                objects.push(
                    new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    },
                })
                )
            }
        })
    });

    return objects
}
