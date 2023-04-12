/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var q, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);

function da(a, b) {
    if (b) a: {
        var c = ca;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}

function ea(a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a.throw(d)
    }
    return new Promise(function(d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
}

function t(a) {
    return ea(a())
}
da("Object.entries", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});

function fa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
}
da("Array.prototype.values", function(a) {
    return a ? a : function() {
        return fa(this, function(b, c) {
            return c
        })
    }
});
da("Array.prototype.includes", function(a) {
    return a ? a : function(b, c) {
        var d = this;
        d instanceof String && (d = String(d));
        var e = d.length;
        c = c || 0;
        for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0
        }
        return !1
    }
});
da("Object.values", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
        return c
    }
});
da("String.prototype.matchAll", function(a) {
    return a ? a : function(b) {
        if (b instanceof RegExp && !b.global) throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
        var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
            d = this,
            e = !1,
            f = {
                next: function() {
                    if (e) return {
                        value: void 0,
                        done: !0
                    };
                    var g = c.exec(d);
                    if (!g) return e = !0, {
                        value: void 0,
                        done: !0
                    };
                    "" === g[0] && (c.lastIndex += 1);
                    return {
                        value: g,
                        done: !1
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
});
da("Promise.prototype.finally", function(a) {
    return a ? a : function(b) {
        return this.then(function(c) {
            return Promise.resolve(b()).then(function() {
                return c
            })
        }, function(c) {
            return Promise.resolve(b()).then(function() {
                throw c;
            })
        })
    }
});
var v = this || self;

function x(a, b) {
    a = a.split(".");
    b = b || v;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], null == b) return null;
    return b
}

function ha() {}

function ia(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function ka(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function la(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? la = ia : la = ka;
    return la.apply(null, arguments)
}

function y(a, b) {
    a = a.split(".");
    var c = v;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
}

function ma(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Ca = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.Ta = function(d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g)
    }
};

function na(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, na);
    else {
        const c = Error().stack;
        c && (this.stack = c)
    }
    a && (this.message = String(a));
    void 0 !== b && (this.na = b)
}
ma(na, Error);
na.prototype.name = "CustomError";

function oa(a, b) {
    Array.prototype.forEach.call(a, b, void 0)
}

function pa(a, b) {
    return Array.prototype.map.call(a, b, void 0)
}

function qa(a, b) {
    for (let d = 1; d < arguments.length; d++) {
        const e = arguments[d];
        var c = typeof e;
        c = "object" != c ? c : e ? Array.isArray(e) ? "array" : c : "null";
        if ("array" == c || "object" == c && "number" == typeof e.length) {
            c = a.length || 0;
            const f = e.length || 0;
            a.length = c + f;
            for (let g = 0; g < f; g++) a[c + g] = e[g]
        } else a.push(e)
    }
};

function ra(a) {
    for (const b in a) return !1;
    return !0
}

function sa(a) {
    if (!a || "object" !== typeof a) return a;
    if ("function" === typeof a.clone) return a.clone();
    if ("undefined" !== typeof Map && a instanceof Map) return new Map(a);
    if ("undefined" !== typeof Set && a instanceof Set) return new Set(a);
    const b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length);
    for (const c in a) b[c] = sa(a[c]);
    return b
}
const ta = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function ua(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < ta.length; f++) c = ta[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function va() {}

function wa(a) {
    return new va(xa, a)
}
var xa = {};
wa("");
var ya = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};

function za() {
    var a = v.navigator;
    return a && (a = a.userAgent) ? a : ""
}

function A(a) {
    return -1 != za().indexOf(a)
};

function Aa() {
    return (A("Chrome") || A("CriOS")) && !A("Edge") || A("Silk")
};
var B = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Ba(a) {
    return a ? decodeURI(a) : a
}

function Ca(a, b, c) {
    if (Array.isArray(b))
        for (var d = 0; d < b.length; d++) Ca(a, String(b[d]), c);
    else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
}

function Da(a) {
    var b = [],
        c;
    for (c in a) Ca(c, a[c], b);
    return b.join("&")
};

function Ea(a, b) {
    return Error(`Invalid wire type: ${a} (at position ${b})`)
}

function Fa() {
    return Error("Failed to read varint, encoding is invalid.")
};

function Ga(a, b) {
    b = String.fromCharCode.apply(null, b);
    return null == a ? b : a + b
}
let Ha;
const Ia = "undefined" !== typeof TextDecoder;
!A("Android") || Aa();
Aa();
var Ja = A("Safari") && !(Aa() || A("Coast") || A("Opera") || A("Edge") || A("Edg/") || A("OPR") || A("Firefox") || A("FxiOS") || A("Silk") || A("Android")) && !(A("iPhone") && !A("iPod") && !A("iPad") || A("iPad") || A("iPod"));
var Ka = {},
    La = null;

function Ma(a, b) {
    void 0 === b && (b = 0);
    Na();
    b = Ka[b];
    const c = Array(Math.floor(a.length / 3)),
        d = b[64] || "";
    let e = 0,
        f = 0;
    for (; e < a.length - 2; e += 3) {
        var g = a[e],
            h = a[e + 1],
            k = a[e + 2],
            n = b[g >> 2];
        g = b[(g & 3) << 4 | h >> 4];
        h = b[(h & 15) << 2 | k >> 6];
        k = b[k & 63];
        c[f++] = "" + n + g + h + k
    }
    n = 0;
    k = d;
    switch (a.length - e) {
        case 2:
            n = a[e + 1], k = b[(n & 15) << 2] || d;
        case 1:
            a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | n >> 4] + k + d
    }
    return c.join("")
}

function Oa(a) {
    var b = a.length,
        c = 3 * b / 4;
    c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c),
        e = 0;
    Pa(a, function(f) {
        d[e++] = f
    });
    return e !== c ? d.subarray(0, e) : d
}

function Pa(a, b) {
    function c(k) {
        for (; d < a.length;) {
            var n = a.charAt(d++),
                l = La[n];
            if (null != l) return l;
            if (!/^[\s\xa0]*$/.test(n)) throw Error("Unknown base64 encoding at char: " + n);
        }
        return k
    }
    Na();
    for (var d = 0;;) {
        var e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
        if (64 === h && -1 === e) break;
        b(e << 2 | f >> 4);
        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h))
    }
}

function Na() {
    if (!La) {
        La = {};
        for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
            var d = a.concat(b[c].split(""));
            Ka[c] = d;
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                void 0 === La[f] && (La[f] = e)
            }
        }
    }
};
var Qa = "function" === typeof Uint8Array;

function Ra(a) {
    return Qa && null != a && a instanceof Uint8Array
}
let Sa;
var Ta = class {
    constructor(a) {
        this.h = a;
        if (null !== a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
    }
    isEmpty() {
        return null == this.h
    }
};
const Ua = "function" === typeof Uint8Array.prototype.slice;

function Va(a) {
    if (a.constructor === Uint8Array) return a;
    if (a.constructor === ArrayBuffer) return new Uint8Array(a);
    if (a.constructor === Array) return new Uint8Array(a);
    if (a.constructor === String) return Oa(a);
    if (a.constructor === Ta) {
        if (a.isEmpty()) a = Sa || (Sa = new Uint8Array(0));
        else {
            var b = Uint8Array;
            var c = a.h;
            c = null == c || Ra(c) ? c : "string" === typeof c ? Oa(c) : null;
            a = new b(a.h = c)
        }
        return a
    }
    if (a instanceof Uint8Array) return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, or Array of numbers");
};

function Wa(a, b) {
    a.j = Va(b);
    a.l = 0;
    a.i = a.j.length;
    a.h = a.l
}

function C(a) {
    if (a.h > a.i) throw Error(`Tried to read past the end of the data ${a.h} > ${a.i}`);
}

function Xa(a) {
    const b = a.j;
    let c = b[a.h + 0],
        d = c & 127;
    if (128 > c) return a.h += 1, C(a), d;
    c = b[a.h + 1];
    d |= (c & 127) << 7;
    if (128 > c) return a.h += 2, C(a), d;
    c = b[a.h + 2];
    d |= (c & 127) << 14;
    if (128 > c) return a.h += 3, C(a), d;
    c = b[a.h + 3];
    d |= (c & 127) << 21;
    if (128 > c) return a.h += 4, C(a), d;
    c = b[a.h + 4];
    d |= (c & 15) << 28;
    if (128 > c) return a.h += 5, C(a), d >>> 0;
    a.h += 5;
    if (128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++]) throw Fa();
    C(a);
    return d
}
var Ya = class {
        constructor(a, {
            I: b = !1
        } = {}) {
            this.j = null;
            this.h = this.i = this.l = 0;
            this.I = b;
            a && Wa(this, a)
        }
        clear() {
            this.j = null;
            this.h = this.i = this.l = 0;
            this.I = !1
        }
        reset() {
            this.h = this.l
        }
        advance(a) {
            this.h += a;
            C(this)
        }
    },
    Za = [];

function $a(a) {
    var b = a.h;
    if (b.h == b.i) return !1;
    a.l = a.h.h;
    b = Xa(a.h);
    const c = b & 7;
    if (!(0 <= c && 5 >= c)) throw Ea(c, a.l);
    a.j = b >>> 3;
    a.i = c;
    return !0
}

function ab(a) {
    switch (a.i) {
        case 0:
            if (0 != a.i) ab(a);
            else a: {
                a = a.h;
                var b = a.h;
                for (let c = 0; 10 > c; c++) {
                    if (0 === (a.j[b] & 128)) {
                        a.h = b + 1;
                        C(a);
                        break a
                    }
                    b++
                }
                throw Fa();
            }
            break;
        case 1:
            a.h.advance(8);
            break;
        case 2:
            2 != a.i ? ab(a) : (b = Xa(a.h), a.h.advance(b));
            break;
        case 5:
            a.h.advance(4);
            break;
        case 3:
            b = a.j;
            do {
                if (!$a(a)) throw Error("Unmatched start-group tag: stream EOF");
                if (4 == a.i) {
                    if (a.j != b) throw Error("Unmatched end-group tag");
                    break
                }
                ab(a)
            } while (1);
            break;
        default:
            throw Ea(a.i, a.l);
    }
}
var bb = class {
        constructor(a) {
            var {
                I: b = !1,
                ea: c = !1
            } = {};
            this.m = {
                I: b
            };
            this.ea = c;
            var d = this.m;
            if (Za.length) {
                const e = Za.pop();
                d && (e.I = d.I);
                a && Wa(e, a);
                a = e
            } else a = new Ya(a, d);
            this.h = a;
            this.l = this.h.h;
            this.i = this.j = -1
        }
        reset() {
            this.h.reset();
            this.i = this.j = -1
        }
        advance(a) {
            this.h.advance(a)
        }
    },
    cb = [];
const db = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol(void 0) : void 0;

function eb(a) {
    if (Array.isArray(a)) {
        let b;
        db ? b = a[db] : b = a.h;
        a = !!((null == b ? 0 : b) & 1)
    } else a = !1;
    return a
}

function fb(a) {
    Object.isFrozen(a) || (db ? a[db] |= 1 : void 0 !== a.h ? a.h |= 1 : Object.defineProperties(a, {
        h: {
            value: 1,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    }));
    return a
};

function gb(a) {
    return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
}
let hb;
class ib {
    constructor(a, b, c, d) {
        var e = jb;
        this.i = a;
        this.fieldName = b;
        this.h = c;
        this.isRepeated = d;
        this.j = e
    }
};

function kb(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "object":
            if (a && !Array.isArray(a)) {
                if (Ra(a)) return Ma(a);
                if (a instanceof Ta) {
                    if (a.isEmpty()) a = "";
                    else {
                        var b = a.h;
                        b = null == b || "string" === typeof b ? b : Qa && b instanceof Uint8Array ? Ma(b) : null;
                        a = a.h = b
                    }
                    return a
                }
            }
    }
    return a
};

function lb(a, b) {
    if (null != a) return Array.isArray(a) || gb(a) ? mb(a, b) : b(a)
}

function mb(a, b) {
    if (Array.isArray(a)) {
        var c = Array(a.length);
        for (var d = 0; d < a.length; d++) c[d] = lb(a[d], b);
        eb(a) && fb(c);
        return c
    }
    c = {};
    for (d in a) c[d] = lb(a[d], b);
    return c
}

function nb(a) {
    if (a && "object" == typeof a && a.toJSON) return a.toJSON();
    a = kb(a);
    return Array.isArray(a) ? mb(a, nb) : a
}

function ob(a) {
    return Ra(a) ? new Uint8Array(a) : a
};
let pb;

function D(a, b, c) {
    var d = pb;
    pb = null;
    a || (a = d);
    d = this.constructor.ja;
    a || (a = d ? [d] : []);
    this.j = (d ? 0 : -1) - (this.constructor.bb || 0);
    this.h = null;
    this.v = a;
    a: {
        d = this.v.length;a = d - 1;
        if (d && (d = this.v[a], gb(d))) {
            this.l = a - this.j;
            this.i = d;
            break a
        }
        void 0 !== b && -1 < b ? (this.l = Math.max(b, a + 1 - this.j), this.i = null) : this.l = Number.MAX_VALUE
    }
    if (c)
        for (b = 0; b < c.length; b++) a = c[b], a < this.l ? (a += this.j, (d = this.v[a]) ? Array.isArray(d) && fb(d) : this.v[a] = qb) : (rb(this), (d = this.i[a]) ? Array.isArray(d) && fb(d) : this.i[a] = qb)
}
const qb = Object.freeze(fb([]));

function rb(a) {
    let b = a.l + a.j;
    a.v[b] || (a.i = a.v[b] = {})
}

function E(a, b, c = !1) {
    return -1 === b ? null : b >= a.l ? a.i ? a.i[b] : void 0 : c && a.i && (c = a.i[b], null != c) ? c : a.v[b + a.j]
}

function sb(a, b, c = !1) {
    let d = E(a, b, c);
    null == d && (d = qb);
    d === qb && (d = fb(d.slice()), F(a, b, d, c));
    return d
}

function F(a, b, c, d = !1) {
    d || b >= a.l ? (rb(a), a.i[b] = c) : a.v[b + a.j] = c;
    return a
}

function tb(a, b) {
    let c = 0;
    for (let d = 0; d < b.length; d++) {
        const e = b[d];
        null != E(a, e) && (0 !== c && F(a, c, void 0, !1, !0), c = e)
    }
    return c
}

function ub(a, b, c, d, e = !1) {
    if (-1 === c) return null;
    a.h || (a.h = {});
    const f = a.h[c];
    if (f) return f;
    e = E(a, c, e);
    if (null == e && !d) return f;
    b = new b(e);
    return a.h[c] = b
}

function vb(a, b, c, d = !1) {
    a.h || (a.h = {});
    let e = a.h[c];
    if (!e) {
        d = sb(a, c, d);
        e = [];
        for (let f = 0; f < d.length; f++) e[f] = new b(d[f]);
        a.h[c] = e
    }
    return e
}

function G(a, b, c, d = !1) {
    a.h || (a.h = {});
    let e = c ? c.v : c;
    a.h[b] = c;
    return F(a, b, e, d)
}

function wb(a, b, c, d, e) {
    const f = vb(a, c, b, !1);
    c = d ? d : new c;
    a = sb(a, b);
    void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.v)) : (f.push(c), a.push(c.v));
    return c
}
D.prototype.toJSON = function() {
    const a = xb(this.v);
    return hb ? a : mb(a, nb)
};

function yb(a, b) {
    return kb(b)
}

function zb(a) {
    hb = !0;
    try {
        return JSON.stringify(a.toJSON(), yb)
    } finally {
        hb = !1
    }
}

function xb(a) {
    let b, c = a.length,
        d = !1;
    for (let g = a.length; g--;) {
        let h = a[g];
        if (Array.isArray(h)) {
            var e = h;
            Array.isArray(h) && eb(h) && !h.length ? h = null : h = xb(h);
            h != e && (d = !0)
        } else if (g === a.length - 1 && gb(h)) {
            a: {
                var f = h;e = {};
                let k = !1;
                for (let n in f) {
                    let l = f[n];
                    if (Array.isArray(l)) {
                        let p = l;
                        Array.isArray(l) && eb(l) && !l.length ? l = null : l = xb(l);
                        l != p && (k = !0)
                    }
                    null != l ? e[n] = l : k = !0
                }
                if (k) {
                    for (let n in e) {
                        f = e;
                        break a
                    }
                    f = null
                }
            }
            f != h && (d = !0);c--;
            continue
        }
        null == h && c == g + 1 ? (d = !0, c--) : d && (b || (b = a.slice(0, c)), b[g] = h)
    }
    if (!d) return a;
    b || (b = a.slice(0, c));
    f && b.push(f);
    return b
}
D.prototype.clone = function() {
    var a = this.constructor,
        b = mb(this.v, ob);
    pb = b;
    a = new a(b);
    pb = null;
    Ab(a, this);
    return a
};

function Ab(a, b) {
    b.m && (a.m = b.m.slice());
    const c = b.h;
    if (c) {
        b = b.i;
        for (let f in c) {
            const g = c[f];
            if (g) {
                var d = !(!b || !b[f]),
                    e = +f;
                if (Array.isArray(g)) {
                    if (g.length)
                        for (d = vb(a, g[0].constructor, e, d), e = 0; e < Math.min(d.length, g.length); e++) Ab(d[e], g[e])
                } else(d = ub(a, g.constructor, e, void 0, d)) && Ab(d, g)
            }
        }
    }
};
const Bb = Symbol();

function Cb(a, b, c) {
    return a[Bb] || (a[Bb] = (d, e) => b(d, e, c))
}

function Db(a) {
    let b = a[Bb];
    if (!b) {
        const c = a[Eb] || (a[Eb] = a());
        b = (d, e) => Fb(d, e, c);
        a[Bb] = b
    }
    return b
}

function Gb(a) {
    var b = a.Ua;
    if (b) return Db(b);
    if (b = a.cb) {
        const c = a.Aa;
        delete a.Aa;
        return Cb(a.ra.h, b, c)
    }
}

function Hb(a) {
    const b = Gb(a),
        c = a.ra,
        d = a.Va;
    return b ? (e, f) => d(e, f, c, b) : (e, f) => d(e, f, c)
}
const Ib = a => {
        const b = a[0];
        switch (a.length) {
            case 2:
                const c = a[1];
                return (m, u, w) => b(m, u, w, c);
            case 3:
                const d = a[1],
                    e = Db(a[2]);
                return (m, u, w) => b(m, u, w, d, e);
            case 4:
                const f = a[1],
                    g = a[3],
                    h = Db(a[2]);
                return (m, u, w) => b(m, u, w, f, h, g);
            case 5:
                const k = a[1],
                    n = Cb(k, a[3], a[4]);
                return (m, u, w) => b(m, u, w, k, n);
            case 6:
                const l = a[1],
                    p = a[5],
                    r = Cb(l, a[3], a[4]);
                return (m, u, w) => b(m, u, w, l, r, p);
            default:
                throw Error("Unsupported number of parameters, expected [2-6], got " + a.length);
        }
    },
    Eb = Symbol(),
    Fb = (a, b, c) => {
        for (; $a(b) && 4 != b.i;) {
            var d = b.j,
                e = c[d];
            if (e) Array.isArray(e) && (e = c[d] = Ib(e));
            else {
                var f = c[0];
                f && (f = f[d]) && (e = c[d] = Hb(f))
            }
            if (!e || !e(b, a, d)) {
                e = b;
                d = a;
                var g = e.l;
                ab(e);
                e.ea || (f = e.h.j, e = e.h.h, e = g === e ? Sa || (Sa = new Uint8Array(0)) : Ua ? f.slice(g, e) : new Uint8Array(f.subarray(g, e)), (f = d.m) ? f.push(e) : d.m = [e])
            }
        }
        return a
    };
var Lb = a => {
        var b = Jb,
            c = Kb;
        if (cb.length) {
            const f = cb.pop();
            if (a) {
                var d = f;
                Wa(d.h, a);
                d.j = -1;
                d.i = -1
            }
            a = f
        } else a = new bb(a);
        try {
            var e = new b;
            return Fb(e, a, c[Eb] || (c[Eb] = c()))
        } finally {
            a.h.clear(), a.j = -1, a.i = -1, 100 > cb.length && cb.push(a)
        }
    },
    Mb = (a, b, c) => {
        if (2 !== a.i) return !1;
        var d = F,
            e = Xa(a.h);
        a = a.h;
        var f = a.h;
        a.h += e;
        C(a);
        a = a.j;
        var g;
        if (Ia)(g = Ha) || (g = Ha = new TextDecoder("utf-8", {
            fatal: !1
        })), g = g.decode(a.subarray(f, f + e));
        else {
            e = f + e;
            const k = [];
            let n = null;
            let l, p;
            for (; f < e;) {
                var h = a[f++];
                128 > h ? k.push(h) : 224 > h ? f >= e ? k.push(65533) : (l = a[f++], 194 > h || 128 !== (l & 192) ? (f--, k.push(65533)) : k.push((h & 31) << 6 | l & 63)) : 240 > h ? f >= e - 1 ? k.push(65533) : (l = a[f++], 128 !== (l & 192) || 224 === h && 160 > l || 237 === h && 160 <= l || 128 !== ((g = a[f++]) & 192) ? (f--, k.push(65533)) : k.push((h & 15) << 12 | (l & 63) << 6 | g & 63)) : 244 >= h ? f >= e -
                    2 ? k.push(65533) : (l = a[f++], 128 !== (l & 192) || 0 !== (h << 28) + (l - 144) >> 30 || 128 !== ((g = a[f++]) & 192) || 128 !== ((p = a[f++]) & 192) ? (f--, k.push(65533)) : (h = (h & 7) << 18 | (l & 63) << 12 | (g & 63) << 6 | p & 63, h -= 65536, k.push((h >> 10 & 1023) + 55296, (h & 1023) + 56320))) : k.push(65533);
                8192 <= k.length && (n = Ga(n, k), k.length = 0)
            }
            g = Ga(n, k)
        }
        d(b, c, g);
        return !0
    },
    Nb = (a, b, c, d, e) => {
        if (2 !== a.i) return !1;
        var f = wb(b, c, d);
        b = a.h.i;
        c = Xa(a.h);
        d = a.h.h + c;
        a.h.i = d;
        e(f, a);
        e = d - a.h.h;
        if (0 !== e) throw Error("Message parsing ended unexpectedly. Expected to read " + `${c} bytes, instead read ${c-e} bytes, either the ` + "data ended unexpectedly or the message misreported its own length");
        a.h.h = d;
        a.h.i = b;
        return !0
    };

function jb(a, b) {
    const c = this.i;
    if (this.isRepeated) {
        let d;
        if (b) {
            d = fb([]);
            for (let e = 0; e < b.length; e++) d[e] = b[e].v;
            a.h || (a.h = {});
            a.h[c] = b
        } else a.h && (a.h[c] = void 0), d = qb;
        a = F(a, c, d, !0)
    } else a = G(a, c, b, !0);
    return a
};
wa("csi.gstatic.com");
wa("googleads.g.doubleclick.net");
wa("partner.googleadservices.com");
wa("pubads.g.doubleclick.net");
wa("securepubads.g.doubleclick.net");
wa("tpc.googlesyndication.com");
/*

 SPDX-License-Identifier: Apache-2.0
*/
function Ob(a) {
    if (!a) return "";
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !==
        c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};
var Pb = "client_dev_mss_url client_dev_regex_map client_dev_root_url expflag jsfeat jsmode client_rollout_override".split(" ");

function Qb() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        l = n = 0
    }

    function b(p) {
        for (var r = g, m = 0; 64 > m; m += 4) r[m / 4] = p[m] << 24 | p[m + 1] << 16 | p[m + 2] << 8 | p[m + 3];
        for (m = 16; 80 > m; m++) p = r[m - 3] ^ r[m - 8] ^ r[m - 14] ^ r[m - 16], r[m] = (p << 1 | p >>> 31) & 4294967295;
        p = e[0];
        var u = e[1],
            w = e[2],
            z = e[3],
            M = e[4];
        for (m = 0; 80 > m; m++) {
            if (40 > m)
                if (20 > m) {
                    var X = z ^ u & (w ^ z);
                    var ja = 1518500249
                } else X = u ^ w ^ z, ja = 1859775393;
            else 60 > m ? (X = u & w | z & (u | w), ja = 2400959708) : (X = u ^ w ^ z, ja = 3395469782);
            X = ((p << 5 | p >>> 27) & 4294967295) + X + M + ja + r[m] & 4294967295;
            M = z;
            z = w;
            w = (u << 30 | u >>> 2) & 4294967295;
            u = p;
            p = X
        }
        e[0] = e[0] + p & 4294967295;
        e[1] = e[1] + u & 4294967295;
        e[2] = e[2] + w & 4294967295;
        e[3] = e[3] + z & 4294967295;
        e[4] = e[4] + M & 4294967295
    }

    function c(p, r) {
        if ("string" === typeof p) {
            p = unescape(encodeURIComponent(p));
            for (var m = [], u = 0, w = p.length; u < w; ++u) m.push(p.charCodeAt(u));
            p = m
        }
        r || (r = p.length);
        m = 0;
        if (0 == n)
            for (; m + 64 < r;) b(p.slice(m, m + 64)), m += 64, l += 64;
        for (; m < r;)
            if (f[n++] = p[m++], l++, 64 == n)
                for (n = 0, b(f); m + 64 < r;) b(p.slice(m, m + 64)), m += 64, l += 64
    }

    function d() {
        var p = [],
            r = 8 * l;
        56 > n ? c(h, 56 - n) : c(h, 64 - (n - 56));
        for (var m = 63; 56 <= m; m--) f[m] = r & 255, r >>>= 8;
        b(f);
        for (m = r = 0; 5 > m; m++)
            for (var u = 24; 0 <= u; u -= 8) p[r++] = e[m] >> u & 255;
        return p
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var n, l;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        oa: function() {
            for (var p = d(), r = "", m = 0; m < p.length; m++) r += "0123456789ABCDEF".charAt(Math.floor(p[m] / 16)) + "0123456789ABCDEF".charAt(p[m] % 16);
            return r
        }
    }
};

function Rb(a, b, c) {
    var d = String(v.location.href);
    return d && a && b ? [b, Sb(Ob(d), a, c || null)].join(" ") : null
}

function Sb(a, b, c) {
    var d = [],
        e = [];
    if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], oa(d, function(h) {
        e.push(h)
    }), Tb(e.join(" "));
    var f = [],
        g = [];
    oa(c, function(h) {
        g.push(h.key);
        f.push(h.value)
    });
    c = Math.floor((new Date).getTime() / 1E3);
    e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
    oa(d, function(h) {
        e.push(h)
    });
    a = Tb(e.join(" "));
    a = [c, a];
    0 == g.length || a.push(g.join(""));
    return a.join("_")
}

function Tb(a) {
    var b = Qb();
    b.update(a);
    return b.oa().toLowerCase()
};
const Ub = {};

function Vb() {
    this.h = document || {
        cookie: ""
    }
}
q = Vb.prototype;
q.isEnabled = function() {
    if (!v.navigator.cookieEnabled) return !1;
    if (!this.isEmpty()) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        ia: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
q.set = function(a, b, c) {
    let d;
    var e = !1;
    let f;
    if ("object" === typeof c) {
        f = c.lb;
        e = c.mb || !1;
        d = c.domain || void 0;
        var g = c.path || void 0;
        var h = c.ia
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    c = d ? ";domain=" + d : "";
    g = g ? ";path=" + g : "";
    e = e ? ";secure" : "";
    h = 0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString();
    this.h.cookie = a + "=" + b + c + g + h + e + (null != f ? ";samesite=" +
        f : "")
};
q.get = function(a, b) {
    const c = a + "=",
        d = (this.h.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
        f = ya(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
        if (f == a) return ""
    }
    return b
};
q.remove = function(a, b, c) {
    const d = void 0 !== this.get(a);
    this.set(a, "", {
        ia: 0,
        path: b,
        domain: c
    });
    return d
};
q.isEmpty = function() {
    return !this.h.cookie
};
q.clear = function() {
    var a = (this.h.cookie || "").split(";");
    const b = [],
        c = [];
    let d, e;
    for (let f = 0; f < a.length; f++) e = ya(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; 0 <= a; a--) this.remove(b[a])
};

function Wb() {
    return !!Ub.FPA_SAMESITE_PHASE2_MOD || !1
}

function Xb(a, b, c, d) {
    (a = v[a]) || (a = (new Vb).get(b));
    return a ? Rb(a, c, d) : null
}

function Yb() {
    var a = [],
        b = Ob(String(v.location.href));
    const c = [];
    var d = v.__SAPISID || v.__APISID || v.__3PSAPISID || v.__OVERRIDE_SID;
    Wb() && (d = d || v.__1PSAPISID);
    if (d) var e = !0;
    else e = new Vb, d = e.get("SAPISID") || e.get("APISID") || e.get("__Secure-3PAPISID") || e.get("SID"), Wb() && (d = d || e.get("__Secure-1PAPISID")), e = !!d;
    e && (d = (e = b = 0 == b.indexOf("https:") || 0 == b.indexOf("chrome-extension:") || 0 == b.indexOf("moz-extension:")) ? v.__SAPISID : v.__APISID, d || (d = new Vb, d = d.get(e ? "SAPISID" : "APISID") || d.get("__Secure-3PAPISID")),
        (e = d ? Rb(d, e ? "SAPISIDHASH" : "APISIDHASH", a) : null) && c.push(e), b && Wb() && ((b = Xb("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && c.push(b), (a = Xb("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && c.push(a)));
    return 0 == c.length ? null : c.join(" ")
};

function Zb() {
    this.j = this.j;
    this.l = this.l
}
Zb.prototype.j = !1;
Zb.prototype.dispose = function() {
    this.j || (this.j = !0, this.T())
};
Zb.prototype.T = function() {
    if (this.l)
        for (; this.l.length;) this.l.shift()()
};

function $b(a) {
    var b = x("window.location.href");
    null == a && (a = 'Unknown Error of type "null/undefined"');
    if ("string" === typeof a) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (g) {
        d = "Not available", c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || v.$googDebugFname || b
    } catch (g) {
        e = "Not available", c = !0
    }
    b = ac(a);
    if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
        c = a.message;
        if (null ==
            c) {
            if (a.constructor && a.constructor instanceof Function) {
                if (a.constructor.name) c = a.constructor.name;
                else if (c = a.constructor, bc[c]) c = bc[c];
                else {
                    c = String(c);
                    if (!bc[c]) {
                        var f = /function\s+([^\(]+)/m.exec(c);
                        bc[c] = f ? f[1] : "[Anonymous]"
                    }
                    c = bc[c]
                }
                c = 'Unknown Error of type "' + c + '"'
            } else c = "Unknown Error of unknown type";
            "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())
        }
        return {
            message: c,
            name: a.name || "UnknownError",
            lineNumber: d,
            fileName: e,
            stack: b || "Not available"
        }
    }
    a.stack =
        b;
    return {
        message: a.message,
        name: a.name,
        lineNumber: a.lineNumber,
        fileName: a.fileName,
        stack: a.stack
    }
}

function ac(a, b) {
    b || (b = {});
    b[cc(a)] = !0;
    var c = a.stack || "";
    (a = a.na) && !b[cc(a)] && (c += "\nCaused by: ", a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"), c += ac(a, b));
    return c
}

function cc(a) {
    var b = "";
    "function" === typeof a.toString && (b = "" + a);
    return b + a.stack
}
var bc = {};

function dc(a, b) {
    a.l(b);
    100 > a.i && (a.i++, b.next = a.h, a.h = b)
}
var ec = class {
    constructor(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null
    }
    get() {
        let a;
        0 < this.i ? (this.i--, a = this.h, this.h = a.next, a.next = null) : a = this.j();
        return a
    }
};

function fc(a) {
    v.setTimeout(() => {
        throw a;
    }, 0)
};
class gc {
    constructor() {
        this.i = this.h = null
    }
    add(a, b) {
        const c = hc.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c
    }
    remove() {
        let a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a
    }
}
var hc = new ec(() => new ic, a => a.reset());
class ic {
    constructor() {
        this.next = this.scope = this.h = null
    }
    set(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null
    }
    reset() {
        this.next = this.scope = this.h = null
    }
};

function jc(a, b) {
    kc || lc();
    mc || (kc(), mc = !0);
    nc.add(a, b)
}
var kc;

function lc() {
    var a = v.Promise.resolve(void 0);
    kc = function() {
        a.then(oc)
    }
}
var mc = !1,
    nc = new gc;

function oc() {
    for (var a; a = nc.remove();) {
        try {
            a.h.call(a.scope)
        } catch (b) {
            fc(b)
        }
        dc(hc, a)
    }
    mc = !1
};
class pc {
    constructor() {
        this.promise = new Promise((a, b) => {
            this.reject = b
        })
    }
};

function H(a) {
    this.h = 0;
    this.A = void 0;
    this.l = this.i = this.j = null;
    this.m = this.o = !1;
    if (a != ha) try {
        var b = this;
        a.call(void 0, function(c) {
            qc(b, 2, c)
        }, function(c) {
            qc(b, 3, c)
        })
    } catch (c) {
        qc(this, 3, c)
    }
}

function rc() {
    this.next = this.context = this.onRejected = this.i = this.h = null;
    this.j = !1
}
rc.prototype.reset = function() {
    this.context = this.onRejected = this.i = this.h = null;
    this.j = !1
};
var sc = new ec(function() {
    return new rc
}, function(a) {
    a.reset()
});

function tc(a, b, c) {
    var d = sc.get();
    d.i = a;
    d.onRejected = b;
    d.context = c;
    return d
}

function uc(a) {
    if (a instanceof H) return a;
    var b = new H(ha);
    qc(b, 2, a);
    return b
}
H.prototype.then = function(a, b, c) {
    return vc(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
};
H.prototype.$goog_Thenable = !0;
q = H.prototype;
q.Fa = function(a, b) {
    return vc(this, null, a, b)
};
q.catch = H.prototype.Fa;
q.cancel = function(a) {
    if (0 == this.h) {
        var b = new wc(a);
        jc(function() {
            xc(this, b)
        }, this)
    }
};

function xc(a, b) {
    if (0 == a.h)
        if (a.j) {
            var c = a.j;
            if (c.i) {
                for (var d = 0, e = null, f = null, g = c.i; g && (g.j || (d++, g.h == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                e && (0 == c.h && 1 == d ? xc(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : yc(c), zc(c, e, 3, b)))
            }
            a.j = null
        } else qc(a, 3, b)
}

function Ac(a, b) {
    a.i || 2 != a.h && 3 != a.h || Bc(a);
    a.l ? a.l.next = b : a.i = b;
    a.l = b
}

function vc(a, b, c, d) {
    var e = tc(null, null, null);
    e.h = new H(function(f, g) {
        e.i = b ? function(h) {
            try {
                var k = b.call(d, h);
                f(k)
            } catch (n) {
                g(n)
            }
        } : f;
        e.onRejected = c ? function(h) {
            try {
                var k = c.call(d, h);
                void 0 === k && h instanceof wc ? g(h) : f(k)
            } catch (n) {
                g(n)
            }
        } : g
    });
    e.h.j = a;
    Ac(a, e);
    return e.h
}
q.Ga = function(a) {
    this.h = 0;
    qc(this, 2, a)
};
q.Ha = function(a) {
    this.h = 0;
    qc(this, 3, a)
};

function qc(a, b, c) {
    if (0 == a.h) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.h = 1;
        a: {
            var d = c,
                e = a.Ga,
                f = a.Ha;
            if (d instanceof H) {
                Ac(d, tc(e || ha, f || null, a));
                var g = !0
            } else {
                if (d) try {
                    var h = !!d.$goog_Thenable
                } catch (n) {
                    h = !1
                } else h = !1;
                if (h) d.then(e, f, a), g = !0;
                else {
                    h = typeof d;
                    if ("object" == h && null != d || "function" == h) try {
                        var k = d.then;
                        if ("function" === typeof k) {
                            Cc(d, k, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (n) {
                        f.call(a, n);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
        }
        g || (a.A = c, a.h = b, a.j = null, Bc(a), 3 != b || c instanceof wc || Dc(a, c))
    }
}

function Cc(a, b, c, d, e) {
    function f(k) {
        h || (h = !0, d.call(e, k))
    }

    function g(k) {
        h || (h = !0, c.call(e, k))
    }
    var h = !1;
    try {
        b.call(a, g, f)
    } catch (k) {
        f(k)
    }
}

function Bc(a) {
    a.o || (a.o = !0, jc(a.qa, a))
}

function yc(a) {
    var b = null;
    a.i && (b = a.i, a.i = b.next, b.next = null);
    a.i || (a.l = null);
    return b
}
q.qa = function() {
    for (var a; a = yc(this);) zc(this, a, this.h, this.A);
    this.o = !1
};

function zc(a, b, c, d) {
    if (3 == c && b.onRejected && !b.j)
        for (; a && a.m; a = a.j) a.m = !1;
    if (b.h) b.h.j = null, Ec(b, c, d);
    else try {
        b.j ? b.i.call(b.context) : Ec(b, c, d)
    } catch (e) {
        Fc.call(null, e)
    }
    dc(sc, b)
}

function Ec(a, b, c) {
    2 == b ? a.i.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
}

function Dc(a, b) {
    a.m = !0;
    jc(function() {
        a.m && Fc.call(null, b)
    })
}
var Fc = fc;

function wc(a) {
    na.call(this, a)
}
ma(wc, na);
wc.prototype.name = "cancel";

function I(a) {
    Zb.call(this);
    this.A = 1;
    this.m = [];
    this.o = 0;
    this.h = [];
    this.i = {};
    this.K = !!a
}
ma(I, Zb);
q = I.prototype;
q.subscribe = function(a, b, c) {
    var d = this.i[a];
    d || (d = this.i[a] = []);
    var e = this.A;
    this.h[e] = a;
    this.h[e + 1] = b;
    this.h[e + 2] = c;
    this.A = e + 3;
    d.push(e);
    return e
};
q.aa = function(a) {
    var b = this.h[a];
    if (b) {
        var c = this.i[b];
        if (0 != this.o) this.m.push(a), this.h[a + 1] = ha;
        else {
            if (c) {
                var d = Array.prototype.indexOf.call(c, a, void 0);
                0 <= d && Array.prototype.splice.call(c, d, 1)
            }
            delete this.h[a];
            delete this.h[a + 1];
            delete this.h[a + 2]
        }
    }
    return !!b
};
q.X = function(a, b) {
    var c = this.i[a];
    if (c) {
        for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
        if (this.K)
            for (e = 0; e < c.length; e++) {
                var g = c[e];
                Gc(this.h[g + 1], this.h[g + 2], d)
            } else {
                this.o++;
                try {
                    for (e = 0, f = c.length; e < f && !this.j; e++) g = c[e], this.h[g + 1].apply(this.h[g + 2], d)
                } finally {
                    if (this.o--, 0 < this.m.length && 0 == this.o)
                        for (; c = this.m.pop();) this.aa(c)
                }
            }
        return 0 != e
    }
    return !1
};

function Gc(a, b, c) {
    jc(function() {
        a.apply(b, c)
    })
}
q.clear = function(a) {
    if (a) {
        var b = this.i[a];
        b && (b.forEach(this.aa, this), delete this.i[a])
    } else this.h.length = 0, this.i = {}
};
q.T = function() {
    I.Ca.T.call(this);
    this.clear();
    this.m.length = 0
};
/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var Hc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var Jc = class extends D {
        constructor(a) {
            super(a)
        }
        getKey() {
            return E(this, 1)
        }
        fa() {
            return E(this, 2 === tb(this, Ic) ? 2 : -1)
        }
        setValue(a) {
            let b = tb(this, Ic);
            b && 2 !== b && null != a && (this.h && b in this.h && (this.h[b] = void 0), F(this, b, void 0));
            return F(this, 2, a)
        }
    },
    Ic = [2, 3, 4, 5, 6];
var Kc = class extends D {
    constructor(a) {
        super(a)
    }
};
var Mc = class extends D {
        constructor() {
            super(void 0, -1, Lc)
        }
        getPlayerType() {
            return E(this, 36)
        }
        setHomeGroupInfo(a) {
            return G(this, 81, a)
        }
    },
    Lc = [9, 66, 24, 32, 86, 100, 101];
var Oc = class extends D {
        constructor() {
            super(void 0, -1, Nc)
        }
    },
    Nc = [15, 26, 28];
var Pc = class extends D {
    constructor(a) {
        super(a)
    }
    setToken(a) {
        return F(this, 2, a)
    }
};
var Rc = class extends D {
        constructor(a) {
            super(a, -1, Qc)
        }
        setSafetyMode(a) {
            return F(this, 5, a)
        }
    },
    Qc = [12];
var Tc = class extends D {
        constructor(a) {
            super(a, -1, Sc)
        }
    },
    Sc = [12];
var Uc = class extends D {
    constructor() {
        super(void 0)
    }
};
var Vc = class extends D {
    constructor(a) {
        super(a)
    }
};
var Wc = class extends D {
    constructor() {
        super(void 0)
    }
};
var Xc = [1, 2];
var Zc = class extends D {
        constructor() {
            super(void 0, -1, Yc)
        }
    },
    Yc = [3];
var $c = ["notification/convert_endpoint_to_url"],
    ad = ["notification/record_interactions"],
    bd = ["notification_registration/set_registration"];
var cd = class extends D {
    constructor(a) {
        super(a, 1)
    }
};
var dd = class extends D {
        constructor(a) {
            super(a)
        }
    },
    ed = function(a, b, c, d, e = 0) {
        return new ib(a, b, c, e)
    }(406606992, {
        Za: 0
    }, dd, void 0);
var fd = class extends dd {};
var gd, hd, id;
const J = v.window,
    K = (null === (gd = null === J || void 0 === J ? void 0 : J.yt) || void 0 === gd ? void 0 : gd.config_) || (null === (hd = null === J || void 0 === J ? void 0 : J.ytcfg) || void 0 === hd ? void 0 : hd.data_) || {},
    jd = (null === (id = null === J || void 0 === J ? void 0 : J.ytcfg) || void 0 === id ? void 0 : id.obfuscatedData_) || [];
let kd = new class extends cd {}(jd);
const ld = K.EXPERIMENT_FLAGS;
if (!ld || !ld.jspb_i18n_extension) {
    var md = new fd;
    ed.j(kd, md)
}
y("yt.config_", K);
y("yt.configJspb_", jd);

function L(...a) {
    a = arguments;
    1 < a.length ? K[a[0]] = a[1] : 1 === a.length && Object.assign(K, a[0])
}

function N(a, b) {
    return a in K ? K[a] : b
};

function O(a) {
    a = nd(a);
    return "string" === typeof a && "false" === a ? !1 : !!a
}

function od(a, b) {
    a = nd(a);
    return void 0 === a && void 0 !== b ? b : Number(a || 0)
}

function pd() {
    return N("EXPERIMENTS_TOKEN", "")
}

function nd(a) {
    const b = N("EXPERIMENTS_FORCED_FLAGS", {});
    return void 0 !== b[a] ? b[a] : N("EXPERIMENT_FLAGS", {})[a]
}

function qd() {
    const a = [],
        b = N("EXPERIMENTS_FORCED_FLAGS", {});
    for (var c in b) a.push({
        key: c,
        value: String(b[c])
    });
    c = N("EXPERIMENT_FLAGS", {});
    for (let d in c) d.startsWith("force_") && void 0 === b[d] && a.push({
        key: d,
        value: String(c[d])
    });
    return a
};
let rd = 0;
y("ytDomDomGetNextId", x("ytDomDomGetNextId") || (() => ++rd));
const sd = [];

function td(a) {
    sd.forEach(b => b(a))
}

function ud(a) {
    return a && window.yterr ? function() {
        try {
            return a.apply(this, arguments)
        } catch (b) {
            vd(b)
        }
    } : a
}

function vd(a) {
    var b = x("yt.logging.errors.log");
    b ? b(a, "ERROR", void 0, void 0, void 0) : (b = N("ERRORS", []), b.push([a, "ERROR", void 0, void 0, void 0]), L("ERRORS", b));
    td(a)
}

function wd(a) {
    var b = x("yt.logging.errors.log");
    b ? b(a, "WARNING", void 0, void 0, void 0) : (b = N("ERRORS", []), b.push([a, "WARNING", void 0, void 0, void 0]), L("ERRORS", b))
};
y("ytEventsEventsListeners", v.ytEventsEventsListeners || {});
y("ytEventsEventsCounter", v.ytEventsEventsCounter || {
    count: 0
});

function xd(a, b) {
    "function" === typeof a && (a = ud(a));
    return window.setTimeout(a, b)
};

function yd(a, b) {
    zd(a, 2, b)
}
var Ad = class {
    h(a) {
        zd(a, 1, void 0)
    }
};

function zd(a, b, c) {
    void 0 !== c && Number.isNaN(Number(c)) && (c = void 0);
    const d = x("yt.scheduler.instance.addJob");
    d ? d(a, b, c) : void 0 === c ? a() : xd(a, c || 0)
}
var Bd = class extends Ad {
    start() {
        const a = x("yt.scheduler.instance.start");
        a && a()
    }
};
Bd.h || (Bd.h = new Bd);
var Cd = Bd.h;
const Dd = /^[\w.]*$/,
    Ed = {
        q: !0,
        search_query: !0
    };

function Fd(a, b) {
    b = a.split(b);
    const c = {};
    for (let f = 0, g = b.length; f < g; f++) {
        const h = b[f].split("=");
        if (1 == h.length && h[0] || 2 == h.length) try {
            const k = Gd(h[0] || ""),
                n = Gd(h[1] || "");
            k in c ? Array.isArray(c[k]) ? qa(c[k], n) : c[k] = [c[k], n] : c[k] = n
        } catch (k) {
            var d = k,
                e = h[0];
            const n = String(Fd);
            d.args = [{
                key: e,
                value: h[1],
                query: a,
                method: Hd == n ? "unchanged" : n
            }];
            Ed.hasOwnProperty(e) || wd(d)
        }
    }
    return c
}
const Hd = String(Fd);

function Id(a) {
    "?" == a.charAt(0) && (a = a.substr(1));
    return Fd(a, "&")
}

function Jd(a, b, c) {
    var d = a.split("#", 2);
    a = d[0];
    d = 1 < d.length ? "#" + d[1] : "";
    var e = a.split("?", 2);
    a = e[0];
    e = Id(e[1] || "");
    for (var f in b) !c && null !== e && f in e || (e[f] = b[f]);
    b = a;
    a = Da(e);
    a ? (c = b.indexOf("#"), 0 > c && (c = b.length), f = b.indexOf("?"), 0 > f || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [b.substr(0, f), e, b.substr(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
    return a + d
}

function Kd(a) {
    if (!b) var b = window.location.href;
    const c = a.match(B)[1] || null,
        d = Ba(a.match(B)[3] || null);
    c && d ? (a = a.match(B), b = b.match(B), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Ba(b.match(B)[3] || null) == d && (Number(b.match(B)[4] || null) || null) == (Number(a.match(B)[4] || null) || null) : !0;
    return a
}

function Gd(a) {
    return a && a.match(Dd) ? a : decodeURIComponent(a.replace(/\+/g, " "))
};
Date.now();
[...Pb];
let Ld = !1;

function Md(a, b) {
    const c = {
        method: b.method || "GET",
        credentials: "same-origin"
    };
    b.headers && (c.headers = b.headers);
    a = Nd(a, b);
    const d = Od(a, b);
    d && (c.body = d);
    b.withCredentials && (c.credentials = "include");
    const e = b.context || v;
    let f = !1,
        g;
    fetch(a, c).then(h => {
        if (!f) {
            f = !0;
            g && window.clearTimeout(g);
            var k = h.ok,
                n = l => {
                    l = l || {};
                    k ? b.onSuccess && b.onSuccess.call(e, l, h) : b.onError && b.onError.call(e, l, h);
                    b.onFinish && b.onFinish.call(e, l, h)
                };
            "JSON" == (b.format || "JSON") && (k || 400 <= h.status && 500 > h.status) ? h.json().then(n, function() {
                n(null)
            }): n(null)
        }
    }).catch(() => {
        b.onError && b.onError.call(e, {}, {})
    });
    b.onFetchTimeout && 0 < b.timeout && (g = xd(() => {
        f || (f = !0, window.clearTimeout(g), b.onFetchTimeout.call(b.context || v))
    }, b.timeout))
}

function Nd(a, b) {
    b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
    const c = N("XSRF_FIELD_NAME", void 0);
    if (b = b.urlParams) b[c] && delete b[c], a = Jd(a, b || {}, !0);
    return a
}

function Od(a, b) {
    const c = N("XSRF_FIELD_NAME", void 0),
        d = N("XSRF_TOKEN", void 0);
    var e = b.postBody || "",
        f = b.postParams;
    const g = N("XSRF_FIELD_NAME", void 0);
    let h;
    b.headers && (h = b.headers["Content-Type"]);
    b.excludeXsrf || Ba(a.match(B)[3] || null) && !b.withCredentials && Ba(a.match(B)[3] || null) != document.location.hostname || "POST" != b.method || h && "application/x-www-form-urlencoded" != h || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
    f && "string" === typeof e && (e = Id(e), ua(e, f), e = b.postBodyFormat && "JSON" == b.postBodyFormat ?
        JSON.stringify(e) : Da(e));
    f = e || f && !ra(f);
    !Ld && f && "POST" != b.method && (Ld = !0, vd(Error("AJAX request with postData should use POST")));
    return e
};
v.ytPubsubPubsubInstance || new I;
const P = window;
var Q = P.ytcsi && P.ytcsi.now ? P.ytcsi.now : P.performance && P.performance.timing && P.performance.now && P.performance.timing.navigationStart ? () => P.performance.timing.navigationStart + P.performance.now() : () => (new Date).getTime();
const Pd = od("initial_gel_batch_timeout", 2E3),
    Qd = Math.pow(2, 16) - 1;
let Rd = void 0;
class Sd {
    constructor() {
        this.j = this.h = this.i = 0
    }
}
const Td = new Sd,
    Ud = new Sd;
let Vd = !0;
const Wd = v.ytLoggingTransportGELQueue_ || new Map,
    Xd = v.ytLoggingTransportGELProtoQueue_ || new Map,
    Yd = v.ytLoggingTransportTokensToCttTargetIds_ || {},
    Zd = v.ytLoggingTransportTokensToJspbCttTargetIds_ || {};

function $d(a, b) {
    if ("log_event" === a.endpoint) {
        var c = ae(a),
            d = Wd.get(c) || [];
        Wd.set(c, d);
        d.push(a.payload);
        b && (Rd = new b);
        a = od("tvhtml5_logging_max_batch") || od("web_logging_max_batch") || 100;
        b = Q();
        const e = Td.j;
        d.length >= a ? be({
            writeThenSend: !0
        }, O("flush_only_full_queue") ? c : void 0, !1) : 10 <= b - e && (ce(!1), Td.j = b)
    }
}

function de(a, b) {
    if ("log_event" === a.endpoint) {
        var c = ae(a),
            d = new Map;
        d.set(c, [a.payload]);
        b && (Rd = new b);
        return new H(e => {
            Rd && Rd.isReady() ? ee(d, e, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function ae(a) {
    var b = "";
    if (a.S) b = "visitorOnlyApprovedKey";
    else if (a.cttAuthInfo) {
        b = a.cttAuthInfo;
        const c = {};
        b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId);
        Yd[a.cttAuthInfo.token] = c;
        b = a.cttAuthInfo.token
    }
    return b
}

function be(a = {}, b, c = !1) {
    new H(d => {
        c ? (window.clearTimeout(Ud.i), window.clearTimeout(Ud.h), Ud.h = 0) : (window.clearTimeout(Td.i), window.clearTimeout(Td.h), Td.h = 0);
        if (Rd && Rd.isReady())
            if (void 0 !== b)
                if (c) {
                    var e = new Map,
                        f = Xd.get(b) || [];
                    e.set(b, f);
                    fe(e, d, a);
                    Xd.delete(b)
                } else e = new Map, f = Wd.get(b) || [], e.set(b, f), ee(e, d, a), Wd.delete(b);
        else c ? (fe(Xd, d, a), Xd.clear()) : (ee(Wd, d, a), Wd.clear());
        else ce(c), d()
    })
}

function ce(a = !1) {
    if (O("web_gel_timeout_cap") && (!a && !Td.h || a && !Ud.h)) {
        var b = xd(() => {
            be({
                writeThenSend: !0
            }, void 0, a)
        }, 6E4);
        a ? Ud.h = b : Td.h = b
    }
    window.clearTimeout(a ? Ud.i : Td.i);
    b = N("LOGGING_BATCH_TIMEOUT", od("web_gel_debounce_ms", 1E4));
    O("shorten_initial_gel_batch_timeout") && Vd && (b = Pd);
    b = xd(() => {
        be({
            writeThenSend: !0
        }, void 0, a)
    }, b);
    a ? Ud.i = b : Td.i = b
}

function ee(a, b, c = {}, d) {
    var e = Rd;
    const f = Math.round(Q());
    let g = a.size;
    for (const [n, l] of a) {
        var h = n,
            k = l;
        a = sa({
            context: ge(e.config_ || he())
        });
        a.events = k;
        (k = Yd[h]) && ie(a, h, k);
        delete Yd[h];
        h = "visitorOnlyApprovedKey" === h;
        je(a, f, h);
        ke(c);
        le(e, a, me(c, h, () => {
            g--;
            g || b()
        }, () => {
            g--;
            g || b()
        }, d));
        Vd = !1
    }
}

function fe(a, b, c = {}) {
    var d = Rd;
    const e = Math.round(Q());
    let f = a.size;
    for (const [n, l] of a) {
        var g = n,
            h = l;
        a = new Zc;
        var k = ne(d.config_ || he());
        G(a, 1, k);
        for (k = 0; k < h.length; k++) wb(a, 3, Vc, h[k], void 0);
        (h = Zd[g]) && oe(a, g, h);
        delete Zd[g];
        g = "visitorOnlyApprovedKey" === g;
        pe(a, e, g);
        ke(c);
        a = zb(a);
        g = me(c, g, () => {
            f--;
            f || b()
        }, () => {
            f--;
            f || b()
        }, void 0);
        g.headers = {
            "Content-Type": "application/json+protobuf"
        };
        g.postBodyFormat = "JSPB";
        g.postBody = a;
        le(d, "", g);
        Vd = !1
    }
}

function ke(a) {
    O("always_send_and_write") && (a.writeThenSend = !1)
}

function me(a, b, c, d, e) {
    return {
        retry: !0,
        onSuccess: c,
        onError: d,
        eb: a,
        S: b,
        Wa: !!e,
        headers: {},
        postBodyFormat: "",
        postBody: ""
    }
}

function je(a, b, c) {
    a.requestTimeMs = String(b);
    O("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
    !c && (b = N("EVENT_ID", void 0)) && (c = qe(), a.serializedClientEventId = {
        serializedEventId: b,
        clientCounter: String(c)
    })
}

function pe(a, b, c) {
    F(a, 2, b);
    if (!c && (b = N("EVENT_ID", void 0))) {
        c = qe();
        const d = new Wc;
        F(d, 1, b);
        F(d, 2, c);
        G(a, 5, d)
    }
}

function qe() {
    let a = N("BATCH_CLIENT_COUNTER", void 0) || 0;
    a || (a = Math.floor(Math.random() * Qd / 2));
    a++;
    a > Qd && (a = 1);
    L("BATCH_CLIENT_COUNTER", a);
    return a
}

function ie(a, b, c) {
    let d;
    if (c.videoId) d = "VIDEO";
    else if (c.playlistId) d = "PLAYLIST";
    else return;
    a.credentialTransferTokenTargetId = c;
    a.context = a.context || {};
    a.context.user = a.context.user || {};
    a.context.user.credentialTransferTokens = [{
        token: b,
        scope: d
    }]
}

function oe(a, b, c) {
    let d;
    if (E(c, 1 === tb(c, Xc) ? 1 : -1)) d = 1;
    else if (c.getPlaylistId()) d = 2;
    else return;
    G(a, 4, c);
    a = ub(a, Tc, 1) || new Tc;
    c = ub(a, Rc, 3) || new Rc;
    const e = new Pc;
    e.setToken(b);
    F(e, 1, d);
    wb(c, 12, Pc, e, void 0);
    G(a, 3, c)
};
const re = v.ytLoggingGelSequenceIdObj_ || {};

function R(a, b, c, d = {}) {
    const e = {},
        f = Math.round(d.timestamp || Q());
    e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
    e[a] = b;
    var g;
    a = x("_lact", window);
    null == a ? g = -1 : g = Math.max(Date.now() - a, 0);
    e.context = {
        lastActivityMs: String(d.timestamp || !isFinite(g) ? -1 : g)
    };
    O("log_sequence_info_on_gel_web") && d.B && (g = e.context, a = d.B, re[a] = a in re ? re[a] + 1 : 0, g.sequence = {
        index: re[a],
        groupKey: a
    }, d.pa && delete re[d.B]);
    (d.nb ? de : $d)({
        endpoint: "log_event",
        payload: e,
        cttAuthInfo: d.cttAuthInfo,
        S: d.S
    }, c)
};
y("ytglobal.prefsUserPrefsPrefs_", x("ytglobal.prefsUserPrefsPrefs_") || {});

function se() {
    return "INNERTUBE_API_KEY" in K && "INNERTUBE_API_VERSION" in K
}

function he() {
    return {
        innertubeApiKey: N("INNERTUBE_API_KEY", void 0),
        innertubeApiVersion: N("INNERTUBE_API_VERSION", void 0),
        U: N("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
        ta: N("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
        va: N("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
        innertubeContextClientVersion: N("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0),
        ha: N("INNERTUBE_CONTEXT_HL", void 0),
        ga: N("INNERTUBE_CONTEXT_GL", void 0),
        wa: N("INNERTUBE_HOST_OVERRIDE", void 0) || "",
        ya: !!N("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
        xa: !!N("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
        appInstallData: N("SERIALIZED_CLIENT_CONFIG_DATA", void 0)
    }
}

function ge(a) {
    const b = {
        client: {
            hl: a.ha,
            gl: a.ga,
            clientName: a.ta,
            clientVersion: a.innertubeContextClientVersion,
            configInfo: a.U
        }
    };
    navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
    var c = v.devicePixelRatio;
    c && 1 != c && (b.client.screenDensityFloat = String(c));
    c = pd();
    "" !== c && (b.client.experimentsToken = c);
    c = qd();
    0 < c.length && (b.request = {
        internalExperimentFlags: c
    });
    te(a, void 0, b);
    N("DELEGATED_SESSION_ID") && !O("pageid_as_header_web") && (b.user = {
        onBehalfOfUser: N("DELEGATED_SESSION_ID")
    });
    a = Object;
    c = a.assign;
    var d = b.client,
        e = N("DEVICE", "");
    const f = {};
    for (const [g, h] of Object.entries(Id(e))) {
        e = g;
        const k = h;
        "cbrand" === e ? f.deviceMake = k : "cmodel" === e ? f.deviceModel = k : "cbr" === e ? f.browserName = k : "cbrver" === e ? f.browserVersion = k : "cos" === e ? f.osName = k : "cosver" === e ? f.osVersion = k : "cplatform" === e && (f.platform = k)
    }
    b.client = c.call(a, d, f);
    return b
}

function ne(a) {
    const b = new Tc,
        c = new Mc;
    F(c, 1, a.ha);
    F(c, 2, a.ga);
    F(c, 16, a.va);
    F(c, 17, a.innertubeContextClientVersion);
    if (a.U) {
        var d = a.U,
            e = new Kc;
        d.coldConfigData && F(e, 1, d.coldConfigData);
        d.appInstallData && F(e, 6, d.appInstallData);
        d.coldHashData && F(e, 3, d.coldHashData);
        d.hotHashData && F(e, 5, d.hotHashData);
        G(c, 62, e)
    }(d = v.devicePixelRatio) && 1 != d && F(c, 65, d);
    d = pd();
    "" !== d && F(c, 54, d);
    d = qd();
    if (0 < d.length) {
        e = new Oc;
        for (let f = 0; f < d.length; f++) {
            const g = new Jc;
            F(g, 1, d[f].key);
            g.setValue(d[f].value);
            wb(e, 15, Jc, g,
                void 0)
        }
        G(b, 5, e)
    }
    te(a, c);
    N("DELEGATED_SESSION_ID") && !O("pageid_as_header_web") && (a = new Rc, F(a, 3, N("DELEGATED_SESSION_ID")));
    a = N("DEVICE", "");
    for (const [f, g] of Object.entries(Id(a))) a = f, d = g, "cbrand" === a ? F(c, 12, d) : "cmodel" === a ? F(c, 13, d) : "cbr" === a ? F(c, 87, d) : "cbrver" === a ? F(c, 88, d) : "cos" === a ? F(c, 18, d) : "cosver" === a ? F(c, 19, d) : "cplatform" === a && F(c, 42, d);
    G(b, 1, c);
    return b
}

function te(a, b, c) {
    if (a.appInstallData)
        if (b) {
            let d;
            c = null != (d = ub(b, Kc, 62)) ? d : new Kc;
            F(c, 6, a.appInstallData);
            G(b, 62, c)
        } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData)
}

function ue(a, b, c) {
    c = void 0 === c ? {} : c;
    const d = {
        "X-Goog-Visitor-Id": c.visitorData || N("VISITOR_DATA", "")
    };
    if (b && b.includes("www.youtube-nocookie.com")) return d;
    (b = c.Sa || N("AUTHORIZATION")) || (a ? b = `Bearer ${x("gapi.auth.getToken")().Ra}` : b = Yb());
    b && (d.Authorization = b, d["X-Goog-AuthUser"] = N("SESSION_INDEX", 0), O("pageid_as_header_web") && (d["X-Goog-PageId"] = N("DELEGATED_SESSION_ID")));
    return d
};
const ve = [];
let we, xe = !1;

function ye(a) {
    xe || (we ? we.handleError(a) : (ve.push({
        type: "ERROR",
        payload: a
    }), 10 < ve.length && ve.shift()))
}

function ze(a, b) {
    xe || (we ? we.M(a, b) : (ve.push({
        type: "EVENT",
        eventType: a,
        payload: b
    }), 10 < ve.length && ve.shift()))
};
var Ae = class extends Error {
    constructor(a, ...b) {
        super(a);
        this.args = [...b]
    }
};

function Be() {
    if (void 0 !== N("DATASYNC_ID", void 0)) return N("DATASYNC_ID", void 0);
    throw new Ae("Datasync ID not set", "unknown");
};

function Ce(a) {
    if (0 <= a.indexOf(":")) throw Error("Database name cannot contain ':'");
}

function De(a) {
    return a.substr(0, a.indexOf(":")) || a
};
const Ee = {
        AUTH_INVALID: "No user identifier specified.",
        EXPLICIT_ABORT: "Transaction was explicitly aborted.",
        IDB_NOT_SUPPORTED: "IndexedDB is not supported.",
        MISSING_INDEX: "Index not created.",
        MISSING_OBJECT_STORES: "Object stores not created.",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "Database is deleted because expected object stores were not created.",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "Database is reopened because expected object stores were not created.",
        UNKNOWN_ABORT: "Transaction was aborted for unknown reasons.",
        QUOTA_EXCEEDED: "The current transaction exceeded its quota limitations.",
        QUOTA_MAYBE_EXCEEDED: "The current transaction may have failed because of exceeding quota limitations.",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "Can't start a transaction on a closed database",
        INCOMPATIBLE_DB_VERSION: "The binary is incompatible with the database version"
    },
    Fe = {
        AUTH_INVALID: "ERROR",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "WARNING",
        EXPLICIT_ABORT: "IGNORED",
        IDB_NOT_SUPPORTED: "ERROR",
        MISSING_INDEX: "WARNING",
        MISSING_OBJECT_STORES: "ERROR",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "WARNING",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "WARNING",
        QUOTA_EXCEEDED: "WARNING",
        QUOTA_MAYBE_EXCEEDED: "WARNING",
        UNKNOWN_ABORT: "WARNING",
        INCOMPATIBLE_DB_VERSION: "WARNING"
    },
    Ge = {
        AUTH_INVALID: !1,
        EXECUTE_TRANSACTION_ON_CLOSED_DB: !1,
        EXPLICIT_ABORT: !1,
        IDB_NOT_SUPPORTED: !1,
        MISSING_INDEX: !1,
        MISSING_OBJECT_STORES: !1,
        DB_DELETED_BY_MISSING_OBJECT_STORES: !1,
        DB_REOPENED_BY_MISSING_OBJECT_STORES: !1,
        QUOTA_EXCEEDED: !1,
        QUOTA_MAYBE_EXCEEDED: !0,
        UNKNOWN_ABORT: !0,
        INCOMPATIBLE_DB_VERSION: !1
    };
var S = class extends Ae {
        constructor(a, b = {}, c = Ee[a], d = Fe[a], e = Ge[a]) {
            super(c, Object.assign({
                name: "YtIdbKnownError",
                isSw: void 0 === self.document,
                isIframe: self !== self.top,
                type: a
            }, b));
            this.type = a;
            this.message = c;
            this.level = d;
            this.h = e;
            Object.setPrototypeOf(this, S.prototype)
        }
    },
    He = class extends S {
        constructor(a, b) {
            super("MISSING_OBJECT_STORES", {
                expectedObjectStores: b,
                foundObjectStores: a
            }, Ee.MISSING_OBJECT_STORES);
            Object.setPrototypeOf(this, He.prototype)
        }
    },
    Ie = class extends Error {
        constructor(a, b) {
            super();
            this.index =
                a;
            this.objectStore = b;
            Object.setPrototypeOf(this, Ie.prototype)
        }
    };
const Je = ["The database connection is closing", "Can't start a transaction on a closed database", "A mutation operation was attempted on a database that did not allow mutations"];

function Ke(a, b, c, d) {
    b = De(b);
    let e;
    e = a instanceof Error ? a : Error(`Unexpected error: ${a}`);
    if (e instanceof S) return e;
    a = {
        objectStoreNames: c,
        dbName: b,
        dbVersion: d
    };
    if ("QuotaExceededError" === e.name) return new S("QUOTA_EXCEEDED", a);
    if (Ja && "UnknownError" === e.name) return new S("QUOTA_MAYBE_EXCEEDED", a);
    if (e instanceof Ie) return new S("MISSING_INDEX", Object.assign(Object.assign({}, a), {
        objectStore: e.objectStore,
        index: e.index
    }));
    if ("InvalidStateError" === e.name && Je.some(f => e.message.includes(f))) return new S("EXECUTE_TRANSACTION_ON_CLOSED_DB",
        a);
    if ("AbortError" === e.name) return new S("UNKNOWN_ABORT", a, e.message);
    e.args = [Object.assign(Object.assign({}, a), {
        name: "IdbError",
        fb: e.name
    })];
    e.level = "WARNING";
    return e
}

function Le(a, b, c) {
    return new S("IDB_NOT_SUPPORTED", {
        context: {
            caller: a,
            publicName: b,
            version: c,
            hasSucceededOnce: void 0
        }
    })
};

function Me(a) {
    if (!a) throw Error();
    throw a;
}

function Ne(a) {
    return a
}
var Oe = class {
    constructor(a) {
        this.h = a
    }
};

function Pe(a) {
    return new T(new Oe((b, c) => {
        a instanceof T ? a.then(b, c) : b(a)
    }))
}

function Qe(a, b, c, d, e) {
    try {
        if ("FULFILLED" !== a.state.status) throw Error("calling handleResolve before the promise is fulfilled.");
        const f = c(a.state.value);
        f instanceof T ? Re(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function Se(a, b, c, d, e) {
    try {
        if ("REJECTED" !== a.state.status) throw Error("calling handleReject before the promise is rejected.");
        const f = c(a.state.reason);
        f instanceof T ? Re(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function Re(a, b, c, d, e) {
    b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(f => {
        f instanceof T ? Re(a, b, f, d, e) : d(f)
    }, f => {
        e(f)
    })
}
var T = class {
    constructor(a) {
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.onRejected = [];
        a = a.h;
        const b = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "FULFILLED",
                        value: d
                    };
                    for (const e of this.h) e()
                }
            },
            c = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "REJECTED",
                        reason: d
                    };
                    for (const e of this.onRejected) e()
                }
            };
        try {
            a(b, c)
        } catch (d) {
            c(d)
        }
    }
    static all(a) {
        return new T(new Oe((b, c) => {
            const d = [];
            let e = a.length;
            0 === e && b(d);
            for (let f = 0; f < a.length; ++f) Pe(a[f]).then(g => {
                d[f] = g;
                e--;
                0 === e && b(d)
            }).catch(g => {
                c(g)
            })
        }))
    }
    static reject(a) {
        return new T(new Oe((b, c) => {
            c(a)
        }))
    }
    then(a, b) {
        const c = null !== a && void 0 !== a ? a : Ne,
            d = null !== b && void 0 !== b ? b : Me;
        return new T(new Oe((e, f) => {
            "PENDING" === this.state.status ? (this.h.push(() => {
                Qe(this, this, c, e, f)
            }), this.onRejected.push(() => {
                Se(this, this, d, e, f)
            })) : "FULFILLED" === this.state.status ? Qe(this, this, c, e, f) : "REJECTED" === this.state.status && Se(this, this, d, e, f)
        }))
    } catch (a) {
        return this.then(void 0, a)
    }
};

function Te(a, b, c) {
    const d = () => {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", f)
            } catch (g) {}
        },
        e = () => {
            b(a.result);
            d()
        },
        f = () => {
            c(a.error);
            d()
        };
    a.addEventListener("success", e);
    a.addEventListener("error", f)
}

function Ue(a) {
    return new Promise((b, c) => {
        Te(a, b, c)
    })
}

function U(a) {
    return new T(new Oe((b, c) => {
        Te(a, b, c)
    }))
};

function Ve(a, b) {
    return new T(new Oe((c, d) => {
        const e = () => {
            const f = a ? b(a) : null;
            f ? f.then(g => {
                a = g;
                e()
            }, d) : c()
        };
        e()
    }))
};

function V(a, b, c, d) {
    return t(function*() {
        const e = {
            mode: "readonly",
            G: !1,
            tag: "IDB_TRANSACTION_TAG_UNKNOWN"
        };
        "string" === typeof c ? e.mode = c : Object.assign(e, c);
        a.transactionCount++;
        const f = e.G ? 3 : 1;
        let g = 0,
            h;
        for (; !h;) {
            g++;
            const n = Math.round(Q());
            try {
                const l = a.h.transaction(b, e.mode);
                var k = d;
                const p = new We(l),
                    r = yield Xe(p, k), m = Math.round(Q());
                Ye(a, n, m, g, void 0, b.join(), e);
                return r
            } catch (l) {
                k = Math.round(Q());
                const p = Ke(l, a.h.name, b.join(), a.h.version);
                if (p instanceof S && !p.h || g >= f) Ye(a, n, k, g, p, b.join(), e),
                    h = p
            }
        }
        return Promise.reject(h)
    })
}

function Ze(a, b, c) {
    a = a.h.createObjectStore(b, c);
    return new $e(a)
}

function af(a, b, c, d) {
    return V(a, [b], {
        mode: "readwrite",
        G: !0
    }, e => {
        e = e.objectStore(b);
        return U(e.h.put(c, d))
    })
}

function Ye(a, b, c, d, e, f, g) {
    b = c - b;
    e ? (e instanceof S && ("QUOTA_EXCEEDED" === e.type || "QUOTA_MAYBE_EXCEEDED" === e.type) && ze("QUOTA_EXCEEDED", {
        dbName: De(a.h.name),
        objectStoreNames: f,
        transactionCount: a.transactionCount,
        transactionMode: g.mode
    }), e instanceof S && "UNKNOWN_ABORT" === e.type && (c -= a.j, 0 > c && c >= Math.pow(2, 31) && (c = 0), ze("TRANSACTION_UNEXPECTEDLY_ABORTED", {
        objectStoreNames: f,
        transactionDuration: b,
        transactionCount: a.transactionCount,
        dbDuration: c
    }), a.i = !0), bf(a, !1, d, f, b, g.tag), ye(e)) : bf(a, !0, d, f, b, g.tag)
}

function bf(a, b, c, d, e, f) {
    ze("TRANSACTION_ENDED", {
        objectStoreNames: d,
        connectionHasUnknownAbortedTransaction: a.i,
        duration: e,
        isSuccessful: b,
        tryCount: c,
        tag: void 0 === f ? "IDB_TRANSACTION_TAG_UNKNOWN" : f
    })
}
var cf = class {
    constructor(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(Q());
        this.i = !1
    }
    add(a, b, c) {
        return V(this, [a], {
            mode: "readwrite",
            G: !0
        }, d => d.objectStore(a).add(b, c))
    }
    clear(a) {
        return V(this, [a], {
            mode: "readwrite",
            G: !0
        }, b => b.objectStore(a).clear())
    }
    close() {
        var a;
        this.h.close();
        (null === (a = this.options) || void 0 === a ? 0 : a.closed) && this.options.closed()
    }
    count(a, b) {
        return V(this, [a], {
            mode: "readonly",
            G: !0
        }, c => c.objectStore(a).count(b))
    }
    delete(a, b) {
        return V(this, [a], {
            mode: "readwrite",
            G: !0
        }, c => c.objectStore(a).delete(b))
    }
    get(a, b) {
        return V(this, [a], {
            mode: "readonly",
            G: !0
        }, c => c.objectStore(a).get(b))
    }
    objectStoreNames() {
        return Array.from(this.h.objectStoreNames)
    }
    getName() {
        return this.h.name
    }
};

function df(a, b, c) {
    a = a.h.openCursor(b.query, b.direction);
    return ef(a).then(d => Ve(d, c))
}

function ff(a, b) {
    return df(a, {
        query: b
    }, c => c.delete().then(() => c.continue())).then(() => {})
}
var $e = class {
    constructor(a) {
        this.h = a
    }
    add(a, b) {
        return U(this.h.add(a, b))
    }
    autoIncrement() {
        return this.h.autoIncrement
    }
    clear() {
        return U(this.h.clear()).then(() => {})
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return a instanceof IDBKeyRange ? ff(this, a) : U(this.h.delete(a))
    }
    get(a) {
        return U(this.h.get(a))
    }
    index(a) {
        try {
            return new gf(this.h.index(a))
        } catch (b) {
            if (b instanceof Error && "NotFoundError" === b.name) throw new Ie(a, this.h.name);
            throw b;
        }
    }
    getName() {
        return this.h.name
    }
    keyPath() {
        return this.h.keyPath
    }
};

function Xe(a, b) {
    const c = new Promise((d, e) => {
        try {
            b(a).then(f => {
                d(f)
            }).catch(e)
        } catch (f) {
            e(f), a.abort()
        }
    });
    return Promise.all([c, a.done]).then(d => {
        [d] = d;
        return d
    })
}
var We = class {
    constructor(a) {
        this.h = a;
        this.j = new Map;
        this.i = !1;
        this.done = new Promise((b, c) => {
            this.h.addEventListener("complete", () => {
                b()
            });
            this.h.addEventListener("error", d => {
                d.currentTarget === d.target && c(this.h.error)
            });
            this.h.addEventListener("abort", () => {
                var d = this.h.error;
                if (d) c(d);
                else if (!this.i) {
                    d = S;
                    var e = this.h.objectStoreNames;
                    const f = [];
                    for (let g = 0; g < e.length; g++) {
                        const h = e.item(g);
                        if (null === h) throw Error("Invariant: item in DOMStringList is null");
                        f.push(h)
                    }
                    d = new d("UNKNOWN_ABORT", {
                        objectStoreNames: f.join(),
                        dbName: this.h.db.name,
                        mode: this.h.mode
                    });
                    c(d)
                }
            })
        })
    }
    abort() {
        this.h.abort();
        this.i = !0;
        throw new S("EXPLICIT_ABORT");
    }
    objectStore(a) {
        a = this.h.objectStore(a);
        let b = this.j.get(a);
        b || (b = new $e(a), this.j.set(a, b));
        return b
    }
};

function hf(a, b, c) {
    const {
        query: d = null,
        direction: e = "next"
    } = b;
    a = a.h.openCursor(d, e);
    return ef(a).then(f => Ve(f, c))
}
var gf = class {
    constructor(a) {
        this.h = a
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return hf(this, {
            query: a
        }, b => b.delete().then(() => b.continue()))
    }
    get(a) {
        return U(this.h.get(a))
    }
    getKey(a) {
        return U(this.h.getKey(a))
    }
    keyPath() {
        return this.h.keyPath
    }
    unique() {
        return this.h.unique
    }
};

function ef(a) {
    return U(a).then(b => b ? new jf(a, b) : null)
}
var jf = class {
    constructor(a, b) {
        this.request = a;
        this.cursor = b
    }
    advance(a) {
        this.cursor.advance(a);
        return ef(this.request)
    }
    continue (a) {
        this.cursor.continue(a);
        return ef(this.request)
    }
    delete() {
        return U(this.cursor.delete()).then(() => {})
    }
    getKey() {
        return this.cursor.key
    }
    fa() {
        return this.cursor.value
    }
    update(a) {
        return U(this.cursor.update(a))
    }
};

function kf(a, b, c) {
    return new Promise((d, e) => {
        let f;
        f = void 0 !== b ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
        const g = c.blocked,
            h = c.blocking,
            k = c.Ea,
            n = c.upgrade,
            l = c.closed;
        let p;
        const r = () => {
            p || (p = new cf(f.result, {
                closed: l
            }));
            return p
        };
        f.addEventListener("upgradeneeded", m => {
            try {
                if (null === m.newVersion) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                if (null === f.transaction) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                m.dataLoss && "none" !== m.dataLoss && ze("IDB_DATA_CORRUPTED", {
                    reason: m.dataLossMessage || "unknown reason",
                    dbName: De(a)
                });
                const u = r(),
                    w = new We(f.transaction);
                n && n(u, z => m.oldVersion < z && m.newVersion >= z, w);
                w.done.catch(z => {
                    e(z)
                })
            } catch (u) {
                e(u)
            }
        });
        f.addEventListener("success", () => {
            const m = f.result;
            h && m.addEventListener("versionchange", () => {
                h(r())
            });
            m.addEventListener("close", () => {
                ze("IDB_UNEXPECTEDLY_CLOSED", {
                    dbName: De(a),
                    dbVersion: m.version
                });
                k && k()
            });
            d(r())
        });
        f.addEventListener("error", () => {
            e(f.error)
        });
        g && f.addEventListener("blocked", () => {
            g()
        })
    })
}

function lf(a, b, c) {
    c = void 0 === c ? {} : c;
    return kf(a, b, c)
}

function mf(a, b) {
    b = void 0 === b ? {} : b;
    return t(function*() {
        try {
            const c = self.indexedDB.deleteDatabase(a),
                d = b.blocked;
            d && c.addEventListener("blocked", () => {
                d()
            });
            yield Ue(c)
        } catch (c) {
            throw Ke(c, a, "", -1);
        }
    })
};

function nf(a) {
    return new Promise(b => {
        yd(() => {
            b()
        }, a)
    })
}

function of (a, b) {
    return new S("INCOMPATIBLE_DB_VERSION", {
        dbName: a.name,
        oldVersion: a.options.version,
        newVersion: b
    })
}

function pf(a, b) {
    if (!b) throw Le("openWithToken", De(a.name));
    return a.open()
}
var qf = class {
    constructor(a, b) {
        this.name = a;
        this.options = b;
        this.l = !0;
        this.o = this.m = 0;
        this.i = 500
    }
    j(a, b, c) {
        c = void 0 === c ? {} : c;
        return lf(a, b, c)
    }
    delete(a) {
        a = void 0 === a ? {} : a;
        return mf(this.name, a)
    }
    open() {
        if (!this.l) throw of(this);
        if (this.h) return this.h;
        let a;
        const b = () => {
                this.h === a && (this.h = void 0)
            },
            c = {
                blocking: e => {
                    e.close()
                },
                closed: b,
                Ea: b,
                upgrade: this.options.upgrade
            },
            d = () => {
                const e = this;
                return t(function*() {
                    var f, g, h = null !== (f = Error().stack) && void 0 !== f ? f : "";
                    try {
                        const l = yield e.j(e.name, e.options.version, c);
                        var k = l,
                            n = e.options;
                        const p = [];
                        for (const r of Object.keys(n.J)) {
                            const {
                                L: m,
                                ib: u = Number.MAX_VALUE
                            } = n.J[r];
                            !(k.h.version >= m) || k.h.version >= u || k.h.objectStoreNames.contains(r) || p.push(r)
                        }
                        if (0 !== p.length) {
                            const r = Object.keys(e.options.J),
                                m = l.objectStoreNames();
                            if (e.o < od("ytidb_reopen_db_retries", 0)) return e.o++, l.close(),
                                ye(new S("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                                    dbName: e.name,
                                    expectedObjectStores: r,
                                    foundObjectStores: m
                                })), d();
                            if (e.m < od("ytidb_remake_db_retries", 1)) return e.m++, O("ytidb_remake_db_enable_backoff_delay") && (yield nf(e.i), e.i *= 2), yield e.delete(), ye(new S("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: r,
                                foundObjectStores: m
                            })), d();
                            throw new He(m, r);
                        }
                        return l
                    } catch (l) {
                        if (l instanceof DOMException ? "VersionError" === l.name : "DOMError" in self && l instanceof DOMError ? "VersionError" ===
                            l.name : l instanceof Object && "message" in l && "An attempt was made to open a database using a lower version than the existing version." === l.message) {
                            h = yield e.j(e.name, void 0, Object.assign(Object.assign({}, c), {
                                upgrade: void 0
                            }));
                            k = h.h.version;
                            if (void 0 !== e.options.version && k > e.options.version + 1) throw h.close(), e.l = !1, of (e, k);
                            return h
                        }
                        b();
                        l instanceof Error && !O("ytidb_async_stack_killswitch") && (l.stack = `${l.stack}\n${h.substring(h.indexOf("\n")+1)}`);
                        throw Ke(l, e.name, "", null !== (g = e.options.version) &&
                            void 0 !== g ? g : -1);
                    }
                })
            };
        return this.h = a = d()
    }
};
const rf = new qf("YtIdbMeta", {
    J: {
        databases: {
            L: 1
        }
    },
    upgrade(a, b) {
        b(1) && Ze(a, "databases", {
            keyPath: "actualName"
        })
    }
});

function sf(a, b) {
    return t(function*() {
        return V(yield pf(rf, b), ["databases"], {
            G: !0,
            mode: "readwrite"
        }, c => {
            const d = c.objectStore("databases");
            return d.get(a.actualName).then(e => {
                if (e ? a.actualName !== e.actualName || a.publicName !== e.publicName || a.userIdentifier !== e.userIdentifier : 1) return U(d.h.put(a, void 0)).then(() => {})
            })
        })
    })
}

function tf(a, b) {
    return t(function*() {
        if (a) return (yield pf(rf, b)).delete("databases", a)
    })
};
let uf;
const vf = new class {
    constructor() {}
}(new class {
    constructor() {}
});

function wf() {
    return t(function*() {
        return !0
    })
}

function xf() {
    if (void 0 !== uf) return uf;
    xe = !0;
    return uf = wf().then(a => {
        xe = !1;
        return a
    })
}

function yf() {
    const a = x("ytglobal.idbToken_") || void 0;
    return a ? Promise.resolve(a) : xf().then(b => {
        (b = b ? vf : void 0) && y("ytglobal.idbToken_", b);
        return b
    })
};
new pc;

function zf(a) {
    try {
        Be();
        var b = !0
    } catch (c) {
        b = !1
    }
    if (!b) throw a = new S("AUTH_INVALID", {
        dbName: a
    }), ye(a), a;
    b = Be();
    return {
        actualName: `${a}:${b}`,
        publicName: a,
        userIdentifier: b
    }
}

function Af(a, b, c, d) {
    return t(function*() {
        var e, f = null !== (e = Error().stack) && void 0 !== e ? e : "",
            g = yield yf();
        if (!g) throw g = Le("openDbImpl", a, b), O("ytidb_async_stack_killswitch") || (g.stack = `${g.stack}\n${f.substring(f.indexOf("\n")+1)}`), ye(g), g;
        Ce(a);
        f = c ? {
            actualName: a,
            publicName: a,
            userIdentifier: void 0
        } : zf(a);
        try {
            return yield sf(f, g), yield lf(f.actualName, b, d)
        } catch (h) {
            try {
                yield tf(f.actualName, g)
            } catch (k) {}
            throw h;
        }
    })
}

function Bf(a, b, c) {
    c = void 0 === c ? {} : c;
    return Af(a, b, !1, c)
}

function Cf(a, b, c) {
    c = void 0 === c ? {} : c;
    return Af(a, b, !0, c)
}

function Df(a, b) {
    b = void 0 === b ? {} : b;
    return t(function*() {
        const c = yield yf();
        if (c) {
            Ce(a);
            var d = zf(a);
            yield mf(d.actualName, b);
            yield tf(d.actualName, c)
        }
    })
}

function Ef(a, b) {
    b = void 0 === b ? {} : b;
    return t(function*() {
        const c = yield yf();
        c && (Ce(a), yield mf(a, b), yield tf(a, c))
    })
};

function Ff(a) {
    this.version = 1;
    this.args = a
};

function Gf() {
    var a = Hf;
    this.topic = "screen-created";
    this.h = a
}
Gf.prototype.toString = function() {
    return this.topic
};
const If = x("ytPubsub2Pubsub2Instance") || new I;
I.prototype.subscribe = I.prototype.subscribe;
I.prototype.unsubscribeByKey = I.prototype.aa;
I.prototype.publish = I.prototype.X;
I.prototype.clear = I.prototype.clear;
y("ytPubsub2Pubsub2Instance", If);
const Jf = x("ytPubsub2Pubsub2SubscribedKeys") || {};
y("ytPubsub2Pubsub2SubscribedKeys", Jf);
const Kf = x("ytPubsub2Pubsub2TopicToKeys") || {};
y("ytPubsub2Pubsub2TopicToKeys", Kf);
const Lf = x("ytPubsub2Pubsub2IsAsync") || {};
y("ytPubsub2Pubsub2IsAsync", Lf);
y("ytPubsub2Pubsub2SkipSubKey", null);

function Mf(a) {
    var b = Nf;
    const c = Of();
    if (!c) return 0;
    const d = c.subscribe(b.toString(), (e, f) => {
        var g = x("ytPubsub2Pubsub2SkipSubKey");
        g && g == d || (g = () => {
            if (Jf[d]) try {
                if (f && b instanceof Gf && b != e) try {
                    var h = b.h,
                        k = f;
                    if (!k.args || !k.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
                    try {
                        if (!h.la) {
                            const m = new h;
                            h.la = m.version
                        }
                        var n = h.la
                    } catch (m) {}
                    if (!n || k.version != n) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
                    try {
                        n = Reflect;
                        var l = n.construct; {
                            var p = k.args;
                            const m = p.length;
                            if (0 < m) {
                                const u = Array(m);
                                for (k = 0; k < m; k++) u[k] = p[k];
                                var r = u
                            } else r = []
                        }
                        f = l.call(n, h, r)
                    } catch (m) {
                        throw m.message = "yt.pubsub2.Data.deserialize(): " + m.message, m;
                    }
                } catch (m) {
                    throw m.message = "yt.pubsub2.pubsub2 cross-binary conversion error for " + b.toString() + ": " + m.message, m;
                }
                a.call(window, f)
            } catch (m) {
                vd(m)
            }
        }, Lf[b.toString()] ? x("yt.scheduler.instance") ? Cd.h(g) : xd(g, 0) : g())
    });
    Jf[d] = !0;
    Kf[b.toString()] || (Kf[b.toString()] = []);
    Kf[b.toString()].push(d);
    return d
}

function Pf() {
    var a = Qf;
    const b = Mf(function(c) {
        a.apply(void 0, arguments);
        Rf(b)
    });
    return b
}

function Rf(a) {
    const b = Of();
    b && ("number" === typeof a && (a = [a]), oa(a, c => {
        b.unsubscribeByKey(c);
        delete Jf[c]
    }))
}

function Of() {
    return x("ytPubsub2Pubsub2Instance")
};

function Sf(a, b) {
    let c;
    return () => {
        c || (c = new Tf(a, b));
        return c
    }
}
var Tf = class extends qf {
    constructor(a, b) {
        super(a, b);
        this.options = b;
        Ce(a)
    }
    j(a, b, c = {}) {
        return (this.options.Y ? Cf : Bf)(a, b, Object.assign({}, c))
    }
    delete(a = {}) {
        return (this.options.Y ? Ef : Df)(this.name, a)
    }
};
const Uf = ["client.name", "client.version"];

function Vf(a) {
    if (!a.errorMetadata || !a.errorMetadata.kvPairs) return a;
    a.errorMetadata.kvPairs = a.errorMetadata.kvPairs.filter(b => b.key ? Uf.includes(b.key) : !1);
    return a
};
var Wf;
Wf = Sf("ServiceWorkerLogsDatabase", {
    J: {
        SWHealthLog: {
            L: 1
        }
    },
    Y: !0,
    upgrade: (a, b) => {
        b(1) && Ze(a, "SWHealthLog", {
            keyPath: "id",
            autoIncrement: !0
        }).h.createIndex("swHealthNewRequest", ["interface", "timestamp"], {
            unique: !1
        })
    },
    version: 1
});

function Xf(a, b) {
    return t(function*() {
        var c = yield pf(Wf(), b), d = N("INNERTUBE_CONTEXT_CLIENT_NAME", 0);
        const e = Object.assign({}, a);
        e.clientError && (e.clientError = Vf(e.clientError));
        e.interface = d;
        return af(c, "SWHealthLog", e)
    })
};
const Yf = v.ytNetworklessLoggingInitializationOptions || {
    isNwlInitialized: !1,
    potentialEsfErrorCounter: 0
};
y("ytNetworklessLoggingInitializationOptions", Yf);

function le(a, b, c) {
    !N("VISITOR_DATA") && .01 > Math.random() && wd(new Ae("Missing VISITOR_DATA when sending innertube request.", "log_event", b, c));
    if (!a.isReady()) throw a = new Ae("innertube xhrclient not ready", "log_event", b, c), vd(a), a;
    const d = {
        headers: c.headers || {},
        method: "POST",
        postParams: b,
        postBody: c.postBody,
        postBodyFormat: c.postBodyFormat || "JSON",
        onTimeout: () => {
            c.onTimeout()
        },
        onFetchTimeout: c.onTimeout,
        onSuccess: (l, p) => {
            if (c.onSuccess) c.onSuccess(p)
        },
        onFetchSuccess: l => {
            if (c.onSuccess) c.onSuccess(l)
        },
        onError: (l, p) => {
            if (c.onError) c.onError(p)
        },
        onFetchError: l => {
            if (c.onError) c.onError(l)
        },
        timeout: c.timeout,
        withCredentials: !0
    };
    d.headers["Content-Type"] || (d.headers["Content-Type"] = "application/json");
    b = "";
    var e = a.config_.wa;
    e && (b = e);
    e = ue(a.config_.ya || !1, b, c);
    Object.assign(d.headers, e);
    (e = d.headers.Authorization) && !b && (d.headers["x-origin"] = window.location.origin);
    const f = `/${"youtubei"}/${a.config_.innertubeApiVersion}/${"log_event"}`;
    let g = {
            alt: "json"
        },
        h = a.config_.xa && e;
    O("omit_innertube_api_key_for_bearer_auth_header") && (h = h && e.startsWith("Bearer"));
    h || (g.key = a.config_.innertubeApiKey);
    const k = Jd(`${b}${f}`, g || {}, !0),
        n = () => {
            try {
                Md(k, d)
            } catch (l) {
                if ("InvalidAccessError" == l.name) wd(Error("An extension is blocking network request."));
                else throw l;
            }
        };
    !O("use_new_nwl") && x("ytNetworklessLoggingInitializationOptions") && Yf.isNwlInitialized ? xf().then(l => {
        n(l)
    }) : n(!1)
}
class Zf {
    constructor(a) {
        this.config_ = null;
        a ? this.config_ = a : se() && (this.config_ = he())
    }
    isReady() {
        !this.config_ && se() && (this.config_ = he());
        return !!this.config_
    }
};
let $f = Zf;

function W(a, b, c = {}) {
    let d = $f;
    N("ytLoggingEventsDefaultDisabled", !1) && $f == Zf && (d = null);
    R(a, b, d, c)
};
let ag = Date.now().toString();
var bg;
let cg = v.ytLoggingDocDocumentNonce_;
if (!cg) {
    var dg;
    a: {
        if (window.crypto && window.crypto.getRandomValues) try {
            const d = Array(16),
                e = new Uint8Array(16);
            window.crypto.getRandomValues(e);
            for (let f = 0; f < d.length; f++) d[f] = e[f];
            dg = d;
            break a
        } catch (d) {}
        const c = Array(16);
        for (let d = 0; 16 > d; d++) {
            const e = Date.now();
            for (let f = 0; f < e % 23; f++) c[d] = Math.random();
            c[d] = Math.floor(256 * Math.random())
        }
        if (ag) {
            let d = 1;
            for (let e = 0; e < ag.length; e++) c[d % 16] = c[d % 16] ^ c[(d - 1) % 16] / 4 ^ ag.charCodeAt(e), d++
        }
        dg = c
    }
    const a = dg,
        b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] &
        63));
    cg = b.join("")
}
bg = cg;
let eg = Zf;
var fg = {
    Ka: 0,
    Ia: 1,
    Ja: 2,
    Ma: 3,
    La: 4,
    Qa: 5,
    Na: 6,
    Pa: 7,
    Oa: 8,
    0: "DEFAULT",
    1: "CHAT",
    2: "CONVERSATIONS",
    3: "MINIPLAYER",
    4: "DIALOG",
    5: "VOZ",
    6: "MUSIC_WATCH_TABS",
    7: "SHARE",
    8: "PUSH_NOTIFICATIONS"
};
let gg = 1;

function hg(a) {
    const b = gg++;
    return new ig({
        veType: a,
        veCounter: b,
        elementIndex: void 0,
        dataElement: void 0,
        youtubeData: void 0
    })
}
var ig = class {
    constructor(a) {
        this.h = a
    }
    getAsJson() {
        const a = {};
        void 0 !== this.h.trackingParams ? a.trackingParams = this.h.trackingParams : (a.veType = this.h.veType, void 0 !== this.h.veCounter && (a.veCounter = this.h.veCounter), void 0 !== this.h.elementIndex && (a.elementIndex = this.h.elementIndex));
        void 0 !== this.h.dataElement && (a.dataElement = this.h.dataElement.getAsJson());
        void 0 !== this.h.youtubeData && (a.youtubeData = this.h.youtubeData);
        return a
    }
    getAsJspb() {
        const a = new Uc;
        void 0 !== this.h.trackingParams ? F(a, 1, this.h.trackingParams) :
            (void 0 !== this.h.veType && F(a, 2, this.h.veType), void 0 !== this.h.veCounter && F(a, 6, this.h.veCounter), void 0 !== this.h.elementIndex && F(a, 3, this.h.elementIndex));
        if (void 0 !== this.h.dataElement) {
            var b = this.h.dataElement.getAsJspb();
            G(a, 7, b)
        }
        return a
    }
    toString() {
        return JSON.stringify(this.getAsJson())
    }
    isClientVe() {
        return !this.h.trackingParams && !!this.h.veType
    }
};

function jg(a = 0) {
    return 0 == a ? "client-screen-nonce" : `${"client-screen-nonce"}.${a}`
}

function kg(a = 0) {
    return 0 == a ? "ROOT_VE_TYPE" : `${"ROOT_VE_TYPE"}.${a}`
}

function lg(a = 0) {
    return N(kg(a), void 0)
}

function mg(a = 0) {
    return (a = lg(a)) ? new ig({
        veType: a,
        youtubeData: void 0
    }) : null
}

function ng() {
    let a = N("csn-to-ctt-auth-info");
    a || (a = {}, L("csn-to-ctt-auth-info", a));
    return a
}

function Y(a = 0) {
    let b = N(jg(a));
    if (!b && !N("USE_CSN_FALLBACK", !0)) return null;
    b || !O("use_undefined_csn_any_layer") && 0 != a || (b = "UNDEFINED_CSN");
    return b ? b : null
}

function og(a, b, c) {
    const d = ng();
    (c = Y(c)) && delete d[c];
    b && (d[a] = b)
}

function pg(a) {
    return ng()[a]
}

function qg(a, b, c = 0, d) {
    if (a !== N(jg(c)) || b !== N(kg(c))) og(a, d, c), L(jg(c), a), L(kg(c), b), b = () => {
        setTimeout(() => {
            if (a) {
                const e = {
                    clientDocumentNonce: bg,
                    clientScreenNonce: a
                };
                O("use_default_heartbeat_client") ? W("foregroundHeartbeatScreenAssociated", e) : R("foregroundHeartbeatScreenAssociated", e, eg)
            }
        }, 0)
    }, "requestAnimationFrame" in window ? window.requestAnimationFrame(b) : b()
};
const rg = [{
    W: a => `Cannot read property '${a.key}'`,
    N: {
        Error: [{
            u: /(Permission denied) to access property "([^']+)"/,
            groups: ["reason", "key"]
        }],
        TypeError: [{
            u: /Cannot read property '([^']+)' of (null|undefined)/,
            groups: ["key", "value"]
        }, {
            u: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
            groups: ["value", "key"]
        }, {
            u: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
            groups: ["value", "key"]
        }, {
            u: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
            groups: ["key"]
        }, {
            u: /Unable to get property '([^']+)' of (undefined or null) reference/,
            groups: ["key", "value"]
        }, {
            u: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
            groups: ["value", "base", "key"]
        }]
    }
}, {
    W: a => `Cannot call '${a.key}'`,
    N: {
        TypeError: [{
            u: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
            groups: ["base", "key"]
        }, {
            u: /([^ ]+) called on (null or undefined)/,
            groups: ["key", "value"]
        }, {
            u: /Object (.*) has no method '([^ ]+)'/,
            groups: ["base", "key"]
        }, {
            u: /Object doesn't support property or method '([^ ]+)'/,
            groups: ["key"]
        }, {
            u: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
            groups: ["key"]
        }, {
            u: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
            groups: ["key"]
        }]
    }
}, {
    W: a => `${a.key} is not defined`,
    N: {
        ReferenceError: [{
            u: /(.*) is not defined/,
            groups: ["key"]
        }, {
            u: /Can't find variable: (.*)/,
            groups: ["key"]
        }]
    }
}];
var tg = {
    D: [],
    C: [{
        ma: sg,
        weight: 500
    }]
};

function sg(a) {
    if ("JavaException" === a.name) return !0;
    a = a.stack;
    return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://")
};

function ug() {
    if (!vg) {
        var a = vg = new wg;
        a.D.length = 0;
        a.C.length = 0;
        xg(a, tg)
    }
    return vg
}

function xg(a, b) {
    b.D && a.D.push.apply(a.D, b.D);
    b.C && a.C.push.apply(a.C, b.C)
}
var wg = class {
        constructor() {
            this.C = [];
            this.D = []
        }
    },
    vg;
const yg = new I;

function zg(a) {
    const b = a.length;
    let c = 0;
    const d = () => a.charCodeAt(c++);
    do {
        var e = Ag(d);
        if (Infinity === e) break;
        const f = e >> 3;
        switch (e & 7) {
            case 0:
                e = Ag(d);
                if (2 === f) return e;
                break;
            case 1:
                if (2 === f) return;
                c += 8;
                break;
            case 2:
                e = Ag(d);
                if (2 === f) return a.substr(c, e);
                c += e;
                break;
            case 5:
                if (2 === f) return;
                c += 4;
                break;
            default:
                return
        }
    } while (c < b)
}

function Ag(a) {
    let b = a(),
        c = b & 127;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 7;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 14;
    if (128 > b) return c;
    b = a();
    return 128 > b ? c | (b & 127) << 21 : Infinity
};

function Bg(a, b, c, d) {
    if (a)
        if (Array.isArray(a)) {
            var e = d;
            for (d = 0; d < a.length && !(a[d] && (e += Cg(d, a[d], b, c), 500 < e)); d++);
            d = e
        } else if ("object" === typeof a)
        for (e in a) {
            if (a[e]) {
                var f = e;
                var g = a[e],
                    h = b,
                    k = c;
                f = "string" !== typeof g || "clickTrackingParams" !== f && "trackingParams" !== f ? 0 : (g = zg(atob(g.replace(/-/g, "+").replace(/_/g, "/")))) ? Cg(`${f}.ve`, g, h, k) : 0;
                d += f;
                d += Cg(e, a[e], b, c);
                if (500 < d) break
            }
        } else c[b] = Dg(a), d += c[b].length;
    else c[b] = Dg(a), d += c[b].length;
    return d
}

function Cg(a, b, c, d) {
    c += `.${a}`;
    a = Dg(b);
    d[c] = a;
    return c.length + a.length
}

function Dg(a) {
    try {
        return ("string" === typeof a ? a : String(JSON.stringify(a))).substr(0, 500)
    } catch (b) {
        return `unable to serialize ${typeof a} (${b.message})`
    }
};
var Eg = new Set,
    Fg = 0,
    Gg = 0,
    Hg = 0,
    Ig = [];
const Jg = ["PhantomJS", "Googlebot", "TO STOP THIS SECURITY SCAN go/scan"];

function Kg(a) {
    Lg(a)
}

function Mg(a) {
    Lg(a, "WARNING")
}

function Lg(a, b = "ERROR") {
    var c = {};
    c.name = N("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
    c.version = N("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0);
    Ng(a, c || {}, b)
}

function Ng(a, b, c = "ERROR") {
    if (a) {
        a.hasOwnProperty("level") && a.level && (c = a.level);
        if (O("console_log_js_exceptions")) {
            var d = [];
            d.push(`Name: ${a.name}`);
            d.push(`Message: ${a.message}`);
            a.hasOwnProperty("params") && d.push(`Error Params: ${JSON.stringify(a.params)}`);
            a.hasOwnProperty("args") && d.push(`Error args: ${JSON.stringify(a.args)}`);
            d.push(`File name: ${a.fileName}`);
            d.push(`Stacktrace: ${a.stack}`);
            window.console.log(d.join("\n"), a)
        }
        if (!(5 <= Fg)) {
            var e = $b(a);
            d = e.message || "Unknown Error";
            const w =
                e.name || "UnknownError";
            var f = e.stack || a.i || "Not available";
            if (f.startsWith(`${w}: ${d}`)) {
                var g = f.split("\n");
                g.shift();
                f = g.join("\n")
            }
            g = e.lineNumber || "Not available";
            e = e.fileName || "Not available";
            let z = 0;
            if (a.hasOwnProperty("args") && a.args && a.args.length)
                for (var h = 0; h < a.args.length && !(z = Bg(a.args[h], `params.${h}`, b, z), 500 <= z); h++);
            else if (a.hasOwnProperty("params") && a.params) {
                const M = a.params;
                if ("object" === typeof a.params)
                    for (h in M) {
                        if (!M[h]) continue;
                        const X = `params.${h}`,
                            ja = Dg(M[h]);
                        b[X] = ja;
                        z +=
                            X.length + ja.length;
                        if (500 < z) break
                    } else b.params = Dg(M)
            }
            if (Ig.length)
                for (h = 0; h < Ig.length && !(z = Bg(Ig[h], `params.context.${h}`, b, z), 500 <= z); h++);
            navigator.vendor && !b.hasOwnProperty("vendor") && (b["device.vendor"] = navigator.vendor);
            b = {
                message: d,
                name: w,
                lineNumber: g,
                fileName: e,
                stack: f,
                params: b,
                sampleWeight: 1
            };
            d = Number(a.columnNumber);
            isNaN(d) || (b.lineNumber = `${b.lineNumber}:${d}`);
            if ("IGNORED" === a.level) var k = 0;
            else a: {
                a = ug();d = b;
                for (k of a.D)
                    if (d.message && d.message.match(k.za)) {
                        k = k.weight;
                        break a
                    }
                for (var n of a.C)
                    if (n.ma(d)) {
                        k =
                            n.weight;
                        break a
                    }
                k = 1
            }
            b.sampleWeight = k;
            k = b;
            for (var l of rg)
                if (l.N[k.name]) {
                    n = l.N[k.name];
                    for (var p of n)
                        if (n = k.message.match(p.u)) {
                            k.params["params.error.original"] = n[0];
                            a = p.groups;
                            b = {};
                            for (d = 0; d < a.length; d++) b[a[d]] = n[d + 1], k.params[`params.error.${a[d]}`] = n[d + 1];
                            k.message = l.W(b);
                            break
                        }
                }
            k.params || (k.params = {});
            l = ug();
            k.params["params.errorServiceSignature"] = `msg=${l.D.length}&cb=${l.C.length}`;
            k.params["params.serviceWorker"] = "true";
            v.document && v.document.querySelectorAll && (k.params["params.fscripts"] =
                String(document.querySelectorAll("script:not([nonce])").length));
            wa("sample").constructor !== va && (k.params["params.fconst"] = "true");
            window.yterr && "function" === typeof window.yterr && window.yterr(k);
            if (0 !== k.sampleWeight && !Eg.has(k.message)) {
                "ERROR" === c ? (yg.X("handleError", k), O("record_app_crashed_web") && 0 === Hg && 1 === k.sampleWeight && (Hg++, l = {
                    appCrashType: "APP_CRASH_TYPE_BREAKPAD"
                }, O("report_client_error_with_app_crash_ks") || (l.systemHealth = {
                    crashData: {
                        clientError: {
                            logMessage: {
                                message: k.message
                            }
                        }
                    }
                }), W("appCrashed",
                    l)), Gg++) : "WARNING" === c && yg.X("handleWarning", k);
                b: {
                    for (r of Jg)
                        if ((l = za()) && 0 <= l.toLowerCase().indexOf(r.toLowerCase())) {
                            var r = !0;
                            break b
                        }
                    r = !1
                }
                if (r) var m = void 0;
                else {
                    l = {
                        stackTrace: k.stack
                    };
                    k.fileName && (l.filename = k.fileName);
                    r = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                    0 !== r.length && (1 !== r.length || isNaN(Number(r[0])) ? 2 !== r.length || isNaN(Number(r[0])) || isNaN(Number(r[1])) || (l.lineNumber = Number(r[0]), l.columnNumber = Number(r[1])) : l.lineNumber = Number(r[0]));
                    r = {
                        level: "ERROR_LEVEL_UNKNOWN",
                        message: k.message,
                        errorClassName: k.name,
                        sampleWeight: k.sampleWeight
                    };
                    "ERROR" === c ? r.level = "ERROR_LEVEL_ERROR" : "WARNING" === c && (r.level = "ERROR_LEVEL_WARNNING");
                    l = {
                        isObfuscated: !0,
                        browserStackInfo: l
                    };
                    p = {
                        pageUrl: window.location.href,
                        kvPairs: []
                    };
                    N("FEXP_EXPERIMENTS") && (p.experimentIds = N("FEXP_EXPERIMENTS"));
                    n = N("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS", void 0);
                    a = K.EXPERIMENT_FLAGS;
                    if ((!a || !a.web_disable_gel_stp_ecatcher_killswitch) && n)
                        for (var u of Object.keys(n)) p.kvPairs.push({
                            key: u,
                            value: String(n[u])
                        });
                    if (u = k.params)
                        for (m of Object.keys(u)) p.kvPairs.push({
                            key: `client.${m}`,
                            value: String(u[m])
                        });
                    m = N("SERVER_NAME", void 0);
                    u = N("SERVER_VERSION", void 0);
                    m && u && (p.kvPairs.push({
                        key: "server.name",
                        value: m
                    }), p.kvPairs.push({
                        key: "server.version",
                        value: u
                    }));
                    m = {
                        errorMetadata: p,
                        stackTrace: l,
                        logMessage: r
                    }
                }
                m && (W("clientError", m), ("ERROR" === c || O("errors_flush_gel_always_killswitch")) && be());
                try {
                    Eg.add(k.message)
                } catch (M) {}
                Fg++
            }
        }
    }
};
class Hf extends Ff {
    constructor(a) {
        super(arguments);
        this.csn = a
    }
}
const Nf = new Gf,
    Og = [];
let Qg = Pg,
    Rg = 0;

function Sg(a, b, c, d) {
    const e = d.filter(g => {
        g.csn !== b ? (g.csn = b, g = !0) : g = !1;
        return g
    });
    c = {
        csn: b,
        parentVe: c.getAsJson(),
        childVes: pa(e, g => g.getAsJson())
    };
    for (var f of d) d = f.getAsJson(), (ra(d) || !d.trackingParams && !d.veType) && Mg(Error("Child VE logged with no data"));
    f = {
        cttAuthInfo: pg(b),
        B: b
    };
    "UNDEFINED_CSN" == b ? Tg("visualElementAttached", c, f) : a ? R("visualElementAttached", c, a, f) : W("visualElementAttached", c, f)
}

function Ug(a, b, c, d) {
    c = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 1
    };
    d && (c.clientData = d);
    d = {
        cttAuthInfo: pg(b),
        B: b
    };
    "UNDEFINED_CSN" == b ? Tg("visualElementShown", c, d) : a ? R("visualElementShown", c, a, d) : W("visualElementShown", c, d)
}

function Vg(a, b, c, d = !1) {
    const e = d ? 16 : 8;
    c = {
        csn: b,
        ve: c.getAsJson(),
        eventType: e
    };
    d = {
        cttAuthInfo: pg(b),
        B: b,
        pa: d
    };
    "UNDEFINED_CSN" == b ? Tg("visualElementHidden", c, d) : a ? R("visualElementHidden", c, a, d) : W("visualElementHidden", c, d)
}

function Wg(a, b, c, d) {
    var e = "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";
    c = {
        csn: b,
        ve: c.getAsJson(),
        gestureType: e
    };
    d && (c.clientData = d);
    d = {
        cttAuthInfo: pg(b),
        B: b
    };
    "UNDEFINED_CSN" == b ? Tg("visualElementGestured", c, d) : a ? R("visualElementGestured", c, a, d) : W("visualElementGestured", c, d)
}

function Pg() {
    for (var a = Math.random() + "", b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        255 < e && (b[c++] = e & 255, e >>= 8);
        b[c++] = e
    }
    return Ma(b, 3)
}

function Tg(a, b, c) {
    Og.push({
        payloadName: a,
        payload: b,
        options: c
    });
    Rg || (Rg = Pf())
}

function Qf(a) {
    if (Og) {
        for (let b of Og) b.payload && (b.payload.csn = a.csn, R(b.payloadName, b.payload, null, b.options));
        Og.length = 0
    }
    Rg = 0
};

function Xg(a, b) {
    return b.data && b.data.loggingDirectives ? b.data.loggingDirectives.trackingParams || "" : b.data && b.data.trackingParams || ""
}

function Yg(a, b) {
    const c = Y(void 0);
    return null !== a.j && c != a.j ? (Mg(new Ae("VisibilityLogger called before newScreen()", {
        caller: b.tagName,
        previous_csn: a.csn,
        current_csn: c
    })), null) : c
}

function Zg(a) {
    return parseInt(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "", 10) || 1
}

function $g(a, b) {
    var c = Xg(0, b),
        d = b.visualElement ? b.visualElement : c,
        e = a.m.has(d);
    const f = a.i.get(d);
    a.m.add(d);
    a.i.set(d, !0);
    b.h && !e && b.h();
    if (c || b.visualElement)
        if (d = Yg(a, b)) {
            var g = !(!b.data || !b.data.loggingDirectives);
            if (Zg(b) || g) {
                var h = b.visualElement ? b.visualElement : new ig({
                    trackingParams: c
                });
                c = b.i;
                g || e ? Zg(b) & 4 ? f || (a = a.h, b = {
                    csn: d,
                    ve: h.getAsJson(),
                    eventType: 4
                }, c && (b.clientData = c), e = {
                    cttAuthInfo: pg(d),
                    B: d
                }, "UNDEFINED_CSN" == d ? Tg("visualElementShown", b, e) : a ? R("visualElementShown", b, a, e) : W("visualElementShown",
                    b, e)) : Zg(b) & 1 && !e && Ug(a.h, d, h, c) : Ug(a.h, d, h, c)
            }
        }
}
class ah {
    constructor() {
        this.m = new Set;
        this.l = new Set;
        this.i = new Map;
        this.j = null;
        this.h = Zf
    }
    clear() {
        this.m.clear();
        this.l.clear();
        this.i.clear();
        this.j = null
    }
}(function() {
    var a = ah;
    a.V = void 0;
    a.s = function() {
        return a.V ? a.V : a.V = new a
    }
})();
var bh = a => self.btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a)))).replace(/\+/g, "-").replace(/\//g, "_");
var ch = ["notifications_register", "notifications_check_registration"];
let dh = null;

function Z(a, b) {
    const c = {};
    c.key = a;
    c.value = b;
    return eh().then(d => new Promise((e, f) => {
        try {
            const g = d.transaction("swpushnotificationsstore", "readwrite").objectStore("swpushnotificationsstore").put(c);
            g.onsuccess = () => {
                e()
            };
            g.onerror = () => {
                f()
            }
        } catch (g) {
            f(g)
        }
    }))
}

function fh() {
    return Z("IndexedDBCheck", "testing IndexedDB").then(() => gh("IndexedDBCheck")).then(a => "testing IndexedDB" === a ? Promise.resolve() : Promise.reject()).then(() => !0).catch(() => !1)
}

function gh(a) {
    const b = new Ae("Error accessing DB");
    return eh().then(c => new Promise((d, e) => {
        try {
            const f = c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);
            f.onsuccess = () => {
                const g = f.result;
                d(g ? g.value : null)
            };
            f.onerror = () => {
                b.params = {
                    key: a,
                    source: "onerror"
                };
                e(b)
            }
        } catch (f) {
            b.params = {
                key: a,
                thrownError: String(f)
            }, e(b)
        }
    }), () => null)
}

function eh() {
    return dh ? Promise.resolve(dh) : new Promise((a, b) => {
        const c = self.indexedDB.open("swpushnotificationsdb");
        c.onerror = b;
        c.onsuccess = () => {
            const d = c.result;
            if (d.objectStoreNames.contains("swpushnotificationsstore")) dh = d, a(dh);
            else return self.indexedDB.deleteDatabase("swpushnotificationsdb"), eh()
        };
        c.onupgradeneeded = hh
    })
}

function hh(a) {
    a = a.target.result;
    a.objectStoreNames.contains("swpushnotificationsstore") && a.deleteObjectStore("swpushnotificationsstore");
    a.createObjectStore("swpushnotificationsstore", {
        keyPath: "key"
    })
};
const ih = {
    WEB_UNPLUGGED: "^unplugged/",
    WEB_UNPLUGGED_ONBOARDING: "^unplugged/",
    WEB_UNPLUGGED_OPS: "^unplugged/",
    WEB_UNPLUGGED_PUBLIC: "^unplugged/",
    WEB_CREATOR: "^creator/",
    WEB_KIDS: "^kids/",
    WEB_EXPERIMENTS: "^experiments/",
    WEB_MUSIC: "^music/",
    WEB_REMIX: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^main_app/|^sfv/"
};

function jh(a) {
    if (1 === a.length) return a[0];
    var b = ih.UNKNOWN_INTERFACE;
    if (b) {
        b = new RegExp(b);
        for (var c of a)
            if (b.exec(c)) return c
    }
    const d = [];
    Object.entries(ih).forEach(([e, f]) => {
        "UNKNOWN_INTERFACE" !== e && d.push(f)
    });
    c = new RegExp(d.join("|"));
    a.sort((e, f) => e.length - f.length);
    for (const e of a)
        if (!c.exec(e)) return e;
    return a[0]
}

function kh(a) {
    return `/youtubei/v1/${jh(a)}`
};
const lh = window;
class mh {
    constructor() {
        this.timing = {};
        this.clearResourceTimings = () => {};
        this.webkitClearResourceTimings = () => {};
        this.mozClearResourceTimings = () => {};
        this.msClearResourceTimings = () => {};
        this.oClearResourceTimings = () => {}
    }
}
var nh = lh.performance || lh.mozPerformance || lh.msPerformance || lh.webkitPerformance || new mh;
la(nh.clearResourceTimings || nh.webkitClearResourceTimings || nh.mozClearResourceTimings || nh.msClearResourceTimings || nh.oClearResourceTimings || ha, nh);
y("ytLoggingLatencyUsageStats_", v.ytLoggingLatencyUsageStats_ || {});

function oh() {
    ph.h || (ph.h = new ph);
    return ph.h
}

function qh(a, b, c = {}) {
    a.i.add(c.layer || 0);
    a.j = () => {
        rh(a, b, c);
        var d = mg(c.layer);
        if (d) {
            for (var e of a.m) sh(a, e[0], e[1] || d, c.layer);
            for (const h of a.A) {
                e = Y(0);
                var f = h[0] || mg(0);
                if (e && f) {
                    d = a.client;
                    var g = h[1];
                    f = {
                        csn: e,
                        ve: f.getAsJson(),
                        clientData: g
                    };
                    g = {
                        cttAuthInfo: pg(e),
                        B: e
                    };
                    "UNDEFINED_CSN" == e ? Tg("visualElementStateChanged", f, g) : d ? R("visualElementStateChanged", f, d, g) : W("visualElementStateChanged", f, g)
                }
            }
        }
    };
    Y(c.layer) || a.j();
    if (c.da)
        for (const d of c.da) th(a, d, c.layer);
    else Lg(Error("Delayed screen needs a data promise."))
}

function rh(a, b, c = {}) {
    c.layer || (c.layer = 0);
    var d = void 0 !== c.Ba ? c.Ba : c.layer;
    var e = Y(d);
    d = mg(d);
    let f;
    d && (void 0 !== c.parentCsn ? f = {
        clientScreenNonce: c.parentCsn,
        visualElement: d
    } : e && "UNDEFINED_CSN" !== e && (f = {
        clientScreenNonce: e,
        visualElement: d
    }));
    var g, h = N("EVENT_ID");
    "UNDEFINED_CSN" === e && h && (g = {
        servletData: {
            serializedServletEventId: h
        }
    });
    let k;
    try {
        var n = a.client;
        h = f;
        var l = c.ca,
            p = c.cttAuthInfo,
            r = c.ab;
        const w = Qg(),
            z = {
                csn: w,
                pageVe: (new ig({
                    veType: b,
                    youtubeData: g
                })).getAsJson()
            };
        h && h.visualElement ? (z.implicitGesture = {
            parentCsn: h.clientScreenNonce,
            gesturedVe: h.visualElement.getAsJson()
        }, r && (z.implicitGesture.gestureType = r)) : h && Mg(new Ae("newScreen() parent element does not have a VE - rootVe", b));
        l && (z.cloneCsn = l);
        l = {
            cttAuthInfo: p,
            B: w
        };
        n ? R("screenCreated", z, n, l) : W("screenCreated", z, l);
        var m = new Hf(w);
        n = Nf;
        const M = Of();
        M && M.publish.call(M, n.toString(), n, m);
        k = w
    } catch (w) {
        a = w;
        c = [{
            kb: b,
            rootVe: d,
            parentVisualElement: void 0,
            Ya: e,
            gb: f,
            ca: c.ca
        }];
        a.args || (a.args = []);
        a.args.push(...c);
        Lg(w);
        return
    }
    qg(k, b, c.layer, c.cttAuthInfo);
    if ((b = e && "UNDEFINED_CSN" !== e && d) && !(b = O("screen_manager_skip_hide_killswitch"))) {
        a: {
            for (u of Object.values(fg))
                if (Y(u) == e) {
                    var u = !0;
                    break a
                }
            u = !1
        }
        b = !u
    }
    b && Vg(a.client, e, d, !0);
    a.h[a.h.length - 1] && !a.h[a.h.length - 1].csn && (a.h[a.h.length - 1].csn = k || "");
    d = ah.s();
    d.clear();
    d.j = Y();
    d = mg(c.layer);
    e && "UNDEFINED_CSN" !== e && d && (O("web_mark_root_visible") || O("music_web_mark_root_visible")) && Ug(void 0, k, d, void 0);
    a.i.delete(c.layer || 0);
    a.j = void 0;
    for (const [w, z] of a.K) e = w, z.has(c.layer) && d && sh(a, e, d, c.layer);
    for (c =
        0; c < a.l.length; c++) {
        e = a.l[c];
        try {
            e()
        } catch (w) {
            Lg(w)
        }
    }
    a.l.length = 0;
    for (c = 0; c < a.o.length; c++) {
        e = a.o[c];
        try {
            e()
        } catch (w) {
            Lg(w)
        }
    }
}

function uh(a) {
    var b = 28631,
        c = {
            layer: 8
        };
    [28631].includes(b) || (Mg(new Ae("createClientScreen() called with a non-page VE", b)), b = 83769);
    c.isHistoryNavigation || a.h.push({
        rootVe: b,
        key: c.key || ""
    });
    a.m = [];
    a.A = [];
    c.da ? qh(a, b, c) : rh(a, b, c)
}

function th(a, b, c = 0) {
    b.then(d => {
        var e, f;
        a.i.has(c) && a.j && a.j();
        const g = Y(c),
            h = mg(c);
        g && h && ((null === (e = null === d || void 0 === d ? void 0 : d.response) || void 0 === e ? 0 : e.trackingParams) && Sg(a.client, g, h, [new ig({
            trackingParams: d.response.trackingParams
        })]), (null === (f = null === d || void 0 === d ? void 0 : d.playerResponse) || void 0 === f ? 0 : f.trackingParams) && Sg(a.client, g, h, [new ig({
            trackingParams: d.playerResponse.trackingParams
        })]))
    })
}

function sh(a, b, c, d = 0) {
    if (a.i.has(d)) a.m.push([b, c]);
    else {
        var e = Y(d);
        c = c || mg(d);
        e && c && Sg(a.client, e, c, [b])
    }
}

function vh(a, b) {
    b = new ig({
        trackingParams: b
    });
    sh(a, b, void 0, 8);
    return b
}

function wh(a, b, c = 0) {
    (c = Y(c)) && Wg(a.client, c, b, void 0)
}

function xh(a, b, c, d = 0) {
    if (!b) return !1;
    d = Y(d);
    if (!d) return !1;
    Wg(a.client, d, new ig({
        trackingParams: b
    }), c);
    return !0
}

function yh(a, b) {
    const c = b.sa && b.sa();
    b.visualElement ? wh(a, b.visualElement, c) : (b = Xg(ah.s(), b), xh(a, b))
}
var ph = class {
    constructor() {
        this.m = [];
        this.A = [];
        this.h = [];
        this.l = [];
        this.o = [];
        this.i = new Set;
        this.K = new Map
    }
    clickCommand(a, b, c = 0) {
        return xh(this, a.clickTrackingParams, b, c)
    }
};
var zh = class extends D {
    constructor(a) {
        super(a)
    }
};
var Ah = class extends D {
    constructor(a) {
        super(a)
    }
};
Ah.ja = "yt.sw.adr";

function Bh(a) {
    return t(function*() {
        var b = yield v.fetch(a.i);
        if (200 !== b.status) return Promise.reject("Server error when retrieving AmbientData");
        b = yield b.text();
        if (!b.startsWith(")]}'\n")) return Promise.reject("Incorrect JSPB formatting");
        a: {
            b = JSON.parse(b.substring(5));
            for (let c = 0; c < b.length; c++)
                if (b[c][0] === (new Ah).constructor.ja) {
                    b = new Ah(b[c]);
                    break a
                }
            b = null
        }
        return b ? b : Promise.reject("AmbientData missing from response")
    })
}

function Ch(a) {
    var b = Dh.h;
    a = void 0 === a ? !1 : a;
    return t(function*() {
        if (a || !b.h) b.h = Bh(b).then(b.j).catch(c => {
            delete b.h;
            Lg(c)
        });
        return b.h
    })
}
var Dh = class {
    constructor() {
        this.i = `${self.location.origin}/sw.js_data`
    }
    j(a) {
        const b = ub(a, zh, 2);
        if (b) {
            const c = E(b, 5);
            c && (v.__SAPISID = c);
            null != E(b, 7) && L("VISITOR_DATA", E(b, 7));
            null != E(b, 4) && L("SESSION_INDEX", String(E(b, 4)));
            null != E(b, 8) && L("DELEGATED_SESSION_ID", E(b, 8))
        }
        return a
    }
};

function Eh(a) {
    const b = {};
    var c = Yb();
    c && (b.Authorization = c, c = a = null === a || void 0 === a ? void 0 : a.sessionIndex, void 0 === c && (c = Number(N("SESSION_INDEX", 0)), c = isNaN(c) ? 0 : c), b["X-Goog-AuthUser"] = c, "INNERTUBE_HOST_OVERRIDE" in K || (b["X-Origin"] = window.location.origin), void 0 === a && "DELEGATED_SESSION_ID" in K && (b["X-Goog-PageId"] = N("DELEGATED_SESSION_ID")));
    return b
}
var Fh = class {
    constructor() {
        this.Da = !0
    }
};
var Gh = {
    identityType: "UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"
};

function Hh(a, b) {
    b.encryptedTokenJarContents && (a.h[b.encryptedTokenJarContents] = b, "string" === typeof b.expirationSeconds && setTimeout(() => {
        delete a.h[b.encryptedTokenJarContents]
    }, 1E3 * Number(b.expirationSeconds)))
}
var Ih = class {
    constructor() {
        this.h = {}
    }
    handleResponse(a, b) {
        var c, d, e;
        b = (null === (d = null === (c = b.H.context) || void 0 === c ? void 0 : c.request) || void 0 === d ? void 0 : d.consistencyTokenJars) || [];
        if (a = null === (e = a.responseContext) || void 0 === e ? void 0 : e.consistencyTokenJar) {
            for (const f of b) delete this.h[f.encryptedTokenJarContents];
            Hh(this, a)
        }
    }
};

function Jh() {
    var a = N("INNERTUBE_CONTEXT");
    if (!a) return Lg(Error("Error: No InnerTubeContext shell provided in ytconfig.")), {};
    a = sa(a);
    O("web_no_tracking_params_in_shell_killswitch") || delete a.clickTracking;
    a.client || (a.client = {});
    var b = a.client;
    b.utcOffsetMinutes = -Math.floor((new Date).getTimezoneOffset());
    var c = pd();
    c ? b.experimentsToken = c : delete b.experimentsToken;
    Ih.h || (Ih.h = new Ih);
    b = Ih.h.h;
    c = [];
    let d = 0;
    for (const e in b) c[d++] = b[e];
    a.request = Object.assign(Object.assign({}, a.request), {
        consistencyTokenJars: c
    });
    a.user = Object.assign({}, a.user);
    return a
};

function Kh(a) {
    var b = a;
    if (a = N("INNERTUBE_HOST_OVERRIDE")) {
        a = String(a);
        var c = String,
            d = b.match(B);
        b = d[5];
        var e = d[6];
        d = d[7];
        var f = "";
        b && (f += b);
        e && (f += "?" + e);
        d && (f += "#" + d);
        b = a + c(f)
    }
    return b
};
var Lh = class {};
const Mh = {
    GET_DATASYNC_IDS: function(a) {
        return () => new a
    }(class extends Lh {})
};

function Nh(a) {
    var b = {
        Xa: {}
    };
    Fh.h || (Fh.h = new Fh);
    var c = Fh.h;
    if (void 0 !== Oh.h) {
        const d = Oh.h;
        a = [b !== d.m, a !== d.l, c !== d.j, !1, !1, void 0 !== d.i];
        if (a.some(e => e)) throw new Ae("InnerTubeTransportService is already initialized", a);
    } else Oh.h = new Oh(b, a, c)
}

function Ph(a, b, c) {
    return t(function*() {
        var d;
        if (a.j.Da) {
            const e = null === (d = null === b || void 0 === b ? void 0 : b.ba) || void 0 === d ? void 0 : d.sessionIndex;
            d = Eh({
                sessionIndex: e
            });
            d = Object.assign(Object.assign({}, Qh(c)), d)
        } else d = Rh(b, c);
        return d
    })
}

function Sh(a, b, c) {
    return t(function*() {
        var d, e, f, g;
        const h = null === (d = b.config) || void 0 === d ? void 0 : d.jb;
        if (h && a.h.has(h) && O("web_memoize_inflight_requests")) return a.h.get(h);
        if (null === (e = null === b || void 0 === b ? void 0 : b.H) || void 0 === e ? 0 : e.context)
            for (var k of []) k.hb(b.H.context);
        if (null === (f = a.i) || void 0 === f ? 0 : f.l(b.input, b.H)) return a.i.j(b.input, b.H);
        k = JSON.stringify(b.H);
        b.O = Object.assign(Object.assign({}, b.O), {
            headers: c
        });
        let n = Object.assign({}, b.O);
        "POST" === b.O.method && (n = Object.assign(Object.assign({},
            n), {
            body: k
        }));
        k = a.l.fetch(b.input, n, b.config);
        h && a.h.set(h, k);
        k = yield k;
        h && a.h.has(h) && a.h.delete(h);
        !k && (null === (g = a.i) || void 0 === g ? 0 : g.h(b.input, b.H)) && (k = yield a.i.i(b.input, b.H));
        return k
    })
}

function Th(a, b, c) {
    var d = void 0 === d ? {
        ba: {
            identity: Gh
        }
    } : d;
    b.context || (b.context = Jh());
    return new H(e => t(function*() {
        var f = Kh(c);
        f = Kd(f) ? "same-origin" : "cors";
        f = yield Ph(a, d, f);
        var g = Kh(c);
        var h = {};
        N("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT") && (null === f || void 0 === f ? 0 : f.Authorization) || (h.key = N("INNERTUBE_API_KEY"));
        O("json_condensed_response") && (h.prettyPrint = "false");
        g = Jd(g, h || {}, !1);
        h = {
            method: "POST",
            mode: Kd(g) ? "same-origin" : "cors",
            credentials: Kd(g) ? "same-origin" : "include"
        };
        e(Sh(a, {
            input: g,
            O: h,
            H: b,
            config: d
        }, f))
    }))
}

function Rh(a, b) {
    return t(function*() {
        var c, d = {
            sessionIndex: null === (c = null === a || void 0 === a ? void 0 : a.ba) || void 0 === c ? void 0 : c.sessionIndex
        };
        d = yield uc(Eh(d));
        return Promise.resolve(Object.assign(Object.assign({}, Qh(b)), d))
    })
}

function Qh(a) {
    const b = {
            "Content-Type": "application/json"
        },
        c = N("VISITOR_DATA");
    c && (b["X-Goog-Visitor-Id"] = c);
    "cors" !== a && ((a = N("INNERTUBE_CONTEXT_CLIENT_NAME")) && (b["X-Youtube-Client-Name"] = a), (a = N("INNERTUBE_CONTEXT_CLIENT_VERSION")) && (b["X-Youtube-Client-Version"] = a), (a = N("CHROME_CONNECTED_HEADER")) && (b["X-Youtube-Chrome-Connected"] = a), O("forward_domain_admin_state_on_embeds") && (a = N("DOMAIN_ADMIN_STATE")) && (b["X-Youtube-Domain-Admin-State"] = a));
    return b
}
var Oh = class {
    constructor(a, b, c) {
        this.m = a;
        this.l = b;
        this.j = c;
        this.i = void 0;
        this.h = new Map;
        a.Z || (a.Z = {});
        a.Z = Object.assign(Object.assign({}, Mh), a.Z)
    }
};
let Uh;

function Vh() {
    Uh || (Nh({
        fetch: (a, b) => uc(fetch(new Request(a, b)))
    }), Uh = Oh.h);
    return Uh
};

function Wh(a) {
    return t(function*() {
        yield Xh();
        Mg(a)
    })
}

function Yh(a) {
    t(function*() {
        var b = yield yf();
        b ? yield Xf(a, b): (yield Ch(), b = {
            timestamp: a.timestamp
        }, b = a.appShellAssetLoadReport ? {
            payloadName: "appShellAssetLoadReport",
            payload: a.appShellAssetLoadReport,
            options: b
        } : a.clientError ? {
            payloadName: "clientError",
            payload: a.clientError,
            options: b
        } : void 0, b && W(b.payloadName, b.payload))
    })
}

function Xh() {
    return t(function*() {
        try {
            yield Ch()
        } catch (a) {}
    })
};
const Zh = {
    granted: "GRANTED",
    denied: "DENIED",
    unknown: "UNKNOWN"
};

function $h(a) {
    var b = a.data;
    a = b.type;
    b = b.data;
    "notifications_register" === a ? (Z("IDToken", b), ai()) : "notifications_check_registration" === a && bi(b)
}

function ci() {
    return self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    }).then(a => {
        if (a)
            for (const b of a) b.postMessage({
                type: "update_unseen_notifications_count_signal"
            })
    })
}

function di(a) {
    const b = [];
    a.forEach(c => {
        b.push({
            key: c.key,
            value: c.value
        })
    });
    return b
}

function ei(a) {
    return t(function*() {
        const b = di(a.payload.chrome.extraUrlParams),
            c = {
                recipientId: a.recipientId,
                endpoint: a.payload.chrome.endpoint,
                extraUrlParams: b
            },
            d = kh($c);
        return fi().then(e => Th(e, c, d).then(f => {
            f.json().then(g => {
                if (!g || !g.endpointUrl) return Promise.resolve();
                a.payload.chrome.postedEndpoint && gi(a.payload.chrome.postedEndpoint);
                return hi(a, g.endpointUrl)
            })
        }))
    })
}

function ii(a, b) {
    var c = Y(8);
    return null != c && b ? `${a}&parentCsn=${c}&parentTrackingParams=${b}` : a
}

function hi(a, b) {
    var c;
    a.deviceId && Z("DeviceId", a.deviceId);
    a.timestampSec && Z("TimestampLowerBound", a.timestampSec);
    const d = a.payload.chrome,
        e = oh();
    uh(e);
    const f = null === (c = d.postedEndpoint) || void 0 === c ? void 0 : c.clickTrackingParams;
    if (f) {
        var g = vh(e, f);
        var h = hg(82046);
        var k = hg(74726);
        sh(e, h, g, 8);
        sh(e, k, g, 8);
        g = {
            ka: 8,
            visualElement: g
        };
        k = {
            ka: 8,
            visualElement: h
        };
        h = {
            ka: 8,
            visualElement: h
        }
    }
    const n = {
        body: d.body,
        icon: d.iconUrl,
        data: {
            nav: ii(b, f),
            id: d.notificationId,
            attributionTag: d.attributionTag,
            clickEndpoint: d.clickEndpoint,
            parentElement: g,
            cancelElement: k,
            dismissalElement: h,
            isDismissed: !0
        },
        tag: d.notificationTag || d.title + d.body + d.iconUrl,
        requireInteraction: !0
    };
    return self.registration.showNotification(d.title, n).then(() => {
        var l, p, r;
        (null === (l = n.data) || void 0 === l ? 0 : l.parentElement) && $g(ah.s(), n.data.parentElement);
        (null === (p = n.data) || void 0 === p ? 0 : p.cancelElement) && $g(ah.s(), n.data.cancelElement);
        (null === (r = n.data) || void 0 === r ? 0 : r.dismissalElement) && $g(ah.s(), n.data.dismissalElement);
        ji(a.displayCap)
    }).catch(() => {})
}

function gi(a) {
    if (!a.recordNotificationInteractionsEndpoint) return Promise.reject();
    const b = {
            serializedRecordNotificationInteractionsRequest: a.recordNotificationInteractionsEndpoint.serializedInteractionsRequest
        },
        c = kh(ad);
    return fi().then(d => Th(d, b, c))
}

function ji(a) {
    -1 !== a && self.registration.getNotifications().then(b => {
        var c;
        for (let d = 0; d < b.length - a; d++) b[d].data.isDismissed = !1, b[d].close(), (null === (c = b[d].data) || void 0 === c ? 0 : c.cancelElement) && yh(oh(), b[d].data.cancelElement)
    })
}

function bi(a) {
    const b = [ki(a), gh("RegistrationTimestamp").then(li), mi(), ni(), oi()];
    Promise.all(b).catch(() => {
        Z("IDToken", a);
        ai();
        return Promise.resolve()
    })
}

function li(a) {
    a = a || 0;
    return 9E7 >= Date.now() - a ? Promise.resolve() : Promise.reject()
}

function ki(a) {
    return gh("IDToken").then(b => a === b ? Promise.resolve() : Promise.reject())
}

function mi() {
    return gh("Permission").then(a => Notification.permission === a ? Promise.resolve() : Promise.reject())
}

function ni() {
    return gh("Endpoint").then(a => pi().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function oi() {
    return gh("application_server_key").then(a => qi().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function ri() {
    var a = Notification.permission;
    if (Zh[a]) return Zh[a]
}

function ai() {
    Z("RegistrationTimestamp", 0);
    Promise.all([pi(), si(), ti(), qi()]).then(a => {
        var [b, c, d, e] = a;
        a = c ? bh(c) : null;
        const f = d ? bh(d) : null,
            g = e ? Ma(new Uint8Array(e), 4) : null;
        ui(b, a, f, g)
    }).catch(() => {
        ui()
    })
}

function ui(a, b, c, d) {
    a = void 0 === a ? null : a;
    b = void 0 === b ? null : b;
    c = void 0 === c ? null : c;
    d = void 0 === d ? null : d;
    fh().then(e => {
        e && (Z("Endpoint", a), Z("P256dhKey", b), Z("AuthKey", c), Z("application_server_key", d), Z("Permission", Notification.permission), Promise.all([gh("DeviceId"), gh("NotificationsDisabled")]).then(f => {
            var [g, h] = f;
            if (null !== g && void 0 !== g) var k = g;
            else {
                f = [];
                var n;
                k = k || Hc.length;
                for (n = 0; 256 > n; n++) f[n] = Hc[0 | Math.random() * k];
                k = f.join("")
            }
            vi(k, null !== a && void 0 !== a ? a : void 0, null !== b && void 0 !== b ? b : void 0,
                null !== c && void 0 !== c ? c : void 0, null !== d && void 0 !== d ? d : void 0, null !== h && void 0 !== h ? h : void 0)
        }))
    })
}

function vi(a, b, c, d, e, f) {
    t(function*() {
        const g = {
                notificationRegistration: {
                    chromeRegistration: {
                        deviceId: a,
                        pushParams: {
                            applicationServerKey: e,
                            authKey: d,
                            p256dhKey: c,
                            browserEndpoint: b
                        },
                        notificationsDisabledInApp: f,
                        permission: ri()
                    }
                }
            },
            h = kh(bd);
        return fi().then(k => Th(k, g, h).then(() => {
            Z("DeviceId", a);
            Z("RegistrationTimestamp", Date.now());
            Z("TimestampLowerBound", Date.now())
        }, n => {
            Wh(n)
        }))
    })
}

function pi() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.endpoint) : Promise.resolve(null))
}

function si() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("p256dh")) : Promise.resolve(null))
}

function ti() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("auth")) : Promise.resolve(null))
}

function qi() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.options.applicationServerKey) : Promise.resolve(null))
}

function fi() {
    return t(function*() {
        try {
            return yield Ch(!0), Vh()
        } catch (a) {
            return yield Wh(a), Promise.reject(a)
        }
    })
};
let wi = void 0;

function xi(a) {
    return t(function*() {
        wi || (wi = yield a.open("yt-appshell-assets"));
        return wi
    })
}

function yi(a, b) {
    return t(function*() {
        const c = yield xi(a), d = b.map(e => zi(c, e));
        return Promise.all(d)
    })
}

function Ai(a, b) {
    return t(function*() {
        let c;
        try {
            c = yield a.match(b, {
                cacheName: "yt-appshell-assets"
            })
        } catch (d) {}
        return c
    })
}

function Bi(a, b) {
    return t(function*() {
        const c = yield xi(a), d = (yield c.keys()).filter(e => !b.includes(e.url)).map(e => c.delete(e));
        return Promise.all(d)
    })
}

function Ci(a, b, c) {
    return t(function*() {
        yield(yield xi(a)).put(b, c)
    })
}

function Di(a, b) {
    t(function*() {
        yield(yield xi(a)).delete(b)
    })
}

function zi(a, b) {
    return t(function*() {
        return (yield a.match(b)) ? Promise.resolve() : a.add(b)
    })
};
var Ei;
Ei = Sf("yt-serviceworker-metadata", {
    J: {
        auth: {
            L: 1
        },
        ["resource-manifest-assets"]: {
            L: 2
        }
    },
    Y: !0,
    upgrade(a, b) {
        b(1) && Ze(a, "resource-manifest-assets");
        b(2) && Ze(a, "auth")
    },
    version: 2
});
let Fi = null;

function Gi(a) {
    return pf(Ei(), a)
}

function Hi() {
    const a = Date.now();
    return IDBKeyRange.bound(0, a)
}

function Ii(a, b) {
    return t(function*() {
        yield V(yield Gi(a.token), ["resource-manifest-assets"], "readwrite", c => {
            const d = c.objectStore("resource-manifest-assets"),
                e = Date.now();
            return U(d.h.put(b, e)).then(() => {
                Fi = e;
                let f = !0;
                return df(d, {
                    query: Hi(),
                    direction: "prev"
                }, g => f ? (f = !1, g.advance(5)) : d.delete(g.getKey()).then(() => g.continue()))
            })
        })
    })
}

function Ji(a, b) {
    return t(function*() {
        let c = !1,
            d = 0;
        yield V(yield Gi(a.token), ["resource-manifest-assets"], "readonly", e => df(e.objectStore("resource-manifest-assets"), {
            query: Hi(),
            direction: "prev"
        }, f => {
            if (f.fa().includes(b)) c = !0;
            else return d += 1, f.continue()
        }));
        return c ? d : -1
    })
}

function Ki(a) {
    return t(function*() {
        Fi || (yield V(yield Gi(a.token), ["resource-manifest-assets"], "readonly", b => df(b.objectStore("resource-manifest-assets"), {
            query: Hi(),
            direction: "prev"
        }, c => {
            Fi = c.getKey()
        })));
        return Fi
    })
}
var Li = class {
    constructor(a) {
        this.token = a
    }
    static s() {
        return t(function*() {
            const a = yield yf();
            if (a) return Li.h || (Li.h = new Li(a)), Li.h
        })
    }
};

function Mi(a, b) {
    return t(function*() {
        yield af(yield Gi(a.token), "auth", b, "shell_identifier_key")
    })
}

function Ni(a) {
    return t(function*() {
        return (yield(yield Gi(a.token)).get("auth", "shell_identifier_key")) || ""
    })
}

function Oi(a) {
    return t(function*() {
        yield(yield Gi(a.token)).clear("auth")
    })
}
var Pi = class {
    constructor(a) {
        this.token = a
    }
    static s() {
        return t(function*() {
            const a = yield yf();
            if (a) return Pi.h || (Pi.h = new Pi(a)), Pi.h
        })
    }
};

function Qi() {
    t(function*() {
        const a = yield Pi.s();
        a && (yield Oi(a))
    })
};

function Ri() {
    return {
        1: Mb
    }
}
var Si = class extends D {
    constructor(a) {
        super(a)
    }
};

function Kb() {
    return {
        1: [Nb, Si, Ri]
    }
}
var Jb = class extends D {
        constructor(a) {
            super(a, -1, Ti)
        }
    },
    Ti = [1];

function Ui(a) {
    return t(function*() {
        const b = a.headers.get("X-Resource-Manifest");
        return b ? Promise.resolve(Vi(b)) : Promise.reject(Error("No resource manifest header"))
    })
}

function Vi(a) {
    return vb(Lb(decodeURIComponent(a)), Si, 1).reduce((b, c) => {
        (c = E(c, 1)) && b.push(c);
        return b
    }, [])
};

function Wi(a) {
    return t(function*() {
        const b = yield Ch();
        if (b && null != E(b, 3)) {
            var c = yield Pi.s();
            c && (c = yield Ni(c), E(b, 3) !== c && (Di(a.h, a.i), Qi()))
        }
    })
}

function Xi(a) {
    return t(function*() {
        let b, c;
        try {
            c = yield Yi(a.j), b = yield Ui(c), yield yi(a.h, b)
        } catch (d) {
            return Promise.reject(d)
        }
        try {
            yield Zi(), yield Ci(a.h, a.i, c)
        } catch (d) {
            return Promise.reject(d)
        }
        if (b) try {
            yield $i(a, b, a.i)
        } catch (d) {}
        return Promise.resolve()
    })
}

function aj(a) {
    return t(function*() {
        yield Wi(a);
        return Xi(a)
    })
}

function Yi(a) {
    return t(function*() {
        try {
            return yield v.fetch(new Request(a))
        } catch (b) {
            return Promise.reject(b)
        }
    })
}

function Zi() {
    return t(function*() {
        var a = yield Ch();
        let b;
        a && null != E(a, 3) && (b = E(a, 3));
        return b ? (a = yield Pi.s()) ? Promise.resolve(Mi(a, b)) : Promise.reject(Error("Could not get AuthMonitor instance")) : Promise.reject(Error("Could not get datasync ID"))
    })
}

function $i(a, b, c) {
    return t(function*() {
        const d = yield Li.s();
        if (d) try {
            yield Ii(d, b)
        } catch (e) {
            yield Wh(e)
        }
        b.push(c);
        try {
            yield Bi(a.h, b)
        } catch (e) {
            yield Wh(e)
        }
        return Promise.resolve()
    })
}

function bj(a, b) {
    return t(function*() {
        return Ai(a.h, b)
    })
}

function cj(a) {
    return t(function*() {
        return Ai(a.h, a.i)
    })
}
var dj = class {
    constructor() {
        var a = self.location.origin + "/app_shell",
            b = self.location.origin + "/app_shell_home";
        this.h = self.caches;
        this.j = a;
        this.i = b
    }
};

function ej(a, b) {
    return t(function*() {
        const c = b.request,
            d = yield bj(a.h, c.url);
        if (d) return Yh({
            appShellAssetLoadReport: {
                assetPath: c.url,
                cacheHit: !0
            },
            timestamp: Q()
        }), d;
        fj(c);
        return gj(b)
    })
}

function hj(a, b) {
    return t(function*() {
        const c = yield ij(b);
        if (c.response && (c.response.ok || "opaqueredirect" === c.response.type || 429 === c.response.status || 303 === c.response.status || 300 <= c.response.status && 400 > c.response.status)) return c.response;
        const d = yield cj(a.h);
        if (d) return jj(a), d;
        kj(a);
        return c.response ? c.response : Promise.reject(c.error)
    })
}

function lj(a, b) {
    b = new URL(b);
    if (!a.i.includes(b.pathname)) return !1;
    if (!b.search) return !0;
    for (const c of a.l)
        if (a = b.searchParams.get(c.key), void 0 === c.value || a === c.value)
            if (b.searchParams.delete(c.key), !b.search) return !0;
    return !1
}

function mj(a, b) {
    return t(function*() {
        const c = yield cj(a.h);
        if (!c) return kj(a), gj(b);
        jj(a);
        var d;
        a: {
            if (c.headers && (d = c.headers.get("date")) && (d = Date.parse(d), !isNaN(d))) {
                d = Math.round(Q() - d);
                break a
            }
            d = -1
        }
        if (!(-1 < d && 7 <= d / 864E5)) return c;
        d = yield ij(b);
        return d.response && d.response.ok ? d.response : c
    })
}

function gj(a) {
    return Promise.resolve(a.preloadResponse).then(b => b || v.fetch(a.request))
}

function fj(a) {
    const b = {
        assetPath: a.url,
        cacheHit: !1
    };
    Li.s().then(c => {
        if (c) {
            var d = Ki(c).then(e => {
                e && (b.currentAppBundleTimestampSec = String(Math.floor(e / 1E3)))
            });
            c = Ji(c, a.url).then(e => {
                b.appBundleVersionDiffCount = e
            });
            Promise.all([d, c]).catch(e => {
                Wh(e)
            }).finally(() => {
                Yh({
                    appShellAssetLoadReport: b,
                    timestamp: Q()
                })
            })
        } else Yh({
            appShellAssetLoadReport: b,
            timestamp: Q()
        })
    })
}

function jj(a) {
    Yh({
        appShellAssetLoadReport: {
            assetPath: a.h.i,
            cacheHit: !0
        },
        timestamp: Q()
    })
}

function kj(a) {
    Yh({
        appShellAssetLoadReport: {
            assetPath: a.h.i,
            cacheHit: !1
        },
        timestamp: Q()
    })
}

function ij(a) {
    return t(function*() {
        try {
            return {
                response: yield gj(a)
            }
        } catch (b) {
            return {
                error: b
            }
        }
    })
}
var sj = class {
    constructor() {
        var a = nj,
            b = oj,
            c = pj,
            d = qj;
        const e = [];
        e.push({
            key: "feature",
            value: "ytca"
        });
        for (var f of Pb) e.push({
            key: f
        });
        f = rj();
        this.h = a;
        this.m = b;
        this.o = c;
        this.i = d;
        this.l = e;
        this.j = f
    }
};
var qj = ["/", "/feed/downloads"];
const tj = [/^\/$/, /^\/feed\/downloads$/],
    uj = [/^\/$/, /^\/feed\/\w*/, /^\/results$/, /^\/playlist$/, /^\/watch$/, /^\/channel\/\w*/];

function rj() {
    return new RegExp((O("kevlar_sw_app_wide_fallback") ? uj : tj).map(a => a.source).join("|"))
}
var oj = /^https:\/\/[\w-]*\.?youtube\.com.*(\.css$|\.js$|\.ico$|\/ytmweb\/_\/js\/|\/ytmweb\/_\/ss\/)/,
    pj = /^https:\/\/[\w-]*\.?youtube\.com.*(purge_shell=1|\/signin|\/logout)/;
var vj = class {
    constructor() {
        var a = nj,
            b = new sj;
        this.h = self;
        this.i = a;
        this.m = b;
        this.K = ch
    }
    init() {
        this.h.oninstall = this.o.bind(this);
        this.h.onactivate = this.j.bind(this);
        this.h.onfetch = this.l.bind(this);
        this.h.onmessage = this.A.bind(this)
    }
    o(a) {
        this.h.skipWaiting();
        const b = aj(this.i).catch(c => {
            Wh(c);
            return Promise.resolve()
        });
        a.waitUntil(b)
    }
    j(a) {
        const b = [this.h.clients.claim()];
        this.h.registration.navigationPreload && b.push(this.h.registration.navigationPreload.enable());
        a.waitUntil(Promise.all(b))
    }
    l(a) {
        const b = this;
        return t(function*() {
            var c = b.m,
                d = !!b.h.registration.navigationPreload;
            const e = a.request;
            if (c.o.test(e.url)) Dh.h && (delete Dh.h.h, v.__SAPISID = void 0, L("VISITOR_DATA", void 0), L("SESSION_INDEX", void 0), L("DELEGATED_SESSION_ID", void 0)), d = a.respondWith, c = c.h, Di(c.h, c.i), Qi(), c = gj(a), d.call(a, c);
            else if (c.m.test(e.url)) a.respondWith(ej(c,
                a));
            else if ("navigate" === e.mode) {
                if (O("sw_nav_request_network_first")) {
                    var f = new URL(e.url);
                    f = c.j.test(f.pathname)
                } else f = !1;
                f ? a.respondWith(hj(c, a)) : lj(c, e.url) ? a.respondWith(mj(c, a)) : d && a.respondWith(gj(a))
            }
        })
    }
    A(a) {
        const b = a.data;
        this.K.includes(b.type) ? $h(a) : "refresh_shell" === b.type && Xi(this.i).catch(c => {
            Wh(c)
        })
    }
};
var wj = class {
    static s() {
        let a = x("ytglobal.storage_");
        a || (a = new wj, y("ytglobal.storage_", a));
        return a
    }
    estimate() {
        return t(function*() {
            var a, b;
            const c = navigator;
            if (null === (a = c.storage) || void 0 === a ? 0 : a.estimate) return c.storage.estimate();
            if (null === (b = c.webkitTemporaryStorage) || void 0 === b ? 0 : b.queryUsageAndQuota) return xj()
        })
    }
};

function xj() {
    const a = navigator;
    return new Promise((b, c) => {
        var d;
        null !== (d = a.webkitTemporaryStorage) && void 0 !== d && d.queryUsageAndQuota ? a.webkitTemporaryStorage.queryUsageAndQuota((e, f) => {
            b({
                usage: e,
                quota: f
            })
        }, e => {
            c(e)
        }) : c(Error("webkitTemporaryStorage is not supported."))
    })
}
y("ytglobal.storageClass_", wj);

function yj(a, b) {
    wj.s().estimate().then(c => {
        c = Object.assign(Object.assign({}, b), {
            isSw: void 0 === self.document,
            isIframe: self !== self.top,
            deviceStorageUsageMbytes: zj(null === c || void 0 === c ? void 0 : c.usage),
            deviceStorageQuotaMbytes: zj(null === c || void 0 === c ? void 0 : c.quota)
        });
        a.h("idbQuotaExceeded", c)
    })
}
class Aj {
    constructor() {
        var a = Bj;
        this.handleError = Cj;
        this.h = a;
        this.i = !1;
        void 0 === self.document || self.addEventListener("beforeunload", () => {
            this.i = !0
        });
        this.j = Math.random() <= od("ytidb_transaction_ended_event_rate_limit", .02)
    }
    M(a, b) {
        switch (a) {
            case "IDB_DATA_CORRUPTED":
                O("idb_data_corrupted_killswitch") || this.h("idbDataCorrupted", b);
                break;
            case "IDB_UNEXPECTEDLY_CLOSED":
                this.h("idbUnexpectedlyClosed", b);
                break;
            case "IS_SUPPORTED_COMPLETED":
                O("idb_is_supported_completed_killswitch") || this.h("idbIsSupportedCompleted", b);
                break;
            case "QUOTA_EXCEEDED":
                yj(this, b);
                break;
            case "TRANSACTION_ENDED":
                this.j && this.h("idbTransactionEnded", b);
                break;
            case "TRANSACTION_UNEXPECTEDLY_ABORTED":
                a =
                    Object.assign(Object.assign({}, b), {
                        hasWindowUnloaded: this.i
                    }), this.h("idbTransactionAborted", a)
        }
    }
}

function zj(a) {
    return "undefined" === typeof a ? "-1" : String(Math.ceil(a / 1048576))
};
xg(ug(), {
    D: [{
        za: /Failed to fetch/,
        weight: 500
    }],
    C: []
});
var {
    handleError: Cj = Kg,
    M: Bj = W
} = {
    handleError: function(a) {
        return t(function*() {
            yield Xh();
            Lg(a)
        })
    },
    M: function(a, b) {
        return t(function*() {
            yield Xh();
            W(a, b)
        })
    }
};
for (we = new Aj; 0 < ve.length;) {
    const a = ve.shift();
    switch (a.type) {
        case "ERROR":
            we.handleError(a.payload);
            break;
        case "EVENT":
            we.M(a.eventType, a.payload)
    }
}
Dh.h = new Dh;
self.onnotificationclick = function(a) {
    a.notification.close();
    const b = a.notification.data;
    b.isDismissed = !1;
    const c = self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    });
    c.then(d => {
        a: {
            var e = b.nav;
            for (const f of d)
                if (f.url === e) {
                    f.focus();
                    break a
                }
            self.clients.openWindow(e)
        }
    });
    a.waitUntil(c);
    a.waitUntil(gi(b.clickEndpoint))
};
self.onnotificationclose = function(a) {
    var b = a.notification.data;
    if (null === b || void 0 === b ? 0 : b.parentElement) {
        b.isDismissed && (null === b || void 0 === b ? 0 : b.dismissalElement) && yh(oh(), b.dismissalElement);
        a = ah.s();
        var c = b.parentElement,
            d = Xg(0, c);
        b = c.visualElement ? c.visualElement : d;
        var e = a.l.has(b);
        const f = a.i.get(b);
        a.l.add(b);
        a.i.set(b, !1);
        !1 !== f && (d || c.visualElement) && (!(b = Yg(a, c)) || !Zg(c) && c.data && c.data.loggingDirectives || (d = c.visualElement ? c.visualElement : new ig({
                trackingParams: d
            }), Zg(c) & 8 ? Vg(a.h, b, d) :
            Zg(c) & 2 && !e && (a = a.h, c = {
                csn: b,
                ve: d.getAsJson(),
                eventType: 2
            }, e = {
                cttAuthInfo: pg(b),
                B: b
            }, "UNDEFINED_CSN" == b ? Tg("visualElementHidden", c, e) : a ? R("visualElementHidden", c, a, e) : W("visualElementHidden", c, e))))
    }
};
self.onpush = function(a) {
    a.waitUntil(gh("NotificationsDisabled").then(b => {
        if (b) return Promise.resolve();
        if (a.data && a.data.text().length) try {
            return ei(a.data.json())
        } catch (c) {
            return Promise.resolve(c.message)
        }
        return Promise.resolve()
    }));
    a.waitUntil(ci())
};
self.onpushsubscriptionchange = function() {
    ai()
};
const nj = new dj;
(new vj).init();