<?php
    include($_SERVER["DOCUMENT_ROOT"]."/php/settings.php");
    include($_SERVER["DOCUMENT_ROOT"]."/php/spam.php");
    
    if(!isset($_FILES['file']) || !isset($_COOKIE['token'])){
        exit("ERROR: Header not send");
    }
    $token = preg_replace('/a-z0-9/iu', '', $_COOKIE['token']);
    function getIPAddress() {if(!empty($_SERVER['HTTP_CLIENT_IP'])){$ip = $_SERVER['HTTP_CLIENT_IP'];}elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];}else{$ip = $_SERVER['REMOTE_ADDR'];}return $ip;}  
    
    $ip = preg_replace('/[^0-9a-z\:\.]/iu', '', getIPAddress());

    $sql = $conn->prepare("SELECT * FROM tokens WHERE token=? AND start<=? AND end>? AND ip=? LIMIT 1000");
    $sql->bind_param("ssss", $token, time(), time(), $ip);
    $sql->execute();
    $res = $sql->get_result();
    $meta = new stdClass();
    if($data = $res->fetch_array(MYSQLI_ASSOC)){
        //ok
    }else{
        exit("ERROR: Access denided");
    }
    
    $size = $_FILES["file"]["size"];
    $name_ex = $_FILES["file"]["name"];
    $ext = end(explode('.', $name_ex));
    $name = str_replace('.'.$ext, '', $name_ex);
    
    $name_f = preg_replace('/[^a-z0-9\_\-éàèöäü]/iu', '', str_replace(' ', '_', strtolower($name)));

    $path_g = md5(rand(100000, 999999) * rand(100000, 999999) * time());
    $path_s = "/files/".$path_g.".mydata";
    
    if(empty($ext)){
        $name_ex_f = $name_f.".".$ext;
    }else{
        $name_ex_f = $name_f;
    }

    if($size <= 0 || $size > 1000000 * 100){
        exit("ERROR: Filesize");
    }
    
    $_data_name = $name_ex_f;
    $_data_path = $path_s;
    $_data_token = $token;

    $sql = $conn->prepare("INSERT INTO files (id, name, file, token) VALUES (NULL, ?, ?, ?)");
    $sql->bind_param("sss", $_data_name, $_data_path, $_data_token);
    $sql->execute();
    $sql->close();

    if(move_uploaded_file($_FILES["file"]["tmp_name"], $_SERVER["DOCUMENT_ROOT"].$path_s)){
        exit("OK");
    }else{
        exit("ERROR: Error while uploading.");
    }
?>