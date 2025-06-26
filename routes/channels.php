<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
// Broadcast::channel('App.Models.Service.Service', function ($user) {
//     return $user->isAdmin();
// });
Broadcast::channel('admin-services', function ($user) {
    return $user;
});
