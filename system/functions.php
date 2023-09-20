<?php
/* Функция отфильтровки чисел */
function int($int) {
	return abs((int)$int);
}

/* Функция защиты от нежелательных действий */
function protect($text) {
	return trim(mysql_real_escape_string(htmlspecialchars($text, ENT_QUOTES, 'utf-8')));
}

/* Функция отображения времени */
function clock($time) {
	$timep= date("j M Y в H:i", $time);
	$time_p[0]=date("j n Y", $time);
	$time_p[1]=date("H:i", $time);
	if ($time_p[0]==date("j n Y", time()))$timep='Сегодня в '.$time_p['1'];
	if ($time_p[0]==date("j n Y", time()-86400))$timep='Вчера в '.$time_p['1'];
	$months_eng = array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	$months_rus = array('Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря');
	$timep = str_replace($months_eng,$months_rus,$timep);
	return $timep;
}
function datediff($date1, $date2)
{
	$diff = $date2 - $date1;
	$d=floor($diff/3600/24);
	$h=floor($diff/3600)%24;
	$m=floor(($diff%3600)/60);
	$s=($diff%3600)%60;

	if($d>0) {
		return $d.' д. '.$h.' ч. '.$m.' мин.';
	} elseif ($h>0) {
		return $h.' ч. '.$m.' мин.';
	} else
		return $m.' мин. '.$s.' сек.';
	
	
}

function head() {
	require './style/head.php';
}

# Низ
function foot() {
	require './style/foot.php';
}
?>