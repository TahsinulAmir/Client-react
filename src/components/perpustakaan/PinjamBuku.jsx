import { Link } from 'react-router-dom'
import axios from "axios";
import React, { useState, useEffect } from "react";

const PinjamBuku = () => {
    const [peminjam, setPeminjam] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hapus Data
    const deleteData = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/pengajuan/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
        setPeminjam(peminjam.filter((dataPeminjam) => dataPeminjam.id !== id));
    };

    const getPeminjam = async () => {
        setLoading(true);
        // Using Axios
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/pengajuan')
            console.log(response.data);
            setPeminjam(response.data);
        } catch (error) {
            console.log(error.message);
        };
        setLoading(false);
    };

    useEffect(() => {
        getPeminjam();
    }, []);

    return (
        <div className='m-3'>
            <div className="card shadow">
                <div className="card-header">
                    <h2 className="title is-2 text-center">Status Pengajuan</h2>
                </div>
                {!loading ? (
                    <div className="card-body">
                        <table className="table align-middle text-center">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nim</th>
                                    <th>Nama</th>
                                    <th>Prodi</th>
                                    <th>No Hp</th>
                                    <th>Angkatan</th>
                                    <th>Buku Dipinjam</th>
                                    <th>Tanggal Pinjam</th>
                                    <th>Tanggal Kembali</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peminjam.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <th>{index + 1}</th>
                                            <td>{item.nim_mhs}</td>
                                            <td>{item.nama_mhs}</td>
                                            <td>{item.prodi}</td>
                                            <td>{item.no_hp}</td>
                                            <td>{item.angkatan}</td>
                                            <td>{item.buku_dipinjam}</td>
                                            <td>{item.tgl_pinjam}</td>
                                            <td>{item.tgl_kembali}</td>
                                            <td>
                                                <div class="d-grid gap-2 d-md-flex justify-content-center">
                                                    <Link to={`/pinjam-buku/${item.id}`} className="btn btn-primary">Edit</Link>
                                                    <button type="button" onClick={() => deleteData(item.id)} className="btn btn-danger">Batal</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                ) : (
                    <div className="d-flex justify-content-center m-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}
export default PinjamBuku