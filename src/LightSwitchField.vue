<template>
    <div :class="formGroupClasses">

        <div
            ref="input"
            :class="controlClasses"
            tabindex="0"
            @click="toggle()"
            @keyup.32="toggle()"
            @keyup.37="toggle(offValue)"
            @keyup.39="toggle(onValue)">
            <input v-model="currentValue" type="checkbox" class="form-check-input">
            <slot name="label">
                <label
                    v-if="label"
                    :for="$attrs.id"
                    :class="{[labelClass]: !!labelClass}"
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
         * The class name assigned to the control element
         *
         * @property String
         */
        activeClass: {
            type: String,
            default: 'on'
        },

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
         * The field's default value.
         *
         * @param
         * @default false
         */
        defaultValue: {
            default: false
        },

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
                (this.isActive ? 'is-active' : '')
            ].join(' ');
        }

    },

    watch: {
        currentValue(value) {
            this.$emit('input', value)
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
            this.currentValue = typeof value === 'undefined' ? !this.currentValue : value;
        }

    }

};
</script>
