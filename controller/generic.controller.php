<?php
    class GenericController{
        // Leer eventos
        static public function ctrReadEvents($item=NULL, $value=NULL){
            $events = GenericModel::mldReadTable($item, $value, "eventos");
            return $events;
        }
        //Crear Eventos
        static public function ctrCreateEvent($data){
            $newEvent = GenericModel::mdlCreateEvent($data);
            return $newEvent;
        }
    }