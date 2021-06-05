<?php
    require_once("../controller/generic.controller.php");
    require_once("../model/generic.model.php");

    // Obtener Todos los eventos
    $allEvents = GenericController::ctrReadEvents();
    $arrOutEvents = array();
    foreach ($allEvents as $event) {
        $room = GenericController::ctrReadRooms("id_room", $event["id_room"]);
        array_push($arrOutEvents, array(
            'title'=>$room["nombre"].', '.$event["titulo"],
            'start'=>$event["fecha"].'T'.$event["hora_inicio"],
            'end'=>$event["fecha"].'T'.$event["hora_fin"],
            'backgroundColor'=>$event["color"],
            'borderColor'=>$event["color"],
        ));
    }
    echo json_encode($arrOutEvents);