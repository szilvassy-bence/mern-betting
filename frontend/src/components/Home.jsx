import { Link } from "react-router-dom"

export default function Home () {

    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <Link to="/casino/blackjack">
                        <button>
                            Play BlackJack
                        </button>
                    </Link>
                    <Link to="/leagues">
                        <button>
                            Bet on football matches
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}