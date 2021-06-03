<?php
    class EventsController{
        // Leer eventos
        static public function ctrReadEvents($item=NULL, $value=NULL){
            $events = EventModel::mldReadEvents($item, $value);
            return $events;
        }
        //Crear Eventos
        static public function ctrCreateEvent($data){
            
            $newEvent = EventModel::mdlCreateEvent($data);
            return $newEvent;
        }
    }