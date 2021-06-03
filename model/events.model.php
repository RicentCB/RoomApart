<?php  
    require_once("connection.php");

    class EventModel{
        // Leer Eventos
        static public function mldReadEvents($item, $value){
            $sql = "SELECT * FROM eventos ";
            if($item == null){
                $stmt = Connection::connect() -> prepare($sql);
                $stmt -> execute();
                return $stmt -> fetchALl();
            }else{
                $sql .= "WHERE $item LIKE :item ";
                $stmt = Connection::connect() -> prepare($sql);
                $stmt -> bindParam(":item", $value);
                $stmt -> execute();
                return $stmt -> fetch();
            }
        }
        // Crear Nuevo Evento
        static public function mdlCreateEvent($data){
            $sql = "INSERT INTO `eventos` (`id_evento`, `id_room`, `titulo`, `color`, `materia`, `fecha`, `hora_inicio`, `hora_fin`) ";
            $sql = "VALUES (NULL, :id_room, :titulo, :color, :materia, :fecha, :hora_inicio, :hora_fin)";
            
            $stmt = Connection::connect()->prepare($sql);
            $stmt -> bindParam(":id_room", $data["room"]);
            $stmt -> bindParam(":titulo", $data["title"]);
            $stmt -> bindParam(":color", $data["color"]);
            $stmt -> bindParam(":materia", $data["subject"]);
            $stmt -> bindParam(":timeStart", $data["hora_inicio"]);
            $stmt -> bindParam(":hora_fin", $data["timeEnd"]);
            

            if($stmt->execute())
                return true;
            else   
                return false;
        }
    }