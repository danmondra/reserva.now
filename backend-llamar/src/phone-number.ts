const { VAPI_TOKEN } = process.env

export async function createVapiPhoneNumber(SIPTrunkCredentials: { id: string }) {
  const url = "https://api.vapi.ai/phone-number";

  const body = {
    provider: "byo-phone-number",
    name: "Twilio SIP Number",
    number: "+13604695957",
    numberE164CheckEnabled: true,
    credentialId: SIPTrunkCredentials.id
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
