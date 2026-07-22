import React from "react";
import FormField from "./FormField";
import RadioGroup from "./RadioGroup";
import "../../App.css";

const PersonalInfoSection = ({ form, onChange }) => {
  let qualifyingExamOptions = ["B.Tech.", "M.Sc", "MCA", "Any other"];
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
        label="Upload Passport Size Photograph"
        name="passportPhoto"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />

      <FormField
        label="Upload Class 10th Marksheet"
        name="marksheet10"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />

      <FormField
        label="Fill 12th / Equivalent Certificate Aggregate percentage of Marks"
        name="marks12"
        value={form.marks12}
        onChange={onChange}
        required
      />

      <FormField
        label="Upload Class 12th Marksheet / Equivalent Certificate Marksheets"
        name="marksheet12"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />

      <FormField
        label="B.Tech. / Any other qualifying Examination Percentage (Aggregate Percentage or CGPA)"
        name="marksBTech"
        value={form.marksBTech}
        onChange={onChange}
        required
      />

      <FormField
        label="Qualifing Exam Passed"
        name="qualifyExam"
        type="select"
        value={form.qualifyExam}
        onChange={onChange}
        options={qualifyingExamOptions}
        required
      />
      {/* Conditional Field */}
      {form.qualifyExam === "B.Tech." && (
        <FormField
          label="Branch of Study"
          name="branchOfStudy"
          type="text"
          value={form.branchOfStudy}
          onChange={onChange}
          placeholder="Enter your branch (e.g. Computer Science)"
          required
        />
      )}

      {form.qualifyExam === "M.Sc" && (
        <FormField
          label="Subject of Study"
          name="subjectOfStudy"
          type="text"
          value={form.subjectOfStudy}
          onChange={onChange}
          placeholder="Enter your subject"
          required
        />
      )}

      {form.qualifyExam === "MCA" && (
        <FormField
          label="Subject of Study"
          name="subjectOfStudy"
          type="text"
          value={form.subjectOfStudy}
          onChange={onChange}
          placeholder="Enter your subject"
          required
        />
      )}

      {form.qualifyExam === "Any other" && (
        <FormField
          label="Please Specify"
          name="otherQualification"
          type="text"
          value={form.otherQualification}
          onChange={onChange}
          placeholder="Specify your qualification"
          required
        />
      )}

      {qualifyingExamOptions.includes(form.qualifyExam) && (
        <FormField
          label="Upload Qualifying Exam Certificate"
          name="gateQualifyExam"
          type="file"
          accept=".pdf"
          onChange={onChange}
          required
        />
      )}

      <RadioGroup
        label="Have you Qualified GATE Exam?"
        name="gateQualified"
        value={form.gateQualified}
        onChange={onChange}
        options={[
          { value: "No", label: "No" },
          { value: "Yes", label: "Yes" },
        ]}
        required
      />

      {form.gateQualified === "Yes" && (
        <>
          <FormField
            label="GATE Application Number"
            name="applicationNum"
            value={form.applicationNum}
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
            label="GATE Rank"
            name="gateScore"
            type="number"
            value={form.gateScore}
            onChange={onChange}
            required
          />

          <FormField
            label="Upload GATE Scorecard and Admit Card (Single PDF)"
            name="gateScorecard"
            type="file"
            accept=".pdf"
            onChange={onChange}
            required
          />
        </>
      )}


      <FormField
        label="Category"
        name="category"
        type="select"
        value={form.category}
        onChange={onChange}
        options={["Gen", "Gen-EWS", "OBC-NCL", "SC", "ST"]}
        required
      />

      {form.category && form.category === "Gen-EWS" && (
        <FormField
          label="Upload Gen-EWS Certificate (PDF)"
          helperText="Upload category certificate issued on or after April 01, 2026 or should have mentioned validity at least upto August 31, 2026."
          name="categoryCert"
          type="file"
          onChange={onChange}
          accept=".pdf"
          required
        />
      )}

      {form.category && form.category === "OBC-NCL" && (
        <FormField
          label="Upload OBC-NCL Certificate (PDF)"
          helperText="Upload category certificate issued on or after April 01, 2026 or should have mentioned validity at least upto August 31, 2026."
          name="categoryCert"
          type="file"
          onChange={onChange}
          accept=".pdf"
          required
        />
      )}

      {form.category && form.category === "SC" && (
        <FormField
          label="Upload SC Certificate (PDF)"
          name="categoryCert"
          type="file"
          onChange={onChange}
          accept=".pdf"
          required
        />
      )}
      {form.category && form.category === "ST" && (
        <FormField
          label="Upload ST Certificate (PDF)"
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
        label="Are you Already Admitted in GGV Bilaspur through CCMT-2026 Counseling"
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
            label="Program Name"
            name="branchName"
            type="select"
            value={form.branchName}
            onChange={onChange}
            options={[
              "Computer Science & Engineering",
              "Information Technology",
              "Structural Engineering",
              "Electronics & Communication Engineering",
              "CAD CAM & Robotics",
              "Chemical Engineering",
              "Mechanical Engineering",
              "Water Resources & Environmental Engineering",
              "Geotechnical Engineering",
            ]}
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
