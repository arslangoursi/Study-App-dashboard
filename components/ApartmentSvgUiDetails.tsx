"use state";

import Image from "next/image";
import { useState, useTransition } from "react";
import useQuery from "@/hooks/useQuery";
import useLanguage from "@/hooks/useLanguage";
// import { propertyTaxPercentage } from "@/constants/constants";
import AddToCartButton from "./AddToCartButton";
import Loader from "./Loader";
import ApartmentSvgUiDetailsEntry from "./ApartmentSvgUiDetailsEntry";
import ScrollContainer from "react-indiana-drag-scroll";
import mapColors from "@/data/mapColors.json";
import FloorIcon from "@/icons/FloorIcon";
import UnitNumberIcon from "@/icons/UnitNumberIcon";
import AreaMapIcon from "@/icons/AreaMapIcon";
import UnitTypeIcon from "@/icons/UnitTypeIcon";
import BalconiesIcon from "@/icons/BalconiesIcon";
import BedroomIcon from "@/icons/BedroomIcon";
import BathroomsIcon from "@/icons/BathroomsIcon";
import GardensMapIcon from "@/icons/GardensMapIcon";
import ParkingMapIcon from "@/icons/ParkingMapIcon";
import RoofAreaIcon from "@/icons/RoofAreaIcon";
import ParkingAreaIcon from "@/icons/ParkingAreaIcon";
import UnitShareAreaIcon from "@/icons/UnitShareAreaIcon";
import UnitShareLandIcon from "@/icons/UnitShareLandIcon";
import TowerIcon from "@/icons/TowerIcon";
import { parseAsInteger, useQueryState } from "nuqs";

const tabs = {
  Property: "property",
  Financial: "financial"
};

export default function ApartmentSvgUiDetails({
  property,
  onClose,
  propertyDetails
}: {
  property: string;
  onClose: () => void;
  propertyDetails: {
    id: string;
    entity: string;
    batch: string | null;
    area: string | null;
    unitPrice: number;
    images: string[];
    status: string;
    asset3dFiles: string[];
    link360: string;
  };
}) {
  const [lang] = useLanguage();
  const [activeTab] = useState(tabs.Property);
  const [appView, setAppView] = useQueryState(
    "appView",
    parseAsInteger.withDefault(0)
  );
  const { data, isLoading } = useQuery<{
    floor: string;
    unit: string;
    area: string;
    unitType: { ar: string; en: string };
    numberOfBalconies: string;
    numberOfBathrooms: string;
    numberOfBedrooms: string;
    numberOfGardens: string;
    numberOfParking: string;
    roofArea: string;
    parkingArea: string;
    unitShareOfCommonArea: string;
    unitShareOfLand: string;
    tower: string;
    unitPrice: number;
  }>(property ? `/api/property/3d/${property}` : null);

  const [isPending, startTransaction] = useTransition();

  return (
    <>
      <div className="apartment__svg__container__row">
        <ScrollContainer
          vertical={false}
          className="apartment__svg__container__row__app__actions"
        >
          <button
            onClick={() => setAppView(0)}
            className={
              "apartment__svg__container__row__app__actions__button" +
              (appView === 0 ? " active" : "")
            }
          >
            <div className="apartment__svg__container__row__app__actions__button__svg">
              <svg
                width="60"
                height="80"
                viewBox="0 0 60 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.0267309 43.34C0.0267309 34.69 -0.0132691 26.05 0.0267309 17.4C0.106731 6.95 6.76673 0.15 17.0767 0.06C25.7267 -0.02 34.3867 -0.02 43.0367 0.06C53.0767 0.16 59.8867 6.92 59.9367 17.03C60.0367 34.66 60.0067 52.28 59.9367 69.91C59.9167 76.98 56.9667 79.79 49.8667 79.89C48.3667 79.91 46.8667 79.93 45.3767 79.89C39.2867 79.73 36.3867 77.23 36.0467 71.24C35.8167 67.2 34.4467 64.17 30.1667 64.08C25.5767 63.99 24.1467 67.09 23.9267 71.37C23.6367 77.06 20.6467 79.68 14.9567 79.88C12.9667 79.95 10.9567 79.96 8.96673 79.88C3.15673 79.65 0.146731 76.71 0.0667309 70.78C-0.063269 61.64 0.0367309 52.49 0.0367309 43.34H0.0267309ZM54.9567 43.41C54.9567 34.76 54.9867 26.11 54.9567 17.46C54.9267 9.28 50.8367 5.11 42.7567 5.05C34.2667 4.99 25.7767 5 17.2967 5.05C9.18673 5.1 5.06673 9.25 5.05673 17.4C5.02673 33.53 5.05673 49.67 5.05673 65.8C5.05673 75.36 5.05673 75.28 14.6967 74.93C17.4867 74.83 18.8867 74.09 19.0967 70.97C19.6167 63.23 23.8767 58.82 30.2267 58.96C36.3967 59.09 40.4567 63.41 40.9367 70.91C41.1367 73.99 42.3967 75.07 45.2667 74.9C46.5967 74.82 47.9467 74.76 49.2567 74.91C53.5067 75.42 55.2267 73.87 55.0667 69.35C54.7567 60.71 54.9767 52.06 54.9767 43.41H54.9567Z"
                  fill="currentColor"
                />
                <path
                  d="M15.6051 21.03C13.7651 21.09 12.0551 20.54 12.1251 18.48C12.2151 16.08 14.2451 15.96 16.1651 15.98C18.1351 16 20.1051 16.34 19.8451 18.78C19.5951 21.18 17.4451 21.07 15.5951 21.03H15.6051Z"
                  fill="currentColor"
                />
                <path
                  d="M30.2452 21.04C27.9152 21.07 25.9752 20.74 26.1452 18.28C26.2852 16.2 28.1052 15.98 29.8752 15.98C31.8052 15.98 33.8852 16.14 33.8752 18.52C33.8752 20.9 31.8252 21.15 30.2452 21.04Z"
                  fill="currentColor"
                />
                <path
                  d="M43.8155 15.99C45.7455 15.91 47.8255 16.09 47.8555 18.48C47.8855 20.88 45.8255 21.05 43.8955 21.05C42.1355 21.05 40.3055 20.87 40.1355 18.78C39.9355 16.32 41.8555 15.96 43.8255 15.99H43.8155Z"
                  fill="currentColor"
                />
                <path
                  d="M15.9957 36.9999C14.0457 37.0499 12.0257 36.7699 12.1457 34.3399C12.2657 31.9399 14.3857 31.9399 16.2757 31.9399C18.0857 31.9399 19.8557 32.3099 19.8857 34.3699C19.9257 36.7999 17.9357 37.0599 15.9957 36.9999Z"
                  fill="currentColor"
                />
                <path
                  d="M30.1354 37.0001C28.1954 37.0801 26.1254 36.8801 26.1154 34.4901C26.0954 32.1001 28.1654 31.9301 30.1054 31.9401C31.8654 31.9401 33.6954 32.1401 33.8454 34.2301C34.0254 36.6901 32.0954 37.0301 30.1354 37.0001Z"
                  fill="currentColor"
                />
                <path
                  d="M43.9968 37C42.0568 37.06 40.0168 36.8 40.1168 34.38C40.2168 31.98 42.3168 31.95 44.2168 31.95C46.0168 31.95 47.7968 32.2899 47.8568 34.3499C47.9268 36.7899 45.9468 37.0599 44.0068 37.0099L43.9968 37Z"
                  fill="currentColor"
                />
                <path
                  d="M15.8662 52.9699C13.9062 52.9999 11.9762 52.6599 12.1562 50.1899C12.3162 48.1099 14.1362 47.9099 15.8962 47.9099C17.8262 47.9099 19.8962 48.0699 19.8762 50.4599C19.8562 52.8499 17.7862 53.0499 15.8562 52.9699H15.8662Z"
                  fill="currentColor"
                />
                <path
                  d="M30.1152 52.9599C28.1752 53.0499 26.1152 52.8199 26.1152 50.4399C26.1152 48.0599 28.1852 47.8999 30.1152 47.8999C31.8852 47.8999 33.7152 48.1199 33.8452 50.1999C33.9852 52.5899 32.1152 53.0399 30.1152 52.9499V52.9599Z"
                  fill="currentColor"
                />
                <path
                  d="M44.136 52.9699C42.206 53.0499 40.126 52.8699 40.096 50.4799C40.066 48.0799 42.126 47.9099 44.056 47.9099C45.816 47.9099 47.646 48.0899 47.816 50.1799C48.016 52.6399 46.096 52.9999 44.126 52.9699H44.136Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {lang === "ar" ? "عرض المبنى" : "Building View"}
          </button>
          {propertyDetails.asset3dFiles.length > 0 && (
            <button
              onClick={() => setAppView(1)}
              className={
                "apartment__svg__container__row__app__actions__button" +
                (appView === 1 ? " active" : "")
              }
            >
              <div className="apartment__svg__container__row__app__actions__button__svg">
                <svg
                  width="67"
                  height="77"
                  viewBox="0 0 67 77"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.0426658 38.3363C0.0426658 29.5163 -0.0573342 20.6863 0.0726658 11.8663C0.182666 3.89628 3.74267 0.22628 11.6327 0.11628C22.7827 -0.0337198 33.9427 -0.0437198 45.0927 0.11628C52.9627 0.22628 56.4327 3.89628 56.6427 11.8963C56.7327 15.3863 56.9027 18.9063 56.6027 22.3763C56.2327 26.6263 57.5327 28.7663 62.1027 28.0663C63.0727 27.9163 64.0927 28.0663 65.0827 28.1563C66.1827 28.2563 66.3027 29.1163 66.2727 29.9763C66.2427 30.9163 66.5127 31.9463 65.4027 32.5863C60.2327 35.5763 52.2427 31.3363 52.0127 25.3563C51.8427 21.0363 52.0527 16.6963 51.9527 12.3763C51.8127 6.76628 50.0227 5.01628 44.3727 4.78628C42.2127 4.69628 40.0427 4.76628 37.8827 4.76628C32.1493 4.76628 29.0893 7.65295 28.7027 13.4263C28.6027 14.9363 28.8427 16.3663 26.5227 16.4463C23.9727 16.5363 24.0627 15.0563 23.9827 13.2763C23.5627 4.76628 23.5327 4.76628 15.1627 4.76628C5.94267 4.76628 4.72267 5.97628 4.72267 15.0163C4.72267 21.0029 7.65933 24.0129 13.5327 24.0463C14.3627 24.0463 15.2027 24.0963 16.0327 24.0463C17.7027 23.9463 18.3927 24.6363 18.3927 26.3663C18.3927 28.0663 17.7827 28.7763 16.0727 28.7363C13.5727 28.6763 11.0627 28.9063 8.58267 28.6863C5.41267 28.4063 4.51267 29.7763 4.67267 32.7363C4.87267 36.3863 4.96267 40.0763 4.65267 43.7163C4.34267 47.4363 5.98267 48.3063 9.29267 48.0663C12.2727 47.8463 15.2827 48.0363 18.2827 48.0163C21.1627 47.9963 24.6427 48.9163 24.0927 43.8963C23.9027 42.1263 25.4727 42.4663 26.5827 42.3863C28.0427 42.2863 28.7027 42.9363 28.6927 44.4063C28.6627 48.3963 28.6627 52.3963 28.6927 56.3863C28.6927 57.9063 27.9227 58.3463 26.5127 58.3563C24.9827 58.3763 23.8027 58.1263 24.0327 56.2463C24.4627 52.7463 22.3127 52.5963 19.7027 52.6663C15.7127 52.7763 11.7127 52.7163 7.71267 52.6963C6.04267 52.6963 4.70267 52.9563 4.73267 55.0663C4.79267 58.8863 4.62267 62.7363 4.93267 66.5363C5.21267 70.0063 7.42267 71.9263 10.9527 71.9363C22.4427 71.9863 33.9227 71.9763 45.4127 71.9563C50.0827 71.9463 51.8827 69.1163 51.9527 64.8763C52.0327 59.7163 51.9727 54.5563 51.9827 49.3963C51.9827 47.9163 51.7527 46.4163 54.0927 46.3263C56.5927 46.2263 56.6927 47.6163 56.6727 49.4563C56.6027 55.1163 56.8027 60.7863 56.5227 66.4263C56.2027 72.8463 52.4727 76.4863 46.0027 76.5863C34.3527 76.7563 22.6927 76.7563 11.0427 76.6163C4.07267 76.5263 0.282666 72.8163 0.112666 65.8063C-0.107334 56.6563 0.0626658 47.4963 0.0626658 38.3463C0.0626658 38.3463 0.0426658 38.3463 0.0326658 38.3463L0.0426658 38.3363Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {lang === "ar" ? "عرض ثلاثي الأبعاد" : "Unit 3D view"}
            </button>
          )}
          {propertyDetails.link360 && (
            <button
              onClick={() => setAppView(2)}
              className={
                "apartment__svg__container__row__app__actions__button" +
                (appView === 2 ? " active" : "")
              }
            >
              <div className="apartment__svg__container__row__app__actions__button__svg">
                <svg
                  width="69"
                  height="83"
                  viewBox="0 0 69 83"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5354 49.9619C15.6354 46.0219 15.6154 42.0719 15.8554 38.1419C16.3654 30.0819 20.7754 24.6319 28.2254 22.2719C35.6654 19.9119 42.4854 21.6919 47.8554 27.7419C48.2854 28.2319 48.7654 28.6719 49.2254 29.1319C52.4854 34.6219 52.6854 40.6619 52.6554 46.8219C52.6454 49.6919 51.6254 50.8419 48.8854 50.4019C45.2954 49.8319 44.2754 51.4219 44.5554 54.8319C44.8254 58.1219 44.5354 61.4519 44.6354 64.7719C44.6954 66.7619 44.2354 67.7619 41.9154 67.7719C39.4354 67.7719 39.3454 66.4619 39.3554 64.6219C39.4054 59.4819 39.5554 54.3419 39.2854 49.2119C39.1054 45.8119 40.4454 44.6519 43.5854 45.1519C46.8254 45.6719 47.4554 44.1119 47.3454 41.2019C47.1054 34.2219 43.9154 29.0419 38.3454 27.2119C32.8354 25.3919 27.1054 27.2919 23.2754 32.0519C20.5354 35.4619 20.7554 39.4519 20.8254 43.4119C20.8654 45.8019 22.9154 45.2519 24.1854 45.0919C28.1254 44.5819 28.9754 46.3919 28.7654 49.9419C28.4854 54.7319 28.6454 59.5519 28.6954 64.3519C28.7154 66.3419 28.6954 67.8519 25.9154 67.7819C23.3554 67.7219 23.4254 66.3019 23.4454 64.5519C23.4754 61.5719 23.1854 58.5619 23.5054 55.6119C23.9454 51.5719 22.7154 49.7019 18.4354 50.4019C17.5154 50.5519 16.4954 50.1319 15.5254 49.9719L15.5354 49.9619Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3.96494 60.062C6.68494 58.812 9.39494 57.552 12.1149 56.302C14.7549 58.152 16.5449 59.982 12.0349 61.732C11.1149 62.092 10.1549 62.402 9.31494 62.902C7.36494 64.062 4.93494 64.952 5.08494 67.842C5.21494 70.382 7.26494 71.582 9.20494 72.362C25.7349 79.032 42.3249 78.932 58.8449 72.352C60.9349 71.522 63.2549 70.192 62.9449 67.352C62.6049 64.202 59.7849 63.062 57.3749 62.362C53.5949 61.272 52.6849 59.472 54.6249 56.022C58.1449 57.312 61.8849 58.132 64.7449 60.892C69.5549 65.542 69.3949 70.662 64.1649 74.832C58.7649 79.132 52.1249 80.332 45.6449 81.272C33.8949 82.992 22.1949 82.282 10.8149 78.502C9.72494 78.142 8.65494 77.682 7.60494 77.192C-1.12506 73.072 -2.33506 67.352 3.95494 60.062H3.96494Z"
                    fill="currentColor"
                  />
                  <path
                    d="M34.2357 15.992C29.8757 16.092 26.2657 12.762 26.0557 8.43204C25.8257 3.87204 29.3057 0.102039 33.8557 0.00203934C38.4257 -0.0979607 42.0757 3.49204 42.0457 8.05204C42.0157 12.422 38.6057 15.892 34.2457 15.992H34.2357ZM36.9557 7.89204C36.5557 6.27204 35.6457 5.07204 33.9257 5.17204C32.2657 5.27204 31.1157 6.41204 31.2157 8.11204C31.3057 9.77204 32.4457 10.912 34.1557 10.832C35.8357 10.752 36.7357 9.56204 36.9557 7.90204V7.89204Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {lang === "ar" ? "جولة بانورامية" : "Unit Tour"}
            </button>
          )}
          {propertyDetails.images.length > 0 && (
            <>
              <button
                onClick={() => setAppView(3)}
                className={
                  "apartment__svg__container__row__app__actions__button" +
                  (appView === 3 ? " active" : "")
                }
              >
                <div className="apartment__svg__container__row__app__actions__button__svg">
                  <svg
                    width="65"
                    height="66"
                    viewBox="0 0 65 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.14863 0.0807328C22.3586 0.0807328 36.5786 0.140733 50.7886 0.000732839C53.6486 -0.0292672 56.3086 0.870733 59.0986 1.06073C62.9286 3.56073 64.2586 7.03073 64.1786 11.6407C63.9486 25.6007 64.1086 39.5707 64.0886 53.5407C64.0886 60.8407 60.6786 64.7407 53.2686 64.8607C39.1386 65.1007 24.9886 65.1107 10.8586 64.8607C3.49863 64.7307 0.158632 60.8107 0.148632 53.4407C0.138632 40.1407 0.458632 26.8207 0.0186317 13.5407C-0.201368 6.86073 1.46863 2.17073 8.14863 0.0807328ZM59.0186 35.2007C59.0186 26.6607 59.1386 18.2707 58.9486 9.88073C58.8886 7.10073 56.7386 6.02073 54.0586 6.02073C39.4286 6.02073 24.7886 6.02073 10.1586 6.02073C7.47863 6.02073 5.34863 7.10073 5.26863 9.88073C5.06863 16.9307 5.19863 23.9907 5.19863 31.3407C7.43863 30.7407 7.81863 29.1307 8.75863 28.0707C12.5886 23.7107 17.1786 21.1307 23.2286 22.0607C27.6086 22.7307 29.8286 26.3307 32.6186 29.0807C34.8086 31.2307 36.3786 32.4707 39.7886 30.5107C44.7786 27.6407 50.0386 28.4707 54.6786 32.1307C55.9286 33.1207 56.6586 34.8007 59.0186 35.2007ZM18.7086 58.9707C31.0286 58.9707 41.9086 58.8207 52.7886 59.0407C57.4286 59.1307 58.4486 56.8007 59.2086 52.7907C60.6386 45.2507 55.3386 41.7207 51.0786 37.4907C47.7386 34.1707 44.0086 33.8907 40.5786 37.1707C33.5286 43.9207 26.7286 50.9407 18.6986 58.9707H18.7086ZM5.15863 47.7207C5.15863 49.8307 5.12863 51.5007 5.15863 53.1607C5.20863 55.4107 5.69863 57.6407 7.89863 58.6307C10.3786 59.7507 11.8586 57.7307 13.3786 56.2107C17.8486 51.7507 22.3586 47.3407 26.7586 42.8107C33.3886 35.9907 33.5386 38.3207 26.5786 30.8707C23.9586 28.0607 20.1786 26.3907 17.8186 28.5707C12.0586 33.9107 3.16863 37.6907 5.14863 47.7107L5.15863 47.7207Z"
                      fill="currentColor"
                    />
                    <path
                      d="M45.7672 23.0107C42.6072 22.9407 41.3672 20.8807 41.3672 18.4507C41.3672 15.8107 43.2972 14.1707 45.9472 14.1607C48.7672 14.1507 50.1272 15.9807 50.0572 18.7107C49.9772 21.5107 48.3172 22.8507 45.7672 23.0207V23.0107Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                {lang === "ar" ? "معرض الصور ثلاثي الأبعاد" : "3D View Gallery"}
              </button>
              <button
                onClick={() => {
                  startTransaction(() => {
                    window.open(
                      window.location.pathname +
                        "/property-card?id=" +
                        propertyDetails.id,
                      "_blank"
                    );
                  });
                  // propertyDetails.images.forEach((image, index) => {
                  //   fetch(image)
                  //     .then((response) => {
                  //       if (!response.ok) {
                  //         throw new Error(`Failed to fetch image: ${image}`);
                  //       }

                  //       return response.blob();
                  //     })
                  //     .then((blob) => {
                  //       const link = document.createElement("a");
                  //       const url = window.URL.createObjectURL(blob);
                  //       const extension =
                  //         image.split(".").pop()?.split("?")[0] || "";
                  //       link.href = url;
                  //       link.download = `${propertyDetails.entity}${
                  //         index + 1
                  //       }.${extension}`;
                  //       link.style.display = "none";
                  //       document.body.appendChild(link);
                  //       link.click();
                  //       window.URL.revokeObjectURL(url);
                  //       document.body.removeChild(link);
                  //     })
                  //     .catch((error) => {
                  //       console.error(error.message);
                  //     });
                  // });
                }}
                className="apartment__svg__container__row__app__actions__button"
              >
                <div className="apartment__svg__container__row__app__actions__button__svg">
                  {isPending ? (
                    <Loader color="currentColor" />
                  ) : (
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.32031 7.27344L1.46565 7.68522C2.03084 9.2864 2.31344 10.0876 2.95814 10.5435C3.60283 10.9994 4.45249 11 6.15056 11H7.66913C9.36782 11 10.2169 11 10.8616 10.5435C11.5069 10.0876 11.7895 9.2864 12.3547 7.68522L12.5 7.27344M6.91016 7.27344V1.0625M6.91016 7.27344C6.47539 7.27344 5.663 6.03498 5.35742 5.7207M6.91016 7.27344C7.34492 7.27344 8.15731 6.03498 8.46289 5.7207"
                        stroke="currentColor"
                        strokeWidth="0.931641"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {lang === "ar" ? "تحميل الصور" : "The Floor Plan"}
              </button>
            </>
          )}
        </ScrollContainer>
        <div className="slide__filter__header">
          <div className="slide__filter__header__content">
            <div className="slide__filter__header__content__actions">
              <div
                style={{
                  backgroundColor:
                    mapColors[propertyDetails.status as keyof typeof mapColors]
                }}
                className="slide__filter__header__content__actions__status"
              >
                {
                  {
                    AVAILABLE: lang === "ar" ? "متاح" : "Available",
                    ON_HOLD: lang === "ar" ? "محجوز" : "Reserved",
                    SOLD: lang === "ar" ? "مباع" : "Sold"
                  }[propertyDetails.status]
                }
              </div>
              <button
                onClick={onClose}
                className="slide__filter__header__content__actions__button"
              >
                {lang === "ar" ? "إغلاق" : "Close"}
              </button>
            </div>
            <div className="slide__filter__header__title">
              {propertyDetails.entity}
              {/* <span>
                <CurrencyDisplay>{propertyDetails.unitPrice}</CurrencyDisplay>
              </span> */}
            </div>
          </div>
          {/* <div className="slide__filter__header__svg__warper">
            <button onClick={onClose} className="filter__svg__entry">
              <svg
                width="30"
                height="30"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="17.1769" cy="17.1769" r="17.1769" fill="white" />
                <path
                  d="M23 11L11 23"
                  stroke="#C5852D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 11L23 23"
                  stroke="#C5852D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div> */}
        </div>
        <div
          className="slide__container__row__filter__btn__warper"
          style={{
            marginTop: "1em",
            marginBottom: "-1em"
          }}
        >
          <AddToCartButton
            data={{
              id: propertyDetails.id,
              entity: propertyDetails.entity,
              batch: propertyDetails.batch,
              area: propertyDetails.area,
              unitPrice: propertyDetails.unitPrice,
              images: propertyDetails.images,
              status: propertyDetails.status
            }}
          />
        </div>
        <Image
          className="slide__image__sale__img"
          src={
            propertyDetails.images.length > 0
              ? propertyDetails.images[0]
              : "https://utfs.io/f/5WyNrWdR8eEcwYs7gDA7g2ILVBCmyPMxUE5bQicXwRNJToOZ"
          }
          width={300}
          height={200}
          quality={50}
          alt={propertyDetails.id}
        />
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
              width: "100%"
            }}
          >
            <Loader />
          </div>
        ) : (
          <>
            <div className="slide__tab__btn__warper">
              <div className="slide__property__heading">
                {lang === "ar" ? "الخصائص" : "Properties"}
              </div>
              {/* <button
                className={`slide__tab__btn ${
                  activeTab === tabs.Property ? "active" : ""
                }`}
                onClick={() => setActiveTab(tabs.Property)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.35181 5.98058H16.8926M8.30426 13.342H13.2119M5.03252 13.342H5.85045M8.30426 10.0703H13.2119M5.03252 10.0703H5.85045M1.35181 9.25232C1.35181 5.5896 1.35181 3.75743 2.48955 2.61968C3.6273 1.48193 5.45866 1.48193 9.12301 1.48193C12.7857 1.48193 14.6171 1.48193 15.7548 2.61968C16.8926 3.75743 16.8926 5.58879 16.8926 9.25232C16.8926 12.915 16.8926 14.7472 15.7548 15.885C14.6171 17.0227 12.7857 17.0227 9.12219 17.0227C5.45948 17.0227 3.62812 17.0227 2.48955 15.885C1.35262 14.7464 1.35181 12.9159 1.35181 9.25232Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {lang === "ar" ? "الخصائص" : "Property"}
              </button> */}

              {/* <button
                className={`slide__tab__btn ${
                  activeTab === tabs.Financial ? "active" : ""
                }`}
                onClick={() => setActiveTab(tabs.Financial)}
              >
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9065 5.25195H15.9065V14.252H14.9065V5.25195ZM4.90649 8.75195L5.90649 7.75195V14.252H4.90649V8.75195ZM2.90649 10.752L3.90649 9.75195V14.252H2.90649V10.752ZM6.90649 6.75195L7.90649 5.75195V14.252H6.90649V6.75195ZM8.90649 5.75195L9.90649 6.75195V14.2441H8.90649V5.75195ZM11.4065 8.25195L11.9065 7.75195V14.252H10.9065V7.75195L11.4065 8.25195ZM12.9065 6.75195L13.9065 5.75195V14.252H12.9065V6.75195ZM0.906494 12.752L1.90649 11.752V14.252H0.906494V12.752ZM16.9065 0.251953V4.25195H15.9065V1.96289L11.4065 6.45508L8.40649 3.45508L0.906494 10.9629V9.54102L8.40649 2.04883L11.4065 5.04883L15.1956 1.25195H12.9065V0.251953H16.9065Z"
                    fill="currentColor"
                  />
                </svg>

                {lang === "ar" ? "المالية" : "Financial"}
              </button> */}
            </div>
            {activeTab === tabs.Property && (
              <div className="slide__tab__property__container">
                <ApartmentSvgUiDetailsEntry
                  svg={<FloorIcon />}
                  label={lang === "ar" ? "الطابق" : "Floor"}
                  value={data?.floor || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<UnitNumberIcon />}
                  label={lang === "ar" ? "رقم الوحدة" : "Unit Number"}
                  value={data?.unit || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<AreaMapIcon />}
                  label={lang === "ar" ? "المساحة" : "Area"}
                  value={data?.area || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<UnitTypeIcon />}
                  label={lang === "ar" ? "نوع الوحدة" : "Unit Type"}
                  value={
                    lang === "ar" ? data?.unitType?.ar : data?.unitType?.en
                  }
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<BalconiesIcon />}
                  label={lang === "ar" ? "عدد الشرفات" : "Balconies"}
                  value={data?.numberOfBalconies || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<BathroomsIcon />}
                  label={lang === "ar" ? "عدد الحمامات" : "Bathrooms"}
                  value={data?.numberOfBathrooms || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<BedroomIcon />}
                  label={lang === "ar" ? "عدد غرف النوم" : "Bedrooms"}
                  value={data?.numberOfBedrooms || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<GardensMapIcon />}
                  label={lang === "ar" ? "عدد الحدائق" : " Gardens"}
                  value={data?.numberOfGardens || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<ParkingMapIcon />}
                  label={lang === "ar" ? "عدد مواقف السيارات" : " Parking"}
                  value={data?.numberOfParking || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<RoofAreaIcon />}
                  label={lang === "ar" ? "مساحة السطح" : "Roof Area"}
                  value={data?.roofArea || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<ParkingAreaIcon />}
                  label={
                    lang === "ar" ? "مساحة مواقف السيارات" : "Parking Area"
                  }
                  value={data?.parkingArea || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<UnitShareAreaIcon />}
                  label={
                    lang === "ar"
                      ? "حصة الوحدة من المساحة المشتركة"
                      : "Unit Share of Common Area"
                  }
                  value={data?.unitShareOfCommonArea || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<UnitShareLandIcon />}
                  label={
                    lang === "ar" ? "حصة الوحدة من الأرض" : "Unit Share of Land"
                  }
                  value={data?.unitShareOfLand || "N/A"}
                />
                <ApartmentSvgUiDetailsEntry
                  svg={<TowerIcon />}
                  label={lang === "ar" ? "البرج" : "Tower"}
                  value={data?.tower || "N/A"}
                />
              </div>
            )}
            {/* {activeTab === tabs.Financial && (
              <div className="slide__tab__property__container">
                {data?.unitPrice && (
                  <ApartmentSvgUiDetailsEntry
                    label={lang === "ar" ? "سعر العقار" : "Property Price"}
                    value={<CurrencyDisplay>{data.unitPrice}</CurrencyDisplay>}
                  />
                )}
                {data?.unitPrice && (
                  <ApartmentSvgUiDetailsEntry
                    label={lang === "ar" ? "رسوم التسجيل" : "Reservation Fee"}
                    value={
                      <CurrencyDisplay>
                        {(data?.unitPrice || 0) * propertyTaxPercentage}
                      </CurrencyDisplay>
                    }
                  />
                )}
              </div>
            )} */}
          </>
        )}
      </div>
    </>
  );
}
