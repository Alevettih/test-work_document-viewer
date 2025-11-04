import { Provider } from '@angular/core';
import { tuiValidationErrorsProvider } from '@taiga-ui/kit';

export function provideValidationErrors(): Provider[] {
  return [
    tuiValidationErrorsProvider({
      required: (): string => 'Это обязательное поле.',
    }),
  ];
}
