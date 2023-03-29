import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailBuku = () => {
    const [detailbuku, setDetailBuku] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const loadDetail = async () => {
            setLoading(true);
            try {
                await fetch("http://127.0.0.1:8000/api/buku/" + id)
                    .then((response) => response.json())
                    .then((json) => {
                        setDetailBuku(json[0]);
                        console.log(json);
                    });
                // const data = await response.json()
                // setDetailBuku(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        loadDetail();
    }, [id]);

    return (
        <>
            <div className="container mt-3">
                {!loading ? (
                    <div className="card shadow mb-3">
                        <div class="card text-center">
                            <div class="card-header">
                                <h3>{detailbuku?.judul}</h3>
                            </div>
                            <div className=" justify-content-start">
                                <div class="card-body d-flex">
                                    <div className="col-md-3">
                                        <img src={detailbuku?.gambar} alt="" srcSet="" className="img-fluid rounded shadow" />
                                    </div>
                                    <table class="table table-bordered text-start">
                                        <tbody>
                                            <tr>
                                                <td colSpan={2}>No Rak</td>
                                                <td colSpan={3}>: {detailbuku?.sinopsis}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>No Rak</td>
                                                <td>: {detailbuku?.sinopsis}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row g-0">
                            <div className="col-md-4">
                                <img src={detailbuku?.gambar} alt="" srcSet="" className="img-fluid rounded-start"  />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div> */}

                        {/* <h1>{detailbuku?.judul}</h1>
                        <h1>{detailbuku?.penulis}</h1>
                        <h1>{detailbuku?.thn_terbit}</h1>
                        <img src={detailbuku?.gambar} alt="" srcSet="" />
                        <h1>{detailbuku?.penerbit}</h1>
                        <h1>{detailbuku?.jml_halaman}</h1> */}
                    </div>
                ) : (
                    <div class="d-flex justify-content-center m-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DetailBuku