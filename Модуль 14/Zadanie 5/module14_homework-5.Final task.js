const btnNode = document.querySelector('.j-btn-request');
const pageNode = document.querySelector('.input1');
const limitNode = document.querySelector('.input2');
const resultNode = document.querySelector('.j-result');

function check(number) {
    var data = false;

    if (number > 0 && number < 11) {
        data = true;
    }

    return data;
}

function createQueue(data) {
    var list = '';

    for (var key in data) {
        const imgUrl = data[key]['download_url'];
        const imgAuthor = data[key]['author'];
        const imgHTML = `<div class="card"><img src="${imgUrl}" class="card-image"/><p>${imgAuthor}</p></div>`;
        list += imgHTML;
    }

    resultNode.innerHTML = list;
}

btnNode.addEventListener('click', () => {
    var userPage = pageNode.value;
    var userLimit = limitNode.value;

    if (!check(userPage) && !check(userLimit)) {
        alert('Номер страницы и лимит вне диапазона от 1 до 10');
    }
    else if (!check(userPage)) {
        alert('Номер страницы вне диапазона от 1 до 10');
    }
    else if (!check(userLimit)) {
        alert('Лимит вне диапазона от 1 до 10');
    }
    else {
        const reqUrl = `https://picsum.photos/v2/list?page=${userPage}&limit=${userLimit}`;
        
        fetch(reqUrl)
            .then((response) => {
             
                const result = response.json();
                
                return result;
            })
            .then((data) => {
               
                createQueue(data);
            })
            .catch(() => { console.log('error') });
    }
});