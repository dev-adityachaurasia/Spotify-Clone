
let currentSong = new Audio();
let songs;
let folder = "Dino";
let listOfSong;
getSongs = async()=>{
let a = await fetch(`http://127.0.0.1:5501/Songs/${folder}/`); // at https://spotifycloneprj.freewebhostmost.com/ you have to place you hosting name ex. - http://localhost:3000/
// console.log(a);
let responce = await  a.text();
// console.log(responce);
let div = document.createElement("div");
div.innerHTML = responce;
let elements = await div.querySelectorAll("li a");
let songs = [];
elements.forEach((a) => {
    let link = a.href;
    if(link.endsWith(".mp3")){
        songs.push(link);
    }
});
return songs;
};

if(localStorage.getItem('name')){
    // console.log('Hey');
    let userName = localStorage.getItem('name')
    document.querySelector('.login-signup ').innerHTML = `<h3>Hello ${userName} </h3>`
}
else{

    let login = document.querySelectorAll("#logIn");
    login.forEach(function(elem) {
        elem.addEventListener("click", function() {
            let userName = prompt('Your Name')
            localStorage.setItem('name',`${userName}`);
            document.querySelector('.login-signup ').innerHTML = `<h3>Hello ${userName} </h3>`
        });
    });
}

function secondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00 ";
    }

    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    var formattedMinutes = minutes.toString().padStart(2, '0');
    var formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return formattedMinutes + ":" + formattedSeconds;
}

let main = async()=>{
    songs = await getSongs(folder);
    listOfSong = document.querySelector(".libList ol");
let nobhai = ()=>{ 
    listOfSong.innerHTML = "";
        for (const song of songs){
        let li = document.createElement("li")
        li.innerHTML = `<div class="flex gap">
                        <img src="Icons/music.svg" alt="">
                        <div class="songInfo">
                        <span>${song.split(`/${folder}/`)[1].replaceAll("%20"," ").split(".mp3")[0]}</span>
                        <p>Artist Name</p>
                        </div> 
                        </div>
                        <div class="infoStart flex align-items">
                        <span>Play Now</span><img src="Icons/play2.svg" alt="">
                        </div>`;
        listOfSong.append(li);
    }

    // 


        currentSong.src = songs[0];
        nowPlaying.querySelector("span").innerText = decodeURI(songs[0]).split(`/${folder}/`)[1].replace(".mp3","");
        document.querySelectorAll(".libList ol li").forEach(e=>{
        e.addEventListener("click",()=>{
        playSong(e.querySelector(".songInfo span").innerText.trim());
        })})     
}
nobhai();    



    // Time Notaion Of The Music

    currentSong.addEventListener("timeupdate",()=>{
        timeStamp.innerText = `${secondsToMinutes(currentSong.currentTime)} / ${secondsToMinutes(currentSong.duration)}`
        timeMoving.style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        kuchnhi.style.width = (currentSong.currentTime / currentSong.duration) * 100 + "%";

        if(timeMoving.style.left == "100%"){
            play.src = "Icons/main-play.svg";
            timeMoving.style.left ="0%";
            let index = songs.indexOf(currentSong.src);
            if(index == (songs.length -1)){
                index = -1
            } 
            currentSong.src = songs[index + 1];
            nextPrevious();
        }
        })  

    // Play And Pause Countroll

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src = "Icons/pause.svg"
        }
        else{
            currentSong.pause();
            play.src = "Icons/main-play.svg"
        }})

        // Music Mover *have to Learn*

        kuchnhi,mover.addEventListener("click",e=>{
            let percent = (e.layerX/e.target.getBoundingClientRect().width) * 100 ;
            timeMoving.style.left = percent + "%";
            currentSong.currentTime = (currentSong.duration) * percent/100 ;
            kuchnhi.style.width = percent + "%";
        })

        // next song play

        next.addEventListener("click",()=>{
            // console.nowPlaying(currentSong.src,songs.indexOf(currentSong.src));
            let index = songs.indexOf(currentSong.src);
            if(index == (songs.length -1)){
                index = -1
            } 
            currentSong.src = songs[index+1]
            nextPrevious();
        })

        // previous song play

        previous.addEventListener("click",()=>{
            let index = songs.indexOf(currentSong.src);
            if(index === 0){
                index = songs.length 
            } 
            currentSong.src = songs[index-1]
            nextPrevious();
        })

        // spacePress 

        window.addEventListener("keypress", e=>{
            if(e.keyCode === 32 && currentSong.paused){
                currentSong.play();
                play.src = "Icons/pause.svg"
            }
            else if(e.keyCode === 32){
                currentSong.pause();
                play.src = "Icons/main-play.svg"
            }
        })

        // 

        kuchbol,volume.addEventListener("click",(e)=>{
            let percent = (e.layerX/e.target.getBoundingClientRect().width);
            kuchbol.style.width = percent*100 + "%";
            volCir.style.left = percent*100 + "%"
            currentSong.volume = percent;
        })

        // 

        more.addEventListener("click",()=>{
            document.querySelector(".left").style.left = 0 + "%";
        })

        cross.addEventListener("click",()=>{
            document.querySelector(".left").style.left = -100 + "%";
        })

        // 

        let momo  = allCards.querySelectorAll(".card")
        momo.forEach((a)=>{
           a.addEventListener("click", async ()=>{
            let nowFolder = a.querySelector("h4").innerText ;
            folder = nowFolder;
            songs = await getSongs(folder);
            timeMoving.style.left = "0%";
            kuchnhi.style.width = "0%"; 
            play.src= "Icons/main-play.svg"
            nobhai();
            currentSong.play();
            play.src= "Icons/pause.svg"
           })
           
        });

        // 
        
        const playSong = (track)=>{
        nowPlaying.querySelector("span").innerText = track;
        currentSong.src = `/Songs/${folder}/` +track.trimEnd()+ ".mp3";
        currentSong .play();
        play.src= "Icons/pause.svg"
        }
        
        const nextPrevious = ()=>{
            nowPlaying.querySelector("span").innerText = decodeURI(currentSong.src.split(`/${folder}/`)[1]).split(".mp3")[0];
            play.src = "Icons/pause.svg"
            currentSong.play();
        }
        
};

    // Song Player


main();