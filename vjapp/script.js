/*! For license information please see script.js.LICENSE.txt */
(() => {
    "use strict";
    var e = {
        733: (e, t, r) => {
            r.r(t), r.d(t, {
                Properties: () => o,
                VariableDescriptor: () => n,
                bootstrapExtra: () => D,
                findLayerBoundaries: () => l,
                findLayersBoundaries: () => p,
                getAllVariables: () => i,
                getLayersMap: () => u,
                initDoors: () => Z,
                initPropertiesTemplates: () => V,
                initVariableActionLayer: () => q
            });

            class o {
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

            class n {
                constructor(e) {
                    this.name = e.name, this.x = e.x, this.y = e.y, this.properties = new o(e.properties)
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
                for (const r of e) if ("objectgroup" === r.type) for (const e of r.objects) "variable" === e.type && t.set(e.name, new n(e)); else "group" === r.type && s(r.layers, t)
            }

            let a;

            async function u() {
                return void 0 === a && (a = async function () {
                    return function (e) {
                        const t = new Map;
                        return c(e.layers, "", t), t
                    }(await WA.room.getTiledMap())
                }()), a
            }

            function c(e, t, r) {
                for (const o of e) "group" === o.type ? c(o.layers, t + o.name + "/", r) : (o.name = t + o.name, r.set(o.name, o))
            }

            function l(e) {
                let t = 1 / 0, r = 1 / 0, o = 0, n = 0;
                const i = e.data;
                if ("string" == typeof i) throw new Error("Unsupported tile layer data stored as string instead of CSV");
                for (let s = 0; s < e.height; s++) for (let a = 0; a < e.width; a++) 0 !== i[a + s * e.width] && (t = Math.min(t, a), n = Math.max(n, a), r = Math.min(r, s), o = Math.max(o, s));
                return {top: r, left: t, right: n + 1, bottom: o + 1}
            }

            function p(e) {
                let t = 1 / 0, r = 1 / 0, o = 0, n = 0;
                for (const i of e) {
                    const e = l(i);
                    e.left < t && (t = e.left), e.top < r && (r = e.top), e.right > n && (n = e.right), e.bottom > o && (o = e.bottom)
                }
                return {top: r, left: t, right: n, bottom: o}
            }

            var g = Object.prototype.toString, h = Array.isArray || function (e) {
                return "[object Array]" === g.call(e)
            };

            function f(e) {
                return "function" == typeof e
            }

            function d(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }

            function y(e, t) {
                return null != e && "object" == typeof e && t in e
            }

            var m = RegExp.prototype.test, b = /\S/;
            var v = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            }, w = /\s*/, A = /\s+/, W = /\s*=/, S = /\s*\}/, E = /#|\^|\/|>|\{|&|=|!/;

            function k(e) {
                this.string = e, this.tail = e, this.pos = 0
            }

            function T(e, t) {
                this.view = e, this.cache = {".": this.view}, this.parent = t
            }

            function x() {
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

            k.prototype.eos = function () {
                return "" === this.tail
            }, k.prototype.scan = function (e) {
                var t = this.tail.match(e);
                if (!t || 0 !== t.index) return "";
                var r = t[0];
                return this.tail = this.tail.substring(r.length), this.pos += r.length, r
            }, k.prototype.scanUntil = function (e) {
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
            }, T.prototype.push = function (e) {
                return new T(e, this)
            }, T.prototype.lookup = function (e) {
                var t, r, o, n = this.cache;
                if (n.hasOwnProperty(e)) t = n[e]; else {
                    for (var i, s, a, u = this, c = !1; u;) {
                        if (e.indexOf(".") > 0) for (i = u.view, s = e.split("."), a = 0; null != i && a < s.length;) a === s.length - 1 && (c = y(i, s[a]) || (r = i, o = s[a], null != r && "object" != typeof r && r.hasOwnProperty && r.hasOwnProperty(o))), i = i[s[a++]]; else i = u.view[e], c = y(u.view, e);
                        if (c) {
                            t = i;
                            break
                        }
                        u = u.parent
                    }
                    n[e] = t
                }
                return f(t) && (t = t.call(this.view)), t
            }, x.prototype.clearCache = function () {
                void 0 !== this.templateCache && this.templateCache.clear()
            }, x.prototype.parse = function (e, t) {
                var r = this.templateCache, o = e + ":" + (t || B.tags).join(":"), n = void 0 !== r,
                    i = n ? r.get(o) : void 0;
                return null == i && (i = function (e, t) {
                    if (!e) return [];
                    var r, o, n, i, s = !1, a = [], u = [], c = [], l = !1, p = !1, g = "", f = 0;

                    function y() {
                        if (l && !p) for (; c.length;) delete u[c.pop()]; else c = [];
                        l = !1, p = !1
                    }

                    function v(e) {
                        if ("string" == typeof e && (e = e.split(A, 2)), !h(e) || 2 !== e.length) throw new Error("Invalid tags: " + e);
                        r = new RegExp(d(e[0]) + "\\s*"), o = new RegExp("\\s*" + d(e[1])), n = new RegExp("\\s*" + d("}" + e[1]))
                    }

                    v(t || B.tags);
                    for (var T, x, C, L, P, V, M = new k(e); !M.eos();) {
                        if (T = M.pos, C = M.scanUntil(r)) for (var j = 0, G = C.length; j < G; ++j) i = L = C.charAt(j), function (e, t) {
                            return m.call(e, t)
                        }(b, i) ? (p = !0, s = !0, g += " ") : (c.push(u.length), g += L), u.push(["text", L, T, T + 1]), T += 1, "\n" === L && (y(), g = "", f = 0, s = !1);
                        if (!M.scan(r)) break;
                        if (l = !0, x = M.scan(E) || "name", M.scan(w), "=" === x ? (C = M.scanUntil(W), M.scan(W), M.scanUntil(o)) : "{" === x ? (C = M.scanUntil(n), M.scan(S), M.scanUntil(o), x = "&") : C = M.scanUntil(o), !M.scan(o)) throw new Error("Unclosed tag at " + M.pos);
                        if (P = ">" == x ? [x, C, T, M.pos, g, f, s] : [x, C, T, M.pos], f++, u.push(P), "#" === x || "^" === x) a.push(P); else if ("/" === x) {
                            if (!(V = a.pop())) throw new Error('Unopened section "' + C + '" at ' + T);
                            if (V[1] !== C) throw new Error('Unclosed section "' + V[1] + '" at ' + T)
                        } else "name" === x || "{" === x || "&" === x ? p = !0 : "=" === x && v(C)
                    }
                    if (y(), V = a.pop()) throw new Error('Unclosed section "' + V[1] + '" at ' + M.pos);
                    return function (e) {
                        for (var t, r = [], o = r, n = [], i = 0, s = e.length; i < s; ++i) switch ((t = e[i])[0]) {
                            case"#":
                            case"^":
                                o.push(t), n.push(t), o = t[4] = [];
                                break;
                            case"/":
                                n.pop()[5] = t[2], o = n.length > 0 ? n[n.length - 1][4] : r;
                                break;
                            default:
                                o.push(t)
                        }
                        return r
                    }(function (e) {
                        for (var t, r, o = [], n = 0, i = e.length; n < i; ++n) (t = e[n]) && ("text" === t[0] && r && "text" === r[0] ? (r[1] += t[1], r[3] = t[3]) : (o.push(t), r = t));
                        return o
                    }(u))
                }(e, t), n && r.set(o, i)), i
            }, x.prototype.render = function (e, t, r, o) {
                var n = this.getConfigTags(o), i = this.parse(e, n), s = t instanceof T ? t : new T(t, void 0);
                return this.renderTokens(i, s, r, e, o)
            }, x.prototype.renderTokens = function (e, t, r, o, n) {
                for (var i, s, a, u = "", c = 0, l = e.length; c < l; ++c) a = void 0, "#" === (s = (i = e[c])[0]) ? a = this.renderSection(i, t, r, o, n) : "^" === s ? a = this.renderInverted(i, t, r, o, n) : ">" === s ? a = this.renderPartial(i, t, r, n) : "&" === s ? a = this.unescapedValue(i, t) : "name" === s ? a = this.escapedValue(i, t, n) : "text" === s && (a = this.rawValue(i)), void 0 !== a && (u += a);
                return u
            }, x.prototype.renderSection = function (e, t, r, o, n) {
                var i = this, s = "", a = t.lookup(e[1]);
                if (a) {
                    if (h(a)) for (var u = 0, c = a.length; u < c; ++u) s += this.renderTokens(e[4], t.push(a[u]), r, o, n); else if ("object" == typeof a || "string" == typeof a || "number" == typeof a) s += this.renderTokens(e[4], t.push(a), r, o, n); else if (f(a)) {
                        if ("string" != typeof o) throw new Error("Cannot use higher-order sections without the original template");
                        null != (a = a.call(t.view, o.slice(e[3], e[5]), (function (e) {
                            return i.render(e, t, r, n)
                        }))) && (s += a)
                    } else s += this.renderTokens(e[4], t, r, o, n);
                    return s
                }
            }, x.prototype.renderInverted = function (e, t, r, o, n) {
                var i = t.lookup(e[1]);
                if (!i || h(i) && 0 === i.length) return this.renderTokens(e[4], t, r, o, n)
            }, x.prototype.indentPartial = function (e, t, r) {
                for (var o = t.replace(/[^ \t]/g, ""), n = e.split("\n"), i = 0; i < n.length; i++) n[i].length && (i > 0 || !r) && (n[i] = o + n[i]);
                return n.join("\n")
            }, x.prototype.renderPartial = function (e, t, r, o) {
                if (r) {
                    var n = this.getConfigTags(o), i = f(r) ? r(e[1]) : r[e[1]];
                    if (null != i) {
                        var s = e[6], a = e[5], u = e[4], c = i;
                        0 == a && u && (c = this.indentPartial(i, u, s));
                        var l = this.parse(c, n);
                        return this.renderTokens(l, t, r, c, o)
                    }
                }
            }, x.prototype.unescapedValue = function (e, t) {
                var r = t.lookup(e[1]);
                if (null != r) return r
            }, x.prototype.escapedValue = function (e, t, r) {
                var o = this.getConfigEscape(r) || B.escape, n = t.lookup(e[1]);
                if (null != n) return "number" == typeof n && o === B.escape ? String(n) : o(n)
            }, x.prototype.rawValue = function (e) {
                return e[1]
            }, x.prototype.getConfigTags = function (e) {
                return h(e) ? e : e && "object" == typeof e ? e.tags : void 0
            }, x.prototype.getConfigEscape = function (e) {
                return e && "object" == typeof e && !h(e) ? e.escape : void 0
            };
            var B = {
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
                    C.templateCache = e
                },
                get templateCache() {
                    return C.templateCache
                }
            }, C = new x;
            B.clearCache = function () {
                return C.clearCache()
            }, B.parse = function (e, t) {
                return C.parse(e, t)
            }, B.render = function (e, t, r, o) {
                if ("string" != typeof e) throw new TypeError('Invalid template! Template should be a "string" but "' + (h(n = e) ? "array" : typeof n) + '" was given as the first argument for mustache#render(template, view, partials)');
                var n;
                return C.render(e, t, r, o)
            }, B.escape = function (e) {
                return String(e).replace(/[&<>"'`=\/]/g, (function (e) {
                    return v[e]
                }))
            }, B.Scanner = k, B.Context = T, B.Writer = x;
            const L = B;

            class P {
                constructor(e, t) {
                    this.template = e, this.state = t, this.ast = L.parse(e)
                }

                getValue() {
                    return void 0 === this.value && (this.value = L.render(this.template, this.state)), this.value
                }

                onChange(e) {
                    const t = [];
                    for (const r of this.getUsedVariables().values()) t.push(this.state.onVariableChange(r).subscribe((() => {
                        const t = L.render(this.template, this.state);
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
                        const e = r[0], o = r[1], n = r[4];
                        ["name", "&", "#", "^"].includes(e) && t.add(o), void 0 !== n && "string" != typeof n && this.recursiveGetUsedVariables(n, t)
                    }
                }
            }

            async function V() {
                var e;
                const t = await u();
                for (const [r, o] of t.entries()) {
                    const t = null !== (e = o.properties) && void 0 !== e ? e : [];
                    for (const e of t) {
                        if ("int" === e.type || "bool" === e.type || "object" === e.type) continue;
                        const t = new P(e.value, WA.state);
                        if (t.isPureString()) continue;
                        const o = t.getValue();
                        M(r, e.name, o), t.onChange((t => {
                            M(r, e.name, t)
                        }))
                    }
                }
            }

            function M(e, t, r) {
                WA.room.setProperty(e, t, r), "visible" === t && (r ? WA.room.showLayer(e) : WA.room.hideLayer(e))
            }

            const j = "https://unpkg.com/@workadventure/scripting-api-extra@1.0.5/dist";
            let G, U = 0, F = 0;

            function X(e) {
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

            function O(e) {
                return e.map((e => G.get(e))).filter((e => "tilelayer" === (null == e ? void 0 : e.type)))
            }

            function R(e) {
                const t = p(O(e)), r = 32 * ((t.right - t.left) / 2 + t.left),
                    o = 32 * ((t.bottom - t.top) / 2 + t.top);
                return Math.sqrt(Math.pow(U - r, 2) + Math.pow(F - o, 2))
            }

            function _(e) {
                WA.state.onVariableChange(e.name).subscribe((() => {
                    WA.state[e.name] ? function (e) {
                        const t = e.properties.getString("openSound"), r = e.properties.getNumber("soundRadius");
                        let o = 1;
                        if (r) {
                            const t = R(e.properties.mustGetString("openLayer").split("\n"));
                            if (t > r) return;
                            o = 1 - t / r
                        }
                        t && WA.sound.loadSound(t).play({volume: o})
                    }(e) : function (e) {
                        const t = e.properties.getString("closeSound"), r = e.properties.getNumber("soundRadius");
                        let o = 1;
                        if (r) {
                            const t = R(e.properties.mustGetString("closeLayer").split("\n"));
                            if (t > r) return;
                            o = 1 - t / r
                        }
                        t && WA.sound.loadSound(t).play({volume: o})
                    }(e), X(e)
                })), X(e)
            }

            function I(e, t, r, o) {
                const n = e.name;
                let i, s, a = !1;
                const u = r.getString("zone");
                if (!u) throw new Error('Missing "zone" property on doorstep layer "' + n + '"');
                const c = r.getString("tag");
                let l = !0;
                c && !WA.player.tags.includes(c) && (l = !1);
                const g = !!c;

                function h() {
                    var e;
                    i && i.remove(), i = WA.ui.displayActionMessage({
                        message: null !== (e = r.getString("closeTriggerMessage")) && void 0 !== e ? e : "Press SPACE to close the door",
                        callback: () => {
                            WA.state[t.name] = !1, f()
                        }
                    })
                }

                function f() {
                    var e;
                    i && i.remove(), i = WA.ui.displayActionMessage({
                        message: null !== (e = r.getString("openTriggerMessage")) && void 0 !== e ? e : "Press SPACE to open the door",
                        callback: () => {
                            WA.state[t.name] = !0, h()
                        }
                    })
                }

                function d() {
                    s && (WA.room.website.delete(s.name), s = void 0)
                }

                WA.room.onEnterZone(u, (() => {
                    a = !0, r.getBoolean("autoOpen") && l ? WA.state[t.name] = !0 : WA.state[t.name] || (!g || l) && g || !r.getString("code") && !r.getString("codeVariable") ? l && (WA.state[t.name] ? h() : f()) : function (e) {
                        const r = p(O(t.properties.mustGetString("closeLayer").split("\n")));
                        s = WA.room.website.create({
                            name: "doorKeypad" + e,
                            url: o + "/keypad.html#" + encodeURIComponent(e),
                            position: {x: 32 * r.right, y: 32 * r.top, width: 96, height: 128},
                            allowApi: !0
                        })
                    }(n)
                })), WA.room.onLeaveZone(u, (() => {
                    a = !1, r.getBoolean("autoClose") && (WA.state[t.name] = !1), i && i.remove(), d()
                })), WA.state.onVariableChange(t.name).subscribe((() => {
                    a && (r.getBoolean("autoClose") || !0 !== WA.state[t.name] || h(), s && !0 === WA.state[t.name] && d(), r.getBoolean("autoOpen") || !1 !== WA.state[t.name] || f())
                }))
            }

            function N(e) {
                void 0 === WA.state[e.name] && (WA.state[e.name] = 0), WA.state.onVariableChange(e.name).subscribe((() => {
                    WA.state[e.name] && function (e) {
                        const t = e.properties.mustGetString("bellSound"), r = e.properties.getNumber("soundRadius");
                        let o = 1;
                        if (r) {
                            const t = Math.sqrt(Math.pow(e.x - U, 2) + Math.pow(e.y - F, 2));
                            if (t > r) return;
                            o = 1 - t / r
                        }
                        WA.sound.loadSound(t).play({volume: o})
                    }(e)
                }))
            }

            function z(e, t) {
                let r;
                const o = t.mustGetString("zone"), n = t.getString("bellPopup");
                WA.room.onEnterZone(o, (() => {
                    var o;
                    n ? r = WA.ui.openPopup(n, "", [{
                        label: null !== (o = t.getString("bellButtonText")) && void 0 !== o ? o : "Ring",
                        callback: () => {
                            WA.state[e] = WA.state[e] + 1
                        }
                    }]) : WA.state[e] = WA.state[e] + 1
                })), WA.room.onLeaveZone(o, (() => {
                    r && (r.close(), r = void 0)
                }))
            }

            async function Z(e) {
                e = null != e ? e : j;
                const t = await i();
                G = await u();
                for (const e of t.values()) e.properties.get("door") && _(e), e.properties.get("bell") && N(e);
                for (const r of G.values()) {
                    const n = new o(r.properties), i = n.getString("doorVariable");
                    if (i && "tilelayer" === r.type) {
                        const o = t.get(i);
                        if (void 0 === o) throw new Error('Cannot find variable "' + i + '" referred in the "doorVariable" property of layer "' + r.name + '"');
                        I(r, o, n, e)
                    }
                    const s = n.getString("bellVariable");
                    s && z(s, n)
                }
                WA.player.onPlayerMove((e => {
                    U = e.x, F = e.y
                }))
            }

            function q(e) {
                const t = e.getString("bindVariable");
                if (t) {
                    const r = e.getString("zone");
                    if (!r) throw new Error('A layer with a "bindVariable" property must ALSO have a "zone" property.');
                    !function (e, t, r, o, n, i) {
                        i && !WA.player.tags.includes(i) || (void 0 !== r && WA.room.onEnterZone(t, (() => {
                            n || (WA.state[e] = r)
                        })), void 0 !== o && WA.room.onLeaveZone(t, (() => {
                            WA.state[e] = o
                        })))
                    }(t, r, e.get("enterValue"), e.get("leaveValue"), e.getString("triggerMessage"), e.getString("tag"))
                }
            }

            function D() {
                return WA.onInit().then((() => {
                    Z().catch((e => console.error(e))), async function () {
                        const e = await u();
                        for (const t of e.values()) q(new o(t.properties))
                    }().catch((e => console.error(e))), async function (e) {
                        const t = (await WA.room.getTiledMap()).layers.find((e => "configuration" === e.name));
                        if (t) {
                            const r = new o(t.properties).getString("tag");
                            r && !WA.player.tags.includes(r) || WA.ui.registerMenuCommand("Configure the room", (() => {
                                e = null != e ? e : j, WA.nav.openCoWebSite(e + "/configuration.html", !0)
                            }))
                        }
                    }().catch((e => console.error(e))), V().catch((e => console.error(e)))
                }))
            }
        }
    }, t = {};

    function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var i = t[o] = {exports: {}};
        return e[o](i, i.exports, r), i.exports
    }

    r.d = (e, t) => {
        for (var o in t) r.o(t, o) && !r.o(e, o) && Object.defineProperty(e, o, {enumerable: !0, get: t[o]})
    }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, (() => {
        (0, r(733).bootstrapExtra)();
        let e = 1, t = 1, o = 100, n = 100, i = [];

        function s() {
            return "https://raw.githubusercontent.com/TrippingKronos/RC3_Nowhere/main/vjapp/Foreground_" + t + "_" + o + ".json"
        }

        function a() {
            return "https://raw.githubusercontent.com/TrippingKronos/RC3_Nowhere/main/vjapp/Background_" + e + "_" + n + ".json"
        }

        function u(e, t) {
            WA.room.loadTileset(e).then((e => {
                for (let r = 1; r < 9; r++) for (let o = 0; o < 8; o++) {
                    let n = 64 * o + e + (r - 1);
                    WA.room.setTiles([{x: r, y: o + 1, tile: n, layer: t}])
                }
            }))
        }

        WA.onInit().then((() => {
            e = 1, t = 1, o = 100, n = 100
        })), WA.room.onEnterLayer("X Background chng visual prev").subscribe((() => {
            1 == e && (e = 12), e--, u(a(), "Background")
        })), WA.room.onEnterLayer("X Background chng visual next").subscribe((() => {
            12 == e && (e = 0), e++, u(a(), "Background")
        })), WA.room.onEnterLayer("Xn Foreground chng visual prev").subscribe((() => {
            1 == t && (t = 6), t--, u(s(), "Foreground")
        })), WA.room.onEnterLayer("Xn Foreground chng visual next").subscribe((() => {
            5 == t && (t = 0), t++, u(s(), "Foreground")
        })), WA.room.onEnterLayer("Xn Background speed high").subscribe((() => {
            n = 60, u(a(), "Background")
        })), WA.room.onEnterLayer("Xn Background speed normal").subscribe((() => {
            n = 80, u(a(), "Background")
        })), WA.room.onEnterLayer("Xn Background speed low").subscribe((() => {
            n = 100, u(a(), "Background")
        })), WA.room.onEnterLayer("Xn Foreground speed high").subscribe((() => {
            o = 60, u(s(), "Foreground")
        })), WA.room.onEnterLayer("Xn Foreground speed normal").subscribe((() => {
            o = 80, u(s(), "Foreground")
        })), WA.room.onEnterLayer("Xn Foreground speed low").subscribe((() => {
            o = 100, u(s(), "Foreground")
        })), WA.room.onEnterLayer("Xn Foreground opacity on").subscribe((() => {
            for (let e = 0; e < 101; e++) setTimeout((() => {
                WA.room.setProperty("Foreground", "opacity", .01 * e)
            }), 50 * e)
        })), WA.room.onEnterLayer("Xn Foreground opacity off").subscribe((() => {
            for (let e = 100; e >= 0; e--) setTimeout((() => {
                WA.room.setProperty("Foreground", "opacity", .01 * e)
            }), 50 * e)
        })), WA.room.onEnterLayer("Xn Background opacity on").subscribe((() => {
            for (let e = 0; e < 101; e++) setTimeout((() => {
                WA.room.setProperty("Background", "opacity", .01 * e)
            }), 50 * e)
        })), WA.room.onEnterLayer("Xn Background opacity off").subscribe((() => {
            for (let e = 100; e >= 0; e--) setTimeout((() => {
                WA.room.setProperty("Background", "opacity", .01 * e)
            }), 50 * e)
        })), WA.room.onEnterLayer("Xn Background opacity off").subscribe((() => {
            for (let e = 100; e >= 0; e--) setTimeout((() => {
                WA.room.setProperty("Background", "opacity", e)
            }), 50 * e)
        })), WA.room.onEnterLayer("Xn Background randomize").subscribe((() => {
            !function () {
                let e = i.sort((() => Math.random() - .5));
                if (64 == e.length) for (let t = 1; t < 9; t++) for (let r = 1; r < 9; r++) {
                    let o = e.pop();
                    null != o && WA.room.setTiles([{x: t, y: r + 1, tile: o, layer: "Background"}])
                }
            }()
        }))
    })()
})();
//# sourceMappingURL=script.js.map