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
    mm: 0.001,
    cm: 0.01,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144
};

const convertData = {
    input1: undefined,
    select1: undefined,
    input2: undefined,
    select2: undefined,

    convert() {
        if (this.input1) {
            const result = SI[this.select1];
            const input2 = document.querySelector('[name = input2]');
            input2.setAttribute('value', result);
        } 

        if (this.input2) {
            const input1 = document.querySelector('[name = input1]');
            input1.setAttribute('value', 'значение');
        }
    
    }
};



const form = document.querySelector('.convertor');

const defaults = form.querySelectorAll('[name]');

defaults.forEach(el => {
    const name = el.name;
    const value = el.value;

    convertData[name] = value;
})

form.addEventListener('input', event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    convertData[name] = value;

    convertData.convert();
});


// let example = {distance: {unit: 'm', value: 0.5}, convert_to: 'ft'};



// let example = {distance: {unit: 'm', value: 0.5}, convert_to: 'ft'};
// appConw.calc(example); // {unit: ft, value: 1.64}
