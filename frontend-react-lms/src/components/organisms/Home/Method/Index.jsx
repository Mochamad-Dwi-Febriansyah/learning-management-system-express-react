import Img1 from "../../../../assets/img/1.png"
import Img2 from "../../../../assets/img/2.png"
import Img3 from "../../../../assets/img/3.png"

const Method = () => {
  return (
    <>
           <section className="py-4 bg-white" id="tentang_kami">
        <div className="container">
            <div className="row py-3 py-lg-5">
                <h2 className="text-center mb-4 fw-medium">Metode Pembelajaran</h2>
                <p className="text-center mb-4">Beragam pilihan metode pembelajaran yang sesuai dengan kebutuhan belajar Anda.</p>
                <div className="d-flex gap-5 flex-wrap">
                    <div className="col-md mb-3 d-flex justify-content-center flex-column align-items-center">
                        <div className="rounded-custom icon-bulat bg-white mb-3 mx-auto">
                            <img src={Img1} alt="" />
                        </div>
                        <h6>Pembelajaran Tatap Muka</h6>
                        <p className="">Kegiatan pengembangan kompetensi dengan sistem konvensional yang dilakukan secara tatap muka di dalam kelas.</p>
                    </div> 
                    <div className="col-md mb-3 d-flex justify-content-center flex-column align-items-center">
                        <div className="rounded-custom icon-bulat bg-white mb-3 mx-auto">
                            <img src={Img2} alt=""/>
                        </div> 
                        <h6>Pembelajaran Daring</h6>
                        <p className="">Kegiatan pengembangan kompetensi dengan sistem konvensional yang dilakukan secara tatap muka di dalam kelas.</p>
                    </div> 
                    <div className="col-md mb-3 d-flex justify-content-center flex-column align-items-center">
                        <div className="rounded-custom icon-bulat bg-white mb-3 mx-auto">
                            <img src={Img3} alt=""/>
                        </div>
                        <h6>Pelatihan Khusus</h6>
                        <p className="">Kegiatan pengembangan kompetensi dengan sistem konvensional yang dilakukan secara tatap muka di dalam kelas.</p>
                    </div> 
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Method;
