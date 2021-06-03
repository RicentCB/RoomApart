<?php
    require_once("../controller/events.controller.php");
    require_once("../model/events.model.php");

    $allEvents = EventsController::ctrReadEvents();
    var_dump($allEvents);