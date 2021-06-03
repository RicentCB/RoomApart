<?php
    require_once("../controller/events.controller.php");
    require_once("../model/events.model.php");

    if(isset($_POST["action"])){
        switch($_POST["action"]){
            case 'createEvent':
                $_POST["timeStart"] = $_POST["timeStart"].':00';
                $_POST["timeEnd"] = $_POST["timeEnd"].':00';
                $newEvent = EventsController::ctrCreateEvent($_POST);
                if($newEvent)
                    echo json_encode(array("type"=>"success"));
                else
                    echo json_encode(array("type"=>"error", "message"=>"No se puede crear evento"));
                break;
            default:
                echo json_encode(array("type"=>"error", "message"=>"Elemento de accion no corresponde"));
            }
    }else{
        echo json_encode(array("type"=>"error", "message"=>"No hay elemnto de accion"));
    }