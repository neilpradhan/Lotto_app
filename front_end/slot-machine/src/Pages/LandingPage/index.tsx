import MySlotMachine from "../MySlotMachine";
import "./LandingPage.css";

const LandingPage: React.FC<{}> = () => {
  let date = new Date();

  return (
    <>
      <div className="signin">
        <div className="watermark">
          <i className="icon icon-econ"></i>
          <div className="product">
            QRNG <br />
            Slot Machine
          </div>{" "}
        </div>
        <div className="form">
          <MySlotMachine />
        </div>
        <div className="footer">
          © Ericsson AB 2013-{date.getFullYear()} - All Rights Reserved. <br />
          No part of this software may be reproduced in any form without the
          written permission of the copyright holder.
        </div>{" "}
      </div>
    </>
  );
};

export default LandingPage;
