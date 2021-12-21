/*! For license information please see script.js.LICENSE.txt */
(() => {
    "use strict";
    var e = {
        733: (e, t, r) => {
            r.r(t), r.d(t, {
                Properties: () => n,
                VariableDescriptor: () => o,
                bootstrapExtra: () => K,
                findLayerBoundaries: () => c,
                findLayersBoundaries: () => u,
                getAllVariables: () => i,
                getLayersMap: () => l,
                initDoors: () => q,
                initPropertiesTemplates: () => P,
                initVariableActionLayer: () => D
            });

            class n {
                constructor(e) {
                    this.properties = null != e ? e : []
                }

                get(e) {
                    const t = this.properties.filter((t => t.name === e)).map((e => e.value));
                    if (t.length > 1) throw new Error('Expected only one property to be named "' + e + '"');
                    if (0 !== t.length) return t[0]
                }

                getString(e) {
                    return this.getByType(e, "string")
                }

                getNumber(e) {
                    return this.getByType(e, "number")
                }

                getBoolean(e) {
                    return this.getByType(e, "boolean")
                }

                getByType(e, t) {
                    const r = this.get(e);
                    if (void 0 !== r) {
                        if (typeof r !== t) throw new Error('Expected property "' + e + '" to have type "' + t + '"');
                        return r
                    }
                }

                mustGetString(e) {
                    return this.mustGetByType(e, "string")
                }

                mustGetNumber(e) {
                    return this.mustGetByType(e, "number")
                }

                mustGetBoolean(e) {
                    return this.mustGetByType(e, "boolean")
                }

                mustGetByType(e, t) {
                    const r = this.get(e);
                    if (void 0 === r) throw new Error('Property "' + e + '" is missing');
                    if (typeof r !== t) throw new Error('Expected property "' + e + '" to have type "' + t + '"');
                    return r
                }

                getType(e) {
                    const t = this.properties.filter((t => t.name === e)).map((e => e.type));
                    if (t.length > 1) throw new Error('Expected only one property to be named "' + e + '"');
                    if (0 !== t.length) return t[0]
                }
            }

            class o {
                constructor(e) {
                    this.name = e.name, this.x = e.x, this.y = e.y, this.properties = new n(e.properties)
                }

                get isReadable() {
                    const e = this.properties.getString("readableBy");
                    return !e || WA.player.tags.includes(e)
                }

                get isWritable() {
                    const e = this.properties.getString("writableBy");
                    return !e || WA.player.tags.includes(e)
                }
            }

            async function i() {
                const e = await WA.room.getTiledMap(), t = new Map;
                return s(e.layers, t), t
            }

            function s(e, t) {
                for (const r of e) if ("objectgroup" === r.type) for (const e of r.objects) "variable" === e.type && t.set(e.name, new o(e)); else "group" === r.type && s(r.layers, t)
            }

            let a;

            async function l() {
                return void 0 === a && (a = async function () {
                    return function (e) {
                        const t = new Map;
                        return p(e.layers, "", t), t
                    }(await WA.room.getTiledMap())
                }()), a
            }

            function p(e, t, r) {
                for (const n of e) "group" === n.type ? p(n.layers, t + n.name + "/", r) : (n.name = t + n.name, r.set(n.name, n))
            }

            function c(e) {
                let t = 1 / 0, r = 1 / 0, n = 0, o = 0;
                const i = e.data;
                if ("string" == typeof i) throw new Error("Unsupported tile layer data stored as string instead of CSV");
                for (let s = 0; s < e.height; s++) for (let a = 0; a < e.width; a++) 0 !== i[a + s * e.width] && (t = Math.min(t, a), o = Math.max(o, a), r = Math.min(r, s), n = Math.max(n, s));
                return {top: r, left: t, right: o + 1, bottom: n + 1}
            }

            function u(e) {
                let t = 1 / 0, r = 1 / 0, n = 0, o = 0;
                for (const i of e) {
                    const e = c(i);
                    e.left < t && (t = e.left), e.top < r && (r = e.top), e.right > o && (o = e.right), e.bottom > n && (n = e.bottom)
                }
                return {top: r, left: t, right: o, bottom: n}
            }

            var h = Object.prototype.toString, f = Array.isArray || function (e) {
                return "[object Array]" === h.call(e)
            };

            function g(e) {
                return "function" == typeof e
            }

            function y(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }

            function d(e, t) {
                return null != e && "object" == typeof e && t in e
            }

            var m = RegExp.prototype.test, v = /\S/;
            var b = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            }, w = /\s*/, A = /\s+/, W = /\s*=/, S = /\s*\}/, L = /#|\^|\/|>|\{|&|=|!/;

            function E(e) {
                this.string = e, this.tail = e, this.pos = 0
            }

            function x(e, t) {
                this.view = e, this.cache = {".": this.view}, this.parent = t
            }

            function C() {
                this.templateCache = {
                    _cache: {}, set: function (e, t) {
                        this._cache[e] = t
                    }, get: function (e) {
                        return this._cache[e]
                    }, clear: function () {
                        this._cache = {}
                    }
                }
            }

            E.prototype.eos = function () {
                return "" === this.tail
            }, E.prototype.scan = function (e) {
                var t = this.tail.match(e);
                if (!t || 0 !== t.index) return "";
                var r = t[0];
                return this.tail = this.tail.substring(r.length), this.pos += r.length, r
            }, E.prototype.scanUntil = function (e) {
                var t, r = this.tail.search(e);
                switch (r) {
                    case-1:
                        t = this.tail, this.tail = "";
                        break;
                    case 0:
                        t = "";
                        break;
                    default:
                        t = this.tail.substring(0, r), this.tail = this.tail.substring(r)
                }
                return this.pos += t.length, t
            }, x.prototype.push = function (e) {
                return new x(e, this)
            }, x.prototype.lookup = function (e) {
                var t, r, n, o = this.cache;
                if (o.hasOwnProperty(e)) t = o[e]; else {
                    for (var i, s, a, l = this, p = !1; l;) {
                        if (e.indexOf(".") > 0) for (i = l.view, s = e.split("."), a = 0; null != i && a < s.length;) a === s.length - 1 && (p = d(i, s[a]) || (r = i, n = s[a], null != r && "object" != typeof r && r.hasOwnProperty && r.hasOwnProperty(n))), i = i[s[a++]]; else i = l.view[e], p = d(l.view, e);
                        if (p) {
                            t = i;
                            break
                        }
                        l = l.parent
                    }
                    o[e] = t
                }
                return g(t) && (t = t.call(this.view)), t
            }, C.prototype.clearCache = function () {
                void 0 !== this.templateCache && this.templateCache.clear()
            }, C.prototype.parse = function (e, t) {
                var r = this.templateCache, n = e + ":" + (t || T.tags).join(":"), o = void 0 !== r,
                    i = o ? r.get(n) : void 0;
                return null == i && (i = function (e, t) {
                    if (!e) return [];
                    var r, n, o, i, s = !1, a = [], l = [], p = [], c = !1, u = !1, h = "", g = 0;

                    function d() {
                        if (c && !u) for (; p.length;) delete l[p.pop()]; else p = [];
                        c = !1, u = !1
                    }

                    function b(e) {
                        if ("string" == typeof e && (e = e.split(A, 2)), !f(e) || 2 !== e.length) throw new Error("Invalid tags: " + e);
                        r = new RegExp(y(e[0]) + "\\s*"), n = new RegExp("\\s*" + y(e[1])), o = new RegExp("\\s*" + y("}" + e[1]))
                    }

                    b(t || T.tags);
                    for (var x, C, V, M, k, P, j = new E(e); !j.eos();) {
                        if (x = j.pos, V = j.scanUntil(r)) for (var B = 0, G = V.length; B < G; ++B) i = M = V.charAt(B), function (e, t) {
                            return m.call(e, t)
                        }(v, i) ? (u = !0, s = !0, h += " ") : (p.push(l.length), h += M), l.push(["text", M, x, x + 1]), x += 1, "\n" === M && (d(), h = "", g = 0, s = !1);
                        if (!j.scan(r)) break;
                        if (c = !0, C = j.scan(L) || "name", j.scan(w), "=" === C ? (V = j.scanUntil(W), j.scan(W), j.scanUntil(n)) : "{" === C ? (V = j.scanUntil(o), j.scan(S), j.scanUntil(n), C = "&") : V = j.scanUntil(n), !j.scan(n)) throw new Error("Unclosed tag at " + j.pos);
                        if (k = ">" == C ? [C, V, x, j.pos, h, g, s] : [C, V, x, j.pos], g++, l.push(k), "#" === C || "^" === C) a.push(k); else if ("/" === C) {
                            if (!(P = a.pop())) throw new Error('Unopened section "' + V + '" at ' + x);
                            if (P[1] !== V) throw new Error('Unclosed section "' + P[1] + '" at ' + x)
                        } else "name" === C || "{" === C || "&" === C ? u = !0 : "=" === C && b(V)
                    }
                    if (d(), P = a.pop()) throw new Error('Unclosed section "' + P[1] + '" at ' + j.pos);
                    return function (e) {
                        for (var t, r = [], n = r, o = [], i = 0, s = e.length; i < s; ++i) switch ((t = e[i])[0]) {
                            case"#":
                            case"^":
                                n.push(t), o.push(t), n = t[4] = [];
                                break;
                            case"/":
                                o.pop()[5] = t[2], n = o.length > 0 ? o[o.length - 1][4] : r;
                                break;
                            default:
                                n.push(t)
                        }
                        return r
                    }(function (e) {
                        for (var t, r, n = [], o = 0, i = e.length; o < i; ++o) (t = e[o]) && ("text" === t[0] && r && "text" === r[0] ? (r[1] += t[1], r[3] = t[3]) : (n.push(t), r = t));
                        return n
                    }(l))
                }(e, t), o && r.set(n, i)), i
            }, C.prototype.render = function (e, t, r, n) {
                var o = this.getConfigTags(n), i = this.parse(e, o), s = t instanceof x ? t : new x(t, void 0);
                return this.renderTokens(i, s, r, e, n)
            }, C.prototype.renderTokens = function (e, t, r, n, o) {
                for (var i, s, a, l = "", p = 0, c = e.length; p < c; ++p) a = void 0, "#" === (s = (i = e[p])[0]) ? a = this.renderSection(i, t, r, n, o) : "^" === s ? a = this.renderInverted(i, t, r, n, o) : ">" === s ? a = this.renderPartial(i, t, r, o) : "&" === s ? a = this.unescapedValue(i, t) : "name" === s ? a = this.escapedValue(i, t, o) : "text" === s && (a = this.rawValue(i)), void 0 !== a && (l += a);
                return l
            }, C.prototype.renderSection = function (e, t, r, n, o) {
                var i = this, s = "", a = t.lookup(e[1]);
                if (a) {
                    if (f(a)) for (var l = 0, p = a.length; l < p; ++l) s += this.renderTokens(e[4], t.push(a[l]), r, n, o); else if ("object" == typeof a || "string" == typeof a || "number" == typeof a) s += this.renderTokens(e[4], t.push(a), r, n, o); else if (g(a)) {
                        if ("string" != typeof n) throw new Error("Cannot use higher-order sections without the original template");
                        null != (a = a.call(t.view, n.slice(e[3], e[5]), (function (e) {
                            return i.render(e, t, r, o)
                        }))) && (s += a)
                    } else s += this.renderTokens(e[4], t, r, n, o);
                    return s
                }
            }, C.prototype.renderInverted = function (e, t, r, n, o) {
                var i = t.lookup(e[1]);
                if (!i || f(i) && 0 === i.length) return this.renderTokens(e[4], t, r, n, o)
            }, C.prototype.indentPartial = function (e, t, r) {
                for (var n = t.replace(/[^ \t]/g, ""), o = e.split("\n"), i = 0; i < o.length; i++) o[i].length && (i > 0 || !r) && (o[i] = n + o[i]);
                return o.join("\n")
            }, C.prototype.renderPartial = function (e, t, r, n) {
                if (r) {
                    var o = this.getConfigTags(n), i = g(r) ? r(e[1]) : r[e[1]];
                    if (null != i) {
                        var s = e[6], a = e[5], l = e[4], p = i;
                        0 == a && l && (p = this.indentPartial(i, l, s));
                        var c = this.parse(p, o);
                        return this.renderTokens(c, t, r, p, n)
                    }
                }
            }, C.prototype.unescapedValue = function (e, t) {
                var r = t.lookup(e[1]);
                if (null != r) return r
            }, C.prototype.escapedValue = function (e, t, r) {
                var n = this.getConfigEscape(r) || T.escape, o = t.lookup(e[1]);
                if (null != o) return "number" == typeof o && n === T.escape ? String(o) : n(o)
            }, C.prototype.rawValue = function (e) {
                return e[1]
            }, C.prototype.getConfigTags = function (e) {
                return f(e) ? e : e && "object" == typeof e ? e.tags : void 0
            }, C.prototype.getConfigEscape = function (e) {
                return e && "object" == typeof e && !f(e) ? e.escape : void 0
            };
            var T = {
                name: "mustache.js",
                version: "4.2.0",
                tags: ["{{", "}}"],
                clearCache: void 0,
                escape: void 0,
                parse: void 0,
                render: void 0,
                Scanner: void 0,
                Context: void 0,
                Writer: void 0,
                set templateCache(e) {
                    V.templateCache = e
                },
                get templateCache() {
                    return V.templateCache
                }
            }, V = new C;
            T.clearCache = function () {
                return V.clearCache()
            }, T.parse = function (e, t) {
                return V.parse(e, t)
            }, T.render = function (e, t, r, n) {
                if ("string" != typeof e) throw new TypeError('Invalid template! Template should be a "string" but "' + (f(o = e) ? "array" : typeof o) + '" was given as the first argument for mustache#render(template, view, partials)');
                var o;
                return V.render(e, t, r, n)
            }, T.escape = function (e) {
                return String(e).replace(/[&<>"'`=\/]/g, (function (e) {
                    return b[e]
                }))
            }, T.Scanner = E, T.Context = x, T.Writer = C;
            const M = T;

            class k {
                constructor(e, t) {
                    this.template = e, this.state = t, this.ast = M.parse(e)
                }

                getValue() {
                    return void 0 === this.value && (this.value = M.render(this.template, this.state)), this.value
                }

                onChange(e) {
                    const t = [];
                    for (const r of this.getUsedVariables().values()) t.push(this.state.onVariableChange(r).subscribe((() => {
                        const t = M.render(this.template, this.state);
                        t !== this.value && (this.value = t, e(this.value))
                    })));
                    return {
                        unsubscribe: () => {
                            for (const e of t) e.unsubscribe()
                        }
                    }
                }

                isPureString() {
                    return 0 === this.ast.length || 1 === this.ast.length && "text" === this.ast[0][0]
                }

                getUsedVariables() {
                    const e = new Set;
                    return this.recursiveGetUsedVariables(this.ast, e), e
                }

                recursiveGetUsedVariables(e, t) {
                    for (const r of e) {
                        const e = r[0], n = r[1], o = r[4];
                        ["name", "&", "#", "^"].includes(e) && t.add(n), void 0 !== o && "string" != typeof o && this.recursiveGetUsedVariables(o, t)
                    }
                }
            }

            async function P() {
                var e;
                const t = await l();
                for (const [r, n] of t.entries()) {
                    const t = null !== (e = n.properties) && void 0 !== e ? e : [];
                    for (const e of t) {
                        if ("int" === e.type || "bool" === e.type || "object" === e.type) continue;
                        const t = new k(e.value, WA.state);
                        if (t.isPureString()) continue;
                        const n = t.getValue();
                        j(r, e.name, n), t.onChange((t => {
                            j(r, e.name, t)
                        }))
                    }
                }
            }

            function j(e, t, r) {
                WA.room.setProperty(e, t, r), "visible" === t && (r ? WA.room.showLayer(e) : WA.room.hideLayer(e))
            }

            const B = "https://unpkg.com/@workadventure/scripting-api-extra@1.0.5/dist";
            let G, U = 0, O = 0;

            function R(e) {
                if (WA.state[e.name]) {
                    let t = e.properties.mustGetString("openLayer");
                    for (const e of t.split("\n")) WA.room.showLayer(e);
                    t = e.properties.mustGetString("closeLayer");
                    for (const e of t.split("\n")) WA.room.hideLayer(e)
                } else {
                    let t = e.properties.mustGetString("openLayer");
                    for (const e of t.split("\n")) WA.room.hideLayer(e);
                    t = e.properties.mustGetString("closeLayer");
                    for (const e of t.split("\n")) WA.room.showLayer(e)
                }
            }

            function _(e) {
                return e.map((e => G.get(e))).filter((e => "tilelayer" === (null == e ? void 0 : e.type)))
            }

            function I(e) {
                const t = u(_(e)), r = 32 * ((t.right - t.left) / 2 + t.left),
                    n = 32 * ((t.bottom - t.top) / 2 + t.top);
                return Math.sqrt(Math.pow(U - r, 2) + Math.pow(O - n, 2))
            }

            function X(e) {
                WA.state.onVariableChange(e.name).subscribe((() => {
                    WA.state[e.name] ? function (e) {
                        const t = e.properties.getString("openSound"), r = e.properties.getNumber("soundRadius");
                        let n = 1;
                        if (r) {
                            const t = I(e.properties.mustGetString("openLayer").split("\n"));
                            if (t > r) return;
                            n = 1 - t / r
                        }
                        t && WA.sound.loadSound(t).play({volume: n})
                    }(e) : function (e) {
                        const t = e.properties.getString("closeSound"), r = e.properties.getNumber("soundRadius");
                        let n = 1;
                        if (r) {
                            const t = I(e.properties.mustGetString("closeLayer").split("\n"));
                            if (t > r) return;
                            n = 1 - t / r
                        }
                        t && WA.sound.loadSound(t).play({volume: n})
                    }(e), R(e)
                })), R(e)
            }

            function N(e, t, r, n) {
                const o = e.name;
                let i, s, a = !1;
                const l = r.getString("zone");
                if (!l) throw new Error('Missing "zone" property on doorstep layer "' + o + '"');
                const p = r.getString("tag");
                let c = !0;
                p && !WA.player.tags.includes(p) && (c = !1);
                const h = !!p;

                function f() {
                    var e;
                    i && i.remove(), i = WA.ui.displayActionMessage({
                        message: null !== (e = r.getString("closeTriggerMessage")) && void 0 !== e ? e : "Press SPACE to close the door",
                        callback: () => {
                            WA.state[t.name] = !1, g()
                        }
                    })
                }

                function g() {
                    var e;
                    i && i.remove(), i = WA.ui.displayActionMessage({
                        message: null !== (e = r.getString("openTriggerMessage")) && void 0 !== e ? e : "Press SPACE to open the door",
                        callback: () => {
                            WA.state[t.name] = !0, f()
                        }
                    })
                }

                function y() {
                    s && (WA.room.website.delete(s.name), s = void 0)
                }

                WA.room.onEnterZone(l, (() => {
                    a = !0, r.getBoolean("autoOpen") && c ? WA.state[t.name] = !0 : WA.state[t.name] || (!h || c) && h || !r.getString("code") && !r.getString("codeVariable") ? c && (WA.state[t.name] ? f() : g()) : function (e) {
                        const r = u(_(t.properties.mustGetString("closeLayer").split("\n")));
                        s = WA.room.website.create({
                            name: "doorKeypad" + e,
                            url: n + "/keypad.html#" + encodeURIComponent(e),
                            position: {x: 32 * r.right, y: 32 * r.top, width: 96, height: 128},
                            allowApi: !0
                        })
                    }(o)
                })), WA.room.onLeaveZone(l, (() => {
                    a = !1, r.getBoolean("autoClose") && (WA.state[t.name] = !1), i && i.remove(), y()
                })), WA.state.onVariableChange(t.name).subscribe((() => {
                    a && (r.getBoolean("autoClose") || !0 !== WA.state[t.name] || f(), s && !0 === WA.state[t.name] && y(), r.getBoolean("autoOpen") || !1 !== WA.state[t.name] || g())
                }))
            }

            function Z(e) {
                void 0 === WA.state[e.name] && (WA.state[e.name] = 0), WA.state.onVariableChange(e.name).subscribe((() => {
                    WA.state[e.name] && function (e) {
                        const t = e.properties.mustGetString("bellSound"), r = e.properties.getNumber("soundRadius");
                        let n = 1;
                        if (r) {
                            const t = Math.sqrt(Math.pow(e.x - U, 2) + Math.pow(e.y - O, 2));
                            if (t > r) return;
                            n = 1 - t / r
                        }
                        WA.sound.loadSound(t).play({volume: n})
                    }(e)
                }))
            }

            function z(e, t) {
                let r;
                const n = t.mustGetString("zone"), o = t.getString("bellPopup");
                WA.room.onEnterZone(n, (() => {
                    var n;
                    o ? r = WA.ui.openPopup(o, "", [{
                        label: null !== (n = t.getString("bellButtonText")) && void 0 !== n ? n : "Ring",
                        callback: () => {
                            WA.state[e] = WA.state[e] + 1
                        }
                    }]) : WA.state[e] = WA.state[e] + 1
                })), WA.room.onLeaveZone(n, (() => {
                    r && (r.close(), r = void 0)
                }))
            }

            async function q(e) {
                e = null != e ? e : B;
                const t = await i();
                G = await l();
                for (const e of t.values()) e.properties.get("door") && X(e), e.properties.get("bell") && Z(e);
                for (const r of G.values()) {
                    const o = new n(r.properties), i = o.getString("doorVariable");
                    if (i && "tilelayer" === r.type) {
                        const n = t.get(i);
                        if (void 0 === n) throw new Error('Cannot find variable "' + i + '" referred in the "doorVariable" property of layer "' + r.name + '"');
                        N(r, n, o, e)
                    }
                    const s = o.getString("bellVariable");
                    s && z(s, o)
                }
                WA.player.onPlayerMove((e => {
                    U = e.x, O = e.y
                }))
            }

            function D(e) {
                const t = e.getString("bindVariable");
                if (t) {
                    const r = e.getString("zone");
                    if (!r) throw new Error('A layer with a "bindVariable" property must ALSO have a "zone" property.');
                    !function (e, t, r, n, o, i) {
                        i && !WA.player.tags.includes(i) || (void 0 !== r && WA.room.onEnterZone(t, (() => {
                            o || (WA.state[e] = r)
                        })), void 0 !== n && WA.room.onLeaveZone(t, (() => {
                            WA.state[e] = n
                        })))
                    }(t, r, e.get("enterValue"), e.get("leaveValue"), e.getString("triggerMessage"), e.getString("tag"))
                }
            }

            function K() {
                return WA.onInit().then((() => {
                    q().catch((e => console.error(e))), async function () {
                        const e = await l();
                        for (const t of e.values()) D(new n(t.properties))
                    }().catch((e => console.error(e))), async function (e) {
                        const t = (await WA.room.getTiledMap()).layers.find((e => "configuration" === e.name));
                        if (t) {
                            const r = new n(t.properties).getString("tag");
                            r && !WA.player.tags.includes(r) || WA.ui.registerMenuCommand("Configure the room", (() => {
                                e = null != e ? e : B, WA.nav.openCoWebSite(e + "/configuration.html", !0)
                            }))
                        }
                    }().catch((e => console.error(e))), P().catch((e => console.error(e)))
                }))
            }
        }
    }, t = {};

    function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = {exports: {}};
        return e[n](i, i.exports, r), i.exports
    }

    r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: t[n]})
    }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, (() => {
        let e, t, n;

        function o() {
            return "https://raw.githubusercontent.com/TrippingKronos/RC3_Nowhere/main/vjapp/" + t + "_" + e + "_" + n + ".json"
        }

        function i(e, t) {
            WA.room.loadTileset(e).then((e => {
                for (let r = 1; r < 9; r++) for (let n = 0; n < 8; n++) {
                    let o = 64 * n + e + (r - 1);
                    WA.room.setTiles([{x: r, y: n + 1, tile: o, layer: t}])
                }
            }))
        }

        (0, r(733).bootstrapExtra)(), WA.onInit().then((() => {
            e = 1, t = 1
        })), WA.room.onEnterLayer("X Layer1 chng visual prev").subscribe((() => {
            1 == e && (e = 10), e--, i(o(), "Layer1")
        })), WA.room.onEnterLayer("X Layer1 chng visual next").subscribe((() => {
            9 == e && (e = 0), e++, i(o(), "Layer1")
        })), WA.room.onEnterLayer("Xn Layer2 chng visual prev").subscribe((() => {
            1 == t && (t = 10), t--, i(o(), "Layer2")
        })), WA.room.onEnterLayer("Xn Layer2 chng visual next").subscribe((() => {
            9 == t && (t = 0), t++, i(o(), "Layer2")
        })), WA.room.onEnterLayer("Xn Layer1 speed high").subscribe((() => {
            n = 100, i(o(), "Layer2")
        })), WA.room.onEnterLayer("Xn Layer1 speed normal").subscribe((() => {
            n = 125, i(o(), "Layer2")
        })), WA.room.onEnterLayer("Xn Layer1 speed low").subscribe((() => {
            n = 150, i(o(), "Layer2")
        }))
    })()
})();
//# sourceMappingURL=script.js.map