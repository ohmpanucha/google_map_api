<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp;
use GuzzleHttp\Exception\RequestException;

class GoogleMapController extends Controller
{
    private $client;

    // send token to frontend
    public function getTokenCSRF()
    {
        $token = csrf_token();
        return response()->json(["token" => $token]);
    }

}
