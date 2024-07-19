<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class History extends Model
{
    use HasFactory;

    protected $table = 'Histories';

    protected $primaryKey = 'id';

    protected $fillable = [
        'userId',
        'bookId'
    ];

    protected $hidden = [];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'id');
    }

    public function book(): BelongsTo {
        return $this->belongsTo(Book::class, 'id');
    }
}
