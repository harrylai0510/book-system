<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $table = 'Books';

    protected $primaryKey = 'id';

    protected $fillable = [
        'bookName'
    ];

    protected $hidden = [];

    public function history(): HasMany
    {
        return $this->hasMany(History::class, 'bookId', 'id');
    }
}
