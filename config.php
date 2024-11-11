<?php
    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '';
    $dbName = 'vorg';

    $connection = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

    if ($connection->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados.']);
        exit;
    }
?>