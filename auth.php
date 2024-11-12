<?php
    if((!isset($_SESSION['email']) == true and (!isset($_SESSION['nome']) == true))){
        unset($_SESSION['user_id']);  
        unset($_SESSION['email']);  
        unset($_SESSION['nome']);
        header('Location: login.html');
    }
    $logado = $_SESSION['nome'];
?>