const input = document.querySelector('input');                      
const button = document.querySelector('button');               

button.addEventListener('click', async function() {                     //Добавление обработчика click на кнопку button с помощью метода addEventListener, который вызывает ассинхроную функцию
  const strana_str = input.value;                                   //strana_str и присвоение ей значения из поля ввода input.
  const data = await krData(strana_str);                         //Вызов функции krData и получение значения из поля ввода input и передача его в функцию krData с помощью await.
  const maxClickCountStation = MaxClickCount(data);           //Получение объекта data из функции krData и передача его в функцию MaxClickCount для поиска радиостанции с наибольшим количеством кликов. (35, 42)
  try{
  if (maxClickCountStation) {                      // Попытка в блоке try.Если значение maxClickCountStation не равно null, то открывается новое окно браузера с url'ом из свойства homepage объекта maxClickCountStation.
    window.open(maxClickCountStation.homepage);
    const newWindow = window.open('/', 'example', 'width=600,height=400'); 
      newWindow.onload = function() {                   //Добавление метода onload на новое окно, который вызывает функцию.
        newWindow.document.write(`Радиостанция: ${maxClickCountStation.name} <br \/>ClickCount: ${maxClickCountStation.clickcount} `);
          const img = newWindow.document.createElement('img'); 
          img.classList.add('kartina'); 
          img.src = maxClickCountStation.favicon; 
          img.width = 80;
          img.height = 80;
          img.style.position = 'absolute';
          img.style.top = '50'; 
          img.style.left = '10'; 
          newWindow.document.body.appendChild(img);
    }
  }
  else {
    alert(`В стране "${strana_str}" нет радиостанций\nИли \nВы ввели число. `);        //Если значение maxClickCountStation равно null, то выводится сообщение об отсутствии радиостанций в указанной стране
  }
}
  catch (error) {                                    //В случае возникновения ошибки выводится сообщение об ошибке загрузки данных
    console.error(error);                             //для перехвата ошибок при выполнении запроса к API.
    alert(`Ошибка загрузки данных.`);
  }
});

async function krData(strana_str) {      //Объявление ассинхроной функции krData, которая получает данные о радиостанциях в определенной стране с помощью api fetch и возвращает объект station.
  const response = await fetch(`http://de1.api.radio-browser.info/json/stations/bycountry/${strana_str}`);
  const station = await response.json();      //Полученные данные преобразуются в формат JSON и возвращаются из функции (37,38)
  return station;
  
}

function MaxClickCount(data) {  //Создание функции MaxClickCount, которая принимает объект station и возвращает объект радиостанции с наибольшим количеством кликов.
  let maxClickCount = 0;
  let maxClickCountStation = null;
  for (const station of data) {
    if (station.clickcount > maxClickCount) {
      maxClickCount = station.clickcount;
      maxClickCountStation = station;
    }
  }                 //Возвращение найденной радиостанции в виде объекта. Если радиостанция не имеет кликов, возвращение null
  return maxClickCountStation;
}

krData("").then((station) => {
  console.log(station);
})
console.log(krData("Russian"));




