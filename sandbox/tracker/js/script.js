const btnAddNew = document.getElementById('btnAddNew');
const addNewItemForm = document.getElementById('addNewItem');
const ftDate = document.getElementById('ftDate');
const ftFood = document.getElementById('ftFood');
const ftFibre = document.getElementById('ftFibre');
const formSubmit = document.getElementById('ftSubmit');
const todaysTotalFibre = document.getElementById('todaysTotalFibre');

btnTodayTotal.addEventListener('click', () => UI.hideShow(todayTotal));
btnAddNew.addEventListener('click', () => UI.hideShow(addNew));
btnSeeHistory.addEventListener('click', () => UI.hideShow(seeResults));

ftDate.valueAsDate = new Date();

const lsFTData = JSON.parse(localStorage.getItem('fibreTrackerData'));
let ftData = lsFTData !== null ? lsFTData : [];
//    let ftData = [];

formSubmit.addEventListener('click', () => {
    checkForm();
})

function checkForm() {
    let formValid = true;
    ftFood.classList.remove('error');
    ftFibre.classList.remove('error');

    //Check form fields
    if (ftFood.value.trim() === '') {
        ftFood.classList.add('error');
        formValid = false;
    }
    if (ftFibre.value.trim() === '') {
        ftFibre.classList.add('error');
        formValid = false;
    }
    if (formValid === true) {
        submitForm();
        ftFood.value = '';
        ftFibre.value = '';
    }
}

function submitForm() {
    const newInput = {
        date: ftDate.value,
        food: ftFood.value,
        fibre: +ftFibre.value,
        id: oData.generateID()
    }
    ftData.push(newInput)
    oData.updateLocalStorage();
    init();
}

let oData = {
    dataByDate: () => {
        let days = {};
        ftData.forEach(function (val) {
            var date = val.date;
            if (date in days) {
                days[date].push({
                    'food': val.food,
                    'fibre': val.fibre
                });
            } else {
                days[date] = new Array({
                    'food': val.food,
                    'fibre': val.fibre
                });
            }
        });
        return days;
    },
    removeFood: (id) => {
        ftData = ftData.filter(food => food.id !== id);
        oData.updateLocalStorage();
        init();
    },
    updateLocalStorage: () => {
        localStorage.setItem('fibreTrackerData', JSON.stringify(ftData));
    },
    generateID: () => {
        return Math.floor(Math.random() * 100000000)
    }
}

let UI = {
    createWeeklyTable: () => {
        const dataByDateArr = Object.entries(oData.dataByDate());
        const reversedData = dataByDateArr.reverse();
        let dailyTotals = [];
        reversedData.forEach(([key, value]) => {
            let totalFibre = 0;
            value.forEach(food => {
                totalFibre += +food.fibre;
            });
            dailyTotals.push({
                'date': key,
                'fibre': totalFibre
            })
        });

        let ele = '';
        dailyTotals.forEach(dailyTotal => {
            ele += `
                <tr>
                    <td>${dailyTotal.date}</td>
                    <td>${dailyTotal.fibre.toFixed(1)}</td>
                    <td>${dailyTotal.fibre > 21 ? 'Yes' : 'No'}</td>
                </tr>
            `
        });
        document.querySelector('#seeResults tbody').innerHTML = ele;
    },
    createFoodTable: () => {
        const today = oDates.getFullDate();
        const todaysData = ftData.filter(food => food.date == today);
        let ele = '';
        let totalFibre = 0
        todaysData.forEach(food => {
            ele += `
                <tr><td>${food.food}</td><td>${food.fibre}</td>
                <td><button class="delete-btn" onclick="oData.removeFood(${food.id})">x</button></td>
                </tr>
            `
            totalFibre += +food.fibre;
        });
        ele += `
            <tr><td>Total fibre</td><td>${totalFibre.toFixed(1)}</td><td></td></tr>
        `
        document.querySelector('#todaysResults tbody').innerHTML = ele;
    },
    hideShow: (toShow) => {
        const sections = document.querySelectorAll('.sitePage');
        sections.forEach(section => {
            section.classList.add('hide');
        });
        toShow.classList.remove('hide')
    }
}


let oDates = {
    getFullDate: function () {
        let today = new Date();
        let fdYear = today.getFullYear();
        let fdMonth = ("0" + (today.getMonth() + 1)).slice(-2);
        let fdDay = today.getDate();
        return `${fdYear}-${fdMonth}-${fdDay}`
    },
    uniqueDates: () => {
        const unique = [...new Set(ftData.map(item => item.date))];
        return unique;
    }

}

function init() {
    UI.createFoodTable();
    UI.createWeeklyTable();
}

init();