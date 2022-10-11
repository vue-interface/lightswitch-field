<template>
    <div :class="formGroupClasses">
        <div
            ref="input"
            :class="controlClasses"
            @keyup.space="toggle()"
            @keyup.arrow-left="toggle(offValue)"
            @keyup.arrow-right="toggle(onValue)">
            <input
                :id="$attrs.id || hash"
                ref="input"
                :checked="currentValue === onValue"
                type="checkbox"
                class="form-check-input"
                @input="e => toggle(e.target.checked ? onValue : offValue)">
            <slot name="label">
                <label
                    v-if="label"
                    :for="$attrs.id || hash"
                    style="padding-left: .5em">
                    <slot>{{ label }}</slot>
                </label>
            </slot>
        </div>

        <slot name="feedback">
            <div 
                v-if="invalidFeedback"
                class="invalid-feedback"
                invalid
                v-html="invalidFeedback" />
            <div 
                v-else-if="validFeedback"
                class="valid-feedback"
                valid
                v-html="validFeedback" />
        </slot>

        <slot name="help">
            <small v-if="helpText" ref="help">
                {{ helpText }}
            </small>
        </slot>
    </div>
</template>

<script>
import { FormControl } from '@vue-interface/form-control';

export default {

    name: 'LightSwitchField',

    mixins: [
        FormControl
    ],

    props: {

        /**
         * The class assigned to the control element when the switch is on.
         *
         * @property String
         */
        activeClass: String,

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        defaultControlClass: {
            type: String,
            default: 'form-switch'
        },

        /**
         * The class assigned to the control element when the switch is off.
         *
         * @property String
         */
        inactiveClass: String,

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        onValue: {
            type: [String, Number, Boolean, Object, Array],
            default: 1
        },

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
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
            if(this.size === 'md') {
                return 'form-control';
            }

            return this.size && `form-control-${this.size}`;
        },

        controlClasses() {
            return [
                this.controlClass,
                this.controlSizeClass,
                (this.spacing || ''),
                (this.invalidFeedback ? 'is-invalid' : ''),
                (this.isActive ? 'is-active' : ''),
                (this.isActive ? this.activeClass : ''),
                (!this.isActive ? this.inactiveClass : ''),
            ].join(' ');
        },

        hash() {
            return Math.random().toString(20).substr(2, 6);
        }

    },

    watch: {
        currentValue(value) {
            this.$emit('update:modelValue', value);
        }
    },

    methods: {

        getTransitionInMilliseconds() {
            const duration = getComputedStyle(this.getInputField()).transitionDuration;
            const numeric = parseFloat(duration, 10);
            const unit = duration.match(/m?s/);

            switch (unit[0]) {
            case 's':
                return numeric * 1000;
            case 'ms':
                return numeric;
            }

            throw new Error(`"${unit[0]}" is not a valid unit of measure. Unit must be "s" (seconds) or "ms" (milliseconds).`);
        },
        
        toggle(value) {
            if(value === undefined) {
                value = this.isActive ? this.offValue : this.onValue;
            }

            this.currentValue = value;
        }

    }

};
</script>
