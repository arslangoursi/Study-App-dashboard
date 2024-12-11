"use client";

import "@/styles/user.scss";
import "@/styles/login.scss";
import "@/styles/listing.scss";

import Input from "@/components/Input";
import Loader from "@/components/Loader";
import PictureInput from "@/components/PictureInput";
import Select from "@/components/Select";
import TagInput from "@/components/TagInput";
import TextArea from "@/components/TextArea";
import axios from "axios";
import getUserClient from "@/utils/getUserClient";
import { initialDataCustomer } from "@/constants/constants";
import uploadFile from "@/utils/uploadFile";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  website: string;
  country: string;
  city: string;
  taxNumber: string;
  language: string;
  idNumber: string;
  nationality: string;
  tags: string;
  notes: string;
  isSeller: boolean;
  status: string;
  type: string;
  bankingDetails: {
    bankName: string;
    iban: string;
  };
  picture: File | null;
};

const CreateCustomer = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    website: "",
    country: "",
    city: "",
    taxNumber: "",
    language: "",
    idNumber: "",
    nationality: "",
    tags: "",
    notes: "",
    isSeller: false,
    status: "ACTIVE",
    type: "INDIVIDUAL",
    bankingDetails: { bankName: "", iban: "" },
    picture: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files;
    if (fileInput && fileInput.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        picture: fileInput[0]
      }));
    }
  };

  return (
    <form className="create__user__section__wrapper">
      <div className="create__user__section">
        <div className="create__user__section__image">
          <PictureInput
            label="Upload picture"
            value={formData.picture}
            onChange={(file) => setFormData({ ...formData, picture: file })}
          />
          <div className="create__user__section__image__label">
            Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 10 MB
          </div>
        </div>
      </div>
      <div className="create__user__section">
        <div className="create__user__section__header">
          <div className="create__user__section__header__heading">
            Customer Detail
          </div>
        </div>
        <div className="create__user__section__row">
          <Input
            label="Name"
            id="name"
            type="text"
            value={""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="create__user__section__row">
          <Input
            label="Nationality"
            id="nationality"
            type="text"
            value={""}
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
          />
          <Input
            label="Tax Number"
            id="taxnumber"
            type="text"
            value={""}
            onChange={(e) =>
              setFormData({ ...formData, taxNumber: e.target.value })
            }
          />
        </div>
        <div className="create__user__section__row">
          <Select
            label="Status"
            options={[
              { value: "ACTIVE", label: "Active" },
              {
                value: "INACTIVE",
                label: "Inactive"
              }
            ]}
            placeholder=""
            value={[]}
            onChange={(newValue) => {
              if (newValue && "value" in newValue) {
                setFormData({ ...formData, status: newValue.value });
              }
            }}
          />
          <Select
            label="Seller"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" }
            ]}
            placeholder="select"
            value={[]}
            onChange={(newValue) => {
              if (newValue && "value" in newValue) {
                setFormData({
                  ...formData,
                  isSeller: newValue.value === true
                });
              }
            }}
          />
        </div>

        <div className="create__user__section__row">
          <Input
            label="Address"
            id="address"
            type="text"
            value={""}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <TagInput
            label="Tags"
            id="tags"
            type="text"
            value={""}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className="create__user__section__row">
          <TextArea
            label="Note"
            id="note"
            type="text"
            rows="4"
            cols="30"
            value={""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        <div className="create__application__btn">
          <button
            className="create__user__form__navigation__button"
            type="submit"
          >
            Create
          </button>{" "}
        </div>
      </div>
    </form>
  );
};

export default CreateCustomer;
