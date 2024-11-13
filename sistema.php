<?php
    require 'events.php';
    require 'auth.php';
    
    $userEvents = getUserEvents($connection, $userId);
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vorg Technologies</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
    <link rel="stylesheet" href="./styles/sistema.css">
    <link rel="icon" href="./assets/imagens/logo-vorg/vorg-icon-black.png">
</head>

<body>
    <div class="wrapper">
        <aside id="sidebar">
            <div class="d-flex">
                <button id="hambg-inside" class="toggle-btn" type="button">
                    <i class="lni lni-grid-alt"></i>
                </button>
                <div class="sidebar-logo" id="logo-sidebar">
                    <a href="#"><img src="./assets/imagens/logo-vorg/vorg-white.png" style="max-width: 150px;" alt=""></a>
                </div>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-item">
                    <a href="sistema.php" class="sidebar-link">
                        <i class="lni lni-popup"></i>
                        <span>Inicio</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="sistema-events.php" class="sidebar-link">
                        <i class="lni lni-agenda"></i>
                        <span>Eventos</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-cog"></i>
                        <span>Configurações</span>
                    </a>
                </li>
            </ul>
            <div class="sidebar-footer">
                <a href="logout.php" class="sidebar-link">
                    <i class="lni lni-exit"></i>
                    <span>Logout</span>
                </a>
            </div>
        </aside>
        <div class="main">
            <nav class="navbar navbar-expand px-4 py-3">
                    <button id="hambg-outside" class="toggle-btn" type="button">
                        <i class="lni lni-grid-alt"></i>
                    </button>
                <form action="#" class="d-none d-sm-inline-block">

                </form>
                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item dropdown">
                            <a href="#" data-bs-toggle="dropdown" class="nav-icon pe-md-0">
                                <img src="./assets/imagens/account.png" class="avatar img-fluid" alt="">
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg-end rounded">
                                <li><a class="dropdown-item" type="button">Perfil</a></li>
                                <li><a class="dropdown-item" type="button">Configurações</a></li>
                                <li><a href="logout.php" class="dropdown-item" type="button">Sair</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <main class="content px-3 py-4">
                <div class="container-fluid">
                    <div class="mb-3">
                        <?php
                            echo "<h3 class='fw-bold fs-4 mb-3'>Seja bem vindo $logado</h3>"
                        ?>
                        <?php if (!empty($userEvents)): ?>
                        <table border="1" cellpadding="10" cellspacing="0" class="w-100 table">
                            <tr class="table-secondary">
                                <th>ID</th>
                                <th>Nome do Evento</th>
                                <th>Descrição</th>
                                <th>Data do evento</th>
                            </tr>
                            <?php foreach ($userEvents as $event): ?>
                                <tr>
                                    <td class="row-table"><?php echo htmlspecialchars($event['id']); ?></td>
                                    <td class="row-table"><?php echo htmlspecialchars($event['title']); ?></td>
                                    <td class="row-table"><?php echo htmlspecialchars($event['description']); ?></td>
                                    <td class="row-table"><?php echo htmlspecialchars($event['event_date']); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </table>
                        <?php else: ?>
                        <p>Você não está cadastrado em nenhum evento.</p>
                        <?php endif; ?>

                    </div>
                </div>
            </main>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="row text-body-secondary">
                        <div class="col-6 text-start ">
                            <a class="text-body-secondary" href=" #">
                                <strong>Vorg</strong>
                            </a>
                        </div>
                        <div class="col-6 text-end text-body-secondary d-none d-md-block">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item">
                                    <a class="text-body-secondary" href="#">Contact</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-body-secondary" href="#">About Us</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-body-secondary" href="#">Terms & Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="./scripts/sistema.js"></script>
</body>

</html>