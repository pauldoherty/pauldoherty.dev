const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showAddTopicBtn = document.getElementById('show-add-topic');
const hideAddTopicBtn = document.getElementById('hide-add-topic');
const showAddCardBtn = document.getElementById('show-add-card');
const hideAddCardBtn = document.getElementById('hide-add-card');
const newTopicEl = document.getElementById('new-topic');
const addTopicBtn = document.getElementById('add-topic');
const chooseTopicEl = document.getElementById('choose-topic');
const topicEl = document.getElementById('topic');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addTopicContainer = document.getElementById('add-topic-container');
const addCardContainer = document.getElementById('add-card-container');

let currentActiveCard = 0;

const cardsEl = [];

const topicsData = getTopicsData();
const cardsData = getCardsData();

function createCards(data) {
    data.forEach((data, index) => createCard(data, index))
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index===0) {
        card.classList.add('active');
    }
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}

function updateCurrentText() {
    currentEl.innerText = ` ${ currentActiveCard + 1} / ${ cardsEl.length }`;
}

function getTopicsData() {
    let topics = JSON.parse(localStorage.getItem('topics'));
    if (topics===null) {
        localStorage.setItem('topics', JSON.stringify([{'topic':'General'}]));
        topics = JSON.parse(localStorage.getItem('topics'));
    }
    return topics;
}

function setTopicsData(cards) {
    localStorage.setItem('topics', JSON.stringify(cards));
    window.location.reload();
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

function createTopicDropdown(topicsData, elementToFill) {
    topicsData.forEach((data, index) => {
        const option = document.createElement('option');
        if (index===0) {option.setAttribute('selected', 'selected')};
        option.setAttribute('value', data.topic);
        option.innerText = data.topic;
        elementToFill.appendChild(option);
    })
}

createCards(cardsData);
createTopicDropdown(topicsData, topicEl);
createTopicDropdown(topicsData, chooseTopicEl);

nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard+1;

    if(currentActiveCard > cardsEl.length -1) {
        currentActiveCard = cardsEl.length -1;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})

prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard-1;
    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})

showAddTopicBtn.addEventListener('click', () => addTopicContainer.classList.add('show'));
hideAddTopicBtn.addEventListener('click', () => addTopicContainer.classList.remove('show'));

showAddCardBtn.addEventListener('click', () => addCardContainer.classList.add('show'));
hideAddCardBtn.addEventListener('click', () => addCardContainer.classList.remove('show'));

addTopicBtn.addEventListener('click', () =>{
    const topic = newTopicEl.value;

    if (topic.trim()) {
        const newTopic = { topic }
        newTopicEl.value = '';
        addCardContainer.classList.removecard-('show');
        topicsData.push(newTopic);
        setTopicsData(topicsData);
    }
})

addCardBtn.addEventListener('click', () => {
    const topic = topicEl.value;
    const question = questionEl.value;
    const answer = answerEl.value;

    if(question.trim() && answer.trim()) {
        const newCard = { topic, question, answer }

        createCard(newCard)

        questionEl.value = '';
        answerEl.value = '';

        addCardContainer.classList.removecard-('show');
        cardsData.push(newCard);

        setCardsData(cardsData);
    }
});

chooseTopicEl.addEventListener('change', e => {
    let filterCardsData = cardsData;
    if (event.target.value!=='General') {
        filterCardsData = cardsData.filter(card => card.topic === e.target.value)
    }
    cardsContainer.innerHTML = '';
    cardsEl.splice(0, cardsEl.length);
    createCards(filterCardsData);
})

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('cards');
    cardsContainer.innerHTML = '';
    window.location.reload();
})