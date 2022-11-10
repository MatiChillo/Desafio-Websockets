const socket = io();

let messages = [];

let products = [];

function updateMessages( messages ) {
    
    let messageToList = '';

    var now = new Date().toLocaleString();

    messages.forEach( i => {

        messageToList += `<p>${i.email} <time> [${now}]</time><data> ${i.message}</data></p>`;

    });

    document.querySelector( '#messageList' ).innerHTML = messageToList;

}

function sendNewMessage() {

    const email = document.querySelector( '#email' ).value;
    const message = document.querySelector( '#message' ).value;

    if ( !message || !email ) {

        alert("Están faltando datos");

        return;

    }

    const messageObject = {

        email,
        message

    };

    socket.emit('NEW_MESSAGE_CLI', messageObject);

    document.querySelector( '#message' ).value = '';

}

function sendNewProduct() {

    const name = document.querySelector( '#name' ).value;
    const price = document.querySelector( '#price' ).value;
    const photo = document.querySelector( '#photo' ).value;

    const productObject = {

        name,
        price,
        photo

    };

    socket.emit('NEW_PRODUCT_CLI', productObject);

}

function updateProducts( products ) {
    
    let productToList = document.querySelector('#productList');

    products.forEach( i => {

        //productToList += `<td>${i.name}</td> <td>${i.price}</td> <td>${i.photo}</td>`;

        const tr = document.createElement('tr');

        tr.innerHTML = `<tr><td>${i.name}</td> <td>${i.price}</td> <td><img src=${i.photo} alt="" height=50 width=50></img></td></tr>`;

        productToList.appendChild(tr);


    });

}

socket.on('NEW_MESSAGE', data => {

    messages.push( data );

    updateMessages(messages);

});

socket.on('NEW_PRODUCT', data => {

    products.push( data );

    updateProducts(products);

});

socket.on('UPDATE_PRODUCT', data => {

    testingProducts = data;

    updateProducts( data );

});

socket.on('UPDATE_DATA', data => {

    messages = data;

    updateMessages( data );

});