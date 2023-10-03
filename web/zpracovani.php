<?php
session_start();
$db_host = 'localhost';
$db_name = 'formular';
$db_user = 'root';
$db_pass = '';

$jmeno = $_POST["jmeno"];
$prijmeni = $_POST["prijmeni"];
$cislo = $_POST["cislo"];
$zprava = $_POST["zprava"];


if (array_key_exists("odeslat", $_POST)) {
    $jmeno = $_POST["jmeno"];
    $prijmeni = $_POST["prijmeni"];
    $cislo = $_POST["cislo"];
    $zprava = $_POST["zprava"];
    
}

class Dotaznik{
    private $jmeno;
    private $prijmeni;
    private $cislo; 
    private $zprava;

    public function __construct($argJmeno, $argPrijmeni, $argCislo, $argZprava)
    {
        $this->jmeno = $argJmeno;
        $this->prijmeni = $argPrijmeni;
        $this->cislo = $argCislo;
        $this->zprava = $argZprava;
    }
    public function getJmeno()
    {
        return $this->jmeno;
    }
    public function getPrijmeni()
    {
        return $this->prijmeni;
    }
    public function getCislo()
    {
        return $this->cislo;
    }
    public function getZprava()
    {
        return $this->zprava;
    }
}


try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Chyba připojení k databázi: " . $e->getMessage());
}

$dotaznik = new Dotaznik($jmeno, $prijmeni, $cislo, $zprava);

$currentDateTime = date('Y-m-d H:i:s');
// SQL dotaz pro vložení dat
$sql = "INSERT INTO dotaznik_formular (jmeno, prijmeni, telefonni_cislo, zprava, datum_odeslani) VALUES (:jmeno, :prijmeni, :cislo, :zprava, :datum)";

// Data pro vložení
$data = [
    ':jmeno' => $dotaznik->getJmeno(),
    ':prijmeni' => $dotaznik->getPrijmeni(),
    ':cislo' => $dotaznik->getCislo(),
    ':zprava' => $dotaznik->getZprava(),
    ':datum' => $currentDateTime,
];

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($data);
    echo "doslo k uložení do databáze";
} catch (PDOException $e) {
    die("Chyba při vkládání dat do databáze: " . $e->getMessage());
}
header("Location: index.html");
exit;

// připojení k databázi a zpracovaní dat napsat do jednoho souboru pro lepší přehled 