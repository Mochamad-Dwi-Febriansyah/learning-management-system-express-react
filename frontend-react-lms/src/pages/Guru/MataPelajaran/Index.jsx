import ManageLayout from "../../../components/layouts/ManageLayout"
import PdfImg from "../../../assets/img/pdf-24.png";
import AssigmentImg from "../../../assets/img/Assignment.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik"
import { useFetchPostingan } from "../../../features/Guru/Postingan/useFetchPostingan.js";
import { useDeletePostingan } from "../../../features/Guru/Postingan/useDeletePostingan.js";
import { useCreatePostingan } from "../../../features/Guru/Postingan/useCreatePostingan.js";
import { useEditPostingan } from "../../../features/Guru/Postingan/useEditPostingan.js";
import * as yup from "yup"
import Cookies from "js-cookie";
import { useDeleteTugas } from "../../../features/Guru/Tugas/useDeleteTugas.js";

import { useCreateMateri } from "../../../features/Guru/Materi/useCreateMateri.js";
import { useEditMateri } from "../../../features/Guru/Materi/useEditMateri.js";
import { useDeleteMateri } from "../../../features/Guru/Materi/useDeleteMateri.js";
import { downloadMateri } from "../../../features/Guru/Materi/downloadMateri.js";
import { fetchFileFromServer } from "../../../features/Guru/Materi/fetchFileFromServer.js";
import { useCreateTugas } from "../../../features/Guru/Tugas/useCreateTugas.js";
import { useEditTugas } from "../../../features/Guru/Tugas/useEditTugas.js";
import { fetchFileFromServerTugas } from "../../../features/Guru/Tugas/fetchFileFromServerTugas.js";

// import { useParams } from "react-router-dom";


const GMataPelajaran = () => {
    // const { mata_pelajaran_id } = useParams() 

    const [show, setShow] = useState(false);
    const [showTugas, setShowTugas] = useState(false);
    const [showMateri, setShowMateri] = useState(false);
    const [title, setTitle] = useState("");
    const [postinganId, setPostinganId] = useState(0);
    const navigate = useNavigate()

    const handleClose = () => {
        formik.resetForm()
        setShow(false)
        setShowTugas(false)
        setShowMateri(false)
        setOpenDropdownId(null)
    };
    const handleShow = (tipe, postingan = null) => {
        if (tipe.tipe == 'edit') {
            setTitle('Edit Postingan')
            setShow(true);
        } else if (tipe.tipe == 'add') {
            setTitle('Add Postingan')
            setShow(true);
        } else if (tipe.tipe == 'addMateri') {
            setTitle('Add Materi')
            setShowMateri(true);
            setPostinganId(postingan.id)
        } else if (tipe.tipe == 'editMateri') {
            setTitle('Edit Materi')
            setShowMateri(true);
        } else if (tipe.tipe == 'addTugas') {
            setTitle('Add Tugas')
            setShowTugas(true);
            setPostinganId(postingan.id)
        } else if (tipe.tipe == 'editTugas') {
            setTitle('Edit Tugas')
            setShowTugas(true);
        }

    }
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    const [backendErrors, setBackendErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            id: "",
            kelas_id: "",
            mata_pelajaran_id: "",
            guru_id: "",
            nama: "",
            is_active: "",
            is_delete: "",
        },
        onSubmit: () => {
            const kd = sessionStorage.getItem("kelas_data")
            const kelas_data = JSON.parse(kd);
            const gid = Cookies.get('id')

            const guru_id = gid
            const kelas_id = kelas_data.kelas_id
            const mata_pelajaran_id = kelas_data.mata_pelajaran_id
            const { id, nama, is_active, is_delete } = formik.values

            const postinganData = {
                id,
                kelas_id: parseInt(kelas_id),
                mata_pelajaran_id: parseInt(mata_pelajaran_id),
                guru_id: parseInt(guru_id),
                nama,
                is_active: is_active === "true",
                is_delete: is_delete === "true",
            }
            if (id) {
                editPostingan(postinganData)
            } else {
                createPostingan(postinganData)
            }
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required(),
            is_active: yup.string().required(),
            is_delete: yup.string().required(),
        })
    })

    const handleFormInput = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)

    }

    const { mutate: createPostingan, isLoading: createPostinganIsLoading } = useCreatePostingan({
        onError: (error) => {
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        },
        onSuccess: () => {
            setBackendErrors({})
            refetchPostingan()
            handleClose()
            setOpenDropdownId(null)
        }
    })
    const { mutate: deletePostingan } = useDeletePostingan({
        onSuccess: () => {
            refetchPostingan()
            setOpenDropdownId(null)
        }
    })
    const { mutate: editPostingan, isLoading: editPostinganIsLoading } = useEditPostingan({
        onError: (error) => {
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        },
        onSuccess: () => {
            setBackendErrors({})
            refetchPostingan()
            handleClose()
            setOpenDropdownId(null)
        }
    })

    const { data: dataPostingan, isLoading: postinganIsLoading, refetch: refetchPostingan } = useFetchPostingan()

    const confirmationDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if (shouldDelete) {
            deletePostingan(id)
        }
    }


    const onEditClick = (postingan) => {
        formik.setFieldValue("id", postingan.id)
        formik.setFieldValue("kelas_id", postingan.kelas_id)
        formik.setFieldValue("mata_pelajaran_id", postingan.mata_pelajaran_id)
        formik.setFieldValue("guru_id", postingan.guru_id)
        formik.setFieldValue("nama", postingan.nama)
        formik.setFieldValue("is_active", postingan.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", postingan.is_delete ? "true" : "false");

        handleShow({ tipe: 'edit' });
    }


    //materi 
    const { mutate: deleteMateri } = useDeleteMateri({
        onSuccess: () => {
            refetchPostingan()
        }
    })

    const { mutate: createMateri, isLoading: createMateriIsLoading } = useCreateMateri({
        onError: (error) => {
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        },
        onSuccess: () => {
            setBackendErrors({})
            refetchPostingan()
            handleClose()
            setOpenDropdownId(null)
        }
    })

    const { mutate: editMateri, isLoading: editMateriIsLoading } = useEditMateri({
        onError: (error) => {
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        },
        onSuccess: () => {
            setBackendErrors({})
            refetchPostingan()
            handleClose()
            setOpenDropdownId(null)
        }
    })

    const formikMateri = useFormik({
        initialValues: {
            id: "",
            kelas_id: "",
            mata_pelajaran_id: "",
            postingan_id: "",
            judul_materi: "",
            dokumen_materi: "",
            deskripsi_materi: "",
            is_active: "",
            is_delete: "",
        },
        onSubmit: () => {

            // console.log(postinganId)
            const kd = sessionStorage.getItem("kelas_data")
            const kelas_data = JSON.parse(kd);

            const kelas_id = kelas_data.kelas_id
            const mata_pelajaran_id = kelas_data.mata_pelajaran_id
            const postinganid = postinganId

            const { id, judul_materi, postingan_id, dokumen_materi, deskripsi_materi, is_active, is_delete } = formikMateri.values

            if (id) {
                // console.log(formikMateri.values.postingan_id)
                editMateri({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    postingan_id,
                    judul_materi,
                    dokumen_materi,
                    deskripsi_materi,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else {
                createMateri({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    postingan_id: postinganid,
                    judul_materi,
                    dokumen_materi,
                    deskripsi_materi,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
        },
        validationSchema: yup.object().shape({
            judul_materi: yup.string().required(),
            deskripsi_materi: yup.string().required(),
            is_active: yup.string().required(),
            is_delete: yup.string().required(),
        })
    })
    const handleFormInputMateri = (event) => {
        const { name, type, files, value } = event.target;
        if (type === "file") {
            formikMateri.setFieldValue(name, files[0]);
        } else {
            formikMateri.setFieldValue(name, value);
        }
    };
    const handleDownloadFile = (fileUrl) => {
        downloadMateri({ fileUrl });
    };
    const confirmationMateriDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if (shouldDelete) {
            deleteMateri(id)
        }
    }

    const onEditMateriClick = async (materi) => {
        formikMateri.setFieldValue("id", materi.id)
        formikMateri.setFieldValue("kelas_id", materi.kelas_id)
        formikMateri.setFieldValue("mata_pelajaran_id", materi.mata_pelajaran_id)
        formikMateri.setFieldValue("postingan_id", materi.postingan_id)
        formikMateri.setFieldValue("judul_materi", materi.judul_materi)
        formikMateri.setFieldValue("deskripsi_materi", materi.deskripsi_materi)
        formikMateri.setFieldValue("is_active", materi.is_active ? "true" : "false");
        formikMateri.setFieldValue("is_delete", materi.is_delete ? "true" : "false");
        const file = await fetchFileFromServer(materi.dokumen_materi);
        formikMateri.setFieldValue('dokumen_materi', file);

        handleShow({ tipe: 'editMateri' });
    }


    // tugas  

    const { mutate: createTugas, isLoading: createTugasIsLoading } = useCreateTugas({
        onError: (error) => {
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        },
        onSuccess: () => {
            setBackendErrors({})
            refetchPostingan()
            handleClose()
            setOpenDropdownId(null)
        }
    })

    const { mutate: editTugas, isLoading: editTugasIsLoading } = useEditTugas({
        onError: (error) => {
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        },
        onSuccess: () => {
            setBackendErrors({})
            refetchPostingan()
            handleClose()
            setOpenDropdownId(null)
        }
    })

    const { mutate: deleteTugas } = useDeleteTugas({
        onSuccess: () => {
            refetchPostingan()
        }
    })
    const confirmationTugasDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if (shouldDelete) {
            deleteTugas(id)
        }
    }
    const formikTugas = useFormik({
        initialValues: {
            kelas_id: "",
            mata_pelajaran_id: "",
            postingan_id: "",
            judul_tugas: "",
            dokumen_tugas: null,
            deskripsi_tugas: "",
            tugas_tanggal: "",
            pengumpulan_mulai: "",
            pengumpulan_selesai: "",
            is_active: "",
            is_delete: ""
        },
        validationSchema: yup.object().shape({
            judul_tugas: yup.string().required(),
            dokumen_tugas: yup.mixed().required(),
            deskripsi_tugas: yup.string().required(),
            tugas_tanggal: yup.date().required(),
            pengumpulan_mulai: yup.date().required(),
            pengumpulan_selesai: yup.date().required()
        }),
        onSubmit: () => {
            const { id, judul_tugas, dokumen_tugas, deskripsi_tugas, postingan_id, tugas_tanggal, pengumpulan_mulai, pengumpulan_selesai, is_active, is_delete } = formikTugas.values

            const kd = sessionStorage.getItem("kelas_data")
            const kelas_data = JSON.parse(kd);
            const kelas_id = kelas_data.kelas_id
            const mata_pelajaran_id = kelas_data.mata_pelajaran_id
            const postinganid = postinganId

            if (id) {
                editTugas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    postingan_id: parseInt(postingan_id),
                    judul_tugas,
                    dokumen_tugas,
                    deskripsi_tugas,
                    tugas_tanggal,
                    pengumpulan_mulai,
                    pengumpulan_selesai,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else {
                createTugas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    postingan_id: parseInt(postinganid),
                    judul_tugas,
                    dokumen_tugas,
                    deskripsi_tugas,
                    tugas_tanggal,
                    pengumpulan_mulai,
                    pengumpulan_selesai,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
        },
    });

    const handleFormInputTugas = (event) => {
        const { name, type, files, value } = event.target;
        if (type === "file") {
            formikTugas.setFieldValue(name, files[0]);
        } else {
            formikTugas.setFieldValue(name, value);
        }
    };

    const onEditTugasClick = async (tugas) => {
        formikTugas.setFieldValue("id", tugas.id)
        formikTugas.setFieldValue("kelas_id", tugas.kelas_id)
        formikTugas.setFieldValue("mata_pelajaran_id", tugas.mata_pelajaran_id)
        formikTugas.setFieldValue("postingan_id", tugas.postingan_id)
        formikTugas.setFieldValue("judul_tugas", tugas.judul_tugas)
        formikTugas.setFieldValue("deskripsi_tugas", tugas.deskripsi_tugas)
        formikTugas.setFieldValue("tugas_tanggal", tugas.tugas_tanggal)
        formikTugas.setFieldValue("pengumpulan_mulai", tugas.pengumpulan_mulai)
        formikTugas.setFieldValue("pengumpulan_selesai", tugas.pengumpulan_selesai)
        formikTugas.setFieldValue("is_active", tugas.is_active ? "true" : "false");
        formikTugas.setFieldValue("is_delete", tugas.is_delete ? "true" : "false");
        const file = await fetchFileFromServerTugas(tugas.dokumen_tugas);
        formikTugas.setFieldValue('dokumen_tugas', file);

        handleShow({ tipe: 'editTugas' });
    }

    // console.log(dataPostingan?.data)

    const renderPostingan = () => {
        return dataPostingan?.data.data.map((postingan) => {
            return (
                <div className="card mb-4 rounded-xl py-3" key={postingan.id}>
                    <div className="card-header py-2 d-flex align-items-center gap-2">
                        <h6 className="mb-0">{postingan.nama}</h6>
                        <p className="ms-auto text-xs text-secondary mb-0 me-2">{formatDate(postingan.createdAt)}</p>
                        <div className="custom-dropdown">
                            <span onClick={() => toggleDropdown(postingan.id)}>
                                <i className="fa fa-ellipsis-v fs-6" aria-hidden="true"></i>
                            </span>

                            {openDropdownId === postingan.id && (
                                <ul className="dropdown-menus mt-1">
                                    <li className="menu-item" onClick={() => handleShow({ tipe: 'addTugas' }, postingan)}>
                                        <span className="hover-text">Tugas</span>
                                        <i className="fas fa-plus text-dark m-0" aria-hidden="true"></i>
                                    </li>
                                    <li className="menu-item" onClick={() => handleShow({ tipe: 'addMateri' }, postingan)}>
                                        <span className="hover-text">Materi</span>
                                        <i className="fas fa-plus text-dark m-0" aria-hidden="true"></i>
                                    </li>
                                    <li className="menu-item">
                                        <span className="hover-text">Lainnya</span>
                                        <i className="fas fa-plus text-dark m-0" aria-hidden="true"></i>
                                    </li>
                                    <li onClick={() => onEditClick(postingan)}><i className="fas fa-pencil-alt text-dark m-0" aria-hidden="true"></i></li>
                                    <li onClick={() => confirmationDelete(postingan.id)}><i className="fas fa-trash-alt text-dark m-0" aria-hidden="true"></i></li>
                                </ul>
                            )}
                        </div>

                    </div>
                    {(postingan.postinganTugas.length > 0 || postingan.postinganMateri.length > 0) && (
                        <div className="card-body-container">
                            <div className="card-body px-0 pt-0 pb-2">
                                <p className="text-uppercase text-secondary px-4 py-3 mb-0 text-xxs font-weight-bolder opacity-7  border-bottom">
                                    Author
                                </p>
                                {postingan.postinganTugas.length > 0 && (
                                    <>
                                        {postingan.postinganTugas.map((tugas) => (
                                            <div className="d-flex px-4 py-3 border-bottom align-items-center" key={tugas.id}>
                                                {/* <NavLink to={`/g-tugas/${tugas.id}`}> */}
                                                    <div className="d-flex flex-row justify-content-center gap-2">
                                                        <div>
                                                            <img src={AssigmentImg} alt="" />
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0 text-sm">{tugas.judul_tugas}</h6>
                                                            <p className="text-xs text-secondary mb-0">
                                                                {tugas.deskripsi_tugas}
                                                            </p>
                                                        </div>
                                                    </div>
                                                {/* </NavLink> */}

                                                <div className="ms-auto me-4 d-flex flex-row flex-no-wrap gap-1">
                                                    <NavLink to={`/g-tugas/${tugas.id}/manage-pengumpulan`}>
                                                        <button className="btn btn-sm px-2 py-1 mb-0"><i className="fas fa-folder-open text-dark m-0" aria-hidden="true"></i></button>
                                                    </NavLink>
                                                    <button onClick={() => onEditTugasClick(tugas)} className="btn btn-sm px-2 py-1 mb-0"><i className="fas fa-pencil-alt text-dark m-0" aria-hidden="true"></i></button>
                                                    <button onClick={() => confirmationTugasDelete(tugas.id)} className="btn btn-sm px-2 py-1 mb-0"><i className="fas fa-trash-alt text-dark m-0" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {postingan.postinganMateri.length > 0 && (
                                    <>
                                        {postingan.postinganMateri.map((materi) => (
                                            <div className="d-flex  px-4 py-3 border-bottom" key={materi.id}>
                                                <div className="d-flex flex-row justify-content-center gap-2 cursor-pointer" onClick={() => handleDownloadFile(materi.dokumen_materi)}>
                                                    <div className="">
                                                        <img src={PdfImg} alt="" />
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0 text-sm  hover-text-indigo">{materi.judul_materi}</h6>
                                                        <p className="text-xs text-secondary mb-0">
                                                            {materi.deskripsi_materi}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="ms-auto me-4 d-flex flex-row flex-no-wrap align-items-center">
                                                    <button onClick={() => onEditMateriClick(materi)} className="btn btn-sm px-2 py-1 mb-0"><i className="fas fa-pencil-alt text-dark m-0" aria-hidden="true"></i></button>
                                                    <button onClick={() => confirmationMateriDelete(materi.id)} className="btn btn-sm px-2 py-1 mb-0 ms-1"><i className="fas fa-trash-alt text-dark m-0" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {/* <div className="d-flex  px-4 py-3 flex-column justify-content-center">

                                <h6 className="mb-0 text-sm">Catatan</h6>
                                <p className="text-xs text-secondary mb-0">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industrys
                                    standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>

                            </div> */}
                            </div>
                        </div>
                    )}
                </div>
            )
        })
    }

    return (
        <>
            <ManageLayout>
                <div className="col-12">
                    <div className="d-flex">
                        <a className="btn btn-link text-indigo px-3 mb-0 fs-5" onClick={() => { navigate(-1) }}><i className="fa fa-arrow-left text-white" aria-hidden="true"></i></a>
                        <a className="btn btn-link text-indigo px-3 mb-0 ms-auto fs-5" onClick={() => handleShow({ tipe: 'add' })}><i className="fas fa-plus text-white" aria-hidden="true"></i></a>
                    </div>
                    {renderPostingan()}
                    {postinganIsLoading ? <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : null}

                    {/* postingan */}

                    <div className={`modal fade modal-lg ${show ? 'show' : ''} modal-backdrop-manual`} style={{ display: show ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="modal-header">
                                        <h6 className="modal-title" id="exampleModalLabel">{title && title}</h6>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label className="form-label">Nama</label>
                                                    <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.nama ? 'border-red' : ''}`} placeholder="Nama" aria-label="Nama" name="nama" onChange={handleFormInput} value={formik.values.nama} />
                                                    {formik.errors.nama ? (
                                                        <span className="text-danger fs-kecil">{formik.errors.nama}</span>
                                                    ) : backendErrors.nama ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.nama}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Aktif</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.is_active ? 'border-red' : ''}`} name="is_active" onChange={handleFormInput} value={formik.values.is_active} >
                                                        <option >Choose...</option>
                                                        <option value="true">Aktif</option>
                                                        <option value="false">NonAktif</option>
                                                    </select>
                                                    {formik.errors.is_active ? (
                                                        <span className="text-danger fs-kecil">{formik.errors.is_active}</span>
                                                    ) : backendErrors.is_active ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_active}</span>
                                                    ) : null}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Delete</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.is_delete ? 'border-red' : ''}`} name="is_delete" onChange={handleFormInput} value={formik.values.is_delete} >
                                                        <option >Choose...</option>
                                                        <option value="true">Delete</option>
                                                        <option value="false">NonDelete</option>
                                                    </select>
                                                    {formik.errors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{formik.errors.is_delete}</span>
                                                    ) : backendErrors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_delete}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                        <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">
                                            {createPostinganIsLoading || editPostinganIsLoading ? <div className="spinner-border text-primary" role="status">

                                            </div> : 'Save changes'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* materi */}

                    <div className={`modal fade modal-lg ${showMateri ? 'show' : ''} modal-backdrop-manual`} style={{ display: showMateri ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form onSubmit={formikMateri.handleSubmit}>
                                    <div className="modal-header">
                                        <h6 className="modal-title" id="exampleModalLabel">{title && title}</h6>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label className="form-label">Judul Materi</label>
                                                    <input type="text" className={`form-control input-no-focus border-utama ${formikMateri.errors.judul_materi ? 'border-red' : ''}`} placeholder="judul_materi" aria-label="judul_materi" name="judul_materi" onChange={handleFormInputMateri} value={formikMateri.values.judul_materi} />
                                                    {formikMateri.errors.judul_materi ? (
                                                        <span className="text-danger fs-kecil">{formikMateri.errors.judul_materi}</span>
                                                    ) : backendErrors.judul_materi ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.judul_materi}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Dokumen Materi</label>
                                            <input
                                                type="file"
                                                className={`form-control input-no-focus border-utama ${formikMateri.errors.dokumen_materi ? "border-red" : ""}`}
                                                name="dokumen_materi"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    formikMateri.setFieldValue('dokumen_materi', file); // Simpan file di Formik
                                                }}
                                            />
                                            {formikMateri.errors.dokumen_materi && <span className="text-danger fs-kecil">{formikMateri.errors.dokumen_materi}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Deskripsi</label>
                                            <textarea
                                                className={`form-control input-no-focus border-utama ${formikMateri.errors.deskripsi_materi ? "border-red" : ""}`}
                                                name="deskripsi_materi"
                                                onChange={handleFormInputMateri}
                                                value={formikMateri.values.deskripsi_materi}
                                            />
                                            {formikMateri.errors.deskripsi_materi && <span className="text-danger fs-kecil">{formikMateri.errors.deskripsi_materi}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Aktif</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formikMateri.errors.is_active ? 'border-red' : ''}`} name="is_active" onChange={handleFormInputMateri} value={formikMateri.values.is_active} >
                                                        <option >Choose...</option>
                                                        <option value="true">Aktif</option>
                                                        <option value="false">NonAktif</option>
                                                    </select>
                                                    {formikMateri.errors.is_active ? (
                                                        <span className="text-danger fs-kecil">{formikMateri.errors.is_active}</span>
                                                    ) : backendErrors.is_active ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_active}</span>
                                                    ) : null}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Delete</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formikMateri.errors.is_delete ? 'border-red' : ''}`} name="is_delete" onChange={handleFormInputMateri} value={formikMateri.values.is_delete} >
                                                        <option >Choose...</option>
                                                        <option value="true">Delete</option>
                                                        <option value="false">NonDelete</option>
                                                    </select>
                                                    {formikMateri.errors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{formikMateri.errors.is_delete}</span>
                                                    ) : backendErrors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_delete}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                        <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">
                                            {createMateriIsLoading || editMateriIsLoading ? <div className="spinner-border text-primary" role="status">

                                            </div> : 'Save changes'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* tugas */}

                    <div className={`modal fade modal-lg ${showTugas ? 'show' : ''} modal-backdrop-manual`} style={{ display: showTugas ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form onSubmit={formikTugas.handleSubmit}>
                                    <div className="modal-header">
                                        <h6 className="modal-title" id="exampleModalLabel">{title && title}</h6>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label className="form-label">Judul Tugas</label>
                                                    <input type="text" className={`form-control input-no-focus border-utama ${formikTugas.errors.judul_tugas ? 'border-red' : ''}`} placeholder="judul_tugas" aria-label="judul_tugas" name="judul_tugas" onChange={handleFormInputTugas} value={formikTugas.values.judul_tugas} />
                                                    {formikTugas.errors.judul_tugas ? (
                                                        <span className="text-danger fs-kecil">{formikTugas.errors.judul_tugas}</span>
                                                    ) : backendErrors.judul_tugas ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.judul_tugas}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Dokumen Tugas</label>
                                            <input
                                                type="file"
                                                className={`form-control input-no-focus border-utama ${formikTugas.errors.dokumen_tugas ? "border-red" : ""}`}
                                                name="dokumen_tugas"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    formikTugas.setFieldValue('dokumen_tugas', file); // Simpan file di Formik
                                                }}
                                            />

                                            {formikTugas.errors.dokumen_tugas && <span className="text-danger fs-kecil">{formikTugas.errors.dokumen_tugas}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Deskripsi</label>
                                            <textarea
                                                className={`form-control input-no-focus border-utama ${formikTugas.errors.deskripsi_tugas ? "border-red" : ""}`}
                                                name="deskripsi_tugas"
                                                onChange={handleFormInputTugas}
                                                value={formikTugas.values.deskripsi_tugas}
                                            />
                                            {formikTugas.errors.deskripsi_tugas && <span className="text-danger fs-kecil">{formikTugas.errors.deskripsi_tugas}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Tugas Tanggal</label>
                                            <input
                                                type="date"
                                                className={`form-control input-no-focus border-utama ${formikTugas.errors.tugas_tanggal ? "border-red" : ""}`}
                                                name="tugas_tanggal"
                                                onChange={handleFormInputTugas}
                                                value={formikTugas.values.tugas_tanggal}
                                            />
                                            {formikTugas.errors.tugas_tanggal && <span className="text-danger fs-kecil">{formikTugas.errors.tugas_tanggal}</span>}
                                        </div>

                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label className="form-label">Pengumpulan Mulai</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control input-no-focus border-utama ${formikTugas.errors.pengumpulan_mulai ? "border-red" : ""}`}
                                                        name="pengumpulan_mulai"
                                                        onChange={handleFormInputTugas}
                                                        value={formikTugas.values.pengumpulan_mulai}
                                                    />
                                                    {formikTugas.errors.pengumpulan_mulai && <span className="text-danger fs-kecil">{formikTugas.errors.pengumpulan_mulai}</span>}
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">pengumpulan Selesai</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control input-no-focus border-utama ${formikTugas.errors.pengumpulan_selesai ? "border-red" : ""}`}
                                                        name="pengumpulan_selesai"
                                                        onChange={handleFormInputTugas}
                                                        value={formikTugas.values.pengumpulan_selesai}
                                                    />
                                                    {formikTugas.errors.pengumpulan_selesai && <span className="text-danger fs-kecil">{formikTugas.errors.pengumpulan_selesai}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Aktif</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formikTugas.errors.is_active ? 'border-red' : ''}`} name="is_active" onChange={handleFormInputTugas} value={formikTugas.values.is_active} >
                                                        <option >Choose...</option>
                                                        <option value="true">Aktif</option>
                                                        <option value="false">NonAktif</option>
                                                    </select>
                                                    {formikTugas.errors.is_active ? (
                                                        <span className="text-danger fs-kecil">{formikTugas.errors.is_active}</span>
                                                    ) : backendErrors.is_active ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_active}</span>
                                                    ) : null}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Delete</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formikTugas.errors.is_delete ? 'border-red' : ''}`} name="is_delete" onChange={handleFormInputTugas} value={formikTugas.values.is_delete} >
                                                        <option >Choose...</option>
                                                        <option value="true">Delete</option>
                                                        <option value="false">NonDelete</option>
                                                    </select>
                                                    {formikTugas.errors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{formikTugas.errors.is_delete}</span>
                                                    ) : backendErrors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_delete}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                        <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">
                                            {createTugasIsLoading || editTugasIsLoading ? <div className="spinner-border text-primary" role="status">

                                            </div> : 'Save changes'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>






                </div>
            </ManageLayout>
        </>
    )
}

export default GMataPelajaran