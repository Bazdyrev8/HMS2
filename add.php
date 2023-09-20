<?php
require_once 'system/core.php'; // стартуем ядро двигателя
require_once 'system/functions.php'; // стартуем функции
$key = protect($_GET['k']);
if ($key != 'HMS~pub17fra17') { // Специальный код, например asREb25C
	exit;
}
$pulse = protect($_GET['pulse']);

$total = mysql_result(mysql_query("SELECT count(*) FROM `statistics`"),0);
if ($total > 15) {
	mysql_query("DELETE FROM `statistics` ORDER BY `id` ASC LIMIT 1");
}

if ($temp !='') {
	mysql_query("INSERT INTO `statistics` (pulse, time) values ('".$pulse."','".time()."') ");
}
echo 'Ок';
?>
