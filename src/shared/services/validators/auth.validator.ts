import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable()
export class AuthValidator {
  constructor() {}

  inputLoginValidator = (
    userFriendlyInputName: string
  ) => {
    return (control: AbstractControl): ValidationErrors | null => {
      var errors: ValidationErrors | null = null;

      var value = (control.value) as string;

      if (value.includes('@') || value.includes(' ') || value.includes('"')) {
        errors = {
          ['inputLoginError']: `${userFriendlyInputName} contains unsupported syntax`
        };
      }

      return errors;
    }
  }

  inputLengthValidation = (
    userFriendlyInputName: string,
    requiredMinLength?: number,
    requiredMaxLength?: number
  ): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
     
      var result = null;
     
      if (!requiredMaxLength && !requiredMinLength) {
        return result;
      }
  
      if (requiredMinLength && control.value.length < requiredMinLength) {
        result = {
          ['inputLengthError']: `${userFriendlyInputName} length should be more than ${requiredMinLength}`,
        };
      }
      if (requiredMaxLength && control.value.length > requiredMaxLength) {
        result = {
          ['inputLengthError']: `${userFriendlyInputName} length should be less than ${requiredMaxLength}`,
        };
      }
      
      return result;
    };
  };

  checkPasswordMatchValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null;
      }
  
      const firstPasswordInput = control.root.get('inputFirstPassword');
  
      const secondPasswordInput = control.root.get('inputSecondPassword');
  
      const passwordsMatch: boolean =
        firstPasswordInput?.value === secondPasswordInput?.value &&
        firstPasswordInput?.value &&
        secondPasswordInput?.value
          ? true
          : false;
  
      console.log([passwordsMatch, secondPasswordInput?.value.length, firstPasswordInput?.value.length]);
  
      var response = passwordsMatch
        ? null
        : { ['passwordMatchError']: 'Passwords Mismatch' };
  
      if (control.parent?.get('inputFirstPassword') === control) { 
        secondPasswordInput?.setErrors(response);

        console.log([firstPasswordInput?.errors, secondPasswordInput?.errors])

        return null;
      }
      console.log([firstPasswordInput?.errors, secondPasswordInput?.errors])
  
      return response;
    };
  };


}