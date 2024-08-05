# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).



## Frontend

### Requerimientos
- Docker

### Pasos para la instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/lokogam/decameron-hotel-client.git
    cd decameron-hotel-client
    ```

2. Levanta los contenedores Docker:

    ```bash
    docker-compose up -d
    ```

3. Accede al contenedor:

    ```bash
    docker exec -it decameron-hotel-client sh
    ```

4. Instala las dependencias de npm:

    ```bash
    npm install
    ```

5. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```
- Application: [http://localhost:3000](http://localhost:3000)