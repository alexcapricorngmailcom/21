// Разработать приложение для конвертации между единицами измерения расстояния с поддержкой метрической 
// и имперской систем мер. Соотношения для конвертации вы можете взять из таблицы
// (https://en.wikipedia.org/wiki/Imperial_and_US_customary_measurement_systems#Units_of_length). 
// По умолчанию, приложение должно распознавать метры (“m”), сантиметры (“cm”), дюймы (“in”) и футы (“ft”), 
// и поддерживать конвертацию между любыми единицами.

// Также необходимо реализовать возможность расширять список поддерживаемых единиц путем задания правил 
// конвертации посредством объектов. Формат объекта - на ваше усмотрение. В качестве примера, расширьте 
// ваше приложение добавив в объект значения для миллиметров (“mm”), ярдов (“yd”), и километров (“km”).

// Данные которые будут поступать на конвертацию должны расстояние заданное для конвертации (distance) 
// со значением (value) и шкалой (unit), a также обозначение единицы для шкалы, в которую должна быть 
// произведена конвертация (convert_to). Например:
// {distance: {unit: m, value: 0.5}, convert_to: 'ft'}

// Это значит, что та функция которая будет заниматься конвертацией будет принимать объект подобной структуры 
// для работы с ним. И возвращать Объект в формате, содержащий полученное значение расстояния, округленное до 
// сотых, а также обозначение соответствующей единицы измерения, например:
// {unit: 'ft', value: 1.64} 

// let example = {distance: {unit: 'm', value: 0.5}, convert_to: 'ft'};
// appConw.calc(example); // {unit: ft, value: 1.64}


// P.S. Интерфейс значения не имеет, делайте как хотите, можете даже не оформлять "эстетично". Важен здесь 
// именно результат. // Задание сложное, поэтому задавайте вопросы, если будут.

const SI = {
    m: 1,
    cm: 0.01,
    in: 0.0254,
    ft: 0.3048,

    // mm: 0.001,
    // km: 1000,
    // yd: 0.9144
};


const appConw = {
    convertData: {
        distance: {unit: 'cm', value: 0}, 
        convert_to: 'm'
    },

    calc(data) {
        const slaveInput = document.querySelector('.slaveInput');
        
        let result = data.distance.value * SI[data.distance.unit];

        if (!(data.convert_to == 'm')) {
            result = result / SI[data.convert_to];
        }

        result = Math.round(result * 100) / 100;
        
        slaveInput.setAttribute('value', result);
        return {unit: data.convert_to, value: result};
    },

};

const input = document.querySelector('.mainInput');

input.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = target.value;

    appConw.convertData.distance.value = value;
});

const mainSelect = document.querySelector('.mainSelect');

mainSelect.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = target.value;

    appConw.convertData.distance.unit = value;

});

const convertToSelect = document.querySelector('.convertToSelect');

convertToSelect.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = target.value;

    appConw.convertData.convert_to = value;
});

const convertBtn = document.querySelector('.convertor-btn');

convertBtn.addEventListener('click', event => {
    console.log(appConw.calc(appConw.convertData));
});

// part2 addName, addValue, addBtn

const arr = [];

const addName = document.querySelector('.convertor-input__addName');

addName.addEventListener('input', event => {
    const target = event.currentTarget;
    const name = target.value;

    arr[0] = name;
});

const addValue = document.querySelector('.convertor-input__addValue');

addValue.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = target.value;

    arr[1] = value;
});

const addBtn = document.querySelector('.convertor-btn__addBtn');

addBtn.addEventListener('click', event => {
    SI[arr[0]] = parseFloat(arr[1]);
});