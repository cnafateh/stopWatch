const timer = document.querySelector(".clock > .content")
const startBtn = document.querySelector(".start")
const stopBtn = document.querySelector(".stop")
const resetBtn = document.querySelector(".reset")
const info = document.querySelector(".info")

var minutes = 0
var seconds = 0
var milliseconds = 0

var time = [minutes, seconds, milliseconds]
// flag is because of startBtn bug
flag = true
startBtn.addEventListener("click", function(){
    if(flag){
    start = setInterval(stopwatch, 10)}
    flag = false
})
stopBtn.addEventListener("click", function(){
    clearInterval(start)
    createRecords()
    flag = true
})
resetBtn.addEventListener("click", function(){
    minutes = 0
    seconds = 0
    milliseconds = 0
    time = [minutes, seconds, milliseconds]
    info.innerHTML = ""
    clearInterval(start)
    timer.innerHTML = `${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)} : ${String(milliseconds).padStart(2, 0)}`
    flag = true
})

function stopwatch(){
    milliseconds ++
    if (milliseconds == 100){
        seconds ++
        milliseconds = 0
    }
    if (seconds == 60){
        minutes ++
        seconds = 0
    }
    timer.innerHTML = `${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)} : ${String(milliseconds).padStart(2, 0)}`
}

function toMilliseconds(array){
    return (array[0] * 60 * 100) + (array[1] * 100) + array[2]
}
function toBaseFormat(milliseconds){
    if (milliseconds >= 100 && milliseconds < 600){
        var seconds = Math.floor(milliseconds / 100)
        milliseconds = milliseconds - (seconds * 100)
        return [0, seconds, milliseconds]
    } else if (milliseconds >= 600){
        var minutes = Math.floor(milliseconds / 100 * 60)
        var milliseconds = milliseconds - (minutes * 100 * 60)
        seconds = Math.floor(milliseconds / 100)
        milliseconds = milliseconds - (seconds * 100)
        return [minutes, seconds, milliseconds]
    } else {
        return [0, 0, milliseconds]
    }
}

function calculatingTime(array1, array2){
    // array1 & array2 format ===> [02, 28, 30] ---> 02 = minutes , 28 = seconds , 30 = milliseconds
    // this func do this ===> array2 - array1

    var milliseconds = toMilliseconds(array2) - toMilliseconds(array1)
    return toBaseFormat(milliseconds)

}

function createRecords(){
    var record = document.createElement("span")
    record.setAttribute("class", "record")
    record.innerHTML = `${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)} : ${String(milliseconds).padStart(2, 0)}`


    
    // calculate difference of records
    time = calculatingTime(time, [minutes, seconds, milliseconds])
    record.innerHTML += `<span>${String(time[0]).padStart(2, 0)} : ${String(time[1]).padStart(2, 0)} : ${String(time[2]).padStart(2, 0)}</span>`
    info.appendChild(record)
    time = [minutes, seconds, milliseconds]
}