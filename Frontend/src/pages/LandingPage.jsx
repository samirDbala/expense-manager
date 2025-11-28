// rrd imports
import { Link, redirect } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";  
import illustration from "../assets/illustration.jpg"
import { fetchUsername } from "../helpers";
import { useEffect } from "react";

const LandingPage = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>

        <Link className="btn btn--dark" to={'/registration'}>
            <span>Get Started</span>
            <UserPlusIcon width={18} />
        </Link>
      </div>
      {/* <video autoPlay loop muted  width={550}>
        <source src={illustrationVideo}/>
      </video> */}
      <img src={illustration} alt="Person sitting with money" width={550} />
    </div>
  );
};
export default LandingPage;
