// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const crypto = require("crypto");

export default (req, res) => {
  const timestamp = new Date().getTime() - 30000;

  const msg = Buffer.from(
    process.env.NEXT_PUBLIC_ZOOM_API_KEY +
      req.body.meetingNumber +
      timestamp +
      req.body.role
  ).toString("base64");

  const hash = crypto
    .createHmac("sha256", process.env.ZOOM_API_SECRET)
    .update(msg)
    .digest("base64");

  const signature = Buffer.from(
    `${process.env.NEXT_PUBLIC_ZOOM_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`
  ).toString("base64");

  res.status(200).json({
    signature,
  });
};
