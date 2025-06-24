<?php

namespace App\Enums;

use Illuminate\Validation\Rules\Enum;

enum UserType
{
    case Admin;
    case Customer;
    case Vendor;
}
