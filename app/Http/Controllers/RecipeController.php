<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $ingredients = $request->i;
        $ingredientsArray = array_map('trim', explode(',', $ingredients));

        if (count($ingredientsArray) > 3) {
            return 'Ingredientes de mais';
        }
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', env('RECIPEPUPPY_URL') . '?i=' . $ingredients);

        $recipes = json_decode($res->getBody(), true);
        return response()->json([
            'keywords' => explode(',', $ingredients),
            'recipes' => array_map(function ($recipe) use ($client) {
                $newRecipe = [];
                $newRecipe['title'] = $recipe['title'];
                $newRecipe['ingredients'] = array_map('trim', explode(',', $recipe['ingredients']));
                $newRecipe['link'] = $recipe['href'];
                $resGif = $client->request('GET', 'https://api.giphy.com/v1/gifs/search?api_key=83B453UHWtOcJMdTWKEgIcn8Vwv1QA9k&q=' . $newRecipe['title'] . '&limit=25&offset=0&rating=g&lang=en');
                $gifs = json_decode($resGif->getBody(), true);
                $newRecipe['gif'] = $gifs['data'][0]['images']['original']['url'];
                return $newRecipe;
            }, $recipes['results'])
        ]);
    }
}
