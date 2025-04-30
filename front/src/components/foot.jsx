import { useNavigate } from "react-router-dom";
import './foot.css';

const Foot = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className='footLogo' onClick={()=>navigate('/')}>CHASMANDU</div>
      <div>
        <h4>Contact</h4>
          <a href={`tel:+9779817380234`}>Call</a>
          <a href="mailto:najas0864@gmail.com">Gmail</a>
          <a href="https://maps.app.goo.gl/eUdAPS53rUgMwMQL9" target='_blanck' title='Open Location on App'>Location</a>
          <a href={`https://api.whatsapp.com/send/?phone=9817380234&text=Source:https://chasmandu.onrender.com/`}target="_blank">WhatsApp</a>
        </div>
      <div>
        <h4>Socials</h4>
          <a target='_blank' href="https://www.tiktok.com"><span>Tik tok</span></a>
          <a target='_blank' href="https://www.youtube.com"><span>Youtube</span></a>
          <a target='_blank' href="https://www.facebook.com"><span>Facebook</span></a>
          <a target='_blank' href="https://www.instagram.com"><span>Instragram</span></a>
      </div>
      <div>
        <h4>Quick Links</h4>
          <a target='_blank' href="/blog"><span>Blog</span></a>
          <a target='_blank' href="/about"><span>About us</span></a>
          <a target='_blank' href="/Refund-Policy"><span>Refund Policy</span></a>
          <a target='_blank' href="/Privacy-Policy"><span>Privacy Policy</span></a>
      </div>
    </footer>
  );
};

export default Foot;
