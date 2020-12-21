<?php
    include($_SERVER["DOCUMENT_ROOT"]."/php/settings.php");
    include($_SERVER["DOCUMENT_ROOT"]."/php/spam.php");

    function getIPAddress() {if(!empty($_SERVER['HTTP_CLIENT_IP'])){$ip = $_SERVER['HTTP_CLIENT_IP'];}elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];}else{$ip = $_SERVER['REMOTE_ADDR'];}return $ip;}  
    
    $ip = preg_replace('/[^0-9a-z\:\.]/iu', '', getIPAddress());
    $start = time();
    $until = time() + (60 * 60 * 4);
    $token = md5(rand(10000000000, 9999999999) * rand(10000000000, 9999999999)).md5(rand(10000000000, 9999999999) * rand(10000000000, 9999999999));

    $sql = $conn->prepare("INSERT INTO tokens (id, ip, start, end, token) VALUES (NULL, ?, ?, ?, ?)");
    $sql->bind_param("ssss", $ip, $start, $until, $token);
    $sql->execute();
    $sql->close();

    setcookie('token', $token, $until, "/");
    echo "{token}(".$token;
?>