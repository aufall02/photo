# Assignment 3

Buat applikasi photo album dimana applikasinya sama seperti pada repository photo album
**NB:** **Code applikasi harus kalian ketik sendiri, bukan hasil clone lalu kalian modifikasi.**

Kemudian buat integration testing untuk applikasi Photo Album, API yang perlu ditest:

1. API create photo
    - Response sukses
    - Response error karena tidak menyertakan authentikasi
2. API get all photos
    - Response sukses
    - Response error karena tidak menyertakan authentikasi
3. API get photo by ID
    - Response sukses
    - Response error data not found

Dalam membuat test, harus menyertakan function beforeAll dan afterAll, semisal untuk test API create photo, harus membuat function beforeAll yang isinya create user lalu generate token, kemudian setelah selesai memanggil function afterAll yang isinya destroy semua photo dan destroy user. Begitu juga untuk test API get all photos dan get photo by ID.

Pengumpulan assigment

1. Silahkan push code kalian ke akun github kalian
2. Copy link repository ke dalam sebuah document
3. Upload document tersebut ke google classroom
4. Batas pengumpulan tanggal **22 Oktober 2023, jam 23:59**