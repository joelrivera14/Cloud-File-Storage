import "dotenv/config";
import express from "express";
import cors from "cors";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from "./aws/s3.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});
app.get("/s3-test", async (req, res) => {
  try {
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET,
      })
    );

    res.json(data.Contents || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.name });
  }
});

app.listen(3001, () => {
  console.log("API running on port 3001");
});
