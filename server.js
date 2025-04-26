const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require("docx");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

function createDoc(children) {
  return new Document({
    creator: "LegalQuestor",
    title: "Generated Legal Document",
    description: "Auto-generated document",
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });
}

// FIR Generation
app.post('/generate-fir', async (req, res) => {
  const {
    name,
    fatherName,
    address,
    policeStationName,
    policeStationAddress,
    incidentDate,
    incidentDetails
  } = req.body;

  const doc = createDoc([
    new Paragraph("To"),
    new Paragraph(`The Officer-in-Charge,`),
    new Paragraph(`${policeStationName},`),
    new Paragraph(`${policeStationAddress}`),
    new Paragraph(""),
    new Paragraph("Subject: Lodging of First Information Report (FIR)"),
    new Paragraph(""),
    new Paragraph("Respected Sir/Madam,"),
    new Paragraph(""),
    new Paragraph(`I, ${name}, S/o/D/o ${fatherName}, residing at ${address}, wish to lodge an FIR regarding the following incident:`),
    new Paragraph(""),
    new Paragraph(`1. Date of Incident: ${incidentDate}`),
    new Paragraph(`2. Details of Incident:`),
    new Paragraph(`${incidentDetails}`),
    new Paragraph(""),
    new Paragraph("The above act is cognizable in nature and I request you to kindly register my complaint and take appropriate legal action."),
    new Paragraph(""),
    new Paragraph("I am ready to cooperate in the investigation and provide any further information as required."),
    new Paragraph(""),
    new Paragraph("Thanking you,"),
    new Paragraph(""),
    new Paragraph(`Yours faithfully,`),
    new Paragraph(`${name}`),
    new Paragraph(`Date: ${new Date().toLocaleDateString()}`),
  ]);

  const buffer = await Packer.toBuffer(doc);
  const filename = "generated_fir.docx";
  fs.writeFileSync(filename, buffer);
  res.download(filename);
});

// Rent Agreement Generation
app.post('/generate-rent-agreement', async (req, res) => {
  const {
    landlordName,
    tenantName,
    propertyAddress,
    rentAmount,
    securityDeposit,
    duration,
    startDate,
    witness1,
    witness2
  } = req.body;

  const currentDate = new Date().toLocaleDateString();

  const doc = createDoc([
    new Paragraph({
      children: [new TextRun({ text: "Rent Agreement", bold: true, size: 32 })],
      alignment: "center",
      spacing: { after: 300 }
    }),

    new Paragraph(`This Rent Agreement is made on ${currentDate} between:`),
    new Paragraph(`\nLandlord: ${landlordName}`),
    new Paragraph(`Tenant: ${tenantName}`),
    new Paragraph(`\nThe Landlord hereby agrees to rent the property located at:`),
    new Paragraph(`${propertyAddress}`),

    new Paragraph(`\nMonthly Rent: ₹${rentAmount}`),
    new Paragraph(`Security Deposit: ₹${securityDeposit}`),
    new Paragraph(`Agreement Duration: ${duration} months`),
    new Paragraph(`Start Date: ${startDate}`),

    new Paragraph("\nTerms and Conditions:"),
    new Paragraph("1. The tenant shall pay the rent on or before the 5th of every month."),
    new Paragraph("2. The tenant shall not sublet the premises without prior written permission."),
    new Paragraph("3. The tenant shall maintain the premises in good condition."),

    new Paragraph("\nWitnesses:"),
    new Paragraph(`1. ${witness1}`),
    new Paragraph(`2. ${witness2}`),

    new Paragraph("\nSigned on this day,"),
    new Paragraph(`Landlord: ${landlordName}`),
    new Paragraph(`Tenant: ${tenantName}`),
  ]);

  const buffer = await Packer.toBuffer(doc);
  const filename = "Rent_Agreement.docx";
  fs.writeFileSync(filename, buffer);
  res.download(filename);
});

// Bail Application Generation
app.post('/generate-bail', async (req, res) => {
  const {
    applicantName,
    fatherName,
    address,
    city,
    courtName,
    caseNumber,
    reason,
    date,
  } = req.body;

  const doc = createDoc([
    new Paragraph({
      children: [new TextRun("IN THE COURT OF " + courtName.toUpperCase())],
      alignment: "center",
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun("Bail Application in Case No: " + caseNumber)],
      alignment: "center",
      spacing: { after: 300 },
    }),
    new Paragraph({
      children: [
        new TextRun("To,"),
        new TextRun("\nThe Hon’ble Court,"),
        new TextRun(`\n${courtName}, ${city}.`),
      ],
    }),
    new Paragraph({
      children: [new TextRun("\nSubject: Application for Grant of Bail\n")],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun(
          `I, ${applicantName}, S/o/D/o ${fatherName}, residing at ${address}, respectfully submit this application seeking bail in connection with Case No. ${caseNumber}.`
        ),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun(
          reason
            ? `\nGrounds for Bail:\n${reason}`
            : "\nI assure that I shall comply with all the conditions imposed by the Hon’ble Court if bail is granted."
        ),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun("\nI request the Hon’ble Court to kindly grant me bail in the interest of justice."),
      ],
    }),
    new Paragraph({
      children: [new TextRun("\nThanking you.")],
    }),
    new Paragraph(""),
    new Paragraph("Yours sincerely,"),
    new Paragraph(`${applicantName}`),
    new Paragraph(`Date: ${date}`),
  ]);

  const buffer = await Packer.toBuffer(doc);
  const filename = "Bail_Application.docx";
  fs.writeFileSync(filename, buffer);
  res.download(filename);
});

// Cyber Crime Complaint Generation
app.post('/generate-cybercrime', async (req, res) => {
  const {
    name,
    fatherName,
    address,
    complaintDetails,
    complaintDate,
  } = req.body;

  const doc = createDoc([
    new Paragraph("To"),
    new Paragraph("The Cyber Crime Investigation Cell,"),
    new Paragraph(""),
    new Paragraph("Subject: Complaint Regarding Cyber Crime"),
    new Paragraph(""),
    new Paragraph("Respected Sir/Madam,"),
    new Paragraph(""),
    new Paragraph(`I, ${name}, S/o/D/o ${fatherName}, residing at ${address}, wish to lodge a complaint regarding the following cyber crime incident:`),
    new Paragraph(""),
    new Paragraph("Details of Complaint:"),
    new Paragraph(`${complaintDetails}`),
    new Paragraph(""),
    new Paragraph("I request you to kindly investigate the matter and take necessary legal action against the offenders."),
    new Paragraph(""),
    new Paragraph("Thanking you,"),
    new Paragraph(""),
    new Paragraph(`Yours faithfully,`),
    new Paragraph(`${name}`),
    new Paragraph(`Date: ${complaintDate}`),
  ]);
  
  const buffer = await Packer.toBuffer(doc);
  const filename = "Cyber_Crime_Complaint.docx";
  fs.writeFileSync(filename, buffer);
  res.download(filename);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
