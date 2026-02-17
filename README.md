# 🧪 Desafío Técnico

Objetivo: Evaluar la capacidad técnica, criterio de diseño, y nivel de autonomía de los candidatos. Este desafío no requiere despliegue en la nube ni ejecución de servicios reales en AWS, pero sí incluye ejercicios de diseño relacionados.



## 📝 Descripción general

La tarea consiste en construir APIs que permitan gestionar información sobre empresas y sus transferencias. La solución deberá ser clara, mantenible, escalable y escrita con buenas prácticas (Clean Code, separación de responsabilidades, claridad en los nombres, etc.).



### 🎯 Requerimientos funcionales

Debes implementar los siguientes 3 endpoints:

- Obtener las empresas que realizaron transferencias en el último mes.
- Obtener las empresas que se adhirieron en el último mes.
- Registrar la adhesión de una nueva empresa.
  - Empresa Pyme.
  - Empresa Corporativa.

### 🧰 Requerimientos no funcionales

- La API debe estar escrita en NestJs (standalone).
- No se permite el uso de Docker.
- No es necesario desplegar la API, pero debe poder ejecutarse localmente.
- Se puede usar base de datos local, un archivo JSON o persistencia en memoria.
- Si usás base de datos (relacional o no relacional), incluí una instancia embebida, simulada o en Cloud.
- Usá una arquitectura clara (idealmente Clean Architecture, Hexagonal, etc.)
  - Deseable: Hexagonal.

### ☁️ Parte adicional (AWS - Teórica)

Diseñar una Lambda Function de AWS que reciba una solicitud de adhesión de empresa (como en el punto 3), valide los datos y los almacene.

Incluí:

- Código de la Lambda
- Input/output esperados (formato JSON)
- Breve explicación de cómo la integrarías con el sistema
- La Lambda no debe ser ejecutada ni desplegada. Solo necesitamos el diseño funcional y su código fuente.

### ✅ Entregables

- Código fuente completo en un repositorio (puede ser privado).
- Instrucciones claras para correrlo localmente.
- Pruebas Unitarias.
- Explicación de tus decisiones (README o comentarios).

### 🧠 Qué evaluaremos

- Criterio técnico general y claridad de diseño.
- Programación Orientada a Objetos.
- Organización del código.
- Modelado de datos y diseño de endpoints.
- Documentación y facilidad de uso.
- Enfoque proactivo y capacidad de comunicación.


---

# 🚀 Resolución del Challenge

A continuación se detallan las decisiones tomadas y la implementación realizada para cumplir con cada punto del desafío.

## 1. Arquitectura

Opte por una **Arquitectura Hexagonal** distribuida en capas para garantizar la independencia del dominio y facilitar el testing y mantenimiento.

-   **Domain (`src/company/domain`)**: Contiene las entidades (`Company`, `Transfer`) y las reglas de negocio. No depende de ningún framework ni librería de infraestructura.
-   **Application (`src/company/application`)**: Define los casos de uso (ej: `FindCompaniesUseCase`, `RegisterCompanyUseCase`). Orquesta el flujo de datos entre la infraestructura y el dominio a través de puertos.
-   **Infrastructure (`src/company/infrastructure`)**: Implementa los detalles técnicos como los Controladores REST y la persistencia (Repositorios TypeORM con SQLite).

Esta estructura permite cambiar la base de datos o el framework web sin afectar la lógica de negocio, alineándose con los principios de Clean Architecture sugeridos en el desafío.

También aplique el principio SOLID.

- **S - Single Responsibility Principle (SRP)**

  - Los use cases
  - Las entidades de dominio
  - Los Value Objects


- **O - Open/Closed Principle (OCP)**

  - El caso de uso (`register-company.use-case.ts`) depende de un contrato que solo necesita `findByName` y `save` si luego tengo que cambiar
la implementación de como guardar o como buscar por nombre no necesito cambiar nada del caso de uso


- **L - Liskov Substitution Principle (LSP)**

  - El provider de nest es el que inyecta la implementación en el constructor del caso de uso, por ejemplo `SearchCompanyRepository` -> `CompanyRepositoryTypeorm`. Podríamos agregar una nueva
implementación que busque por ejemplo en elastic sin que afecte al caso de uso.  


- **I - Interface Segregation Principle (ISP)**
  
  - Existen 2 abstracciones `RegisterCompanyRepository` y `SearchCompanyRepository` donde a cada caso de uso depende de 
la que tiene lo mínimo necesario para que funcione dicho case de uso, esto ayuda también en los test a no tener que mockear más de lo necesario
o por ejemplo cuando implementé la lambda de registro, el mock que hice solo hay que implementar en el repositorio lo que necesita la lambda
 

- **D - Dependency Inversion Principle (DIP)**
  - El caso de uso (`register-company.use-case.ts`) depende de una abstracción (`register-company-repository.ts`)
y la infraestructura implementa esa abstracción (`company.repository.typeorm.ts`)

 
## 2. Requerimientos Funcionales

Implemente dos endpoints RESTFull en `CompanyController`, cumpliendo con los requisitos solicitados

NOTA: Para mantener un diseño REST consistente, modelé el recurso Company con un único endpoint GET que soporta distintos filtros vía query string.
De esta forma, se cubren los dos casos solicitados sin duplicar endpoints y respetando principios REST. 


### A. Obtener empresas que realizaron transferencias en el último mes
-   **Endpoint**: `GET /companies?filter=transfers-last-month`
-   **Implementación**: Filtra las empresas que tienen al menos una transferencia dentro del último mes.

### B. Obtener empresas que se adhirieron en el último mes
-   **Endpoint**: `GET /companies?filter=adhered-last-month`
-   **Implementación**: Devuelve las empresas cuya fecha de adhesión está dentro del último mes.

### C. Registrar la adhesión de una nueva empresa
-   **Endpoint**: `POST /companies`
-   **Funcionalidad**: Permite registrar empresas distinguiendo entre **Pyme** y **Corporativa** mediante el campo `type` en el body.
Para el challenge modelé ambos tipos como entidades separadas y utilicé un CompanyFactory para centralizar la creación según el type. La intención fue demostrar la aplicación del patrón Factory y mantener desacoplado el proceso de instanciación del caso de uso.
En un escenario real, dado que actualmente no existen diferencias de comportamiento entre ambos tipos, podría utilizarse una única entidad Company con un atributo type, evitando complejidad innecesaria.


## 3. Parte Adicional (AWS Lambda)

En un escenario productivo, la integración podría realizarse de la siguiente manera:

- La Lambda expuesta mediante API Gateway.
- Persistencia conectada a la misma base de datos utilizada por la API REST.
- Reutilización del mismo módulo application y domain.
- Inyección de una implementación real del repositorio (por ejemplo, usando TypeORM o un cliente RDS).
- Esto permite:
  - Reutilizar lógica de negocio.
  - Mantener coherencia arquitectónica.
  - Evitar duplicación de reglas.
  - Facilitar pruebas unitarias independientes del entorno AWS.

Incluí el código en la carpeta `/lambda`.

-   **Ubicación**: `lambda/register-company.ts`
-   **Diseño Funcional**:
    -   La Lambda reutiliza el mismo caso de uso que el controlador REST. Esto demuestra la flexibilidad de la arquitectura hexagonal: el dominio es agnóstico al punto de entrada (API REST o Serverless Function).
    -   Incluí un mock del repositorio dentro de la función para simular la persistencia.
-   **Inputs/Outputs**: Se definen en la carpeta `lambda` los archivos 
    - `input.json` ejemplo de entrada de un evento a traves de un api gateway.
    - `output.error.json` ejemplo de salida de un error genérico cuando el payload del mensaje es incorrecto.
    - `output.without-body.error.json` ejemplo de salida de un error cuando no viene el body en el mensaje.
    - `output.success.json` ejemplo de salida cuando el evento se procesó correctamente.
-   **Ejecución (Opcional)**: Aunque no se requiere despliegue, configure un script npm (`yarn lambda`) que utiliza SAM CLI para invocar la función localmente con un evento de prueba (`lambda/input.json`), si se desea verificar su funcionamiento.

## 4. Requerimientos No Funcionales y Decisiones Técnicas

-   **Base de Datos Local (SQLite)**: Para cumplir con la restricción de "No Docker" y mantener la ejecución local simple, utilice **SQLite** gestionado por **TypeORM**. Incluí una instancia de la base de datos con algunos datos de prueba en el archivo `database.sqlite` en la raíz del proyecto.
-   **Documentación API**: Integré **Swagger** en la ruta `/docs` para facilitar la exploración y prueba de los endpoints.

## 5. Instrucciones de Ejecución

1.  **Instalar dependencias**:
    ```bash
    yarn install
    ```
2.  **Levantar la aplicación**:
    ```bash
    yarn start:dev
    ```
    La API estará disponible en `http://localhost:3000` y la documentación en `http://localhost:3000/docs`.

3.  **Correr Tests**:
    Incluí pruebas unitarias para validar la lógica.
    ```bash
    yarn test
    ```

4.  **Correr lambda (Opcional)**:
    Incluí un script para invocar la función localmente

 Instalar sam: https://docs.aws.amazon.com/es_es/serverless-application-model/latest/developerguide/install-sam-cli.html

    ```bash
    yarn lambda
    ```
