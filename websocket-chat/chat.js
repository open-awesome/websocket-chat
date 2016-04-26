/**
* Executed when the page has finished loading.
*/
window.onload = function () {

    // Create a reference for the required DOM elements.
    var textView = document.getElementById("text-view");
    var buttonSend = document.getElementById("send-button");
    var buttonStop = document.getElementById("stop-button");
    var label = document.getElementById("status-label");

    // Connect to the WebSocket server!
    var socket = new WebSocket("ws://echo.websocket.org");

    /**
    * WebSocket onopen event.
    */
    socket.onopen = function (event) {
        label.innerHTML = "Conexão OK";
    }

    /**
    * WebSocket onmessage event.
    */
    socket.onmessage = function (event) {
        if (typeof event.data === "string") {
            // Display message.
            label.innerHTML = label.innerHTML + "<br />Servidor: <strong>" + event.data + "</strong>";
        }
    }

    /**
    * WebSocket onclose event.
    */
    socket.onclose = function (event) {
        var code = event.code;
        var reason = event.reason;
        var wasClean = event.wasClean;

        if (wasClean) {
            label.innerHTML = "Conexão encerrada.";
        }
        else {
            label.innerHTML = "Conexão encerrada com a mensagem: " + reason + " (Code: " + code + ")";
        }
    }

    /**
    * WebSocket onerror event.
    */
    socket.onerror = function (event) {
        label.innerHTML = "Erro: " + event;
    }

    /**
    * Disconnect and close the connection.
    */
    buttonStop.onclick = function (event) {
        if (socket.readyState == WebSocket.OPEN) {
            socket.close();
        }
    }

    /**
    * Send the message and empty the text field.
    */
    buttonSend.onclick = function (event) {
        sendMessage();
    }

    /**
    * Send the message and empty the text field.
    */
    textView.onkeypress = function (event) {
        if (event.keyCode == 13) {
            sendMessage();
        }
    }

    function sendMessage() {
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(textView.value);

            label.innerHTML = label.innerHTML + "<br />Você: <strong>" + textView.value + "</strong>";
            textView.value = "";
        }
    }
}
