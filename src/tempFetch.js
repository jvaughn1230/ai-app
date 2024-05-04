const PAT = "57025a4e5bdd415283fa0020429168b1";
const USER_ID = "3u8bqxaf5qrg";
const APP_ID = "";
const MODEL_ID = "stable-diffusion-xl";
const MODEL_VERSION_ID = "68eeab068a5e4488a685fc67bc7ba71e";
const RAW_TEXT = "A penguin watching the sunset.";

const raw = JSON.stringify({
  inputs: [
    {
      data: {
        text: {
          raw: RAW_TEXT,
          // "url": TEXT_FILE_URL
        },
      },
    },
  ],
});

const requestOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: "Key " + PAT,
  },
  body: raw,
};

// model_prediction = Model("https://clarifai.com/stability-ai/stable-diffusion-2/models/stable-diffusion-xl").predict_by_bytes(prompt.encode(), input_type="text", inference_params=inference_params)

fetch(
  "https://api.clarifai.com/v2/models/" +
    MODEL_ID +
    "/versions/" +
    MODEL_VERSION_ID +
    "/outputs",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    const imageBase64 = result.outputs[0].data.image.base64;
    // Create an anchor element for downloading the image
    const downloadLink = document.createElement("a");
    downloadLink.href = `data:image/jpeg;base64,${imageBase64}`;
    downloadLink.download = "gen-image.jpg";
    // Trigger a click event on the link to prompt the download
    downloadLink.click();
  })
  .catch((error) => console.log("error", error));
