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
         * The class assigned to the control element when the switch is on.
         *
         * @property String
         */
        checked: {
            type: Boolean,
            default: false
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
        }
    },

    methods: {
        getModelValue(): any {
            if(this.modelValue === undefined) {
                return this.currentValue === undefined && this.checked
                    ? this.onValue
                    : this.currentValue;
            }

            return this.modelValue;
        }
    }

});
</script>


<template>
    <div
        :class="formGroupClasses">
        <label
            :for="id"
            class="form-switch-label">
            
            <input
                ref="field"
                v-model="model"
                v-bind-events
                type="checkbox"
                v-bind="controlAttributes">
            <slot>{{ label }}</slot>
        </label>

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
