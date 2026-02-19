# QA E2E Tests – Playwright + Cucumber

Este proyecto contiene pruebas End-to-End desarrolladas con Playwright, Cucumber (BDD) y el patrón Page Object Model (POM).

Automatiza flujos funcionales en sitios web reales, organizando escenarios en archivos `.feature` y separando la lógica de interacción mediante Page Objects.

---

## Stack tecnológico

- **TypeScript**  
  Lenguaje principal del proyecto. Permite trabajar con tipado estático y mejor organización del código.

- **Playwright**  
  Framework de automatización utilizado para interactuar con el navegador.

- **Cucumber**  
  Implementa BDD mediante sintaxis Gherkin, permitiendo definir escenarios en lenguaje más declarativo.

- **ts-node**  
  Permite ejecutar archivos TypeScript sin necesidad de compilarlos previamente.

---

## Estructura del proyecto

```text
qa-e2e-tests/
├── features/
│   └── armando-la-valija.feature
├── reports/
├── src/
│   ├── pages/
│   │   ├── tripadvisor/
│   │   └── sodimac/
│   ├── steps/
│   ├── hooks/
│   └── support/
│       └── utils/
├── playwright.config.ts
├── cucumber.cjs
├── package.json
├── tsconfig.json
└── README.md
```


### `features/`
Contiene los archivos `.feature` escritos en Gherkin.  
Cada archivo representa un flujo funcional completo que se desea validar.

### `src/pages/`
Implementación del patrón Page Object Model.  
Cada clase representa una página o sección del sitio y contiene los selectores y métodos necesarios para interactuar con ella.  
Se organizan por dominio (por ejemplo, TripAdvisor o tienda online) para mantener claridad.

### `src/steps/`
Contiene las definiciones de los pasos Gherkin.  
Aquí se conectan los escenarios definidos en `features/` con los métodos implementados en las páginas.

### `src/hooks/`
Define configuraciones globales como inicialización y cierre del navegador (Before/After).

### `src/support/`
Carpeta reservada para utilidades o configuraciones auxiliares que puedan necesitar las pruebas.

### `src/support/utils/`
Contiene funciones utilitarias reutilizables para los escenarios, como validaciones del carrito y parseo de moneda.  
Su objetivo es centralizar lógica transversal y evitar duplicación en Steps y Page Objects.

### `reports/`
Directorio de salida para artefactos generados durante la ejecución de pruebas (por ejemplo, screenshots del carrito).  
Facilita el análisis de evidencias y el diagnóstico de fallos en corridas E2E.

### `playwright.config.ts`
Archivo de configuración general de Playwright (timeouts, modo headless, capturas, etc.).

### `cucumber.cjs`
Archivo de configuración de Cucumber (`import` de hooks/steps, formato de ejecución y paths de features).

---

## Instalación

Desde la raíz del proyecto:

```bash
npm install
```

## Ejecución de pruebas

Para ejecutar todos los escenarios definidos:

```bash
npm run test
```

Este comando ejecuta los archivos `.feature` utilizando Cucumber y Playwright según la configuración definida.

Actualmente se ejecuta con Node ESM + `ts-node/esm`, tomando la configuración desde `cucumber.cjs`.