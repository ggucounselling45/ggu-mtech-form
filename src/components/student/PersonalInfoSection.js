import React from "react";
import FormField from "./FormField";
import RadioGroup from "./RadioGroup";
import "../../App.css";

const PersonalInfoSection = ({
  form,
  onChange,
  errors,
  shouldShowFieldError,
}) => {
  let qualifyingExamOptions = ["B.Tech.", "M.Sc", "MCA", "Any other"];
  return (
    <>
      <FormField
        label="Name of the Candidate (as per 10th standard certificate)"
        name="name"
        value={form.name}
        onChange={onChange}
        required
        error={shouldShowFieldError("name") ? errors.name : ""}
      />

      <FormField
        label="Father's Name"
        name="fatherName"
        value={form.fatherName}
        onChange={onChange}
        required
        error={shouldShowFieldError("fatherName") ? errors.fatherName : ""}
      />

      <FormField
        label="Mother's Name"
        name="motherName"
        value={form.motherName}
        onChange={onChange}
        required
        error={shouldShowFieldError("motherName") ? errors.motherName : ""}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
        helperText="Use an active email address for admission communication."
        error={shouldShowFieldError("email") ? errors.email : ""}
      />

      <FormField
        label="Date of Birth (as per 10th standard certificate)"
        name="dob"
        type="date"
        value={form.dob}
        onChange={onChange}
        required
        helperText="Enter the date exactly as printed on your 10th certificate."
        error={shouldShowFieldError("dob") ? errors.dob : ""}
      />

      <FormField
        label="Gender"
        name="gender"
        type="select"
        value={form.gender}
        onChange={onChange}
        options={["Male", "Female", "Other"]}
        required
        error={shouldShowFieldError("gender") ? errors.gender : ""}
      />

      <FormField
        label="Nationality"
        name="nationality"
        value={form.nationality}
        onChange={onChange}
        required
        error={shouldShowFieldError("nationality") ? errors.nationality : ""}
      />

      <FormField
        label="Religion (for Statistical Purpose only)"
        name="religion"
        value={form.religion}
        onChange={onChange}
        required
        error={shouldShowFieldError("religion") ? errors.religion : ""}
      />

      <FormField
        label="Upload Passport Size Photograph"
        name="passportPhoto"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
        helperText="PDF only."
        error={
          shouldShowFieldError("passportPhoto") ? errors.passportPhoto : ""
        }
      />

      <FormField
        label="Upload Class 10th Marksheet"
        name="marksheet10"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
        helperText="PDF only."
        error={shouldShowFieldError("marksheet10") ? errors.marksheet10 : ""}
      />

      <FormField
        label="Fill 12th / Equivalent Certificate Aggregate percentage of Marks"
        name="marks12"
        value={form.marks12}
        onChange={onChange}
        required
        helperText="Enter percentage only, for example 78.5."
        error={shouldShowFieldError("marks12") ? errors.marks12 : ""}
      />

      <FormField
        label="Upload Class 12th Marksheet / Equivalent Certificate Marksheets"
        name="marksheet12"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
        helperText="PDF only."
        error={shouldShowFieldError("marksheet12") ? errors.marksheet12 : ""}
      />

      <FormField
        label="B.Tech. / Any other qualifying Examination Percentage (Aggregate Percentage or CGPA)"
        name="marksBTech"
        value={form.marksBTech}
        onChange={onChange}
        required
        helperText="Enter CGPA upto 10 or percentage upto 100, for example 8.5 or 85."
        error={shouldShowFieldError("marksBTech") ? errors.marksBTech : ""}
      />

      <FormField
        label="Qualifing Exam Passed"
        name="qualifyExam"
        type="select"
        value={form.qualifyExam}
        onChange={onChange}
        options={qualifyingExamOptions}
        required
        helperText="Choose the qualifying exam you passed."
        error={shouldShowFieldError("qualifyExam") ? errors.qualifyExam : ""}
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
          helperText="Required only when qualifying exam is B.Tech."
          error={
            shouldShowFieldError("branchOfStudy") ? errors.branchOfStudy : ""
          }
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
          helperText="Required only when qualifying exam is M.Sc."
          error={
            shouldShowFieldError("subjectOfStudy") ? errors.subjectOfStudy : ""
          }
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
          helperText="Required only when qualifying exam is MCA."
          error={
            shouldShowFieldError("subjectOfStudy") ? errors.subjectOfStudy : ""
          }
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
          helperText="Required only when qualifying exam is Any other."
          error={
            shouldShowFieldError("otherQualification")
              ? errors.otherQualification
              : ""
          }
        />
      )}

      {qualifyingExamOptions.includes(form.qualifyExam) && (
        <FormField
          label="Grade/Mark sheets of qualifying examination for all semesters,if awaited then uptill pre-final semester in single PDF file"
          name="gateQualifyExam"
          type="file"
          accept=".pdf"
          onChange={onChange}
          required
          helperText="PDF only."
          error={
            shouldShowFieldError("gateQualifyExam")
              ? errors.gateQualifyExam
              : ""
          }
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
        helperText="Select Yes only if you qualified GATE."
        error={
          shouldShowFieldError("gateQualified") ? errors.gateQualified : ""
        }
      />

      {form.gateQualified === "Yes" && (
        <>
          <FormField
            label="GATE Application Number"
            name="applicationNum"
            value={form.applicationNum}
            onChange={onChange}
            required
            helperText="Required only when GATE qualified is Yes."
            error={
              shouldShowFieldError("applicationNum")
                ? errors.applicationNum
                : ""
            }
          />

          <FormField
            label="GATE Year Of Examination"
            name="yearOfExam"
            type="select"
            value={form.yearOfExam}
            onChange={onChange}
            required
            options={["2024", "2025", "2026"]}
            helperText="Select your GATE examination year."
            error={shouldShowFieldError("yearOfExam") ? errors.yearOfExam : ""}
          />

          <FormField
            label="GATE Score"
            name="gateScore"
            type="text"
            value={form.gateScore}
            onChange={onChange}
            required
            helperText="Enter the GATE Score"
            error={shouldShowFieldError("gateScore") ? errors.gateScore : ""}
          />

          <FormField
            label="Upload GATE Scorecard and Admit Card (Single PDF)"
            name="gateScorecard"
            type="file"
            accept=".pdf"
            onChange={onChange}
            required
            helperText="PDF only."
            error={
              shouldShowFieldError("gateScorecard") ? errors.gateScorecard : ""
            }
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
        helperText="Choose the category from your certificate."
        error={shouldShowFieldError("category") ? errors.category : ""}
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
          error={
            shouldShowFieldError("categoryCert") ? errors.categoryCert : ""
          }
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
          error={
            shouldShowFieldError("categoryCert") ? errors.categoryCert : ""
          }
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
          helperText="PDF only."
          error={
            shouldShowFieldError("categoryCert") ? errors.categoryCert : ""
          }
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
          helperText="PDF only."
          error={
            shouldShowFieldError("categoryCert") ? errors.categoryCert : ""
          }
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
        helperText="Select Yes only if you have a valid UDID / PWD certificate."
        error={
          shouldShowFieldError("physChallenged") ? errors.physChallenged : ""
        }
      />
      {form.physChallenged === "Yes" && (
        <FormField
          label="Upload UDID Certificate / PWD Certificate "
          name="pwdCert"
          type="file"
          onChange={onChange}
          accept=".pdf"
          required
          helperText="PDF only."
          error={shouldShowFieldError("pwdCert") ? errors.pwdCert : ""}
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
        helperText="Select Yes if you are already admitted through CCMT-2026."
        error={
          shouldShowFieldError("admissionStatus") ? errors.admissionStatus : ""
        }
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
            helperText="Required only when admission status is Yes."
            error={shouldShowFieldError("branchName") ? errors.branchName : ""}
          />
          <FormField
            label="Upload Provisional Allotment Letter"
            name="allotmentLetter"
            type="file"
            onChange={onChange}
            accept=".pdf"
            required
            helperText="PDF only."
            error={
              shouldShowFieldError("allotmentLetter")
                ? errors.allotmentLetter
                : ""
            }
          />
        </div>
      )}
    </>
  );
};

export default PersonalInfoSection;
