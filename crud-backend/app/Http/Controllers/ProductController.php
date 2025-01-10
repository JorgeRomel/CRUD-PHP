<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        try {
            Log::info('Fetching all products');
            $products = Product::all();
            return response()->json($products, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching products: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch products'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            Log::info('Creating new product', $request->all());
            
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0'
            ]);

            $product = Product::create($validated);
            Log::info('Product created successfully', ['product_id' => $product->id]);
            
            return response()->json($product, 201);
        } catch (\Exception $e) {
            Log::error('Error creating product: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create product'], 500);
        }
    }

    public function show(Product $product)
    {
        try {
            Log::info('Fetching product', ['product_id' => $product->id]);
            return response()->json($product, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching product: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch product'], 500);
        }
    }

    public function update(Request $request, Product $product)
    {
        try {
            Log::info('Updating product', ['product_id' => $product->id, 'data' => $request->all()]);
            
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'price' => 'sometimes|required|numeric|min:0',
                'stock' => 'sometimes|required|integer|min:0'
            ]);

            $product->update($validated);
            Log::info('Product updated successfully', ['product_id' => $product->id]);
            
            return response()->json($product, 200);
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update product'], 500);
        }
    }

    public function destroy(Product $product)
    {
        try {
            Log::info('Deleting product', ['product_id' => $product->id]);
            $product->delete();
            Log::info('Product deleted successfully', ['product_id' => $product->id]);
            
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete product'], 500);
        }
    }
}