<?php
session_start();
include_once('config.php');
require 'vendor/autoload.php';

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!isset($_SESSION['user_id']) || !isset($_SESSION['email'])) {
    echo "Usuário não autenticado.";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['event_id'])) {
    $event_id = (int)$_POST['event_id'];
    $user_id = (int)$_SESSION['user_id'];
    $email = $_SESSION['email'];

    $queryCheck = "SELECT * FROM user_events WHERE user_id = ? AND event_id = ?";
    $stmtCheck = $connection->prepare($queryCheck);
    $stmtCheck->bind_param('ii', $user_id, $event_id);
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();

    if ($result->num_rows > 0) {
        echo "Você já está inscrito neste evento.";
        exit;
    }

    $queryInsert = "INSERT INTO user_events (user_id, event_id) VALUES (?, ?)";
    $stmtInsert = $connection->prepare($queryInsert);
    $stmtInsert->bind_param('ii', $user_id, $event_id);

    if ($stmtInsert->execute()) {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'];
            $mail->Password = $_ENV['SMTP_PASSWORD'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->CharSet = 'UTF-8';

            $mail->setFrom('vorgtechnologies@vorg.com', 'Vorg Technologies');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Confirmação de Inscrição';
            $mail->Body = "Você se inscreveu com sucesso no evento!";

            if ($mail->send()) {
                echo "Inscrição realizada com sucesso e e-mail enviado!";
                exit;
            } else {
                echo "Inscrição realizada, mas falha ao enviar e-mail.";
                exit;
            }
        } catch (Exception $e) {
            echo "Erro ao enviar e-mail.";
            exit;
        }
    } else {
        echo "Erro ao realizar inscrição.";
        exit;
    }
} else {
    echo "Dados inválidos.";
    exit;
}
?>
