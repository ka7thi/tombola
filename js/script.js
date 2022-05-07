const wheel = document.querySelector('.tombola__wheel'),
      startButton = document.querySelector('.tombola__test'),
      endButton = document.querySelector('.--award'),
      awardText = document.querySelector('.tombola__award'),
      windowWithAward = document.querySelector('.tombola__window-with-award'),
      tombolaExperience = document.querySelector('.tombola__experience'),
      tombolaLevelText = document.querySelector('.tombola__level-text');

let time = 4800,
    award,
    awardImg,
    experience = 0,
    experienceBar = document.querySelectorAll('.tombola__experience-point'),
    points = 0,
    timerOn = false,
    minutes = 0,
    seconds = 0,
    timeUp;

startButton.addEventListener('click', start);
endButton.addEventListener('click', end);

function start(){
    this.removeEventListener('click', start);
    this.style.cursor = "auto";
    document.querySelector('.tombola__test').disabled = true;
    wheel.style.backgroundImage = "url('img/animation.png')";
    setTimeout( function(){
        whatWon();
        timer();
        setTimeout( function(){
            animation();  
        }, 1000);
        showAward();
    }, 1000);
}

function end(){
    startButton.addEventListener('click', start);
    document.querySelector('.tombola__test').style.cursor = "pointer";
    document.querySelector('.tombola__test').disabled = false;
    wheel.innerHTML = "";
    wheel.style.backgroundPositionY = "0px";
    windowWithAward.style.opacity = "0";
        setTimeout(function(){
            windowWithAward.style.display = "none";
        }, 500);
    wheel.style.backgroundImage = "url('img/wheel.png')";
    time = 4800;
    award = "";
}

function checkLevelUp(){
    
    if(experience === 3){
        
        experienceProgress();
        points = 0;
        tombolaLevelText.innerHTML = "POZIOM 2";
        for(i=0; i<=3 ;i++){
            experienceBar[i].classList.remove('--point');
        }
        
    }else if(experience === 7){
        experienceProgress();
        points = 0;
        tombolaLevelText.innerHTML = "POZIOM 3";
        for(i=0; i<=4 ;i++){
            experienceBar[i].classList.remove('--point');
        }
        
    }else if(experience === 12){
        experienceProgress();
        points = 0;
        tombolaLevelText.innerHTML = "POZIOM 4";
        for(i=0; i<=5 ;i++){
            experienceBar[i].classList.remove('--point');
        }
    
    }else if(experience === 18){
        tombolaLevelText.innerHTML = "POZIOM 5";
        tombolaExperience.innerHTML = "<div class='tombola__max-level'>MAX</div>";
    
    }else{
        console.log("Brak level up`a.");
    }
}

function stopTimeWhenLevelUp(time) {
    
    if(experience === 2){
        
        setTimeout(function(){
        document.querySelector('.tombola__timer').innerHTML = "10:00";
        }, time + 500);
        
    }else if(experience === 6){
    
        clearInterval(timeUp);
        setTimeout(function(){
            document.querySelector('.tombola__timer').innerHTML = "20:00"; 
        }, time + 500);
                
        
    }else if(experience === 11){
        
        clearInterval(timeUp);
        setTimeout(function(){
        document.querySelector('.tombola__timer').innerHTML = "30:00";
        }, time + 500);
    
    }else if(experience === 17){
        
        clearInterval(timeUp);
        setTimeout(function(){
        document.querySelector('.tombola__timer').innerHTML = "40:00";
        }, time + 500);
    
    }else{
        console.log("Brak zatrzymania czasu.");
    }
    
}

function whatWon(){
    
    let number = Math.round(Math.random() * 100);
    let level = 1;
    timerTurnOn();
    
    
    if(experience < 3) {
        
        level1(number);
        awardsStack();
        
    }else if(experience >= 3 && experience < 7){
        
        level = 2;
        
        
        level2(number);
        awardsStack();
        
    }else if(experience >= 7 && experience < 12){
        
        level = 3;
        
        
        level3(number);
        awardsStack();
        
    }else if(experience >= 12 && experience < 18){
        
        level = 4;
        
        
        level4(number);
        awardsStack();
        
    }else{
        
        level = 5;
        
        level5(number);
        awardsStack();
    }
    
    stopTimeWhenLevelUp(time);
    
    function awardsStack() {
        const awardIcons = [];
        const y = "[i].png";
        for(i=0; i<=15; i++){
            awardIcons[i] = document.createElement('div');
            awardIcons[i].classList.add('award-icon-' + [i]);
            awardIcons[i].style.backgroundImage = 'url(img/award_' + level + '_' + [i] + '.png)';
            wheel.appendChild(awardIcons[i]);
        }
    }

    experience++;
        
    timer(level);
    
    number = "";
}

function animation(){
    
    let height = 312;
    const spin = setInterval(function(){
        wheel.style.backgroundPositionY = "-" + height + "px";
        height = height + 312;
    }, 100);
    
    setTimeout(function(){
        clearInterval(spin);
    }, time); 
}

function showAward(){
    
    setTimeout(function(){
        awardText.innerHTML = "Twoja wygrana to " + award;
        const awardImage = document.querySelector('.tombola__award-image');
        awardImage.src = "img/award_" + awardImg + ".png";
        windowWithAward.style.display = "flex";
        
        setTimeout(function(){
            windowWithAward.style.opacity = "1";
        }, 500);
        
        experienceBar[points].classList.add('--point');
        points++;
        checkLevelUp();
        
    }, time+1500);
}

function experienceProgress() {

    const newExperiencePoint = document.createElement('div');
    newExperiencePoint.classList.add('tombola__experience-point');
    tombolaExperience.appendChild(newExperiencePoint);
    experienceBar = document.querySelectorAll('.tombola__experience-point');
    
}

function addExperienceBar() {

    const newExperienceBar = document.createElement('div');
    newExperienceBar.classList.add('tombola__experience-point');
    tombolaExperience.appendChild(newExperienceBar);
    experienceBar = document.querySelectorAll('.tombola__experience-point');
    
}

function timerTurnOn(){
    
    if(experience === 3 || experience === 7 || experience === 12 || experience === 18){
        timerOn = true;
    }else{
        timerOn = false;
    }
}

function timer(level){
        
    const timer = document.querySelector('.tombola__timer');
    
    if(level === 1){
        timer.innerHTML = "00:00";
    }else if(level === 2 && timerOn === true){
        minutes = 09;
        seconds = 60;
    }else if(level === 3 && timerOn === true){
        clearInterval(timeUp);
        minutes = 19;
        seconds = 60;
    }else if(level === 4 && timerOn === true){
        clearInterval(timeUp);
        minutes = 29;
        seconds = 60;
    }else if(level === 5 && timerOn === true){
        clearInterval(timeUp);
        minutes = 39;
        seconds = 60;
    }else{
        //console.log("Funkcja timer nie zadziałała.");
    }
    
    if(level >=2 && timerOn === true){
        timeUp = setInterval(function(){
            if(seconds >= 1){
                seconds--;
                showTimer();
            }else{
                minutes--;
                seconds = 59;
                showTimer();
            }
            timeGone(level);
        }, 1000);
    }
    
    
            
    function showTimer(){
        if(minutes <= 9 && seconds <= 9){
            timer.innerHTML = "0" + minutes + ":0" + seconds;
        }else if(minutes > 9 && seconds <= 9){
            timer.innerHTML = minutes + ":0" + seconds;
        }else if(minutes <= 9 && seconds > 9){
            timer.innerHTML = "0" + minutes + ":" + seconds;
        }else if(minutes === 0 && seconds === 0){
            timer.innerHTML = "00:00";
            clearInterval(timeUp);
        }else{
            timer.innerHTML = minutes + ":" + seconds;
        }
    }
}

function timeGone(level){
    
    if(minutes === 0 && seconds === 0){
        
        clearInterval(timeUp);
        const removeCount = level +2;
        
        experience = 0;
        points = 0;
        level = 1;
        tombolaLevelText.innerHTML = "POZIOM 1";
        
        for(i=0; i < removeCount; i++){
            experienceBar[i].classList.remove('--point');
            tombolaExperience.removeChild(experienceBar[i]);
        }
            
        for(i=0; i < 3; i++){
            addExperienceBar();
        }
    }   
}

function level1(number){
    
    const awardsLevel = [
        "Biała Perła",
        "Skóra Niedźwiedzia +",
        "Krwawa Perła",
        "Żółć Niedźwiedzia",
        "Czarny Uniform",
        "Sztabka Złota",
        "Złota Bransoleta",
        "Marmur Polimorfii",
        "Kwiat Kaki",
        "Czerwona Mikstura(Ś)",
        "Szkatułka Wodza Orków",
        "Jakaś Tam Maska",
        "Jakaś Tam Bransoleta",
        "Pamiętka Po Demonie",
        "Miedziany Naszyjnik",
        "Normalna Księga Misji"
    ];
    
    const awardsImgLevel = [
        "1_0",
        "1_1",
        "1_2",
        "1_3",
        "1_4",
        "1_5",
        "1_6",
        "1_7",
        "1_8",
        "1_9",
        "1_10",
        "1_11",
        "1_12",
        "1_13",
        "1_14",
        "1_15"
    ];
    
    if(number >= 0 && number <= 1){
        award = awardsLevel[0];
        awardImg = awardsImgLevel[0];
    }else if(number > 1 && number <= 3){
        time = time + 100;
        award = awardsLevel[1];
        awardImg = awardsImgLevel[1];
    }else if(number > 3 && number <= 9){
        time = time + 200;
        award = awardsLevel[2];
        awardImg = awardsImgLevel[2];
    }else if(number > 9 && number <= 13){
        time = time + 300;
        award = awardsLevel[3];
        awardImg = awardsImgLevel[3];
    }else if(number > 13 && number <= 20){
        time = time + 400;
        award = awardsLevel[4];
        awardImg = awardsImgLevel[4];
    }else if(number > 20 && number <= 23){
        time = time + 500;
        award = awardsLevel[5];
        awardImg = awardsImgLevel[5];
    }else if(number > 23 && number <= 30){
        time = time + 600;
        award = awardsLevel[6];
        awardImg = awardsImgLevel[6];
    }else if(number > 30 && number <= 36){
        time = time + 700;
        award = awardsLevel[7];
        awardImg = awardsImgLevel[7];
    }else if(number > 36 && number <= 43){
        time = time + 800;
        award = awardsLevel[8];
        awardImg = awardsImgLevel[8];
    }else if(number > 43 && number <= 50){
        time = time + 900;
        award = awardsLevel[9];
        awardImg = awardsImgLevel[9];
    }else if(number > 50 && number <= 55){
        time = time + 1000;
        award = awardsLevel[10];
        awardImg = awardsImgLevel[10];
    }else if(number > 55 && number <= 60){
        time = time + 1100;
        award = awardsLevel[11];
        awardImg = awardsImgLevel[11];
    }else if(number > 60 && number <= 70){
        time = time + 1200;
        award = awardsLevel[12];
        awardImg = awardsImgLevel[12];
    }else if(number > 70 && number <= 80){
        time = time + 1300;
        award = awardsLevel[13];
        awardImg = awardsImgLevel[13];
    }else if(number > 80 && number <= 90){
        time = time + 1400;
        award = awardsLevel[14];
        awardImg = awardsImgLevel[14];
    }else if(number > 90 && number <= 100){
        time = time + 1500;
        award = awardsLevel[15];
        awardImg = awardsImgLevel[15];
    }else{
        console.log("Błąd");
    };
    
    return award, awardImg;
}


function level2(number) {
    
    const awardsLevel = [
        "Biała Perła",
        "Skóra Niedźwiedzia +",
        "Krwawa Perła",
        "Żółć Niedźwiedzia",
        "Czarny Uniform",
        "Sztabka Złota",
        "Złota Bransoleta",
        "Marmur Polimorfii",
        "Kwiat Kaki",
        "Czerwona Mikstura(Ś)",
        "Szkatułka Wodza Orków",
        "Jakaś Tam Maska",
        "Jakaś Tam Bransoleta",
        "Pamiętka Po Demonie",
        "Miedziany Naszyjnik",
        "Normalna Księga Misji"
    ];
    
    const awardsImgLevel = [
        "2_0",
        "2_1",
        "2_2",
        "2_3",
        "2_4",
        "2_5",
        "2_6",
        "2_7",
        "2_8",
        "2_9",
        "2_10",
        "2_11",
        "2_12",
        "2_13",
        "2_14",
        "2_15"
    ];
    
    if(number >= 0 && number <= 1){
        award = awardsLevel[0];
        awardImg = awardsImgLevel[0];
    }else if(number > 1 && number <= 3){
        time = time + 100;
        award = awardsLevel[1];
        awardImg = awardsImgLevel[1];
    }else if(number > 3 && number <= 9){
        time = time + 200;
        award = awardsLevel[2];
        awardImg = awardsImgLevel[2];
    }else if(number > 9 && number <= 13){
        time = time + 300;
        award = awardsLevel[3];
        awardImg = awardsImgLevel[3];
    }else if(number > 13 && number <= 20){
        time = time + 400;
        award = awardsLevel[4];
        awardImg = awardsImgLevel[4];
    }else if(number > 20 && number <= 23){
        time = time + 500;
        award = awardsLevel[5];
        awardImg = awardsImgLevel[5];
    }else if(number > 23 && number <= 30){
        time = time + 600;
        award = awardsLevel[6];
        awardImg = awardsImgLevel[6];
    }else if(number > 30 && number <= 36){
        time = time + 700;
        award = awardsLevel[7];
        awardImg = awardsImgLevel[7];
    }else if(number > 36 && number <= 43){
        time = time + 800;
        award = awardsLevel[8];
        awardImg = awardsImgLevel[8];
    }else if(number > 43 && number <= 50){
        time = time + 900;
        award = awardsLevel[9];
        awardImg = awardsImgLevel[9];
    }else if(number > 50 && number <= 55){
        time = time + 1000;
        award = awardsLevel[10];
        awardImg = awardsImgLevel[10];
    }else if(number > 55 && number <= 60){
        time = time + 1100;
        award = awardsLevel[11];
        awardImg = awardsImgLevel[11];
    }else if(number > 60 && number <= 70){
        time = time + 1200;
        award = awardsLevel[12];
        awardImg = awardsImgLevel[12];
    }else if(number > 70 && number <= 80){
        time = time + 1300;
        award = awardsLevel[13];
        awardImg = awardsImgLevel[13];
    }else if(number > 80 && number <= 90){
        time = time + 1400;
        award = awardsLevel[14];
        awardImg = awardsImgLevel[14];
    }else if(number > 90 && number <= 100){
        time = time + 1500;
        award = awardsLevel[15];
        awardImg = awardsImgLevel[15];
    }else{
        console.log("Błąd");
    };
    
    return award, awardImg;;
}

function level3(number) {
    
    const awardsLevel = [
        "Biała Perła",
        "Skóra Niedźwiedzia +",
        "Krwawa Perła",
        "Żółć Niedźwiedzia",
        "Czarny Uniform",
        "Sztabka Złota",
        "Złota Bransoleta",
        "Marmur Polimorfii",
        "Kwiat Kaki",
        "Czerwona Mikstura(Ś)",
        "Szkatułka Wodza Orków",
        "Jakaś Tam Maska",
        "Jakaś Tam Bransoleta",
        "Pamiętka Po Demonie",
        "Miedziany Naszyjnik",
        "Normalna Księga Misji"
    ];
    
    const awardsImgLevel = [
        "3_0",
        "3_1",
        "3_2",
        "3_3",
        "3_4",
        "3_5",
        "3_6",
        "3_7",
        "3_8",
        "3_9",
        "3_10",
        "3_11",
        "3_12",
        "3_13",
        "3_14",
        "3_15"
    ];
    
    if(number >= 0 && number <= 1){
        award = awardsLevel[0];
    }else if(number > 1 && number <= 3){
        time = time + 100;
        award = awardsLevel[1];
    }else if(number > 3 && number <= 9){
        time = time + 200;
        award = awardsLevel[2];
    }else if(number > 9 && number <= 13){
        time = time + 300;
        award = awardsLevel[3];
    }else if(number > 13 && number <= 20){
        time = time + 400;
        award = awardsLevel[4];
    }else if(number > 20 && number <= 23){
        time = time + 500;
        award = awardsLevel[5];
    }else if(number > 23 && number <= 30){
        time = time + 600;
        award = awardsLevel[6];
    }else if(number > 30 && number <= 36){
        time = time + 700;
        award = awardsLevel[7];
    }else if(number > 36 && number <= 43){
        time = time + 800;
        award = awardsLevel[8];
    }else if(number > 43 && number <= 50){
        time = time + 900;
        award = awardsLevel[9];
    }else if(number > 50 && number <= 55){
        time = time + 1000;
        award = awardsLevel[10];
    }else if(number > 55 && number <= 60){
        time = time + 1100;
        award = awardsLevel[11];
    }else if(number > 60 && number <= 70){
        time = time + 1200;
        award = awardsLevel[12];
    }else if(number > 70 && number <= 80){
        time = time + 1300;
        award = awardsLevel[13];
    }else if(number > 80 && number <= 90){
        time = time + 1400;
        award = awardsLevel[14];
    }else if(number > 90 && number <= 100){
        time = time + 1500;
        award = awardsLevel[15];
    }else{
        console.log("Błąd");
    };
    
    return award, awardImg;;
}

function level4(number) {
    
    const awardsLevel = [
        "Biała Perła",
        "Skóra Niedźwiedzia +",
        "Krwawa Perła",
        "Żółć Niedźwiedzia",
        "Czarny Uniform",
        "Sztabka Złota",
        "Złota Bransoleta",
        "Marmur Polimorfii",
        "Kwiat Kaki",
        "Czerwona Mikstura(Ś)",
        "Szkatułka Wodza Orków",
        "Jakaś Tam Maska",
        "Jakaś Tam Bransoleta",
        "Pamiętka Po Demonie",
        "Miedziany Naszyjnik",
        "Normalna Księga Misji"
    ];
    
    const awardsImgLevel = [
        "4_0",
        "4_1",
        "4_2",
        "4_3",
        "4_4",
        "4_5",
        "4_6",
        "4_7",
        "4_8",
        "4_9",
        "4_10",
        "4_11",
        "4_12",
        "4_13",
        "4_14",
        "4_15"
    ];
    
    if(number >= 0 && number <= 1){
        award = awardsLevel[0];
    }else if(number > 1 && number <= 3){
        time = time + 100;
        award = awardsLevel[1];
    }else if(number > 3 && number <= 9){
        time = time + 200;
        award = awardsLevel[2];
    }else if(number > 9 && number <= 13){
        time = time + 300;
        award = awardsLevel[3];
    }else if(number > 13 && number <= 20){
        time = time + 400;
        award = awardsLevel[4];
    }else if(number > 20 && number <= 23){
        time = time + 500;
        award = awardsLevel[5];
    }else if(number > 23 && number <= 30){
        time = time + 600;
        award = awardsLevel[6];
    }else if(number > 30 && number <= 36){
        time = time + 700;
        award = awardsLevel[7];
    }else if(number > 36 && number <= 43){
        time = time + 800;
        award = awardsLevel[8];
    }else if(number > 43 && number <= 50){
        time = time + 900;
        award = awardsLevel[9];
    }else if(number > 50 && number <= 55){
        time = time + 1000;
        award = awardsLevel[10];
    }else if(number > 55 && number <= 60){
        time = time + 1100;
        award = awardsLevel[11];
    }else if(number > 60 && number <= 70){
        time = time + 1200;
        award = awardsLevel[12];
    }else if(number > 70 && number <= 80){
        time = time + 1300;
        award = awardsLevel[13];
    }else if(number > 80 && number <= 90){
        time = time + 1400;
        award = awardsLevel[14];
    }else if(number > 90 && number <= 100){
        time = time + 1500;
        award = awardsLevel[15];
    }else{
        console.log("Błąd");
    };
    
    return award, awardImg;;
}

function level5(number) {
    
    const awardsLevel = [
        "Biała Perła",
        "Skóra Niedźwiedzia +",
        "Krwawa Perła",
        "Żółć Niedźwiedzia",
        "Czarny Uniform",
        "Sztabka Złota",
        "Złota Bransoleta",
        "Marmur Polimorfii",
        "Kwiat Kaki",
        "Czerwona Mikstura(Ś)",
        "Szkatułka Wodza Orków",
        "Jakaś Tam Maska",
        "Jakaś Tam Bransoleta",
        "Pamiętka Po Demonie",
        "Miedziany Naszyjnik",
        "Normalna Księga Misji"
    ];
    
    const awardsImgLevel = [
        "5_0",
        "5_1",
        "5_2",
        "5_3",
        "5_4",
        "5_5",
        "5_6",
        "5_7",
        "5_8",
        "5_9",
        "5_10",
        "5_11",
        "5_12",
        "5_13",
        "5_14",
        "5_15"
    ];
    
    if(number >= 0 && number <= 1){
        award = awardsLevel[0];
    }else if(number > 1 && number <= 3){
        time = time + 100;
        award = awardsLevel[1];
    }else if(number > 3 && number <= 9){
        time = time + 200;
        award = awardsLevel[2];
    }else if(number > 9 && number <= 13){
        time = time + 300;
        award = awardsLevel[3];
    }else if(number > 13 && number <= 20){
        time = time + 400;
        award = awardsLevel[4];
    }else if(number > 20 && number <= 23){
        time = time + 500;
        award = awardsLevel[5];
    }else if(number > 23 && number <= 30){
        time = time + 600;
        award = awardsLevel[6];
    }else if(number > 30 && number <= 36){
        time = time + 700;
        award = awardsLevel[7];
    }else if(number > 36 && number <= 43){
        time = time + 800;
        award = awardsLevel[8];
    }else if(number > 43 && number <= 50){
        time = time + 900;
        award = awardsLevel[9];
    }else if(number > 50 && number <= 55){
        time = time + 1000;
        award = awardsLevel[10];
    }else if(number > 55 && number <= 60){
        time = time + 1100;
        award = awardsLevel[11];
    }else if(number > 60 && number <= 70){
        time = time + 1200;
        award = awardsLevel[12];
    }else if(number > 70 && number <= 80){
        time = time + 1300;
        award = awardsLevel[13];
    }else if(number > 80 && number <= 90){
        time = time + 1400;
        award = awardsLevel[14];
    }else if(number > 90 && number <= 100){
        time = time + 1500;
        award = awardsLevel[15];
    }else{
        console.log("Błąd");
    };
    
    return award, awardImg;;
}



















