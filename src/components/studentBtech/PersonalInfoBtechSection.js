import React from "react";
import FormField from "../student/FormField";
import RadioGroup from "../student/RadioGroup";

const PersonalInfoBtechSection = ({
  form,
  onChange,
  errors,
  shouldShowFieldError,
}) => {
  // let qualifyingExamOptions = ["B.Tech.", "M.Sc", "MCA", "Any other"];
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
        label="Enter JEE Main Application Number"
        name="jeeMainApplicationNumber"
        type="text"
        value={form.jeeMainApplicationNumber}
        onChange={onChange}
        required
        helperText="Enter the JEE Main Application Number"
        error={shouldShowFieldError("jeeMainApplicationNumber") ? errors.jeeMainApplicationNumber : ""}
      />
      <FormField
        label="Enter JEE Main CRL Rank (Do Not Enter the Category Rank)"
        name="jeeMainAllIndiaRank"
        type="text"
        value={form.jeeMainAllIndiaRank}
        onChange={onChange}
        required
        helperText="Enter the JEE Main CRL Rank"
        error={
          shouldShowFieldError("jeeMainAllIndiaRank")
            ? errors.jeeMainAllIndiaRank
            : ""
        }
      />

      <RadioGroup
        label="Are you Already Admitted in GGV Bilaspur through JOSAA / CSAB?"
        name="admissionStatus"
        value={form.admissionStatus}
        onChange={onChange}
        options={[
          { value: "No", label: "No" },
          { value: "Yes", label: "Yes" },
        ]}
        required
        helperText="Select Yes if you are already admitted through JOSAA / CSAB."
        error={
          shouldShowFieldError("admissionStatus") ? errors.admissionStatus : ""
        }
      />

      {form.admissionStatus === "Yes" && (
        <RadioGroup
          label="How were you alloted your branch?"
          name="BranchAllotedBy"
          value={form.BranchAllotedBy}
          onChange={onChange}
          options={[
            { value: "JoSAA", label: "JoSAA" },
            { value: "CSAB", label: "CSAB" },
          ]}
          required
          helperText="Select the option based on your admission process."
          error={
            shouldShowFieldError("BranchAllotedBy")
              ? errors.BranchAllotedBy
              : ""
          }
        />
      )}

      {form.admissionStatus === "Yes" && (
        <div>
          <FormField
            label="Program Name"
            name="branchName"
            type="select"
            value={form.branchName}
            onChange={onChange}
            options={[
              "Computer Science",
              "Information Technology",
              "Electronics & Communication Engineering",
              "Electrical  Engineering",
              "Mechanical Engineering",
              "Chemical Engineering",
              "Industrial & Production Engineering",
              "Artificial Intelligence & Data Science",
              "Animation & VFX",
              "Civil Engineering",
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

      <FormField
        label="Upload Passport Size Photograph"
        name="passportPhoto"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={onChange}
        required
        helperText="Image files only."
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
        label="Class 12th Board / University Name"
        name="twelfthBoardName"
        value={form.twelfthBoardName}
        onChange={onChange}
        required
        
        error={
          shouldShowFieldError("twelfthBoardName")
            ? errors.twelfthBoardName
            : ""
        }
      />
      <FormField
        label="Enter 12 passing year"
        name="twelfthPassingYear"
        type="select"
        value={form.twelfthPassingYear}
        onChange={onChange}
        required
        options={[
          "2024",
          "2025",
          "2026",
        ]}
        error={shouldShowFieldError("twelfthPassingYear") ? errors.twelfthPassingYear : ""}
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

      <FormField
        label="JEE Main Scorecard (PDF)"
        name="jeeMainScoreCard"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
        helperText="PDF only."
        error={shouldShowFieldError("jeeMainScoreCard") ? errors.jeeMainScorecard : ""}
      />
      
    </>
  );
};

export default PersonalInfoBtechSection;
