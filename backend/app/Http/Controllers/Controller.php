<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function index()
    {

        return Order::with('product')->latest()->get();

    }

    public function store(Request $request)
    {

        $data=$request->validate([

            'product_id'=>'required|exists:products,id',

            'quantity'=>'required|integer|min:1'

        ]);

        $product=Product::findOrFail($data['product_id']);

        $order=Order::create([

            'product_id'=>$product->id,

            'quantity'=>$data['quantity'],

            'total'=>$product->price*$data['quantity']

        ]);

        return response()->json($order);

    }

}
