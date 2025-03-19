!function() {
    "use strict";
    class e extends React.Component {
        render() {
            return React.createElement("div", {
                className: "length-control"
            }, React.createElement("div", {
                id: this.props.titleID
            }, this.props.title), React.createElement("button", {
                className: "btn-level",
                id: this.props.minID,
                onClick: this.props.onClick,
                value: "-"
            }, React.createElement("i", {
                className: "fa fa-arrow-down fa-2x"
            })), React.createElement("div", {
                className: "btn-level",
                id: this.props.lengthID
            }, this.props.length), React.createElement("button", {
                className: "btn-level",
                id: this.props.addID,
                onClick: this.props.onClick,
                value: "+"
            }, React.createElement("i", {
                className: "fa fa-arrow-up fa-2x"
            })))
        }
    }
    class t extends React.Component {
        constructor(e) {
            super(e),
            this.state = {
                brkLength: 5,
                seshLength: 25,
                timerState: "stopped",
                timerType: "Session",
                timer: 1500,
                intervalID: "",
                alarmColor: {
                    color: "white"
                }
            },
            this.setBrkLength = this.setBrkLength.bind(this),
            this.setSeshLength = this.setSeshLength.bind(this),
            this.lengthControl = this.lengthControl.bind(this),
            this.timerControl = this.timerControl.bind(this),
            this.beginCountDown = this.beginCountDown.bind(this),
            this.decrementTimer = this.decrementTimer.bind(this),
            this.phaseControl = this.phaseControl.bind(this),
            this.warning = this.warning.bind(this),
            this.buzzer = this.buzzer.bind(this),
            this.switchTimer = this.switchTimer.bind(this),
            this.clockify = this.clockify.bind(this),
            this.reset = this.reset.bind(this)
        }
        setBrkLength(e) {
            this.lengthControl("brkLength", e.currentTarget.value, this.state.brkLength, "Session")
        }
        setSeshLength(e) {
            this.lengthControl("seshLength", e.currentTarget.value, this.state.seshLength, "Break")
        }
        lengthControl(e, t, s, i) {
            "running" !== this.state.timerState && (this.state.timerType === i ? "-" === t && 1 !== s ? this.setState({
                [e]: s - 1
            }) : "+" === t && 60 !== s && this.setState({
                [e]: s + 1
            }) : "-" === t && 1 !== s ? this.setState({
                [e]: s - 1,
                timer: 60 * s - 60
            }) : "+" === t && 60 !== s && this.setState({
                [e]: s + 1,
                timer: 60 * s + 60
            }))
        }
        timerControl() {
            "stopped" === this.state.timerState ? (this.beginCountDown(),
            this.setState({
                timerState: "running"
            })) : (this.setState({
                timerState: "stopped"
            }),
            this.state.intervalID && this.state.intervalID.cancel())
        }
        beginCountDown() {
            var e, t, s, i, a, r;
            this.setState({
                intervalID: (e = () => {
                    this.decrementTimer(),
                    this.phaseControl()
                }
                ,
                t = 1e3,
                i = (new Date).getTime() + t,
                a = null,
                r = function() {
                    return i += t,
                    a = setTimeout(r, i - (new Date).getTime()),
                    e()
                }
                ,
                s = function() {
                    return clearTimeout(a)
                }
                ,
                a = setTimeout(r, i - (new Date).getTime()),
                {
                    cancel: s
                })
            })
        }
        decrementTimer() {
            this.setState({
                timer: this.state.timer - 1
            })
        }
        phaseControl() {
            let e = this.state.timer;
            this.warning(e),
            this.buzzer(e),
            e < 0 && (this.state.intervalID && this.state.intervalID.cancel(),
            "Session" === this.state.timerType ? (this.beginCountDown(),
            this.switchTimer(60 * this.state.brkLength, "Break")) : (this.beginCountDown(),
            this.switchTimer(60 * this.state.seshLength, "Session")))
        }
        warning(e) {
            e < 61 ? this.setState({
                alarmColor: {
                    color: "#a50d0d"
                }
            }) : this.setState({
                alarmColor: {
                    color: "white"
                }
            })
        }
        buzzer(e) {
            0 === e && this.audioBeep.play()
        }
        switchTimer(e, t) {
            this.setState({
                timer: e,
                timerType: t,
                alarmColor: {
                    color: "white"
                }
            })
        }
        clockify() {
            if (this.state.timer < 0)
                return "00:00";
            let e = Math.floor(this.state.timer / 60)
              , t = this.state.timer - 60 * e;
            return t = t < 10 ? "0" + t : t,
            e = e < 10 ? "0" + e : e,
            e + ":" + t
        }
        reset() {
            this.setState({
                brkLength: 5,
                seshLength: 25,
                timerState: "stopped",
                timerType: "Session",
                timer: 1500,
                intervalID: "",
                alarmColor: {
                    color: "white"
                }
            }),
            this.state.intervalID && this.state.intervalID.cancel(),
            this.audioBeep.pause(),
            this.audioBeep.currentTime = 0
        }
        render() {
            return React.createElement("div", null, React.createElement("div", {
                className: "main-title"
            }, "25 + 5 Clock"), React.createElement(e, {
                addID: "break-increment",
                length: this.state.brkLength,
                lengthID: "break-length",
                minID: "break-decrement",
                onClick: this.setBrkLength,
                title: "Break Length",
                titleID: "break-label"
            }), React.createElement(e, {
                addID: "session-increment",
                length: this.state.seshLength,
                lengthID: "session-length",
                minID: "session-decrement",
                onClick: this.setSeshLength,
                title: "Session Length",
                titleID: "session-label"
            }), React.createElement("div", {
                className: "timer",
                style: this.state.alarmColor
            }, React.createElement("div", {
                className: "timer-wrapper"
            }, React.createElement("div", {
                id: "timer-label"
            }, this.state.timerType), React.createElement("div", {
                id: "time-left"
            }, this.clockify()))), React.createElement("div", {
                className: "timer-control"
            }, React.createElement("button", {
                id: "start_stop",
                onClick: this.timerControl
            }, React.createElement("i", {
                className: "fa fa-play fa-2x"
            }), React.createElement("i", {
                className: "fa fa-pause fa-2x"
            })), React.createElement("button", {
                id: "reset",
                onClick: this.reset
            }, React.createElement("i", {
                className: "fa fa-refresh fa-2x"
            }))), React.createElement("div", {
                className: "author"
            }, " ", "Designed and Coded by ", React.createElement("br", null), React.createElement("a", {
                href: "https://www.freecodecamp.org/Ashenafi_Bancha",
                target: "_blank",
                rel: "noreferrer"
            }, "Ashenafi Bancha")), React.createElement("audio", {
                id: "beep",
                preload: "auto",
                ref: e => {
                    this.audioBeep = e
                }
                ,
                src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
            }))
        }
    }
    ReactDOM.createRoot(document.getElementById("app")).render(React.createElement(t, null))
}();
