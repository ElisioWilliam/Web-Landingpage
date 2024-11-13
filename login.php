<?php
    session_start();

    include_once('config.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = $_POST['email'] ?? '';
        $senha = $_POST['password'] ?? '';

        if (empty($email) || empty($senha)) {
            echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios.']);
            exit;
        }

        $stmt = $connection->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Erro na preparação da consulta.']);
            exit;
        }

        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $usuario = $result->fetch_assoc();
        
        if ($usuario && password_verify($senha, $usuario['password'])) {
            $_SESSION['user_id'] = $usuario['id'];;
            $_SESSION['email'] = $email;
            $_SESSION['nome'] = $usuario['username'];
            echo json_encode(['success' => true, 'message' => 'Usuário logado!']);
        } else {
            unset($_SESSION['user_id']);
            unset($_SESSION['email']);
            unset($_SESSION['nome']);
            echo json_encode(['success' => false, 'message' => 'Falha ao logar! Senha ou e-mail incorretos.']);
        }

        $stmt->close();
        exit;
    }
?>
