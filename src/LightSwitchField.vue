<script setup lang="ts" generic="T, V">
import type { CheckedFormControlProps, FormControlSlots } from '@vue-interface/form-control';
import { FormControlErrors, FormControlFeedback, useFormControl } from '@vue-interface/form-control';
import { computed, ref } from 'vue';

defineSlots<FormControlSlots<T>>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: T): void;
}>();

const props = withDefaults(defineProps<CheckedFormControlProps<T, V> & {
    onValue?: any,
    offValue?: any
}>(), {
    formControlClass: 'form-switch',
    labelClass: 'form-switch-label',
    onValue: 1,
    offValue: 0
});

function getModelValue(): T {
    if(props.modelValue === undefined) {
        return props.checked
            ? props.onValue
            : props.offValue;
    }

    return props.modelValue;
}

const model = computed({
    get: () => {
        return getModelValue() === props.onValue;
    },
    set(value) {
        emit('update:modelValue', value === true ? props.onValue : props.offValue);
    }
});

const {
    controlAttributes,
    formGroupClasses,
    onClick,
    onBlur,
    onFocus
} = useFormControl(props, emit, model);

const field = ref<HTMLTextAreaElement>();
</script>

<template>
    <div
        class="light-switch-field"
        :class="formGroupClasses">
        <label
            :for="controlAttributes.id"
            :class="labelClass">            
            <input
                ref="field"
                v-model="model"
                type="checkbox"
                v-bind="controlAttributes"
                @click="onClick"
                @blur="onBlur"
                @focus="onFocus">
            <slot>{{ label }}</slot>
        </label>

        <slot
            name="errors"
            v-bind="{ error, errors, id, name }">        
            <FormControlErrors
                v-if="!!(error || errors)"
                :id="id"
                v-slot="{ error }"
                :name="name"
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
