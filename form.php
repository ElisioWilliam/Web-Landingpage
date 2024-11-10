<?php
    include_once('config.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $senha = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $data_atual = date('Y-m-d H:i:s'); 

        if (empty($nome) || empty($email) || empty($senha)) {
            echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios.']);
            exit;
        }

        $result = mysqli_query($connection, "INSERT INTO usuarios (nome, email, senha, data_cadastro) VALUES ('$nome', '$email', '$senha', '$data_atual')");

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Cadastro realizado com sucesso!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar usuário.']);
        }
    }
?>