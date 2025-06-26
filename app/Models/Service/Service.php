<?php

namespace App\Models\Service;

use App\Models\Vendor;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    /** @use HasFactory<\Database\Factories\Service\ServiceFactory> */
    use HasFactory;


    protected $with = ['content'];
    protected $fillable = [
        'service_content_id',
        'category_id'
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id');
    }

    public function content(): BelongsTo
    {
        return $this->belongsTo(ServiceContent::class, 'service_content_id');
    }
    public function lastContent()
    {
        return  $this->hasMany(ServiceContent::class)->latest()->limit(1);
    }

    public function contentHistory(): HasMany
    {
        return  $this->hasMany(ServiceContent::class);
    }

    public function deActivate(): void
    {
        $this->is_active = false;
        $this->save();
    }
    #[Scope]
    public function search(Builder $query, $search): Builder
    {
        return $query->whereLike('name', '%' . $search . '%');
    }


    public function activateService(): void
    {
        $this->service_content_id = $this->contentHistory()->first()->id;

        $this->save();
    }
    // public function broadcastOn(string $event): array
    // {
    //     return [
    //         new PresenceChannel('services')
    //     ];
    // }
    // public function broadcastAs(string $event): string|null
    // {
    //     return match ($event) {
    //         'created' => 'service.created',
    //         default => null,
    //     };
    // }
}
