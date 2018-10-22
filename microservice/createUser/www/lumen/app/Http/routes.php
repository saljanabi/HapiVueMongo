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
$app->post('/' ,function (\Illuminate\Http\Request $request) use ($app) {
		if ($request->input("auth") != "3c3448-ebbfa1-682df7-a993f2-f6763b")
		{
		return response()->json("failed auth");
		}
		else
		{
			$username = $request->input("user");
			$nom = $request->input("nom");
			$pnom = $request->input("pnom");
			$role = $request->input("role");
			$password = $request->input("pass");
				$dbh = new PDO('mysql:host=192.168.110.133;dbname=police',"root","example");
				$sth = "insert into users (nom,pnom,username,role,password,actif) values ('$nom','$pnom','$username','$role',sha2('$password', 512 ),false)";
				$ste = $dbh->prepare($sth);
				if ($ste->execute())
				{
					return response()->json("Success");
				}
				else
				{
					return response()->json("Echec");
				}
		}
});
