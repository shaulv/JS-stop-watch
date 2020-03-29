var stopWatch = (() => {
    function StopWatch(container) {
        StopWatch.prototype.templateHtml(container);
        StopWatch.prototype.setupEvents();
        StopWatch.prototype.dateObject = new Date();
        StopWatch.prototype.setClock('00', '00', '00');
    }
    StopWatch.prototype = {
        setupEvents: () => {
            StopWatch.prototype.DOM.getStartBtn().addEventListener("click", StopWatch.prototype.startClock);
            StopWatch.prototype.DOM.getStopBtn().addEventListener("click", StopWatch.prototype.stopClock);
            StopWatch.prototype.DOM.getResetBtn().addEventListener("click", StopWatch.prototype.resetClock);
        },
        startEventWorking: false,
        DOM: {
            getHr: () => document.querySelector(".clock__numbers .hours"),
            getMin: () => document.querySelector(".clock__numbers .minutes"),
            getSec: () => document.querySelector(".clock__numbers .seconds"),
            getStartBtn: () => document.getElementById("startClock"),
            getStopBtn: () => document.getElementById("stopClock"),
            getResetBtn: () => document.getElementById("resetClock")
        },
        dateObject: null,
        date: {
            getHr: () => {
                let hr = StopWatch.prototype.dateObject.getHours();
                return StopWatch.prototype.addZeroBefore(hr) + hr;
            },
            getMin: () => {
                let min = StopWatch.prototype.dateObject.getMinutes();
                return StopWatch.prototype.addZeroBefore(min) + min;
            },
            getSec: () => {
                let sec = StopWatch.prototype.dateObject.getSeconds();
                return StopWatch.prototype.addZeroBefore(sec) + sec;
            }
        },
        addZeroBefore: (timeNum) => timeNum < 10 ? '0' : '',
        templateHtml: (container) => {
            const html = '<section class="clock">' +
                '<div class="clock__wrapper">' +
                '<div class="clock__numbers">' +
                '<span class="hours">00</span>' +
                '</div>' +
                '<span class="clock__colon">:</span>' +
                '<div class="clock__numbers">' +
                '<span class="minutes">00</span>' +
                '</div>' +
                '<span class="clock__colon">:</span>' +
                '<div class="clock__numbers">' +
                '<span class="seconds">00</span>' +
                '</div>' +
                '</div>' +
                '<div class="clock__buttons">' +
                '<div id="stopClock" class="stop">stop</div>' +
                '<div id="startClock" class="start">start</div>' +
                '</div>' +
                '<div id="resetClock" class="clock__reset">reset clock</div>' +
                '</section>'
            document.querySelector(container).insertAdjacentHTML('beforeend', html);
        },
        updateClockUI: () => {
            StopWatch.prototype.DOM.getHr().innerHTML = StopWatch.prototype.date.getHr();
            StopWatch.prototype.DOM.getMin().innerHTML = StopWatch.prototype.date.getMin();
            StopWatch.prototype.DOM.getSec().innerHTML = StopWatch.prototype.date.getSec();
        },
        setClock: (hr, min, sec) => {
            StopWatch.prototype.dateObject.setSeconds(sec);
            StopWatch.prototype.dateObject.setMinutes(min);
            StopWatch.prototype.dateObject.setHours(hr);
        },
        clockInterval: null,
        clockSeconds: 0,
        startClock: () => {
            if (!StopWatch.prototype.startEventWorking) {
                StopWatch.prototype.startEventWorking = true;
                StopWatch.prototype.clockInterval = setInterval(() => {
                    StopWatch.prototype.clockSeconds += 1;
                    StopWatch.prototype.dateObject.setSeconds(StopWatch.prototype.clockSeconds);
                    StopWatch.prototype.updateClockUI();
                }, 1000);
            }
        },
        stopClock: () => {
            clearInterval(StopWatch.prototype.clockInterval);
            StopWatch.prototype.startEventWorking = false;
        },
        resetClock: () => {
            StopWatch.prototype.stopClock();
            StopWatch.prototype.setClock('00', '00', '00');
            StopWatch.prototype.updateClockUI();
            StopWatch.prototype.startEventWorking = false;
            StopWatch.prototype.clockSeconds = 0;
        }
    }

    return {
        init: () => {
            let stopWatch = new StopWatch("main");
        }
    }
})();

stopWatch.init();