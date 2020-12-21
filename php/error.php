<?php
    error_reporting(2);

    $errorCodes = array(
        403 => "Forbidden",
        404 => "Not found",
        429 => "Too Many Requests",
        451 => "Unavailable For Legal Reasons",
        496 => "SSL Certificate Required",
        500 => "Internal Server Error",
        502 => "Bad Gateway",
        503 => "Service Unavailable",
        504 => "Gateway Timeout",
        505 => "HTTP Version Not Supported",
        901 => "Databank connection failed",
        902 => "Databank access not allowed"
    );
    function showError($errorCode){
        global $errorCodes;
        if(isset($errorCodes[$errorCode])){
            exit($errorCodes[$errorCode]);
        }else{
            exit("Unknow Error: ".$errorCode);
        }
    }
?>