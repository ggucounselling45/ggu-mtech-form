import React from "react";
import FormField from "./FormField";
import RadioGroup from "./RadioGroup";
import "../../App.css";

const PersonalInfoSection = ({ form, onChange }) => {
  return (
    <>
      <FormField
        label="Name of the Candidate (as per 10th standard certificate)"
        name="name"
        value={form.name}
        onChange={onChange}
        required
      />

      <FormField
        label="Father's Name"
        name="fatherName"
        value={form.fatherName}
        onChange={onChange}
        required
      />

      <FormField
        label="Mother's Name"
        name="motherName"
        value={form.motherName}
        onChange={onChange}
        required
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
      />

      <FormField
        label="Date of Birth (as per 10th standard certificate)"
        name="dob"
        type="date"
        value={form.dob}
        onChange={onChange}
        required
      />

      <FormField
        label="Gender"
        name="gender"
        type="select"
        value={form.gender}
        onChange={onChange}
        options={["Male", "Female", "Other"]}
        required
      />

      <FormField
        label="Nationality"
        name="nationality"
        value={form.nationality}
        onChange={onChange}
        required
      />

      <FormField
        label="Religion (for Statistical Purpose only)"
        name="religion"
        value={form.religion}
        onChange={onChange}
        required
      />

      <FormField
        label="Qualifying Exam / Class 12th Percentage (Aggregate Marks and Board)"
        name="marks12"
        value={form.marks12}
        onChange={onChange}
        required
      />

      <FormField
        label="Upload Class 12th Marksheet"
        name="marksheet12"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />

      <FormField
        label="B.Tech. / Any other qualifying Examinationh Percentage (Aggregate Marks or CGPA)"
        name="marksBTech"
        value={form.marksBTech}
        onChange={onChange}
        required
      />

      <FormField
        label="Upload Graduation Marksheet"
        name="marksheetBTech"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />

      <FormField
        label="GATE Application Number"
        name="applicationNum"
        value={form.applicationNum}
        onChange={onChange}
        required
      />

      <FormField
        label="CRL rank"
        name="crlRank"
        value={form.crlRank}
        onChange={onChange}
        required
      />

      <FormField
        label="GATE Year Of Examination"
        name="yearOfExam"
        value={form.yearOfExam}
        onChange={onChange}
        required
      />

      <FormField
        label="Gate Score"
        name="gateScore"
        value={form.gateScore}
        onChange={onChange}
        required
      />

      <FormField
        label="Uplaod GATE Scorecard and Admit Card(in a Single PDF file)"
        name="gateScorecard"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />

      <FormField
        label="Category"
        name="category"
        type="select"
        value={form.category}
        onChange={onChange}
        options={["Gen", "Gen-EWS", "OBC-NCL", "SC", "ST"]}
        required
      />

      {form.category && form.category !== "Gen" && (
        <FormField
          label="Upload Category Certificate (PDF)"
          name="categoryCert"
          type="file"
          onChange={onChange}
          accept=".pdf"
          required
        />
      )}

      <RadioGroup
        label="Physically Challenged"
        name="physChallenged"
        value={form.physChallenged}
        onChange={onChange}
        options={[
          { value: "No", label: "No" },
          { value: "Yes", label: "Yes" },
        ]}
        required
      />
      {form.physChallenged === "Yes" && (
        <FormField
          label="Upload UDID Certificate / PWD Certificate "
          name="pwdCert"
          type="file"
          onChange={onChange}
          accept=".pdf"
          required
        />
      )}

      <RadioGroup
        label="Are you Already Admitted in GGV Bilaspur through JOSAA/CSAB (2026-27)"
        name="admissionStatus"
        value={form.admissionStatus}
        onChange={onChange}
        options={[
          { value: "No", label: "No" },
          { value: "Yes", label: "Yes" },
        ]}
        required
      />

      {form.admissionStatus === "Yes" && (
        <div>
          <FormField
        label="Branch Name"
        name="branchName"
        type="select"
        value={form.branchName}
        onChange={onChange}
        options={["CSE", "IT", "ECE", "EE", "Mechanical", "Civil", "Chemical","IPE", "AI & DS","Animation & VFX"]}
        required
      />
          <FormField
            label="Upload Provisional Allotment Letter"
            name="allotmentLetter"
            type="file"
            onChange={onChange}
            accept=".pdf"
            required
          />
        </div>
      )}
    </>
  );
};

export default PersonalInfoSection;
