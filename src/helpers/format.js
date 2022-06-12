import React from 'react'

function fmtDate(format, str) {
    if (isNaN(str)) return ''
    if (str == null) return ''
    if (str == '') return ''

    let a, jsdate = new Date(str)
    const pad = function (n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n
        } else {
            return n
        }
    }
    const txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const txt_ordin = {1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st"}
    const txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const f = {
        // Day
        d: function () {
            return pad(f.j(), 2)
        },
        D: function () {
            this.t = f.l()
            return this.t.substr(0, 3)
        },
        j: function () {
            return jsdate.getDate()
        },
        l: function () {
            return txt_weekdays[f.w()]
        },
        N: function () {
            return f.w() + 1
        },
        S: function () {
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
        },
        w: function () {
            return jsdate.getDay()
        },
        z: function () {
            return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
        },
        // Week
        W: function () {
            let a = f.z(), b = 364 + f.L() - a
            let nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1
            if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                return 1
            } else {
                if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31")
                    return fmtDate("W", Math.round(nd2.getTime() / 1000))
                } else {
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0)
                }
            }
        },
        // Month
        F: function () {
            return txt_months[f.n()]
        },
        m: function () {
            return pad(f.n(), 2)
        },
        M: function () {
            this.t = f.F()
            return this.t.substr(0, 3)
        },
        n: function () {
            return jsdate.getMonth() + 1
        },
        t: function () {
            let n
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L()
            } else {
                if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                    return 31
                } else {
                    return 30
                }
            }
        },
        // Year
        L: function () {
            let y = f.Y()
            return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
        },
        //o not supported yet
        Y: function () {
            return jsdate.getFullYear()
        },
        y: function () {
            return (jsdate.getFullYear() + "").slice(2)
        },
        // Time
        a: function () {
            return jsdate.getHours() > 11 ? "pm" : "am"
        },
        A: function () {
            return f.a().toUpperCase()
        },
        B: function () {
            // peter paul koch:
            let off = (jsdate.getTimezoneOffset() + 60) * 60
            let theSeconds = (jsdate.getHours() * 3600) +
                (jsdate.getMinutes() * 60) +
                jsdate.getSeconds() + off
            let beat = Math.floor(theSeconds / 86.4)
            if (beat > 1000) beat -= 1000
            if (beat < 0) beat += 1000
            if ((String(beat)).length == 1) beat = "00" + beat
            if ((String(beat)).length == 2) beat = "0" + beat
            return beat
        },
        g: function () {
            return jsdate.getHours() % 12 || 12
        },
        G: function () {
            return jsdate.getHours()
        },
        h: function () {
            return pad(f.g(), 2)
        },
        H: function () {
            return pad(jsdate.getHours(), 2)
        },
        i: function () {
            return pad(jsdate.getMinutes(), 2)
        },
        s: function () {
            return pad(jsdate.getSeconds(), 2)
        },
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: function () {
            let t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4)
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t
            return t
        },
        P: function () {
            let O = f.O()
            return (O.substr(0, 3) + ":" + O.substr(3, 2))
        },
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: function () {
            return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
        },
        //r not supported yet
        U: function () {
            return Math.round(jsdate.getTime() / 1000)
        }
    }

    return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
        let ret
        if (t != s) {
            // escaped
            ret = s
        } else if (f[s]) {
            // a date function exists
            ret = f[s]()
        } else {
            // nothing special
            ret = s
        }

        return ret
    })
}

function toMoney(n, decimals) {
    if (n === '') return ''
    if (n === null) return ''
    const decimal_sep = '.'
    const thousands_sep = ' '
    let c = isNaN(decimals) ? 2 : Math.abs(decimals) //if decimal is zero we must take it, it means user does not want to show any decimal
    let d = decimal_sep || '.' //if no decimal separetor is passed we use the comma as default decimal separator (we MUST use a decimal separator)
    /*
    according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
    the fastest way to check for not defined parameter is to use typeof value === 'undefined'
    rather than doing value === undefined.
    */
    let t = (typeof thousands_sep === 'undefined') ? ' ' : thousands_sep //if you don't want ot use a thousands separator you can pass empty string as thousands_sep value
    let sign = (n < 0) ? '-' : ''
    //extracting the absolute value of the integer part of the number and converting to string
    let i = parseInt(n = Math.abs(n).toFixed(c)) + ''
    let j
    j = ((j = i.length) > 3) ? j % 3 : 0
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
}

export function fullDate(s) {
    const D = new Date(s)
    return fmtDate("d/m/Y", D)
}

export function shortDate(s) {
    const D = new Date(s)
    return fmtDate("d/m/y", D)
}

export function shortestDate(s) {
    const D = new Date(s)
    return fmtDate("d/m", D)
}

export function fmtCardinal(n) {
    return toMoney(n, 0)
}

export function fmtCurrency(n) {
    return toMoney(n, 2)
}

export function fmtColorCardinal(n) {
    if (n < 0) {
        return <span style={{color: 'red'}}>{toMoney(n, 0)}</span>
    } else {
        return toMoney(n, 0)
    }
}

export function fmtColorCurrency(n) {
    if (n < 0) {
        return <span style={{color: 'red'}}>{toMoney(n, 2)}</span>
    } else {
        return toMoney(n, 2)
    }
}

export function fmtURL(url) {
    return <a href={url} target='_blank'>{url}</a>
}