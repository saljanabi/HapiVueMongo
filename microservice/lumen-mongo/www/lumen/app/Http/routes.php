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
$truc = $request->input("category");
$mongo = new MongoDB\Driver\Manager("mongodb://192.168.110.133:27017",['db' => 'CID']);
$stats = new MongoDB\Driver\Query([]);
$rows = $mongo->executeQuery("CID.HapiVueMongo", $stats);
$res = [];
foreach ($rows as $row) {
array_push($res, $row->$truc);
    }
	
return response()->json($res);
});
