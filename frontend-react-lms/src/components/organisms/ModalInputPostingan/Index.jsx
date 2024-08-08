import PropTypes from "prop-types";

const ModalInputPostingan = ({ show, title, formik, handleClose, createPostinganIsLoading, editPostinganIsLoading, backendErrors }) => {
    const handleFormInput = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    };
    return (
        <>
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
        </>
    )
}

ModalInputPostingan.propTypes = {
    show : PropTypes.string, 
    title : PropTypes.string, 
    formik : PropTypes.string, 
    handleClose : PropTypes.string, 
    createPostinganIsLoading : PropTypes.string,
    editPostinganIsLoading : PropTypes.string, 
    backendErrors : PropTypes.string, 
}

export default ModalInputPostingan