<?php
    session_start();

    include_once('config.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = $_POST['email'] ?? '';
        $senha = $_POST['password'] ?? '';

        // Validar campos vazios
        if (empty($email) || empty($senha)) {
            echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios.']);
            exit;
        }

        // Usar prepared statements para evitar SQL injection
        $stmt = $connection->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Erro na preparação da consulta.']);
            exit;
        }

        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $usuario = $result->fetch_assoc();
        
        if ($usuario && password_verify($senha, $usuario['senha'])) {
            $_SESSION['email'] = $email;
            $_SESSION['nome'] = $usuario['nome'];
            echo json_encode(['success' => true, 'message' => 'Usuário logado!']);
        } else {
            unset($_SESSION['email']);
            unset($_SESSION['nome']);
            echo json_encode(['success' => false, 'message' => 'Falha ao logar! Senha ou e-mail incorretos.']);
        }

        $stmt->close();
        exit;
    }
?>
