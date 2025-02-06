## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/ClifftonS/preregis-ktp.git
cd preregis-ktp

# Install dependencies
npm install
composer install

#Create 2 different terminal

# Frontend (Terminal 1)
npm run dev

# Backend (Terminal 2)
cp .env.example .env
php artisan key:generate
php artisan serve
```

