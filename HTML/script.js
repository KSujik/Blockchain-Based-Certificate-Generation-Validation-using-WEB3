const blockchain = []; // Simulated blockchain

async function generateCertificate() {
    const jsonString = document.getElementById('certificateJson').value;
    try {
        const certificateData = JSON.parse(jsonString);
        const certificateString = JSON.stringify(certificateData);
        const certificateHash = await sha256(certificateString);
        const transaction = {
            hash: certificateHash,
            data: certificateData,
            issuer: 'IssuerAddress', // Simulated issuer
        };
        blockchain.push(transaction);
        console.log('Certificate generated:', transaction);
        alert('Certificate generated! Transaction hash: ' + certificateHash);
    } catch (error) {
        alert('Invalid JSON: ' + error.message);
    }
}

async function validateCertificate() {
    const jsonString = document.getElementById('validationJson').value;
    try {
        const certificateData = JSON.parse(jsonString);
        const certificateString = JSON.stringify(certificateData);
        const certificateHash = await sha256(certificateString);
        const validTransaction = blockchain.find(tx => tx.hash === certificateHash);
        const validationResultDiv = document.getElementById('validationResult');
        if (validTransaction) {
            validationResultDiv.innerHTML = 'Certificate is valid. Issued by: ' + validTransaction.issuer;
        } else {
            validationResultDiv.innerHTML = 'Certificate is invalid.';
        }
    } catch (error) {
        alert('Invalid JSON: ' + error.message);
    }
}
async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        const padding = '00000000';
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join('');
}

document.getElementById('generateBtn').addEventListener('click', generateCertificate);
document.getElementById('validateBtn').addEventListener('click', validateCertificate);