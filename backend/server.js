const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// --- ENDPOINT API FITTRACKER ---

// 1. Mengambil data semua Users (Tanpa poin/badges sesuai revisi)
app.get('/api/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. Menambah data User baru (POST)
app.post('/api/users', (req, res) => {
    // Menangkap data yang dikirim dari Postman/Aplikasi
    const { nama_lengkap, email } = req.body;

    // Jika ada data yang kosong, tolak dan kirim pesan error
    if (!nama_lengkap || !email) {
        return res.status(400).json({ pesan: 'Nama lengkap dan email wajib diisi!' });
    }

    // Memasukkan data ke database MySQL
    const sql = "INSERT INTO users (nama_lengkap, email) VALUES (?, ?)";
    db.query(sql, [nama_lengkap, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Jika sukses, kirim balasan beserta ID barunya
        res.status(201).json({ 
            pesan: 'User berhasil ditambahkan!',
            id_user: result.insertId,
            nama_lengkap,
            email
        });
    });
});


// --- API UNTUK EXERCISES (KATALOG OLAHRAGA) ---

// 3. Mengambil semua data olahraga (GET)
app.get('/api/exercises', (req, res) => {
    const sql = "SELECT * FROM exercises";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 4. Menambah data olahraga baru (POST)
app.post('/api/exercises', (req, res) => {
    // Menangkap data dari Postman/Figma
    const { nama_gerakan, kategori, url_video } = req.body;

    // Validasi input
    if (!nama_gerakan || !kategori) {
        return res.status(400).json({ pesan: 'Nama gerakan dan kategori wajib diisi!' });
    }

    // Memasukkan data ke tabel exercises
    const sql = "INSERT INTO exercises (nama_gerakan, kategori, url_video) VALUES (?, ?, ?)";
    db.query(sql, [nama_gerakan, kategori, url_video || null], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            pesan: 'Gerakan olahraga berhasil ditambahkan!',
            id_exercise: result.insertId,
            nama_gerakan,
            kategori
        });
    });
});


// --- API UNTUK WORKOUT PLANS (RENCANA LATIHAN) ---

// 5. Mengambil semua jadwal latihan (GET)
app.get('/api/workout_plans', (req, res) => {
    const sql = "SELECT * FROM workout_plans";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 6. Membuat jadwal latihan baru (POST)
app.post('/api/workout_plans', (req, res) => {
    // Menangkap id_user dan tanggal rencana latihan
    const { id_user, tanggal } = req.body;

    // Validasi input
    if (!id_user || !tanggal) {
        return res.status(400).json({ pesan: 'ID User dan Tanggal wajib diisi!' });
    }

    // Memasukkan jadwal baru ke database
    const sql = "INSERT INTO workout_plans (id_user, tanggal) VALUES (?, ?)";
    db.query(sql, [id_user, tanggal], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            pesan: 'Rencana latihan berhasil dibuat!',
            id_plan: result.insertId,
            id_user,
            tanggal
        });
    });
});


// --- API UNTUK PLAN EXERCISES (MEMASUKKAN GERAKAN KE JADWAL) ---

// 7. Mengambil daftar detail rencana latihan (GET)
app.get('/api/plan_exercises', (req, res) => {
    const sql = "SELECT * FROM plan_exercises";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 8. Menambahkan gerakan ke dalam rencana latihan (POST)
app.post('/api/plan_exercises', (req, res) => {
    // Menangkap id_plan (jadwal) dan id_exercise (gerakan)
    const { id_plan, id_exercise } = req.body;

    // Validasi input
    if (!id_plan || !id_exercise) {
        return res.status(400).json({ pesan: 'ID Plan dan ID Exercise wajib diisi!' });
    }

    // Memasukkan data ke tabel perantara
    const sql = "INSERT INTO plan_exercises (id_plan, id_exercise) VALUES (?, ?)";
    db.query(sql, [id_plan, id_exercise], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            pesan: 'Gerakan berhasil ditambahkan ke rencana latihan!',
            id_plan_exercise: result.insertId,
            id_plan,
            id_exercise
        });
    });
});


// --- API UNTUK WORKOUT LOGS (CATATAN LATIHAN AKTUAL) ---

// 9. Mengambil semua riwayat catatan latihan (GET)
app.get('/api/workout_logs', (req, res) => {
    const sql = "SELECT * FROM workout_logs";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 10. Menambahkan catatan riwayat latihan baru (POST)
app.post('/api/workout_logs', (req, res) => {
    // Menangkap id_plan, id_exercise, jumlah_set, dan reps
    const { id_plan, id_exercise, jumlah_set, reps } = req.body;

    // Validasi input
    if (!id_plan || !id_exercise || !jumlah_set || !reps) {
        return res.status(400).json({ pesan: 'Semua kolom (id_plan, id_exercise, jumlah_set, reps) wajib diisi!' });
    }

    // Memasukkan catatan latihan ke database
    const sql = "INSERT INTO workout_logs (id_plan, id_exercise, jumlah_set, reps) VALUES (?, ?, ?, ?)";
    db.query(sql, [id_plan, id_exercise, jumlah_set, reps], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            pesan: 'Catatan latihan berhasil disimpan!',
            id_log: result.insertId,
            id_plan,
            id_exercise,
            jumlah_set,
            reps
        });
    });
});


// --- API UNTUK GROUPS (KOMUNITAS) ---

// 11. Mengambil semua data grup (GET)
app.get('/api/groups', (req, res) => {
    const sql = "SELECT * FROM groups";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 12. Membuat grup komunitas baru (POST)
app.post('/api/groups', (req, res) => {
    const { nama_group, deskripsi, tanggal_dibuat } = req.body;

    if (!nama_group || !tanggal_dibuat) {
        return res.status(400).json({ pesan: 'Nama group dan tanggal dibuat wajib diisi!' });
    }

    const sql = "INSERT INTO groups (nama_group, deskripsi, tanggal_dibuat) VALUES (?, ?, ?)";
    db.query(sql, [nama_group, deskripsi || null, tanggal_dibuat], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            pesan: 'Grup berhasil dibuat!',
            id_group: result.insertId,
            nama_group,
            tanggal_dibuat
        });
    });
});


// --- API UNTUK GROUP MEMBERS (ANGGOTA GRUP) ---

// 13. Mengambil daftar anggota grup (GET)
app.get('/api/group_members', (req, res) => {
    const sql = "SELECT * FROM group_members";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 14. Menambahkan pengguna ke dalam grup (POST)
app.post('/api/group_members', (req, res) => {
    const { id_group, id_user, peran } = req.body;

    if (!id_group || !id_user || !peran) {
        return res.status(400).json({ pesan: 'ID Group, ID User, dan Peran wajib diisi!' });
    }

    const sql = "INSERT INTO group_members (id_group, id_user, peran) VALUES (?, ?, ?)";
    db.query(sql, [id_group, id_user, peran], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            pesan: 'Anggota berhasil ditambahkan ke grup!',
            id_member: result.insertId,
            id_group,
            id_user,
            peran
        });
    });
});


// Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`);
});