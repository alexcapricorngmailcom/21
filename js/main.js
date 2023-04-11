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
        distance: {unit: 'cm', value: null}, 
        convert_to: 'm'
    },

    newUnit: {
        UnitName: '',
        UnitAbbr: '',
        UnitValue: null
    },

    calcResult: {
        unit: '', 
        value: null
    },

    calc(data) {
        const convertToInput = document.querySelector('[name="convertToInput"]');
        
        let result = data.distance.value * SI[data.distance.unit];

        if (!(data.convert_to == 'm')) {
            result = result / SI[data.convert_to];
        }

        result = Math.round(result * 100) / 100;
        
        convertToInput.setAttribute('value', result);
        
        this.calcResult.unit = data.convert_to;
        this.calcResult.value = result;
        
        return appConw.calcResult;
    },

    selectVisibility() {
        const distanceUnitSelect = document.querySelectorAll('[name=distanceUnitSelect] > option');
        const convertToUnitSelect = document.querySelectorAll('[name=convertToUnitSelect] > option');
    
        distanceUnitSelect.forEach(el => {
            el.classList.remove('convertor-option');

            if (el.value == this.convertData.convert_to) {
                el.classList.add('convertor-option');
            }
        });

        convertToUnitSelect.forEach(el => {
            el.classList.remove('convertor-option');

            if (el.value == this.convertData.distance.unit) {
                el.classList.add('convertor-option');
            }
        });
    },

};

const distanceValueInput = document.querySelector('[name=distanceValueInput]');

distanceValueInput.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = parseFloat(target.value);

    if (value || value == 0) {
        appConw.convertData.distance.value = value;
        distanceValueInput.value = value;
    } else {
        distanceValueInput.value = '';
    }
});

// уточнить про value == 0

const distanceUnitSelect = document.querySelector('[name=distanceUnitSelect]');

distanceUnitSelect.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = target.value;

    appConw.convertData.distance.unit = value;

    convertorBtn.click();

    appConw.selectVisibility();
    
});

const convertToUnitSelect = document.querySelector('[name=convertToUnitSelect]');

convertToUnitSelect.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = target.value;

    appConw.convertData.convert_to = value;

    convertorBtn.click();

    appConw.selectVisibility();
});

const convertorBtn = document.querySelector('.convertor-btn');

convertorBtn.addEventListener('click', event => {
    if (!appConw.convertData.distance.value) {
        alert('Введите значение в поле для конвертации');
    } else {
        console.log(appConw.calc(appConw.convertData));
    }
});

// part2: newUnitName, unitAbbr, newUnitValue, newUnitBtn

const newUnitName = document.querySelector('[name="newUnitName"]');

newUnitName.addEventListener('input', event => {
    const target = event.currentTarget;
    const name = target.value;

    appConw.newUnit.UnitName = name.trim();
});

const newUnitAbbr = document.querySelector('[name="newUnitAbbr"]');

newUnitAbbr.addEventListener('input', event => {
    newUnitAbbr.style.color = 'black';
    const target = event.currentTarget;
    const name = target.value;

    appConw.newUnit.UnitAbbr = name.trim();
});

const newUnitValue = document.querySelector('[name="newUnitValue"]');

newUnitValue.addEventListener('input', event => {
    const target = event.currentTarget;
    const value = parseFloat(target.value);

    if (value) {
        appConw.newUnit.UnitValue = value;
        newUnitValue.value = value;
    } else {
        newUnitValue.value = '';
    }
});

const newUnitBtn = document.querySelector('.newUnitBtn');

newUnitBtn.addEventListener('click', event => {

    if (!appConw.newUnit.UnitName || !appConw.newUnit.UnitAbbr || !appConw.newUnit.UnitValue) {
        alert('Все поля списка новой величины должны быть заполнены!');    
    } else {
        const keys = Object.keys(SI);
    
        const key = keys.find(el => el == appConw.newUnit.UnitAbbr); 
        
        if (key) {
            return alert(`Величина ${appConw.newUnit.UnitAbbr} уже присутствует в списке`), newUnitAbbr.style.color = 'red';
        }
        
        SI[appConw.newUnit.UnitAbbr] = parseFloat(appConw.newUnit.UnitValue);
        
        const select = document.querySelectorAll('.convertor-select');
        
        select.forEach(el => {
            const option = document.createElement('option');
            option.innerText = appConw.newUnit.UnitName;
            option.setAttribute('value', appConw.newUnit.UnitAbbr);
            el.append(option);
        });

        newUnitName.value = '';
        newUnitAbbr.value = '';
        newUnitValue.value = '';

        appConw.newUnit.UnitName = '';
        appConw.newUnit.UnitAbbr = '';
        appConw.newUnit.UnitValue = null;
    }
});