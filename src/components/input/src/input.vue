<template>
    <div class="yd-input">
        <template v-if="regex == 'mobile'">
            <input type="tel" pattern="[0-9]*"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" maxlength="11" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
        </template>
        <template v-else>
            <template v-if="type == 'password'">
                <input v-if="!showPwd" type="password"
                       v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
                >
                <input v-if="showPwd" type="text"
                       v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
                >
            </template>
            <input v-if="type == 'text'" type="text"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'number'" type="number"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'email'" type="email"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'tel'" type="tel"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'datetime-local'" type="datetime-local"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'date'" type="date"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'time'" type="time"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
        </template>
        <a href="javascript:;" class="yd-input-clear" tabindex="-1" @click="clearInput" v-show="showClearIcon && showClear && !isempty"></a>
        <span class="yd-input-error" v-if="showErrorIcon" v-show="(!!regex || !!min || !!max || required) && iserror && initError"></span>
        <span class="yd-input-warn" v-if="showRequiredIcon && showErrorIcon" v-show="(required || (!!min && min > 0)) && isempty && showWarn"></span>
        <span class="yd-input-success" v-if="showSuccessIcon" v-show="(!!regex || !!min || !!max || required) && !iserror && currentValue != ''"></span>
        <a href="javascript:;" v-if="type == 'password'" class="yd-input-password" :class="showPwd ? 'yd-input-password-open' : ''" tabindex="-1" @click.stop="showPwd = !showPwd"></a>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-input',
        data() {
            return {
                currentValue: this.value,
                isempty: !this.value,
                iserror: false,
                showPwd: false,
                showClear: false,
                showWarn: true,
                initError: false,
                valid: true,
                errorMsg: '',
                errorCode: '',
                regexObj: {
                    email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$',
                    mobile: '^(86)?1[3,4,5,7,8]\\d{9}$',
                    bankcard: '^\\d{15,19}$'
                }
            }
        },
        props: {
            name: String,
            placeholder: String,
            value: [String, Number],
            readonly: Boolean,
            disabled: Boolean,
            regex: String,
            autocomplete: {
                type: String,
                default: 'off'
            },
            showClearIcon: {
                type: Boolean,
                default: true
            },
            showErrorIcon: {
                type: Boolean,
                default: true
            },
            showSuccessIcon: {
                type: Boolean,
                default: true
            },
            showRequiredIcon: {
                type: Boolean,
                default: true
            },
            required: {
                type: Boolean,
                default: false
            },
            type: {
                validator (value) {
                    return ['text', 'password', 'email', 'number', 'tel', 'datetime-local', 'date', 'time'].indexOf(value) > -1;
                },
                default: 'text'
            },
            max: {
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            min: {
                validator(val) {
                    return /^\d*$/.test(val);
                }
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
                this.emitInput();
            },
            currentValue(val) {
                this.isempty = !val;
                this.validatorInput(val, true);
                this.emitInput();
            },
            required(val) {
                this.required = val;
                this.validatorInput(this.currentValue, false);
            }
        },
        methods: {
            validatorInput(val, showError) {

                this.initError = showError;

                if(showError) this.showWarn = false;

                if(this.required && val === '') {
                    this.setError('不能为空', 'NOT_NULL');
                    this.iserror = true;
                    return;
                }

                if (this.min && val.length < this.min) {
                    this.setError(`最少输入${this.min}位字符`, 'NOT_MIN_SIZE');
                    this.iserror = true;
                    return;
                }

                const v = this.regex === 'bankcard' ? val.replace(/\s/g, '') : val;
                const reg = this.regexObj[this.regex] ? this.regexObj[this.regex] : this.trim(this.regex, '/');
                if (!!v && this.regex && !new RegExp(reg).test(v)) {
                    this.setError('输入字符不符合规则', 'NOT_REGEX_RULE');
                    this.iserror = true;
                    return;
                }

                this.iserror = false;
                this.valid = true;
                this.errorMsg = '';
                this.errorCode = '';
            },
            blurHandler() {
                this.validatorInput(this.currentValue, true);

                setTimeout(() => {
                    this.showClear = false;
                }, 200);
            },
            clearInput() {
                this.currentValue = '';
                this.emitInput();
            },
            emitInput() {
                if (this.regex === 'bankcard') {
                    if (/\S{5}/.test(this.currentValue)) {
                        this.currentValue = this.currentValue.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                    }
                    this.$emit('input', this.currentValue.replace(/\s/g, ''));
                    return;
                }
                this.$emit('input', this.currentValue);
            },
            setError(error, code) {
                this.errorMsg = error;
                this.errorCode = code;
                this.valid = false;
            },
            trim(str, char) {
                if (!!str) {
                    return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
                }
                return str;
            }
        },
        mounted() {
            this.validatorInput(this.currentValue, false);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/components/input.less";
</style>
