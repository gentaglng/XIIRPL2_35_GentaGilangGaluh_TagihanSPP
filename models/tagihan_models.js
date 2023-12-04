const mongoose = require('mongoose');

const TagihanSchema = new mongoose.Schema({
    nis: {
        type: String,
        required: [true, 'Isi NIS!'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Isi email!'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Isi email yang sesuai!'],
    },
    nama: {
        type: String,
        required: [true, 'Isi nama!'],
        unique: false,
    },
    tagihan: {
        type: String,
        default: 'belum ada data'
    },
    nominal_tagihan: {
        type: String,
        default: 'belum ada data'
    },
    deposit: {
        type: String,
        default: 'belum ada data'
    },
    status: {
        type: String,
        default: 'belum ada data'
    },
});

module.exports = mongoose.model('tagihan_spp', TagihanSchema);