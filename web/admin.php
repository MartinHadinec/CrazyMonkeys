<?php
session_start();
$db_host = 'localhost';
$db_name = 'formular';
$db_user = 'root';
$db_pass = '';


$admin_username = 'admin'; // jméno
$admin_password = '123'; // heslo

// Pokud byl odeslán formulář pro přihlášení
if (array_key_exists("prihlasit", $_POST) && array_key_exists('username', $_POST) && array_key_exists('password', $_POST)) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Ověření, zda přihlašovací údaje jsou správné
    if ($username === $admin_username && $password === $admin_password) {
        $_SESSION['je_prihlasen'] = true;
    } else {
        echo 'Neplatné přihlašovací údaje.';
    }
}

// Odhlášení
if (array_key_exists("odhlasit", $_POST)) {
    session_unset(); // Odstranění všech dat v session
    session_destroy(); // Zničení session
}

// je prihlasen ?
if (array_key_exists('je_prihlasen', $_SESSION) && $_SESSION['je_prihlasen'] === true) {
    try {
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM dotaznik_formular";

        $stmt = $pdo->prepare($sql); // příprava dotazu SQL, odkazuje mi na promennou sql s dotazem, muze dojít k vyjimce
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC); // získání pole s klíčy - zkontrolovat datábazi, jeslti nedošlo k chybě tam

        if (count($rows) > 0) {
            echo '<table border="2">';
            echo '<tr>';
            echo '<th>Jméno</th>';
            echo '<th>Příjmení</th>';
            echo '<th>Telefonní číslo</th>';
            echo '<th>Datum odeslání</th>';
            echo '<th>Zpráva</th>';
            echo '</tr>';

            foreach ($rows as $row) {
                echo '<tr>';
                echo '<td>' . $row['jmeno'] . '</td>';
                echo '<td>' . $row['prijmeni'] . '</td>';
                echo '<td>' . $row['telefonni_cislo'] . '</td>';
                echo '<td>' . $row['datum_odeslani'] . '</td>';
                echo '<td><button class="show-button" data-rowid="' . $row['ID'] . '">Zobrazit zprávu</button></td>';
                echo '</tr>';
                echo '<tr>';
                echo '<td colspan="5"><div class="zprava" id="zprava-' . $row['ID'] . '" style="display: none;">' . $row['zprava'] . '</div></td>';
                echo '</tr>';
            }
            
            
            
            echo '</table>';
        } else {
            echo 'Nebyla nalezena žádná data.';
        }
        // Tlačítko pro odhlášení - OŠETŘIT REFRESH (MÉNĚ DŮLEŽITÉ)
        echo '<form method="POST" action="">';
        echo '<input type="submit" name="odhlasit" value="Odhlásit se">';
        echo '</form>';
    } catch (PDOException $e) {
        die("Chyba při načítání dat z databáze: " . $e->getMessage());
    }
} else {
    
    // Formulář pro přihlášení
    echo '<form method="POST" class="login-form">';
    echo '<span class="black-text">Uživatelské jméno:</span> <input type="text" name="username" placeholder="admin"><br>';
    echo '<span class="black-text">Heslo:</span> <input type="password" name="password" placeholder="123"><br>';
    echo '<input type="submit" value="Přihlásit se" name="prihlasit">';
    echo '</form>';

}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./assets/css/main.css">
    <link rel="stylesheet" href="./assets/css/admin.css">
</head>
<body>
    <script src="assets/js/zprava.js"></script>
</body>
</html>

<?php // Data -> databáze. Pokud se mi během zpracovávání dat z formuláře něco stane s databazí, vytvoří se prostor ?
        // pokud vznikne meziprostor, uživatel může zaplnit databázi stejnými daty pomocí refreshe. 
        // jeden refresh = jeden zápis stejných dat z formuláře do databáze.