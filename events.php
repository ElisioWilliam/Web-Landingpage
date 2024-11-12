<?php

session_start();
include_once('config.php');

function getUserEvents($connection, $userId) {
    $query = "SELECT events.id, events.title, events.description, events.event_date 
              FROM events
              INNER JOIN user_events ON events.id = user_events.event_id
              WHERE user_events.usuario_id = ?";
              
    $stmt = $connection->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $events = [];
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }

    $stmt->close();
    return $events;
}

function getEventById($connection, $id) {
    $query = "SELECT id, title, url_img, description, event_date FROM events WHERE id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    } else {
        return null;
    }
}

function getEvents($connection) {
    $query = "SELECT events.id, events.title, events.url_img, events.description, events.event_date 
              FROM events";
              
    $stmt = $connection->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    $events = [];
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }

    $stmt->close();
    return $events;
}

function formatarData($data) {
    setlocale(LC_TIME, 'pt_BR.utf8', 'portuguese');
    
    $dataObj = new DateTime($data);
    
    $dataFormatada = strftime('%A, %d de %B de %Y', $dataObj->getTimestamp());

    $partes = explode(', ', $dataFormatada);
    $partes[0] = ucfirst($partes[0]);

    return utf8_encode(implode(', ', $partes));
}
$userId = $_SESSION['user_id'] ?? null;

if (!$userId) {
    header("Location: login.html");
    exit;
}


?>
