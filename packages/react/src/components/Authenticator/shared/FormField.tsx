import * as React from 'react';
import { FormFieldOptions, getErrors } from '@aws-amplify/ui';

import { PasswordField } from '../../../primitives/PasswordField';
import { PhoneNumberField } from '../../../primitives/PhoneNumberField';
import { TextField } from '../../../primitives/TextField';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { ValidationErrors } from './ValidationErrors';

export interface FormFieldProps extends Omit<FormFieldOptions, 'label'> {
  // label is a required prop for the UI field components used in FormField
  label: string;
  name: string;
}

export function FormField({
  autocomplete: autoComplete,
  dialCode,
  name,
  type,
  ...props
}: FormFieldProps) {
  const { validationErrors } = useAuthenticator(({ validationErrors }) => [
    validationErrors,
  ]);

  const errors = React.useMemo(
    () => getErrors(validationErrors[name]),
    [name, validationErrors]
  );
  const hasError = errors?.length > 0;

  if (type === 'tel') {
    return (
      <>
        <PhoneNumberField
          {...props}
          name={name}
          defaultCountryCode={dialCode}
          countryCodeName="country_code"
          autoComplete={autoComplete}
          hasError={hasError}
        />
        <ValidationErrors errors={errors} />
      </>
    );
  } else if (type === 'password') {
    return (
      <>
        <PasswordField
          {...props}
          name={name}
          autoComplete={autoComplete}
          hasError={hasError}
        />
        <ValidationErrors errors={errors} />
      </>
    );
  } else {
    return (
      <>
        <TextField
          {...props}
          name={name}
          autoComplete={autoComplete}
          hasError={hasError}
          type={type}
        />
        <ValidationErrors errors={errors} />
      </>
    );
  }
}
