import { NextApiRequest, NextApiResponse } from "next";

import { IStatus } from "../../lib/writeMetaFile";
import { readMetaFile } from "../../lib/readMetaFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get file name
  const { file } = req.query;

  // read current status
  let status: IStatus;
  try {
    status = await readMetaFile(file as string);
  } catch (e) {
    // something wrong happened
    res.json({
      success: false,
      error: e.message,
    });
    return;
  }

  // return the status
  delete status.originalName;
  res.json({
    success: true,
    status,
  });
};

export default handler;
