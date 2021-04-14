import { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av");

const ZoomPlayer = ({ meetingNumber, passWord, userName, userEmail }) => {
  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  const signatureEndpoint = "/api/signature";

  const apiKey = process.env.NEXT_PUBLIC_ZOOM_API_KEY;
  const role = 0;
  const leaveUrl = process.env.NEXT_PUBLIC_CURRENT_DOMAIN;

  useEffect(() => {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }, []);

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div>
      <h1>Zoom WebSDK Sample React</h1>

      <button onClick={getSignature}>Join Meeting</button>
    </div>
  );
};

export default ZoomPlayer;
