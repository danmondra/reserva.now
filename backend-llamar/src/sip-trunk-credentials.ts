const { VAPI_TOKEN } = process.env

export async function createVapiCredential() {
  const url = "https://api.vapi.ai/credential";

  const body = {
    provider: "byo-sip-trunk",
    name: "Twilio Trunk",
    gateways: [
      {
        ip: "vapi-demo-dan.pstn.twilio.com",
        inboundEnabled: false
      }
    ],
    outboundLeadingPlusEnabled: true
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${VAPI_TOKEN}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  return data
}

