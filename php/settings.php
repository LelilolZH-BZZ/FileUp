<?php
    include($_SERVER["DOCUMENT_ROOT"]."/php/error.php");

    header('Content-Type: text/html; charset=utf-8');

    $settings_databankLogin = array(
        array(
            "host" => "localhost",
            "ben" => "root",
            "pas" => "",
            "name" => "uploadpage"
        ),
        array(
            "host" => "localhost",
            "ben" => "kinostream",
            "pas" => "Limmat_cool_gang07",
            "name" => "uploadpage"
        )
    );
    
    $settings_activeLogin = 0;//choose position from $databankLogin
    
    if(isset($settings_databankLogin[$settings_activeLogin])){
        
    }else{
        showError(901);
    }
    
    $conn = new mysqli(
        $settings_databankLogin[$settings_activeLogin]["host"],
        $settings_databankLogin[$settings_activeLogin]["ben"],
        $settings_databankLogin[$settings_activeLogin]["pas"],
        $settings_databankLogin[$settings_activeLogin]["name"]
    );
    
    $conn -> set_charset("utf8");
    
    if($conn->connect_error){
        showError(902);
    }

    $sql = $conn->prepare("SELECT name as n, value as v FROM metainformations LIMIT 1000");
    //$sql->bind_param();
    $sql->execute();
    $res = $sql->get_result();
    $meta = new stdClass();
    while($data = $res->fetch_array(MYSQLI_ASSOC)){
        $name = $data["n"];
        $value = $data["v"];
        $meta->$name = $value;
    }
    $meta = json_decode(json_encode($meta), true);
    $sql->close();
?>