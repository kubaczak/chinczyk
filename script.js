let players = [
    "gr",
    "bl",
    "re",
    "ye"
]

let playersName = [
    "Zielony",
    "Niebieski",
    "Czerwony",
    "Żółty"
]

let numbers = [
    33,
    3,
    23,
    13
]

var lbGraczy = 2

function losuj(){
    if(document.getElementById("info").textContent == "Wylosuj liczbe..."){
        var dice = Math.floor( Math.random() * 6 ) + 1
        document.getElementById("nb").innerHTML = dice
        let nowNb = document.getElementById("now").value 
        now = players[nowNb]
        let flag = 0;
        for(let i = 1; i<5; i++){
            if(document.getElementById(now + "Spawn:" + i).className != now + "Pawn"){
                flag = 1
            }
        } 
        if(flag == 0 && (dice == 6 || dice == 1)){
            document.getElementById("info").innerHTML = "Wybierz pionka..."
        } else if (flag == 1){
            document.getElementById("info").innerHTML = "Wybierz pionka..."
        } else {
            document.getElementById("info").innerHTML = "Wylosuj liczbe..."
            nowNb = Number(nowNb) + 1
            if(nowNb == lbGraczy){
                nowNb = 0
            }
            let nowName = playersName[nowNb]
            now = players[nowNb]
            document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
            document.getElementById("now").value = nowNb
        }
    }
}

function start(move){
    let nowNb = document.getElementById("now").value 
    now = players[nowNb]
    if(document.getElementById(move).className == now + "Pawn" && document.getElementById("info").textContent == "Wybierz pionka..." && (document.getElementById("nb").textContent == "1" || document.getElementById("nb").textContent == "6")){
        let chg = numbers[nowNb]
        /**  Zostawiam na wypadek gdyby coś nie działało
        if(document.getElementById(chg).className == "field"){
            document.getElementById(move).className = "field"
            document.getElementById(chg).className = now + "Pawn"
            document.getElementById(chg).setAttribute("onclick", "rusz(" + chg +")")
            document.getElementById("info").innerHTML = "Wylosuj liczbe..."
            nowNb = Number(nowNb) + 1
            if(nowNb == lbGraczy){
                nowNb = 0
            }
            let nowName = playersName[nowNb]
            now = players[nowNb]
            document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
            document.getElementById("now").value = nowNb
        }
         */
        //
        if(document.getElementById(chg).className != "field"){
            let knock = document.getElementById(chg).className
            knock = knock.substr(0, 2)
            if(knock != now){
                for(let i = 1; i<5; i++){
                    if(document.getElementById(knock + "Spawn:" + i).className != knock + "Pawn"){
                        document.getElementById(knock + "Spawn:" + i).className = knock + "Pawn"
                        break
                    }
                } 
                document.getElementById(move).className = "field"
                document.getElementById(chg).className = now + "Pawn"
                document.getElementById(chg).setAttribute("onclick", "rusz(" + chg +")")
                document.getElementById("info").innerHTML = "Wylosuj liczbe..."
                nowNb = Number(nowNb) + 1
                if(nowNb == lbGraczy){
                    nowNb = 0
                }
                let nowName = playersName[nowNb]
                now = players[nowNb]
                document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
                document.getElementById("now").value = nowNb
            }
        } else {
            document.getElementById(move).className = "field"
            document.getElementById(chg).className = now + "Pawn"
            document.getElementById(chg).setAttribute("onclick", "rusz(" + chg +")")
            document.getElementById("info").innerHTML = "Wylosuj liczbe..."
            nowNb = Number(nowNb) + 1
            if(nowNb == lbGraczy){
                nowNb = 0
            }
            let nowName = playersName[nowNb]
            now = players[nowNb]
            document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
            document.getElementById("now").value = nowNb
        }

        //
    }
}

function rusz(pole){
    let nowNb = document.getElementById("now").value 
    now = players[nowNb]
    if(document.getElementById(pole).className == now + "Pawn" && document.getElementById("info").textContent == "Wybierz pionka..."){
        let f = document.getElementById("nb").textContent
        let next = Number(pole) + Number(f)
        if(next > 40){
            next = next - 40
        }
        if(pole == numbers[nowNb] || 
        (Number(pole) < numbers[nowNb] && Number(next) < numbers[nowNb]) ||
        (Number(pole) > numbers[nowNb] && Number(next) > numbers[nowNb]) ||
        (Number(pole) > numbers[nowNb] && Number(next) < numbers[nowNb])
        ){
            if(document.getElementById(next).className != "field"){
                let knock = document.getElementById(next).className
                knock = knock.substr(0, 2)
                if(knock != now){
                    for(let i = 1; i<5; i++){
                        if(document.getElementById(knock + "Spawn:" + i).className != knock + "Pawn"){
                            document.getElementById(knock + "Spawn:" + i).className = knock + "Pawn"
                            break
                        }
                    } 
                    document.getElementById(pole).className = "field"
                    document.getElementById(pole).removeAttribute("onclick")
                    document.getElementById(next).className = now + "Pawn"
                    document.getElementById(next).setAttribute("onclick", "rusz(" + next +")")
                    document.getElementById("info").innerHTML = "Wylosuj liczbe..."
                    if(f != "6"){
                        nowNb = Number(nowNb) + 1
                        if(nowNb == lbGraczy){
                            nowNb = 0
                        }
                        let nowName = playersName[nowNb]
                        now = players[nowNb]
                        document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
                        document.getElementById("now").value = nowNb
                    }
                }
            } else {
                document.getElementById(pole).className = "field"
                document.getElementById(pole).removeAttribute("onclick")
                document.getElementById(next).className = now + "Pawn"
                document.getElementById(next).setAttribute("onclick", "rusz(" + next +")")
                document.getElementById("info").innerHTML = "Wylosuj liczbe..."
                if(f != "6"){
                    nowNb = Number(nowNb) + 1
                    if(nowNb == lbGraczy){
                        nowNb = 0
                    }
                    let nowName = playersName[nowNb]
                    now = players[nowNb]
                    document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
                    document.getElementById("now").value = nowNb
                }
            }
        } else {
            if(Number(next) < numbers[nowNb]){
                next = next + 40
            }
            let home = Number(next) - numbers[nowNb]
            home = home + 1
            console.log(home)
            if(home < 5){
                if(document.getElementById(now + "Home:" + home).className == now + "Home"){
                    document.getElementById(now + "Home:" + home).className = now + "Pawn"
                    document.getElementById(pole).className = "field"
                    document.getElementById(pole).removeAttribute("onclick")
                    document.getElementById("info").innerHTML = "Wylosuj liczbe..."
                    if(f != "6"){
                        nowNb = Number(nowNb) + 1
                        if(nowNb == lbGraczy){
                            nowNb = 0
                        }
                        let nowName = playersName[nowNb]
                        now = players[nowNb]
                        document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
                        document.getElementById("now").value = nowNb
                    }
                }
            }
        }
    }
}

function home(pole){
    let nowNb = document.getElementById("now").value 
    now = players[nowNb]
    if(document.getElementById(pole).className == now + "Pawn" && document.getElementById("info").textContent == "Wybierz pionka..."){
        let f = document.getElementById("nb").textContent
        let poleNb = pole.charAt(pole.lenght-1)
        if((Number(poleNB) + Number(f)) < 5){
            let next = Number(poleNb) + Number(f)
            next = now + "Home:" + String(next)
            if(document.getElementById(next).className == now + "Home"){
                document.getElementById(pole).className = now + "Home"
                document.getElementById(next).className = now + "Pawn"
                document.getElementById(next).setAttribute("onclick", "rusz(" + next +")")
                document.getElementById("info").innerHTML = "Wylosuj liczbe..."
                if(f != "6"){
                    nowNb = Number(nowNb) + 1
                    if(nowNb == lbGraczy){
                        nowNb = 0
                    }
                    let nowName = playersName[nowNb]
                    now = players[nowNb]
                    document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
                    document.getElementById("now").value = nowNb
                }
            }
        }
    }
}

function pomin(){
    let nowNb = document.getElementById("now").value 
    now = players[nowNb]
    document.getElementById("info").innerHTML = "Wylosuj liczbe..."
    nowNb = Number(nowNb) + 1
    if(nowNb == lbGraczy){
        nowNb = 0
    }
    let nowName = playersName[nowNb]
    now = players[nowNb]
    document.getElementById("turn").innerHTML = "Teraz rzuca: " + nowName
    document.getElementById("now").value = nowNb
}