import { Link } from "react-router-dom";
import casino from "../../assets/casino.jpg";
import bet from "../../assets/bet.jpg";
import "./Home.css"

export default function Home() {
  return (
    <>
      <div className="container px-1">
        <div className="row justify-content-around">
          <div className="col-md-6 p-5 position-relative" >
            <Link to="/casino/blackjack">
              <img src={casino} className="img-fluid"></img>
              <div className="overlay-text">Explore Casino</div>
            </Link>
          </div>
          <div className="col-md-6 p-5 position-relative" >
            <Link to="/leagues">
              <img src={bet} className="img-fluid"></img>
              <div className="overlay-text">Check Leagues</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
