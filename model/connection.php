<?php
    class Connection{

        static public function connect(){

            $serv = "localhost";
            $db   = "roomapart";
            $user = "root";
            $pass = "";
    
            $link = new PDO("mysql:host=".$serv.";dbname=".$db."",
                        $user,
                        $pass);
    
            $link->exec("set names utf8");
    
            return $link;
    
        }
    
    }