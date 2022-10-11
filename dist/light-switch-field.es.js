import { openBlock as o, createElementBlock as l, normalizeClass as C, createElementVNode as S, withKeys as m, renderSlot as c, createTextVNode as z, toDisplayString as w, createCommentVNode as v } from "vue";
const d = {};
function u(...e) {
  if (!e.length)
    return d;
  const [t, s] = e;
  return typeof t == "string" ? typeof d[t] < "u" ? d[t] : s : Array.isArray(t) ? t.reduce((i, r) => Object.assign(i, {
    [r]: d[r]
  }), {}) : Object.assign(d, ...e);
}
var j = {
  props: {
    dropShadow: [Boolean, String],
    dropShadowableClassPrefix: {
      type: String,
      default: "drop-shadow"
    },
    shadow: [Boolean, String],
    shadowableClassPrefix: {
      type: String,
      default: "shadow"
    }
  },
  computed: {
    shadowableClass() {
      const e = this.dropShadow === !0 ? "" : this.dropShadow && `-${this.dropShadow}`, t = this.shadow === !0 ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${e}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${t}`]: !!this.shadow
      };
    }
  }
}, f = function() {
  return f = Object.assign || function(t) {
    for (var s, i = 1, r = arguments.length; i < r; i++) {
      s = arguments[i];
      for (var a in s)
        Object.prototype.hasOwnProperty.call(s, a) && (t[a] = s[a]);
    }
    return t;
  }, f.apply(this, arguments);
};
function B(e) {
  return e.toLowerCase();
}
var L = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], O = /[^A-Z0-9]+/gi;
function I(e, t) {
  t === void 0 && (t = {});
  for (var s = t.splitRegexp, i = s === void 0 ? L : s, r = t.stripRegexp, a = r === void 0 ? O : r, n = t.transform, $ = n === void 0 ? B : n, y = t.delimiter, V = y === void 0 ? " " : y, h = E(E(e, i, "$1\0$2"), a, "\0"), p = 0, g = h.length; h.charAt(p) === "\0"; )
    p++;
  for (; h.charAt(g - 1) === "\0"; )
    g--;
  return h.slice(p, g).split("\0").map($).join(V);
}
function E(e, t, s) {
  return t instanceof RegExp ? e.replace(t, s) : t.reduce(function(i, r) {
    return i.replace(r, s);
  }, e);
}
function N(e, t) {
  return t === void 0 && (t = {}), I(e, f({
    delimiter: "."
  }, t));
}
function A(e, t) {
  return t === void 0 && (t = {}), N(e, f({
    delimiter: "-"
  }, t));
}
function b(e, t, s = "-") {
  const i = t.toString().replace(new RegExp(`^${e}${s}?`), "");
  return [A(i), e].filter((r) => !!r).join(s);
}
function k(e) {
  return !Array.isArray(e) && typeof e == "object";
}
function F(e) {
  return e === void 0;
}
const T = {
  directives: {
    bindEvents: {
      beforeMount(e, t, s) {
        t.instance.bindEvents(e);
      }
    }
  },
  mixins: [j],
  inheritAttrs: !1,
  props: {
    activity: {
      type: Boolean,
      default: !1
    },
    animated: {
      type: Boolean,
      default: () => u("animated", !1)
    },
    nativeEvents: {
      type: Array,
      default() {
        return ["focus", "blur", "change", "click", "keypress", "keyup", "keydown", "progress", "paste"];
      }
    },
    defaultControlClass: {
      type: String,
      default: () => u("defaultControlClass", "form-control")
    },
    error: [String, Array, Boolean],
    errors: {
      type: [Array, Object, Boolean],
      default() {
        return {};
      }
    },
    feedback: [String, Array],
    group: {
      type: Boolean,
      default: () => u("group", !0)
    },
    helpText: [Number, String],
    hideLabel: Boolean,
    indicator: {
      type: String,
      default: () => u("indicator", "spinner")
    },
    indicatorSize: String,
    inline: Boolean,
    invalid: Boolean,
    label: [Number, String],
    labelClass: {
      type: [Object, String],
      default: () => u("labelClass", "form-label")
    },
    modelValue: {
      default: void 0
    },
    pill: Boolean,
    plaintext: Boolean,
    size: String,
    spacing: String,
    valid: Boolean
  },
  data() {
    return {
      defaultEmpty: !1,
      hasChanged: !1,
      hasFocus: !1,
      isEmpty: !0
    };
  },
  computed: {
    id() {
      return this.$attrs.id || this.$attrs.name || (Math.random() + 1).toString(36).substring(7);
    },
    componentName() {
      return this.$options.name;
    },
    controlAttributes() {
      return Object.fromEntries(Object.entries(this.$attrs).concat([["id", this.id], ["class", this.controlClasses]]));
    },
    controlClass() {
      return this.defaultControlClass;
    },
    controlSizeClass() {
      return b(this.size, this.controlClass);
    },
    formGroupClasses() {
      return {
        [A(this.componentName)]: !!this.componentName,
        [this.size && b(this.size, this.componentName)]: !!this.size,
        animated: this.animated,
        "default-empty": this.defaultEmpty,
        "form-group": this.group,
        [this.size && b(this.size, "form-group")]: !!this.size,
        "has-activity": this.activity,
        "has-changed": this.hasChanged,
        "has-focus": this.hasFocus,
        "has-icon": !!this.$slots.icon,
        "is-empty": this.isEmpty,
        "is-invalid": !!(this.invalid || this.invalidFeedback),
        "is-valid": !!(this.valid || this.validFeedback),
        [this.$attrs.class]: !!this.$attrs.class,
        [this.$attrs.id]: !!this.$attrs.id
      };
    },
    controlClasses() {
      return Object.assign({
        [this.controlClass]: !!this.controlClass,
        [this.controlSizeClass]: !!this.controlSizeClass,
        "form-control-icon": !!this.$slots.icon,
        "is-valid": !!(this.valid || this.validFeedback),
        "is-invalid": !!(this.invalid || this.invalidFeedback),
        [this.pillClasses]: this.pill,
        [this.plaintextClass]: this.plaintext,
        [this.spacing]: !!this.spacing
      }, this.shadowableClass);
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    invalidFeedback() {
      if (this.error === "")
        return null;
      if (this.error)
        return this.error;
      const e = this.getFieldErrors();
      return Array.isArray(e) ? e.filter((t) => t && typeof t == "string").join("<br>") : e;
    },
    pillClasses() {
      return "rounded rounded-pill";
    },
    plaintextClass() {
      return "form-control-plaintext";
    },
    validFeedback() {
      return Array.isArray(this.feedback) ? this.feedback.join("<br>") : this.feedback;
    }
  },
  watch: {
    hasFocus() {
      this.shouldChangeOnFocus() && (this.hasChanged = !0);
    },
    defaultEmpty() {
      this.hasChanged = !0;
    }
  },
  methods: {
    bindEvents(e, t) {
      t || (t = this.onInput);
      const s = e.querySelectorAll("option")[e.selectedIndex];
      F(this.modelValue) ? F(s) || (e.value = s.value) : e.value = this.modelValue, e.value && t(e.value), this.hasChanged = !!e.value, this.isEmpty = !e.value, e.addEventListener("focus", () => {
        this.hasFocus = !0;
      }), e.addEventListener("blur", () => {
        this.hasFocus = !1;
      }), e.addEventListener("input", (i) => {
        this.isEmpty = !1, this.hasChanged = !0;
      }), e.addEventListener(e.tagName === "SELECT" ? "change" : "input", () => t(e.value)), this.nativeEvents.forEach((i) => {
        e.addEventListener(i, (r) => {
          this.$emit(i, r);
        });
      });
    },
    blur() {
      this.getInputField() && this.getInputField().blur();
    },
    focus() {
      this.getInputField() && this.getInputField().focus();
    },
    getInputField() {
      return this.$el.querySelector(".form-control, input, select, textarea");
    },
    getFieldErrors() {
      let e = this.error || this.errors;
      return this.errors && k(this.errors) && (e = this.errors[this.$attrs.name || this.$attrs.id]), !e || Array.isArray(e) || k(e) ? e : [e];
    },
    shouldChangeOnFocus() {
      return !this.getInputField().readOnly;
    },
    onInput(e) {
      this.$emit("update:modelValue", e);
    }
  }
}, x = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, r] of t)
    s[i] = r;
  return s;
}, P = {
  name: "LightSwitchField",
  mixins: [
    T
  ],
  props: {
    activeClass: String,
    defaultControlClass: {
      type: String,
      default: "form-switch"
    },
    inactiveClass: String,
    onValue: {
      type: [String, Number, Boolean, Object, Array],
      default: 1
    },
    offValue: {
      type: [String, Number, Boolean, Object, Array],
      default: 0
    }
  },
  data() {
    return {
      currentValue: this.modelValue === this.onValue ? this.onValue : this.offValue
    };
  },
  computed: {
    isActive: function() {
      return this.currentValue === this.onValue;
    },
    controlSizeClass() {
      return this.size === "md" ? "form-control" : this.size && `form-control-${this.size}`;
    },
    controlClasses() {
      return [
        this.controlClass,
        this.controlSizeClass,
        this.spacing || "",
        this.invalidFeedback ? "is-invalid" : "",
        this.isActive ? "is-active" : "",
        this.isActive ? this.activeClass : "",
        this.isActive ? "" : this.inactiveClass
      ].join(" ");
    },
    hash() {
      return Math.random().toString(20).substr(2, 6);
    }
  },
  watch: {
    currentValue(e) {
      this.$emit("update:modelValue", e);
    }
  },
  methods: {
    getTransitionInMilliseconds() {
      const e = getComputedStyle(this.getInputField()).transitionDuration, t = parseFloat(e, 10), s = e.match(/m?s/);
      switch (s[0]) {
        case "s":
          return t * 1e3;
        case "ms":
          return t;
      }
      throw new Error(`"${s[0]}" is not a valid unit of measure. Unit must be "s" (seconds) or "ms" (milliseconds).`);
    },
    toggle(e) {
      e === void 0 && (e = this.isActive ? this.offValue : this.onValue), this.currentValue = e;
    }
  }
}, R = ["id", "checked"], M = ["for"], _ = ["innerHTML"], D = ["innerHTML"];
function G(e, t, s, i, r, a) {
  return o(), l("div", {
    class: C(e.formGroupClasses)
  }, [
    S("div", {
      ref: "input",
      class: C(a.controlClasses),
      onKeyup: [
        t[1] || (t[1] = m((n) => a.toggle(), ["space"])),
        t[2] || (t[2] = m((n) => a.toggle(s.offValue), ["arrow-left"])),
        t[3] || (t[3] = m((n) => a.toggle(s.onValue), ["arrow-right"]))
      ]
    }, [
      S("input", {
        id: e.$attrs.id || a.hash,
        ref: "input",
        checked: r.currentValue === s.onValue,
        type: "checkbox",
        class: "form-check-input",
        onInput: t[0] || (t[0] = (n) => a.toggle(n.target.checked ? s.onValue : s.offValue))
      }, null, 40, R),
      c(e.$slots, "label", {}, () => [
        e.label ? (o(), l("label", {
          key: 0,
          for: e.$attrs.id || a.hash,
          style: { "padding-left": ".5em" }
        }, [
          c(e.$slots, "default", {}, () => [
            z(w(e.label), 1)
          ])
        ], 8, M)) : v("", !0)
      ])
    ], 34),
    c(e.$slots, "feedback", {}, () => [
      e.invalidFeedback ? (o(), l("div", {
        key: 0,
        class: "invalid-feedback",
        invalid: "",
        innerHTML: e.invalidFeedback
      }, null, 8, _)) : e.validFeedback ? (o(), l("div", {
        key: 1,
        class: "valid-feedback",
        valid: "",
        innerHTML: e.validFeedback
      }, null, 8, D)) : v("", !0)
    ]),
    c(e.$slots, "help", {}, () => [
      e.helpText ? (o(), l("small", {
        key: 0,
        ref: "help"
      }, w(e.helpText), 513)) : v("", !0)
    ])
  ], 2);
}
const U = /* @__PURE__ */ x(P, [["render", G]]);
export {
  U as LightSwitchField
};
