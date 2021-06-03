<?php
    class EventsController{
        static public function ctrReadEvents($item=NULL, $value=NULL){
            $clients = EventModel::mldReadEvents($item, $value);
            return $clients;
        }
    }