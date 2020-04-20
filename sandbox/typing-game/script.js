const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
    'colourful','event','sweet','concern','fail','carpenter','delirious','sassy','stir','tow','yawn','large','soft','pickle','yarn','bag','giant','can','mine','ladybug','possible','ablaze','noise','fish','toe','muddle','recondite','shallow','long','whispering','own','root','excite','dear','kaput','tested','ignorant','tacit','hall','greedy','brash','box','scale','obtainable','whirl','argue','dance','rhyme','stocking','multiply','truculent','calendar','sister','sick','spiffy','sordid','relax','unique','festive','faulty','money','knowledgeable','wine','straw','suspend','shaky','juggle','faint','plan','eyes','calculating','twig','bare','deadpan','treat','moan','punishment','rely','shiny','welcome','regular','skip','knowing','medical','pumped','addicted','fix','flood','bath','probable','arithmetic','lighten','coherent','front','groovy','art','unruly','yielding','abusive','ocean','outrageous','bashful','massive','prick','tremble','pleasant','lean','coil','suspect','gullible','prepare','cup','knee','therapeutic','hot','spectacular','pipe','person','base','possess','stone','point','even','juicy','tenuous','eatable','planes','quaint','left','five','pets','abaft','post','crate','magenta','friend','steel','extra-large','resolute','sheep','satisfying','cuddly','itchy','wary','prose','accidental','hushed','tour','plough','wistful','ordinary','fancy','verse','unkempt','clammy','scarce','secretive','maniacal','play','slope','soda','black-and-white','jeans','maid','drab','material','questionable','tree','shaggy','eye','crime','familiar','busy','bow','flag','mom','advise','observe','reign','match','acoustic','well-to-do','adjustment','chivalrous','scrape','debonair','smash','kind','colour','absent','three','scandalous','prefer','low','basin','distance','choke','imported','womanly','itch'
];

let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score ++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time===0) {
        clearInterval(time);
        gameOver();
    }
}

function showHighScore(score) {
    const highScoreLevel = `highscore-${difficulty}`
    const difficultyHighScore = localStorage.getItem(highScoreLevel) !== null ? localStorage.getItem(highScoreLevel) : '';
    if (score>=difficultyHighScore) {
        localStorage.setItem(highScoreLevel, score);
        return(`<span class="new-high-score">Well done. You got a new highscore of ${score}!</span>`)
    } else {
        return(`The current high score for this level is ${difficultyHighScore}`);
    }
}

function gameOver() {
    const highScore = showHighScore(score);
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <p>${highScore}</p>
        <button onclick="window.location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value='';

        if(difficulty === 'hard') {
            time += 1;
        } else if(difficulty === 'medium') {
            time += 2;
        } else {
            time += 4;
        }
        updateTime();
    }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})
