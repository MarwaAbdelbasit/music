import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';

import { 
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    //register the veeform and veefield components
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos_required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('max_value', maxValue)
    defineRule('min_value', minValue)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)

    configure({
      //this function will be called whenever a global validator function returns false
      generateMessage: (ctx) => {
        const messages = {
          required: `the field ${ctx.field} is required`,
          min: `the field ${ctx.field} is too short`,
          max: `the field ${ctx.field} is too long`,
          alpha_spaces: `the field ${ctx.field} may only contain alphabetical charaters and spaces`,
          email: `the field ${ctx.field} must be a valid email`,
          max_value: `the field ${ctx.field} is too high`,
          min_value: `the field ${ctx.field} is too low`,
          passwords_mismatch: `password don't match`,
          country_excluded: `you are not allowed to choose this country`,
          excluded: `you are not allowed to use this value from this field ${ctx.field}`,
          tos_required: `you have to agree to the terms of service`
        };

        //tell the vee validate which message to use
        const message = messages[ctx.rule.name] 
          ? messages[ctx.rule.name] 
          : `the field ${ctx.field} is invalid`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  },
};
