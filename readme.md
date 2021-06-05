# Room Apart

Sistema de calendario para agregar eventos, con interfaz web para todos los navegadores, responsivo en escritorios.

## Como instalarlo

El sistema tiene una base de datos elaborada en MySQL, el archivo de dicha base se encuentra en la carpeta 'SQL'.
Por lo que se debera importar en tu manejador de bases de datos (phpMyAdmin o directamente en consola).
Y modificar el archivo 'connection.php', en la carpeta model. Donde encontraras un codigo como el siguiente

```
    class Connection{

        static public function connect(){

            $serv = "localhost";
            $db   = "test";
            $user = "root";
            $pass = "";
    
            $link = new PDO("mysql:host=".$serv.";dbname=".$db."",
                        $user,
                        $pass);
    
            $link->exec("set names utf8");
    
            return $link;
    
        }
    
    }
```

Modificaras las variables:  
    $serv => Direccion del servidor  
    $db => Nombre de la base de datos  
    $user => Usuario registrado en el manejador  
    $pass => la contraseña del manejador  

Ya hay eventos precargados en la base de datos de ejemplo, por lo cual si la conexión es correcta deberias de verlos en el calendario en el mes de Junio 2021.
