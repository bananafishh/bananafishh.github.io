<?php

global $Helper;

/**
 * Created by PhpStorm.
 * User: iksanov
 * Date: 11.05.17
 * Time: 20:21
 */
class GardiumLandingHelperM2017
{
	public $clientIp;
	public $clientRegion;
	public $mailTo = 'romanova@wiseadvice.ru';
	
	function __construct()
	{
		if ( ! session_id() ) @ session_start();
		$this->clientIp = $this->getIp();
		$this->clientRegion = $this->getRegion();
	}
	
	function getIp() {
		$ip = FALSE;
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		}
		elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		}
		else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}
	
	function getRegion() {
		
		$regionCode = 'other';
		
		if (!empty($_SESSION['clientRegion']))
			$regionCode = $_SESSION['clientRegion'];
		else {
			try {
				$link = 'ipgeobase.ru:7020/geo?ip=' . $this->clientIp;
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $link);
				curl_setopt($ch, CURLOPT_HEADER, false);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_TIMEOUT, 3);
				curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
				$string = curl_exec($ch);
				curl_close($ch);
				$string = iconv('windows-1251', 'utf-8', $string);
				$params = array('inetnum', 'country', 'city', 'region', 'district', 'lat', 'lng');
				$data = $out = array();
				foreach ($params as $param) {
					if (preg_match('#<' . $param . '>(.*)</' . $param . '>#is', $string, $out)) {
						$data[$param] = trim($out[1]);
					}
				}
				if(!empty($data['region'])) {
					if($data['region'] == 'Москва')
						$_SESSION['clientRegion'] = 'msk';
					else
						$_SESSION['clientRegion'] = 'other';
				} else
					$_SESSION['clientRegion'] = 'other';
			} catch (Exception $e) {
				$_SESSION['clientRegion'] = 'other';
			}
			$regionCode = $_SESSION['clientRegion'];
		}
		
		return $regionCode;
	}
	
	function isXmlHttpRequest()
	{
		return @$_SERVER['HTTP_X_REQUESTED_WITH'] && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}
	
	function ajaxAction($action)
	{
		if (method_exists($this, $action))
		{
			return $this->$action();
		} else
			return false;
	}
	
	function callback()
	{
		//var_dump($_POST['json']);
		$zatoResponse = $this->send2ZATO($_POST['json']);
		if(!empty($_POST['phone'])) {
			$message = 'Новый заказ звонка на лендинге:'."<br>".'Телефон: '.$_POST['phone']."<br>";
			if(!empty($_POST['name']))
				$message .= 'Имя: '.$_POST['name']."<br>";
			$message .= 'Удобное время звонка: '.$_POST['time']."<br>";
			$message .= 'Данные в ZATO: '.$_POST['json']."<br>";
			$message .= 'Ответ ZATO: '.$zatoResponse."<br>";
			return $this->mail(
				$this->mailTo,
				'Пользователь заказал звонок (лендинг)',
				$message
			);
		} else
			return false;
	}
	
	function subscribe()
	{
		if(!empty($_POST['email'])) {
			return $this->mail(
				$this->mailTo,
				'Пользователь подписался на рассылку (лендинг)',
				'Новая подписка на информационную рассылку  на лендинге :'."<br>".'Email: '.$_POST['email']
			);
		} else
			return false;
	}
	
	function send2ZATO($in_data)
	{
		$string = '';
		$in_json_str = html_entity_decode($in_data);
		$in_json_str = str_replace('\n', ' ', $in_json_str);
		$in_json_str = str_replace("\n", ' ', $in_json_str);
		$search_txt = '/=jdbo=(.*)\s=jdbc=/';
		preg_match($search_txt, trim($in_json_str), $out);
		if (is_array($out)) {
			$trim_str = trim($out[1]);
			if (strlen($trim_str) > 10) {
				$trim_str = str_replace('&quot;', '"', $trim_str);
				$link = 'api.wiseadvice.ru/erp/v1/pushordertoerp';
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $link);
				curl_setopt($ch, CURLOPT_HEADER, FALSE);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $trim_str);
				curl_setopt($ch, CURLOPT_TIMEOUT, 10);
				curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
				$string = curl_exec($ch);
				curl_close($ch);
			}
		}
		return $string;
	}
	
	function mail($to, $subject, $message, $additional_headers){
		
		require_once __DIR__ . '/PHPMailer/PHPMailerAutoload.php';
		$mail = new PHPMailer;
		$mail->isSMTP();
		$mail->CharSet  = 'UTF-8';
		$mail->setLanguage('ru');
		$mail->Host = 'mx.intelis.ru';
		$mail->SMTPAuth = true;
		$mail->Username = 'robot_ls@intelis.loc';
		$mail->Password = 'Ne28cfJe3';
		$mail->SMTPSecure = '';
		$mail->Port = 25;
		$mail->From = 'robot@legal-support.ru';
		$mail->FromName = 'ФПБ «Гардиум» (sale-лендинг)';
		
		$to = preg_replace('/\s+/', '', $to);
		$to = explode(',', $to);
		foreach ($to as $torecipient) {
			$mail->addAddress($torecipient);
		}
		
		$mail->isHTML(true);
		$mail->Subject = $subject;
		$mail->Body = $message;
		$mail->SMTPAutoTLS = false;
		
		//$mail->SMTPDebug = 0;
		
		if(!$mail->send()) {
			//echo 'Message could not be sent.';
			//echo 'Mailer Error: ' . $mail->ErrorInfo;
			return false;
		} else {
			//echo 'Message has been sent';
			return true;
		}
		
	}
}

$Helper = new GardiumLandingHelperM2017();