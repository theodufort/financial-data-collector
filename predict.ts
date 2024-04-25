import * as tf from "@tensorflow/tfjs-node";
import { DbRow } from "./interfaces";

export async function model1(trainingData: DbRow[], futureData: DbRow[]) {
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [1], units: 64, activation: "relu" }),
      tf.layers.dense({ units: 1 }),
    ],
  });

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });
  const xs = tf.tensor1d(trainingData.map((item) => item.date));
  const ys = tf.tensor1d(trainingData.map((item) => item.close.toString()));

  await model.fit(xs, ys, { epochs: 50 });
  const futureTensor = tf.tensor1d(
    futureData.map((item) => item.close.toString())
  );
  const predictions = model.predict(futureTensor).dataSync();
  return predictions;
}
