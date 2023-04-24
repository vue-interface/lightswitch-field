<script lang="ts">
import { FormControl } from '@vue-interface/form-control';
import { defineComponent } from 'vue';

export default defineComponent({

    name: 'LightSwitchField',

    extends: FormControl,

    props: {

        /**
         * The class assigned to the control element when the switch is on.
         *
         * @property String
         */
        activeClass: {
            type: String,
            default: undefined
        },

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        formControlClass: {
            type: String,
            default: 'form-switch'
        },

        /**
         * The class assigned to the control element when the switch is off.
         *
         * @property String
         */
        inactiveClass: {
            type: String,
            default: undefined
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

    // data() {
    //     return {
    //         currentValue: this.modelValue === this.onValue
    //             ? this.onValue
    //             : this.offValue
    //     };
    // },

    computed: {
        
        model: {
            get() {
                return this.getModelValue() === this.onValue;
            },
            set(value: any) {
                this.setModelValue(
                    value === true ? this.onValue : this.offValue
                );
            }
        },

        isActive: function () {
            return this.model === this.onValue;
        },

        controlSizeClass() {
            if(this.size === 'md') {
                return 'form-control';
            }

            return this.size && `form-control-${this.size}`;
        }

    },

    // methods: {

    //     toggle(value?: any) {
    //         console.log('toggle', value);
    //         // if (value === undefined) {
    //         //     value = this.isActive ? this.offValue : this.onValue;
    //         // }

    //         // this.currentValue = value;
    //     }

    // }

});
</script>


<template>
    {{ isValid }}
    <div :class="formGroupClasses">
        <div
            ref="input"
            class="border-2 border-red-500"
            :class="{
                ...controlClasses,
                ['is-valid']: isValid,
                ['is-invalid']: isInvalid,
                ['is-active']: isActive,
                [String(activeClass)]: isActive,
                [String(inactiveClass)]: !isActive,
            }">
            <input
                :id="id"
                ref="input"
                v-model="model"
                :disabled="controlAttributes.disabled"
                type="checkbox"
                class="form-check-input">
            <slot name="label">
                <label
                    v-if="label"
                    :for="id"
                    style="padding-left: .5em">
                    <slot>{{ label }}</slot>
                </label>
            </slot>
        </div>

        <slot
            name="errors"
            v-bind="{ error, errors, id: $attrs.id, name: $attrs.name }">        
            <FormControlErrors
                v-if="!!(error || errors)"
                :id="$attrs.id"
                v-slot="{ error }"
                :name="$attrs.name"
                :error="error"
                :errors="errors">
                <div
                    invalid
                    class="invalid-feedback">
                    {{ error }}<br>
                </div>
            </FormControlErrors>
        </slot>
        
        <slot
            name="feedback"
            v-bind="{ feedback }">
            <FormControlFeedback
                v-slot="{ feedback }"
                :feedback="feedback">
                <div
                    valid
                    class="valid-feedback">
                    {{ feedback }}
                </div>
            </FormControlFeedback>
        </slot>

        <slot name="help">
            <small
                v-if="helpText"
                ref="help">
                {{ helpText }}
            </small>
        </slot>
    </div>
</template>
