function onFail(error) {
    console.log(error);
}
function onSuccess(data) {
    const arr = data.split(/\n/);
    const headers = arr[0].split(',');

    const users = arr.slice(1).map(row => {
        const user = {};
        headers.forEach((header, index) => {
            user[header.trim()] = row.split(',')[index];
        });
        return user;
    })
    console.log(users);
}
const getData = async (onSuccess, onFail) => {
    try {
        const response = await fetch(
            './Site_list_New_Year_with_headers.csv'
        );

        if (!response.ok) {
            throw new Error('Не удалось получить данные');
        }

        onSuccess(await response.text());
    } catch (error) {
        onFail(error.message);
    }
};

getData(onSuccess, onFail)

const getUser = async (onSuccess, onFail) => {
    try {
        const response = await fetch('https://1f51-92-46-46-162.ngrok-free.app/api/send-phone', {
            method: 'POST',
            body: JSON.stringify({ phone: "77024015401" })
        });

        const result = await response.json();
        onSuccess(result)
    } catch(error) {
        onFail(error)
    }
}
getUser(onSuccess, onFail);

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => document.write(`IP пользователя: ${data.ip}`));

// Информация по апи
// Адрес - https://1f51-92-46-46-162.ngrok-free.app/api/send-phone

// Post запрос с телом json
// Параметр phone – нужно указать номер телефона с первой «7»
// Пример
// {
//     "phone": "77024015401"
// }


// В ответе придет
// Amount – количество очков
// Place – место в рейтинге
// Player_id – плейер айди

// {
//     "amount": 9540,
//     "place": 1,
//     "player_id": 368
// }


// Если номера нет в рейтинге придет ошибка
// {
//     "error": "Player not found"
// }


// Еще поставил проверку по ip, чтобы не перебирали
// 5 запросов за минуту = бан на 1 час
// Сейчас чтобы не мешать тестированию поставил 5000 запросов

// В ответе будет
// <!doctype html>
// <html lang=en>
// <title>429 Too Many Requests</title>
// <h1>Too Many Requests</h1>
// <p>Зайдите позже</p>

