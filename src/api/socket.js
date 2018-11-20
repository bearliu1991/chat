import _io from 'socket.io-client'
let socket
let lockReconnect = false // 避免重复连接
let socketUrl = process.env.API_ROOT

function createSocket(url) {
    try {
        socket = _io(url, {autoConnect: false})
        socket.open()
        initEventHandle()
    } catch (e) {
        reconnect(url)
    }
}

// 心跳检测
var heartCheck = {
    timeout: 60000, // 60秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function() {
        var self = this;
        this.timeoutObj = setTimeout(function() {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            // onmessage拿到返回的心跳就说明连接正常
            socket.send("HeartBeat");
            // console.error("HeartBeat")
            self.serverTimeoutObj = setTimeout(function() { // 如果超过一定时间还没重置，说明后端主动断开了
                // console.error('后端主动断开')
                socket.close(); // 如果onclose会执行reconnect，我们执行socket.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, self.timeout)
    }
}

function initEventHandle() {
    socket.on('HeartBeat', function () {
        // heartCheck.reset().start()
    });
    socket.on('disconnect', function () {
        // console.error('disconnect')
        reconnect(socketUrl)
    });

    socket.on('reconnect_error', function () {
        // console.error('error')
    });
    socket.on('reconnect_failed', function () {
        console.error('reconnect_failed')
    });
    socket.on('reconnect', function () {
        // console.error('reconnect')
        heartCheck.reset().start()
    });
    socket.on('connect_timeout', function () {
        console.error('connect_timeout')
    });
    socket.on('connect', function () {
        // console.error('connect')
        heartCheck.reset().start()
    });
    socket.on('message', function (data) {
        console.error(data)
        heartCheck.reset().start()
    });
    socket.on('reconnect_attempt', function (data) {
        // console.error('reconnect_attempt')
    });
}

function reconnect(url) {
    if (lockReconnect) return
    lockReconnect = true
    // 没连接上会一直重连，设置延迟避免请求过多
    let timer = setTimeout(function () {
        socket.connect()
        clearTimeout(timer)
        // createSocket(url)
        lockReconnect = false
    }, 2000)
}

createSocket(socketUrl)
export default socket
