<?php
    require_once("../controller/events.controller.php");
    require_once("../model/events.model.php");

    // Obtener Todos los eventos
    $allEvents = EventsController::ctrReadEvents();
    $arrOutEvents = array();
    foreach ($allEvents as $event) {
        array_push($arrOutEvents, array(
            'title'=>$event["titulo"].', ',
            'start'=>$event["fecha"].'T'.$event["hora_inicio"],
            'end'=>$event["fecha"].'T'.$event["hora_fin"],
            'backgroundColor'=>$event["color"],
            'borderColor'=>$event["color"],
        ));
    }
    echo json_encode($arrOutEvents);