// Varyables:


let rotation = 0
let defaultDistance = 1.5
let velocity = 0
let bulletdistance = 10
let maxVelocity = 15
let turnVelocity = 0
let maxTurnVelocity = 7.5
let asteroidDebuff = 10
let defaultAsteroidDebuff = 100
let maxAsteroidDistance = 500
let bulletDebuff = 0
let maxAsteroids = 3
let invincible = false
let ufoSize = 150
let ufoSpawnDebuff = 20
let defaultUfoSpawnDebuff = 200
let dead = false
let typing = false
let paused = false

let defaultMaxAsteroids = 3
let defaultMaxUfos = 2

let asteroidSizes = [50, 100, 150]

let depth = 0
let length = 0
let bulletArr = []
let asteroidArr = []
let maxBulletDistance = 3000
let elementsToRemove = []

let maxufos = 2
ufoArr = []

let stage = 1

let ufolaserArr = []
let ufolaserDebuff = 70

const main = document.getElementById("main")
let player = document.createElement("img")
player.src = "./player.png"
player.style.position = "absolute"
player.style.left = "300px"
player.style.top = "300px"
player.style.height = "10%"
player.style.width = "5%"
main.appendChild(player)

let score = 0
let scoredisplay = document.createElement("h1");
scoredisplay.innerHTML = score
scoredisplay.style.textAlign = "center"
scoredisplay.style.color = "white"
scoredisplay.style.position = "absolute";
scoredisplay.style.top = "0px"
scoredisplay.style.left = "50%"
main.appendChild(scoredisplay)

let pressl = document.createElement("h1");
pressl.innerHTML = "Press L To Open Leaderboard"
pressl.style.textAlign = "center"
pressl.style.color = "white"
pressl.style.position = "absolute";
pressl.style.top = "0px"
pressl.style.left = "65%"
main.appendChild(pressl)

let lives = 5
let lifedisplay = document.createElement("h1");
lifedisplay.innerHTML = "Lives: " + lives
lifedisplay.style.color = "white"
lifedisplay.style.position = "absolute";
lifedisplay.style.top = "0px"
lifedisplay.style.left = "0px"
main.appendChild(lifedisplay)

let scores = [908, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let names = ["N/AAAA", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"]

document.addEventListener('keydown', logKey);
function logKey(e) {
    if(e.code == "ArrowLeft"){
        if(dead == false && paused == false){
            if(Math.abs(turnVelocity) < maxTurnVelocity){
                turnVelocity -= 2.5
            }
        }
    }
    if(e.code == "ArrowRight"){
        if(dead == false && paused == false){
            if(turnVelocity < maxTurnVelocity){
                turnVelocity += 2.5
            }
        }
    }
    if(e.code == "ArrowDown"){
        if(dead == false && paused == false){
            rotation = rotation - 180
            if(rotation < 0){
                rotation = rotation + 360
            }
        }
    }
    if(e.code == "ArrowUp"){
        if(dead == false && paused == false){
            if(velocity < maxVelocity){
                velocity = velocity + 1;
            }
        }
    }
    if(e.code == "Space"){
        if(dead == false && paused == false){
            if(bulletDebuff <= 0){
                bulletDebuff = 10
                let bullet = document.createElement("img")
                bullet.src = "./bullet.png";
                bullet.style.height = "10%";
                bullet.style.width = "3%";
                bullet.style.position = "absolute"
                bullet.style.left = parseFloat(player.style.left) + "px"
                bullet.style.top = parseFloat(player.style.top) + "px"
                bullet.xvelo = bulletDimensions()[1]
                bullet.yvelo = bulletDimensions()[0]
                bullet.distanceMoved = 0
                bullet.style.transform = "rotate("+rotation+"deg)"
                main.appendChild(bullet);

                bulletArr.push(bullet);
            }
        }
    }

    if(e.code == "KeyL"){
        if(paused == false){
            paused = true

            let presse = document.createElement("h1");
            presse.innerHTML = "Press E To Close Leaderboard"
            presse.style.textAlign = "center"
            presse.style.color = "white"
            presse.style.position = "absolute";
            presse.style.top = "75%"
            presse.className = "presse"
            presse.style.left = "40%"
            main.appendChild(presse)

            for(let i = 0; i < names.length; i++){
                let item = document.createElement("h2")
                item.style.position = "absolute"
                item.style.textAlign = "center"
                item.style.left = "47.5%"
                item.style.top = i * 35 + + 100 + "px"
                item.className = "item"
                item.innerHTML = names[i] + ": " + scores[i]
                item.style.color = "white"
                main.appendChild(item)
            }
        } 
    }

    if(e.code == "KeyE"){
        if(paused == true){
            deleteByClass("presse");
            paused = false
            deleteByClass("item")
        }
    }

    // console.log(e.code)
}
function movement(){
    setTimeout(() => {
        if(paused == false){
            if(ufoArr.length + asteroidArr.length < 2){
                stage = stage + 1
                maxufos = (stage)
                maxAsteroids = (stage + 1)
                console.log("Next stage! (" + stage + ")")
                asteroidDebuff = 0
                for(let i = 0; i < stage* 1.5; i++){
                    makeUfo()
                    ufoSpawnDebuff = 0
                }
                for(let i = 0; i < stage* 2; i++){
                    makeAsteroid()
                    asteroidDebuff = 0
                }
            }

            asteroidDebuff -= 0.1
            makeAsteroid()
            makeUfo()
            ufoSpawnDebuff = ufoSpawnDebuff - 0.1

            bulletDebuff -= 0.5
            if(velocity > 0.1){
                velocity = velocity - 0.1;
                if(velocity > 0 && velocity < 0.1){
                    velocity = 0
                }
            }
            if(turnVelocity >= 0.5){
                turnVelocity = turnVelocity - 0.5
            }
            if(turnVelocity <= -0.5){
                turnVelocity = turnVelocity + 0.5
            }

            if(parseFloat(player.style.top) > 0){
                player.style.top = parseFloat(player.style.top) - moveDimensions()[0] + "px"
            }else{
                player.style.top = "5px"
                velocity = 0
            }

            if(parseFloat(player.style.top) < window.innerHeight){
                player.style.top = parseFloat(player.style.top) - moveDimensions()[0] + "px"
            }else{
                player.style.top = window.innerHeight - 5 + "px"
                velocity = 0
            }

            if(parseFloat(player.style.left) > 0){
                player.style.left = parseFloat(player.style.left) + moveDimensions()[1] + "px"
            }else{
                player.style.left = "5px"
                velocity = 0
            }

            if(parseFloat(player.style.left) < window.innerWidth){
                player.style.left = parseFloat(player.style.left) + moveDimensions()[1] + "px"
            }else{
                player.style.left = window.innerWidth - 5 + "px"
                velocity = 0
            }
            

            for(let i = 0; i < bulletArr.length; i++){
                bulletArr[i].style.top = parseFloat(bulletArr[i].style.top) + bulletArr[i].yvelo + "px"
                bulletArr[i].style.left = parseFloat(bulletArr[i].style.left) + bulletArr[i].xvelo + "px"
                bulletArr[i].distanceMoved =  bulletArr[i].distanceMoved + maxVelocity
                for(let q = 0; q < asteroidArr.length; q++){
                    if(Math.abs(Math.abs(parseFloat(bulletArr[i].style.left)) - Math.abs(parseFloat(asteroidArr[q].style.left))) < asteroidSizes[asteroidArr[q].size]/2 && Math.abs(Math.abs(parseFloat(bulletArr[i].style.top)) - Math.abs(parseFloat(asteroidArr[q].style.top))) < asteroidSizes[asteroidArr[q].size]/2){
                        asteroidArr[q].size -= 1
                        asteroidArr[q].style.width = asteroidSizes[asteroidArr[q].size] + "px"
                        asteroidArr[q].style.height = asteroidSizes[asteroidArr[q].size] + "px"
                        bulletArr[i].style.top = 4000 + "px"
                        if(asteroidArr[q].size < 0){
                            asteroidArr[q].remove()
                            asteroidArr.splice(q, 1)
                            // asteroidArr.splice(q, q);

                        }else{
                            let asteroid = document.createElement("img");
                            asteroid.src = "./asteroid.png";
                            asteroid.className = "asteroid";
                            asteroid.style.height = asteroidSizes[asteroidArr[q].size]+"px"
                            asteroid.style.width = asteroidSizes[asteroidArr[q].size]+"px"
                            asteroid.style.position = "absolute"
                            asteroid.style.left = asteroidArr[q].style.left
                            asteroid.style.top = asteroidArr[q].style.top
                            asteroid.xvelo = (5 * Math.random()) - 2.5;
                            asteroid.yvelo = (5 * Math.random()) - 2.5;
                            asteroid.size = asteroidArr[q].size
                            asteroid.distanceMoved = 0
                            asteroidArr.push(asteroid)
                            main.appendChild(asteroid);
                            score = score + 10
                            scoredisplay.innerHTML = score
                        }

                    }
                }
                if(bulletArr[i].distanceMoved > maxBulletDistance){
                    bulletArr[i].xvelo = 0
                    bulletArr[i].yvelo = 0
                    bulletArr[i].remove()
                    // bulletArr.splice(i, i)

                }
            }

            for(let i = 0; i < bulletArr.length; i++){
                for(let q = 0; q < ufoArr.length; q++){
                    if(Math.abs(Math.abs(parseFloat(bulletArr[i].style.left)) - Math.abs(parseFloat(ufoArr[q].style.left))) < ufoSize/2 && Math.abs(Math.abs(parseFloat(bulletArr[i].style.top)) - Math.abs(parseFloat(ufoArr[q].style.top))) < ufoSize/2){
                        ufoArr[q].remove()
                        ufoArr[q].died = true
                        ufoSpawnDebuff = defaultUfoSpawnDebuff
                        ufoArr.splice(q, 1)
                        
                        score += 50
                        scoredisplay.innerHTML = score
                        bulletArr[i].style.top = "4000px"
                        // player.src = "./asteroid.png"
                    }else{
                        // player.src = "./player.png"
                    }
                }
                
            }

            // Asteroid Arr Movement
            for(let i = 0; i < asteroidArr.length; i++){
                asteroidArr[i].style.top = parseFloat(asteroidArr[i].style.top) + asteroidArr[i].yvelo + "px"
                asteroidArr[i].style.left = parseFloat(asteroidArr[i].style.left) + asteroidArr[i].xvelo + "px"
                if(parseFloat(asteroidArr[i].style.left) < 0){
                    asteroidArr[i].xvelo = asteroidArr[i].xvelo * -1
                    asteroidArr[i].style.left = "10px"
                }
                if(parseFloat(asteroidArr[i].style.left) > window.innerWidth){
                    asteroidArr[i].xvelo = asteroidArr[i].xvelo * -1
                    asteroidArr[i].style.left = window.innerWidth - 10 + "px"
                }
                if(parseFloat(asteroidArr[i].style.top) < 0){
                    asteroidArr[i].yvelo = asteroidArr[i].yvelo * -1
                    asteroidArr[i].style.top = "10px"
                }
                if(parseFloat(asteroidArr[i].style.top) > window.innerHeight){
                    asteroidArr[i].yvelo = asteroidArr[i].yvelo * -1
                    asteroidArr[i].style.top = window.innerHeight - 10 + "px"
                }
                asteroidArr[i].distanceMoved =  asteroidArr[i].distanceMoved + Math.sqrt(Math.pow(asteroidArr[i].xvelo, 2) + Math.pow(asteroidArr[i].yvelo, 2))
                if(Math.abs(parseFloat(asteroidArr[i].style.left) - parseFloat(player.style.left)) < asteroidSizes[asteroidArr[i].size]/2 && Math.abs(parseFloat(asteroidArr[i].style.top) - parseFloat(player.style.top)) < asteroidSizes[asteroidArr[i].size]/2){
                    death()
                }
            }
            // Ufo Arr Movement
            for(let i = 0; i < ufoArr.length; i++){
                ufoArr[i].style.top = parseFloat(ufoArr[i].style.top) + ufoArr[i].yvelo + "px"
                ufoArr[i].style.left = parseFloat(ufoArr[i].style.left) + ufoArr[i].xvelo + "px"
                if(parseFloat(ufoArr[i].style.left) < 0){
                    ufoArr[i].xvelo = ufoArr[i].xvelo * -1
                    ufoArr[i].style.left = "10px"
                }
                if(parseFloat(ufoArr[i].style.left) > window.innerWidth){
                    ufoArr[i].xvelo = ufoArr[i].xvelo * -1
                    ufoArr[i].style.left = window.innerWidth - 10 + "px"
                }
                if(parseFloat(ufoArr[i].style.top) < 0){
                    ufoArr[i].yvelo = ufoArr[i].yvelo * -1
                    ufoArr[i].style.top = "10px"
                }
                if(parseFloat(ufoArr[i].style.top) > window.innerHeight){
                    ufoArr[i].yvelo = ufoArr[i].yvelo * -1
                    ufoArr[i].style.top = window.innerHeight - 10 + "px"
                }
                ufoArr[i].distanceMoved =  ufoArr[i].distanceMoved + Math.sqrt(Math.pow(ufoArr[i].xvelo, 2) + Math.pow(ufoArr[i].yvelo, 2))

                ufoArr[i].firedebuff = ufoArr[i].firedebuff - 0.1
                if(ufoArr[i].firedebuff <= 0){
                    if(ufoArr[i].died == false){
                        ufoArr[i].firedebuff = ufolaserDebuff
                        let ufolaser = document.createElement("img")
                        ufolaser.className = "ufolaser"
                        ufolaser.src = "./ufolaser.png"
                        ufolaser.style.height = "20px"
                        ufolaser.style.width = "20px"
                        ufolaser.style.position = "absolute"
                        ufolaser.style.left = ufoArr[i].style.left
                        ufolaser.style.top = ufoArr[i].style.top
                        ufolaser.distanceMoved = 0
                        main.appendChild(ufolaser)
                        ufolaserArr.push(ufolaser);
                        ufolaser.xvelo = ((parseFloat(ufoArr[i].style.left) - parseFloat(player.style.left))/200) * -1
                        ufolaser.yvelo = ((parseFloat(ufoArr[i].style.top) - parseFloat(player.style.top))/200) * -1
                    }
                }
                if(Math.abs(parseFloat(ufoArr[i].style.left) - parseFloat(player.style.left)) < 30 && Math.abs(parseFloat(ufoArr[i].style.top) - parseFloat(player.style.top)) < 30){
                    death()
                }
            }
            for(let i = 0; i < ufolaserArr.length; i++){
                ufolaserArr[i].style.top = parseFloat(ufolaserArr[i].style.top) + ufolaserArr[i].yvelo + "px"
                ufolaserArr[i].style.left = parseFloat(ufolaserArr[i].style.left) + ufolaserArr[i].xvelo + "px"
                ufolaserArr[i].distanceMoved = ufolaserArr[i].distanceMoved + Math.sqrt(Math.pow(ufolaserArr[i].xvelo, 2) + Math.pow(ufolaserArr[i].yvelo, 2))
                if(Math.abs(parseFloat(ufolaserArr[i].style.left) - parseFloat(player.style.left)) < 30 && Math.abs(parseFloat(ufolaserArr[i].style.top) - parseFloat(player.style.top)) < 30){
                    death()
                }
                if(ufolaserArr[i].distanceMoved > 5000){
                    ufolaserArr[i].remove()
                    ufolaserArr.splice(i, 1)
                }
                
            }


            // removeElements()
            rotation += turnVelocity
            if(rotation >= 360){
                rotation = 0
            }
            if(rotation < 0){
                rotation = rotation + 360
            }
            player.style.transform = "rotate("+rotation+"deg)"
        }
        movement();
    }, 10);
}
movement();

function death(){
    if(invincible == false){   
        
        if(lives <= 1){
            lives = 0
            lifedisplay.innerHTML = "Lives: " + lives
            if(dead == false){
                scoreboardpos = 10
                for(i = scores.length; i > 0; i--){
                    if(score > scores[i]){
                        scoreboardpos = i
                    }
                }
                if(scoreboardpos == 10){
                    
                    let restart = document.createElement("button");
                    restart.innerHTML = "Out of Lives! Click to Restart"
                    restart.style.position = "absolute"
                    restart.style.width = "10%"
                    restart.style.height = "5%"
                    restart.style.left = "45%"
                    restart.style.top = "47.5%"

                    restart.style.color = "white"
                    restart.style.borderColor = "white"
                    restart.style.backgroundColor = "black"
                    main.appendChild(restart)
                    restart.addEventListener("click", function(){
                        deleteByClass("asteroid");
                        deleteByClass("ufo");
                        deleteByClass("ufolaser");
                        ufoArr = []
                        asteroidArr = []
                        ufolaserArr = []
                        maxAsteroids = defaultMaxAsteroids
                        maxufos = defaultMaxUfos

                        stage = 1
                        dead = false
                        score = 0
                        lives = 5
                        scoredisplay.innerHTML = score
                        main.removeChild(restart)
                    })
                }else{
                    let showhighscore = document.createElement("h1");
                    showhighscore.style.position = "absolute"
                    showhighscore.style.textAlign = "center"
                    showhighscore.style.left = "25%"
                    showhighscore.style.top = "30%"
                    showhighscore.innerHTML = "High Score! Enter Initials to Add To Leaderboard!"
                    showhighscore.style.color = "white"
                    main.appendChild(showhighscore);

                    scores.splice(scoreboardpos, 0, score);
                    let name = document.createElement("textarea")
                    name.style.resize = "none"
                    name.style.width = "20%"
                    name.style.height = "20%"
                    name.style.position = "absolute"
                    name.style.left = "40%"
                    name.style.top = "40%"
                    name.style.borderColor = "white"
                    name.style.color = "white"
                    name.style.backgroundColor = "black"
                    main.appendChild(name);

                    let submit = document.createElement("button")
                    submit.style.position = "absolute"
                    submit.style.width = "20%"
                    submit.style.height = "20%"
                    submit.style.left = "40%"
                    submit.style.top = "60%"
                    submit.innerHTML = "Submit"
                    submit.style.backgroundColor = "black"
                    submit.style.color = "white"
                    submit.style.borderColor = "white"
                    main.appendChild(submit)
                    submit.addEventListener("click", function(){
                        names.splice(scoreboardpos, 0, name.value);
                        console.log(scoreboardpos)
                        main.removeChild(submit)
                        main.removeChild(name)
                        main.removeChild(showhighscore)
                        console.log(names)
                        console.log(scores)

                        let items = []
                        for(let i = 0; i < names.length; i++){
                            let item = document.createElement("h2")
                            item.style.position = "absolute"
                            item.style.textAlign = "center"
                            item.style.left = "47.5%"
                            item.style.top = i * 35 + + 100 + "px"
                            item.className = "item"
                            item.innerHTML = names[i] + ": " + scores[i]
                            item.style.color = "white"
                            main.appendChild(item)
                            // items.push(item)
                        }
                        let restart = document.createElement("button");
                        restart.innerHTML = "Out of Lives! Click to Restart"
                        restart.style.position = "absolute"
                        restart.style.width = "10%"
                        restart.style.height = "5%"
                        restart.style.left = "45%"
                        restart.style.top = "85%"

                        restart.style.color = "white"
                        restart.style.borderColor = "white"
                        restart.style.backgroundColor = "black"
                        main.appendChild(restart)
                        restart.addEventListener("click", function(){
                            deleteByClass("asteroid");
                            deleteByClass("ufo");
                            deleteByClass("ufolaser");
                            ufoArr = []
                            asteroidArr = []
                            ufolaserArr = []

                            stage = 1
                            dead = false
                            score = 0
                            lives = 5
                            main.removeChild(restart)
                            scoredisplay.innerHTML = score
                            deleteByClass("item")
                        })

                    })
                }
            }
            dead = true
        }else{
            lives = lives - 1
            lifedisplay.innerHTML = "Lives: " + lives
            invincible = true
            player.src = "invincible.png"
            setTimeout(() => {
                invincible = false
                player.src = "player.png"
            }, 3000);
            player.style.left = window.innerWidth/2 + "px"
            player.style.top = window.innerHeight/2 + "px"
        }
    }
}

function moveDimensions(){
    distance = defaultDistance * velocity
    if(rotation >= 180){
        depth = Math.sin((rotation-180)/57.2957795)*distance
        length = Math.sqrt(Math.pow(distance, 2) - Math.pow(depth, 2))
        if(rotation > 90 && rotation < 270){
            length = length * -1
        }
        depth = depth * -1
    }else{
        depth = Math.sin(rotation/57.2957795)*distance
        length = Math.sqrt(Math.pow(distance, 2) - Math.pow(depth, 2))
        if(rotation > 90 && rotation < 270){
            length = length * -1
        }
    }
    
    return [length, depth]
}
function bulletDimensions(){
    distance = bulletdistance
    if(rotation >= 180){
        x = Math.sin((rotation-180)/57.2957795)*distance
        y = Math.sqrt(Math.pow(distance, 2) - Math.pow(x, 2))
        if(rotation > 90 && rotation < 270){
            y = y * -1
        }
        x = x * -1
    }else{
        x = Math.sin(rotation/57.2957795)*distance
        y = Math.sqrt(Math.pow(distance, 2) - Math.pow(x, 2))
        if(rotation > 90 && rotation < 270){
            y = y * -1
        }
    }
    y = y * -1
    return [y, x]
}
function makeAsteroid(){
    if(asteroidDebuff <= 0 && asteroidArr.length < maxAsteroids){
        asteroidDebuff = defaultAsteroidDebuff
        let asteroid = document.createElement("img");
        asteroid.src = "./asteroid.png";
        asteroid.style.height = asteroidSizes[2]+"px"
        asteroid.style.width = asteroidSizes[2]+"px"
        asteroid.style.position = "absolute"
        asteroid.className = "asteroid";
        let corner = Math.round(Math.random() * 3)
        if(corner == 0){
            asteroid.style.top = 0+"px"
            asteroid.style.left = 0+"px"
        }else{
            if(corner == 1){
                asteroid.style.top = window.innerHeight+"px"
                asteroid.style.left = 0+"px"
            }else{
                if(corner == 2){
                    asteroid.style.top = 0+"px"
                    asteroid.style.left = window.innerWidth+"px"
                }else{
                    asteroid.style.top = window.innerHeight+"px"
                    asteroid.style.left = window.innerWidth+"px"
                }
            }
        }
        asteroid.xvelo = (5 * Math.random()) - 2.5;
        asteroid.yvelo = (5 * Math.random()) - 2.5;
        asteroid.distanceMoved = 0
        asteroid.size = 2
        asteroidArr.push(asteroid)
        main.appendChild(asteroid)
    }
}

function deleteByClass(name){
    for(let i = document.getElementsByClassName(name).length-1; i > -1; i--){
        document.getElementsByClassName(name)[i].parentElement.removeChild(document.getElementsByClassName(name)[i])
    }
}

function makeUfo(){
    if(ufoArr.length < maxufos){
        if(ufoSpawnDebuff <= 0){
            ufoSpawnDebuff = defaultUfoSpawnDebuff
            let ufo = document.createElement("img");
            ufo.src = "./ufo.png";
            ufo.className = "ufo"
            ufo.style.height = ufoSize+"px"
            ufo.style.width = ufoSize+"px"
            ufo.died = false
            ufo.style.position = "absolute"
            let corner = Math.round(Math.random() * 3)
            if(corner == 0){
                ufo.style.top = 0+"px"
                ufo.style.left = 0+"px"
            }else{
                if(corner == 1){
                    ufo.style.top = window.innerHeight+"px"
                    ufo.style.left = 0+"px"
                }else{
                    if(corner == 2){
                        ufo.style.top = 0+"px"
                        ufo.style.left = window.innerWidth+"px"
                    }else{
                        ufo.style.top = window.innerHeight+"px"
                        ufo.style.left = window.innerWidth+"px"
                    }
                }
            }
            ufo.xvelo = (5 * Math.random()) - 2.5;
            ufo.yvelo = (5 * Math.random()) - 2.5;
            ufo.distanceMoved = 0
            ufo.size = 2
            ufoArr.push(ufo)
            ufo.shouldfire = false
            ufo.firedebuff = 3
            main.appendChild(ufo)
        }else{
        }
    }
}
makeAsteroid();
asteroidDebuff = 0
makeAsteroid();
// console.log(Math.sin(39/57.2957795)) 