<?php

/*
   |--------------------------------------------------------------------------
   | Application Routes
   |--------------------------------------------------------------------------
   |
   | Here is where you can register all of the routes for an application.
   | It is a breeze. Simply tell Lumen the URIs it should respond to
   | and give it the Closure to call when that URI is requested.
   |
 */
$app->get('/' ,function (\Illuminate\Http\Request $request) use ($app) {
		$filename = "users.csv";
		$f = fopen('php://memory' , 'w');
		$dbh = new PDO('mysql:host=192.168.0.11;dbname=police',"root","example");
		$sth = 'select concat(id,";",username,";",nom,";",pnom,";",role) utilisateur from users';
		$ste = $dbh->prepare($sth);
		$ste->execute();
		fputcsv($f,["id;username;nom;pnom;role"]);
		while ($row = $ste->fetch())
		{
		fputcsv($f,[$row[0]]);
		}
		fseek($f, 0);
		header('Content-Disposition: attachment; filename='.$filename.';');
		fpassthru($f);
	}
);
