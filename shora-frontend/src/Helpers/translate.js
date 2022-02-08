const dictionary = {
    'en': {
        'owner': 'مالک',
        'admin': 'مدیر',
        'user': 'کاربر',
        'financial': 'امور مالی',
        'welfare': 'امور رفاهی',
        'locker': 'کمد',
        'book': 'کتاب',
        'withdraw': 'برداشت',
        'deposit': 'واریز',
        'rejected': 'رد شده',
        'pending': 'در حال بررسی',
        'accepted': 'تایید شده',
        'users': 'کاربران',
        'rents': 'کرایه‌ها',
        'lockers': 'کمدها',
        'transactions': 'تراکنش‌ها',
        'lost-and-found': 'اشیای پیدا شده',
        'events': 'رویدادها',
        'demands': 'درخواست‌ها',
    }
}

const translate = (word, src = 'en') => {
    return dictionary[src][word] ? dictionary[src][word] : word;
}

export default translate;