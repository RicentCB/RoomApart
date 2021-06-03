<?php
    require_once("../controller/generic.controller.php");
    require_once("../model/generic.model.php");

    $allRooms = GenericController::ctrReadRooms();
    echo json_encode($allRooms);
