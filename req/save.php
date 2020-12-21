<?php
    include($_SERVER["DOCUMENT_ROOT"]."/php/settings.php");
    include($_SERVER["DOCUMENT_ROOT"]."/php/spam.php");

    function getIPAddress() {if(!empty($_SERVER['HTTP_CLIENT_IP'])){$ip = $_SERVER['HTTP_CLIENT_IP'];}elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];}else{$ip = $_SERVER['REMOTE_ADDR'];}return $ip;}  

    if(!isset($_COOKIE['token'])){
        exit("ERROR: Header not send");
    }
    $token = preg_replace('/a-z0-9/iu', '', $_COOKIE['token']);

    $ip = preg_replace('/[^0-9a-z\:\.]/iu', '', getIPAddress());
    $start = time();

    $sql = $conn->prepare("");
    $sql->bind_param("ssss", $ip, $start, $until, $token);
    $sql->execute();
    $sql->close();

    echo "http://localhost/".$token;
?>