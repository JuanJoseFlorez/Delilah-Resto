# Delilah-Resto
Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. Deberás poner en funcionamiento las partes necesarias para montar una REST API que permita realizar altas, bajas, modi?caciones y obtención de información sobre una estructura de datos que podría consumir un cliente. Parte del desafío estará enfocado en lograr que el desarrollo del proyecto sea puesto en producción utilizando web services.

# Instrucciones de instalación
1. Instalar MariaDB y la herramienta que se prefiera para visualizar la base de datos, en este caso se utilizó DBeaver.
2. Añadir una nueva conexion en el programa gestor de base de datos, llenando los datos de Server Host, port, nombre de usuario y contraseña.
3. Abrir un nuevo script sql en la conexion realizada y ejecutar el siguiente script: "CREATE DATABASE restaurante;".
4. Dar clic derecho sobre la nueva base de datos (Si es necesario refrescar la conexion), dirigirse a herramientas y seleccionar "restore database". En "Input File" se debe seleccionar el sql añadido en el proyecto con el nombre "dump-restaurante-202106172016" y seguidamente dar clic sobre start.
5. Crear en la carpeta raiz del proyecto un archivo ".env" el cual debe tener los campos del archivo ".env-template". En el parametro "LLAVE" se debe ingresar la usada para el token (en el proyecto se usó EBC61FA5D45B8F4798418164459C33F0B25CCFDC6C1C2EFB8AAD3D8F9FF83FF6) y en el parametro "BD_CONTRASENA" se debe ingresar la contraseña de la base de datos.