## Como correr la entrega

Utilizo `fetch` para cargar datos desde un archivo JSON. Debido a las restricciones de seguridad del navegador, el uso de `fetch` para leer archivos locales puede provocar errores si no se utiliza un servidor web.

### Solución: Iniciar un servidor local con Python

Para evitar problemas al clonar este repositorio y ejecutar el proyecto, debes iniciar un servidor local. Si tienes Python instalado, puedes hacerlo fácilmente con el siguiente comando:

```bash
python -m http.server
