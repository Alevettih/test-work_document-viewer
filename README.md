# Тестовое задание - просмотрщик документов.

Для просмотра документа, запустите dev сервер и перейдите по [адресу](http://localhost:4200/documents/view/1).
Создать аннотацию - ПКМ, на любом месте страницы.
Изменить/удалить можно по клику на кнопки в тултипе.

При нажатии на кнопку `Сохранить` выводит сборную модель, следующего вида:

```json5
{
  "name": "test doc",
  "pages": [
    {
      "number": 1,
      "imageUrl": "pages/1.png",
      "annotations": [
        {
          "id": "0.c58aec620e7d78",
          "content": "543534",
          "position": {
            "x": 215,
            "y": 214
          }
        }
        // ... остальные аннотации
      ]
    },
    // ... остальные страницы
  ]
}
```

## Плюсы и минусы реализации, известные проблемы и способы решения

### Плюсы

- Использование `zonelessChangeDetection` + стратегии обнаружения изменений `onPush`, на случай если захочется вернуться к `zone.js`.
- Декомпозиция - каждый компонент, отвечает только за свою часть функционала.
- Деление на функциональные модули:
  - `@features/shell` - Модуль содержащий кодовую базу "оболочки", рутовый компонент, его лейаут и страница `not-found`.
  - `@features/documents` - Модуль документов, содержащий кодовую базу, для реализации бизнес-логики связанной с отображением документов, их страниц и аннотаций к ним.
  - `@data/*` - модуль работы с данными - содержит API сервисы, модели, резолверы, потенциально, мог бы содержать стейт.
  - `@utils/*` - модуль для утилит - хелперы, абстракции, общие модели и типы.
  - `@shared/*` - модуль для переиспользуемых компонентов/директив/сервисов/пайпов.
- Использование современных возможностей Ангуляра (signal inputs, биндинг через поле `host`,)
- Получение мока API с использованием `proxy.conf.ts` и использование сервиса наследующего абстракцию со стандартной логикой REST сервисов (`src/app/utils/abstracts/rest-api.abstract.service.ts`), что позволит быстро перейти на полноценную реализацию API.
- Резолвер, перенаправляющий на страницу `/not-found`, если API вернёт ошибку.
- Аннотации привязаны к конкретной странице, что будет полезным при оптимизации (см. раздел минусы).
- Нельзя создать или переместить аннотацию за пределы страницы.
- Троттлинг события mousemove, при перемещении аннотации.
- При перемещении аннотации учитывается текущий скролл и увеличение/уменьшение (zoom).

### Минусы:

- Отсутствие Unit тестов, для ключевого функционала.
- Большое количество страниц и аннотаций на них может вызывать "фризы". Можно было бы использовать виртуальный скролл. Хватило бы реализовать его только для списка страниц, ибо аннотации привязаны к страницам, соответственно для скрытых страниц они так же не будут отрендерены.

###

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/documents/view/1`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
