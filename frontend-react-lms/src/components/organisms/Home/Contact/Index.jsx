import Whatsapp from "../../../../assets/img/whatsapp.png"
import Facebook from "../../../../assets/img/facebook.png"
import Instagram from "../../../../assets/img/instagram.png"

const Contact = () => {
  return (
    <>
        <section className="py-4 bg-light" id="hubungi_kami">
        <div className="container">
            <div className="row py-3 py-lg-5  align-items-center justify-content-around">
                <h2 className="text-center mb-4 fw-medium">Hubungi Kami</h2> 
                <div className="col-2 mb-3 text-center"> 
                        <img className="mb-3 s-35" src={Whatsapp} alt=""/> 
                        <h6>ringkus@gmail.com</h6>
                </div> 
                <div className="col-2 mb-3 text-center"> 
                        <img className="mb-3 s-35" src={Facebook} alt=""/> 
                        <h6>08122604735</h6>
                </div> 
                <div className="col-2 mb-3 text-center"> 
                        <img className="mb-3 s-35" src={Instagram} alt=""/> 
                        <h6>+62881213313</h6>
                </div> 
            </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
